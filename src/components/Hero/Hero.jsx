import { useEffect, useRef } from 'react';
import { useTranslation } from '../../context/I18nContext';
import Button from '../UI/Button';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.hero__animate').forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="container hero__content">
        <p className="hero__subtitle hero__animate">{t('hero.subtitle')}</p>
        <h1 className="hero__title hero__animate">
          <span className="gold-text">{t('hero.title')}</span>
        </h1>
        <p className="hero__description hero__animate">{t('hero.description')}</p>
        <div className="hero__actions hero__animate">
          <Button variant="primary" href="#course">
            {t('hero.cta_course')}
          </Button>
          <Button variant="outline" href="#portfolio">
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
