import { useEffect, useRef } from 'react';
import { useTranslation } from '../../context/I18nContext';
import SectionTitle from '../UI/SectionTitle';
import './About.css';

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

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <SectionTitle titleKey="about.title" subtitleKey="about.subtitle" />

        <div className="about__content">
          <div className="about__text fade-in">
            <p>{t('about.text1')}</p>
            <p>{t('about.text2')}</p>
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
