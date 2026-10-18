import RevealText from '../motion/RevealText';
import { EMAIL } from './Contact';
import '../motion/Reveal.css';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about wrap">
      <div className="about__grid">
        <p className="eyebrow about__eyebrow">Hello</p>
        <div className="about__copy">
          <RevealText
            as="h2"
            className="about__heading"
            lines={[
              "I'm an art director and visual designer. Based in Barcelona, working internationally.",
            ]}
          />
          <p className="about__bio">
            I work with a small number of clients at a time — individuals and brands, across
            borders and industries. What connects them isn&rsquo;t sector or size, it&rsquo;s
            pace: they&rsquo;re playing a long game, not chasing a quarter. A few things I care
            about, always: <strong>built to last, only what&rsquo;s needed.</strong>
          </p>
          <a href={`mailto:${EMAIL}`} className="about__cta">
            Let&rsquo;s talk
          </a>
        </div>
      </div>
    </section>
  );
}
