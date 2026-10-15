import { useEffect, useState } from 'react';
import RevealImage from '../motion/RevealImage';
import './FrameStack.css';

type FrameStackProps = {
  frames: string[];
  alt: string;
  interval?: number;
};

export default function FrameStack({ frames, alt, interval = 700 }: FrameStackProps) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  useEffect(() => {
    if (frames.length < 2) return;

    const tick = () =>
      setActive((i) => {
        setPrev(i);
        return (i + 1) % frames.length;
      });

    const loop = window.setInterval(tick, interval);
    return () => window.clearInterval(loop);
  }, [frames.length, interval]);

  if (frames.length === 0) return null;

  if (frames.length === 1) {
    return <RevealImage src={frames[0]} alt={alt} fit="natural" parallax={false} />;
  }

  return (
    <div className="frame-stack">
      {frames.map((src, i) => {
        const on = i === active;
        const underneath = i === prev && i !== active;
        return (
          <img
            key={src}
            src={src}
            alt={i === 0 ? alt : ''}
            className={`frame-stack__img${on ? ' is-on' : ''}${underneath ? ' is-prev' : ''}`}
          />
        );
      })}
    </div>
  );
}
