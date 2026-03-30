import styles from './Products.module.css'

const TOOLS = [
  {
    id: 1,
    category: 'WORKFLOW',
    color: 'cyan',
    icon: '📥',
    name: 'InboxClear Pro',
    tagline: 'AI email triage that actually works',
    desc: 'Built at our Inbox Zero session. A Claude-powered email processor that reads, categorizes, drafts replies, and flags urgent items. Works with Gmail and Outlook.',
    tags: ['Claude API', 'Email', 'Automation'],
    status: 'AVAILABLE',
    link: '#',
  },
  {
    id: 2,
    category: 'PRODUCTIVITY',
    color: 'magenta',
    icon: '📅',
    name: 'MeetingZero',
    tagline: 'Stop scheduling meetings manually',
    desc: 'An AI scheduling agent that reads your availability, proposes times, sends invites, and handles rescheduling — all through a simple natural language interface.',
    tags: ['AI Agents', 'Calendar', 'GPT-4'],
    status: 'BETA',
    link: '#',
  },
  {
    id: 3,
    category: 'CONTENT',
    color: 'green',
    icon: '✍️',
    name: 'ContentStack',
    tagline: 'One idea, ten formats, ten minutes',
    desc: 'Paste a rough idea. Get a blog post, LinkedIn update, Twitter thread, email newsletter, and summary slide — all tuned to your voice.',
    tags: ['Claude API', 'Writing', 'Multi-format'],
    status: 'AVAILABLE',
    link: '#',
  },
  {
    id: 4,
    category: 'AUTOMATION',
    color: 'cyan',
    icon: '🔗',
    name: 'AgentChain',
    tagline: 'String AI agents together without code',
    desc: 'A visual workflow builder where you connect AI tasks like LEGO blocks. Built by our dev members and open-sourced at last month\'s hack night.',
    tags: ['No-Code', 'Agents', 'Open Source'],
    status: 'OPEN SOURCE',
    link: '#',
  },
  {
    id: 5,
    category: 'RESEARCH',
    color: 'magenta',
    icon: '🔍',
    name: 'DeepRead',
    tagline: 'Read everything. Synthesize instantly.',
    desc: 'Drop a stack of PDFs, articles, or URLs. Get a synthesized report with key takeaways, contradictions, and your biggest open questions answered.',
    tags: ['RAG', 'Research', 'Claude'],
    status: 'AVAILABLE',
    link: '#',
  },
  {
    id: 6,
    category: 'TEMPLATE',
    color: 'green',
    icon: '📋',
    name: 'Prompt Vault',
    tagline: 'The club\'s curated prompt library',
    desc: 'A community-maintained collection of battle-tested prompts for real work. Organized by use case, rated by members, updated weekly.',
    tags: ['Prompts', 'Community', 'Free'],
    status: 'FREE',
    link: '#',
  },
]

const RESOURCES = [
  {
    type: 'GUIDE',
    color: 'cyan',
    title: 'AI Workflow Starter Pack',
    desc: '10 workflows you can implement today. No code required. Works with Claude or GPT.',
    link: '#',
  },
  {
    type: 'VIDEO',
    color: 'magenta',
    title: 'Session Recordings',
    desc: 'Full recordings from past workshops. Watch over anyone\'s shoulder as they build.',
    link: '#',
  },
  {
    type: 'TEMPLATE',
    color: 'green',
    title: 'Agent Architecture Templates',
    desc: 'Copy-paste templates for building multi-step AI workflows. Maintained by club devs.',
    link: '#',
  },
  {
    type: 'TOOL',
    color: 'cyan',
    title: 'AI ROI Calculator',
    desc: 'How many hours per week could you automate? Enter your role. Get the math.',
    link: '#',
  },
]

const statusColor = {
  AVAILABLE: 'green',
  BETA: 'yellow',
  'OPEN SOURCE': 'cyan',
  FREE: 'magenta',
}

export default function Products() {
  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      {/* ── HEADER ── */}
      <section className={styles.pageHeader}>
        <div className="section-wrapper">
          <span className={styles.eyebrow}>TOOLS & RESOURCES</span>
          <h1 className={styles.pageTitle}>
            BUILT BY THE CLUB.<br />
            <span className="neon-green">FREE FOR MEMBERS.</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Every tool here was built or curated by OpenClaw members. Real workflows, tested in the wild, shared freely.
          </p>
        </div>
      </section>

      {/* ── TOOLS GRID ── */}
      <section className={styles.toolsSection}>
        <div className="section-wrapper">
          <div className={styles.toolsGrid}>
            {TOOLS.map((tool) => (
              <div key={tool.id} className={`${styles.toolCard} ${styles[`card_${tool.color}`]}`}>
                <div className={styles.toolTop}>
                  <div className={styles.toolMeta}>
                    <span className={`${styles.toolCategory} ${styles[`cat_${tool.color}`]}`}>
                      {tool.category}
                    </span>
                    <span className={`${styles.toolStatus} ${styles[`status_${statusColor[tool.status]}`]}`}>
                      {tool.status}
                    </span>
                  </div>
                  <span className={styles.toolIcon}>{tool.icon}</span>
                </div>

                <h3 className={styles.toolName}>{tool.name}</h3>
                <p className={styles.toolTagline}>{tool.tagline}</p>
                <p className={styles.toolDesc}>{tool.desc}</p>

                <div className={styles.toolTags}>
                  {tool.tags.map(tag => (
                    <span key={tag} className={styles.toolTag}>{tag}</span>
                  ))}
                </div>

                <a href={tool.link} className={`${styles.toolBtn} ${styles[`btn_${tool.color}`]}`}>
                  ACCESS TOOL <span>→</span>
                </a>

                {/* Corner accent */}
                <div className={`${styles.cornerAccent} ${styles[`corner_${tool.color}`]}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section className={styles.resourcesSection}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>LEARNING RESOURCES</span>
          <h2 className={styles.sectionTitle}>
            EVERYTHING YOU NEED TO<br />
            <span className="neon-cyan">GET MOVING</span>
          </h2>

          <div className={styles.resourcesGrid}>
            {RESOURCES.map((res) => (
              <a key={res.title} href={res.link} className={`${styles.resourceCard} ${styles[`res_${res.color}`]}`}>
                <span className={`${styles.resType} ${styles[`resType_${res.color}`]}`}>{res.type}</span>
                <h3 className={styles.resTitle}>{res.title}</h3>
                <p className={styles.resDesc}>{res.desc}</p>
                <span className={styles.resArrow}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTRIBUTE BANNER ── */}
      <section className={styles.contribute}>
        <div className="section-wrapper">
          <div className={styles.contributeBox}>
            <div className={styles.contributeGlow} />
            <div className={styles.contributeContent}>
              <span className={styles.sectionEyebrow}>OPEN SOURCE CULTURE</span>
              <h2 className={styles.contributeTitle}>
                BUILT SOMETHING GREAT?<br />
                <span className="neon-magenta">SHARE IT WITH THE CLUB.</span>
              </h2>
              <p className={styles.contributeDesc}>
                Everything listed here started as someone showing up to a session with an idea.
                If you've built an AI workflow, automation, or tool that other members could use —
                bring it. We'll help you refine, publish, and share it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
