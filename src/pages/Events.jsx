import styles from './Events.module.css'
import { Link } from 'react-router-dom'

const UPCOMING_EVENTS = [
  {
    id: 1,
    date: { month: 'APR', day: '08', year: '2025' },
    title: 'Inbox Zero in 60 Minutes',
    subtitle: 'AI-Powered Email Triage & Auto-Reply Systems',
    type: 'WORKSHOP',
    color: 'cyan',
    location: 'Denver Tech Center',
    time: '6:30 PM – 9:00 PM',
    spots: 12,
    tags: ['Email', 'Automation', 'Productivity'],
    desc: 'We\'ll build a live AI email triage system — categorizing, drafting replies, and scheduling follow-ups. Bring your inbox chaos. Leave with order.',
    featured: true,
  },
  {
    id: 2,
    date: { month: 'APR', day: '15', year: '2025' },
    title: 'AI Scheduling Agents',
    subtitle: 'Never Touch a Calendar App Again',
    type: 'BUILD SESSION',
    color: 'magenta',
    location: 'Boulder Commons',
    time: '6:00 PM – 8:30 PM',
    spots: 18,
    tags: ['Scheduling', 'Agents', 'Calendar'],
    desc: 'End-to-end AI scheduling: parsing availability, drafting calendar invites, handling cancellations. We\'ll build it live, together.',
    featured: false,
  },
  {
    id: 3,
    date: { month: 'APR', day: '22', year: '2025' },
    title: 'Content Pipeline Automation',
    subtitle: 'From Idea to Published in Under 10 Minutes',
    type: 'DEMO NIGHT',
    color: 'green',
    location: 'Denver Tech Center',
    time: '6:30 PM – 9:00 PM',
    spots: 24,
    tags: ['Content', 'Writing', 'Social Media'],
    desc: 'Members demo their best AI content workflows. Vote on the most impressive. Steal each other\'s ideas. That\'s the whole point.',
    featured: false,
  },
  {
    id: 4,
    date: { month: 'APR', day: '29', year: '2025' },
    title: 'Agent Collab Night',
    subtitle: 'Team Builds: Multi-Agent Workflow Jam',
    type: 'HACKATHON',
    color: 'cyan',
    location: 'TBD (Announced Week-Of)',
    time: '5:00 PM – 10:00 PM',
    spots: 30,
    tags: ['Agents', 'Teamwork', 'Competition'],
    desc: 'Teams of 3-4 compete to build the most impressive multi-agent workflow in 3 hours. Winners get bragging rights and a permanent spot in club lore.',
    featured: false,
  },
]

const SESSION_ANATOMY = [
  { time: '6:30', label: 'Doors Open', desc: 'Arrive, set up, grab a coffee. Organizers available for questions.' },
  { time: '6:45', label: 'Lightning Demo', desc: '15-minute live demonstration of a working AI tool or workflow.' },
  { time: '7:00', label: 'Main Build', desc: 'The core session — collaborative hands-on building. Laptops out.' },
  { time: '8:15', label: 'Show & Tell', desc: 'Members share what they built or improved during the session.' },
  { time: '8:45', label: 'Open Lab', desc: 'Free build time. Work on your own project with group support.' },
  { time: '9:00', label: 'Wrap', desc: 'Recap, next event preview, and one mandatory "what I\'m taking home" per person.' },
]

const typeColors = {
  WORKSHOP: 'cyan',
  'BUILD SESSION': 'magenta',
  'DEMO NIGHT': 'green',
  HACKATHON: 'cyan',
}

export default function Events() {
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

                    <Link to="/join" className={`${styles.rsvpBtn} ${styles[`rsvp_${ev.color}`]}`}>
                      RSVP <span>→</span>
                    </Link>
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
                q: 'Do I need to be technical?',
                a: 'No. We have engineers, executives, solopreneurs, and absolute beginners. The group helps everyone learn — that\'s the culture we enforce.'
              },
              {
                q: 'What should I bring?',
                a: 'A laptop, something you\'ve been meaning to automate for the last 6 months, and an open mind. That\'s the full list.'
              },
              {
                q: 'Is it free?',
                a: 'Yes. Always. We may do optional paid workshops for specific deep-dives, but the core weekly meetup costs nothing.'
              },
              {
                q: 'What AI tools do you use?',
                a: 'We\'re tool-agnostic. Claude, GPT, Gemini, open-source — whatever works for the task. We teach principles, not platforms.'
              },
              {
                q: 'How often do you meet?',
                a: 'Weekly. Every Tuesday or Wednesday (rotates). We take one week off per quarter, and always give ≥7 days notice.'
              },
              {
                q: 'Can I present or demo something?',
                a: 'Please do. Reach out at the event or email us. The best sessions are the ones where members run the show.'
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
    </div>
  )
}
