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
        "A single-user control plane for sandboxed coding agents: one isolated cloud sandbox per thread, one continuous long-term memory across all of them. One Python process, one SQLite file, Apache-2.0.",
    },
    header: {
      home: "ankacloud home",
      nav: { features: "Features", architecture: "Architecture", memory: "Memory", quickstart: "Quickstart" },
      theme: "Toggle light and dark theme",
    },
    hero: {
      pill: "v0.11 · pick a provider and model per thread",
      title1: "The agent you carry around,",
      title2Before: "in an ",
      title2Accent: "isolated",
      title2After: " cloud sandbox.",
      lede: "A single-user control plane for sandboxed agents. Open a thread in the web UI or Telegram, and it writes code, runs shell commands, fetches pages, and opens PRs in its own cloud sandbox — while remembering who you are and what you decided across every other thread.",
      start: "Get started",
      how: "See how it works",
      facts: ["Python process", "SQLite file", "1 thread = 1 sandbox", "Apache-2.0"],
      alt: "The ankacloud thread view: the agent's tool calls and final report for a fix, running in its own cloud sandbox",
      caption: "A real thread: the agent fixes an SSE reconnect race in its own E2B sandbox, runs all 416 tests, and opens draft PR #127.",
    },
    features: {
      eyebrow: "Why ankacloud",
      title: "Many background agents.<br />This one starts from memory.",
      lede: "Most background coding agents treat work like ticket automation: drop an issue in, wait for a PR to come out. ankacloud makes long-term memory and persona first-class — less a disposable worker, more a collaborator you carry with you.",
      items: [
        {
          title: "One continuous memory",
          body: "Your agent remembers past threads, decisions you made, and preferences you wrote down. A fresh sandbox never starts as a stranger.",
          aside: "MEMORY.md · SOUL.md · IDENTITY.md · facts",
        },
        {
          title: "One thread, one cloud sandbox",
          body: "Code, shell, and network all stay inside an isolated cloud sandbox. Idle sandboxes pause automatically, resume on the next message, and rebuild cleanly if lost.",
          aside: "E2B · Tenki · Runta",
        },
        {
          title: "The control plane only commands",
          body: "It tracks threads, manages sandbox lifecycles, relays messages, fans out events, and persists memory. The actual work runs on a nearly unmodified ankaloop.",
          aside: "Your agent and skills stay portable",
        },
        {
          title: "All your work at a glance",
          body: "Every thread is a card on the Board: Todo, In progress, Needs you, Waiting for you, and Done. Lanes are derived from the latest turn, never stored separately.",
          aside: "Web and Telegram share one state",
        },
      ],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "The control plane commands.<br />Sandboxes do the work.",
      ledeBefore: "ankacloud never runs the task agent loop itself. It tracks threads, manages sandbox lifecycles, relays messages, fans out events, and persists memory; the actual agent is a nearly unmodified ",
      ledeAfter: " running inside each sandbox, using the thread ID as its session ID.",
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
      memoryDir: "memory, persona, and skills — single source of truth",
      fan: "HTTPS · get_host + traffic token + API key",
      sandbox: "sandbox",
      running: "running",
      paused: "idle, paused · resumes on the next message",
      thread: "thread",
      props: [
        ["Isolated", "Each thread's filesystem, shell, and network live in its own sandbox, completely separate from the rest."],
        ["Recoverable", "Even if a sandbox pauses, expires, or disappears, the control plane replays its full history and event stream."],
        ["Swappable", "Alongside ", ", ankacloud supports Tenki and Runta — selectable per project."],
        ["Deployable", "One FastAPI process and one SQLite file run on any small machine. Read the ", "design doc", "."],
      ],
    },
    workflows: {
      eyebrow: "Day to day",
      title: "Start with one thread.<br />Track them all in one place.",
      items: [
        {
          tag: "Board",
          title: "Five lanes, every thread at a glance",
          body: "Every thread is a card on the Board. Its lane comes directly from the latest turn — Todo, In progress, Needs you (last turn failed), Waiting for you (the agent replied), or Done — so the board never drifts from reality.",
          shot: "board",
        },
        {
          tag: "Memory",
          title: "Memory, persona, and skills live on the control plane",
          body: "MEMORY.md, SOUL.md, IDENTITY.md, and facts live in one directory on the control plane, and every sandbox reads and writes that same source over HTTP. Archiving a thread folds its conclusions back into global memory. Edit once, and it takes effect everywhere.",
          shot: "memory",
        },
        {
          tag: "Anka",
          title: "Anka: a resident agent that needs no sandbox",
          body: "Anka runs inside the control plane without a shell. It answers questions that don't need a workspace, checks thread status and memory, searches the web, and dispatches tasks via create_thread and send_to_thread — send one Telegram message and work starts in the cloud.",
          shot: "home",
        },
      ],
    },
    channels: {
      eyebrow: "Two front doors",
      title: "Watch on the web.<br />Run from Telegram.",
      ledeBefore: "Both talk to the same control plane and share the same state. When no thread is active, your message goes to Anka — it answers directly or dispatches work with ",
      ledeAfter: ", making the new thread active. When a turn finishes, you can opt in to a “Thread finished” push on Telegram.",
      notes: [
        "Streamed replies edit a single message on a throttle, so they never flood the chat.",
        "Users outside the allowlist are silently ignored — single-user by design, no pairing flow.",
        "Refreshing the web UI resumes from ?after_seq=, so no events are ever lost.",
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
      title: "The control plane owns all long-term memory.",
      ledeBefore: "Sandboxes pause, expire, and get destroyed, so memory cannot live inside them. ",
      ledeAfter: " lives on the control plane: every sandbox reads and writes the same copy over HTTP, threads stay isolated until archived, and archiving folds conclusions back into global memory.",
      steps: [
        ["Thread starts", "Persona, skills, and AGENTS.md are pushed into the sandbox; memory is read from the control plane over HTTP using a thread-scoped token."],
        ["Thread runs", "Each thread writes to its own note scope so threads never pollute each other; global MEMORY.md is only updated by memory consolidation, Anka, and you."],
        ["Thread is archived", "That thread's token is revoked immediately, and Anka folds its conclusions into global memory — so the next thread starts already knowing."],
      ],
      files: [
        ["MEMORY.md", "Long-term memory: decisions, conclusions, and project conventions"],
        ["SOUL.md", "Who the agent is"],
        ["IDENTITY.md", "How it names itself and speaks to you"],
        ["facts/", "Individual facts you can edit one by one"],
        ["skills/", "SKILL.md and scripts; edit once, apply everywhere"],
      ],
      truth: "single source of truth",
      local: "local",
    },
    gallery: {
      eyebrow: "In the wild",
      title: "Every screen here is the product, not a mockup.",
      lede: "Every screenshot on this page comes from one running control plane — real E2B sandboxes, real models, real GitHub. Behind them: a thread fixing an SSE reconnect race and opening a PR, a dependency audit, a PR review in another repo, a web-research digest, a quick script, and Anka tying them all together.",
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
          body: "Configure a repository, env vars, machine size, and default provider. Each thread clones the repo, works on its own branch, and opens a PR with gh pr create. Your GitHub token never enters the sandbox — E2B's egress proxy injects it.",
          shot: "projects",
        },
        {
          title: "Skills",
          body: "Create skills in the web UI or let Anka generate them with the built-in skill-creator; both write to the same directory on the control plane. Threads mount them on creation, and edits hot-reload via SkillWatcher.",
          shot: "skills",
        },
        {
          title: "Providers",
          body: "Configure multiple models per provider with their own context window, output limit, and reasoning effort. Every thread picks its provider and model explicitly.",
          shot: "providers",
        },
        {
          title: "Sandbox runtimes",
          body: "E2B, Tenki, and Runta sit behind a single SandboxProvider interface, with a capability catalog generating each runtime's settings form.",
          shot: "sandbox",
        },
        {
          title: "MCP",
          body: "MCP servers attach directly inside each thread's sandbox; only HTTP servers you explicitly opt in are exposed to Anka.",
        },
        {
          title: "Schedules and notifications",
          body: "Anka runs or dispatches scheduled tasks. Each finished turn can send a single-line Telegram notification with its status, title, and thread ID.",
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
      ledeAfter: ". You can run the unit tests and open the web UI with empty keys; to launch sandboxes and call a model, set ",
      ledeAnd: " and ",
      ledeEnd: ".",
      step1: "Clone and install",
      step2: "Set the four required env vars",
      step3: "Start the server",
      local: "Local",
      server: "On a server",
      logs: [
        ["web API on", "127.0.0.1:8000"],
        ["reconciler every", "60s", "· idle pause", "10m"],
        ["telegram channel", "not configured"],
      ],
      links: { quick: "Full quickstart", deploy: "systemd deploy & operations" },
    },
    usecases: {
      eyebrow: "Who it's for",
      title: "A home for your agent,<br />not a platform for a company.",
      fit: [
        ["Your own agent", "You want an agent that knows who you are, which repositories matter, and what you decided last time — instead of starting from scratch on every task."],
        ["A small team", "A few people working on one cloud setup: every thread isolated, each opening its own PR, all sharing one memory and one set of skills."],
        ["Tinkerers", "One small server, one process, one SQLite file, and upstream ankaloop underneath — simple enough to read and modify end to end."],
      ],
      notYet: "Not yet",
      notYetItems: ["Multi-tenancy & RBAC", "Billing", "Team collaboration", "Local runners", "Desktop / browser portals"],
    },
    cta: {
      title: "Open a thread.<br />Let it start remembering you.",
      body: "Open source under Apache-2.0, {version}. Issues, PRs, and feedback from daily use are all welcome.",
      github: "View on GitHub",
      quickstart: "Quickstart",
    },
    footer: {
      tagline: "A single-user control plane for sandboxed agents. One isolated cloud sandbox per thread, one continuous memory.",
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
      title: "ankacloud · 随身带着的个人 agent，在隔离云沙箱里替你干活",
      description:
        "ankacloud 是单用户的云沙箱 agent 控制面：每个 thread 独占一个隔离云沙箱，所有 thread 共享同一份连续的长期记忆。一个 Python 进程、一个 SQLite 文件，Apache-2.0 开源。",
    },
    header: {
      home: "ankacloud 首页",
      nav: { features: "特性", architecture: "架构", memory: "记忆", quickstart: "快速开始" },
      theme: "切换深浅色主题",
    },
    hero: {
      pill: "v0.11 · 每个 thread 独立选择 provider 与模型",
      title1: "你随身带着的 agent，",
      title2Before: "在",
      title2Accent: "隔离",
      title2After: "的云沙箱里替你干活。",
      lede: "ankacloud 是单用户的云沙箱 agent 控制面。在 Web 或 Telegram 里开一个 thread，它就在独立的云沙箱中写代码、跑命令、读网页、开 PR——同时记得你是谁，以及你在其他 thread 里做过的每一个决定。",
      start: "开始使用",
      how: "了解工作原理",
      facts: ["个 Python 进程", "个 SQLite 文件", "1 thread = 1 sandbox", "Apache-2.0"],
      alt: "ankacloud 的 thread 视图：agent 在云沙箱里修复 bug 时的工具调用与最终报告",
      caption: "真实 thread 截图：agent 在独立的 E2B 沙箱里修复 SSE 重连竞态，跑完 416 个测试，并提交草稿 PR #127。",
    },
    features: {
      eyebrow: "为什么是 ankacloud",
      title: "后台 agent 已经很多，<br />这一款从记忆和人格出发。",
      lede: "大多数后台编码 agent 把工作做成工单流水线：丢进一个 issue，等出一个 PR。ankacloud 把长期记忆和人格当成一等公民——它不是用完即弃的机器，而是你可以随身带着走的协作者。",
      items: [
        {
          title: "一份连续的记忆",
          body: "agent 记得你在每个 thread 里干过什么、做过哪些决定、写下过什么偏好。哪怕换了新沙箱，它也不是从零认识你。",
          aside: "MEMORY.md · SOUL.md · IDENTITY.md · facts",
        },
        {
          title: "一个 thread，一个云沙箱",
          body: "写代码、跑命令、访问网络都在独立云沙箱里完成。闲置自动暂停，来消息立刻恢复，沙箱丢失也能自动重建。",
          aside: "E2B · Tenki · Runta",
        },
        {
          title: "控制面只发号施令",
          body: "控制面只管 thread 登记、沙箱生命周期、消息转发、事件扇出和记忆持久化；真正干活的是几乎未改动的 ankaloop。",
          aside: "你的 agent 与 skills 不被平台锁定",
        },
        {
          title: "所有进展一眼可见",
          body: "每个 thread 都是 Board 上的一张卡片：Todo、进行中、需要你、等你回复、完成。所在泳道由最后一轮实时推导，从不单独存库。",
          aside: "Web 与 Telegram 共享同一份状态",
        },
      ],
    },
    architecture: {
      eyebrow: "架构",
      title: "控制面只发号施令，<br />活永远在沙箱里干。",
      ledeBefore: "ankacloud 本身不跑任务型 agent 循环。它负责登记 thread、管理沙箱生命周期、转发消息、扇出事件并持久化记忆；真正执行任务的是沙箱里几乎未改动的 ",
      ledeAfter: "，thread ID 直接作为它的 session ID。",
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
        ["home agent", "Anka · 无需沙箱"],
        ["reconciler", "闲置暂停 · 续期 · 重建"],
      ],
      memoryDir: "记忆、人格与 skills 的唯一真源",
      fan: "HTTPS · get_host + traffic token + API key",
      sandbox: "沙箱",
      running: "运行中",
      paused: "闲置已暂停 · 来消息即恢复",
      thread: "thread",
      props: [
        ["隔离", "每个 thread 的文件系统、shell 和网络都隔离在各自沙箱中，互不可见。"],
        ["可恢复", "即使沙箱暂停、过期甚至被销毁，对话历史与事件流仍可从控制面完整重放。"],
        ["可替换", "除 ", " 外，还支持 Tenki 与 Runta，可按项目自由选择。"],
        ["易部署", "一个 FastAPI 进程加一个 SQLite 文件，任意小机器都能运行；架构细节见", "设计文档", "。"],
      ],
    },
    workflows: {
      eyebrow: "日常使用",
      title: "从一个 thread 开始，<br />在一处掌控全部进展。",
      items: [
        {
          tag: "Board",
          title: "五条泳道，所有 thread 一目了然",
          body: "每个 thread 都是 Board 上的一张卡片，泳道完全由最后一轮状态实时推导——Todo、进行中、需要你（上一轮出错）、等你回复（agent 已回复）、完成——从不单独存库，状态永远不会和事实脱节。",
          shot: "board",
        },
        {
          tag: "记忆",
          title: "记忆、人格与 skills 统一由控制面管理",
          body: "MEMORY.md、SOUL.md、IDENTITY.md 和事实条目都存放在控制面的同一目录中，所有沙箱通过 HTTP 读写同一份数据；归档 thread 时，记忆整理会把结论沉淀回全局记忆。改一次，处处生效。",
          shot: "memory",
        },
        {
          tag: "Anka",
          title: "Anka：无需沙箱的常驻助手",
          body: "Anka 直接跑在控制面内，不带 shell。它可以回答无需动手的问题、查询 thread 状态和记忆、搜索网页，还能用 create_thread 和 send_to_thread 把任务派给沙箱——在 Telegram 里发一句话，云端立刻开工。",
          shot: "home",
        },
      ],
    },
    channels: {
      eyebrow: "两个入口",
      title: "在 Web 里跟进，<br />在 Telegram 里派活。",
      ledeBefore: "两边连的是同一个控制面、同一份状态。没有选中 thread 时，消息会交给 Anka：它可直接回答，也能通过 ",
      ledeAfter: " 新开任务，新 thread 会自动成为当前会话。每轮结束时，还可以选择推送一条“Thread finished”通知到 Telegram。",
      notes: [
        "流式回复按节流频率原地更新同一条消息，不会刷屏。",
        "白名单之外的用户一律静默忽略——专为单人设计，无需配对。",
        "Web 页面刷新后自动从 ?after_seq= 续读，事件流不会丢失。",
      ],
      bot: "ankacloud bot",
      ask: "帮我看看 ankacloud 的 README 里 Telegram 那节，有没有漏写的命令？",
      dispatchMsg: "这需要看仓库代码，我开个 thread 去查。",
      dispatched: "已派单",
      current: "ankacloud · 当前 thread",
      doneTitle: "ankacloud · t-1a2b3c4d5e6f",
      doneBodyBefore: "查出两处遗漏：命令表少了 ",
      doneBodyMid: " 的别名说明，也没交代 ",
      doneBodyAfter: " 前缀有歧义时的行为。已切出分支 ",
      doneBodyEnd: " 并提交。",
      notify: "Thread finished · 文档补丁已就绪",
      commands: [
        ["/new [title]", "新建 thread 并设为当前会话"],
        ["/threads", "列出最近 10 个 thread 及其状态"],
        ["/switch <id>", "切换当前 thread"],
        ["/home [text]", "回到 Anka；附带文本时直接回答或派单"],
        ["/status", "查看沙箱 / agent 状态与当前轮次"],
        ["/archive", "归档 thread（销毁沙箱并整理记忆）"],
      ],
    },
    memory: {
      eyebrow: "长期记忆",
      title: "控制面是记忆的唯一真源。",
      ledeBefore: "沙箱随时会暂停、过期或销毁，记忆不能绑在沙箱里。因此 ",
      ledeAfter: " 留在控制面：所有沙箱通过 HTTP 读写同一份数据，thread 之间按需隔离，归档时再把结论沉淀回全局记忆。",
      steps: [
        ["thread 启动", "启动沙箱时推入人格、skills 和 AGENTS.md；记忆则通过带 thread 专属 token 的 HTTP API 从控制面读取。"],
        ["thread 运行", "每个 thread 拥有独立的笔记作用域，互不污染；全局 MEMORY.md 只由记忆整理、Anka 和你本人写入。"],
        ["thread 归档", "该 thread 的 token 立即失效，Anka 将其中的结论整理进全局记忆——下次新开 thread 时，它已经知道。"],
      ],
      files: [
        ["MEMORY.md", "长期记忆：历史决定、结论与项目约定"],
        ["SOUL.md", "它的人格与行事风格"],
        ["IDENTITY.md", "它如何称呼自己、以什么口吻与你交流"],
        ["facts/", "可逐条查看和编辑的独立事实"],
        ["skills/", "SKILL.md 与配套脚本，改一次处处生效"],
      ],
      truth: "唯一真源",
      local: "本地",
    },
    gallery: {
      eyebrow: "真实界面",
      title: "每一张截图都是真实产品，不是概念图。",
      lede: "本页所有截图都采自同一个正在运行的控制面——真实的 E2B 沙箱、真实的模型、真实的 GitHub。背后包括修复 SSE 重连竞态并提交 PR 的 thread、依赖审计、跨仓库 PR 评审、网页调研摘要、临时脚本，以及把这一切串起来的 Anka。",
      wide: {
        alt: "手机上的 thread：agent 写好并运行的脚本，回复末尾列出了生成的文件",
        caption: "手机上的 thread：agent 写好并运行的脚本，以及生成的文件。",
      },
      dark: {
        alt: "深色模式下的 Board：Todo、In progress、Needs you、Waiting for you、Done 五列与 thread 卡片",
        caption: "跟随系统主题切换的深色 Board。",
      },
      tall: {
        alt: "手机上的 ankacloud 侧边抽屉，thread 按项目分组",
        caption: "手机侧边抽屉：按项目分组的所有 thread。",
      },
      mobile: {
        alt: "手机上的 Anka：一条状态回复列出每个 thread、对应的 PR 和当前进度",
        caption: "手机上的 Anka：一条回复汇总所有 thread 进展。",
      },
      dialog: {
        alt: "一个 thread 的 Skills 选择弹窗：pr-review、release-notes、web-digest 全部勾选",
        caption: "为 thread 选择 skills：按需勾选，或留空全部挂载。",
      },
      review: {
        alt: "对 kong-operator 三个开放 PR 的只读评审，每个都给出了结论与测试结果",
        caption: "跨仓库的只读 PR 评审：每个 PR 给出明确结论与测试结果。",
      },
      darkThread: {
        alt: "深色模式下的脚本 thread：展示工具调用、所用模型、沙箱运行时与最终回复",
        caption: "深色模式下的脚本 thread，顶栏显示所用模型与沙箱运行时。",
      },
    },
    capabilities: {
      eyebrow: "内置能力",
      title: "该有的都有，<br />而且全在同一个进程里。",
      items: [
        {
          title: "项目与 GitHub",
          body: "配好仓库、环境变量、机型和默认 provider 后，thread 会自动 clone、切分支并用 gh pr create 开 PR。GitHub token 从不进入沙箱，由 E2B 出口代理安全注入。",
          shot: "projects",
        },
        {
          title: "Skills",
          body: "在 Web 的 Skills 面板创建，或让 Anka 通过内置 skill-creator 生成，都会写入控制面同一目录。新建 thread 时自动挂载，修改后由 SkillWatcher 热加载。",
          shot: "skills",
        },
        {
          title: "Providers",
          body: "每个 provider 可配置多个可用模型，分别指定上下文窗口、输出上限与推理强度；每个 thread 均可按需指定 provider 和模型。",
          shot: "providers",
        },
        {
          title: "沙箱运行时",
          body: "E2B、Tenki、Runta 统一封装在 SandboxProvider 抽象之下，由能力目录按运行时自动生成配置表单。",
          shot: "sandbox",
        },
        {
          title: "MCP",
          body: "MCP server 按 thread 挂载进沙箱；只有显式勾选的 HTTP server 才会开放给 Anka 使用。",
        },
        {
          title: "定时任务与通知",
          body: "定时任务由 Anka 直接执行或转派给沙箱；每轮结束后可推送一条 Telegram 通知，一行交代状态、标题和 thread ID。",
        },
      ],
      shots: {
        projects: {
          alt: "Projects 设置：三个仓库——GitHub 上的 ankacloud、ankaloop，以及只读的 kong-operator——各自显示关联的 thread 数",
          caption: "Projects：仓库、分支，以及在其中运行的 thread。",
        },
        skills: {
          alt: "Skills 设置：pr-review、release-notes、web-digest 组成的技能目录",
          caption: "Skills 统一保存在控制面，每个 thread 按需挂载。",
        },
        providers: {
          alt: "Model providers 设置：Baseten 下配置了 GLM-5.3、Kimi-K3.1-Pro、DeepSeek，以及 OpenRouter",
          caption: "一个 provider 下可配多个模型——每个 thread 按需自选。",
        },
        sandbox: {
          alt: "Sandbox 设置：E2B Cloud 运行时，含生命周期、闲置暂停与机型配置",
          caption: "按运行时独立配置生命周期、闲置暂停与机型。",
        },
      },
    },
    quickstart: {
      eyebrow: "快速开始",
      title: "一个进程，一个 SQLite 文件。",
      ledeBefore: "需要 Python ≥ 3.11 和 ",
      ledeAfter: "。不填 key 也能跑完单元测试并打开 Web UI；需要启动沙箱和调用模型时，再填入 ",
      ledeAnd: " 和 ",
      ledeEnd: "。",
      step1: "克隆仓库并安装依赖",
      step2: "配置四个必填环境变量",
      step3: "启动服务",
      local: "本地运行",
      server: "服务器部署",
      logs: [
        ["web API on", "127.0.0.1:8000"],
        ["reconciler every", "60s", "· 闲置暂停", "10m"],
        ["telegram channel", "未配置"],
      ],
      links: { quick: "完整快速开始指南", deploy: "systemd 部署与运维" },
    },
    usecases: {
      eyebrow: "适合谁",
      title: "给你的 agent 造一个家，<br />而不是给公司搭一套平台。",
      fit: [
        ["个人专属 agent", "你想要一个知道你是谁、熟悉核心仓库、记得上次决策的 agent，而不是每次任务都从头交代背景。"],
        ["小团队", "几个人共用一套云端部署：每个 thread 彼此隔离、各自提 PR，同时共享同一份记忆与 skills。"],
        ["喜欢折腾的开发者", "一台小机器、一个进程、一个 SQLite 文件，底层是上游 ankaloop——结构透明，随时可以拆开改造。"],
      ],
      notYet: "暂不包含",
      notYetItems: ["多租户与权限系统", "计费", "多人协作", "本地 runner", "桌面 / 浏览器 portal"],
    },
    cta: {
      title: "开一个 thread，<br />让它开始记住你。",
      body: "基于 Apache-2.0 开源，当前版本 {version}。欢迎提 issue、发 PR，也欢迎把它变成你每天都在用的 agent。",
      github: "在 GitHub 上查看",
      quickstart: "快速开始",
    },
    footer: {
      tagline: "单用户的云沙箱 agent 控制面。每个 thread 独占一个隔离云沙箱，所有会话共享一份连续记忆。",
      project: "项目",
      builtOn: "构建于",
      design: "设计文档",
      contributing: "贡献指南",
      license: "Apache-2.0 许可证",
      agent: "ankaloop · agent 本体",
      sandbox: "E2B · 云沙箱",
      storage: "SQLite · 唯一数据存储",
    },
    notFound: {
      title: "页面不存在 · ankacloud",
      description: "这个页面不存在。",
      heading: "404",
      body: "这个页面不存在——也许它还留在某个沙箱里。",
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
