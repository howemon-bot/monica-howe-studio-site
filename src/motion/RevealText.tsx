import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import './Reveal.css';

type RevealTextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  lines: string[];
  delay?: number;
  once?: boolean;
  /** Animate on mount instead of waiting for scroll into view */
  immediate?: boolean;
};

export default function RevealText({
  as: Tag = 'h1',
  className = '',
  lines,
  delay = 0,
  once = true,
  immediate = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once, margin: '-12% 0px', amount: 0.35 });
  const reduced = useReducedMotion();
  const show = reduced || immediate || inView;

  return (
    <Tag ref={ref as never} className={`reveal-text ${className}`.trim()}>
      {lines.map((line, i) => (
        <span className="reveal-text__line" key={`${line}-${i}`}>
          <motion.span
            className="reveal-text__inner"
            initial={reduced ? false : { y: '115%' }}
            animate={show ? { y: '0%' } : { y: '115%' }}
            transition={{
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.12,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
