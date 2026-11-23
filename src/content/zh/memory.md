---
title: 记忆、人格与 Anka
description: 控制面是长期记忆的唯一真源：所有沙箱通过 HTTP 读写同一份数据，thread 之间按需隔离，归档时再把结论沉淀回全局。
eyebrow: 记忆
---

## 为什么记忆不能放在沙箱里

沙箱随时会暂停、过期或销毁。如果记忆绑在沙箱里，每次换新沙箱你都得重新自我介绍一遍。因此 ankacloud 把记忆留在控制面：`~/.config/ankaloop/` 是 `MEMORY.md`、`SOUL.md`、`IDENTITY.md`、facts 和 skills 的唯一真源。

三类状态，三种处理方式：

- **记忆、人格与 skills** → 留在控制面。沙箱通过 HTTP 后端读写记忆；人格与 skills 在沙箱启动时推入，在沙箱内保持只读。
- **session 文件** → 留在沙箱里，每轮结束后备份回控制面，沙箱丢失也能无损恢复。
- **事件日志** → 仅保存在控制面。沙箱不写本地 transcripts。

## thread 之间的隔离

每个 thread 都有独立的笔记作用域：沙箱对 `MEMORY.md` 的写入落到 `memory/threads/<thread_id>/MEMORY.md`，注入给它的上下文则是「全局已整理层 + 本 thread 笔记」。

全局 `MEMORY.md` 只允许三方写入：记忆整理、Anka，以及你自己在 Memory 面板里的编辑。沙箱如果想把结论写入全局记忆，只能把内容返回给 Anka，由它来决定是否采纳。

每个沙箱拿到的记忆 token 为 `HMAC(ANKACLOUD_MEMORY_TOKEN, thread_id)`，且严格绑定在册 thread——thread 一旦归档，该 token 立即失效。

## Anka：无需沙箱的常驻助手

Anka 是嵌在控制面里的常驻 agent，固定 session ID 为 `home`。由于运行在控制面宿主机上，它不具备 shell，也没有写文件工具。

它的职责包括：

- **默认应答**：在 Telegram 没有当前 thread 时，消息默认交给它；在 Web UI 中，它就是侧边栏顶部的 Home 会话。
- **任务派发**：支持 `create_thread`、`send_to_thread`、`thread_status`、`list_threads`、`archive_thread`。只有它亲自派出的 thread 完成一轮后才会向它汇报结果——你自己开的 thread 不会打扰它。
- **整理记忆**：定时以及在 thread 归档时，将有价值的结论整理进全局记忆。
- **定时任务**：定时 prompt 由它直接执行或转派给沙箱。

由 Anka 派出的 thread 返回的内容会被视为不可信数据，包裹在 `<untrusted_thread_output>` 块中；处理这类回调时也不会向 Anka 开放派单工具，防止沙箱输出借道篡改或归档其他任务。

## Skills

一个 skill 就是一个目录：`skills/<name>/SKILL.md`，可附带脚本和参考资料。它只保存在控制面：

- 可以在 Web 的 Skills 面板创建，也可以让 Anka 调用内置的 `skill-creator` 生成——两条路径写入的是同一份文件。
- 新建 thread 时自动挂载；skill 数量不超过 20 个时默认全部启用，超过后仅挂载显式绑定的 skill。
- 修改后通过 `SkillWatcher` 热加载，无需重启沙箱。

## 下一步

- [部署与运维](../self-hosting/)
- [仓库里的设计文档](https://github.com/tao12345666333/ankacloud/blob/main/docs/DESIGN.md)
