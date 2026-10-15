import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import showreel from '../assets/hero/showreel.mp4';
import RevealText from '../motion/RevealText';
import './Hero.css';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;

    el.muted = false;
    const playLoud = () => {
      el.muted = false;
      setMuted(false);
      return el.play();
    };

    void playLoud().catch(() => {
      el.muted = true;
      setMuted(true);
      void el.play().catch(() => {});
    });

    const unlock = (event: Event) => {
      if ((event.target as HTMLElement | null)?.closest?.('.hero__reel')) return;
      void playLoud().catch(() => {});
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [reduced]);

  function toggleSound() {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
    void el.play().catch(() => {});
  }

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

      <button
        type="button"
        className="hero__reel"
        onClick={(event) => {
          event.stopPropagation();
          toggleSound();
        }}
        aria-label={muted ? 'Play showreel with sound' : 'Mute showreel'}
      >
        <video
          ref={videoRef}
          className="hero__reel-media"
          src={showreel}
          autoPlay={!reduced}
          loop
          playsInline
          preload="auto"
        />
        {muted && !reduced && (
          <span className="hero__reel-sound" aria-hidden="true">
            Sound on
          </span>
        )}
      </button>
    </section>
  );
}
