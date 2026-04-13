import { useState } from 'react'
import styles from './Events.module.css'
import { Link } from 'react-router-dom'
import { submitRsvp } from '../lib/submitRsvp'
import { submitSuggestion } from '../lib/submitSuggestion'
import { submitUpvote } from '../lib/submitUpvote'

const UPCOMING_EVENTS = [
  {
    id: 1,
    date: { month: 'MAR', day: '30', year: '2026' },
    title: 'Set Up Your OpenClaw Agent',
    subtitle: 'From Unboxing to "Holy Crap It Just Did That"',
    type: 'WORKSHOP',
    color: 'cyan',
    location: 'Denver Tech Center',
    time: '6:30 PM – 9:00 PM',
    spots: 25,
    tags: ['Setup', 'Beginner', 'Hands-On'],
    desc: 'First time with OpenClaw? We\'ll walk through the full setup — connect Telegram or Discord, install your first skill from ClawHub, and get your agent doing something useful before you leave. Bring a laptop and your phone.',
    link: '/install',
    featured: true,
  },
  {
    id: 2,
    date: { month: 'APR', day: '06', year: '2026' },
    title: 'Let Your Agent Handle Your Inbox',
    subtitle: 'Morning Rollups, Auto-Replies, and Zero Manual Sorting',
    type: 'BUILD SESSION',
    color: 'magenta',
    location: 'Denver Tech Center',
    time: '6:30 PM – 9:00 PM',
    spots: 20,
    tags: ['Email', 'Gmail', 'Automation'],
    desc: 'Connect your agent to Gmail and set up a morning rollup — it reads your overnight emails, summarizes what matters, flags urgent items, and drafts replies. One member cleared 10,000 emails on day one. We\'ll get you started.',
    featured: false,
    prompt: `You are my inbox manager. Every morning, process my Gmail from the last 24 hours and deliver one rollup.

1. CATEGORIZE every unread email:
   • URGENT — needs my reply or action today (clients, deadlines, blockers)
   • FYI — worth knowing, no action (updates, confirmations, newsletters I actually read)
   • AUTO — promos, receipts, social, cold outreach → archive or label, don't surface

2. SUMMARIZE urgent + FYI in plain English. For each urgent item: sender, one-line context, what they want from me.

3. DRAFT replies for every urgent item. Save as Gmail drafts — never send. Match my voice: direct, lowercase, no filler.

4. FLAG anything ambiguous before acting.

Rules:
- Never delete. Archive or label only.
- Never auto-send. Drafts only.
- If a thread has 3+ back-and-forths, include full context in the summary.
- Learn from corrections: if I move something you marked FYI to urgent, remember that sender.

Deliver at 7am. Keep it scannable — I want to be through my inbox in 5 minutes.`,
  },
  {
    id: 3,
    date: { month: 'APR', day: '13', year: '2026' },
    title: 'Your Personal Knowledge Base',
    subtitle: 'Feed Your Agent Your Notes, Docs & Life — Ask It Anything',
    type: 'BUILD SESSION',
    color: 'green',
    location: 'Denver Tech Center',
    time: '6:30 PM – 9:00 PM',
    spots: 20,
    tags: ['Memory', 'Notes', 'RAG'],
    desc: 'Drop in your notes, journals, meeting transcripts, saved articles, whatever you\'ve got. Your agent indexes it all and becomes the memory you wish you had — find that thing you wrote three years ago, surface patterns across years of thinking, pull context you\'d forgotten. Bring your files.',
    featured: false,
    prompt: `You are my personal knowledge base. I'm feeding you my notes, journals, docs, saved articles, meeting transcripts, and anything else I've written or collected. Your job is to make all of it searchable and useful.

1. INDEX everything I give you. Tag by topic, people mentioned, date written, and source (journal, meeting, article, etc.). Keep the original text — never paraphrase into the index.

2. ANSWER questions by quoting the source directly. For every answer, cite: source file, date, and a short excerpt. If the answer spans multiple sources, list them.

3. SURFACE PATTERNS when I ask open questions ("how have I been thinking about X lately?", "what did I decide about Y?"). Pull the relevant excerpts and let me draw the conclusion — don't over-summarize.

4. TRACK LOOSE ENDS — commitments I made, people I said I'd follow up with, ideas I wrote down and never revisited. Flag these weekly.

5. RESPECT PRIVACY. This is my second brain. Never send contents to external tools without asking. No summaries posted anywhere. Local-first.

Rules:
- Don't invent or infer. If it's not in my notes, say "not in the KB."
- Prefer direct quotes over paraphrases.
- When I ask about a person, pull every note mentioning them, chronologically.
- When I ask about a decision, show me what I was thinking at the time, not just the outcome.

Start by asking what I want to load first.`,
  },
  {
    id: 4,
    date: { month: 'APR', day: '20', year: '2026' },
    title: 'Calendar, Meal Plans & Family Ops',
    subtitle: 'Turn Your Agent Into Your Household Manager',
    type: 'WORKSHOP',
    color: 'cyan',
    location: 'Denver Tech Center',
    time: '6:30 PM – 9:00 PM',
    spots: 25,
    tags: ['Calendar', 'Family', 'Productivity'],
    desc: 'Manage your calendar by chat, build a weekly meal plan in Notion, get a morning brief with weather and your schedule, and set up reminders for the whole family. One member saves an hour a week just on meal planning. Beginners welcome.',
    featured: false,
  },
]

const SESSION_ANATOMY = [
  { time: '6:30', label: 'Doors Open', desc: 'Show up, grab a seat, get your laptop set up. Organizers can help with any setup issues.' },
  { time: '6:45', label: 'Quick Intro', desc: '10-minute overview of the night\'s topic and what you\'ll walk away with.' },
  { time: '7:00', label: 'Hands-On Build', desc: 'The main session — follow along step by step or go at your own pace. Helpers float the room.' },
  { time: '8:00', label: 'Show & Tell', desc: 'Volunteers share what they built. Ask questions, get feedback, steal ideas.' },
  { time: '8:30', label: 'Open Build', desc: 'Stay and keep working. Get 1-on-1 help or start applying what you learned to your own project.' },
  { time: '9:00', label: 'Wrap Up', desc: 'Quick recap, next week\'s topic preview, and networking.' },
]

const typeColors = {
  WORKSHOP: 'cyan',
  'BUILD SESSION': 'magenta',
  'DEMO NIGHT': 'green',
  HACKATHON: 'cyan',
}

export default function Events() {
  const [rsvpEvent, setRsvpEvent] = useState(null)
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '', guests: '' })
  const [rsvpStatus, setRsvpStatus] = useState('idle') // idle | loading | success | error
  const [rsvpError, setRsvpError] = useState('')

  // Suggest event state
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [suggestForm, setSuggestForm] = useState({ name: '', email: '', title: '', description: '' })
  const [suggestStatus, setSuggestStatus] = useState('idle')
  const [suggestError, setSuggestError] = useState('')

  // Upvote state
  const [upvoted, setUpvoted] = useState({})

  // Prompt copy state
  const [copiedId, setCopiedId] = useState(null)

  const copyPrompt = async (ev) => {
    try {
      await navigator.clipboard.writeText(ev.prompt)
      setCopiedId(ev.id)
      setTimeout(() => setCopiedId(c => (c === ev.id ? null : c)), 2000)
    } catch {}
  }

  const openSuggest = () => {
    setSuggestForm({ name: '', email: '', title: '', description: '' })
    setSuggestStatus('idle')
    setSuggestError('')
    setSuggestOpen(true)
  }

  const closeSuggest = () => {
    setSuggestOpen(false)
    setSuggestStatus('idle')
  }

  const handleSuggest = async (e) => {
    e.preventDefault()
    if (!suggestForm.name || !suggestForm.title) return
    setSuggestStatus('loading')
    setSuggestError('')
    try {
      await submitSuggestion(suggestForm)
      setSuggestStatus('success')
    } catch (err) {
      setSuggestError(err.message || 'Something went wrong. Please try again.')
      setSuggestStatus('error')
    }
  }

  const handleUpvote = async (ev) => {
    if (upvoted[ev.id]) return
    setUpvoted(prev => ({ ...prev, [ev.id]: true }))
    try {
      await submitUpvote({ event: ev.title })
    } catch {
      setUpvoted(prev => ({ ...prev, [ev.id]: false }))
    }
  }

  const openRsvp = (ev) => {
    setRsvpEvent(ev)
    setRsvpForm({ name: '', email: '', guests: '' })
    setRsvpStatus('idle')
    setRsvpError('')
  }

  const closeRsvp = () => {
    setRsvpEvent(null)
    setRsvpStatus('idle')
  }

  const handleRsvp = async (e) => {
    e.preventDefault()
    if (!rsvpForm.name || !rsvpForm.email) return
    setRsvpStatus('loading')
    setRsvpError('')
    try {
      const eventDate = `${rsvpEvent.date.month} ${rsvpEvent.date.day}, ${rsvpEvent.date.year}`
      await submitRsvp({ name: rsvpForm.name, email: rsvpForm.email, event: rsvpEvent.title, eventDate, guests: rsvpForm.guests })
      setRsvpStatus('success')
    } catch (err) {
      setRsvpError(err.message || 'Something went wrong. Please try again.')
      setRsvpStatus('error')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      {/* ── PAGE HEADER ── */}
      <section className={styles.pageHeader}>
        <div className="section-wrapper">
          <span className={styles.eyebrow}>WEEKLY SESSIONS</span>
          <h1 className={styles.pageTitle}>
            THE CALENDAR<br />
            <span className="neon-cyan">THAT BUILDS THINGS</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Every week. Different format. Same guarantee: you leave with something working.
          </p>
          <button className={styles.suggestBtn} onClick={openSuggest}>
            SUGGEST AN EVENT <span>→</span>
          </button>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className={styles.events}>
        <div className="section-wrapper">
          <div className={styles.eventsGrid}>
            {UPCOMING_EVENTS.map((ev, i) => (
              <div
                key={ev.id}
                className={`${styles.eventCard} ${ev.featured ? styles.eventFeatured : ''} ${styles[`border_${ev.color}`]}`}
              >
                {ev.featured && (
                  <div className={styles.featuredBadge}>◈ NEXT UP</div>
                )}

                <div className={styles.eventMeta}>
                  <div className={styles.eventDate}>
                    <span className={styles.dateMonth}>{ev.date.month}</span>
                    <span className={styles.dateDay}>{ev.date.day}</span>
                    <span className={styles.dateYear}>{ev.date.year}</span>
                  </div>

                  <div className={styles.eventInfo}>
                    <div className={styles.eventTop}>
                      <span className={`${styles.eventType} ${styles[`type_${typeColors[ev.type]}`]}`}>
                        {ev.type}
                      </span>
                      <span className={styles.eventSpots}>{ev.spots} SPOTS</span>
                    </div>

                    <h2 className={styles.eventTitle}>{ev.title}</h2>
                    <p className={styles.eventSubtitle}>{ev.subtitle}</p>
                    <p className={styles.eventDesc}>{ev.desc}</p>

                    <div className={styles.eventDetails}>
                      <span className={styles.eventDetail}>
                        <span className={styles.detailIcon}>◈</span>
                        {ev.location}
                      </span>
                      <span className={styles.eventDetail}>
                        <span className={styles.detailIcon}>◷</span>
                        {ev.time}
                      </span>
                    </div>

                    <div className={styles.eventTags}>
                      {ev.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>

                    {ev.prompt && (
                      <details className={styles.promptBlock}>
                        <summary className={styles.promptSummary}>
                          <span className={styles.promptCaret}>▸</span>
                          EXAMPLE PROMPT
                        </summary>
                        <div className={styles.promptBody}>
                          <pre className={styles.promptText}>{ev.prompt}</pre>
                          <button
                            type="button"
                            className={styles.promptCopy}
                            onClick={() => copyPrompt(ev)}
                          >
                            {copiedId === ev.id ? '✓ COPIED' : '⧉ COPY PROMPT'}
                          </button>
                        </div>
                      </details>
                    )}

                    <div className={styles.eventActions}>
                      {ev.link ? (
                        <Link to={ev.link} className={`${styles.rsvpBtn} ${styles[`rsvp_${ev.color}`]}`}>
                          GET STARTED <span>→</span>
                        </Link>
                      ) : (
                        <button
                          className={`${styles.rsvpBtn} ${styles[`rsvp_${ev.color}`]}`}
                          onClick={() => openRsvp(ev)}
                        >
                          RSVP <span>→</span>
                        </button>
                      )}
                      <button
                        className={`${styles.upvoteBtn} ${upvoted[ev.id] ? styles.upvoted : ''}`}
                        onClick={() => handleUpvote(ev)}
                        disabled={upvoted[ev.id]}
                      >
                        {upvoted[ev.id] ? '▲ UPVOTED' : '▲ UPVOTE'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANATOMY OF A SESSION ── */}
      <section className={styles.anatomySection}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>WHAT TO EXPECT</span>
          <h2 className={styles.sectionTitle}>
            ANATOMY OF A<br />
            <span className="neon-magenta">TYPICAL SESSION</span>
          </h2>

          <div className={styles.timeline}>
            {SESSION_ANATOMY.map(({ time, label, desc }, i) => (
              <div key={time} className={styles.timelineItem}>
                <div className={styles.timelineTime}>{time}</div>
                <div className={styles.timelineDot}>
                  <div className={styles.timelineLine} />
                </div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineLabel}>{label}</h3>
                  <p className={styles.timelineDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.faq}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>COMMON QUESTIONS</span>
          <h2 className={styles.sectionTitle}>
            THINGS PEOPLE<br />
            <span className="neon-green">WONDER ABOUT</span>
          </h2>

          <div className={styles.faqGrid}>
            {[
              {
                q: 'Do I need to know how to code?',
                a: 'No. Many of our members have zero coding background. Sessions are designed so anyone can follow along. If you can use a browser, you can build with AI.'
              },
              {
                q: 'What should I bring?',
                a: 'A laptop with a browser. Some sessions use specific tools — we\'ll include setup instructions in the event details so you can come prepared.'
              },
              {
                q: 'Is it free?',
                a: 'Yes. Every session is free. No upsells, no paid tiers. We\'re a community club, not a business.'
              },
              {
                q: 'What AI tools do you use?',
                a: 'Mostly Claude, ChatGPT, and open-source tools. We teach the thinking behind AI workflows, not just one platform. Use whatever works for you.'
              },
              {
                q: 'How often do you meet?',
                a: 'Every Monday evening in Denver. Check this page for the latest schedule and topics.'
              },
              {
                q: 'Can I present or demo something?',
                a: 'Absolutely. Demo Night is open to all members. Just let us know at the event or reach out ahead of time. We love seeing what people build.'
              },
            ].map(({ q, a }) => (
              <div key={q} className={styles.faqCard}>
                <h4 className={styles.faqQ}>{q}</h4>
                <p className={styles.faqA}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP MODAL ── */}
      {rsvpEvent && (
        <div className={styles.modalOverlay} onClick={closeRsvp}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeRsvp}>✕</button>

            {rsvpStatus === 'success' ? (
              <div className={styles.modalSuccess}>
                <div className={styles.modalSuccessIcon}>◈</div>
                <h3 className={styles.modalSuccessTitle}>YOU'RE IN</h3>
                <p className={styles.modalSuccessEvent}>{rsvpEvent.title}</p>
                <p className={styles.modalSuccessDate}>
                  {rsvpEvent.date.month} {rsvpEvent.date.day}, {rsvpEvent.date.year} · {rsvpEvent.time}
                </p>
                <p className={styles.modalSuccessNote}>See you at {rsvpEvent.location}.</p>
                <button className={styles.modalDoneBtn} onClick={closeRsvp}>DONE</button>
              </div>
            ) : (
              <>
                <span className={styles.modalEyebrow}>RSVP</span>
                <h3 className={styles.modalTitle}>{rsvpEvent.title}</h3>
                <p className={styles.modalDate}>
                  {rsvpEvent.date.month} {rsvpEvent.date.day}, {rsvpEvent.date.year} · {rsvpEvent.time}
                </p>

                <form onSubmit={handleRsvp} className={styles.modalForm}>
                  <div className={styles.modalField}>
                    <label className={styles.modalLabel}>NAME *</label>
                    <input
                      className={styles.modalInput}
                      type="text"
                      placeholder="Your name"
                      value={rsvpForm.name}
                      onChange={e => setRsvpForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className={styles.modalField}>
                    <label className={styles.modalLabel}>EMAIL *</label>
                    <input
                      className={styles.modalInput}
                      type="email"
                      placeholder="you@example.com"
                      value={rsvpForm.email}
                      onChange={e => setRsvpForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className={styles.modalField}>
                    <label className={styles.modalLabel}>BRINGING GUESTS? (OPTIONAL)</label>
                    <textarea
                      className={`${styles.modalInput} ${styles.modalTextarea}`}
                      placeholder="One name per line"
                      value={rsvpForm.guests}
                      onChange={e => setRsvpForm(f => ({ ...f, guests: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {rsvpStatus === 'error' && (
                    <div className={styles.modalError}>⚠ {rsvpError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={rsvpStatus === 'loading'}
                    className={styles.modalSubmit}
                  >
                    {rsvpStatus === 'loading' ? 'SUBMITTING...' : 'CONFIRM RSVP →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      {/* ── SUGGEST EVENT MODAL ── */}
      {suggestOpen && (
        <div className={styles.modalOverlay} onClick={closeSuggest}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeSuggest}>✕</button>

            {suggestStatus === 'success' ? (
              <div className={styles.modalSuccess}>
                <div className={styles.modalSuccessIcon}>◈</div>
                <h3 className={styles.modalSuccessTitle}>SUGGESTION SUBMITTED</h3>
                <p className={styles.modalSuccessNote}>Thanks! We'll review it and add it to the calendar if there's enough interest.</p>
                <button className={styles.modalDoneBtn} onClick={closeSuggest}>DONE</button>
              </div>
            ) : (
              <>
                <span className={styles.modalEyebrow}>SUGGEST AN EVENT</span>
                <h3 className={styles.modalTitle}>What Should We Build Next?</h3>
                <p className={styles.modalDate}>Tell us what OpenClaw topic you want to explore.</p>

                <form onSubmit={handleSuggest} className={styles.modalForm}>
                  <div className={styles.modalField}>
                    <label className={styles.modalLabel}>YOUR NAME *</label>
                    <input
                      className={styles.modalInput}
                      type="text"
                      placeholder="Your name"
                      value={suggestForm.name}
                      onChange={e => setSuggestForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className={styles.modalField}>
                    <label className={styles.modalLabel}>EMAIL (OPTIONAL)</label>
                    <input
                      className={styles.modalInput}
                      type="email"
                      placeholder="you@example.com"
                      value={suggestForm.email}
                      onChange={e => setSuggestForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div className={styles.modalField}>
                    <label className={styles.modalLabel}>EVENT TITLE *</label>
                    <input
                      className={styles.modalInput}
                      type="text"
                      placeholder="e.g. Automate My Side Hustle"
                      value={suggestForm.title}
                      onChange={e => setSuggestForm(f => ({ ...f, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className={styles.modalField}>
                    <label className={styles.modalLabel}>DESCRIPTION (OPTIONAL)</label>
                    <textarea
                      className={`${styles.modalInput} ${styles.modalTextarea}`}
                      placeholder="What would this session cover? What would people build or learn?"
                      value={suggestForm.description}
                      onChange={e => setSuggestForm(f => ({ ...f, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {suggestStatus === 'error' && (
                    <div className={styles.modalError}>⚠ {suggestError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={suggestStatus === 'loading'}
                    className={styles.modalSubmit}
                  >
                    {suggestStatus === 'loading' ? 'SUBMITTING...' : 'SUBMIT SUGGESTION →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
