export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <p className="eyebrow contact__eyebrow">Contact</p>

        <a href="mailto:monicahowe@studio.com" className="contact__headline link-arrow">
          <span>
            Let&rsquo;s design something <span className="accent-italic">that lasts</span>. Say
            hi.
          </span>
          <span className="arrow contact__headline-arrow" aria-hidden="true">
            ↗
          </span>
        </a>

        <ul className="contact__links">
          <li>
            <a href="mailto:monicahowe@studio.com">monicahowe@studio.com</a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
