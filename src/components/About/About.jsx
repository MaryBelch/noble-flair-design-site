import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import SectionTitle from '../UI/SectionTitle';
import './About.css';

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-in').forEach((child) => child.classList.add('visible'));
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = [
    { key: 'feature1' },
    { key: 'feature2' },
    { key: 'feature3' },
  ];

  const stats = [
    { end: 5, suffix: '+', labelKey: 'about.stat1' },
    { end: 50, suffix: '+', labelKey: 'about.stat2' },
    { end: 100, suffix: '+', labelKey: 'about.stat3' },
  ];

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <SectionTitle titleKey="about.title" subtitleKey="about.subtitle" />

        <div className="about__content">
          <div className="about__text fade-in">
            <p>{t('about.text1')}</p>
            <p>{t('about.text2')}</p>
          </div>

          {/* Stats counters */}
          <div className="about__stats fade-in">
            {stats.map((s, i) => (
              <div key={i} className="about__stat">
                <span className="about__stat-number">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </span>
                <span className="about__stat-label">{t(s.labelKey)}</span>
              </div>
            ))}
          </div>

          <div className="about__features">
            {features.map((f, i) => (
              <div key={f.key} className="about__feature fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="about__feature-icon">
                  <div className="about__feature-number">0{i + 1}</div>
                </div>
                <h3 className="about__feature-title">{t(`about.${f.key}_title`)}</h3>
                <p className="about__feature-desc">{t(`about.${f.key}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
