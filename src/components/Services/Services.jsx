import { useEffect, useRef } from 'react';
import { useTranslation } from '../../context/I18nContext';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import services from '../../data/services.json';
import './Services.css';

export default function Services() {
  const { t, locale } = useTranslation();
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

  const briefLink = (serviceId) => {
    return `https://t.me/noble_flair_design_bot?start=brief_${serviceId}`;
  };

  return (
    <section id="services" className="section services" ref={ref}>
      <div className="container">
        <SectionTitle titleKey="services.title" subtitleKey="services.subtitle" />

        <div className="services__grid">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="services__card fade-in card-hover"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="services__card-icon">{service.icon}</div>
              <h3 className="services__card-title">{t(service.title_key)}</h3>
              <p className="services__card-desc">{t(service.desc_key)}</p>
              <div className="services__card-actions">
                <a
                  href={briefLink(service.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services__card-btn services__card-btn--brief"
                >
                  {locale === 'uk' ? 'Заповнити бриф' : locale === 'ru' ? 'Заполнить бриф' : 'Fill brief'} →
                </a>
                <a href="#contact" className="services__card-btn services__card-btn--contact">
                  {t('services.cta')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
