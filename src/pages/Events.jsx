import { useState } from 'react'
import styles from './Events.module.css'
import { Link } from 'react-router-dom'
import { submitRsvp } from '../lib/submitRsvp'

const UPCOMING_EVENTS = [
  {
    id: 1,
    date: { month: 'APR', day: '01', year: '2026' },
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
    date: { month: 'APR', day: '08', year: '2026' },
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
  },
  {
    id: 3,
    date: { month: 'APR', day: '15', year: '2026' },
    title: 'Smart Home Night',
    subtitle: 'Give Your Agent Eyes and Ears Around the House',
    type: 'BUILD SESSION',
    color: 'green',
    location: 'Denver Tech Center',
    time: '6:30 PM – 9:00 PM',
    spots: 20,
    tags: ['Smart Home', 'Home Assistant', 'Alexa'],
    desc: 'Connect OpenClaw to your smart home — Home Assistant, Alexa, HomePods, whatever you\'ve got. One member\'s agent discovered HomePods on the network and built its own control skill. We\'ll help you set up lights, locks, routines, and more.',
    featured: false,
  },
  {
    id: 4,
    date: { month: 'APR', day: '22', year: '2026' },
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
                a: 'Every Wednesday evening in Denver. Check this page for the latest schedule and topics.'
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
    </div>
  )
}
