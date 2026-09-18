import showreelThumb from '../assets/telavi/showreel-thumb.jpg';
import RevealText from '../motion/RevealText';
import RevealImage from '../motion/RevealImage';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero wrap">
      <RevealText
        as="h1"
        className="hero__title"
        lines={['Built to last.', 'No trends to chase.']}
        immediate
        delay={0.15}
      />
      <p className="hero__sub">
        Visual identity and art direction,
        <br />
        for brands playing the long game.
      </p>

      <div className="hero__reel" aria-label="Studio showreel — coming soon">
        <RevealImage src={showreelThumb} alt="" className="hero__reel-media" parallax={false} />
        <div className="hero__reel-overlay" aria-hidden="true" />
        <p className="hero__reel-soon">
          <span className="hero__reel-soon-text">Coming soon</span>
          <span className="hero__reel-soon-dots" aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      </div>
    </section>
  );
}
