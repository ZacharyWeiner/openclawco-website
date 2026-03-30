# OpenClaw — Full Overview

## What Is OpenClaw?

**Tagline:** "The AI that actually does things."

OpenClaw is a self-hosted, open-source personal AI assistant that runs on your own machine (macOS, Linux, or Windows) and connects to the chat apps you already use — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, and 20+ more.

Unlike cloud-only chatbots, OpenClaw operates as a local gateway/daemon with direct access to your file system, shell, browser, cron scheduler, and network — all controllable from whatever chat app you prefer. You can message it on WhatsApp while walking the dog and it'll deploy code, manage your calendar, file insurance claims, or order groceries.

**License:** MIT (fully open source, free)
**GitHub:** 342,000+ stars, 67,500+ forks
**Requirements:** Node 24 (recommended) or Node 22.14+

---

## Who Is It For?

- **Developers** — AI coding agents accessible from mobile/messaging
- **Power users** — A personal OS-level assistant that automates email, calendar, smart home, research, and data tasks
- **Teams and families** — A shared AI agent in group chats
- **Solo founders** — Multi-agent setups for strategy, marketing, development, and operations
- **Non-technical users** — Control everything through natural language in your favorite chat app

---

## How It Works — Architecture

### Core Components

| Component | What It Does |
|---|---|
| **Gateway** | The central daemon. Manages all messaging connections, sessions, routing. Runs on `127.0.0.1:18789`. |
| **Pi Agent** | The AI runtime. Receives messages from the Gateway, executes tools (shell, browser, files, skills), returns responses. |
| **CLI (`openclaw`)** | Command-line for managing gateway, channels, skills, and config. |
| **Web Control UI** | Browser dashboard for chat, config, and session management. |
| **macOS App** | Menu bar companion with Voice Wake and Talk Mode. |
| **Nodes (iOS/Android)** | Remote devices that pair with the Gateway via WebSocket for phone-based control. |

### Data Flow

```
Chat Apps (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, ...)
    ↓
Gateway (WebSocket, port 18789)
    ↓
    ├→ Pi Agent (tool execution, AI reasoning)
    ├→ CLI
    ├→ Web Control UI
    ├→ macOS App
    └→ iOS/Android Nodes
```

### Security

- **Pairing mode** (default): Unknown senders must be approved via one-time code
- **Allowlist mode**: Only pre-configured sender IDs permitted
- **Open mode**: Unrestricted (requires explicit opt-in)
- All data stays on your machine — nothing goes to OpenClaw servers

---

## Features

### Communication & Channels (22+ platforms)
WhatsApp, Telegram, Slack, Discord, Signal, iMessage (BlueBubbles), Google Chat, IRC, Microsoft Teams, Matrix, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology Chat, Tlon, Twitch, Zalo, WeChat, WebChat

### System Access
- Full file system read/write
- Shell command execution
- Script automation
- Docker sandbox options

### Browser Automation
- Dedicated isolated Chrome profile
- Tab management, navigation, clicking, typing, form filling
- Screenshot capture, PDF export
- Cookie/session management
- Attach to existing browser sessions (preserving logins)

### Memory & Context
- **MEMORY.md** — Long-term persistent facts, preferences, decisions
- **Daily notes** — Running observations, auto-loads today + yesterday
- **Semantic search** via vector + keyword hybrid
- Context preserved across conversation compaction

### Scheduling & Automation
- Cron jobs for background task execution
- Webhooks for event-driven triggers
- Proactive notifications and reminders
- Gmail Pub/Sub integration

### AI Model Support
- Anthropic Claude (primary)
- OpenAI GPT models
- Google Gemini
- Local/open-source models
- Model failover and session pruning

---

## Skills & ClawHub

### What Are Skills?

Skills are plain Markdown instruction files that teach your agent how to use specific tools or APIs. Each skill is a folder with a `SKILL.md` file. They're like plugins — install them and your agent gains new abilities.

```bash
openclaw skills install gmail        # Now your agent can read/send email
openclaw skills install spotify      # Now it controls your music
openclaw skills install philips-hue  # Now it controls your lights
```

### ClawHub — The Public Skills Registry

- **URL:** clawhub.com
- **13,729+ community-built skills** (as of Feb 2026)
- Search by keyword or use case
- One-command install: `clawhub install <skill-slug>`

### Notable Community Skills
Gmail, Google Calendar, Spotify, Philips Hue, Obsidian, GitHub, GA4 Analytics, Google Search Console, Jira, Google Ads, Alexa, Garmin, Notion, Linear, 1Password, and thousands more.

---

## Channels — How Each Works

### Telegram (Recommended for beginners)
- Create a bot via @BotFather, paste the token, start chatting in under a minute
- Live streaming of partial replies, inline buttons, slash commands
- Forum topic routing, sticker handling, reactions

### WhatsApp
- QR code linking via Baileys (not Twilio)
- Talk to your agent like texting a friend
- Read receipts, voice notes, group chat support
- Some members run their entire life through it

### Discord
- DMs, guild channels, voice channels, thread binding
- Slash commands, buttons, select menus, modals
- Great for multi-agent setups with topic channels

### Slack
- Socket Mode or HTTP Events API
- Native AI Apps API streaming
- Thread routing, Block Kit interactive components

### Signal, iMessage, and 15+ more
- Signal via signal-cli with typing indicators and reactions
- iMessage via BlueBubbles on macOS
- Plus: Google Chat, IRC, Teams, Matrix, LINE, and more

---

## Real-World Example Uses (from the Showcase)

### Email & Communication
- **Clear 10,000+ emails in a day** — Agent reads, categorizes, drafts replies, flags urgent items
- **Morning rollup** — Wake up to a WhatsApp summary of overnight emails and calendar
- **Auto-follow-ups** — Agent tracks who hasn't replied and sends follow-ups
- **File an insurance claim** — Agent filed claim and scheduled repair appointment while user was driving

### Smart Home
- **Control lights, locks, speakers** via Home Assistant, Alexa, HomePods
- **Auto-discover devices** — One agent found HomePods on the network and built its own control skill
- **IoT calibration** — Remote SSH into a watt meter box, guided recalibration via screenshots
- **Health tracking** — Garmin watch integration with sleep/exercise data and late-night alerts

### Calendar & Family
- **Chat-based calendar management** — Add, change, check events via Telegram/WhatsApp
- **Weekly meal planning in Notion** — Master meal plan, shopping lists sorted by store and aisle
- **Morning daily brief** — Weather, objectives, health stats, meetings, reminders, reading suggestions
- **Family ops manager** — Wife and husband drop topics anytime, agent researches and sends Sunday roundup

### Coding & DevOps
- **Rebuild entire website via Telegram while watching Netflix** — Notion to Astro, 18 posts migrated, DNS moved
- **Debug fitness app mid-workout** — Report bug between sets, agent patches it, continue exercising
- **Overnight coding agents** — Running 12:30am–7am, delegated all-day coding agent management
- **Deploy and fix in production** — Agent checked failed build, identified root cause, updated configs, redeployed, fixed design issues via PR — all via voice while walking the dog

### Shopping & Real-World Tasks
- **Negotiate car prices across dealers** — Agent used browser, email, and iMessage. Saved $4,200.
- **Order groceries** — Agent logged into supermarket with shared 1Password credentials, handled MFA, placed order
- **Flight check-in** — Found flight in email, ran check-in, selected window seat — while user was driving

### Data & Research
- **Pull 4 million social posts** across 100 accounts in 24 hours
- **Weekly automated SEO analysis**
- **Hacker News trending** with personalized curation matching your interests
- **Bloodwork lab results** organized into Notion database

### Creative & Fun
- **$35 holo cube display** — Physical tamagotchi-style agent interface
- **Language learning tool** — Chinese lessons with TTS, pronunciation feedback, spaced repetition
- **Song analysis** — Extract audio tracks, generate GIFs, create PDF with chords
- **Stumbleupon-style article curation** — Built from phone while putting baby to sleep

### Dedicated Hardware Setups
- **Mac Mini as dedicated AI machine** — Separate Apple account, Gmail, GitHub for the agent
- **Raspberry Pi with Cloudflare** — Always-on assistant, built website from phone in minutes

---

## Pricing

- **OpenClaw itself:** Free, MIT licensed, open source
- **You pay for:** AI model API costs (bring your own key from Anthropic, OpenAI, or Google)
- **Infrastructure:** Self-hosted on your own hardware (Mac, PC, Raspberry Pi, VPS)
- **Skills:** Free and community-contributed on ClawHub
- **MeshCore marketplace:** New feature where developers can publish and monetize AI agents

---

## Installation (Quick Reference)

**macOS / Linux:**
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows (PowerShell):**
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

**npm:**
```bash
npm i -g openclaw
openclaw onboard --install-daemon
```

**Then:**
```bash
openclaw gateway status    # Verify it's running
openclaw dashboard         # Open the browser UI
```

Setup takes about 5 minutes.

---

# Detailed Features, Connections & Skills Reference

## Features — In Depth

### Shell Access & Exec Tool

The `exec` tool runs shell commands in agent workspaces with foreground and background execution.

- **Parameters:** `command` (required), `background`, `yieldMs` (auto-background after 10s), `timeout` (1800s default), `workdir`, `env`, `pty` (pseudo-terminal mode)
- **Host modes:** `auto` (sandbox if active, else gateway), `sandbox`, `gateway`, `node` (remote companion device)
- **Security modes:** `deny`, `allowlist`, `full` — with approval prompts (`off`, `on-miss`, `always`)
- **Elevated mode:** Bypass sandboxing for trusted operations via `/elevated on|off`
- **Background processes:** Managed via `process` tool with `poll`, `send-keys` (tmux-style), `submit`, `paste`
- **Environment:** Sets `OPENCLAW_SHELL=exec` so scripts detect exec-tool context. Prefers bash on non-Windows, PowerShell 7 on Windows.

### File System

Read, write, edit, and apply_patch tools for file operations.

- Relative paths resolve against the workspace directory
- Absolute paths can access anywhere unless sandboxing is enabled
- In sandbox mode, workspace mounts at `/workspace` inside the container
- Access levels: `none`, `ro` (read-only at `/agent`), `rw` (full at `/workspace`)

### Browser Automation

A dedicated, isolated Chrome/Brave/Edge/Chromium browser profile communicates via Chrome DevTools Protocol (CDP) with Playwright. Never touches your personal browser.

**Three profile types:**
- **OpenClaw-managed:** Standalone Chromium with dedicated user-data directory and CDP port (18800-18899)
- **Remote CDP:** Connect to browsers elsewhere via WebSocket URL
- **Existing-session:** Attach to running Chrome via Chrome DevTools MCP, reusing logged-in sessions

**Capabilities:**
- AI snapshots with numeric refs for element targeting
- Click, double-click, type, hover, drag, select, scroll, navigate, form filling
- File upload/download interception, JavaScript evaluation
- Cookie/localStorage/sessionStorage management
- HTTP headers, credentials, geolocation, offline mode, timezone/locale/device emulation
- Network request/response inspection, console logs, CDP trace recording, PDF export
- SSRF protection with optional hostname allowlisting

### Memory System

Uses plain Markdown files in the agent workspace — no hidden state.

- **MEMORY.md:** Long-term persistent storage for facts, preferences, decisions. Loaded at each session start.
- **memory/YYYY-MM-DD.md:** Daily notes for running context. Today's and yesterday's auto-loaded.
- **memory_search tool:** Hybrid search combining vector similarity (semantic) with keyword matching. Supports OpenAI, Gemini, Voyage, or Mistral embeddings.
- **memory_get tool:** Retrieves specific files or line ranges.
- **Auto-persistence:** Before conversation compaction, a silent turn reminds the agent to save important context.
- **Three backend engines:**
  - **Builtin (default):** SQLite-based with keyword and vector search
  - **QMD:** Local-first sidecar with reranking and external directory indexing
  - **Honcho:** AI-native cross-session memory with user modeling and multi-agent awareness

### Cron Jobs & Scheduling

Built-in scheduler that persists jobs, triggers agent execution, and optionally delivers output back to chat. Jobs stored at `~/.openclaw/cron/jobs.json`.

**Schedule types:**
- **At (one-shot):** ISO 8601 timestamp
- **Every (interval):** Fixed milliseconds
- **Cron (recurring):** 5-field expressions (or 6 with seconds) + IANA timezone

**Execution styles:**
- **Main session:** Enqueues into heartbeat flow. Wake modes: `now` or `next-heartbeat`.
- **Isolated session:** Dedicated agent turns in `cron:<jobId>` sessions.
- **Current session binding:** Resolves to the session where cron was created.

**Delivery modes:** `announce` (via chat), `webhook` (HTTP POST), `none` (silent)
**Retry policy:** Transient errors retry with exponential backoff (30s → 1m → 5m → 15m → 60m). Permanent errors disable immediately.

### Heartbeat System

Periodic agent turns in the main session for proactive check-ins.

- **Default interval:** 30 minutes
- **Behavior:** Reads `HEARTBEAT.md`, replies `HEARTBEAT_OK` if nothing needs attention
- **Active hours:** Time-window restrictions (e.g., 09:00–22:00)
- **Light context mode:** Only loads `HEARTBEAT.md` to save tokens (~100K reduced to ~2-5K)
- **Manual trigger:** `openclaw system event --text [message] --mode now`

### Webhooks

HTTP endpoints for external event triggers.

- `POST /hooks/wake` — Enqueues system events for main session
- `POST /hooks/agent` — Runs isolated agent turns with custom sessions
- `POST /hooks/<name>` — Custom mapped hooks with JS/TS transforms
- **Gmail Pub/Sub integration** built in as a preset
- **Auth:** Bearer token via `Authorization` or `x-openclaw-token` header

### Voice Mode

**Voice Wake:**
- Centralized wake word system managed by the Gateway
- macOS uses `VoiceWakeRuntime`, iOS uses `VoiceWakeManager`
- Global trigger list shared across all devices

**Talk Mode:**
- Continuous loop: Listen → Send transcript → Speak response via TTS
- STT: Native OS speech recognition
- TTS: ElevenLabs streaming API with incremental playback. System TTS fallback.
- Voice control directives: Model can customize voice ID, speed, stability
- Audio formats: pcm_16000, pcm_22050, pcm_24000, pcm_44100

### Canvas & A2UI

Lightweight visual workspace embedded in the macOS app.

- Agent can show/hide panel, navigate URLs, evaluate JavaScript, capture snapshots
- A2UI (Agent-to-UI): Agents push UI updates via JSONL data
- Deep links: Canvas can trigger agent runs via `openclaw://agent?...`
- Auto-reloads on file changes

### Multi-Agent Routing

Each agent has its own workspace, state directory, and session store.

- Add agents via `openclaw agents add <name>`
- **Isolation:** Separate credentials, SOUL.md, sessions, phone numbers per channel
- **Binding hierarchy (most to least specific):** Peer match → Parent peer → Guild ID + roles → Guild ID → Team ID → Account ID → Channel-level → Default fallback
- **Use cases:** Distinct personalities, multi-user sharing, split by channel, route specific groups/users to dedicated agents

### Sub-Agents

Background agent instances spawned from a parent in isolated sessions.

- **Spawning:** `/subagents spawn` or `sessions_spawn` tool
- **Nested orchestration:** Up to 5 depth levels (recommended: 2). Main → Orchestrator → Workers.
- **Tool restrictions:** Sub-agents get all tools except session management. Orchestrators get spawn + session-list.
- **Config:** Model/thinking overrides, timeout, archive after 60min, max 5 children per agent, max 8 concurrent
- **Monitoring:** `/subagents list`, `/subagents info`, `/subagents log`, `/subagents send`

### Node Pairing & Mobile Nodes

Companion devices connecting to the Gateway via WebSocket.

- **Types:** macOS (menubar), iOS, Android, headless node hosts
- **Pairing:** Device identity presented; approved via `openclaw devices approve <requestId>`
- **Camera:** Snap photos (JPG, front/back), video clips (MP4, up to 60s)
- **Screen recording:** MP4, up to 60s, optional audio
- **Location:** Returns lat/lon, accuracy, timestamp
- **Android extras:** Device status, notifications, photos, contacts, calendar, call log, SMS, motion/pedometer

### Remote Access

- **SSH tunneling:** `ssh -N -L 18789:127.0.0.1:18789 user@host`
- **Tailscale/VPN:** Gateway on persistent host with loopback binding + Tailscale Serve
- **Security:** Loopback-only by default. Non-loopback requires auth tokens. TLS certificate pinning supported.

### Sandboxing

Optional Docker-based isolation for tool execution.

- **Modes:** `off`, `non-main` (only non-primary sessions), `all`
- **Scope:** `session` (per-session container), `agent` (per-agent), `shared` (one container for all)
- **Backends:** Docker (default), SSH (remote machine), OpenShell (managed platform)
- **Blocked mounts:** docker.sock, /etc, /proc, /sys, /dev

### ACP Agents (Agent Client Protocol)

Run external coding harnesses through OpenClaw.

- **14+ supported harnesses:** Pi, Claude Code, Codex, Cursor, Copilot, Gemini CLI, OpenCode, Kiro, Kimi, Qwen, Droid, iFlow, KiloCode
- **Binding:** Current-conversation or thread-bound (Discord threads, Telegram topics)
- **Modes:** `persistent` (maintains state) or `oneshot`
- **Permission modes:** `approve-all`, `approve-reads`, `deny-all`
- **Session resumption:** Replays conversation history for Codex and Claude Code

### Session Management

- **DM scope options:** `main`, `per-peer`, `per-channel-peer`, `per-account-channel-peer`
- **Thread binding:** Configurable idle/max-age hours
- **Reset modes:** Daily, idle-based
- **Cross-session tools:** `sessions_list`, `sessions_history`, `sessions_send`
- **Chat commands:** `/status`, `/new`, `/reset`, `/compact`, `/think`, `/verbose`, `/usage`, `/restart`

### Model Provider Support

35+ providers including:
- Anthropic Claude, OpenAI GPT, Google Gemini, xAI Grok, MiniMax, Mistral, DeepSeek, GLM ChatGLM, Perplexity, Hugging Face
- **Self-hosted:** Ollama, LM Studio, vLLM, SGLang, any OpenAI/Anthropic-compatible endpoint
- **Gateways:** Vercel AI Gateway, OpenRouter

---

## All Connections/Channels — Detailed

| Channel | Connection Method | Key Features | Limitations |
|---------|------------------|--------------|-------------|
| **WhatsApp** | Baileys (QR pairing) | Most popular. Groups, media, reactions, read receipts, voice notes, multi-account | Requires QR re-pairing periodically |
| **Telegram** | Bot API (grammY) | Fastest setup. Groups, forum topics, streaming replies, inline buttons, slash commands, stickers, reactions | Bot API limits |
| **Discord** | Bot API (discord.js) | Servers, channels, DMs, voice channels (join/TTS/transcription), threads, slash commands, buttons, modals, PluralKit | Varies by media/reaction |
| **Slack** | Bolt SDK (Socket Mode) | Native AI Apps streaming, slash commands, Block Kit interactive components, thread routing | Workspace-scoped |
| **Signal** | signal-cli (JSON-RPC) | Privacy-focused, typing indicators, read receipts, reactions, groups | Text-focused |
| **BlueBubbles (iMessage)** | macOS REST API | Full iMessage: edit, unsend, effects, reactions, tapbacks, group management, read receipts | Edit broken on macOS Tahoe |
| **iMessage (legacy)** | imsg CLI (AppleScript) | Basic text + groups | Deprecated; use BlueBubbles |
| **Google Chat** | HTTP webhook API | Google Chat integration | Limited interactivity |
| **IRC** | Classic IRC protocol | Channels + DMs, pairing/allowlist | Text-only |
| **Microsoft Teams** | Bot Framework (plugin) | Enterprise messaging | Plugin-based |
| **Matrix** | Matrix protocol (plugin) | Federated messaging | Separate install |
| **Mattermost** | Bot API + WebSocket (plugin) | Channels, groups, DMs | Plugin required |
| **Feishu/Lark** | WebSocket (plugin) | Bot integration | Separate install |
| **LINE** | Messaging API (plugin) | LINE bot | Separate install |
| **Nostr** | NIP-04 (plugin) | Decentralized DMs | DMs only |
| **Nextcloud Talk** | Self-hosted (plugin) | Chat on Nextcloud | Self-hosted required |
| **Synology Chat** | Webhooks (plugin) | NAS chat | Plugin required |
| **Tlon** | Urbit protocol (plugin) | P2P messenger | Niche |
| **Twitch** | IRC (plugin) | Twitch chat | Chat-only |
| **Voice Call** | Plivo/Twilio (plugin) | Phone calls | Separate plugin |
| **WebChat** | WebSocket | Built-in browser UI | Browser-only |
| **WeChat** | Tencent iLink Bot (plugin) | Private chats via QR | Private only |
| **Zalo** | Bot API (plugin) | Vietnam's popular messenger | Plugin required |

**Security across all channels:**
- DM policies: `pairing` (default), `allowlist`, `open`, `disabled`
- Group policies: Mention-based activation, allowlists
- Per-channel enable/disable, health monitoring, account-level settings

---

## All Skill Categories & Notable Skills

OpenClaw has **13,729+ skills on ClawHub** across 32 categories. Here's every category with counts and examples:

| Category | Count | Notable Skills & Examples |
|----------|-------|--------------------------|
| **Coding Agents & IDEs** | 1,184 | Agent orchestration, code generation, ADHD founder planner, 3D model generation, academic research agents |
| **Web & Frontend Dev** | 919 | Agent dashboards, analytics, rate limiters, payment integration, agent spawners, React/Vue/Svelte tools |
| **DevOps & Cloud** | 393 | Kubernetes management, monitoring, deployment, cloud cost optimization, CI/CD pipelines |
| **Search & Research** | 345 | ArXiv search, competitive analysis, SEO audit, web research, patent search |
| **Browser & Automation** | 322 | 2captcha solving, Airtable automation, web scraping, meeting scheduling, RSS briefings |
| **Productivity & Tasks** | 205 | Task scoring, weekly reviews, invoice creation, focus timers, habit tracking, time blocking |
| **CLI Utilities** | 180 | File management, system monitoring, bat/cat alternatives, disk cleanup |
| **AI & LLMs** | 176 | Multi-model support, prompt engineering, agent evaluation, fine-tuning helpers |
| **Image & Video** | 170 | Sora video generation, image editing, GIF creation, thumbnail generation |
| **Git & GitHub** | 167 | PR management, auto-merge, Bitbucket, Azure DevOps, GitOps workflows |
| **Communication** | 146 | Himalaya (CLI email), SMS tools, email templates, newsletter builders |
| **Transportation** | 110 | Navigation, transit schedules, delivery tracking, flight monitoring |
| **PDF & Documents** | 105 | PDF generation, OCR, document processing, invoice parsing |
| **Marketing & Sales** | 102 | Cold outreach, A/B testing, influencer discovery, content repurposing, SEO tools |
| **Health & Fitness** | 87 | Garmin integration, WHOOP, Oura Ring, exercise tracking, sleep monitoring, nutrition |
| **Media & Streaming** | 85 | Spotify control, Sonos speakers, Shazam, video summarization, podcast tools |
| **Notes & PKM** | 70 | Obsidian vault, Bear Notes, Tana, Apple Notes, Logseq integration |
| **Calendar & Scheduling** | 65 | Google Calendar, timeblocking, conflict detection, meeting scheduling, availability |
| **Security & Passwords** | 53 | 1Password vault, Snyk scanning, agent trust verification, secret rotation |
| **Shopping & E-commerce** | 51 | Albert Heijn ordering, Tesco autopilot, price comparison, Foodora, wishlist tracking |
| **Personal Development** | 50 | Journaling, habit tracking, learning tools, spaced repetition, goal setting |
| **Speech & Transcription** | 45 | Whisper transcription, Kyutai Pocket TTS, voice processing, meeting transcription |
| **Apple Apps & Services** | 44 | Apple Notes, Reminders, Shortcuts, HomePod control, Music |
| **Smart Home & IoT** | 41 | Philips Hue, Home Assistant, 8Sleep mattress, Bambu 3D printer, Alexa CLI |
| **Clawdbot Tools** | 37 | Legacy/core OpenClaw utility skills |
| **Gaming** | 35 | Game integration, entertainment, trivia, game state tracking |
| **Self-Hosted & Automation** | 33 | Home server management, automation pipelines, Docker management |
| **iOS & macOS Dev** | 29 | Swift tooling, Xcode helpers, TestFlight automation |
| **Moltbook** | 29 | Legacy notebook/document skills |
| **Data & Analytics** | 28 | GA4 queries, data processing, analytics dashboards, CSV tools |

---

## All Known Integrations

### Productivity & Notes
- Notion, Obsidian, Bear Notes, Apple Notes, Apple Reminders, Things 3, Trello, Tana, Logseq

### Developer Tools
- GitHub, Jira, Linear, Azure DevOps, Bitbucket, Railway, Supabase, Vercel, Docker, Kubernetes

### Email
- Gmail (with Pub/Sub webhooks), Himalaya CLI, Fastmail

### Music & Audio
- Spotify, Sonos (SonosCLI), Shazam, Apple Music

### Smart Home
- Philips Hue, Home Assistant, 8Sleep, Alexa, HomePods, Bambu 3D printers, IoTaWatt

### Health & Fitness
- Garmin Watch, WHOOP, Oura Ring

### Security & Credentials
- 1Password vault access, Snyk

### Social Media
- Twitter/X (posting, bookmarks, monitoring)

### Shopping & Services
- Albert Heijn, Tesco, Foodora, Google Places

### AI Model Providers
- Anthropic Claude, OpenAI GPT, Google Gemini, xAI Grok, MiniMax, Mistral, DeepSeek, GLM ChatGLM, Perplexity, Hugging Face, Ollama, LM Studio, vLLM, SGLang, OpenRouter, Vercel AI Gateway

### Browsers & Web Services
- Chrome/Chromium (CDP), Browserless, Browserbase

### Aggregators & Marketplaces
- Composio (managed OAuth, 1000+ apps), MeshCore (AI agent marketplace with billing)

---

## Developer Features

### Custom Skill Creation

Skills follow the AgentSkills format: a directory with `SKILL.md` containing YAML frontmatter and markdown instructions.

**Frontmatter keys:** `name`, `description`, `homepage`, `user-invocable`, `disable-model-invocation`, `command-dispatch`, `command-tool`, `command-arg-mode`, `metadata`

**Gating:** Platform filtering (`os`), binary requirements (`requires.bins`), environment variables (`requires.env`), config paths (`requires.config`)

**Installers:** brew, node (npm/pnpm/yarn/bun), go, uv (Python), direct download with archive extraction

**Hot reload:** Enabled by default, refreshes on `SKILL.md` changes with 250ms debounce

### SOUL.md Persona System

Defines agent personality, communication style, and behavioral boundaries.

**Core files:**
- `SOUL.md` — Core identity: truths, boundaries, vibe, continuity model
- `AGENTS.md` — Operating instructions and behavior rules
- `USER.md` — Who the user is, how to address them
- `IDENTITY.md` — Agent's name, personality, emoji
- `TOOLS.md` — Reference notes about local tools
- `HEARTBEAT.md` — Lightweight checklist for routine checks
- `BOOT.md` — Startup sequence on gateway restart
- `BOOTSTRAP.md` — One-time initialization ritual for new workspaces

**187 production-ready SOUL.md templates** available across 24+ categories (productivity, dev, marketing, business, DevOps, finance, education, healthcare, creative, security)

### Ralph Loop

Automated coding loop skill that generates bash scripts for iterative agent execution.

- **Supported CLIs:** Codex, Claude Code, OpenCode, Goose, custom
- **Two modes:** PLANNING (gap analysis, spec creation) and BUILDING (task selection, implementation, testing, commits)
- **Workflow:** Requirements → Specs → PROMPT.md + AGENTS.md → iterative execution with backpressure testing
- **Completion detection:** Promise phrase, test exit status, or plan sentinel ("STATUS: COMPLETE")

### Plugin System

Extend OpenClaw with new channels, providers, tools, skills, speech, image generation.

- **Registration methods:** `registerProvider`, `registerChannel`, `registerTool`, `registerSpeechProvider`, `registerImageGenerationProvider`, `registerWebSearchProvider`, `registerHttpRoute`, `registerCommand`, `registerHook`, `registerContextEngine`, `registerService`
- **Install:** `openclaw plugins install <package>` from npm or ClawHub
- **Two formats:** Native plugins (`openclaw.plugin.json`) and bundle plugins (Codex/Claude/Cursor-compatible)

### MeshCore Marketplace

Open marketplace for AI agents with built-in billing:
- Developers publish agents, set pricing, earn money when called
- "npm for AI agents, but with built-in billing"
- Search, call, and auto-bill marketplace agents from OpenClaw

### ClawTeam — Multi-Agent Swarms

Agents self-organize into teams, split work, communicate, and converge without human micromanagement. Works with OpenClaw, Claude Code, Codex, Cursor, and other CLI agents.
