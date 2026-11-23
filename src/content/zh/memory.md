---
title: 长期记忆、人格与 Anka
description: 所有长期记忆统一沉淀在控制面：各沙箱通过 HTTP 共享读写，活跃会话彼此隔离，归档时再将关键结论提炼回全局记忆。
eyebrow: 长期记忆
---

## 为什么记忆不能放在沙箱里

沙箱随时可能休眠、过期或被销毁。如果把记忆留在沙箱里，每次新开环境你都得重新自我介绍一遍。因此 ankacloud 将长期记忆统一留在控制面：`~/.config/ankaloop/` 是 `MEMORY.md`、`SOUL.md`、`IDENTITY.md`、`facts/` 与 `skills/` 的唯一数据源。

三类状态，三种去向：

- **记忆、人格与 Skills** → 留在控制面。沙箱通过 HTTP 后端读写记忆；人格配置与 Skills 在沙箱启动时推入，并在沙箱内保持只读。
- **Session 文件** → 留在沙箱中，每轮结束后自动备份回控制面，沙箱意外丢失也能无损还原。
- **事件日志** → 仅保存在控制面。沙箱不落盘本地 transcripts。

## 会话之间的隔离

每个会话都拥有独立的笔记空间：沙箱对 `MEMORY.md` 的写入会落到 `memory/threads/<thread_id>/MEMORY.md`，而注入给它的上下文则是「全局已整理记忆 + 本会话笔记」。

全局 `MEMORY.md` 仅允许三方写入：记忆整理机制、Anka，以及你本人在 Memory 面板里的直接编辑。沙箱如果想把结论沉淀进全局记忆，只能将内容返回给 Anka，由它判断是否采纳。

每个沙箱拿到的记忆访问 Token 由 `HMAC(ANKACLOUD_MEMORY_TOKEN, thread_id)` 生成，并与已登记会话严格绑定——会话一旦归档，该 Token 立即失效。

## Anka：无需沙箱的常驻管家

Anka 是内嵌在控制面里的常驻 Agent，固定会话 ID 为 `home`。因为直接运行在控制面宿主机上，它不具备 Shell，也没有写文件权限。

它主要承担四项职责：

- **默认应答**：在 Telegram 未选中活跃会话时，消息默认交给它处理；在 Web UI 中，它就是侧边栏顶部的 Home 对话。
- **任务派发**：支持 `create_thread`、`send_to_thread`、`thread_status`、`list_threads` 与 `archive_thread`。只有它亲自派出的任务完成一轮后才会向它汇报——你自己开启的会话不会打扰它。
- **记忆整理**：定时或在会话归档时，将有价值的结论提炼并写入全局记忆。
- **定时任务**：定时触发的 Prompt 由它直接执行，或按需转派至云端沙箱。

出于安全考量，由 Anka 派出的会话返回的内容会被视为非受信任数据，统一包裹在 `<untrusted_thread_output>` 块中；处理此类回调轮次时，Anka 的派发工具也会被禁用，防止沙箱输出借道篡改或归档其他任务。

## Skills 技能体系

一个 Skill 就是一个独立目录：`skills/<name>/SKILL.md`，可附带配套脚本与参考资料，并仅保存在控制面：

- 既可以在 Web 的 Skills 面板手动创建，也可以让 Anka 调用内置 `skill-creator` 自动生成——两条路径写入的是同一份文件。
- 新建会话时自动挂载；Skill 总数不超过 20 个时默认全部启用，超出后仅挂载显式选中的 Skill。
- 文件改动后由 `SkillWatcher` 自动热加载，无需重启沙箱。

## 下一步

- [部署与运维](../self-hosting/)
- [仓库里的设计文档](https://github.com/tao12345666333/ankacloud/blob/main/docs/DESIGN.md)
