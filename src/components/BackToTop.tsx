import { useEffect, useState } from 'react';
import ArrowIcon from './ArrowIcon';
import './BackToTop.css';

const SHOW_AFTER = 480;
const HIDE_NEAR_BOTTOM = 120;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        y + window.innerHeight >= document.documentElement.scrollHeight - HIDE_NEAR_BOTTOM;
      setVisible(y > SHOW_AFTER && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowIcon direction="up" size={16} strokeWidth={1} />
    </button>
  );
}
