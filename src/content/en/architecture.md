---
title: How it works
description: The control plane orchestrates; the work always happens inside a sandbox. Here is the split, and why it is designed that way.
eyebrow: Architecture
---

## In one sentence

ankacloud is a single-process control plane: it tracks threads, manages sandbox lifecycles, relays messages, fans out events, and persists memory. The actual work runs inside each sandbox on a nearly unmodified `anka serve`, using the thread ID as its session ID.

## Why the agent runs inside a sandbox

The alternative is to run the agent in the control plane and proxy its shell and file tools into a sandbox. That would mean rewriting every built-in ankaloop tool — and breaking the assumption that skills, hooks, and MCP have direct access to a local filesystem.

The cleanest split is **one sandbox per thread**: `anka serve` runs inside it, and the control plane talks to it over HTTPS (`get_host(8080)` with the traffic token and ankaloop's API key).

```
Web UI (HTTP/SSE)  ─┐
                    ├──▶  ankacloud control plane ──HTTPS──▶  sandbox A (thread A)
Telegram (Bot API) ─┘      one FastAPI process               sandbox B (thread B)
                           SQLite + reconciler              sandbox C (paused)
```

## What lives in the control plane

| Module | Responsibility |
| --- | --- |
| `threads/` | Thread registry and state machine: `none → creating → running → paused → killed` |
| `sandbox/` | The `SandboxProvider` interface and capability catalog: E2B, Tenki, Runta |
| `events/` | Persists each turn's NDJSON frames and fans them out to SSE subscribers |
| `memory/` | A per-thread HTTP memory API for the `HttpMemoryManager` inside each sandbox |
| `home/` | Anka, the resident agent embedded in the control plane, plus memory consolidation |
| `reconciler` | Runs every 60 seconds: pauses idle sandboxes, extends active ones, recreates lost ones |

## What happens in one turn

1. You send a message; the control plane writes a `user.message` event and calls `prompt_stream` on `anka serve` inside the sandbox.
2. For each NDJSON frame: `chunk` goes only to live subscribers and is not persisted (the full reply lands later as `assistant.message`); every other frame is written to `events` before being pushed to the web UI and Telegram.
3. When a stream ends early, ankacloud distinguishes two cases. If a slow consumer falls behind on frames, only live *observation* was lost while the turn keeps running in the sandbox — the UI shows "recovering the result" and polls for the real outcome for up to an hour. Only a fully silent window is treated as `STREAM_STALLED`.
4. The `complete` frame updates the thread, backs up the session, and sends the completion notification when enabled.

The result: **refreshing the page never loses history** (it resumes from `?after_seq=`), **a control-plane restart never resubmits a turn** (it recovers by `turn_id`), and **a destroyed sandbox can be rebuilt** (the session is backed up after every turn).

## Lifecycle automation

- A sandbox idle longer than `IDLE_PAUSE_MINUTES` (10 by default) pauses automatically and wakes on the next message.
- Running sandboxes are extended by the reconciler before they expire.
- A lost sandbox is recreated on the next message, with its history restored from the backed-up session JSON.
- Archiving stops the sandbox and folds its takeaways back into global memory; the conversation and event stream stay intact.

## Next

- [Long-term memory and Anka](../memory/)
- [Deploying and operating it](../self-hosting/)
