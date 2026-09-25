import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './Reveal.css';

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
  /** `natural` keeps the image’s aspect ratio instead of cropping to a plate */
  fit?: 'cover' | 'natural';
};

export default function RevealImage({
  src,
  alt,
  className = '',
  parallax = true,
  fit = 'cover',
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const useParallax = parallax && fit === 'cover' && !reduced;
  const y = useTransform(scrollYProgress, [0, 1], useParallax ? ['-6%', '6%'] : ['0%', '0%']);

  return (
    <div
      ref={ref}
      className={`reveal-image ${fit === 'natural' ? 'reveal-image--natural' : ''} ${className}`.trim()}
    >
      <motion.div
        className="reveal-image__mask"
        initial={reduced ? false : { clipPath: 'inset(100% 0 0 0)' }}
        animate={
          reduced || inView
            ? { clipPath: 'inset(0% 0 0 0)' }
            : { clipPath: 'inset(100% 0 0 0)' }
        }
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        <motion.img src={src} alt={alt} style={{ y }} />
      </motion.div>
    </div>
  );
}
