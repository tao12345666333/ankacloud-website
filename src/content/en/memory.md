---
title: Memory, persona, and Anka
description: The control plane is the single source of long-term memory. Every sandbox reads and writes the same copy over HTTP, threads stay isolated until archived, and archiving folds conclusions back into global memory.
eyebrow: Memory
---

## Why memory cannot live in a sandbox

Sandboxes pause, expire, and get destroyed. If memory lived inside them, every fresh sandbox would mean introducing yourself all over again. Instead, ankacloud keeps memory on the control plane: `~/.config/ankaloop/` is the single source of truth for `MEMORY.md`, `SOUL.md`, `IDENTITY.md`, facts, and skills.

Three kinds of state, three treatments:

- **Memory, persona, and skills** → on the control plane. Sandboxes read and write memory through an HTTP backend; persona and skills are pushed in when a sandbox starts and remain read-only inside it.
- **Session files** → stay in the sandbox and are backed up to the control plane after every turn, so a lost sandbox can be restored.
- **The event log** → lives only on the control plane. Sandboxes never write local transcripts.

## Isolation between threads

Every thread has its own note scope: writes to `MEMORY.md` inside a sandbox land in `memory/threads/<thread_id>/MEMORY.md`, and the context injected into the sandbox combines the consolidated global layer with its own thread notes.

Global `MEMORY.md` has exactly three writers: memory consolidation, Anka, and you in the Memory panel. When a sandbox wants its conclusions promoted into global memory, it returns them to Anka and lets Anka decide.

Each sandbox receives a memory token derived as `HMAC(ANKACLOUD_MEMORY_TOKEN, thread_id)` and bound to a registered thread — archiving the thread revokes it immediately.

## Anka: a resident agent that needs no sandbox

Anka is embedded in the control plane with a fixed session ID of `home`. Because it runs on the control-plane host, it has no shell and no file-writing tools.

What it does:

- **Answer by default**: in Telegram with no active thread, messages go to Anka; in the web UI, it is the Home session at the top of the sidebar.
- **Dispatch work**: `create_thread`, `send_to_thread`, `thread_status`, `list_threads`, and `archive_thread`. Only threads Anka dispatched itself report back after a turn — threads you open yourself never interrupt it.
- **Consolidate memory**: on a schedule and whenever a thread is archived, it folds conclusions into global memory.
- **Run schedules**: scheduled prompts are executed or dispatched by Anka.

Output returned from a dispatched thread is treated as untrusted data and wrapped in an `<untrusted_thread_output>` block, with dispatch tools disabled for those turns — so sandbox output cannot reroute or archive work through Anka.

## Skills

A skill is a directory, `skills/<name>/SKILL.md`, optionally accompanied by scripts and reference files. It lives only on the control plane:

- Create it in the web Skills panel, or let Anka generate it with the built-in `skill-creator` — both write the same file.
- Threads mount skills at creation; with 20 or fewer skills, every thread gets all of them, and beyond that only explicit bindings apply.
- Edits hot-reload via `SkillWatcher` with no sandbox restart.

## Next

- [Deploying and operating it](../self-hosting/)
- [The design doc in the repository](https://github.com/tao12345666333/ankacloud/blob/main/docs/DESIGN.md)
