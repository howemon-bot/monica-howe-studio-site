import showreelThumb from '../assets/telavi/showreel-thumb.jpg';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero wrap">
      <h1 className="hero__title">
        Built to last.
        <br />
        No trends to chase.
      </h1>
      <p className="hero__sub">
        Visual identity and art direction,
        <br />
        for brands playing the long game.
      </p>

      <button type="button" className="hero__reel" aria-label="Play studio showreel">
        <img
          src={showreelThumb}
          alt=""
          className="hero__reel-img"
          aria-hidden="true"
        />
        <span className="hero__reel-play" aria-hidden="true">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M0 0L14 8L0 16V0Z" fill="currentColor" />
          </svg>
        </span>
        <span className="visually-hidden">Play studio showreel</span>
      </button>
    </section>
  );
}
