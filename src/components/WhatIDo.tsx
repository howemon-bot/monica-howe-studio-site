import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';
import imgArtDirection from '../assets/services/Service_ArtDirection.jpg';
import imgEditorial from '../assets/services/Service_Editorial.jpg';
import imgMotion from '../assets/services/Service_Motion.jpg';
import imgBrandIdentity from '../assets/services/Service_BrandIdentity.jpg';
import imgIllustration from '../assets/services/Service_Illustration.jpg';
import imgWebsite from '../assets/services/Service_Website.jpg';
import './WhatIDo.css';

// On phones only the first few cards show until "+" is tapped.
const MOBILE_PREVIEW_COUNT = 4;

// Each card opens a project that shows that kind of work; its image (from the same
// project) appears, tinted lime, on hover. `focus` is the part of the image kept in view;
// `invert` is for dark photos, so their light subject reads as dark marks on lime;
// `lineArt` keeps a drawing's thin outlines visible.
const SERVICES = [
  { name: 'Art direction', desc: 'One clear visual course.', slug: 'medinaceli', img: imgArtDirection, focus: 'right center' },
  { name: 'Editorial', desc: 'Complex ideas, made clear.', slug: 'wwf', img: imgEditorial, focus: 'right center' },
  { name: 'Motion', desc: 'Movement with meaning.', slug: 'be-casa', img: imgMotion, focus: 'right center', invert: true },
  { name: 'Brand identity', desc: 'Designed and rolled out.', slug: 'worldcoo', img: imgBrandIdentity, focus: 'right center' },
  { name: 'Illustration', desc: 'Drawings with a voice.', slug: 'telavi', img: imgIllustration, focus: 'right center', lineArt: true },
  { name: 'Website', desc: 'Hand-built, no templates.', slug: 'telavi', img: imgWebsite, focus: 'right center' },
];

export default function WhatIDo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const gridRef = useRef<HTMLUListElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Mouse or trackpad only. The card under the pointer becomes active (lime fill), and
  // one shared "See sample" circle eases after the pointer, gliding from card to card
  // rather than each card popping its own circle in and out.
  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const circle = circleRef.current;
    if (!section || !grid || !circle) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ease = () => (reduced.matches ? 1 : 0.16);

    let pointerX = 0;
    let pointerY = 0;
    let circleX = 0;
    let circleY = 0;
    let active: HTMLElement | null = null;
    let frame = 0;

    const setActive = (card: HTMLElement | null) => {
      if (card === active) return;
      const wasActive = !!active;
      active?.classList.remove('is-active');
      active = card;
      card?.classList.add('is-active');
      grid.classList.toggle('has-active', !!card);
      section.classList.toggle('has-active', !!card);
      if (card && !wasActive) {
        // First card entered: the circle starts under the pointer and grows from there.
        const rect = section.getBoundingClientRect();
        circleX = pointerX - rect.left;
        circleY = pointerY - rect.top;
        circle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
      }
    };

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const x = pointerX - rect.left;
      const y = pointerY - rect.top;
      circleX += (x - circleX) * ease();
      circleY += (y - circleY) * ease();
      circle.style.transform = `translate3d(${circleX.toFixed(1)}px, ${circleY.toFixed(1)}px, 0)`;
      const settled = Math.abs(x - circleX) < 0.2 && Math.abs(y - circleY) < 0.2;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      const card = (event.target as Element).closest<HTMLElement>('.whatido__card');
      // On the hairline between two cards, keep the current one rather than flicker.
      if (card || !grid.contains(event.target as Node)) setActive(card);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => setActive(null);

    grid.addEventListener('pointermove', onMove);
    grid.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      grid.removeEventListener('pointermove', onMove);
      grid.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="whatido" aria-labelledby="whatido-heading">
      <div className="wrap">
        <p id="whatido-heading" className="eyebrow whatido__eyebrow">
          What I do
        </p>
        <ul ref={gridRef} className={`whatido__grid${expanded ? ' is-expanded' : ''}`}>
          {SERVICES.map((s, i) => (
            <li key={s.name} className={i >= MOBILE_PREVIEW_COUNT ? 'whatido__extra' : undefined}>
              <Link
                to={`/work/${s.slug}`}
                className="whatido__card"
                data-hide-cursor
              >
                <span className="whatido__media" aria-hidden="true">
                  <img
                    src={s.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={
                      {
                        '--focus': s.focus,
                        '--invert': s.invert ? 1 : 0,
                        ...(s.lineArt ? { '--contrast': 0.9, '--lift': 1.3 } : {}),
                      } as React.CSSProperties
                    }
                  />
                </span>
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
