---
title: How it works
description: The control plane only commands; the work always happens in a sandbox. Here is the split, and why it is shaped that way.
eyebrow: Architecture
---

## In one sentence

ankacloud is a single-process control plane: it registers threads, manages sandbox lifecycles, relays messages, fans out events and persists memory. The real agent is a nearly unmodified `anka serve` inside a sandbox, with the thread id as its session id.

## Why the agent runs inside a sandbox

The other route is to run the agent in the control plane and proxy its bash and file tools into a sandbox. That would mean rewriting every built-in ankaloop tool, and skills, hooks and MCP all assume they have a local filesystem.

So the cheapest and cleanest split is **one sandbox per thread**: `anka serve` runs inside it, and the control plane only talks to it over HTTPS (`get_host(8080)` plus the traffic token and ankaloop's API key).

```
Web UI (HTTP/SSE)  ─┐
                    ├──▶  ankacloud control plane ──HTTPS──▶  sandbox A (thread A)
Telegram (bot API) ─┘      one FastAPI process               sandbox B (thread B)
                           SQLite + reconciler              sandbox C (paused)
```

## What lives in the control plane

| Module | Responsibility |
| --- | --- |
| `threads/` | Thread registry and state machine: `none → creating → running → paused → killed` |
| `sandbox/` | The `SandboxProvider` abstraction and capability catalog: E2B, Tenki, Runta |
| `events/` | Persists a turn's NDJSON frames and fans them out to SSE subscribers |
| `memory/` | A per-thread HTTP memory API for the `HttpMemoryManager` inside each sandbox |
| `home/` | Anka, the agent embedded in the control plane, plus memory consolidation |
| `reconciler` | Every 60 seconds: idle pause, extend running sandboxes, recreate lost ones |

## What happens in one turn

1. You send a message; the control plane writes a `user.message` event and calls `prompt_stream` on `anka serve` inside the sandbox.
2. For every NDJSON frame: `chunk` goes only to subscribers and is not stored (the whole answer lands later as `assistant.message`); every other frame is written to `events` before it is pushed to the web UI and Telegram.
3. When the stream ends early, two cases are told apart. Too many frames for a slow consumer means only the *observation* was lost and the turn still runs in the sandbox, so the UI says "recovering the result" and polls the real outcome for up to an hour. Only a silent window is `STREAM_STALLED`.
4. The `complete` frame updates the thread, backs up the session and, when asked, sends the completion notification.

The result: **a page refresh never loses history** (it resumes from `?after_seq=`), **a control-plane restart never resubmits a turn** (it recovers by `turn_id`), and **a destroyed sandbox can be rebuilt** (the session is backed up after every turn).

## Lifecycle automation

- A sandbox idle for more than `IDLE_PAUSE_MINUTES` (10 by default) is paused automatically and resumed by the next message.
- Running sandboxes are extended by the reconciler before they expire.
- A lost sandbox is recreated on the next message, and its history is restored from the backed-up session JSON.
- Archiving kills the sandbox and folds its memory; the conversation and event stream stay.

## Next

- [Long-term memory and Anka](/docs/memory/)
- [Deploying and operating it](/docs/self-hosting/)
