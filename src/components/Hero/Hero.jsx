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
  const scrollRafRef = useRef(null);
  const mouseRafRef = useRef(null);
  const scrollRef = useRef(0);
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

  /* ── Scroll-based parallax on background (rAF-throttled) ── */
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      // Schedule rAF if not already pending
      if (!scrollRafRef.current) {
        scrollRafRef.current = requestAnimationFrame(() => {
          const offset = scrollRef.current * 0.35;
          bg.style.transform = `translateY(${offset}px)`;
          scrollRafRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  /* ── Mouse-based parallax on content (rAF-throttled) ── */
  const handleMouseMove = useCallback((e) => {
    if (!contentRef.current) return;
    if (mouseRafRef.current) return; // skip if rAF is pending

    mouseRafRef.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 6;
      const y = (clientY / window.innerHeight - 0.5) * 6;
      contentRef.current.style.transform = `translate(${x}px, ${y}px)`;
      mouseRafRef.current = null;
    });
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
      role="region"
      aria-label="Noble Flair Design"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero__bg" ref={bgRef} />
      <div className="hero__overlay" />

      <div className="container hero__content" ref={contentRef}>
        <p className="hero__subtitle hero__animate">
          {displayedText}
          <span className={`hero__cursor ${typingDone ? 'hero__cursor--blink' : ''}`} aria-hidden="true">|</span>
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

      <div className="hero__scroll-indicator" aria-hidden="true">
        <span className="hero__scroll-text">{t('hero.scroll_label')}</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
