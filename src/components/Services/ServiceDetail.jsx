import { useTranslation } from '../../context/I18nContext';
import servicesDetail from '../../data/services-detail.json';
import './ServiceDetail.css';

export default function ServiceDetail({ serviceId, onBack }) {
  const { t, locale } = useTranslation();
  const service = servicesDetail[serviceId];

  if (!service) {
    return (
      <div className="service-detail__error">
        <button className="service-detail__back-btn" onClick={onBack}>
          ← {t('services-detail.back')}
        </button>
        <p>{t('services-detail.not_found')}</p>
      </div>
    );
  }

  const getText = (obj) => obj[locale] || obj.uk;

  return (
    <div className="service-detail">
      <div className="container">
        <button className="service-detail__back-btn" onClick={onBack}>
          ← {t('services-detail.back')}
        </button>

        {/* Hero */}
        <div className="service-detail__hero">
          <span className="service-detail__hero-icon">{service.icon}</span>
          <h2 className="service-detail__hero-title">{getText(service.title)}</h2>
          <p className="service-detail__hero-subtitle">{getText(service.subtitle)}</p>
        </div>

        {/* Description */}
        <div className="service-detail__desc">
          {service.description.map((para, i) => (
            <p key={i} className="service-detail__desc-text">{getText(para)}</p>
          ))}
        </div>

        {/* Features */}
        {service.features && (
          <div className="service-detail__section">
            <h3 className="service-detail__section-title">{t('services-detail.what_we_offer')}</h3>
            <div className="service-detail__features">
              {service.features.map((feat, i) => (
                <div key={i} className="service-detail__feature">
                  <span className="service-detail__feature-icon" aria-hidden="true">{feat.icon}</span>
                  <div className="service-detail__feature-info">
                    <h4 className="service-detail__feature-title">{getText(feat.title)}</h4>
                    <p className="service-detail__feature-desc">{getText(feat.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subcategories — only for printing */}
        {service.subcategories && (
          <div className="service-detail__section">
            <h3 className="service-detail__section-title">{t('services-detail.subcategories')}</h3>
            <div className="service-detail__subcats">
              {service.subcategories.map((sub) => (
                <div key={sub.id} className="service-detail__subcat">
                  <div className="service-detail__subcat-img">
                    <span className="service-detail__subcat-icon">{sub.icon}</span>
                    <span className="service-detail__subcat-placeholder">
                      {t('services-detail.photo')}
                    </span>
                  </div>
                  <h4 className="service-detail__subcat-title">{getText(sub.title)}</h4>
                  <p className="service-detail__subcat-desc">{getText(sub.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {service.gallery && (
          <div className="service-detail__section">
            <h3 className="service-detail__section-title">{t('services-detail.gallery')}</h3>
            <div className="service-detail__gallery">
              {service.gallery.map((item, i) => (
                <div key={i} className="service-detail__gallery-item">
                  <span className="service-detail__gallery-icon">{item.icon}</span>
                  <span className="service-detail__gallery-label">{getText(item.label)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="service-detail__cta">
          <p className="service-detail__cta-text">{t('services-detail.cta_text')}</p>
          <div className="service-detail__cta-actions">
            <a
              href={`https://t.me/noble_flair_design_bot?start=brief_${serviceId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="service-detail__cta-btn service-detail__cta-btn--brief"
            >
              {t('services.brief_btn')} →
            </a>
            <a href="#contact" className="service-detail__cta-btn service-detail__cta-btn--contact">
              {t('services.cta')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
