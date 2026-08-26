import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#work' },
  { label: 'Packages', href: '/#packages' },
];

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link to="/" className="site-header__logo" aria-label="Monica Howe — home">
          <span className="site-header__logo-line">monica</span>
          <span className="site-header__logo-line site-header__logo-line--accent">howe</span>
        </Link>

        {isHome ? (
          <nav className="site-header__nav" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        ) : (
          <Link to="/" className="site-header__home-link">
            Home
          </Link>
        )}
      </div>

      {isHome && (
        <div className="site-header__ticker" aria-hidden="true">
          <span>WORK</span>
          <span className="dot" />
          <span>ABOUT</span>
          <span className="dot" />
          <span>PACKAGES</span>
          <span className="dot" />
        </div>
      )}
    </header>
  );
}
