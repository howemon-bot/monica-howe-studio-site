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
        <div className="site-footer__group">
          <button type="button" onClick={scrollToTop} className="site-footer__top link-arrow">
            Back to top
            <span className="arrow">
              <ArrowIcon size={12} rotate={-45} />
            </span>
          </button>
          <span className="site-footer__copy">© {new Date().getFullYear()} Monica Howe</span>
        </div>
      </div>
    </footer>
  );
}
