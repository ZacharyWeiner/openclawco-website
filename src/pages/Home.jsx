import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css'

const ROTATING_WORDS = ['BUILDERS', 'FOUNDERS', 'OPERATORS', 'MAKERS', 'HUMANS']

function useTypewriter(words, interval = 2500) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timeout

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), interval)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, words, interval])

  return displayed
}

const STATS = [
  { value: '100%', label: 'HANDS-ON' },
  { value: 'WEEKLY', label: 'SESSIONS' },
  { value: '0', label: 'BUZZWORD-ONLY TALKS' },
  { value: '∞', label: 'AUTOMATION IDEAS' },
]

const FEATURES = [
  {
    icon: '⚡',
    color: 'cyan',
    title: 'Live AI Demos',
    desc: 'Every session includes live, real-world AI agent demos — not slides, not theory. Watch automation happen in real time.',
  },
  {
    icon: '🛠',
    color: 'magenta',
    title: 'Build Together',
    desc: 'Hands-on collaboration. Bring your workflow, your problem, your chaos. Leave with something actually working.',
  },
  {
    icon: '🧠',
    color: 'green',
    title: 'No Gatekeeping',
    desc: 'Technical or not — everyone is welcome. The only requirement is curiosity about what AI can do for you.',
  },
  {
    icon: '🔁',
    color: 'cyan',
    title: 'Real Workflows',
    desc: 'Inbox zero, scheduling, content pipelines, automation stacks. Practical tools for the actual way people work.',
  },
]

export default function Home() {
  const word = useTypewriter(ROTATING_WORDS)
  const heroRef = useRef(null)

  return (
    <div className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero} ref={heroRef}>
        {/* Background elements */}
        <div className={styles.heroBg}>
          <div className={styles.meshGlow1} />
          <div className={styles.meshGlow2} />
          <div className={styles.meshGlow3} />
          <div className={styles.gridOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={`${styles.heroEyebrow} opacity-0 animate-fadeInUp delay-1`}>
            <span className={styles.eyebrowDot} />
            <span className={styles.eyebrowText}>COLORADO · AI MEETUP GROUP</span>
            <span className={styles.eyebrowDot} />
          </div>

          <h1 className={`${styles.heroTitle} opacity-0 animate-fadeInUp delay-2`}>
            <span className={styles.heroTitleLine1}>OPEN</span>
            <span className={styles.heroTitleLine2}>
              <span className={styles.clawText}>CLAW</span>
              <span className={styles.coText}>CO</span>
            </span>
          </h1>

          <div className={`${styles.typewriterBlock} opacity-0 animate-fadeInUp delay-3`}>
            <span className={styles.typewriterPrefix}>FOR </span>
            <span className={styles.typewriterWord}>{word}</span>
            <span className={styles.cursor}>_</span>
          </div>

          <p className={`${styles.heroTagline} opacity-0 animate-fadeInUp delay-4`}>
            The meetup group that actually does something.
          </p>

          <p className={`${styles.heroCopy} opacity-0 animate-fadeInUp delay-5`}>
            Builders, founders, operators, and curious minds meeting weekly in Colorado
            to actually <em>use</em> AI — live demos, real workflows, hands-on builds.
            Technical or not. Everyone leaves with something working.
          </p>

          <div className={`${styles.heroCtas} opacity-0 animate-fadeInUp delay-6`}>
            <Link to="/join" className={styles.ctaPrimary}>
              <span>JOIN THE CLUB</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link to="/events" className={styles.ctaSecondary}>
              SEE NEXT EVENT
            </Link>
          </div>

          <div className={`${styles.heroStats} opacity-0 animate-fadeInUp delay-7`}>
            {STATS.map(({ value, label }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollLine} />
          <span className={styles.scrollText}>SCROLL</span>
        </div>
      </section>

      {/* ── QR CODES ── */}
      <section className={styles.qrSection}>
        <div className="section-wrapper">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>CONNECT</span>
            <h2 className={styles.sectionTitle}>
              SCAN. <span className="neon-cyan">JOIN. BUILD.</span>
            </h2>
            <p className={styles.sectionDesc}>
              Grab a QR code — visit our site or jump straight into the Discord.
            </p>
          </div>

          <div className={styles.qrGrid}>
            <div className={styles.qrCard}>
              <img src="/openclawco-qr.png" alt="QR code for openclawco.club" className={styles.qrImage} />
              <h3 className={styles.qrLabel}>OPENCLAWCO.CLUB</h3>
              <p className={styles.qrDesc}>Our home base — events, membership, and everything OpenClaw.</p>
              <a href="/openclawco-qr.png" download="openclawco-qr.png" className={styles.qrDownload}>
                DOWNLOAD QR <span>↓</span>
              </a>
            </div>
            <div className={styles.qrCard}>
              <img src="/discord-qr.png" alt="QR code for OpenClaw Discord" className={styles.qrImage} />
              <h3 className={styles.qrLabel}>DISCORD</h3>
              <p className={styles.qrDesc}>Join the conversation — share builds, ask questions, connect with the crew.</p>
              <a href="/discord-qr.png" download="discord-qr.png" className={styles.qrDownload}>
                DOWNLOAD QR <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO BAND ── */}
      <section className={styles.manifestoBand}>
        <div className={styles.manifestoTrack}>
          {[
            'AI AGENTS', '·', 'LIVE DEMOS', '·', 'INBOX ZERO', '·',
            'AUTOMATION', '·', 'REAL WORKFLOWS', '·', 'NO BUZZWORDS', '·',
            'OPEN COLLABORATION', '·', 'BUILD IN PUBLIC', '·',
          ].concat([
            'AI AGENTS', '·', 'LIVE DEMOS', '·', 'INBOX ZERO', '·',
            'AUTOMATION', '·', 'REAL WORKFLOWS', '·', 'NO BUZZWORDS', '·',
            'OPEN COLLABORATION', '·', 'BUILD IN PUBLIC', '·',
          ]).map((text, i) => (
            <span key={i} className={text === '·' ? styles.manifestoDot : styles.manifestoWord}>
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className={styles.features}>
        <div className="section-wrapper">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>WHAT WE DO</span>
            <h2 className={styles.sectionTitle}>
              NOT ANOTHER <span className="neon-magenta">TALK SHOP</span>
            </h2>
            <p className={styles.sectionDesc}>
              We skip the theory and go straight to building. Every session is a workshop, not a lecture.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES.map(({ icon, color, title, desc }, i) => (
              <div key={title} className={`${styles.featureCard} ${styles[`card${color}`]}`}>
                <div className={styles.featureIcon}>{icon}</div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{desc}</p>
                <div className={styles.featureCorner} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className={styles.whoSection}>
        <div className="section-wrapper">
          <div className={styles.whoGrid}>
            <div className={styles.whoLeft}>
              <span className={styles.sectionEyebrow}>WHO IT'S FOR</span>
              <h2 className={styles.sectionTitle}>
                IF YOU'RE CURIOUS,<br />
                <span className="neon-cyan">YOU BELONG HERE</span>
              </h2>
              <p className={styles.whoCopy}>
                You don't need to write code. You don't need a CS degree.
                You need to show up and be ready to try things.
                The only people who don't fit here are the ones who just want to nod along.
              </p>
              <Link to="/about" className={styles.whoLink}>
                LEARN MORE ABOUT US <span>→</span>
              </Link>
            </div>
            <div className={styles.whoRight}>
              {[
                { role: 'Founders', desc: 'Automate the ops that slow you down' },
                { role: 'Developers', desc: 'Level up with agent-powered workflows' },
                { role: 'Operators', desc: 'Eliminate manual processes forever' },
                { role: 'Creators', desc: 'Ship content at machine speed' },
                { role: 'Executives', desc: 'Understand AI without the BS filter' },
                { role: 'Curious People', desc: 'Just want to see what\'s possible' },
              ].map(({ role, desc }) => (
                <div key={role} className={styles.whoCard}>
                  <span className={styles.whoCardRole}>{role}</span>
                  <span className={styles.whoCardDesc}>{desc}</span>
                  <span className={styles.whoCardArrow}>→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerBg} />
        <div className="section-wrapper">
          <div className={styles.ctaBannerInner}>
            <div className={styles.ctaBannerText}>
              <h2 className={styles.ctaBannerTitle}>
                NEXT SESSION:<br />
                <span className={styles.ctaBannerDate}>THIS WEEK IN COLORADO</span>
              </h2>
              <p className={styles.ctaBannerDesc}>
                Free to attend. Bring your laptop. Leave with a working AI workflow.
              </p>
            </div>
            <div className={styles.ctaBannerActions}>
              <Link to="/join" className={styles.ctaPrimary}>
                <span>CLAIM YOUR SPOT</span>
                <span className={styles.ctaArrow}>→</span>
              </Link>
              <Link to="/events" className={styles.ctaTertiary}>
                VIEW ALL EVENTS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
