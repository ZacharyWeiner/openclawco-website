import styles from './OpenClawOverview.module.css'

export default function OpenClawOverview() {
  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      {/* ── HEADER ── */}
      <section className={styles.pageHeader}>
        <div className="section-wrapper">
          <span className={styles.eyebrow}>DEEP DIVE</span>
          <h1 className={styles.pageTitle}>
            OPENCLAW<br />
            <span className="neon-cyan">FULL OVERVIEW</span>
          </h1>
          <p className={styles.pageSubtitle}>
            "The AI that actually does things." — A self-hosted, open-source personal AI assistant that runs on your machine and connects to the chat apps you already use.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaTag}>MIT Licensed</span>
            <span className={styles.metaTag}>342K+ GitHub Stars</span>
            <span className={styles.metaTag}>Node 24+</span>
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section className={styles.section}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>WHO IT'S FOR</span>
          <h2 className={styles.sectionTitle}>BUILT FOR <span className="neon-magenta">EVERYONE</span></h2>
          <div className={styles.cardGrid5}>
            {[
              ['Developers', 'AI coding agents accessible from mobile and messaging apps.'],
              ['Power Users', 'A personal OS-level assistant for email, calendar, smart home, research, and data.'],
              ['Teams & Families', 'A shared AI agent in group chats — coordinate, automate, and manage together.'],
              ['Solo Founders', 'Multi-agent setups for strategy, marketing, development, and operations.'],
              ['Non-Technical Users', 'Control everything through natural language in your favorite chat app.'],
            ].map(([title, desc]) => (
              <div key={title} className={styles.card}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className={styles.sectionAlt}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>ARCHITECTURE</span>
          <h2 className={styles.sectionTitle}>HOW IT <span className="neon-cyan">WORKS</span></h2>

          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Component</span><span>What It Does</span>
            </div>
            {[
              ['Gateway', 'The central daemon. Manages all messaging connections, sessions, and routing. Runs on 127.0.0.1:18789.'],
              ['Pi Agent', 'The AI runtime. Receives messages from the Gateway, executes tools (shell, browser, files, skills), returns responses.'],
              ['CLI (openclaw)', 'Command-line for managing gateway, channels, skills, and config.'],
              ['Web Control UI', 'Browser dashboard for chat, config, and session management.'],
              ['macOS App', 'Menu bar companion with Voice Wake and Talk Mode.'],
              ['Nodes (iOS/Android)', 'Remote devices that pair with the Gateway via WebSocket for phone-based control.'],
            ].map(([comp, desc]) => (
              <div key={comp} className={styles.tableRow}>
                <span className={styles.tableKey}>{comp}</span>
                <span className={styles.tableVal}>{desc}</span>
              </div>
            ))}
          </div>

          <div className={styles.codeBlock}>
            <span className={styles.codeLabel}>DATA FLOW</span>
{`Chat Apps (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, ...)
    ↓
Gateway (WebSocket, port 18789)
    ↓
    ├→ Pi Agent (tool execution, AI reasoning)
    ├→ CLI
    ├→ Web Control UI
    ├→ macOS App
    └→ iOS/Android Nodes`}
          </div>

          <h3 className={styles.subTitle}>Security</h3>
          <ul className={styles.list}>
            <li><strong>Pairing mode</strong> (default) — Unknown senders must be approved via one-time code</li>
            <li><strong>Allowlist mode</strong> — Only pre-configured sender IDs permitted</li>
            <li><strong>Open mode</strong> — Unrestricted (requires explicit opt-in)</li>
            <li>All data stays on your machine — nothing goes to OpenClaw servers</li>
          </ul>
        </div>
      </section>

      {/* ── FEATURES IN DEPTH ── */}
      <section className={styles.section}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>CAPABILITIES</span>
          <h2 className={styles.sectionTitle}>FEATURES <span className="neon-green">IN DEPTH</span></h2>

          <div className={styles.featureList}>
            {[
              {
                title: 'Shell Access & Exec Tool',
                body: 'Run shell commands in agent workspaces with foreground and background execution. Supports auto-background after 10s, 30-minute timeouts, pseudo-terminal mode, and environment variable injection. Security modes include deny, allowlist, and full access with configurable approval prompts. Background processes managed via tmux-style send-keys.',
              },
              {
                title: 'File System',
                body: 'Read, write, edit, and apply_patch tools for file operations. Relative paths resolve against the workspace. Absolute paths can access anywhere unless sandboxing is enabled. In sandbox mode, workspace mounts at /workspace inside the container.',
              },
              {
                title: 'Browser Automation',
                body: 'A dedicated, isolated Chrome/Brave/Edge/Chromium profile communicates via Chrome DevTools Protocol (CDP) with Playwright. Never touches your personal browser. Three profile types: OpenClaw-managed (standalone Chromium), Remote CDP (connect to browsers elsewhere), and Existing-session (reuse logged-in sessions). Capabilities include clicking, typing, form filling, file upload/download, cookie management, geolocation spoofing, network inspection, PDF export, and SSRF protection.',
              },
              {
                title: 'Memory System',
                body: 'Plain Markdown files in the agent workspace — no hidden state. MEMORY.md stores long-term facts, loaded at each session. Daily notes auto-load today and yesterday. Semantic search via hybrid vector + keyword matching supports OpenAI, Gemini, Voyage, or Mistral embeddings. Three backend engines: Builtin (SQLite), QMD (local-first with reranking), and Honcho (AI-native cross-session memory).',
              },
              {
                title: 'Cron Jobs & Scheduling',
                body: 'Built-in scheduler with persistent jobs. Schedule types: one-shot (ISO 8601), interval (fixed milliseconds), and cron (5-field expressions + timezone). Execution in main session or isolated sessions. Delivery via chat, webhook, or silent. Transient errors retry with exponential backoff (30s → 1m → 5m → 15m → 60m).',
              },
              {
                title: 'Heartbeat System',
                body: 'Periodic agent turns every 30 minutes for proactive check-ins. Reads HEARTBEAT.md, replies HEARTBEAT_OK if nothing needs attention. Configurable active hours, light context mode to save tokens (~100K reduced to ~2-5K), and manual triggers.',
              },
              {
                title: 'Webhooks',
                body: 'HTTP endpoints for external event triggers. POST /hooks/wake enqueues system events. POST /hooks/agent runs isolated agent turns. Custom mapped hooks with JS/TS transforms. Gmail Pub/Sub integration built in. Bearer token authentication.',
              },
              {
                title: 'Voice Mode',
                body: 'Voice Wake: centralized wake word system across macOS and iOS. Talk Mode: continuous loop — listen for speech, send transcript, speak response via ElevenLabs TTS with incremental playback. Model can customize voice ID, speed, and stability per response.',
              },
              {
                title: 'Canvas & A2UI',
                body: 'Lightweight visual workspace embedded in the macOS app. Agents can show/hide panels, navigate URLs, evaluate JavaScript, and capture snapshots. A2UI lets agents push live UI updates via JSONL data. Deep links trigger agent runs with confirmation prompts.',
              },
              {
                title: 'Multi-Agent Routing',
                body: 'Each agent has its own workspace, state, and sessions. Deterministic binding hierarchy: peer match → parent peer → guild + roles → guild → team → account → channel → default fallback. Use cases: distinct personalities, multi-user sharing, channel-specific agents.',
              },
              {
                title: 'Sub-Agents',
                body: 'Background agent instances spawned from a parent in isolated sessions. Up to 5 depth levels (recommended: 2). Main → Orchestrator → Workers pattern. Configurable model/thinking overrides, timeouts, and concurrency limits. Monitor via /subagents list, info, log, send.',
              },
              {
                title: 'Node Pairing & Mobile Nodes',
                body: 'Companion devices (macOS, iOS, Android, headless) connect to the Gateway via WebSocket. Capabilities: camera (photos, video clips up to 60s), screen recording, location. Android extras: device status, notifications, photos, contacts, calendar, call log, SMS, motion/pedometer.',
              },
              {
                title: 'Remote Access',
                body: 'SSH tunneling, Tailscale/VPN integration with loopback binding and Tailscale Serve. Loopback-only by default. Non-loopback requires auth tokens. TLS certificate pinning supported.',
              },
              {
                title: 'Sandboxing',
                body: 'Optional Docker-based isolation. Modes: off, non-main (only non-primary sessions), all. Scope: per-session, per-agent, or shared. Backends: Docker, SSH (remote machine), OpenShell (managed platform). Blocks docker.sock, /etc, /proc, /sys, /dev.',
              },
              {
                title: 'ACP Agents (Agent Client Protocol)',
                body: 'Run 14+ external coding harnesses through OpenClaw: Pi, Claude Code, Codex, Cursor, Copilot, Gemini CLI, OpenCode, Kiro, Kimi, Qwen, Droid, iFlow, KiloCode. Persistent or oneshot modes. Thread-bound in Discord/Telegram. Session resumption replays conversation history.',
              },
              {
                title: 'Session Management',
                body: 'DM scope: main, per-peer, per-channel-peer, per-account-channel-peer. Thread binding with configurable idle/max-age. Daily or idle-based resets. Cross-session tools: sessions_list, sessions_history, sessions_send for agent-to-agent communication.',
              },
              {
                title: 'Model Provider Support',
                body: '35+ providers: Anthropic Claude, OpenAI GPT, Google Gemini, xAI Grok, MiniMax, Mistral, DeepSeek, GLM ChatGLM, Perplexity, Hugging Face. Self-hosted: Ollama, LM Studio, vLLM, SGLang. Gateways: Vercel AI Gateway, OpenRouter. Model failover and session pruning.',
              },
            ].map(({ title, body }) => (
              <div key={title} className={styles.featureItem}>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHANNELS ── */}
      <section className={styles.sectionAlt}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>CONNECTIONS</span>
          <h2 className={styles.sectionTitle}>ALL <span className="neon-magenta">22+ CHANNELS</span></h2>

          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Channel</span><span>Connection</span><span>Key Features</span>
            </div>
            {[
              ['WhatsApp', 'Baileys (QR pairing)', 'Most popular. Groups, media, reactions, read receipts, voice notes'],
              ['Telegram', 'Bot API (grammY)', 'Fastest setup. Forum topics, streaming replies, inline buttons, slash commands'],
              ['Discord', 'Bot API (discord.js)', 'Servers, voice channels, threads, slash commands, buttons, modals'],
              ['Slack', 'Bolt SDK (Socket Mode)', 'AI Apps streaming, slash commands, Block Kit components, thread routing'],
              ['Signal', 'signal-cli (JSON-RPC)', 'Privacy-focused, typing indicators, read receipts, reactions'],
              ['BlueBubbles', 'macOS REST API', 'Full iMessage: edit, unsend, effects, reactions, tapbacks'],
              ['Google Chat', 'HTTP webhook API', 'Google Chat integration'],
              ['IRC', 'Classic IRC', 'Channels + DMs, pairing/allowlist'],
              ['Microsoft Teams', 'Bot Framework', 'Enterprise messaging (plugin)'],
              ['Matrix', 'Matrix protocol', 'Federated messaging (plugin)'],
              ['Mattermost', 'Bot API + WebSocket', 'Channels, groups, DMs (plugin)'],
              ['Feishu/Lark', 'WebSocket', 'Bot integration (plugin)'],
              ['LINE', 'Messaging API', 'LINE bot (plugin)'],
              ['Nostr', 'NIP-04', 'Decentralized DMs (plugin)'],
              ['Nextcloud Talk', 'Self-hosted', 'Nextcloud chat (plugin)'],
              ['Synology Chat', 'Webhooks', 'NAS chat (plugin)'],
              ['Twitch', 'IRC', 'Twitch chat (plugin)'],
              ['Voice Call', 'Plivo/Twilio', 'Phone calls (plugin)'],
              ['WebChat', 'WebSocket', 'Built-in browser UI'],
              ['WeChat', 'Tencent iLink Bot', 'Private chats via QR (plugin)'],
              ['Zalo', 'Bot API', 'Vietnam messenger (plugin)'],
            ].map(([ch, conn, feat]) => (
              <div key={ch} className={styles.tableRow3}>
                <span className={styles.tableKey}>{ch}</span>
                <span className={styles.tableVal}>{conn}</span>
                <span className={styles.tableVal}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className={styles.section}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>CLAWHUB</span>
          <h2 className={styles.sectionTitle}>13,729+ <span className="neon-cyan">SKILLS</span></h2>
          <p className={styles.sectionDesc}>
            Skills are plain Markdown instruction files that teach your agent new abilities. Install from ClawHub with one command.
          </p>

          <div className={styles.codeBlock}>
            <span className={styles.codeLabel}>TERMINAL</span>
{`openclaw skills install gmail        # Agent can read/send email
openclaw skills install spotify      # Controls your music
openclaw skills install philips-hue  # Controls your lights`}
          </div>

          <h3 className={styles.subTitle}>All 32 Skill Categories</h3>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Category</span><span>Count</span><span>Examples</span>
            </div>
            {[
              ['Coding Agents & IDEs', '1,184', 'Agent orchestration, code generation, research agents'],
              ['Web & Frontend Dev', '919', 'Dashboards, analytics, payment integration, React/Vue/Svelte'],
              ['DevOps & Cloud', '393', 'Kubernetes, monitoring, deployment, CI/CD pipelines'],
              ['Search & Research', '345', 'ArXiv, competitive analysis, SEO audit, patent search'],
              ['Browser & Automation', '322', 'Web scraping, meeting scheduling, RSS briefings'],
              ['Productivity & Tasks', '205', 'Task scoring, weekly reviews, invoices, habit tracking'],
              ['CLI Utilities', '180', 'File management, system monitoring, disk cleanup'],
              ['AI & LLMs', '176', 'Multi-model support, prompt engineering, evaluation'],
              ['Image & Video', '170', 'Sora video, image editing, GIF creation'],
              ['Git & GitHub', '167', 'PR management, auto-merge, GitOps workflows'],
              ['Communication', '146', 'Email (Himalaya), SMS, newsletter builders'],
              ['Transportation', '110', 'Navigation, transit, delivery tracking'],
              ['PDF & Documents', '105', 'PDF generation, OCR, invoice parsing'],
              ['Marketing & Sales', '102', 'Cold outreach, A/B testing, influencer discovery'],
              ['Health & Fitness', '87', 'Garmin, WHOOP, Oura Ring, exercise tracking'],
              ['Media & Streaming', '85', 'Spotify, Sonos, Shazam, video summarization'],
              ['Notes & PKM', '70', 'Obsidian, Bear Notes, Tana, Apple Notes'],
              ['Calendar & Scheduling', '65', 'Google Calendar, timeblocking, availability'],
              ['Security & Passwords', '53', '1Password, Snyk scanning, secret rotation'],
              ['Shopping & E-commerce', '51', 'Albert Heijn, Tesco autopilot, price comparison'],
              ['Personal Development', '50', 'Journaling, habits, spaced repetition'],
              ['Speech & Transcription', '45', 'Whisper, Kyutai TTS, meeting transcription'],
              ['Apple Apps & Services', '44', 'Notes, Reminders, Shortcuts, HomePod'],
              ['Smart Home & IoT', '41', 'Philips Hue, Home Assistant, 8Sleep, Alexa'],
              ['Gaming', '35', 'Game integration, trivia, state tracking'],
              ['Self-Hosted & Automation', '33', 'Home server, Docker management'],
              ['iOS & macOS Dev', '29', 'Swift tooling, TestFlight automation'],
              ['Data & Analytics', '28', 'GA4, data processing, CSV tools'],
            ].map(([cat, count, ex]) => (
              <div key={cat} className={styles.tableRow3}>
                <span className={styles.tableKey}>{cat}</span>
                <span className={styles.tableVal}>{count}</span>
                <span className={styles.tableVal}>{ex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section className={styles.sectionAlt}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>ECOSYSTEM</span>
          <h2 className={styles.sectionTitle}>ALL <span className="neon-green">INTEGRATIONS</span></h2>

          <div className={styles.integrationGrid}>
            {[
              ['Productivity & Notes', 'Notion, Obsidian, Bear Notes, Apple Notes, Apple Reminders, Things 3, Trello, Tana, Logseq'],
              ['Developer Tools', 'GitHub, Jira, Linear, Azure DevOps, Bitbucket, Railway, Supabase, Vercel, Docker, Kubernetes'],
              ['Email', 'Gmail (with Pub/Sub webhooks), Himalaya CLI, Fastmail'],
              ['Music & Audio', 'Spotify, Sonos (SonosCLI), Shazam, Apple Music'],
              ['Smart Home', 'Philips Hue, Home Assistant, 8Sleep, Alexa, HomePods, Bambu 3D printers, IoTaWatt'],
              ['Health & Fitness', 'Garmin Watch, WHOOP, Oura Ring'],
              ['Security', '1Password vault access, Snyk'],
              ['Social Media', 'Twitter/X (posting, bookmarks, monitoring)'],
              ['Shopping', 'Albert Heijn, Tesco, Foodora, Google Places'],
              ['AI Providers', 'Anthropic Claude, OpenAI GPT, Google Gemini, xAI Grok, MiniMax, Mistral, DeepSeek, Perplexity, Ollama, LM Studio, vLLM, OpenRouter'],
              ['Browsers', 'Chrome/Chromium (CDP), Browserless, Browserbase'],
              ['Marketplaces', 'Composio (1000+ apps), MeshCore (AI agent marketplace with billing)'],
            ].map(([title, items]) => (
              <div key={title} className={styles.integrationCard}>
                <h4 className={styles.integrationTitle}>{title}</h4>
                <p className={styles.integrationItems}>{items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section className={styles.section}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>REAL WORLD</span>
          <h2 className={styles.sectionTitle}>WHAT PEOPLE <span className="neon-magenta">ACTUALLY BUILD</span></h2>

          <div className={styles.showcaseGrid}>
            {[
              { cat: 'Email', items: ['Clear 10,000+ emails in a day', 'Morning rollup via WhatsApp', 'Auto-follow-ups for unreplied threads', 'File an insurance claim while driving'] },
              { cat: 'Smart Home', items: ['Control lights, locks, and speakers', 'Agent auto-discovers HomePods on network', 'Remote IoT calibration via SSH', 'Garmin health tracking with late-night alerts'] },
              { cat: 'Calendar & Family', items: ['Chat-based calendar management', 'Weekly meal planning in Notion', 'Morning brief: weather, meetings, health', 'Sunday family roundup from dropped topics'] },
              { cat: 'Coding & DevOps', items: ['Rebuild a website via Telegram while watching Netflix', 'Debug a fitness app mid-workout', 'Overnight coding agents (12:30am–7am)', 'Voice-driven deploy and fix while walking the dog'] },
              { cat: 'Shopping & Tasks', items: ['Negotiate car prices across dealers — saved $4,200', 'Order groceries with 1Password MFA handling', 'Flight check-in with window seat while driving'] },
              { cat: 'Creative & Hardware', items: ['$35 holo cube as physical agent display', 'Chinese language learning with TTS and spaced repetition', 'Mac Mini as dedicated AI machine', 'Raspberry Pi always-on assistant'] },
            ].map(({ cat, items }) => (
              <div key={cat} className={styles.showcaseCard}>
                <h4 className={styles.showcaseTitle}>{cat}</h4>
                <ul className={styles.showcaseList}>
                  {items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPER FEATURES ── */}
      <section className={styles.sectionAlt}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>FOR DEVELOPERS</span>
          <h2 className={styles.sectionTitle}>BUILD & <span className="neon-cyan">EXTEND</span></h2>

          <div className={styles.featureList}>
            {[
              { title: 'Custom Skill Creation', body: 'Skills are directories with a SKILL.md file containing YAML frontmatter and Markdown instructions. Supports platform filtering, binary/env requirements, and auto-installers for brew, npm, go, uv, and direct downloads. Hot reload with 250ms debounce.' },
              { title: 'SOUL.md Persona System', body: 'Define agent personality, communication style, and boundaries. Companion files: AGENTS.md (behavior rules), USER.md (user profile), IDENTITY.md (name/emoji), TOOLS.md (local tool notes), HEARTBEAT.md (routine checks), BOOT.md (startup sequence). 187 production-ready templates across 24+ categories.' },
              { title: 'Ralph Loop', body: 'Automated coding loop for iterative agent execution. Supports Codex, Claude Code, OpenCode, Goose. Two modes: PLANNING (gap analysis, spec creation) and BUILDING (task selection, implementation, testing, commits). Completion via promise phrase, test exit status, or plan sentinel.' },
              { title: 'Plugin System', body: 'Extend OpenClaw with new channels, providers, tools, skills, speech, and image generation. Registration methods for every component type. Install from npm or ClawHub. Two formats: native plugins and bundle plugins (Codex/Claude/Cursor-compatible).' },
              { title: 'MeshCore Marketplace', body: 'Open marketplace for AI agents with built-in billing. Developers publish agents, set pricing, earn money when called. "npm for AI agents, but with built-in billing."' },
              { title: 'ClawTeam — Multi-Agent Swarms', body: 'Agents self-organize into teams, split work, communicate, and converge without human micromanagement. Works with OpenClaw, Claude Code, Codex, Cursor, and other CLI agents.' },
            ].map(({ title, body }) => (
              <div key={title} className={styles.featureItem}>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALL ── */}
      <section className={styles.section}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>GET STARTED</span>
          <h2 className={styles.sectionTitle}>INSTALL <span className="neon-green">IN 5 MINUTES</span></h2>

          <div className={styles.installGrid}>
            <div>
              <h3 className={styles.subTitle}>macOS / Linux</h3>
              <div className={styles.codeBlock}>
                <span className={styles.codeLabel}>TERMINAL</span>
{`curl -fsSL https://openclaw.ai/install.sh | bash`}
              </div>
            </div>
            <div>
              <h3 className={styles.subTitle}>Windows</h3>
              <div className={styles.codeBlock}>
                <span className={styles.codeLabel}>POWERSHELL</span>
{`iwr -useb https://openclaw.ai/install.ps1 | iex`}
              </div>
            </div>
          </div>

          <div className={styles.codeBlock} style={{ marginTop: '1.5rem' }}>
            <span className={styles.codeLabel}>THEN</span>
{`openclaw onboard --install-daemon    # 2-min guided setup
openclaw gateway status              # Verify it's running
openclaw dashboard                   # Open the browser UI`}
          </div>

          <div className={styles.metaRow} style={{ marginTop: '2rem' }}>
            <span className={styles.metaTag}>Free & Open Source</span>
            <span className={styles.metaTag}>Bring Your Own API Key</span>
            <span className={styles.metaTag}>Self-Hosted</span>
          </div>
        </div>
      </section>
    </div>
  )
}
