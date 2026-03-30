import { useState } from 'react'
import styles from './Join.module.css'

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

async function generateWelcome(name, background, reason) {
  const prompt = `You are the OpenClaw Colorado Club AI. A new member just joined our hands-on AI meetup group.

Their name: ${name}
Their background: ${background}
Why they're joining: ${reason}

Write a personalized, energetic, and warm welcome message for them. It should:
- Address them by first name
- Reference something specific about their background and reason for joining
- Tell them what their first session experience will be like
- Mention 1-2 specific ways OpenClaw will help them specifically
- End with something punchy and exciting about the community
- Be 3-4 short paragraphs
- Have a neon cyberpunk energy but still be genuine and human
- Do NOT use generic phrases like "Welcome aboard!" or "Excited to have you"

Just write the message directly, no subject line or extra formatting.`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': window.__ANTHROPIC_API_KEY__ || '',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}

export default function Join() {
  const [form, setForm] = useState({ name: '', email: '', background: '', reason: '', interests: [] })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [welcome, setWelcome] = useState('')
  const [error, setError] = useState('')

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
      const msg = await generateWelcome(form.name, form.background, form.reason)
      setWelcome(msg)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
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

            <div className={styles.welcomeMessage}>
              <div className={styles.welcomeLabel}>
                <span className={styles.wlDot} />
                <span>AI-GENERATED WELCOME MESSAGE</span>
                <span className={styles.wlDot} />
              </div>
              <div className={styles.welcomeText}>
                {welcome.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className={styles.successActions}>
              <a
                href="https://meetup.com"
                target="_blank"
                rel="noreferrer"
                className={styles.successBtn}
              >
                RSVP TO NEXT EVENT →
              </a>
              <button
                className={styles.successSecondary}
                onClick={() => { setStatus('idle'); setForm({ name: '', email: '', background: '', reason: '', interests: [] }) }}
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
            Fill this out. An AI will personally welcome you. Then show up Tuesday.
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
                  ['◈', 'green', 'Session recordings library'],
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

              {error && (
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
                    <span>AI IS WRITING YOUR WELCOME...</span>
                  </>
                ) : (
                  <>
                    <span>JOIN OPENCLAW</span>
                    <span className={styles.submitArrow}>→</span>
                  </>
                )}
              </button>

              <p className={styles.formNote}>
                Submitting generates a personalized AI welcome message using Claude.
                Your info is not stored or sold — ever.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
