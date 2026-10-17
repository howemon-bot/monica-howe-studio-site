import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import '../motion/Reveal.css';
import './Contact.css';

export const EMAIL = 'hola@monicahowe.studio';
export const LINKEDIN = 'https://www.linkedin.com/in/monica-howe-montesinos/';
export const INSTAGRAM = 'https://www.instagram.com/monicahowestudio';

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
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Let&rsquo;s design something
            </motion.span>
          </span>
          <span className="reveal-text__line">
            <motion.span
              className="reveal-text__inner"
              initial={reduced ? false : { y: '110%' }}
              animate={reduced || inView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="contact__headline-row">
                <span className="accent-italic contact__that-lasts">that lasts.</span>
                <span className="contact__say-hi">
                  <span className="contact__hi">Say Hi.</span>
                  <svg
                    className="contact__headline-arrow"
                    viewBox="3.5 3.5 9 9"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 12.5L12.5 3.5M5.25 3.5H12.5V10.75"
                      stroke="currentColor"
                      strokeWidth={0.9}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </motion.span>
          </span>
        </a>

        <ul className="contact__links">
          <li className="contact__links-email">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
