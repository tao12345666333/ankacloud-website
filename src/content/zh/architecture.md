---
title: 它是怎么工作的
description: 控制面只发号施令，任务永远在 sandbox 里执行。这是 ankacloud 的分工方式，以及它为什么这样设计。
eyebrow: 架构
---

## 一句话

ankacloud 是一个单进程的控制面：它登记 thread、管理 sandbox 生命周期、转发消息、扇出事件、持久化记忆。真正的 agent 是 sandbox 里一个几乎未改动的 `anka serve`，thread id 直接就是它的 session id。

## 为什么 agent 跑在 sandbox 里

另一条路是在控制面里跑 agent，把 bash、文件这些工具代理到 sandbox 里。那条路要重写 ankaloop 的全部内置工具，而且 skills、hooks、MCP 都假设自己有一个本地文件系统。

所以最省力也最干净的分工是：**每个 thread 一个 sandbox**，sandbox 里跑 `anka serve`，控制面只通过 HTTPS 和它说话（`get_host(8080)` + traffic token + ankaloop 的 API key）。

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
| `events/` | 把一轮的 NDJSON 帧写库并扇出给 SSE 订阅者 |
| `memory/` | 按 thread 隔离的 HTTP 记忆 API，供 sandbox 里的 `HttpMemoryManager` 调用 |
| `home/` | Anka，嵌在控制面里的 agent；以及记忆整理 |
| `reconciler` | 每 60 秒：闲置暂停、运行中续期、丢失重建 |

## 一轮对话发生了什么

1. 你发一条消息，控制面写一条 `user.message` 事件，然后调用 sandbox 里 `anka serve` 的 `prompt_stream`。
2. 每一个 NDJSON 帧：`chunk` 只推给订阅者不落库（整段回答会以 `assistant.message` 落库），其余帧先写 `events` 再推给 Web 和 Telegram。
3. 流提前结束时区分两种情况：帧太多、消费端跟不上，意味着只是丢了观测，turn 还在 sandbox 里跑，于是提示“正在恢复结果”并按一小时轮询真实结果；整个窗口静默才算 stalled，报 `STREAM_STALLED`。
4. `complete` 帧到达，更新 thread，备份 session，必要时触发完成通知。

这样设计的结果是：**刷新页面不会丢历史**（可以从 `?after_seq=` 续读），**控制面重启不会重复提交**（用 `turn_id` 恢复），**sandbox 被销毁也能重建**（session 每轮备份回控制面）。

## 生命周期自动化

- 闲置超过 `IDLE_PAUSE_MINUTES`（默认 10 分钟）的 sandbox 自动 pause，来消息时自动 resume。
- 运行中的 sandbox 在过期前由 reconciler 续期。
- 丢失的 sandbox 在下次消息时重新创建，并用备份的 session JSON 恢复历史。
- 归档 = 销毁 sandbox + 折叠记忆，对话与事件流保留。

## 下一步

- [长期记忆与 Anka](../memory/)
- [部署与运维](../self-hosting/)
