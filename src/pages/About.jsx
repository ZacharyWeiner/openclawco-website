import styles from './About.module.css'
import { Link } from 'react-router-dom'

const PRINCIPLES = [
  {
    num: '01',
    color: 'cyan',
    title: 'Ship, Don\'t Theorize',
    body: 'We don\'t talk about AI. We run AI. Every session ends with attendees having built, automated, or improved something real.',
  },
  {
    num: '02',
    color: 'magenta',
    title: 'No Hierarchy of Knowledge',
    body: 'A founder who can\'t code and a developer who never shipped a product both belong here. Everyone brings something. Everyone takes something.',
  },
  {
    num: '03',
    color: 'green',
    title: 'Open by Default',
    body: 'We share workflows, templates, prompts, and lessons openly. Hoarding knowledge is for people scared of competition. We\'re not.',
  },
  {
    num: '04',
    color: 'cyan',
    title: 'Respect the Reality Check',
    body: 'We celebrate what works and call out what doesn\'t. Hype belongs on LinkedIn. Honest assessments belong here.',
  },
]

const DIFF_POINTS = [
  { label: 'Typical Meetup', val: 'Slides + Q&A' },
  { label: 'OpenClaw', val: 'Live builds + outcomes' },
  { label: 'Typical Meetup', val: 'Speaker-driven' },
  { label: 'OpenClaw', val: 'Community-driven' },
  { label: 'Typical Meetup', val: '"AI is amazing"' },
  { label: 'OpenClaw', val: '"Here\'s the actual workflow"' },
  { label: 'Typical Meetup', val: 'Passive listening' },
  { label: 'OpenClaw', val: 'Hands-on participation' },
]

export default function About() {
  return (
    <div className={styles.page}>
      {/* BG */}
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      {/* ── PAGE HEADER ── */}
      <section className={styles.pageHeader}>
        <div className="section-wrapper">
          <span className={styles.eyebrow}>WHO WE ARE</span>
          <h1 className={styles.pageTitle}>
            NOT A FAN CLUB.<br />
            <span className="neon-cyan">A BUILD CLUB.</span>
          </h1>
          <p className={styles.pageSubtitle}>
            OpenClaw exists because too many AI meetups are content to pat each other on the back
            while the real work never gets done. We fixed that.
          </p>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className={styles.manifesto}>
        <div className="section-wrapper">
          <div className={styles.manifestoBox}>
            <div className={styles.manifestoCornerTL} />
            <div className={styles.manifestoCornerBR} />
            <span className={styles.manifestoLabel}>// MANIFESTO</span>
            <blockquote className={styles.manifestoQuote}>
              "Most AI meetups are therapy sessions disguised as tech talks.
              Founders vent, developers posture, and everyone leaves with the same
              vague sense that 'AI is going to change everything' — and zero new capability.
              OpenClaw is different. We come with a problem. We leave with a solution.
              Every time."
            </blockquote>
            <cite className={styles.manifestoCite}>— The OpenClaw Charter</cite>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className={styles.principles}>
        <div className="section-wrapper">
          <span className={styles.sectionEyebrow}>OUR PRINCIPLES</span>
          <h2 className={styles.sectionTitle}>
            HOW WE <span className="neon-magenta">OPERATE</span>
          </h2>

          <div className={styles.principlesGrid}>
            {PRINCIPLES.map(({ num, color, title, body }) => (
              <div key={num} className={`${styles.principleCard} ${styles[`card_${color}`]}`}>
                <div className={styles.principleNum}>{num}</div>
                <h3 className={styles.principleTitle}>{title}</h3>
                <p className={styles.principleBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className={styles.diffSection}>
        <div className="section-wrapper">
          <div className={styles.diffGrid}>
            <div className={styles.diffLeft}>
              <span className={styles.sectionEyebrow}>THE DIFFERENCE</span>
              <h2 className={styles.sectionTitle}>
                WE MEASURE IN<br />
                <span className="neon-green">OUTCOMES</span>
              </h2>
              <p className={styles.diffCopy}>
                The bar isn't "did you enjoy the session." It's "what are you doing differently Monday morning."
                If you came, participated, and didn't leave with at least one concrete improvement to your workflow,
                we failed. And we hate failing.
              </p>
            </div>
            <div className={styles.diffRight}>
              <div className={styles.compareTable}>
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className={styles.compareRow}>
                    <div className={styles.compareTypical}>
                      <span className={styles.compareLabel}>OTHERS</span>
                      <span className={styles.compareVal}>{DIFF_POINTS[i * 2].val}</span>
                    </div>
                    <div className={styles.compareVs}>VS</div>
                    <div className={styles.compareUs}>
                      <span className={styles.compareLabel}>OPENCLAW</span>
                      <span className={`${styles.compareVal} ${styles.compareUsVal}`}>{DIFF_POINTS[i * 2 + 1].val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM / ORIGIN ── */}
      <section className={styles.origin}>
        <div className="section-wrapper">
          <div className={styles.originCard}>
            <span className={styles.sectionEyebrow}>OUR STORY</span>
            <h2 className={styles.originTitle}>
              STARTED IN COLORADO.<br />
              <span className="neon-cyan">BUILT FOR DOERS.</span>
            </h2>
            <p className={styles.originCopy}>
              OpenClaw Colorado Club was born out of frustration. Too many smart people were
              sitting in meetups, nodding at slides about AI's potential, then driving home
              having accomplished exactly nothing.
            </p>
            <p className={styles.originCopy}>
              We started small — a handful of builders who wanted to actually automate something
              in the time it takes to drink a coffee. What started as an informal workshop grew
              into Colorado's most hands-on AI community.
            </p>
            <p className={styles.originCopy}>
              We're not affiliated with any company. We don't sell anything. We just think
              AI is too powerful to waste on conference talks, and Colorado is too full of
              creative people to leave them on the sidelines.
            </p>
            <Link to="/join" className={styles.originCta}>
              JOIN THE MOVEMENT <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
