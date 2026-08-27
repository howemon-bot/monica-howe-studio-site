import { useState } from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects';
import ArrowIcon from './ArrowIcon';
import './WorkList.css';

const PREVIEW_COUNT = 5;

export default function WorkList() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = projects.length > PREVIEW_COUNT;
  const visible = expanded || !hasMore ? projects : projects.slice(0, PREVIEW_COUNT);

  return (
    <section id="work" className="worklist">
      <div className="wrap">
        <p className="eyebrow worklist__eyebrow">Selected work</p>
      </div>

      <ul className="worklist__list">
        {visible.map((p) => (
          <li key={p.slug} className="worklist__item">
            <Link to={`/work/${p.slug}`} className="worklist__row wrap">
              <span className="worklist__index">{p.index}</span>
              <span className="worklist__name">{p.name}</span>
              <span className="worklist__meta">
                <span className="worklist__client">{p.client}</span>
                <span className="worklist__year">{p.year}</span>
                <span className="worklist__arrow">
                  <ArrowIcon size={22} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="worklist__more wrap">
          <button
            type="button"
            className="worklist__toggle"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? '–' : '+'}
          </button>
        </div>
      )}
    </section>
  );
}
