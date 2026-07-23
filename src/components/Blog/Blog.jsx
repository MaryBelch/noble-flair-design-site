import { useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import articles from '../../data/blog.json';
import './Blog.css';

export default function Blog() {
  const { t, locale } = useTranslation();
  const sectionRef = useScrollReveal([locale], { threshold: 0.1, stagger: 0.1 });
  const [expandedId, setExpandedId] = useState(null);

  const getText = (obj) => obj[locale] || obj.uk;

  const toggleArticle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="blog" className="section blog" ref={sectionRef} role="region" aria-label={t('blog.title')}>
      <div className="container">
        <SectionTitle titleKey="blog.title" subtitleKey="blog.subtitle" />

        <div className="blog__grid">
          {articles.map((article, i) => (
            <article
              key={article.id}
              className={`blog__card fade-in ${expandedId === article.id ? 'blog__card--expanded' : ''}`}
              style={{ '--card-accent': article.color, transitionDelay: `${i * 0.1}s` }}
            >
              <div className="blog__card-header">
                <span className="blog__card-icon" aria-hidden="true">{article.image}</span>
                <time className="blog__card-date" dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <h3 className="blog__card-title">{getText(article.title)}</h3>
              <p className="blog__card-excerpt">{getText(article.excerpt)}</p>

              {expandedId === article.id && (
                <div className="blog__card-content">
                  <p>{getText(article.content)}</p>
                </div>
              )}

              <div className="blog__card-footer">
                <button
                  className="blog__card-btn"
                  onClick={() => toggleArticle(article.id)}
                  aria-expanded={expandedId === article.id}
                >
                  {expandedId === article.id ? `${t('blog.hide')} ↑` : `${t('blog.read')} →`}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="blog__cta fade-in">
          <p className="blog__cta-text">{t('blog.cta_text')}</p>
          <Button variant="gold" href="#contact">
            {t('blog.cta_btn')}
          </Button>
        </div>
      </div>
    </section>
  );
}