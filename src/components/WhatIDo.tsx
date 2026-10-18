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
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Mouse or trackpad only (touch screens scroll natively). One animation loop:
  //  - the row pans as the pointer moves across it: left edge shows the first card,
  //    right edge the last;
  //  - one shared "See sample" circle eases toward the pointer every frame and glides
  //    from card to card, rather than each card popping its own circle in and out.
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const circle = circleRef.current;
    if (!section || !viewport || !track || !circle) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const panEase = () => (reduced.matches ? 1 : 0.08);
    const followEase = () => (reduced.matches ? 1 : 0.16);

    let pan = 0;
    let panTarget = 0;
    let pointerX = 0;
    let pointerY = 0;
    let hovered: HTMLElement | null = null;
    let followX = 0;
    let followY = 0;
    let inside = false;
    let frame = 0;

    const maxShift = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    // The active card is whichever one is under the pointer right now, checked every
    // frame, so a card that slides away under a still mouse lets go straight away.
    const setActive = (card: HTMLElement | null) => {
      if (card === hovered) return;
      const wasActive = !!hovered;
      hovered?.classList.remove('is-active');
      hovered = card;
      card?.classList.add('is-active');
      track.classList.toggle('has-active', !!card);
      section.classList.toggle('has-active', !!card);
      if (card && !wasActive) {
        // First card entered: the circle starts under the pointer and grows from there.
        const rect = section.getBoundingClientRect();
        followX = pointerX - rect.left;
        followY = pointerY - rect.top;
        circle.style.transform = `translate3d(${followX}px, ${followY}px, 0)`;
      }
    };
    const cardUnderPointer = () => {
      const el = document.elementFromPoint(pointerX, pointerY);
      const card = el?.closest<HTMLElement>('.whatido__card');
      if (card) return card;
      // On the hairline between two cards, keep the current one rather than flicker.
      return el && track.contains(el) ? hovered : null;
    };

    const placeFollower = () => {
      const rect = section.getBoundingClientRect();
      const x = pointerX - rect.left;
      const y = pointerY - rect.top;
      followX += (x - followX) * followEase();
      followY += (y - followY) * followEase();
      circle.style.transform = `translate3d(${followX.toFixed(1)}px, ${followY.toFixed(1)}px, 0)`;
      return Math.abs(x - followX) < 0.2 && Math.abs(y - followY) < 0.2;
    };

    const tick = () => {
      pan += (panTarget - pan) * panEase();
      track.style.transform = `translate3d(${(-pan).toFixed(2)}px, 0, 0)`;
      if (inside) setActive(cardUnderPointer());
      const followerSettled = placeFollower();
      const panSettled = Math.abs(panTarget - pan) < 0.3;
      frame = !panSettled || !followerSettled ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType !== 'mouse') return;
      inside = true;
      pointerX = event.clientX;
      pointerY = event.clientY;

      const rect = viewport.getBoundingClientRect();
      const edge = rect.width * 0.2; // still zones at both ends
      const t = (event.clientX - rect.left - edge) / (rect.width - edge * 2);
      panTarget = Math.min(1, Math.max(0, t)) * maxShift();

      setActive(cardUnderPointer());
      run();
    };
    const onLeave = () => {
      inside = false;
      setActive(null);
    };
    const onResize = () => {
      if (!fine.matches) {
        panTarget = pan = 0;
        track.style.transform = '';
        return;
      }
      panTarget = Math.min(panTarget, maxShift());
      run();
    };

    viewport.addEventListener('pointermove', onMove);
    viewport.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('pointermove', onMove);
      viewport.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="whatido" aria-labelledby="whatido-heading">
      <div className="wrap">
        <p id="whatido-heading" className="eyebrow whatido__eyebrow">
          What I do
        </p>
        <div ref={viewportRef} className="whatido__viewport">
          <ul ref={trackRef} className={`whatido__grid${expanded ? ' is-expanded' : ''}`}>
            {SERVICES.map((s, i) => (
              <li key={s.name} className={i >= MOBILE_PREVIEW_COUNT ? 'whatido__extra' : undefined}>
                <Link
                  to={`/work/${s.slug}`}
                  className="whatido__card"
                  data-hide-cursor
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
                </Link>
              </li>
            ))}
          </ul>
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

      <span ref={circleRef} className="whatido__cursor" aria-hidden="true">
        <span className="whatido__cursor-dot">See sample</span>
      </span>
    </section>
  );
}
