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
