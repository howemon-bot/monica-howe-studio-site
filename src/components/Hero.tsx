import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import showreel from '../assets/hero/showreel.mp4';
import RevealText from '../motion/RevealText';
import './Hero.css';

// The title breaks into different lines on phones, where two long lines don't fit.
const TITLE_LINES = ['A creative studio', 'for brands who care.'];
const TITLE_LINES_PHONE = ['A creative studio', 'for brands', 'who care.'];
const PHONE_QUERY = '(max-width: 640px)';

function useIsPhone() {
  const [isPhone, setIsPhone] = useState(() => window.matchMedia(PHONE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY);
    const onChange = () => setIsPhone(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isPhone;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();
  const [muted, setMuted] = useState(false);
  const titleLines = useIsPhone() ? TITLE_LINES_PHONE : TITLE_LINES;

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
        key={titleLines.length}
        as="h1"
        className="hero__title"
        lines={titleLines}
        immediate
        delay={0.15}
      />
      <p className="hero__sub">Design with intention, made&nbsp;to&nbsp;last.</p>

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
