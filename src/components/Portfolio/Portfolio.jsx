import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import SectionTitle from '../UI/SectionTitle';
import portfolio from '../../data/portfolio.json';
import './Portfolio.css';

const CATEGORIES = ['all', 'presentations', 'banners', 'printing', 'epoxy'];

export default function Portfolio() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filtered, setFiltered] = useState(portfolio);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFiltered(portfolio);
    } else {
      setFiltered(portfolio.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-in').forEach((child) => child.classList.add('visible'));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="section portfolio" ref={ref}>
      <div className="container">
        <SectionTitle titleKey="portfolio.title" subtitleKey="portfolio.subtitle" />

        <div className="portfolio__filters fade-in">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`portfolio__filter-btn ${activeCategory === cat ? 'portfolio__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {t(`portfolio.${cat}`)}
            </button>
          ))}
        </div>

        <div className="portfolio__grid">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="portfolio__item fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="portfolio__item-image">
                <div className="portfolio__item-placeholder">
                  <span className="portfolio__item-icon">
                    {item.category === 'presentations' ? '📊' :
                     item.category === 'banners' ? '🎨' :
                     item.category === 'printing' ? '🖨️' : '💎'}
                  </span>
                </div>
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
