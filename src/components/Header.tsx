import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/brand/MonicaHowe_logo.svg';
import Magnetic from '../motion/Magnetic';
import './Header.css';

const base = import.meta.env.BASE_URL;

const SIDE_LINKS = [
  { label: 'WORK', href: `${base}#work` },
  { label: 'ABOUT', href: `${base}#about` },
  { label: 'CONTACT', href: `${base}#contact` },
];

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link to="/" className="site-header__logo" aria-label="Monica Howe studio — home">
          <img src={logo} alt="Monica Howe studio" className="site-header__logo-img" />
        </Link>

        {!isHome && (
          <Link to="/" className="site-header__home-mobile">
            Home
          </Link>
        )}
      </div>

      {isHome ? (
        <nav className="site-header__side" aria-label="Primary">
          {SIDE_LINKS.map((l, i) => (
            <span key={l.label} className="site-header__side-item">
              {i > 0 && <span className="site-header__side-rule" aria-hidden="true" />}
              <Magnetic radius={40} strength={0.2}>
                <a href={l.href}>{l.label}</a>
              </Magnetic>
            </span>
          ))}
        </nav>
      ) : (
        <Link to="/" className="site-header__side site-header__home-side">
          HOME
        </Link>
      )}
    </header>
  );
}
