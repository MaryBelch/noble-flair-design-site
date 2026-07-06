import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import portfolio from '../../data/portfolio.json';
import './Portfolio.css';

const CATEGORIES = ['all', 'presentations', 'banners', 'printing', 'epoxy'];

const GRADIENTS = {
  presentations: 'linear-gradient(135deg, #D4AF37 0%, #8B6914 50%, #3d2b0a 100%)',
  banners: 'linear-gradient(135deg, #2a1f5e 0%, #6B3FA0 50%, #2a1f5e 100%)',
  printing: 'linear-gradient(135deg, #1a3a3a 0%, #2d6a6a 50%, #1a3a3a 100%)',
  epoxy: 'linear-gradient(135deg, #3d0f3d 0%, #8B146A 50%, #3d0f3d 100%)',
};

const ICONS = {
  presentations: '📊',
  banners: '🎯',
  printing: '📄',
  epoxy: '💎',
};

function PlaceholderImage({ category, title }) {
  const { t } = useTranslation();
  const catLabel = t(`portfolio.${category}`);
  return (
    <div
      className="portfolio__item-placeholder"
      style={{ background: GRADIENTS[category] || GRADIENTS.presentations }}
      aria-label={`${catLabel}: ${title}`}
      role="img"
    >
      <div className="portfolio__placeholder-content">
        <span className="portfolio__placeholder-icon" aria-hidden="true">{ICONS[category] || '✨'}</span>
        <span className="portfolio__placeholder-cat">{catLabel}</span>
        <span className="portfolio__placeholder-title">{title}</span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filtered, setFiltered] = useState(portfolio);
  const [animating, setAnimating] = useState(false);
  const prevCategory = useRef('all');

  useEffect(() => {
    // Animate out, then swap data, then animate in
    if (activeCategory === prevCategory.current) return;

    setAnimating(true);
    const timeout = setTimeout(() => {
      if (activeCategory === 'all') {
        setFiltered(portfolio);
      } else {
        setFiltered(portfolio.filter((item) => item.category === activeCategory));
      }
      prevCategory.current = activeCategory;
      // Small delay to trigger re-render before removing animation class
      requestAnimationFrame(() => {
        setAnimating(false);
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [activeCategory]);

  return (
    <section id="portfolio" className="section portfolio" ref={sectionRef}>
      <div className="container">
        <SectionTitle titleKey="portfolio.title" subtitleKey="portfolio.subtitle" />

        <div className="portfolio__filters fade-in" role="tablist" aria-label="Категорії портфоліо">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`portfolio__filter-btn ${activeCategory === cat ? 'portfolio__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls="portfolio-grid"
            >
              {t(`portfolio.${cat}`)}
            </button>
          ))}
        </div>

        <div
          id="portfolio-grid"
          className={`portfolio__grid ${animating ? 'portfolio__grid--animating' : ''}`}
          role="tabpanel"
        >
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="portfolio__item"
              style={animating ? {} : { animationDelay: `${i * 0.06}s` }}
            >
              <div className="portfolio__item-image">
                <PlaceholderImage category={item.category} title={item.title} />
                <div className="portfolio__item-overlay">
                  <span className="portfolio__item-view">↗</span>
                </div>
              </div>
              <div className="portfolio__item-info">
                <h3 className="portfolio__item-title">{item.title}</h3>
                <span className="portfolio__item-category">{t(`portfolio.${item.category}`)}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="portfolio__empty">Немає робіт у цій категорії</p>
        )}
      </div>
    </section>
  );
}
