import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import services from '../../data/services.json';
import { trackEvent } from '../../lib/analytics';
import './Services.css';

export default function Services() {
  const { t, locale } = useTranslation();
  const sectionRef = useScrollReveal([]);

  const briefLink = (serviceId) => {
    return `https://t.me/noble_flair_design_bot?start=brief_${serviceId}`;
  };

  return (
    <section id="services" className="section services" ref={sectionRef} role="region" aria-label={t('services.title')}>
      <div className="container">
        <SectionTitle titleKey="services.title" subtitleKey="services.subtitle" />

        <div className="services__grid">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="services__card fade-in card-hover"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="services__card-icon" aria-hidden="true">{service.icon}</div>
              <h3 className="services__card-title">{t(service.title_key)}</h3>
              <p className="services__card-desc">{t(service.desc_key)}</p>
              <div className="services__card-actions">
                <a
                  href={briefLink(service.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services__card-btn services__card-btn--brief"
                  onClick={() => trackEvent('interaction', 'click', `brief_${service.id}`)}
                >
                  {t('services.brief_btn')} →
                </a>
                <a href="#contact" className="services__card-btn services__card-btn--contact" onClick={() => trackEvent('interaction', 'click', `contact_${service.id}`)}>
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
