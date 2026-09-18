import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import ArrowIcon from './ArrowIcon';
import '../motion/Reveal.css';
import './Contact.css';

export const EMAIL = 'hola@monicahowe.studio';
export const LINKEDIN = 'https://www.linkedin.com/in/monica-howe-montesinos/';

export default function Contact() {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <p className="eyebrow contact__eyebrow">Contact</p>

        <a ref={ref} href={`mailto:${EMAIL}`} className="contact__headline">
          <span className="reveal-text__line">
            <motion.span
              className="reveal-text__inner"
              initial={reduced ? false : { y: '110%' }}
              animate={reduced || inView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              Let&rsquo;s design something{' '}
              <span className="accent-italic">that</span>
            </motion.span>
          </span>
          <span className="reveal-text__line">
            <motion.span
              className="reveal-text__inner contact__headline-row"
              initial={reduced ? false : { y: '110%' }}
              animate={reduced || inView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="accent-italic">lasts.</span> Say hi.
              <span className="contact__headline-arrow" aria-hidden="true">
                <ArrowIcon size={42} />
              </span>
            </motion.span>
          </span>
        </a>

        <ul className="contact__links">
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
    </section>
  );
}
