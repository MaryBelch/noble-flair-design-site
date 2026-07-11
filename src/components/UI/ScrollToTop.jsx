import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/I18nContext';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label={t('nav.scroll_to_top')}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
