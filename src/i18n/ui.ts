// Every string the page components render, in both languages. Components take
// the whole dictionary as a prop, so adding a language means adding one entry
// here plus its content collection.
export const languages = {
  en: "English",
  zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    meta: {
      title: "ankacloud · the agent you carry around, working in an isolated cloud sandbox",
      description:
        "ankacloud is a single-user agent-in-sandbox control plane: one isolated cloud sandbox per thread, and one long-term memory that carries across all of them. A single Python process, a single SQLite file, Apache-2.0.",
    },
    header: {
      home: "ankacloud home",
      nav: { features: "Features", architecture: "Architecture", memory: "Memory", quickstart: "Quickstart" },
      theme: "Toggle light and dark theme",
    },
    hero: {
      pill: "v0.11 · pick a provider and model per thread",
      title1: "The agent you carry around,",
      title2Before: "working in an ",
      title2Accent: "isolated",
      title2After: " cloud sandbox.",
      lede: "ankacloud is a single-user agent-in-sandbox control plane. You open a thread in the web UI or Telegram, and it writes code, runs a shell, fetches pages and opens PRs inside its own cloud sandbox — while remembering who you are and every decision you made in every other thread.",
      start: "Get started",
      how: "See how it works",
      facts: ["Python process", "SQLite file", "1 thread = 1 sandbox", "Apache-2.0"],
    },
    features: {
      eyebrow: "Why ankacloud",
      title: "There are many background agents.<br />This one starts from memory and persona.",
      lede: "Most products turn the background coding agent into ticket automation: drop an issue in, wait for a PR to come out. ankacloud treats the agent's long-term memory and persona as first-class citizens — it is less a disposable machine than a person you take with you.",
      items: [
        {
          title: "One continuous memory",
          body: "The agent remembers what you did in every thread, the decisions you made, the preferences you wrote down. A fresh sandbox is not a stranger.",
          aside: "MEMORY.md · SOUL.md · IDENTITY.md · facts",
        },
        {
          title: "One thread, one cloud sandbox",
          body: "Code, shell and network all run inside an isolated cloud sandbox. Idle sandboxes pause, the next message resumes them, and a lost one is recreated.",
          aside: "E2B · Tenki · Runta",
        },
        {
          title: "The control plane only commands",
          body: "It registers threads, manages sandbox lifecycles, relays messages, fans out events and persists memory. The work is done by a nearly unmodified ankaloop.",
          aside: "Your agent skills are not locked to a platform",
        },
        {
          title: "All your work at a glance",
          body: "Every thread is a card on the Board: Todo, In progress, Needs you, Waiting for you, Done. The lane is derived from the last turn, never stored.",
          aside: "Telegram and web share one state",
        },
      ],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "The control plane only commands.<br />The work always happens in a sandbox.",
      ledeBefore: "ankacloud does not run the task agent loop itself. It registers threads, manages sandbox lifecycles, relays messages, fans out events and persists memory; the real agent is a nearly unmodified ",
      ledeAfter: " inside the sandbox, with the thread id as its session id.",
      web: "Web UI",
      webSub: "HTTP · SSE",
      telegram: "Telegram",
      telegramSub: "bot API · long polling",
      plane: "ankacloud control plane",
      planeChip: "one Python process",
      modules: [
        ["threads/", "SQLite registry · state machine"],
        ["sandbox/", "E2B · Tenki · Runta"],
        ["events/", "NDJSON → SSE fan-out"],
        ["memory/", "HTTP memory API"],
        ["home agent", "Anka · no sandbox"],
        ["reconciler", "idle pause · extend · recreate"],
      ],
      memoryDir: "memory, persona and skills, single source of truth",
      fan: "HTTPS · get_host + traffic token + API key",
      sandbox: "sandbox",
      running: "running",
      paused: "idle, paused · resumes on the next message",
      thread: "thread",
      props: [
        ["Isolated", "Every thread's filesystem, shell and network live in its own sandbox, invisible to the others."],
        ["Recoverable", "A paused, expired or destroyed sandbox still replays its history and event stream from the control plane."],
        ["Swappable", "Besides ", " there are Tenki and Runta, chosen per project."],
        ["Deployable", "One FastAPI process and one SQLite file run on any small machine. See the ", "design doc", "."],
      ],
    },
    workflows: {
      eyebrow: "Day to day",
      title: "Start with one thread.<br />Keep an eye on all of them in one place.",
      items: [
        {
          tag: "Board",
          title: "Five lanes, all your work at a glance",
          body: "Every thread is a card on the Board. The lane comes from the last turn — Todo, In progress, Needs you (the last turn failed), Waiting for you (the agent answered), Done — so it can never disagree with the facts.",
          alt: "The ankacloud Board: Todo, In progress, Needs you, Waiting for you and Done lanes, one card per thread",
        },
        {
          tag: "Memory",
          title: "Memory, persona and skills are owned by the control plane",
          body: "MEMORY.md, SOUL.md, IDENTITY.md and facts live in one directory on the control plane, and every sandbox reads and writes the same one over HTTP. Archiving a thread folds its conclusions back into global memory. Edit once, and it applies everywhere.",
          alt: "The ankacloud Memory panel: view and edit MEMORY.md, SOUL.md, IDENTITY.md and facts",
        },
        {
          tag: "Anka",
          title: "Anka: a resident session that needs no sandbox",
          body: "Anka runs inside the control plane with no shell. It answers what does not need hands, looks up thread status and memory, searches the web, and dispatches work with create_thread / send_to_thread — one Telegram message and the work starts in the cloud.",
          alt: "Anka, ankacloud's resident session: answering questions and dispatching work to threads",
        },
      ],
    },
    channels: {
      eyebrow: "Two front doors",
      title: "Watch in the web UI.<br />Dispatch from Telegram.",
      ledeBefore: "Both are the same control plane and the same state. With no current thread, a message goes to Anka: it either answers or dispatches with ",
      ledeAfter: ", and the new thread becomes current. When a turn ends you can ask for a “Thread finished” push to Telegram.",
      notes: [
        "Streamed replies edit one message on a throttle, so they never flood the chat.",
        "Anyone outside the allowlist is silently ignored — single user, no pairing.",
        "A refreshed web page resumes from ?after_seq=, so the event stream is never lost.",
      ],
      bot: "ankacloud bot",
      ask: "Can you check whether the README's Telegram section is missing any commands?",
      dispatchMsg: "That needs the repo. Opening a thread for it.",
      dispatched: "Dispatched",
      current: "ankacloud · current thread",
      doneTitle: "ankacloud · t-1a2b3c4d5e6f",
      doneBodyBefore: "Found three: the README's command table is missing the ",
      doneBodyMid: " alias notes; and it does not say what ",
      doneBodyAfter: " does when a prefix is ambiguous. Opened branch ",
      doneBodyEnd: " and committed.",
      notify: "Thread finished · docs patch ready",
      commands: [
        ["/new [title]", "Create a thread and make it current"],
        ["/threads", "List the 10 most recent threads and their state"],
        ["/switch <id>", "Switch the current thread"],
        ["/home [text]", "Back to Anka; with text, it answers or dispatches"],
        ["/status", "Sandbox / agent state and the running turn"],
        ["/archive", "Archive the thread (kill the sandbox, fold memory)"],
      ],
    },
    memory: {
      eyebrow: "Long-term memory",
      title: "The control plane is the only source of memory.",
      ledeBefore: "Sandboxes get paused, expired and destroyed, so memory cannot travel with them. ",
      ledeAfter: " lives on the control plane: every sandbox reads and writes the same copy over HTTP, threads are isolated on demand, and archiving folds conclusions back into the global memory.",
      steps: [
        ["Thread starts", "Persona, skills and AGENTS.md are pushed in; memory is read from the control plane over an HTTP API with a thread-scoped token."],
        ["Thread runs", "Each thread has its own note scope, so threads never pollute each other; the global MEMORY.md is only written by the dreamer, Anka and you."],
        ["Thread is archived", "That thread's token is revoked immediately, and Anka folds its conclusions into global memory — so the next thread already knows."],
      ],
      files: [
        ["MEMORY.md", "Long-term memory: decisions, conclusions, project conventions"],
        ["SOUL.md", "Who it is"],
        ["IDENTITY.md", "How it names itself and talks to you"],
        ["facts/", "Individual facts you can edit one by one"],
        ["skills/", "SKILL.md plus scripts; edit once, applies everywhere"],
      ],
      truth: "single source of truth",
      local: "local",
    },
    capabilities: {
      eyebrow: "And the rest",
      title: "Everything you would expect,<br />all in one process.",
      items: [
        ["Projects and GitHub", "Set a repository, env vars, machine size and default provider, and the thread clones it, works on its own branch and opens a PR with gh pr create. The GitHub token never enters the sandbox; E2B's egress proxy injects it."],
        ["Skills", "Create them in the web Skills panel or let Anka use the built-in skill-creator; both write the same directory on the control plane. Threads mount them at creation, and edits hot-reload through SkillWatcher."],
        ["Providers", "Each provider holds a list of enabled models with their own context window, output limit and reasoning effort, and each thread picks its provider and model explicitly."],
        ["MCP", "MCP servers are bound into a thread's sandbox; only http servers you explicitly opt in reach Anka's tools."],
        ["Sandbox runtimes", "Beyond E2B, Tenki and Runta sit behind one SandboxProvider abstraction, and a capability catalog builds each runtime's own form."],
        ["Schedules and notifications", "Anka runs or dispatches scheduled tasks; each finished turn can push one Telegram notification with the status, title and thread id in a single line."],
      ],
    },
    quickstart: {
      eyebrow: "Quickstart",
      title: "One process. One SQLite file.",
      ledeBefore: "You need Python ≥ 3.11 and ",
      ledeAfter: ". Empty keys are enough for the unit tests and the web UI; to create sandboxes and call a model, fill in ",
      ledeAnd: " and ",
      step1: "Clone and install",
      step2: "Fill in the four required values",
      step3: "Start",
      local: "Local",
      server: "On a server",
      logs: [
        ["web API on", "127.0.0.1:8000"],
        ["reconciler every", "60s", "· idle pause", "10m"],
        ["telegram channel", "not configured"],
      ],
      links: { quick: "Full quickstart", deploy: "systemd deploy and operations" },
    },
    usecases: {
      eyebrow: "Who it is for",
      title: "A home for your agent,<br />not a platform for a company.",
      fit: [
        ["Your own agent", "You want an agent that knows who you are, which repositories matter, and what you decided last time — instead of starting from zero on every task."],
        ["A small team", "A few people's work on one cloud, every thread isolated, each opening its own PR, sharing one memory and one set of skills."],
        ["Tinkerers", "One small machine, one process, one SQLite file, and an agent that is upstream ankaloop — you can always take it apart."],
      ],
      notYet: "Not yet",
      notYetItems: ["Multi-tenant and permissions", "Billing", "Team collaboration", "Local runners", "Desktop / browser portals"],
    },
    cta: {
      title: "Open a thread.<br />Let it start remembering you.",
      body: "Open source under Apache-2.0, v{version}. Issues, PRs and an agent you will use every day are all welcome.",
      github: "View on GitHub",
      quickstart: "Quickstart",
    },
    footer: {
      tagline: "A single-user agent-in-sandbox control plane. One isolated cloud sandbox per thread, one continuous memory.",
      project: "Project",
      builtOn: "Built on",
      design: "Design doc",
      contributing: "Contributing",
      license: "Apache-2.0 license",
      agent: "ankaloop · the agent itself",
      sandbox: "E2B · cloud sandboxes",
      storage: "SQLite · the only datastore",
    },
    notFound: {
      title: "Page not found · ankacloud",
      description: "This page does not exist.",
      heading: "404",
      body: "This page does not exist — maybe it is still in a sandbox.",
      home: "Back home",
    },
    docs: {
      back: "← Back home",
    },
  },
  zh: {
    meta: {
      title: "ankacloud · 一个你随身带着的 agent，在云上隔离地替你干活",
      description:
        "ankacloud 是单用户的 agent-in-sandbox 控制面：每个 thread 一块隔离的云 sandbox，一份跨 thread 连续的长期记忆。一个 Python 进程、一个 SQLite 文件，Apache-2.0 开源。",
    },
    header: {
      home: "ankacloud 首页",
      nav: { features: "特性", architecture: "架构", memory: "记忆", quickstart: "快速开始" },
      theme: "切换深浅色主题",
    },
    hero: {
      pill: "v0.11 · 每个 thread 自选 provider 与模型",
      title1: "一个你随身带着的 agent，",
      title2Before: "在云上",
      title2Accent: "隔离",
      title2After: "地替你干活。",
      lede: "ankacloud 是一个单用户的 agent-in-sandbox 控制面。你在 Web 或 Telegram 里开一个 thread，它就在一块独立的云 sandbox 里写代码、跑 shell、抓网页、开 PR——而它记得你是谁，以及你在别的 thread 里做过的每一个决定。",
      start: "开始使用",
      how: "看它是怎么工作的",
      facts: ["个 Python 进程", "个 SQLite 文件", "1 thread = 1 sandbox", "Apache-2.0"],
    },
    features: {
      eyebrow: "为什么是 ankacloud",
      title: "背景 agent 的产品很多，<br />它从记忆和人格开始做。",
      lede: "别的产品把“后台编码 agent”做成了 ticket 自动化：丢一个 issue 进去，等一个 PR 出来。ankacloud 把 agent 的长期记忆和人格当成一等公民——它更像一个你带着走的人，而不是一台一次性机器。",
      items: [
        {
          title: "一份连续的记忆",
          body: "agent 记住你在每个 thread 里做过什么、做过的决定、写下的偏好。新 sandbox 启动时，它不是一个陌生人。",
          aside: "MEMORY.md · SOUL.md · IDENTITY.md · facts",
        },
        {
          title: "一个 thread，一块云 sandbox",
          body: "写代码、跑 shell、访问网络，全部发生在独立的云 sandbox 里。sandbox 闲置就暂停，来消息就恢复，丢掉也能重建。",
          aside: "E2B · Tenki · Runta",
        },
        {
          title: "控制面只发号施令",
          body: "控制面只做 thread 登记、sandbox 生命周期、消息转发、事件扇出和记忆持久化；干活的是一个几乎未改动的 ankaloop。",
          aside: "你学到的 agent 技能不会被平台锁定",
        },
        {
          title: "所有工作一眼可见",
          body: "每个 thread 是 Board 上的一张卡：Todo、进行中、需要你、等你回复、完成。卡片状态由最后一轮推导，从不存库。",
          aside: "Telegram 与 Web 是同一份状态",
        },
      ],
    },
    architecture: {
      eyebrow: "架构",
      title: "控制面只发号施令，<br />活永远在 sandbox 里干。",
      ledeBefore: "ankacloud 本身不跑任务型 agent 循环。它登记 thread、管 sandbox 生命周期、转发消息、扇出事件、持久化记忆；真正的 agent 是 sandbox 里一个几乎未改动的 ",
      ledeAfter: "，thread id 直接就是它的 session id。",
      web: "Web UI",
      webSub: "HTTP · SSE",
      telegram: "Telegram",
      telegramSub: "bot API · 长轮询",
      plane: "ankacloud 控制面",
      planeChip: "单个 Python 进程",
      modules: [
        ["threads/", "SQLite 登记 · 状态机"],
        ["sandbox/", "E2B · Tenki · Runta"],
        ["events/", "NDJSON → SSE 扇出"],
        ["memory/", "HTTP 记忆 API"],
        ["home agent", "Anka · 不需要 sandbox"],
        ["reconciler", "闲置暂停 · 续期 · 重建"],
      ],
      memoryDir: "记忆、人格与 skills 的唯一真源",
      fan: "HTTPS · get_host + traffic token + API key",
      sandbox: "sandbox",
      running: "运行中",
      paused: "闲置已暂停 · 来消息即恢复",
      thread: "thread",
      props: [
        ["隔离", "每个 thread 的文件系统、shell、网络都在自己的 sandbox 里，互不可见。"],
        ["可恢复", "sandbox 被 pause、过期甚至销毁，对话历史和事件流仍能从控制面重放。"],
        ["可替换", "除了 ", "，还有 Tenki、Runta，可按 project 选。"],
        ["可部署", "一个 FastAPI 进程加一个 SQLite 文件，一台小机器就能跑；设计细节见", "设计文档", "。"],
      ],
    },
    workflows: {
      eyebrow: "日常使用",
      title: "从一个 thread 开始，<br />在一个地方看住全部。",
      items: [
        {
          tag: "Board",
          title: "五条泳道，所有工作一眼可见",
          body: "每个 thread 是 Board 上的一张卡。状态由最后一轮推导——Todo、进行中、需要你（上一轮失败）、等你回复（agent 已经回答）、完成——从不存库，所以永远不会和事实对不上。",
          alt: "ankacloud 的 Board 视图：Todo、In progress、Needs you、Waiting for you、Done 五列泳道，每个 thread 一张卡",
        },
        {
          tag: "记忆",
          title: "记忆、人格与 skills 都由控制面拥有",
          body: "MEMORY.md、SOUL.md、IDENTITY.md 和事实都放在控制面的同一个目录里，每个 sandbox 通过 HTTP 读写同一份；归档 thread 时，dreamer 会把它得出的结论折回全局记忆。改一次，处处生效。",
          alt: "ankacloud 的 Memory 面板：可查看和编辑 MEMORY.md、SOUL.md、IDENTITY.md 与事实",
        },
        {
          tag: "Anka",
          title: "Anka：不需要 sandbox 的常驻会话",
          body: "Anka 跑在控制面里，没有 shell。它回答不需要动手的问题、查 thread 状态、查记忆、搜索网页，并用 create_thread / send_to_thread 把活派给 sandbox——从 Telegram 发一句话，活就在云上开工了。",
          alt: "ankacloud 的 Anka 常驻会话：在控制面里回答问题并派单给 thread",
        },
      ],
    },
    channels: {
      eyebrow: "两个入口",
      title: "在 Web 里看，<br />在 Telegram 里派活。",
      ledeBefore: "两边是同一个控制面、同一份状态。没有当前 thread 时，消息交给 Anka：它能直接回答，也能调用 ",
      ledeAfter: " 把活派出去，新 thread 自动成为当前会话。每轮结束时，还能选择推一条“Thread finished”通知到 Telegram。",
      notes: [
        "流式回复按节流编辑同一条消息，不会刷屏。",
        "白名单之外的用户一律静默忽略——单人使用，不做配对。",
        "Web 页面刷新后可以从 ?after_seq= 续读，事件流不丢。",
      ],
      bot: "ankacloud bot",
      ask: "帮我看看 ankacloud 的 README 里 Telegram 那节，有没有漏写的命令？",
      dispatchMsg: "这需要读仓库，我开个 thread 去做。",
      dispatched: "已派单",
      current: "ankacloud · 当前 thread",
      doneTitle: "ankacloud · t-1a2b3c4d5e6f",
      doneBodyBefore: "找到三处：README 的命令表漏了 ",
      doneBodyMid: " 的别名说明；",
      doneBodyAfter: " 的前缀匹配没有写歧义时的行为。已经开了分支 ",
      doneBodyEnd: " 并提交。",
      notify: "Thread finished · 文档补丁已就绪",
      commands: [
        ["/new [title]", "新建 thread 并设为当前"],
        ["/threads", "列出最近 10 个 thread 及其状态"],
        ["/switch <id>", "切换当前 thread"],
        ["/home [text]", "回到 Anka；带文本时让它直接回答或派单"],
        ["/status", "当前 sandbox / agent 状态与正在跑的那一轮"],
        ["/archive", "归档 thread（销毁 sandbox，折叠记忆）"],
      ],
    },
    memory: {
      eyebrow: "长期记忆",
      title: "控制面是记忆的唯一真源。",
      ledeBefore: "sandbox 随时会被暂停、过期、销毁，记忆不能跟着它走。所以 ",
      ledeAfter: " 放在控制面：每个 sandbox 通过 HTTP 读写同一份，thread 之间按需隔离，归档时再把结论折回全局。",
      steps: [
        ["thread 开始", "sandbox 启动时把人格、skills 和 AGENTS.md 推进去；记忆通过带 thread 专属 token 的 HTTP API 读控制面。"],
        ["thread 进行", "每个 thread 有自己的笔记作用域，互不污染；全局 MEMORY.md 只由 dreamer、Anka 和你本人写。"],
        ["thread 归档", "该 thread 的 token 立即失效；它的结论由 Anka 整理进全局记忆，下一次开新 thread 时它已经知道。"],
      ],
      files: [
        ["MEMORY.md", "长期记忆：做过的决定、结论、项目约定"],
        ["SOUL.md", "它是什么样的人"],
        ["IDENTITY.md", "它怎么称呼自己、怎么和你说话"],
        ["facts/", "一条一条可以单独改的事实"],
        ["skills/", "SKILL.md + 脚本，改一次处处生效"],
      ],
      truth: "唯一真源",
      local: "本地",
    },
    capabilities: {
      eyebrow: "其它",
      title: "该有的都有，<br />而且都在同一个进程里。",
      items: [
        ["项目与 GitHub", "配好仓库、环境变量、机型与默认 provider，thread 自己 clone、开分支、用 gh pr create 开 PR；GitHub token 从不进入 sandbox，由 E2B 出口代理注入。"],
        ["Skills", "在 Web 的 Skills 面板或让 Anka 用内置 skill-creator 创建，落到控制面同一个目录；新建 thread 时挂载，改动由 SkillWatcher 热加载。"],
        ["Providers", "每个 provider 维护一组可用模型（上下文窗口、输出上限、推理强度），thread 显式选择 provider 与模型。"],
        ["MCP", "MCP server 按 thread 绑定进 sandbox；只有显式勾选的 http server 才会出现在 Anka 的工具里。"],
        ["Sandbox 运行时", "E2B、Tenki、Runta 之外是一层 SandboxProvider 抽象，每种运行时按能力目录生成自己的表单。"],
        ["定时与通知", "定时任务由 Anka 执行或转派；每轮结束可以推一条 Telegram 完成通知，状态、标题、thread id 一行说完。"],
      ],
    },
    quickstart: {
      eyebrow: "快速开始",
      title: "一个进程，一个 SQLite 文件。",
      ledeBefore: "需要 Python ≥ 3.11 和 ",
      ledeAfter: "。空 key 也足够跑单元测试和启动 Web UI；真的要开 sandbox、调模型，再填 ",
      ledeAnd: " 和 ",
      step1: "拉代码并装依赖",
      step2: "填四个必填项",
      step3: "启动",
      local: "本地运行",
      server: "服务器部署",
      logs: [
        ["web API on", "127.0.0.1:8000"],
        ["reconciler every", "60s", "· 闲置暂停", "10m"],
        ["telegram channel", "未配置"],
      ],
      links: { quick: "完整快速开始", deploy: "systemd 部署与运维" },
    },
    usecases: {
      eyebrow: "适合谁",
      title: "给你的 agent 造一个家，<br />不是给公司造一个平台。",
      fit: [
        ["一个自己的 agent", "你希望 agent 知道你是谁、哪些仓库重要、上次决定了什么——而不是每个任务都从零开始。"],
        ["小团队", "几个人的活都跑在同一块云上，每个 thread 隔离，各自开 PR，记忆与 skills 共用一份。"],
        ["折腾派", "一台小机器、一个进程、一个 SQLite 文件；agent 本体是上游 ankaloop，随时能拆开看。"],
      ],
      notYet: "现在不做",
      notYetItems: ["多租户与权限系统", "计费", "团队协作", "本地 runner", "桌面 / 浏览器 portal"],
    },
    cta: {
      title: "开一个 thread，<br />让它开始记得你。",
      body: "Apache-2.0 开源，v{version}。欢迎 issue、PR，以及一个你会每天都用的 agent。",
      github: "在 GitHub 上查看",
      quickstart: "快速开始",
    },
    footer: {
      tagline: "单用户的 agent-in-sandbox 控制面。每个 thread 一个隔离的云 sandbox，一份连续的记忆。",
      project: "项目",
      builtOn: "构建于",
      design: "设计文档",
      contributing: "贡献指南",
      license: "Apache-2.0 许可证",
      agent: "ankaloop · agent 本体",
      sandbox: "E2B · 云 sandbox",
      storage: "SQLite · 唯一的数据存储",
    },
    notFound: {
      title: "页面不存在 · ankacloud",
      description: "这个页面不存在。",
      heading: "404",
      body: "这个页面不存在——也许它还在某个 sandbox 里。",
      home: "回到首页",
    },
    docs: {
      back: "← 返回首页",
    },
  },
} as const;

export type Dict = (typeof ui)[Lang];

export function t(lang: Lang): Dict {
  return ui[lang] as Dict;
}

/** Every UI string in the dictionary is `string | readonly string[]`; this narrows one. */
export function str(value: string | readonly string[]): string {
  return typeof value === "string" ? value : value.join("");
}

/** Splits a `{version}`-style template on its placeholder. */
export function split(template: string, placeholder: string): [string, string] {
  const i = template.indexOf(placeholder);
  return [template.slice(0, i), template.slice(i + placeholder.length)];
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : defaultLang;
}

/** "/docs/memory/" in English, "/zh/docs/memory/" in Chinese. */
export function path(lang: Lang, p: string): string {
  const clean = p.replace(/^\/|\/$/g, "");
  const base = lang === defaultLang ? "" : `/${lang}`;
  return clean ? `${base}/${clean}/` : `${base}/`;
}
