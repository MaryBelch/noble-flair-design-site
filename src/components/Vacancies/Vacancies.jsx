import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import './Vacancies.css';

export default function Vacancies() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal([]);

  return (
    <section id="vacancies" className="section vacancies" ref={sectionRef}>
      <div className="container">
        <SectionTitle titleKey="vacancies.title" subtitleKey="vacancies.subtitle" />

        <div className="vacancies__content fade-in">
          <p className="vacancies__description">{t('vacancies.description')}</p>

          <div className="vacancies__card">
            <div className="vacancies__card-icon">💼</div>
            <div className="vacancies__card-info">
              <p className="vacancies__card-text">{t('vacancies.no_open')}</p>
            </div>
          </div>

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
