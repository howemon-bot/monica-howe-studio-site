import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import RevealImage from '../motion/RevealImage';
import './FrameStack.css';

type FrameStackProps = {
  frames: string[];
  alt: string;
  interval?: number;
};

export default function FrameStack({ frames, alt, interval = 2800 }: FrameStackProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, margin: '0px 0px -8% 0px' });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView) setRevealed(true);
  }, [inView]);

  useEffect(() => {
    if (!inView) {
      setActive(0);
    }
  }, [inView]);

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

  const show = reduced || revealed;

  return (
    <motion.div
      ref={ref}
      className="frame-stack"
      initial={reduced ? false : { clipPath: 'inset(100% 0 0 0)' }}
      animate={show ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
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
    </motion.div>
  );
}
