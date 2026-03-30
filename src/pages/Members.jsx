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
    tags: ['Automation', 'Product', 'Claude API'],
    sessions: 34,
  },
  {
    initials: 'MR',
    name: 'Morgan R.',
    role: 'Full Stack Developer',
    color: 'magenta',
    bio: 'Came for the AI agents, stayed for the community. Maintains AgentChain and has demoed at 12 sessions. Believes every SaaS should be replaceable by a well-prompted LLM.',
    tags: ['Dev', 'Agents', 'Open Source'],
    sessions: 28,
  },
  {
    initials: 'JS',
    name: 'Jordan S.',
    role: 'Marketing Director',
    color: 'green',
    bio: 'Non-technical by background, terrifying by output. Built a 10-format content pipeline at Session 7 that now handles 80% of their company\'s content. Proof anyone can build.',
    tags: ['Content', 'Non-Technical', 'Growth'],
    sessions: 22,
  },
  {
    initials: 'TC',
    name: 'Taylor C.',
    role: 'Operations Lead',
    color: 'cyan',
    bio: 'Came with a 200-item manual ops checklist. Left with an AI agent that does it in 4 minutes. Now the club\'s resident evangelist for "automate before you hire."',
    tags: ['Ops', 'Efficiency', 'Systems'],
    sessions: 19,
  },
  {
    initials: 'PR',
    name: 'Phoenix R.',
    role: 'ML Engineer',
    color: 'magenta',
    bio: 'Bridges the gap between "what Claude can theoretically do" and "what you\'d actually ship at 2am." Runs the club\'s weekly technical deep dives.',
    tags: ['ML', 'Engineering', 'Architecture'],
    sessions: 31,
  },
  {
    initials: 'SL',
    name: 'Sam L.',
    role: 'Independent Consultant',
    color: 'green',
    bio: 'Uses AI to do the work of 3 people. Doesn\'t say that to brag — says it to recruit. Brought 8 new members to the club last quarter and counting.',
    tags: ['Consulting', 'Productivity', 'Recruiting'],
    sessions: 25,
  },
]

async function generateBio(name, role, about) {
  const prompt = `You are the OpenClaw Colorado Club AI, writing hype-style member bios for our club page.

Member name: ${name}
Their role: ${role}
About them: ${about}

Write a 3-sentence bio in the first person for this member. It should:
- Be written FROM their perspective (use "I" or be written as if they're describing themselves, but in third person is fine)
- Actually be written in third person, short and punchy
- Sound like a cross between a LinkedIn recommendation and a comic book origin story
- Highlight what makes them interesting or dangerous in the AI space
- Reference something specific from their background
- End with a memorable closer
- Be 3 sentences max, dense with detail
- Have real energy — no corporate buzzwords, no filler phrases
- Make them sound worth knowing

Just write the 3 sentences. No introduction, no formatting.`

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
      max_tokens: 400,
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

const MEMBERS_THRESHOLD = 5

export default function Members() {
  const [form, setForm] = useState({ name: '', role: '', about: '' })
  const [status, setStatus] = useState('idle') // idle | loading | done | submitting | submitted | error
  const [generatedBio, setGeneratedBio] = useState('')
  const [error, setError] = useState('')
  const [realMembers, setRealMembers] = useState([])

  useEffect(() => {
    fetchMembers().then(setRealMembers).catch(() => {})
  }, [])

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!form.name || !form.role || !form.about) return
    setStatus('loading')
    setError('')
    try {
      const bio = await generateBio(form.name, form.role, form.about)
      setGeneratedBio(bio)
      setStatus('done')
    } catch (err) {
      setError(err.message || 'Generation failed. Please try again.')
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setGeneratedBio('')
    setError('')
    setForm({ name: '', role: '', about: '' })
  }

  const colorOrder = ['cyan', 'magenta', 'green']
  const displayMembers = realMembers.length >= MEMBERS_THRESHOLD
    ? realMembers
    : [...realMembers, ...FEATURED_MEMBERS]

  const handleSubmitBio = async () => {
    setStatus('submitting')
    try {
      await submitBio({ name: form.name, role: form.role, bio: generatedBio })
      setStatus('submitted')
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
      setStatus('done')
    }
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

                  {m.tags && m.tags.length > 0 && (
                    <div className={styles.memberTags}>
                      {m.tags.map(tag => (
                        <span key={tag} className={`${styles.memberTag} ${styles[`tag_${color}`]}`}>{tag}</span>
                      ))}
                    </div>
                  )}
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

      {/* ── AI BIO GENERATOR ── */}
      <section className={styles.bioSection}>
        <div className="section-wrapper">
          <div className={styles.bioLayout}>
            <div className={styles.bioLeft}>
              <span className={styles.sectionEyebrow}>AI BIO GENERATOR</span>
              <h2 className={styles.sectionTitle}>
                GENERATE YOUR<br />
                <span className="neon-cyan">MEMBER BIO</span>
              </h2>
              <p className={styles.bioCopy}>
                Fill in a few details and let Claude write your club intro.
                Hype-style, accurate, and way better than anything you'd write about yourself.
              </p>
              <div className={styles.bioHint}>
                <span className={styles.hintIcon}>◈</span>
                <span>
                  Your bio will appear on the members page after you join and attend your first session.
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
              ) : (status === 'done' || status === 'submitting') ? (
                <div className={styles.bioResult}>
                  <div className={styles.bioResultHeader}>
                    <span className={styles.bioResultEyebrow}>GENERATED BIO</span>
                    <h3 className={styles.bioResultName}>{form.name}</h3>
                    <p className={styles.bioResultRole}>{form.role}</p>
                  </div>

                  <div className={styles.bioResultText}>
                    <div className={styles.bioQuoteMark}>"</div>
                    <p>{generatedBio}</p>
                  </div>

                  {error && (
                    <div className={styles.errorBox}>
                      <span>⚠ {error}</span>
                    </div>
                  )}

                  <div className={styles.bioResultActions}>
                    <button
                      className={styles.copyBtn}
                      onClick={() => navigator.clipboard.writeText(generatedBio)}
                    >
                      COPY BIO
                    </button>
                    <button
                      className={styles.generateBtn}
                      onClick={handleSubmitBio}
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'SUBMITTING...' : 'SUBMIT MY BIO →'}
                    </button>
                    <button className={styles.regenBtn} onClick={reset}>
                      REGENERATE ↺
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleGenerate} className={styles.bioForm}>
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
                    <label className={styles.label}>ABOUT YOU *</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="2-3 sentences: What do you do, what AI thing are you most proud of, what are you building or trying to automate?"
                      value={form.about}
                      onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  {(status === 'error') && (
                    <div className={styles.errorBox}>
                      <span>⚠ {error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={styles.generateBtn}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className={styles.spinner} />
                        <span>CLAUDE IS WRITING YOUR BIO...</span>
                      </>
                    ) : (
                      <>
                        <span>GENERATE MY BIO WITH AI</span>
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
