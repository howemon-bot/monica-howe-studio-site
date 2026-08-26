import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const base = import.meta.env.BASE_URL;

const SIDE_LINKS = [
  { label: 'WORK', href: `${base}#work` },
  { label: 'ABOUT', href: `${base}#about` },
  { label: 'PACKAGES', href: `${base}#packages` },
  { label: "LET'S TALK", href: `${base}#contact` },
];

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link to="/" className="site-header__logo" aria-label="Monica Howe studio — home">
          <span className="site-header__logo-studio" aria-hidden="true">
            studio
          </span>
          <span className="site-header__logo-name">
            <span>monica</span>
            <span>howe</span>
          </span>
        </Link>

        {!isHome && (
          <Link to="/" className="site-header__home-link">
            Home
          </Link>
        )}
      </div>

      {isHome && (
        <nav className="site-header__side" aria-label="Primary">
          {SIDE_LINKS.map((l, i) => (
            <span key={l.label} className="site-header__side-item">
              {i > 0 && <span className="site-header__side-rule" aria-hidden="true" />}
              <a href={l.href}>{l.label}</a>
            </span>
          ))}
        </nav>
      )}
    </header>
  );
}
