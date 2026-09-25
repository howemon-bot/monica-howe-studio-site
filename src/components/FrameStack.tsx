import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import RevealImage from '../motion/RevealImage';
import './FrameStack.css';

type FrameStackProps = {
  frames: string[];
  alt: string;
  interval?: number;
};

export default function FrameStack({ frames, alt, interval = 2200 }: FrameStackProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || frames.length < 2 || !inView || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % frames.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [frames.length, inView, interval, paused, reduced]);

  if (frames.length === 0) return null;

  if (reduced || frames.length === 1) {
    return <RevealImage src={frames[0]} alt={alt} fit="natural" parallax={false} />;
  }

  return (
    <div
      ref={ref}
      className="frame-stack"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          className={`frame-stack__img${i === active ? ' is-on' : ''}`}
        />
      ))}
    </div>
  );
}
