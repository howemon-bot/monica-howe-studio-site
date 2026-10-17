import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/brand/MonicaHowe_logo.svg';
import { EMAIL, INSTAGRAM, LINKEDIN } from './Contact';
import './Header.css';

const base = import.meta.env.BASE_URL;

const SIDE_LINKS = [
  { label: 'WORK', href: `${base}#work` },
  { label: 'ABOUT', href: `${base}#about` },
  { label: 'CONTACT', href: `${base}#contact` },
];

const MENU_LINKS = [
  { label: 'Work', href: `${base}#work` },
  { label: 'About', href: `${base}#about` },
  { label: 'Clients', href: `${base}#clients` },
  { label: 'Contact', href: `${base}#contact` },
];

const CONTACT_HREF = `${base}#contact`;

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Close the menu whenever the page or section changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // While open: lock page scroll, close on Escape, and move focus into the menu.
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);

    const toggle = toggleRef.current;
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const menuLinks = isHome ? MENU_LINKS : [{ label: 'Home', href: base }, ...MENU_LINKS];

  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link to="/" className="site-header__logo" aria-label="Monica Howe studio — home">
          <img src={logo} alt="Monica Howe studio" className="site-header__logo-img" />
        </Link>

        <div className="site-header__mobile-actions">
          <a href={CONTACT_HREF} className="site-header__contact">
            Contact
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="site-header__toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="site-header__toggle-line" />
            <span className="site-header__toggle-line" />
          </button>
        </div>
      </div>

      {isHome ? (
        <nav className="site-header__side" aria-label="Primary">
          {SIDE_LINKS.map((l, i) => (
            <span key={l.label} className="site-header__side-item">
              {i > 0 && <span className="site-header__side-rule" aria-hidden="true" />}
              <a href={l.href}>{l.label}</a>
            </span>
          ))}
        </nav>
      ) : (
        <Link to="/" className="site-header__side site-header__home-side">
          HOME
        </Link>
      )}

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="wrap mobile-menu__top">
          <Link
            to="/"
            className="mobile-menu__logo"
            aria-label="Monica Howe studio — home"
            onClick={closeMenu}
          >
            <span
              className="mobile-menu__logo-img"
              style={{ maskImage: `url(${logo})`, WebkitMaskImage: `url(${logo})` }}
            />
          </Link>
          <div className="site-header__mobile-actions">
            <a href={CONTACT_HREF} className="mobile-menu__contact" onClick={closeMenu}>
              Contact
            </a>
            <button
              ref={closeRef}
              type="button"
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <span className="mobile-menu__close-line" />
              <span className="mobile-menu__close-line" />
            </button>
          </div>
        </div>

        <div className="wrap mobile-menu__body">
          <nav aria-label="Menu">
            <ul className="mobile-menu__links">
              {menuLinks.map((l, i) => (
                <li key={l.label} style={{ '--i': i } as React.CSSProperties}>
                  <a href={l.href} onClick={closeMenu}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__foot">
            <a href={`mailto:${EMAIL}`} className="mobile-menu__email">
              {EMAIL}
            </a>
            <div className="mobile-menu__social">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M8 10.5V16.5M8 7.6V7.7M11.5 16.5V10.5M11.5 13.2C11.5 11.6 12.6 10.4 14.1 10.4C15.6 10.4 16.5 11.4 16.5 13.1V16.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
