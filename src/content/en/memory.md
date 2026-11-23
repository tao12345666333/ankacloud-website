---
title: Memory, persona and Anka
description: The control plane is the single source of long-term memory. Every sandbox reads and writes the same copy over HTTP, threads are isolated on demand, and archiving folds conclusions back into the global memory.
eyebrow: Memory
---

## Why memory cannot live in a sandbox

Sandboxes get paused, expired and destroyed. If memory travelled with them, every new sandbox would mean introducing yourself again. So ankacloud keeps memory on the control plane: `~/.config/ankaloop/` is the single source of truth for `MEMORY.md`, `SOUL.md`, `IDENTITY.md`, facts and skills.

Three kinds of state, three treatments:

- **Memory, persona and skills** → on the control plane. Sandboxes read and write through an HTTP backend; persona and skills are pushed in when a sandbox starts and are read-only inside it.
- **Session files** → stay in the sandbox, and are backed up to the control plane after every turn, so a lost sandbox can be restored.
- **The event log** → only on the control plane. Sandboxes never write local transcripts.

## Isolation between threads

Every thread has its own note scope: a sandbox's writes to `MEMORY.md` land in `memory/threads/<thread_id>/MEMORY.md`, and what it is given as context is the consolidated global layer plus its own thread notes.

The global `MEMORY.md` has exactly three writers: memory consolidation, Anka, and you in the Memory panel. A sandbox that wants its conclusions promoted into global memory has to return them to Anka and let it decide.

The memory token each sandbox receives is `HMAC(ANKACLOUD_MEMORY_TOKEN, thread_id)` and is bound to a registered thread — archiving the thread revokes it immediately.

## Anka: a resident session that needs no sandbox

Anka is an agent embedded in the control plane, always with the session id `home`. It has no shell and no file-writing tools, because it runs on the control plane's host.

What it does:

- **Answer by default**: in Telegram with no current thread, a message goes to Anka; in the web UI it is the Home session at the top of the sidebar.
- **Dispatch**: `create_thread`, `send_to_thread`, `thread_status`, `list_threads`, `archive_thread`. Only threads it dispatched itself report back after a turn — your own threads never interrupt it.
- **Consolidate memory**: on a schedule and when a thread is archived, it writes the conclusions into global memory.
- **Run schedules**: scheduled prompts are executed or dispatched by it.

Whatever a dispatched thread returns is treated as untrusted data, wrapped in an `<untrusted_thread_output>` block, and those turns do not get the dispatch tools — sandbox output cannot reroute or archive work through Anka.

## Skills

A skill is a directory: `skills/<name>/SKILL.md`, optionally with scripts and references. It only exists on the control plane:

- Create it in the web Skills panel, or let Anka use the built-in `skill-creator` — both write the same file.
- Threads mount it at creation; with 20 or fewer skills every thread uses them all, beyond that only explicit bindings count.
- Edits hot-reload through `SkillWatcher`, with no sandbox restart.

## Next

- [Deploying and operating it](../self-hosting/)
- [The design doc in the repository](https://github.com/tao12345666333/ankacloud/blob/main/docs/DESIGN.md)
