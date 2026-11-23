---
title: 架构与工作原理
description: 控制面负责运筹调度，任务始终在独立沙箱中执行。这里说明 ankacloud 的职责边界与核心设计取舍。
eyebrow: 系统架构
---

## 一句话概括

ankacloud 是一个单进程控制面，负责会话管理、沙箱生命周期调度、消息中转、事件分发与记忆持久化。真正执行任务的是每个沙箱内几乎未经修改的 `anka serve`，直接复用 `thread_id` 作为它的 `session_id`。

## 为什么让 Agent 跑在沙箱里

另一种常见做法是在控制面里跑 Agent，再把 Shell 和文件操作远程代理进沙箱。但这不仅意味着要重写 ankaloop 的全部内置工具，还会破坏 Skills、Hooks 和 MCP 对本地文件系统的天然假设。

因此最直接、最干净的架构是：**每个会话独占一个沙箱**，沙箱内直接运行 `anka serve`，控制面仅通过 HTTPS 与其通信（基于 `get_host(8080)`、traffic token 与 ankaloop API key）。

```
Web UI (HTTP/SSE)  ─┐
                    ├──▶  ankacloud 控制面 ──HTTPS──▶  sandbox A (thread A)
Telegram (Bot API) ─┘      单进程 FastAPI            sandbox B (thread B)
                           SQLite + reconciler       sandbox C (paused)
```

## 控制面里有什么

| 模块 | 职责 |
| --- | --- |
| `threads/` | 会话存储与状态机：`none → creating → running → paused → killed` |
| `sandbox/` | `SandboxProvider` 统一接口与能力目录：E2B、Tenki、Runta |
| `events/` | 持久化每轮对话的 NDJSON 事件帧，并实时分发给 SSE 订阅者 |
| `memory/` | 按会话隔离的 HTTP 记忆 API，供沙箱内的 `HttpMemoryManager` 调用 |
| `home/` | 内嵌在控制面里的常驻管家 Anka，以及记忆整理机制 |
| `reconciler` | 每 60 秒巡检一次：闲置休眠、运行中自动续期、异常丢失重建 |

## 一轮对话发生了什么

1. 你发送一条消息后，控制面写入 `user.message` 事件，并调用沙箱内 `anka serve` 的 `prompt_stream`。
2. 收到每个 NDJSON 事件帧时：`chunk` 仅实时推送给前端订阅者、不落库（完整回复稍后以 `assistant.message` 落盘），其余事件帧均先写入 `events` 再推送至 Web UI 与 Telegram。
3. 流提前中断时会区分两种情况：若因事件帧过多导致消费端来不及处理，说明只是丢失了实时观测，任务仍在沙箱里正常执行，界面会提示“正在恢复结果”并持续轮询最终状态（最长一小时）；只有整个窗口持续静默时才会判定为停滞，返回 `STREAM_STALLED`。
4. `complete` 帧到达后，控制面更新会话状态、将 session 备份回控制面，并按配置发送完成通知。

这套设计保证了三件事：**刷新页面不会丢历史**（自动从 `?after_seq=` 断点续传）、**控制面重启不会重复提交任务**（按 `turn_id` 恢复）、**沙箱销毁也能无损重建**（每轮结束后自动备份 session）。

## 生命周期自动化

- 闲置超过 `IDLE_PAUSE_MINUTES`（默认 10 分钟）的沙箱会自动休眠，收到新消息时自动唤醒。
- 运行中的沙箱会在过期前由 reconciler 自动续期。
- 异常丢失的沙箱会在下次收到消息时自动重建，并通过备份的 session JSON 还原对话历史。
- 归档会销毁沙箱并将关键结论沉淀回全局记忆，同时完整保留对话记录与事件流。

## 下一步

- [长期记忆、人格与 Anka](../memory/)
- [部署与运维](../self-hosting/)
