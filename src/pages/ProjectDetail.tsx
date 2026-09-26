import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectBySlug, getAdjacentProjects, type Shot } from '../data/projects';
import ArrowIcon from '../components/ArrowIcon';
import FrameStack from '../components/FrameStack';
import RevealText from '../motion/RevealText';
import RevealImage from '../motion/RevealImage';
import { EMAIL, LINKEDIN } from '../components/Contact';
import './ProjectDetail.css';

const INFO_BLOCKS = [
  { key: 'problem' as const, label: 'Problem' },
  { key: 'impact' as const, label: 'Positive impact' },
  { key: 'solution' as const, label: 'Solution' },
];

function shotClass(shot: Shot) {
  const parts = ['project__shot'];
  if (shot.size === 'contain') parts.push('project__shot--contain');
  if (shot.emphasis === 'hero') parts.push('project__shot--hero');
  if (shot.emphasis === 'feature') parts.push('project__shot--feature');
  return parts.join(' ');
}

function ProjectShot({ shot }: { shot: Shot }) {
  const frames = shot.frames && shot.frames.length > 1 ? shot.frames : null;
  const featured = shot.emphasis === 'hero' || shot.emphasis === 'feature';

  return (
    <div className={shotClass(shot)}>
      {frames ? (
        <FrameStack frames={frames} alt={shot.alt} />
      ) : (
        <RevealImage src={shot.src} alt={shot.alt} fit="natural" parallax={featured} />
      )}
    </div>
  );
}

function ProjectVideo({ src, alt, emphasis }: { src: string; alt: string; emphasis?: Shot['emphasis'] }) {
  return (
    <div className={`project__video${emphasis ? ` project__video--${emphasis}` : ''}`}>
      <video
        className="project__video-el"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label={alt}
      />
    </div>
  );
}

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

      <div className="project__gallery wrap">
        {project.gallery.map((block, i) => {
          if (block.kind === 'video') {
            return (
              <ProjectVideo
                key={`video-${i}`}
                src={block.src}
                alt={block.alt}
                emphasis={block.emphasis}
              />
            );
          }
          if (block.kind === 'pair') {
            return (
              <div className="project__pair" key={`pair-${i}`}>
                {block.shots.map((shot, j) => (
                  <ProjectShot key={`${i}-${j}`} shot={shot} />
                ))}
              </div>
            );
          }
          if (block.kind === 'grid') {
            const cols = block.shots.length === 3 ? 3 : 2;
            return (
              <div className={`project__grid project__grid--${cols}`} key={`grid-${i}`}>
                {block.shots.map((shot, j) => (
                  <ProjectShot key={`${i}-${j}`} shot={shot} />
                ))}
              </div>
            );
          }
          return <ProjectShot key={`shot-${i}`} shot={block.shot} />;
        })}
      </div>

      <nav className="project__pager wrap" aria-label="Other projects">
        <Link to={`/work/${previous.slug}`} className="project__pager-link">
          <ArrowIcon size={16} rotate={180} strokeWidth={0.9} />
          <span>Previous</span>
        </Link>
        <Link to={`/work/${next.slug}`} className="project__pager-link project__pager-link--next">
          <span>Next</span>
          <ArrowIcon size={16} strokeWidth={0.9} />
        </Link>
      </nav>

      <div className="project__talk wrap">
        <a href={`mailto:${EMAIL}`} className="project__talk-link">
          <span>
            Let&rsquo;s <span className="accent-italic">talk</span>.
          </span>
          <span className="project__talk-arrow" aria-hidden="true">
            <ArrowIcon size={56} strokeWidth={0.7} />
          </span>
        </a>
        <ul className="project__talk-links">
          <li>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
}
