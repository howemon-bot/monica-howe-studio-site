import ArrowIcon from './ArrowIcon';

const EMAIL = 'hola@monicahowe.studio';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <p className="eyebrow contact__eyebrow">Contact</p>

        <a href={`mailto:${EMAIL}`} className="contact__headline link-arrow">
          <span>
            Let&rsquo;s design something <span className="accent-italic">that lasts</span>. Say
            hi.
          </span>
          <span className="arrow contact__headline-arrow">
            <ArrowIcon size={48} />
          </span>
        </a>

        <ul className="contact__links">
          <li>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
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

        <div className="contact__rule" aria-hidden="true" />
      </div>
    </section>
  );
}
