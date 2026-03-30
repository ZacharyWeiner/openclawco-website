import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Install.module.css'

const PLATFORMS = ['MAC', 'LINUX', 'WINDOWS']

const PREREQS = [
  {
    icon: '⬡',
    title: 'Node.js',
    desc: 'Version 24 recommended. Node 22.14+ also works. The install script handles this for Mac and Linux.',
  },
  {
    icon: '🔑',
    title: 'API Key',
    desc: 'You\'ll need a key from a model provider — Anthropic, OpenAI, or Google. Onboarding will walk you through it.',
  },
  {
    icon: '💬',
    title: 'A Chat App',
    desc: 'Telegram is the fastest to connect. Discord and WhatsApp also work. Pick whichever you already use.',
  },
]

const CHANNELS = [
  {
    icon: '✈️',
    name: 'Telegram',
    desc: 'Fastest to set up. Create a bot via @BotFather, paste the token during onboarding, and you\'re chatting with your agent in under a minute.',
    tag: 'RECOMMENDED',
    color: 'cyan',
  },
  {
    icon: '🎮',
    name: 'Discord',
    desc: 'Great for power users. Set up a private server, create a bot application, and invite your agent. Supports topic channels for organizing tasks.',
    tag: 'POPULAR',
    color: 'magenta',
  },
  {
    icon: '📱',
    name: 'WhatsApp',
    desc: 'Talk to your agent like you\'d text a friend. Uses the Beeper bridge for iMessage-style integration. Some members run their entire life through it.',
    tag: 'ADVANCED',
    color: 'green',
  },
]

export default function Install() {
  const [platform, setPlatform] = useState('MAC')

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      {/* ── HEADER ── */}
      <section className={styles.pageHeader}>
        <div className="section-wrapper">
          <span className={styles.eyebrow}>GET STARTED</span>
          <h1 className={styles.pageTitle}>
            INSTALL<br />
            <span className="neon-cyan">OPENCLAW</span>
          </h1>
          <p className={styles.pageSubtitle}>
            From zero to a working personal AI agent in under 5 minutes.
            Pick your platform, run the commands, and start building.
          </p>
        </div>
      </section>

      {/* ── PREREQUISITES ── */}
      <section className={styles.prereqs}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>BEFORE YOU START</span>
          <h2 className={styles.sectionTitle}>
            WHAT YOU <span className="neon-magenta">NEED</span>
          </h2>
          <div className={styles.prereqGrid}>
            {PREREQS.map(({ icon, title, desc }) => (
              <div key={title} className={styles.prereqCard}>
                <div className={styles.prereqIcon}>{icon}</div>
                <h3 className={styles.prereqTitle}>{title}</h3>
                <p className={styles.prereqDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM INSTALL ── */}
      <section className={styles.platforms}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>INSTALLATION</span>
          <h2 className={styles.sectionTitle}>
            PICK YOUR <span className="neon-cyan">PLATFORM</span>
          </h2>

          <div className={styles.tabs}>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                className={`${styles.tab} ${platform === p ? styles.tabActive : ''}`}
                onClick={() => setPlatform(p)}
              >
                {p === 'MAC' ? '🍎 macOS' : p === 'LINUX' ? '🐧 Linux' : '🪟 Windows'}
              </button>
            ))}
          </div>

          <div className={styles.platformContent}>
            {/* ── macOS ── */}
            {platform === 'MAC' && (
              <>
                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 1</div>
                  <h3 className={styles.stepTitle}>Install OpenClaw</h3>
                  <p className={styles.stepDesc}>
                    Open Terminal and run the one-liner. This installs Node.js (if needed) and the OpenClaw CLI.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`curl -fsSL https://openclaw.ai/install.sh | bash`}
                  </div>
                  <p className={styles.stepDesc} style={{ marginTop: '1rem' }}>
                    Or install via npm if you already have Node.js:
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`npm i -g openclaw`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 2</div>
                  <h3 className={styles.stepTitle}>Run Onboarding</h3>
                  <p className={styles.stepDesc}>
                    This walks you through choosing a model provider, entering your API key, and starting the Gateway.
                    Takes about 2 minutes.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`openclaw onboard --install-daemon`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 3</div>
                  <h3 className={styles.stepTitle}>Verify It's Running</h3>
                  <p className={styles.stepDesc}>
                    Check that the Gateway is up. You should see it listening on port 18789.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`openclaw gateway status`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 4</div>
                  <h3 className={styles.stepTitle}>Open the Dashboard</h3>
                  <p className={styles.stepDesc}>
                    Launch the Control UI in your browser and send your first message.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`openclaw dashboard`}
                  </div>
                </div>

                <div className={styles.note}>
                  <span className={styles.noteLabel}>TIP:</span>
                  macOS 15+ users can also download the companion menu bar app from the OpenClaw dashboard for quick access.
                </div>
              </>
            )}

            {/* ── Linux ── */}
            {platform === 'LINUX' && (
              <>
                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 1</div>
                  <h3 className={styles.stepTitle}>Install OpenClaw</h3>
                  <p className={styles.stepDesc}>
                    Open your terminal and run the install script. Works on Ubuntu, Debian, Fedora, Arch, and most distros.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`curl -fsSL https://openclaw.ai/install.sh | bash`}
                  </div>
                  <p className={styles.stepDesc} style={{ marginTop: '1rem' }}>
                    Or install via npm if you already have Node.js:
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`npm i -g openclaw`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 2</div>
                  <h3 className={styles.stepTitle}>Run Onboarding</h3>
                  <p className={styles.stepDesc}>
                    Choose your model provider, enter your API key, and start the Gateway daemon.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`openclaw onboard --install-daemon`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 3</div>
                  <h3 className={styles.stepTitle}>Verify It's Running</h3>
                  <p className={styles.stepDesc}>
                    Confirm the Gateway is listening on port 18789.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`openclaw gateway status`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 4</div>
                  <h3 className={styles.stepTitle}>Open the Dashboard</h3>
                  <p className={styles.stepDesc}>
                    Launch the browser UI and send your first message.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>TERMINAL</span>
{`openclaw dashboard`}
                  </div>
                </div>

                <div className={styles.note}>
                  <span className={styles.noteLabel}>TIP:</span>
                  Running on a Raspberry Pi or headless server? Skip the dashboard and connect via Telegram instead — it works great over SSH.
                </div>
              </>
            )}

            {/* ── Windows ── */}
            {platform === 'WINDOWS' && (
              <>
                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 1</div>
                  <h3 className={styles.stepTitle}>Install OpenClaw</h3>
                  <p className={styles.stepDesc}>
                    Open PowerShell as Administrator and run the install script.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>POWERSHELL</span>
{`iwr -useb https://openclaw.ai/install.ps1 | iex`}
                  </div>
                  <p className={styles.stepDesc} style={{ marginTop: '1rem' }}>
                    Or install via npm if you already have Node.js:
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>POWERSHELL</span>
{`npm i -g openclaw`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 2</div>
                  <h3 className={styles.stepTitle}>Run Onboarding</h3>
                  <p className={styles.stepDesc}>
                    Choose your model provider, enter your API key, and start the Gateway.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>POWERSHELL</span>
{`openclaw onboard --install-daemon`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 3</div>
                  <h3 className={styles.stepTitle}>Verify It's Running</h3>
                  <p className={styles.stepDesc}>
                    Check that the Gateway is up and listening.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>POWERSHELL</span>
{`openclaw gateway status`}
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>STEP 4</div>
                  <h3 className={styles.stepTitle}>Open the Dashboard</h3>
                  <p className={styles.stepDesc}>
                    Launch the Control UI in your browser and start chatting with your agent.
                  </p>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLabel}>POWERSHELL</span>
{`openclaw dashboard`}
                  </div>
                </div>

                <div className={styles.note}>
                  <span className={styles.noteLabel}>NOTE:</span>
                  Both native Windows and WSL2 are supported. WSL2 tends to be more stable — if you hit issues on native Windows, try running inside WSL2 instead.
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── CONNECT A CHANNEL ── */}
      <section className={styles.channels}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>NEXT STEP</span>
          <h2 className={styles.sectionTitle}>
            CONNECT A <span className="neon-green">CHAT CHANNEL</span>
          </h2>
          <div className={styles.channelGrid}>
            {CHANNELS.map(({ icon, name, desc, tag, color }) => (
              <div key={name} className={`${styles.channelCard} ${styles[`channel_${color}`]}`}>
                <div className={styles.channelIcon}>{icon}</div>
                <h3 className={styles.channelName}>{name}</h3>
                <p className={styles.channelDesc}>{desc}</p>
                <span className={`${styles.channelTag} ${styles[`channelTag_${color}`]}`}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className="section-wrapper">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>
              INSTALLED? <span className="neon-cyan">COME BUILD WITH US.</span>
            </h2>
            <p className={styles.ctaDesc}>
              Join the next OpenClaw session — we'll help you set up skills, connect integrations,
              and get your agent doing real work.
            </p>
            <Link to="/events" className={styles.ctaLink}>
              SEE UPCOMING EVENTS <span>→</span>
            </Link>
            <Link to="/join" className={styles.ctaSecondary}>
              JOIN THE CLUB <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
