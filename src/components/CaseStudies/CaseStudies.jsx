import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import caseStudies from '../../data/case-studies.json';
import './CaseStudies.css';

export default function CaseStudies() {
  const { t, locale } = useTranslation();
  const sectionRef = useScrollReveal([]);

  const getText = (obj) => {
    if (obj[locale]) return obj[locale];
    return obj.uk || obj.en || '';
  };

  return (
    <section id="case-studies" className="section case-studies" ref={sectionRef} role="region" aria-label={t('caseStudies.title')}>
      <div className="container">
        <SectionTitle titleKey="caseStudies.title" subtitleKey="caseStudies.subtitle" />

        <div className="case-studies__grid">
          {caseStudies.map((item, i) => {
            const isComing = item.status === 'coming';
            return (
              <article
                key={item.id}
                className={`case-studies__card fade-in ${isComing ? 'case-studies__card--coming' : ''}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="case-studies__card-header">
                  <span className="case-studies__card-number">0{item.id}</span>
                  {isComing && (
                    <span className="case-studies__card-badge">{t('caseStudies.status_coming')}</span>
                  )}
                </div>
                <h3 className="case-studies__card-title">{getText(item.title)}</h3>
                <p className="case-studies__card-desc">{getText(item.description)}</p>
                <div className="case-studies__card-footer">
                  <span className="case-studies__card-arrow">↗</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
