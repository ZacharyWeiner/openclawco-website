import { useEffect, useState } from 'react'
import styles from './Members.module.css'
import { fetchMembers } from '../lib/fetchMembers'

const FEATURED_MEMBERS = [
  {
    initials: 'AK',
    name: 'Alex K.',
    role: 'Founder & Product Lead',
    color: 'cyan',
    bio: 'Automates everything that moves. Built the club\'s first email triage workflow at Session 2 and hasn\'t touched a manual reply since. Shipped 4 AI-powered products in 2024.',
    sessions: 34,
  },
  {
    initials: 'MR',
    name: 'Morgan R.',
    role: 'Full Stack Developer',
    color: 'magenta',
    bio: 'Came for the AI agents, stayed for the community. Maintains AgentChain and has demoed at 12 sessions. Believes every SaaS should be replaceable by a well-prompted LLM.',
    sessions: 28,
  },
  {
    initials: 'JS',
    name: 'Jordan S.',
    role: 'Marketing Director',
    color: 'green',
    bio: 'Non-technical by background, terrifying by output. Built a 10-format content pipeline at Session 7 that now handles 80% of their company\'s content. Proof anyone can build.',
    sessions: 22,
  },
  {
    initials: 'TC',
    name: 'Taylor C.',
    role: 'Operations Lead',
    color: 'cyan',
    bio: 'Came with a 200-item manual ops checklist. Left with an AI agent that does it in 4 minutes. Now the club\'s resident evangelist for "automate before you hire."',
    sessions: 19,
  },
  {
    initials: 'PR',
    name: 'Phoenix R.',
    role: 'ML Engineer',
    color: 'magenta',
    bio: 'Bridges the gap between "what Claude can theoretically do" and "what you\'d actually ship at 2am." Runs the club\'s weekly technical deep dives.',
    sessions: 31,
  },
  {
    initials: 'SL',
    name: 'Sam L.',
    role: 'Independent Consultant',
    color: 'green',
    bio: 'Uses AI to do the work of 3 people. Doesn\'t say that to brag — says it to recruit. Brought 8 new members to the club last quarter and counting.',
    sessions: 25,
  },
]

const MEMBERS_THRESHOLD = 5

export default function Members() {
  const [realMembers, setRealMembers] = useState([])

  useEffect(() => {
    fetchMembers().then(setRealMembers).catch(() => {})
  }, [])

  const colorOrder = ['cyan', 'magenta', 'green']
  const displayMembers = realMembers.length >= MEMBERS_THRESHOLD
    ? realMembers
    : [...realMembers, ...FEATURED_MEMBERS]

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      {/* ── HEADER ── */}
      <section className={styles.pageHeader}>
        <div className="section-wrapper">
          <span className={styles.eyebrow}>THE COMMUNITY</span>
          <h1 className={styles.pageTitle}>
            THE BUILDERS<br />
            <span className="neon-magenta">BEHIND THE CLUB</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Every member here showed up, built something, and kept coming back. That's the whole criteria.
          </p>
        </div>
      </section>

      {/* ── MEMBER GRID ── */}
      <section className={styles.membersSection}>
        <div className="section-wrapper">
          <div className={styles.membersGrid}>
            {displayMembers.map((m, i) => {
              const color = m.color || colorOrder[i % colorOrder.length]
              const initials = m.initials || m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              return (
                <div key={m.name + i} className={`${styles.memberCard} ${styles[`card_${color}`]}`}>
                  <div className={styles.memberTop}>
                    <div className={`${styles.memberAvatar} ${styles[`avatar_${color}`]}`}>
                      {initials}
                    </div>
                    <div className={styles.memberInfo}>
                      <h3 className={styles.memberName}>{m.name}</h3>
                      <p className={styles.memberRole}>{m.role}</p>
                    </div>
                    {m.sessions && (
                      <div className={styles.memberSessions}>
                        <span className={styles.sessionsNum}>{m.sessions}</span>
                        <span className={styles.sessionsLabel}>SESSIONS</span>
                      </div>
                    )}
                  </div>
                  <p className={styles.memberBio}>{m.bio}</p>
                </div>
              )
            })}
          </div>

          <div className={styles.moreMembers}>
            <span className={styles.moreDot} />
            <span className={styles.moreText}>+ 80 more members building weekly</span>
            <span className={styles.moreDot} />
          </div>
        </div>
      </section>
    </div>
  )
}
