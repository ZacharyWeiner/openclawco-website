import { useEffect, useState } from 'react'
import styles from './Members.module.css'
import { fetchMembers } from '../lib/fetchMembers'


export default function Members() {
  const [realMembers, setRealMembers] = useState([])

  useEffect(() => {
    fetchMembers().then(setRealMembers).catch(() => {})
  }, [])

  const colorOrder = ['cyan', 'magenta', 'green']
  const displayMembers = realMembers

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

        </div>
      </section>
    </div>
  )
}
