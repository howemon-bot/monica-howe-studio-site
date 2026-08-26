const SKILLS = [
  'Visual identity',
  'Art direction',
  'Editorial',
  'Motion',
  'Brand implementation',
  'Illustration',
];

export default function About() {
  return (
    <section id="about" className="about wrap">
      <div className="about__grid">
        <p className="eyebrow">About</p>
        <div className="about__copy">
          <h2 className="about__heading">
            I&rsquo;m an art director and visual designer. Based in Barcelona, working
            internationally.
          </h2>
          <p className="about__bio">
            I work with a small number of clients at a time — individuals and brands, across
            borders and industries. What connects them isn&rsquo;t sector or size, it&rsquo;s
            pace: they&rsquo;re playing a long game, not chasing a quarter. A few things I care
            about, always: <strong>built to last, only what&rsquo;s needed.</strong>
          </p>
          <a href="#contact" className="about__cta">
            Let&rsquo;s talk
          </a>
        </div>
      </div>

      <hr className="hairline about__rule" />
      <ul className="about__skills">
        {SKILLS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <hr className="hairline" />
    </section>
  );
}
