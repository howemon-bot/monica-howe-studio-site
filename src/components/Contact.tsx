import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import ArrowIcon from './ArrowIcon';
import Magnetic from '../motion/Magnetic';
import '../motion/Reveal.css';
import './Contact.css';

const EMAIL = 'hola@monicahowe.studio';

export default function Contact() {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <p className="eyebrow contact__eyebrow">Contact</p>

        <Magnetic>
          <a ref={ref} href={`mailto:${EMAIL}`} className="contact__headline link-arrow">
            <span className="reveal-text__line contact__headline-text">
              <motion.span
                className="reveal-text__inner"
                initial={reduced ? false : { y: '110%' }}
                animate={reduced || inView ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Let&rsquo;s <span className="accent-italic">talk</span>.
              </motion.span>
            </span>
            <span className="arrow contact__headline-arrow">
              <ArrowIcon size={48} />
            </span>
          </a>
        </Magnetic>

        <ul className="contact__links">
          <li>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
        </ul>

        <div className="contact__rule" aria-hidden="true" />
      </div>
    </section>
  );
}
