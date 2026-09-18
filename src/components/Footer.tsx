import ArrowIcon from './ArrowIcon';
import './Footer.css';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <hr className="hairline" />
      <div className="wrap site-footer__row">
        <span className="site-footer__copy">© {new Date().getFullYear()} Monica Howe</span>
        <button type="button" onClick={scrollToTop} className="site-footer__top">
          Back to top
          <span className="site-footer__top-arrow" aria-hidden="true">
            <ArrowIcon direction="up" size={15} strokeWidth={1.35} />
          </span>
        </button>
      </div>
    </footer>
  );
}
