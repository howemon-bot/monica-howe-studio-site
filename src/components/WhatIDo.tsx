import { Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './WhatIDo.css';

// Each service opens a project that shows that kind of work.
const SERVICES = [
  { name: 'Art direction', slug: 'medinaceli' },
  { name: 'Editorial', slug: 'wwf' },
  { name: 'Motion', slug: 'be-casa' },
  { name: 'Brand identity', slug: 'worldcoo' },
  { name: 'Illustration', slug: 'telavi' },
  { name: 'Website', slug: 'telavi' },
];

/** "What I do" as one large typographic statement; each service is a link. */
export default function WhatIDo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statementRef = useRef<HTMLParagraphElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);

  // Mouse or trackpad only. The service under the pointer gets a lime highlight while
  // the rest of the sentence fades back, and one "See sample" circle eases after the
  // pointer, gliding from word to word.
  useEffect(() => {
    const section = sectionRef.current;
    const statement = statementRef.current;
    const circle = circleRef.current;
    if (!section || !statement || !circle) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ease = () => (reduced.matches ? 1 : 0.16);

    let pointerX = 0;
    let pointerY = 0;
    let circleX = 0;
    let circleY = 0;
    let active: HTMLElement | null = null;
    let frame = 0;

    const setActive = (item: HTMLElement | null) => {
      if (item === active) return;
      const wasActive = !!active;
      active?.classList.remove('is-active');
      active = item;
      item?.classList.add('is-active');
      statement.classList.toggle('has-active', !!item);
      section.classList.toggle('has-active', !!item);
      if (item && !wasActive) {
        // First word entered: the circle starts under the pointer and grows from there.
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
      setActive((event.target as Element).closest<HTMLElement>('.whatido__item'));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => setActive(null);

    statement.addEventListener('pointermove', onMove);
    statement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      statement.removeEventListener('pointermove', onMove);
      statement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const last = SERVICES.length - 1;

  return (
    <section ref={sectionRef} id="services" className="whatido" aria-labelledby="whatido-heading">
      <div className="wrap">
        <p id="whatido-heading" className="eyebrow whatido__eyebrow">
          What I do
        </p>
        <p ref={statementRef} className="whatido__statement">
          {SERVICES.map((s, i) => (
            <Fragment key={s.name}>
              <Link to={`/work/${s.slug}`} className="whatido__item" data-hide-cursor>
                {s.name}
              </Link>
              {i < last - 1 && <span className="whatido__sep">, </span>}
              {i === last - 1 && <span className="whatido__amp"> &amp; </span>}
              {i === last && <span className="whatido__sep">.</span>}
            </Fragment>
          ))}
        </p>
      </div>

      <span ref={circleRef} className="whatido__cursor" aria-hidden="true">
        <span className="whatido__cursor-dot">See sample</span>
      </span>
    </section>
  );
}
