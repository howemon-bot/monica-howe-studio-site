import { useRef, type ReactElement } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

type MagneticProps = {
  children: ReactElement;
  strength?: number;
  radius?: number;
  className?: string;
};

export default function Magnetic({
  children,
  strength = 0.28,
  radius = 52,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.3 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius) {
          x.set(0);
          y.set(0);
          return;
        }
        x.set(dx * strength);
        y.set(dy * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
