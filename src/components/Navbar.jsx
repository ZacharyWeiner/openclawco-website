import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/',        label: 'HOME' },
  { to: '/about',   label: 'ABOUT' },
  { to: '/events',  label: 'EVENTS' },
  { to: '/install', label: 'INSTALL' },
  { to: '/products',label: 'PRODUCTS' },
  { to: '/members', label: 'MEMBERS' },
  { to: '/join',    label: 'JOIN', cta: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>
            <span className={styles.logoOpen}>OPEN</span>
            <span className={styles.logoClaw}>CLAW</span>
          </span>
          <span className={styles.logoCo}>CO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ to, label, cta }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.link} ${cta ? styles.ctaLink : ''} ${isActive ? styles.active : ''}`
              }
            >
              {label}
              <span className={styles.linkUnderline} />
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {NAV_LINKS.map(({ to, label, cta }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.mobileLink} ${cta ? styles.mobileCta : ''} ${isActive ? styles.mobileActive : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
