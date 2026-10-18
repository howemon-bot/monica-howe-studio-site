import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';
import './WhatIDo.css';

// On phones the cards stack and only the first few show until "+" is tapped.
const MOBILE_PREVIEW_COUNT = 4;

// Each card opens a project that shows that kind of work.
const SERVICES = [
  { name: 'Art direction', desc: 'One clear visual course.', slug: 'medinaceli' },
  { name: 'Editorial', desc: 'Complex ideas, made clear.', slug: 'wwf' },
  { name: 'Motion', desc: 'Movement with meaning.', slug: 'be-casa' },
  { name: 'Brand identity', desc: 'Designed and rolled out.', slug: 'worldcoo' },
  { name: 'Illustration', desc: 'Drawings with a voice.', slug: 'telavi' },
  { name: 'Website', desc: 'Hand-built, no templates.', slug: 'telavi' },
];

export default function WhatIDo() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  // On a mouse or trackpad, the row pans as the pointer moves across it: the left
  // edge shows the first card, the right edge the last. Touch screens scroll natively.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let target = 0;
    let frame = 0;

    const maxShift = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const tick = () => {
      current += (target - current) * (reduced.matches ? 1 : 0.08);
      track.style.transform = `translate3d(${(-current).toFixed(2)}px, 0, 0)`;
      frame = Math.abs(target - current) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (!fine.matches) return;
      const rect = viewport.getBoundingClientRect();
      const edge = rect.width * 0.2; // still zones at both ends
      const t = (event.clientX - rect.left - edge) / (rect.width - edge * 2);
      target = Math.min(1, Math.max(0, t)) * maxShift();
      run();
    };
    const onResize = () => {
      if (!fine.matches) {
        target = current = 0;
        track.style.transform = '';
        return;
      }
      target = Math.min(target, maxShift());
      run();
    };

    viewport.addEventListener('pointermove', onMove);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // The "See sample" circle follows the pointer inside each card.
  const followPointer = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <section id="services" className="whatido" aria-labelledby="whatido-heading">
      <div className="wrap">
        <p id="whatido-heading" className="eyebrow whatido__eyebrow">
          What I do
        </p>
      </div>

      {/* The dark band runs exactly from the cards' top line to their bottom line. */}
      <div className="whatido__band">
        <div className="wrap">
          <div ref={viewportRef} className="whatido__viewport">
            <ul ref={trackRef} className={`whatido__grid${expanded ? ' is-expanded' : ''}`}>
              {SERVICES.map((s, i) => (
                <li key={s.name} className={i >= MOBILE_PREVIEW_COUNT ? 'whatido__extra' : undefined}>
                  <Link
                    to={`/work/${s.slug}`}
                    className="whatido__card"
                    data-hide-cursor
                    onPointerMove={followPointer}
                  >
                    <div className="whatido__top">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <span className="whatido__arrow" aria-hidden="true">
                        <ArrowIcon size={16} />
                      </span>
                    </div>
                    <div>
                      <h3 className="whatido__name">{s.name}</h3>
                      <p className="whatido__desc">{s.desc}</p>
                    </div>
                    <span className="whatido__cursor" aria-hidden="true">
                      See sample
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="wrap whatido__more">
        <button
          type="button"
          className="whatido__toggle"
          aria-expanded={expanded}
          aria-label={expanded ? 'Show fewer services' : 'Show more services'}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? '–' : '+'}
        </button>
      </div>
    </section>
  );
}
