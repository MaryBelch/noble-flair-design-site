import { useTranslation } from '../../context/I18nContext';
import { useParams, useNavigate, useEffect } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import Breadcrumb from '../../components/UI/Breadcrumb';
import { trackEvent } from '../../lib/analytics';
import articles from '../../data/blog.json';
import './BlogPost.css';

export default function BlogPost() {
  const { t, locale } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const sectionRef = useScrollReveal([]);

  // Находим статью по ID
  const article = articles.find((article) => article.id === id);

  // Если статья не найдена, перенаправляем на страницу блога
  if (!article) {
    navigate('/blog');
    return null;
  }

  // Функция для получения текста на текущем языке
  const getText = (obj) => obj[locale] || obj.uk;

  // Отслеживание просмотра статьи в аналитике
  useEffect(() => {
    trackEvent('blog_post_view', {
      post_id: id,
      post_title: getText(article.title),
      locale: locale
    });
  }, [id, t, locale, article]);

  return (
    <section id="blog-post" className="section blog-post" ref={sectionRef} role="region" aria-label={t('blog.title')}>
      <div className="container">
        <button
          className="blog-post__back-btn"
          onClick={() => navigate('/blog')}
          aria-label={t('nav.back')}
        >
          ← {t('nav.back')}
        </button>

        <SectionTitle
          titleKey={null}
          subtitleKey={null}
          forceTitle={getText(article.title)}
        />

        <Breadcrumb />

        <div className="blog-post__content">
          <div className="blog-post__header">
            <div className="blog-post__meta">
              <span className="blog-post__date">
                {new Date(article.date).toLocaleDateString(
                  locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'uk-UA',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }
                )}
              </span>
              <span className="blog-post__image" aria-hidden="true">
                {article.image}
              </span>
            </div>
          </div>

          <div className="blog-post__article">
            {getText(article.content).map((paragraph, index) => (
              <p key={index} className="blog-post__paragraph">
                {paragraph}
              }
            ))}
          </div>
        </div>

        {/* Related Content */}
        {article.related && (
          <div className="blog-post__related">
            <h3 className="blog-post__related-title">{t('blog.related_title')}</h3>

            {/* Related Services */}
            {article.related.services && article.related.services.length > 0 && (
              <div className="blog-post__related-services">
                <h4 className="blog-post__related-services-title">{t('blog.related_services')}</h4>
                <div className="blog-post__related-services-list">
                  {article.related.services.map((serviceKey) => (
                    <div key={serviceKey} className="blog-post__related-service-item">
                      <NavLink to="/services" className="blog-post__related-service-link">
                        {t(`services.${serviceKey}`)}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Portfolio Items */}
            {article.related.portfolio && article.related.portfolio.length > 0 && (
              <div className="blog-post__related-portfolio">
                <h4 className="blog-post__related-portfolio-title">{t('blog.related_portfolio')}</h4>
                <div className="blog-post__related-portfolio-list">
                  {article.related.portfolio.map((itemId) => (
                    <div key={itemId} className="blog-post__related-portfolio-item">
                      <NavLink to={`/portfolio/${itemId}`} className="blog-post__related-portfolio-link">
                        {t(`portfolio.title`)}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="blog-post__cta">
          <Button
            href="https://t.me/noble_flair_design_bot?start=consultation_blog"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="blog-post__cta-btn"
          >
            {t('blog.cta_btn')}
          </Button>
          <Button
            href="/blog"
            variant="outline-animated"
            className="blog-post__cta-btn"
          >
            {t('blog.back_to_blog') || t('nav.back')}
          </Button>
        </div>
      </div>
    </section>
    {/* JSON-LD structured data for BlogPost */}
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: getText(article.title),
        description: getText(article.excerpt),
        image: [
          `https://marybelch.github.io/noble-flair-design-site${article.image}`,
          `https://marybelch.github.io/noble-flair-design-site/images/blog/${article.id}.jpg`
        ],
        datePublished: article.date,
        author: {
          '@type': 'Person',
          name: 'Maryna Belch'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Noble Flair Design',
          logo: {
            '@type': 'ImageObject',
            url: 'https://marybelch.github.io/noble-flair-design-site/logo.png'
          }
        },
        url: `${window.location.origin}/blog/${article.id}`
      })}
    </script>
  );
}