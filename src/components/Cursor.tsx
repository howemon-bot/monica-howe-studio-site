import { useEffect, useRef } from 'react';
import './Cursor.css';

// How quickly each part catches up with the mouse on every frame (1 = instantly).
const DOT_EASE = 0.35;
const RING_EASE = 0.14;

// Walks up from the element under the pointer to the first solid background
// and reports whether it is dark, so the ring can switch to a light outline.
function isDarkAt(x: number, y: number) {
  let el = document.elementFromPoint(x, y) as HTMLElement | null;
  while (el) {
    const match = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (match) {
      const [r, g, b, a = 1] = match[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
      if (a > 0.5) return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
    }
    el = el.parentElement;
  }
  return false;
}

/** A small lime dot that follows the mouse and a thin ring that trails behind it (mouse only). */
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dotEase = reduced ? 1 : DOT_EASE;
    const ringEase = reduced ? 1 : RING_EASE;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;
    let visible = false;
    let lastCheck = 0;

    const checkBackground = (force = false) => {
      const now = performance.now();
      if (!force && now - lastCheck < 80) return;
      lastCheck = now;
      root.classList.toggle('is-on-dark', isDarkAt(mouseX, mouseY));
    };

    const tick = () => {
      dotX += (mouseX - dotX) * dotEase;
      dotY += (mouseY - dotY) * dotEase;
      ringX += (mouseX - ringX) * ringEase;
      ringY += (mouseY - ringY) * ringEase;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      const settled = Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      // Elements with their own pointer graphic (e.g. the service cards) hide this one.
      const target = event.target as Element | null;
      root.classList.toggle('is-hidden', !!target?.closest?.('[data-hide-cursor]'));
      if (!visible) {
        visible = true;
        dotX = ringX = mouseX;
        dotY = ringY = mouseY;
        root.classList.add('is-visible');
        checkBackground(true);
      } else {
        checkBackground();
      }
      run();
    };
    const onLeave = () => {
      visible = false;
      root.classList.remove('is-visible');
    };
    // Scrolling moves a different section under a still mouse.
    const onScroll = () => {
      if (visible) checkBackground();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor__ring" />
      <div ref={dotRef} className="cursor__dot" />
    </div>
  );
}
