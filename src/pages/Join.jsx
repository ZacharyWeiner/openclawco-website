import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Join.module.css'
import { submitToSheet } from '../lib/submitToSheet'
import { submitBio } from '../lib/submitBio'

const INTEREST_OPTIONS = [
  'Email / Inbox automation',
  'Scheduling & calendar AI',
  'Content creation pipelines',
  'Business process automation',
  'AI agent development',
  'Prompt engineering',
  'Startup / product building',
  'Just curious about AI',
]

export default function Join() {
  const [form, setForm] = useState({ name: '', email: '', background: '', reason: '', interests: [] })
  const [status, setStatus] = useState('idle') // idle | loading | welcome | bioSubmitting | done | error
  const [error, setError] = useState('')
  const [bioForm, setBioForm] = useState({ role: '', bio: '' })
  const [bioError, setBioError] = useState('')

  const toggleInterest = (val) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(val)
        ? f.interests.filter(x => x !== val)
        : [...f.interests, val],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.background || !form.reason) return
    setStatus('loading')
    setError('')
    try {
      await submitToSheet(form)
      setStatus('welcome')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const handleBioSubmit = async (e) => {
    e.preventDefault()
    setBioError('')
    setStatus('bioSubmitting')
    try {
      await submitBio({ name: form.name, role: bioForm.role, bio: bioForm.bio })
      setStatus('done')
    } catch (err) {
      setBioError(err.message || 'Bio submission failed. Please try again.')
      setStatus('welcome')
    }
  }

  if (status === 'welcome' || status === 'bioSubmitting' || status === 'done') {
    return (
      <div className={styles.page}>
        <div className={styles.bg}>
          <div className={styles.glow1} />
          <div className={styles.glow2} />
        </div>
        <div className={`${styles.successScreen} section-wrapper`}>
          <div className={styles.successCard}>
            <div className={styles.successGlow} />
            <div className={styles.successHeader}>
              <div className={styles.successIcon}>◈</div>
              <span className={styles.successEyebrow}>ACCESS GRANTED</span>
              <h1 className={styles.successTitle}>
                WELCOME TO<br />
                <span className="neon-cyan">OPENCLAW</span>
              </h1>
              <p className={styles.successName}>{form.name}</p>
            </div>

            {status === 'done' ? (
              <div className={styles.bioConfirm}>
                <span className={styles.bioConfirmEyebrow}>◈ BIO SUBMITTED</span>
                <p>You'll appear on the members page after approval.</p>
              </div>
            ) : (
              <div className={styles.bioStep}>
                <div className={styles.bioStepHeader}>
                  <span className={styles.bioStepEyebrow}>OPTIONAL — ADD YOUR MEMBER BIO</span>
                  <p className={styles.bioStepCopy}>Show up on the members page. Tell the club what you're building.</p>
                </div>
                <form onSubmit={handleBioSubmit} className={styles.bioStepForm}>
                  <div className={styles.bioStepField}>
                    <label className={styles.bioStepLabel}>YOUR ROLE *</label>
                    <input
                      className={styles.bioStepInput}
                      type="text"
                      placeholder="Developer, Founder, etc."
                      value={bioForm.role}
                      onChange={e => setBioForm(f => ({ ...f, role: e.target.value }))}
                      required
                    />
                  </div>
                  <div className={styles.bioStepField}>
                    <label className={styles.bioStepLabel}>YOUR BIO *</label>
                    <textarea
                      className={`${styles.bioStepInput} ${styles.bioStepTextarea}`}
                      placeholder="2-3 sentences — who you are and what you're building."
                      value={bioForm.bio}
                      onChange={e => setBioForm(f => ({ ...f, bio: e.target.value }))}
                      rows={3}
                      required
                    />
                  </div>
                  {bioError && (
                    <div className={styles.bioStepError}>⚠ {bioError}</div>
                  )}
                  <div className={styles.bioStepActions}>
                    <button
                      type="submit"
                      disabled={status === 'bioSubmitting'}
                      className={styles.bioStepBtn}
                    >
                      {status === 'bioSubmitting' ? 'SUBMITTING...' : 'ADD MY BIO →'}
                    </button>
                    <button
                      type="button"
                      className={styles.bioSkipBtn}
                      onClick={() => setStatus('done')}
                    >
                      SKIP FOR NOW
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className={styles.successActions}>
              <Link
                to="/events"
                className={styles.successBtn}
              >
                RSVP TO NEXT EVENT →
              </Link>
              <button
                className={styles.successSecondary}
                onClick={() => { setStatus('idle'); setForm({ name: '', email: '', background: '', reason: '', interests: [] }); setBioForm({ role: '', bio: '' }) }}
              >
                REGISTER ANOTHER MEMBER
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
          <span className={styles.eyebrow}>JOIN THE CLUB</span>
          <h1 className={styles.pageTitle}>
            GET IN.<br />
            <span className="neon-cyan">START BUILDING.</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Fill this out. Then show up Tuesday.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className={styles.formSection}>
        <div className="section-wrapper">
          <div className={styles.formLayout}>
            {/* LEFT: Perks */}
            <div className={styles.perksPanel}>
              <h3 className={styles.perksTitle}>MEMBERSHIP INCLUDES</h3>
              <ul className={styles.perksList}>
                {[
                  ['◈', 'cyan', 'Free weekly sessions — forever'],
                  ['◈', 'magenta', 'Access to all club tools & templates'],
                  ['◈', 'cyan', 'Discord community + async help'],
                  ['◈', 'magenta', 'Monthly deep-dive workshops'],
                  ['◈', 'green', 'Early access to new AI tools'],
                  ['◈', 'cyan', 'Build partnerships with other members'],
                ].map(([icon, color, text]) => (
                  <li key={text} className={styles.perkItem}>
                    <span className={`${styles.perkIcon} ${styles[`icon_${color}`]}`}>{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.perksNote}>
                <span className={styles.perksNoteDot} />
                <span>
                  No fees. No catch. We're a community club, not a company.
                  The only cost is showing up.
                </span>
              </div>
            </div>

            {/* RIGHT: Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.label}>NAME *</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.label}>EMAIL *</label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className={styles.formField}>
                <label className={styles.label}>YOUR BACKGROUND *</label>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="What do you do? What's your experience with AI? (2-3 sentences)"
                  value={form.background}
                  onChange={e => setForm(f => ({ ...f, background: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.label}>WHY ARE YOU JOINING? *</label>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="What do you want to build, automate, or learn? What's the AI problem you keep putting off?"
                  value={form.reason}
                  onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.label}>INTERESTS (OPTIONAL)</label>
                <div className={styles.interestsGrid}>
                  {INTEREST_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      className={`${styles.interestChip} ${form.interests.includes(opt) ? styles.chipActive : ''}`}
                      onClick={() => toggleInterest(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {status === 'error' && (
                <div className={styles.errorBox}>
                  <span className={styles.errorIcon}>⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={styles.submitBtn}
              >
                {status === 'loading' ? (
                  <>
                    <span className={styles.spinner} />
                    <span>SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>JOIN OPENCLAW</span>
                    <span className={styles.submitArrow}>→</span>
                  </>
                )}
              </button>

              <p className={styles.formNote}>
                Your info is stored securely for club membership only — never sold or shared.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
