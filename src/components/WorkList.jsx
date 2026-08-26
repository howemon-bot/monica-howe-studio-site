import { Link } from 'react-router-dom';
import projects from '../data/projects';
import ArrowIcon from './ArrowIcon';
import './WorkList.css';

export default function WorkList() {
  return (
    <section id="work" className="worklist">
      <div className="wrap">
        <p className="eyebrow worklist__eyebrow">Selected work</p>
      </div>

      <ul className="worklist__list">
        {projects.map((p) => (
          <li key={p.slug} className="worklist__item">
            <Link to={`/work/${p.slug}`} className="worklist__row wrap">
              <span className="worklist__index">{p.index}</span>
              <span className="worklist__name">{p.name}</span>
              <span className="worklist__meta">
                <span className="worklist__client">{p.client}</span>
                <span className="worklist__year">{p.year}</span>
                <span className="worklist__arrow">
                  <ArrowIcon size={18} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
