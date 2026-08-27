import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectBySlug, getAdjacentProjects } from '../data/projects';
import ArrowIcon from '../components/ArrowIcon';
import RevealText from '../motion/RevealText';
import RevealImage from '../motion/RevealImage';
import Magnetic from '../motion/Magnetic';
import './ProjectDetail.css';

const INFO_BLOCKS = [
  { key: 'problem' as const, label: 'Problem' },
  { key: 'impact' as const, label: 'Positive impact' },
  { key: 'solution' as const, label: 'Solution' },
];

const base = import.meta.env.BASE_URL;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const { previous, next } = getAdjacentProjects(project.slug);
  const style = { ['--brand' as string]: project.brandColor };

  return (
    <article className="project" style={style}>
      <section className="project__intro wrap">
        <div className="project__intro-row">
          <div>
            <RevealText as="h1" className="project__title" lines={[project.name]} immediate delay={0.2} />

            <motion.dl
              className="project__facts"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.dl>
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

      {project.images ? (
        <>
          <div className="project__plate project__plate--hero project__plate--photo wrap">
            <RevealImage
              src={project.images.hero}
              alt={`${project.name} brand collateral collage`}
            />
          </div>

          <div className="project__grid wrap">
            {project.images.grid.map((g) => (
              <div
                className="project__plate project__plate--sq project__plate--photo"
                key={g.label}
              >
                <RevealImage src={g.src} alt={`${project.name} — ${g.label}`} />
              </div>
            ))}
          </div>

          <div className="project__plate project__plate--wide project__plate--photo">
            <RevealImage
              src={project.images.wide}
              alt={`${project.name} out-of-home billboard`}
            />
          </div>

          <div className="project__plate project__plate--screen project__plate--photo wrap">
            <RevealImage
              src={project.images.screen}
              alt={`${project.name} website mockup`}
              parallax={false}
            />
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
          <ArrowIcon size={18} rotate={180} />
          <span>Previous</span>
        </Link>
        <Link to={`/work/${next.slug}`} className="project__pager-link project__pager-link--next">
          <span>Next</span>
          <ArrowIcon size={18} />
        </Link>
      </nav>

      <div className="project__talk wrap">
        <Magnetic>
          <a href={`${base}#contact`} className="project__talk-link link-arrow">
            <span>
              Let&rsquo;s <span className="accent-italic">talk</span>.
            </span>
            <span className="arrow">
              <ArrowIcon size={18} />
            </span>
          </a>
        </Magnetic>
      </div>
    </article>
  );
}
