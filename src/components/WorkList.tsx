import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects';
import ArrowIcon from './ArrowIcon';
import './WorkList.css';

const PREVIEW_COUNT = 4;

export default function WorkList() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = projects.length > PREVIEW_COUNT;
  const visible = expanded || !hasMore ? projects : projects.slice(0, PREVIEW_COUNT);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Phones only: each title drifts a few pixels as it scrolls past, lower while it is
  // below the middle of the screen and higher once above it.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const phone = window.matchMedia('(max-width: 640px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const DRIFT = 8;
    let frame = 0;

    const update = () => {
      frame = 0;
      const names = list.querySelectorAll<HTMLElement>('.worklist__name');
      if (!phone.matches || reduced.matches) {
        names.forEach((n) => (n.style.transform = ''));
        return;
      }
      const vh = window.innerHeight;
      names.forEach((n) => {
        const row = n.parentElement!.getBoundingClientRect();
        const t = Math.max(-1, Math.min(1, (row.top + row.height / 2 - vh / 2) / (vh / 2)));
        n.style.transform = `translate3d(0, ${(t * DRIFT).toFixed(2)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    phone.addEventListener('change', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      phone.removeEventListener('change', onScroll);
    };
  }, [expanded]);

  return (
    <section id="work" className="worklist">
      <div className="wrap">
        <p className="eyebrow worklist__eyebrow">Selected work</p>

        <ul ref={listRef} className="worklist__list">
          {visible.map((p) => (
            <li key={p.slug} className="worklist__item">
              <Link to={`/work/${p.slug}`} className="worklist__row">
                <span className="worklist__index">{p.index}</span>
                <span className="worklist__name">{p.name}</span>
                <span className="worklist__meta">
                  <span className="worklist__client">{p.client}</span>
                  <span className="worklist__year">{p.year}</span>
                  <span className="worklist__arrow">
                    <ArrowIcon size={20} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="worklist__more">
            <button
              type="button"
              className="worklist__toggle"
              aria-expanded={expanded}
              aria-label={expanded ? 'Show fewer projects' : 'Show more projects'}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? '–' : '+'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
