import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import testimonials from '../../data/testimonials.json';
import './Testimonials.css';

const AUTO_PLAY_INTERVAL = 5000;
const SWIPE_THRESHOLD = 50; // min px for swipe detection

function avatarUrl(name) {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&background=D4AF37&color=0a0a0a&bold=true&size=128&font-size=0.4&format=svg`;
}

export default function Testimonials() {
  const { t, locale } = useTranslation();
  const sectionRef = useScrollReveal([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);
  const touchStartRef = useRef(null);
  const cardRef = useRef(null);

  const getText = useCallback((item) => {
    if (locale === 'uk' && item.text_uk) return item.text_uk;
    if (locale === 'ru' && item.text_ru) return item.text_ru;
    return item.text_en || item.text_uk;
  }, [locale]);

  const getRole = useCallback((item) => {
    if (locale === 'uk' && item.role_uk) return item.role_uk;
    if (locale === 'ru' && item.role_ru) return item.role_ru;
    return item.role_en || item.role_uk;
  }, [locale]);

  const goNext = useCallback(() => {
    setDirection('next');
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection('prev');
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 'next' : 'prev');
    setCurrent(index);
  }, [current]);

  // Auto-play carousel (paused on hover / touch)
  useEffect(() => {
    if (isPaused) {
      clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(goNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(autoPlayRef.current);
  }, [isPaused, goNext]);

  // ── Touch / swipe handlers ──
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Only trigger swipe if horizontal movement exceeds threshold and is dominant
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  const item = testimonials[current];

  return (
    <section
      id="testimonials"
      className="section testimonials"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <SectionTitle titleKey="testimonials.title" subtitleKey="testimonials.subtitle" />

        <div className="testimonials__carousel fade-in">
          {/* Progress dots */}
          <div className="testimonials__dots" role="tablist" aria-label={t('testimonials.label')}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`${t('testimonials.dot_aria')} ${i + 1}`}
              />
            ))}
          </div>

          {/* Card with swipe support */}
          <div
            className="testimonials__card-wrapper"
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              key={`card-${current}-${direction}`}
              className={`testimonials__card testimonials__card--${direction}`}
            >
              <div className="testimonials__quote-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M14 24h-4a6 6 0 0 1 6-6v4zm12 0h-4a6 6 0 0 1 6-6v4z"
                    fill="currentColor"
                    opacity="0.08"
                  />
                  {/* Stylized opening quote marks */}
                  <text x="4" y="38" fontSize="48" fontWeight="700" fill="currentColor" opacity="0.06" fontFamily="Georgia, serif">"</text>
                </svg>
              </div>
              <div className="testimonials__stars" aria-hidden="true">
                {item.stars ? '★'.repeat(item.stars) : '★★★★★'}
              </div>
              <blockquote className="testimonials__text">{getText(item)}</blockquote>
              <div className="testimonials__author">
                <img
                  src={avatarUrl(item.name)}
                  alt={item.name}
                  className="testimonials__avatar"
                  loading="lazy"
                />
                <div>
                  <cite className="testimonials__name">{item.name}</cite>
                  <div className="testimonials__role">{getRole(item)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="testimonials__nav">
            <button className="testimonials__nav-btn" onClick={goPrev} aria-label={t('testimonials.prev_aria')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <title>{t('testimonials.prev_aria')}</title>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="testimonials__counter" aria-live="polite">{current + 1}/{testimonials.length}</span>
            <button className="testimonials__nav-btn" onClick={goNext} aria-label={t('testimonials.next_aria')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <title>{t('testimonials.next_aria')}</title>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}