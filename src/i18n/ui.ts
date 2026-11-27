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
      title: "ankacloud · The agent you carry around, working in isolated cloud sandboxes",
      description:
        "A single-user control plane for cloud-sandboxed coding agents: one isolated sandbox per thread, one continuous long-term memory across all of them. One Python process, one SQLite file, Apache-2.0.",
    },
    header: {
      home: "ankacloud home",
      nav: { features: "Features", architecture: "Architecture", memory: "Memory", quickstart: "Quickstart" },
      theme: "Toggle light and dark theme",
    },
    hero: {
      pill: "v1.0 · Now open source, one docker run away",
      title1: "The agent you carry around,",
      title2Before: "in an ",
      title2Accent: "isolated",
      title2After: " cloud sandbox.",
      lede: "A single-user control plane for cloud-sandboxed agents. Start a thread from the web UI or Telegram — it writes code, runs shell commands, browses the web, and opens PRs inside its own sandbox, while remembering who you are and what you decided across every past thread.",
      start: "Get started",
      how: "See how it works",
      facts: ["Python process", "SQLite file", "1 thread = 1 sandbox", "Apache-2.0"],
      alt: "The ankacloud thread view: the agent's tool calls and final report for a fix, running in its own cloud sandbox",
      caption: "A real thread: the agent fixes an SSE reconnect race in its own E2B sandbox, runs all 416 tests, and opens draft PR #127.",
    },
    features: {
      eyebrow: "Why ankacloud",
      title: "Plenty of background agents.<br />This one starts with memory.",
      lede: "Most background coding agents treat work like ticket automation: drop an issue in, wait for a PR to come out. ankacloud makes long-term memory and persona first-class — less a disposable worker, more a collaborator you carry with you.",
      items: [
        {
          title: "One continuous memory",
          body: "Your agent remembers past threads, decisions you made, and preferences you wrote down. A fresh sandbox never starts as a stranger.",
          aside: "MEMORY.md · SOUL.md · IDENTITY.md · facts",
        },
        {
          title: "One thread, one cloud sandbox",
          body: "Code, shell, and network stay isolated inside each thread's own cloud sandbox. Idle sandboxes pause automatically, wake on the next message, and rebuild cleanly if lost.",
          aside: "E2B · Tenki · Runta",
        },
        {
          title: "A thin control plane",
          body: "It tracks threads, manages sandbox lifecycles, relays messages, fans out events, and persists memory. The actual work runs on a nearly unmodified ankaloop.",
          aside: "Your agent and skills stay portable",
        },
        {
          title: "All your work at a glance",
          body: "Every thread appears as a card on the Board: Todo, In progress, Needs you, Waiting for you, and Done. Lanes are derived live from the latest turn, never stored separately.",
          aside: "Web and Telegram share one state",
        },
      ],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "The control plane orchestrates.<br />Sandboxes do the work.",
      ledeBefore: "ankacloud never runs the task agent loop itself. It tracks threads, manages sandbox lifecycles, relays messages, fans out events, and persists memory; the actual work runs inside each sandbox on a nearly unmodified ",
      ledeAfter: ", using the thread ID as its session ID.",
      web: "Web UI",
      webSub: "HTTP · SSE",
      telegram: "Telegram",
      telegramSub: "Bot API · long polling",
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
      memoryDir: "memory, persona, and skills — single source of truth",
      fan: "HTTPS · get_host + traffic token + API key",
      sandbox: "sandbox",
      running: "running",
      paused: "idle, paused · resumes on the next message",
      thread: "thread",
      props: [
        ["Isolated", "Each thread's filesystem, shell, and network live in its own sandbox, completely cut off from the rest."],
        ["Recoverable", "If a sandbox pauses, expires, or disappears, the control plane still holds the full history and event stream to rebuild it."],
        ["Swappable", "Alongside ", ", ankacloud supports Tenki and Runta — configurable per project."],
        ["Self-hostable", "One FastAPI process and one SQLite file run on any small VPS. Read the ", "design doc", "."],
      ],
    },
    workflows: {
      eyebrow: "Day to day",
      title: "Start one thread.<br />Track them all in one place.",
      items: [
        {
          tag: "Board",
          title: "Five lanes, every thread at a glance",
          body: "Every thread is a card on the Board. Its lane is derived straight from the latest turn — Todo, In progress, Needs you (last turn failed), Waiting for you (the agent replied), or Done — so the board never drifts from reality.",
          shot: "board",
        },
        {
          tag: "Memory",
          title: "Memory, persona, and skills stay on the control plane",
          body: "MEMORY.md, SOUL.md, IDENTITY.md, and facts live in one directory on the control plane, shared by every sandbox over HTTP. Archiving a thread folds its takeaways back into global memory — edit once, and every sandbox picks it up.",
          shot: "memory",
        },
        {
          tag: "Anka",
          title: "Anka: a resident agent with no sandbox overhead",
          body: "Anka runs inside the control plane without a shell. It handles questions that don't need a repo, checks thread status and memory, searches the web, and kicks off cloud work via create_thread and send_to_thread — send one message on Telegram and work starts immediately.",
          shot: "home",
        },
      ],
    },
    channels: {
      eyebrow: "Two front doors",
      title: "Follow on the web.<br />Dispatch from Telegram.",
      ledeBefore: "Both talk to the same control plane and share one state. With no active thread, your message goes to Anka — it either answers directly or spawns a task with ",
      ledeAfter: ", switching your active thread automatically. Turn on notifications to get a one-line “Thread finished” ping on Telegram when a turn completes.",
      notes: [
        "Streaming replies update a single message on a throttle, keeping your chat clean.",
        "Anyone outside your allowlist is silently ignored — single-user by design, no pairing flow needed.",
        "Reloading the web UI resumes cleanly from ?after_seq=, so no events are ever dropped.",
      ],
      bot: "ankacloud bot",
      ask: "Can you check if the README's Telegram section is missing any commands?",
      dispatchMsg: "That needs the repo. Opening a thread for it.",
      dispatched: "Dispatched",
      current: "ankacloud · current thread",
      doneTitle: "ankacloud · t-1a2b3c4d5e6f",
      doneBodyBefore: "Found two gaps: the command table omits the ",
      doneBodyMid: " alias notes, and it doesn't mention how ",
      doneBodyAfter: " handles ambiguous prefixes. Committed the fix on ",
      doneBodyEnd: ".",
      notify: "Thread finished · docs patch ready",
      commands: [
        ["/new [title]", "Create a thread and switch to it"],
        ["/threads", "List the 10 most recent threads and their status"],
        ["/switch <id>", "Switch the active thread"],
        ["/home [text]", "Return to Anka; with text, answer or dispatch"],
        ["/status", "Show sandbox/agent state and the active turn"],
        ["/archive", "Archive the thread (stop sandbox, fold memory)"],
      ],
    },
    memory: {
      eyebrow: "Long-term memory",
      title: "The control plane owns your long-term memory.",
      ledeBefore: "Sandboxes pause, expire, and get torn down, so memory doesn't belong inside them. ",
      ledeAfter: " lives on the control plane: every sandbox reads and writes through it over HTTP, threads stay isolated while active, and archiving distills conclusions back into global memory.",
      steps: [
        ["Thread starts", "Persona, skills, and AGENTS.md are pushed into the sandbox; memory is fetched from the control plane over HTTP using a thread-scoped token."],
        ["Thread runs", "Each thread writes only to its own note scope so concurrent work never cross-contaminates; global MEMORY.md is updated only by memory consolidation, Anka, and you."],
        ["Thread archives", "The thread's token is revoked on the spot, and Anka folds its takeaways into global memory — so the next thread starts already up to speed."],
      ],
      files: [
        ["MEMORY.md", "Long-term memory: decisions, conclusions, and project conventions"],
        ["SOUL.md", "Who the agent is and how it works"],
        ["IDENTITY.md", "How it names itself and speaks to you"],
        ["facts/", "Discrete facts you can inspect and edit one by one"],
        ["skills/", "SKILL.md and scripts — edit once, active everywhere"],
      ],
      truth: "single source of truth",
      local: "local",
    },
    gallery: {
      eyebrow: "In the wild",
      title: "Every screen here is real, not a mockup.",
      lede: "Every screenshot on this page comes straight from one live control plane — real E2B sandboxes, real models, real GitHub repos. Inside: a thread fixing an SSE reconnect race and opening a PR, a dependency audit, a cross-repo PR review, a web-research digest, a quick script, and Anka tying it all together.",
      wide: {
        alt: "A thread on mobile: a script the agent wrote and ran, with its output files listed at the end of the reply",
        caption: "A thread on mobile: the script the agent wrote, and the files it left behind.",
      },
      dark: {
        alt: "The Board in dark mode: Todo, In progress, Needs you, Waiting for you, and Done lanes with thread cards",
        caption: "The Board in dark mode, following your system theme.",
      },
      tall: {
        alt: "The mobile drawer: threads grouped by project, with Board, GitHub, and Settings below",
        caption: "Threads grouped by project in the mobile drawer.",
      },
      mobile: {
        alt: "Anka on mobile: one status reply listing every thread, its PR, and where it stands",
        caption: "Anka on mobile: one reply summarizing every active thread.",
      },
      dialog: {
        alt: "The Skills dialog for a thread: pr-review, release-notes, and web-digest all selected",
        caption: "Picking skills for a thread: select a subset, or leave empty to mount them all.",
      },
      review: {
        alt: "A read-only review of three open kong-operator pull requests, each with a verdict and test results",
        caption: "A read-only PR review in another repository, with a verdict and test results for each PR.",
      },
      darkThread: {
        alt: "A script thread in dark mode, showing tool calls, the model, the sandbox provider, and the final reply",
        caption: "A script thread in dark mode, showing its model and sandbox runtime in the header.",
      },
    },
    capabilities: {
      eyebrow: "Built in",
      title: "Everything you expect,<br />all in one process.",
      items: [
        {
          title: "Projects and GitHub",
          body: "Configure a repo, env vars, machine size, and default provider once. Every thread clones the repo, works on its own branch, and opens a PR via gh pr create. Your GitHub token never enters the sandbox — E2B's egress proxy injects it.",
          shot: "projects",
        },
        {
          title: "Skills",
          body: "Author skills in the web UI or ask Anka to generate them with the built-in skill-creator; both write to the same control-plane directory. Threads mount them at creation, and edits hot-reload via SkillWatcher.",
          shot: "skills",
        },
        {
          title: "Providers",
          body: "Attach multiple models per provider with custom context windows, output limits, and reasoning effort. Every thread chooses its provider and model explicitly.",
          shot: "providers",
        },
        {
          title: "Sandbox runtimes",
          body: "E2B, Tenki, and Runta all sit behind one SandboxProvider interface, with a capability catalog that builds each runtime's settings form automatically.",
          shot: "sandbox",
        },
        {
          title: "MCP",
          body: "MCP servers attach directly inside each thread's sandbox; only HTTP servers you explicitly opt in are exposed to Anka.",
        },
        {
          title: "Schedules and notifications",
          body: "Anka runs scheduled prompts directly or dispatches them to sandboxes. Finished turns can ping Telegram with a concise one-line status, title, and thread ID.",
        },
      ],
      shots: {
        projects: {
          alt: "Projects settings: three repositories — ankacloud and ankaloop on GitHub, kong-operator read-only — each with its thread count",
          caption: "Projects: repositories, branches, and the threads working in them.",
        },
        skills: {
          alt: "Skills settings: a catalog of pr-review, release-notes, and web-digest",
          caption: "Skills on the control plane; each thread mounts what it needs.",
        },
        providers: {
          alt: "Model providers settings: Baseten with GLM-5.3, Kimi-K3.1-Pro, and DeepSeek, plus OpenRouter",
          caption: "One provider, multiple models — every thread picks its own.",
        },
        sandbox: {
          alt: "Sandbox settings: the E2B Cloud provider with lifetime, idle pause, and machine size",
          caption: "Sandbox lifetime, idle pause, and machine size per runtime.",
        },
      },
    },
    quickstart: {
      eyebrow: "Quickstart",
      title: "One process. One SQLite file.",
      ledeBefore: "Requires Python ≥ 3.11 and ",
      ledeAfter: ". You can run the test suite and explore the web UI with no API keys; when you're ready to launch sandboxes and call models, set ",
      ledeAnd: " and ",
      ledeEnd: ".",
      step1: "Clone and install",
      step2: "Set the four required env vars",
      step3: "Start the server",
      docker: "Docker",
      local: "Local",
      server: "On a server",
      logs: [
        ["web API on", "127.0.0.1:8000"],
        ["reconciler every", "60s", "· idle pause", "10m"],
        ["telegram channel", "not configured"],
      ],
      links: { docker: "Run with Docker", quick: "Full quickstart", deploy: "systemd deploy & operations" },
    },
    usecases: {
      eyebrow: "Who it's for",
      title: "A home for your agent,<br />not a platform for a company.",
      fit: [
        ["Your own agent", "You want an agent that knows who you are, which repos matter, and what you decided last time — instead of re-explaining context on every task."],
        ["A small team", "A few people sharing one cloud deployment: every thread isolated, each opening its own PR, all drawing from one memory and one skill catalog."],
        ["Builders & tinkerers", "One small VPS, one process, one SQLite file, and upstream ankaloop underneath — clean enough to read and hack end to end."],
      ],
      notYet: "Not yet",
      notYetItems: ["Multi-tenancy & RBAC", "Billing", "Team collaboration", "Local runners", "Desktop / browser portals"],
    },
    cta: {
      title: "Open a thread.<br />Let it start remembering you.",
      body: "Open source under Apache-2.0 ({version}). Issues, PRs, and feedback from daily use are always welcome.",
      github: "View on GitHub",
      quickstart: "Quickstart",
    },
    footer: {
      tagline: "A single-user control plane for cloud-sandboxed agents. One isolated sandbox per thread, one continuous memory.",
      project: "Project",
      builtOn: "Built on",
      design: "Design doc",
      contributing: "Contributing",
      license: "Apache-2.0 license",
      agent: "ankaloop · the agent runtime",
      sandbox: "E2B · cloud sandboxes",
      storage: "SQLite · the only datastore",
    },
    notFound: {
      title: "Page not found · ankacloud",
      description: "This page does not exist.",
      heading: "404",
      body: "This page doesn't exist — maybe it's still inside a sandbox.",
      home: "Back home",
    },
    docs: {
      back: "← Back home",
    },
  },
  zh: {
    meta: {
      title: "ankacloud · 真正记得你的个人 Agent，在独立云沙箱里持续工作",
      description:
        "专为个人打造的云沙箱 Agent 控制面：每个会话独占一个隔离云沙箱，所有任务共享同一份连续的长期记忆。单 Python 进程、单 SQLite 文件，Apache-2.0 开源。",
    },
    header: {
      home: "ankacloud 首页",
      nav: { features: "特性", architecture: "架构", memory: "记忆", quickstart: "快速开始" },
      theme: "切换深浅色主题",
    },
    hero: {
      pill: "v1.0 · 正式开源，一条 docker run 即可启动",
      title1: "真正记得你的个人 Agent，",
      title2Before: "在",
      title2Accent: "完全隔离",
      title2After: "的云沙箱里工作。",
      lede: "专为个人打造的云沙箱 Agent 控制面。在 Web 或 Telegram 里随时发起一个会话，它会在专属的云端沙箱里写代码、跑命令、查网页、提 PR——同时始终记得你是谁，以及你在其他会话里做过的每一个决定。",
      start: "立即上手",
      how: "了解架构原理",
      facts: ["个 Python 进程", "个 SQLite 文件", "每会话独立沙箱", "Apache-2.0 开源"],
      alt: "ankacloud 会话视图：Agent 在独立云沙箱中修复 Bug 的完整工具调用与最终报告",
      caption: "真实运行截图：Agent 在独立 E2B 沙箱中修复 SSE 重连竞态，跑通全部 416 项测试，并提交草稿 PR #127。",
    },
    features: {
      eyebrow: "为什么选择 ankacloud",
      title: "后台 Agent 已经很多，<br />但这一次，从记忆出发。",
      lede: "大多数后台编程 Agent 像工单流水线：丢进一个 Issue，等出一个 PR，任务结束便彼此忘却。ankacloud 把长期记忆和个性设定做成一等公民——它不是用完即弃的临时工，而是越用越懂你的长期搭档。",
      items: [
        {
          title: "一份持续生长的记忆",
          body: "它记得你过往的会话、敲定过的技术方案和写下的个人偏好。哪怕换了全新的沙箱，它依然懂你，不必每次从头交代背景。",
          aside: "MEMORY.md · SOUL.md · IDENTITY.md · facts",
        },
        {
          title: "一会话，一沙箱",
          body: "写代码、跑命令、访问网络全部隔离在专属云沙箱中。闲置时自动休眠省成本，来消息秒级唤醒，沙箱意外丢失也能无损重建。",
          aside: "E2B · Tenki · Runta",
        },
        {
          title: "控制面轻装上阵",
          body: "控制面只负责会话管理、沙箱调度、消息转发、事件分发与记忆存储；真正执行任务的是几乎零侵入的上游 ankaloop。",
          aside: "你的 Agent 与 Skills 不被平台绑定",
        },
        {
          title: "全局进度，一眼掌握",
          body: "每个会话都是 Board 上的一张卡片：Todo、In progress、Needs you、Waiting for you、Done。状态完全由最新一轮实时推导，绝不与事实脱节。",
          aside: "Web 与 Telegram 实时同步同一状态",
        },
      ],
    },
    architecture: {
      eyebrow: "系统架构",
      title: "控制面运筹调度，<br />执行全在沙箱里。",
      ledeBefore: "ankacloud 本身不运行任务 Agent 循环，只负责会话登记、沙箱生命周期管理、消息中转、事件分发与记忆持久化；真正干活的是每个沙箱里几乎未经修改的 ",
      ledeAfter: "，直接复用 thread ID 作为会话标识。",
      web: "Web UI",
      webSub: "HTTP · SSE",
      telegram: "Telegram",
      telegramSub: "Bot API · 长轮询",
      plane: "ankacloud 控制面",
      planeChip: "单 Python 进程",
      modules: [
        ["threads/", "SQLite 存储 · 状态机"],
        ["sandbox/", "E2B · Tenki · Runta"],
        ["events/", "NDJSON → SSE 分发"],
        ["memory/", "HTTP 记忆 API"],
        ["home agent", "Anka · 无需沙箱"],
        ["reconciler", "闲置休眠 · 续期 · 重建"],
      ],
      memoryDir: "记忆、人格与 Skills 的唯一数据源",
      fan: "HTTPS · get_host + traffic token + API key",
      sandbox: "沙箱",
      running: "运行中",
      paused: "闲置休眠 · 来消息即唤醒",
      thread: "会话",
      props: [
        ["彻底隔离", "每个会话的文件系统、终端与网络环境完全隔离在独立沙箱中，互不干扰。"],
        ["无损恢复", "即便沙箱休眠、超时甚至销毁，控制面仍保留完整的对话记录与事件流，随时重建。"],
        ["灵活切换", "除 ", " 外，还支持 Tenki 与 Runta，可按项目按需选择运行时。"],
        ["极简部署", "一个 FastAPI 进程加一个 SQLite 文件，任意小型主机即可稳定运行；详见", "设计文档", "。"],
      ],
    },
    workflows: {
      eyebrow: "日常工作流",
      title: "随时开启任务，<br />全局尽在掌控。",
      items: [
        {
          tag: "Board",
          title: "五列看板，所有任务一目了然",
          body: "每个会话都是 Board 上的一张卡片，所在列完全由最后一轮执行结果实时推导——Todo、In progress、Needs you（上一轮失败）、Waiting for you（等待回复）和 Done。无需手动拖拽维护，看板永远与真实进度一致。",
          shot: "board",
        },
        {
          tag: "记忆",
          title: "记忆、人格与 Skills，一处维护全局生效",
          body: "MEMORY.md、SOUL.md、IDENTITY.md 与事实条目都统一存放在控制面目录中，所有沙箱通过 HTTP 共享读写。会话归档时，关键结论会自动提炼并沉淀回全局记忆——改一次，处处生效。",
          shot: "memory",
        },
        {
          tag: "Anka",
          title: "Anka：无需沙箱的常驻管家",
          body: "Anka 直接运行在控制面内，不依赖沙箱也不持有 Shell。它随时响应轻量问答、汇报各会话进度、检索长期记忆和网页，还能通过 create_thread 与 send_to_thread 派发云端任务——在 Telegram 里发一句话，沙箱立刻开工。",
          shot: "home",
        },
      ],
    },
    channels: {
      eyebrow: "双端入口",
      title: "Web 端深度跟进，<br />Telegram 随时派活。",
      ledeBefore: "Web 与 Telegram 连接同一个控制面，实时共享同一份状态。未选中会话时，消息默认发给 Anka——它可以直接解答，也能调用 ",
      ledeAfter: " 新建沙箱任务，并自动切换为当前会话。每轮任务完成时，还可开启 Telegram 推送，第一时间收到“任务完成”提醒。",
      notes: [
        "流式输出会按频率原地更新同一条消息，绝不刷屏。",
        "专为单人设计，无需繁琐配对；白名单外的任何消息都会被静默忽略。",
        "Web 页面刷新后自动从 ?after_seq= 断点续传，事件流零丢失。",
      ],
      bot: "ankacloud bot",
      ask: "帮我查下 ankacloud 的 README 里 Telegram 那一节，有没有漏写的命令？",
      dispatchMsg: "这需要看下仓库代码，我新开一个会话去排查。",
      dispatched: "已派发",
      current: "ankacloud · 当前会话",
      doneTitle: "ankacloud · t-1a2b3c4d5e6f",
      doneBodyBefore: "查出两处遗漏：命令表少了 ",
      doneBodyMid: " 的别名说明，也没交代 ",
      doneBodyAfter: " 前缀存在歧义时的处理逻辑。已切出分支 ",
      doneBodyEnd: " 并完成提交。",
      notify: "任务完成 · 文档补丁已就绪",
      commands: [
        ["/new [title]", "新建会话并切换过去"],
        ["/threads", "查看最近 10 个会话及状态"],
        ["/switch <id>", "切换当前会话"],
        ["/home [text]", "切回 Anka；附带内容时直接问答或派发任务"],
        ["/status", "查看沙箱、Agent 状态与当前轮次"],
        ["/archive", "归档会话（销毁沙箱并整理记忆）"],
      ],
    },
    memory: {
      eyebrow: "长期记忆",
      title: "所有长期记忆，统一沉淀在控制面。",
      ledeBefore: "沙箱随时可能休眠、过期或销毁，记忆绝不能绑死在沙箱里。ankacloud 将 ",
      ledeAfter: " 保存在控制面：所有沙箱通过 HTTP 读写同一份数据，运行中按会话隔离笔记，归档时再把有效结论提炼回全局记忆。",
      steps: [
        ["会话启动", "创建沙箱时自动推入人格配置、Skills 与 AGENTS.md；长期记忆则通过会话专属 Token 经 HTTP API 从控制面按需读取。"],
        ["会话运行", "每个会话只写入自己的独立笔记空间，彼此互不污染；全局 MEMORY.md 仅允许记忆整理、Anka 与你本人写入。"],
        ["会话归档", "该会话的访问 Token 立即吊销，Anka 将其中的关键结论整理进全局记忆——下次新开任务，它已经了然于胸。"],
      ],
      files: [
        ["MEMORY.md", "长期记忆：历史决策、关键结论与项目约定"],
        ["SOUL.md", "Agent 的人格设定与行事风格"],
        ["IDENTITY.md", "它的自我称呼与对你的交流口吻"],
        ["facts/", "可逐条查看、增删改的独立事实条目"],
        ["skills/", "SKILL.md 与配套脚本，一处修改全局生效"],
      ],
      truth: "唯一数据源",
      local: "本地直连",
    },
    gallery: {
      eyebrow: "真实界面",
      title: "所见即所得，没有一张概念图。",
      lede: "本页所有截图均采自真实运行中的控制面——真实的 E2B 沙箱、真实模型调用、真实 GitHub 仓库。画面背后涵盖修复 SSE 重连竞态并提 PR、依赖审计、跨仓库 PR 评审、网页调研摘要、临时脚本执行，以及把一切串联起来的 Anka。",
      wide: {
        alt: "手机端会话视图：Agent 编写并执行脚本，在回复末尾列出生成的文件",
        caption: "手机端会话视图：Agent 编写运行的脚本与产出的文件。",
      },
      dark: {
        alt: "深色模式下的 Board 看板：展示 Todo、In progress、Needs you、Waiting for you、Done 五列与会话卡片",
        caption: "深色模式下的 Board 看板，自动跟随系统主题。",
      },
      tall: {
        alt: "手机端侧边抽屉：按项目分组的会话列表，底部为 Board、GitHub 与 Settings 入口",
        caption: "手机端侧边抽屉：按项目清晰归类的全部会话。",
      },
      mobile: {
        alt: "手机端 Anka 对话：一条回复汇总各活跃会话、对应 PR 及当前进度",
        caption: "手机端 Anka：一条回复总览全部活跃任务进度。",
      },
      dialog: {
        alt: "会话的 Skills 选择弹窗：已勾选 pr-review、release-notes 与 web-digest",
        caption: "为会话挑选 Skills：按需勾选，或留空默认全部挂载。",
      },
      review: {
        alt: "跨仓库对 kong-operator 三个开放 PR 的只读评审，逐一给出结论与测试结果",
        caption: "跨仓库只读 PR 评审：逐一给出审查结论与测试结果。",
      },
      darkThread: {
        alt: "深色模式下的脚本会话：展示工具调用、所用模型、沙箱运行时与最终输出",
        caption: "深色模式下的脚本会话，顶栏清晰标示所用模型与沙箱运行时。",
      },
    },
    capabilities: {
      eyebrow: "开箱即用",
      title: "该有的能力，<br />全都在这一个进程里。",
      items: [
        {
          title: "项目管理与 GitHub",
          body: "配置好仓库、环境变量、沙箱规格与默认 Provider 后，每个会话都会自动拉取代码、切出新分支并用 gh pr create 提交 PR。GitHub Token 始终留在沙箱之外，由 E2B 出口代理安全注入。",
          shot: "projects",
        },
        {
          title: "Skills 技能体系",
          body: "既可在 Web 面板直接编写，也可让 Anka 调用内置 skill-creator 生成，二者写入控制面同一目录。新建会话自动挂载，改动后由 SkillWatcher 实时热加载。",
          shot: "skills",
        },
        {
          title: "多 Provider 与模型配置",
          body: "单个 Provider 下可配置多个模型，分别设定上下文窗口、输出上限与推理强度；每个会话均可按需自由指定 Provider 与模型。",
          shot: "providers",
        },
        {
          title: "多沙箱运行时",
          body: "E2B、Tenki 与 Runta 统一收敛在 SandboxProvider 接口之下，并由能力目录自动生成各运行时的配置表单。",
          shot: "sandbox",
        },
        {
          title: "MCP 工具集成",
          body: "MCP Server 直接挂载进各会话的隔离沙箱；仅当你显式勾选授权时，对应的 HTTP Server 才会开放给 Anka 使用。",
        },
        {
          title: "定时任务与完成通知",
          body: "定时任务由 Anka 直接执行或转派至云端沙箱；每轮执行结束后可向 Telegram 推送一行精简通知，一目了然展示状态、标题与会话 ID。",
        },
      ],
      shots: {
        projects: {
          alt: "Projects 设置页：展示 GitHub 上的 ankacloud、ankaloop 与只读仓库 kong-operator，以及各自的会话数量",
          caption: "项目管理：仓库配置、分支策略与关联的活跃会话。",
        },
        skills: {
          alt: "Skills 设置页：展示 pr-review、release-notes 与 web-digest 技能目录",
          caption: "Skills 统一托管在控制面，各会话按需挂载。",
        },
        providers: {
          alt: "Model providers 设置页：Baseten 下配置了 GLM-5.3、Kimi-K3.1-Pro、DeepSeek，以及 OpenRouter",
          caption: "单 Provider 配置多模型，每个会话按需自选。",
        },
        sandbox: {
          alt: "Sandbox 设置页：展示 E2B Cloud 运行时的存活时长、闲置休眠与机型规格配置",
          caption: "按运行时独立配置存活时长、闲置休眠与机型规格。",
        },
      },
    },
    quickstart: {
      eyebrow: "快速开始",
      title: "一个进程，一个 SQLite 文件。",
      ledeBefore: "仅需 Python ≥ 3.11 与 ",
      ledeAfter: "。不填任何 Key 就能跑通单元测试并体验 Web UI；需要实际拉起沙箱并调用模型时，再配置 ",
      ledeAnd: " 与 ",
      ledeEnd: " 即可。",
      step1: "克隆仓库并安装依赖",
      step2: "配置四个必填环境变量",
      step3: "启动服务",
      docker: "Docker",
      local: "本地运行",
      server: "服务器部署",
      logs: [
        ["web API on", "127.0.0.1:8000"],
        ["reconciler every", "60s", "· 闲置休眠", "10m"],
        ["telegram channel", "未配置"],
      ],
      links: { docker: "使用 Docker 运行", quick: "完整快速开始指南", deploy: "systemd 部署与运维指南" },
    },
    usecases: {
      eyebrow: "适合谁用",
      title: "为你的 Agent 安一个家，<br />而不是替公司搭一套重平台。",
      fit: [
        ["追求长期默契的个人开发者", "你想要一个懂你的习惯、熟悉核心仓库、记得上次技术决策的专属 Agent，而不是每次开新任务都得重新自我介绍。"],
        ["精干的小团队", "几个人共用一套轻量的云端部署：每个任务各自隔离、独立提 PR，同时共享同一份团队记忆与技能库。"],
        ["爱折腾的极客与开源玩家", "一台小主机、一个进程、一个 SQLite 文件，底层直连上游 ankaloop——代码干净透明，随时可以按自己想法魔改。"],
      ],
      notYet: "暂不涉及",
      notYetItems: ["多租户与权限管理", "计费系统", "多人实时协作", "本地 Runner", "桌面端 / 浏览器插件"],
    },
    cta: {
      title: "发起第一个会话，<br />让它从今天开始记住你。",
      body: "基于 Apache-2.0 开源（当前版本 {version}）。欢迎提 Issue、发 PR，也欢迎在日常开发中把它调教成你最顺手的搭档。",
      github: "前往 GitHub",
      quickstart: "快速开始",
    },
    footer: {
      tagline: "专为个人打造的云沙箱 Agent 控制面。每个会话独占一个隔离云沙箱，所有任务共享一份连续的长期记忆。",
      project: "项目",
      builtOn: "技术栈",
      design: "设计文档",
      contributing: "贡献指南",
      license: "Apache-2.0 协议",
      agent: "ankaloop · Agent 运行时",
      sandbox: "E2B · 云端沙箱",
      storage: "SQLite · 唯一数据存储",
    },
    notFound: {
      title: "页面不存在 · ankacloud",
      description: "你访问的页面不存在。",
      heading: "404",
      body: "这个页面走丢了——也许它还留在某个云沙箱里。",
      home: "返回首页",
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

/** "/docs/memory/" in English, "/zh/docs/memory/" in Chinese, under the deploy
 *  base ("/" on Cloudflare, "/<repo>/" on GitHub Pages). */
export function path(lang: Lang, p: string): string {
  const clean = p.replace(/^\/|\/$/g, "");
  const base = lang === defaultLang ? "" : `/${lang}`;
  const prefix = import.meta.env.BASE_URL.replace(/\/$/, "");
  return clean ? `${prefix}${base}/${clean}/` : `${prefix}${base}/`;
}
