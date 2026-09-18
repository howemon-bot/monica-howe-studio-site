import { useState } from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects';
import ArrowIcon from './ArrowIcon';
import './WorkList.css';

const PREVIEW_COUNT = 4;

export default function WorkList() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = projects.length > PREVIEW_COUNT;
  const visible = expanded || !hasMore ? projects : projects.slice(0, PREVIEW_COUNT);

  return (
    <section id="work" className="worklist">
      <div className="wrap">
        <p className="eyebrow worklist__eyebrow">Selected work</p>

        <ul className="worklist__list">
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
