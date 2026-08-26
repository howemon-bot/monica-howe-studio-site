import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug, getAdjacentProjects } from '../data/projects';
import Contact from '../components/Contact';
import '../components/Contact.css';
import './ProjectDetail.css';

const INFO_BLOCKS = [
  { key: 'problem', label: 'Problem' },
  { key: 'impact', label: 'Positive impact' },
  { key: 'solution', label: 'Solution' },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const { previous, next } = getAdjacentProjects(slug);
  const style = { '--brand': project.brandColor };

  return (
    <article className="project" style={style}>
      <section className="project__intro wrap">
        <div className="project__intro-row">
          <div>
            <h1 className="project__title">{project.name}</h1>

            <dl className="project__facts">
              <div>
                <dt className="eyebrow">Company</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt className="eyebrow">Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt className="eyebrow">Type</dt>
                <dd>{project.type}</dd>
              </div>
            </dl>
          </div>
          <span className="project__index" aria-hidden="true">
            {project.index}
          </span>
        </div>

        <div className="project__blocks">
          {INFO_BLOCKS.map((b) => (
            <div className="project__block" key={b.key}>
              <p className="eyebrow">{b.label}</p>
              <p className="project__block-copy">{project[b.key]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real exports where available (currently Telavi); placeholder plates
          elsewhere until the other case studies have assets. */}
      {project.images ? (
        <>
          <div className="project__plate project__plate--hero project__plate--photo wrap">
            <img src={project.images.hero} alt={`${project.name} brand collateral collage`} />
          </div>

          <div className="project__grid wrap">
            {project.images.grid.map((g) => (
              <div className="project__plate project__plate--sq project__plate--photo" key={g.label}>
                <img src={g.src} alt={`${project.name} — ${g.label}`} />
              </div>
            ))}
          </div>

          <div className="project__plate project__plate--wide project__plate--photo">
            <img src={project.images.wide} alt={`${project.name} out-of-home billboard`} />
          </div>

          <div className="project__plate project__plate--screen project__plate--photo wrap">
            <img src={project.images.screen} alt={`${project.name} website mockup`} />
          </div>
        </>
      ) : (
        <>
          <div className="project__plate project__plate--hero wrap">
            <span>Hero mockup collage</span>
          </div>

          <div className="project__grid wrap">
            <div className="project__plate project__plate--sq">
              <span>Logo lockup</span>
            </div>
            <div className="project__plate project__plate--sq">
              <span>Packaging</span>
            </div>
            <div className="project__plate project__plate--sq">
              <span>Stationery</span>
            </div>
            <div className="project__plate project__plate--sq">
              <span>Print application</span>
            </div>
          </div>

          <div className="project__plate project__plate--wide">
            <span>Out-of-home / billboard</span>
          </div>

          <div className="project__plate project__plate--screen wrap">
            <span>Website mockup</span>
          </div>
        </>
      )}

      <nav className="project__pager wrap" aria-label="Other projects">
        <Link to={`/work/${previous.slug}`} className="project__pager-link">
          <span className="eyebrow">Previous</span>
          <span className="project__pager-name">{previous.name}</span>
        </Link>
        <Link to={`/work/${next.slug}`} className="project__pager-link project__pager-link--next">
          <span className="eyebrow">Next</span>
          <span className="project__pager-name">{next.name}</span>
        </Link>
      </nav>

      <Contact />
    </article>
  );
}
