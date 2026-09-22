import { useTranslation } from '../../context/I18nContext';
import { useParams, useNavigate } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Breadcrumb from '../../components/UI/Breadcrumb';
import { trackEvent } from '../../lib/analytics';
import portfolio from '../../data/portfolio.json';
import './PortfolioItem.css';

export default function PortfolioItem() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const sectionRef = useScrollReveal([]);

  // Convert id to number for comparison
  const itemId = parseInt(id, 10);
  const item = portfolio.find((item) => item.id === itemId);

  // If item not found, redirect to portfolio grid
  if (!item) {
    navigate('/portfolio');
    return null;
  }

  return (
    <section id="portfolio-item" className="section portfolio-item" ref={sectionRef} role="region" aria-label={t('portfolio.title')}>
      <div className="container">
        <button
          className="portfolio-item__back-btn"
          onClick={() => navigate('/portfolio')}
          aria-label={t('nav.back')}
        >
          ← {t('nav.back')}
        </button>

        <SectionTitle
          titleKey={null}
          subtitleKey={null}
          forceTitle={item.title}
        />

        <Breadcrumb />

        <div className="portfolio-item__content">
          <div className="portfolio-item__image-container">
            <img
              src={item.image}
              alt={item.title}
              className="portfolio-item__image"
            />
            <div className="portfolio-item__image-overlay">
              <div className="portfolio-item__meta">
                <span className="portfolio-item__year">{item.year}</span>
                <span className="portfolio-item__category">{t(`portfolio.${item.category}`)}</span>
              </div>
            </div>
          </div>

          <div className="portfolio-item__details">
            <h2 className="portfolio-item__details-title">{t('portfolio.details')}</h2>
            <p className="portfolio-item__description">
              {/* In a real implementation, this would come from extended data */}
              {t(`portfolio.description_${item.id}`) || t('portfolio.description_default')}
            </p>

            <div className="portfolio-item__info-grid">
              <div className="portfolio-item__info-item">
                <h3>{t('portfolio.info.client')}</h3>
                <p>{t(`portfolio.client_${item.id}`) || t('portfolio.info.client_default')}</p>
              </div>

              <div className="portfolio-item__info-item">
                <h3>{t('portfolio.info.challenge')}</h3>
                <p>{t(`portfolio.challenge_${item.id}`) || t('portfolio.info.challenge_default')}</p>
              </div>

              <div className="portfolio-item__info-item">
                <h3>{t('portfolio.info.solution')}</h3>
                <p>{t(`portfolio.solution_${item.id}`) || t('portfolio.info.solution_default')}</p>
              </div>

              <div className="portfolio-item__info-item">
                <h3>{t('portfolio.info.results')}</h3>
                <p>{t(`portfolio.results_${item.id}`) || t('portfolio.info.results_default')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="portfolio-item__cta">
          <a
            href="https://t.me/noble_flair_design_bot?start=consultation_portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary portfolio-item__cta-btn"
          >
            {t('portfolio.cta_button')}
          </a>
          <a
            href="/portfolio"
            className="btn btn--outline-animated portfolio-item__cta-btn"
          >
            {t('nav.back_to_portfolio')}
          </a>
        </div>
      </div>
    </section>
    {/* JSON-LD structured data for PortfolioItem */}
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VisualArtwork',
        name: item.title,
        description: t(`portfolio.description_${item.id}`) || t('portfolio.description_default'),
        image: [
          `https://marybelch.github.io/noble-flair-design-site${item.image}`
        ],
        dateCreated: item.year,
        creator: {
          '@type': 'Organization',
          name: 'Noble Flair Design'
        },
        keywords: [
          t(`portfolio.${item.category}`),
          'design',
          'portfolio'
        ]
      })}
    </script>
  );
}