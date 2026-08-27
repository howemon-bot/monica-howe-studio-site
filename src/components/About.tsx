import RevealText from '../motion/RevealText';
import Magnetic from '../motion/Magnetic';
import '../motion/Reveal.css';
import './About.css';

const SKILLS = [
  'Visual identity',
  'Art direction',
  'Editorial',
  'Motion',
  'Brand implementation',
  'Illustration',
];

function SkillsTrack() {
  return (
    <ul className="about__skills-track" aria-hidden="true">
      {SKILLS.map((s) => (
        <li key={s}>
          <span>{s}</span>
          <span className="about__skills-sep" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <section id="about" className="about wrap">
      <div className="about__grid">
        <p className="eyebrow about__eyebrow">About</p>
        <div className="about__copy">
          <RevealText
            as="h2"
            className="about__heading"
            lines={[
              "I'm an art director and visual designer. Based in Barcelona, working",
              'internationally.',
            ]}
          />
          <p className="about__bio">
            I work with a small number of clients at a time — individuals and brands, across
            borders and industries. What connects them isn&rsquo;t sector or size, it&rsquo;s
            pace: they&rsquo;re playing a long game, not chasing a quarter. A few things I care
            about, always: <strong>built to last, only what&rsquo;s needed.</strong>
          </p>
          <Magnetic>
            <a href="#contact" className="about__cta">
              Let&rsquo;s talk
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="about__skills" role="presentation">
        <p className="visually-hidden">Services: {SKILLS.join(', ')}</p>
        <div className="about__skills-marquee">
          <SkillsTrack />
          <SkillsTrack />
        </div>
      </div>
    </section>
  );
}
