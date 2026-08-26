import './Footer.css';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <hr className="hairline" />
      <div className="wrap site-footer__row">
        <span>© {new Date().getFullYear()} Monica Howe</span>
        <button type="button" onClick={scrollToTop} className="site-footer__top link-arrow">
          Back to top <span className="arrow">↑</span>
        </button>
      </div>
    </footer>
  );
}
