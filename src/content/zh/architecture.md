---
title: 工作原理
description: 控制面只发号施令，任务永远在沙箱里执行。这里是 ankacloud 的职责拆分与设计取舍。
eyebrow: 架构
---

## 一句话

ankacloud 是一个单进程控制面：它负责登记 thread、管理沙箱生命周期、转发消息、扇出事件并持久化记忆。真正执行任务的是沙箱里几乎未改动的 `anka serve`，thread ID 直接作为它的 session ID。

## 为什么 agent 跑在沙箱里

另一条路是在控制面里跑 agent，再把 bash 和文件工具代理进沙箱。这样做不仅要重写 ankaloop 的全部内置工具，而且 skills、hooks、MCP 都默认自己拥有本地文件系统。

因此最直接、最干净的分工是：**每个 thread 独占一个沙箱**，沙箱内运行 `anka serve`，控制面只通过 HTTPS 与它通信（`get_host(8080)` 加上 traffic token 和 ankaloop 的 API key）。

```
Web UI (HTTP/SSE)  ─┐
                    ├──▶  ankacloud 控制面 ──HTTPS──▶  sandbox A (thread A)
Telegram (bot API) ─┘      单进程 FastAPI            sandbox B (thread B)
                           SQLite + reconciler       sandbox C (paused)
```

## 控制面里有什么

| 模块 | 职责 |
| --- | --- |
| `threads/` | thread 登记与状态机：`none → creating → running → paused → killed` |
| `sandbox/` | `SandboxProvider` 抽象与能力目录：E2B、Tenki、Runta |
| `events/` | 将每轮对话的 NDJSON 帧持久化，并扇出给 SSE 订阅者 |
| `memory/` | 按 thread 隔离的 HTTP 记忆 API，供沙箱内的 `HttpMemoryManager` 调用 |
| `home/` | 嵌在控制面里的常驻助手 Anka，以及记忆整理 |
| `reconciler` | 每 60 秒巡检一次：闲置暂停、运行中续期、丢失重建 |

## 一轮对话发生了什么

1. 你发送一条消息后，控制面写入 `user.message` 事件，并调用沙箱内 `anka serve` 的 `prompt_stream`。
2. 收到每个 NDJSON 帧时：`chunk` 只实时推送给订阅者、不落库（完整回复稍后以 `assistant.message` 写入），其余帧均先写入 `events` 再推送至 Web UI 与 Telegram。
3. 流提前中断时会区分两种情况：如果因为帧数过多导致消费端来不及处理，说明只是丢失了实时观测，turn 仍在沙箱里运行，界面会提示“正在恢复结果”并持续轮询真实结果（最长一小时）；只有整个窗口持续静默才判定为停滞，返回 `STREAM_STALLED`。
4. `complete` 帧到达后，控制面更新 thread 状态、备份 session，并按配置发送完成通知。

这样设计带来的结果是：**刷新页面不会丢历史**（从 `?after_seq=` 自动续读），**控制面重启不会重复提交**（按 `turn_id` 恢复），**沙箱被销毁也能重建**（每轮结束后自动备份 session 回控制面）。

## 生命周期自动化

- 闲置超过 `IDLE_PAUSE_MINUTES`（默认 10 分钟）的沙箱会自动暂停，收到新消息时自动恢复。
- 运行中的沙箱会在过期前由 reconciler 自动续期。
- 丢失的沙箱会在下次收到消息时重新创建，并通过备份的 session JSON 恢复对话历史。
- 归档会销毁沙箱并将记忆沉淀回全局，同时保留对话记录与事件流。

## 下一步

- [长期记忆与 Anka](../memory/)
- [部署与运维](../self-hosting/)
