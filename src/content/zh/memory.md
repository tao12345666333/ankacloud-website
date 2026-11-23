---
title: 记忆、人格与 Anka
description: 控制面是长期记忆的唯一真源；每个 sandbox 通过 HTTP 读写同一份，thread 之间按需隔离，归档时再把结论折回全局。
eyebrow: 记忆
---

## 为什么记忆不能放在 sandbox 里

sandbox 随时会被暂停、过期、销毁。如果记忆跟着它走，换一块 sandbox 你就得重新介绍一遍自己。所以 ankacloud 把记忆放在控制面：`~/.config/ankaloop/` 是 `MEMORY.md`、`SOUL.md`、`IDENTITY.md`、facts 和 skills 的唯一真源。

三类状态，三种处理：

- **记忆、人格、skills** → 放在控制面。sandbox 通过 HTTP 后端读写；skills 和人格在 sandbox 启动时推入，sandbox 内视为只读。
- **session 文件** → 留在 sandbox 里，每轮结束后备份回控制面，sandbox 丢了也能恢复。
- **事件日志** → 只在控制面。sandbox 不写本地 transcripts。

## thread 之间的隔离

每个 thread 有自己的笔记作用域：sandbox 对 `MEMORY.md` 的读写落到 `memory/threads/<thread_id>/MEMORY.md`，注入给它的上下文是「全局已整理层 + 本 thread 笔记」。

全局 `MEMORY.md` 只由三方写：记忆整理、Anka、以及你自己在 Memory 面板里改。sandbox 想把结论提权进全局记忆，只能把文本返回给 Anka，由它决定。

每个 sandbox 拿到的记忆 token 是 `HMAC(ANKACLOUD_MEMORY_TOKEN, thread_id)`，并且绑定在册的 thread 上——thread 一归档，同一个 token 立刻失效。

## Anka：不需要 sandbox 的常驻会话

Anka 是嵌在控制面里的一个 agent，固定 session id 是 `home`。它没有 shell，也没有写文件的工具，因为它是跑在控制面宿主机上的。

它做的事：

- **默认应答**：在 Telegram 里没有当前 thread 时，消息交给它；在 Web 里就是顶部的 Home 会话。
- **派单**：`create_thread`、`send_to_thread`、`thread_status`、`list_threads`、`archive_thread`。只有它自己派出的 thread 完成一轮后，才会把结果回给它汇总——你自己开的 thread 不会打扰它。
- **整理记忆**：定时以及 thread 归档时，把结论写进全局记忆。
- **定时任务**：定时 prompt 由它执行或转派。

它被派出的 thread 返回的内容当作不可信数据，放在 `<untrusted_thread_output>` 块里；这类 turn 也不给它派单工具，sandbox 的输出无法借它改道。

## Skills

一个 skill 就是一个目录：`skills/<name>/SKILL.md`，可以带脚本和参考资料。它只存在于控制面：

- 在 Web 的 Skills 面板里建，或者让 Anka 用内置的 `skill-creator` 建——两条路写的是同一份文件。
- 新建 thread 时挂载进去；skill 数量不超过 20 个时默认全部使用，超过就只认显式绑定。
- 修改后由 `SkillWatcher` 热加载，不需要重启 sandbox。

## 下一步

- [部署与运维](/zh/docs/self-hosting/)
- [仓库里的设计文档](https://github.com/tao12345666333/ankacloud/blob/main/docs/DESIGN.md)
