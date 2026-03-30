import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.scanline} />
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.logoOpen}>OPEN</span>
            <span className={styles.logoClaw}>CLAW</span>
            <span className={styles.logoCo}>CO</span>
          </span>
          <p className={styles.tagline}>The meetup group that actually does something.</p>
          <p className={styles.location}>◈ Colorado, USA · openclawco.club</p>
        </div>

        <div className={styles.links}>
          <h4 className={styles.linksHeading}>NAVIGATE</h4>
          <nav className={styles.linkList}>
            {[
              ['/', 'Home'],
              ['/about', 'About'],
              ['/events', 'Events'],
              ['/products', 'Products'],
              ['/members', 'Members'],
              ['/join', 'Join'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className={styles.footerLink}>{label}</Link>
            ))}
          </nav>
        </div>

        <div className={styles.connect}>
          <h4 className={styles.linksHeading}>CONNECT</h4>
          <div className={styles.socialLinks}>
            <a href="https://meetup.com" target="_blank" rel="noreferrer" className={styles.socialLink}>Meetup</a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className={styles.socialLink}>Discord</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialLink}>Twitter / X</a>
            <a href="mailto:hello@openclawco.club" className={styles.socialLink}>Email Us</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>© 2025 OpenClaw Colorado Club. Built with AI. Run by humans. Barely.</span>
        <div className={styles.status}>
          <span className={styles.dot} />
          <span>SYSTEMS ONLINE</span>
        </div>
      </div>
    </footer>
  )
}
