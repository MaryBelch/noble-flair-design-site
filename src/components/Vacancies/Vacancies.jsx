import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import { getAllVacancies } from '../../firebase/firestore';
import './Vacancies.css';

export default function Vacancies() {
  const { t, locale } = useTranslation();
  const sectionRef = useScrollReveal([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getAllVacancies();
        if (!cancelled) {
          setVacancies(data.filter((v) => !v.deleted));
        }
      } catch {
        // Silent: fall back to empty
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const getTitle = (item) => {
    if (locale === 'uk' && item.title_uk) return item.title_uk;
    if (locale === 'ru' && item.title_ru) return item.title_ru;
    if (item.title_en) return item.title_en;
    return item.title_uk || item.title_ru || '';
  };

  const getDesc = (item) => {
    if (locale === 'uk' && item.desc_uk) return item.desc_uk;
    if (locale === 'ru' && item.desc_ru) return item.desc_ru;
    if (item.desc_en) return item.desc_en;
    return item.desc_uk || item.desc_ru || '';
  };

  const hasVacancies = vacancies.length > 0;

  return (
    <section id="vacancies" className="section vacancies" ref={sectionRef} role="region" aria-label={t('vacancies.title')}>
      <div className="container">
        <SectionTitle titleKey="vacancies.title" subtitleKey="vacancies.subtitle" />

        <div className="vacancies__content fade-in">
          <p className="vacancies__description">{t('vacancies.description')}</p>

          {loading ? (
            <p className="vacancies__loading" style={{ color: '#888', textAlign: 'center' }}>...</p>
          ) : hasVacancies ? (
            <>
              <h3 className="vacancies__open-title">{t('vacancies.open_title')}</h3>
              <div className="vacancies__list">
                {vacancies.map((v) => (
                  <div key={v.id} className="vacancies__card">
                    <div className="vacancies__card-icon">💼</div>
                    <div className="vacancies__card-info">
                      <h4 className="vacancies__card-title">{getTitle(v)}</h4>
                      <p className="vacancies__card-text">{getDesc(v)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="vacancies__card">
              <div className="vacancies__card-icon">💼</div>
              <div className="vacancies__card-info">
                <p className="vacancies__card-text">{t('vacancies.no_open')}</p>
              </div>
            </div>
          )}

          <div className="vacancies__cta">
            <p className="vacancies__cta-text">{t('vacancies.cta')}</p>
            <Button
              variant="outline"
              href="https://t.me/noble_flair_design_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('vacancies.cta')} →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
