import { useState, useEffect } from 'react'
import styles from './Members.module.css'
import { submitBio } from '../lib/submitBio'
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
  const [form, setForm] = useState({ name: '', role: '', bio: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | submitted | error
  const [error, setError] = useState('')
  const [realMembers, setRealMembers] = useState([])

  useEffect(() => {
    fetchMembers().then(setRealMembers).catch(() => {})
  }, [])

  const colorOrder = ['cyan', 'magenta', 'green']
  const displayMembers = realMembers.length >= MEMBERS_THRESHOLD
    ? realMembers
    : [...realMembers, ...FEATURED_MEMBERS]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      await submitBio({ name: form.name, role: form.role, bio: form.bio })
      setStatus('submitted')
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setError('')
    setForm({ name: '', role: '', bio: '' })
  }

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

      {/* ── BIO FORM ── */}
      <section className={styles.bioSection}>
        <div className="section-wrapper">
          <div className={styles.bioLayout}>
            <div className={styles.bioLeft}>
              <span className={styles.sectionEyebrow}>JOIN THE ROSTER</span>
              <h2 className={styles.sectionTitle}>
                ADD YOUR<br />
                <span className="neon-cyan">MEMBER BIO</span>
              </h2>
              <p className={styles.bioCopy}>
                Attended a session? Submit your bio and get added to the members page.
                Keep it short and tell us what you're building.
              </p>
              <div className={styles.bioHint}>
                <span className={styles.hintIcon}>◈</span>
                <span>
                  Your bio will appear on this page after approval.
                </span>
              </div>
            </div>

            <div className={styles.bioRight}>
              {status === 'submitted' ? (
                <div className={styles.bioResult}>
                  <div className={styles.bioResultHeader}>
                    <span className={styles.bioResultEyebrow}>BIO SUBMITTED</span>
                    <h3 className={styles.bioResultName}>{form.name}</h3>
                    <p className={styles.bioResultRole}>Pending approval — you'll appear on this page soon.</p>
                  </div>
                  <button className={styles.regenBtn} onClick={reset}>
                    SUBMIT ANOTHER ↺
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.bioForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label className={styles.label}>YOUR NAME *</label>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="First name or full name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.label}>YOUR ROLE *</label>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="Developer, Founder, etc."
                        value={form.role}
                        onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>YOUR BIO *</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Tell the club who you are and what you're building. 2-3 sentences."
                      value={form.bio}
                      onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  {error && (
                    <div className={styles.errorBox}>
                      <span>⚠ {error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={styles.generateBtn}
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className={styles.spinner} />
                        <span>SUBMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT MY BIO</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
