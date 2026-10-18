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
              'I’m an art director and visual designer based in Barcelona, working internationally.',
            ]}
          />
          <p className="about__bio">
            After 20 years in design, I take on a few projects at a time and lead each one
            myself. My clients range from global organisations to one-person brands. What they
            share is a belief that craft matters as much as how something looks.
          </p>
          <a href={`mailto:${EMAIL}`} className="about__cta">
            Let&rsquo;s talk
          </a>
        </div>
      </div>
    </section>
  );
}
