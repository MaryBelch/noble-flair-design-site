import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import Button from '../UI/Button';
import './Hero.css';

const TYPING_SPEED = 60;

export default function Hero() {
  const { t, locale } = useTranslation();
  const sectionRef = useScrollReveal([locale], 0.15);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  /* ── Typing animation for subtitle ── */
  useEffect(() => {
    const text = t('hero.subtitle');
    let index = 0;
    setDisplayedText('');
    setTypingDone(false);

    // Small delay so entrance animation can start revealing
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        index++;
        setDisplayedText(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, TYPING_SPEED);
    }, 400);

    return () => clearTimeout(startTimeout);
  }, [t, locale]);

  /* ── Scroll-based parallax on background ── */
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = scrollY * 0.35;
      // Keep existing mouse transform by reading current transform
      const currentTransform = bg.dataset.mouseTransform || '';
      bg.style.transform = `translateY(${offset}px) ${currentTransform}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Mouse-based parallax on content ── */
  const handleMouseMove = useCallback((e) => {
    if (!contentRef.current) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 6;
    const y = (clientY / window.innerHeight - 0.5) * 6;
    contentRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!contentRef.current) return;
    contentRef.current.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <section
      id="hero"
      className="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero__bg" ref={bgRef} />
      <div className="hero__overlay" />

      <div className="container hero__content" ref={contentRef}>
        <p className="hero__subtitle hero__animate">
          {displayedText}
          <span className={`hero__cursor ${typingDone ? 'hero__cursor--blink' : ''}`}>|</span>
        </p>

        <h1 className="hero__title hero__animate">
          <span className="gold-text">{t('hero.title')}</span>
        </h1>

        <p className="hero__description hero__animate">{t('hero.description')}</p>

        <div className="hero__actions hero__animate">
          <Button variant="outline-animated" href="#course">
            {t('hero.cta_course')}
          </Button>
          <Button variant="outline-animated" href="#portfolio">
            {t('hero.cta_portfolio')}
          </Button>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
