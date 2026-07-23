import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import './Instagram.css';

const CATEGORIES = [
  { key: 'post1', icon: '📊', gradient: 'linear-gradient(135deg, #D4AF37, #B8892F)' },
  { key: 'post2', icon: '🎨', gradient: 'linear-gradient(135deg, #2a1a5e, #6b2fa0)' },
  { key: 'post3', icon: '📄', gradient: 'linear-gradient(135deg, #1a3a5e, #2f80a0)' },
  { key: 'post4', icon: '💎', gradient: 'linear-gradient(135deg, #5e1a3a, #a02f6b)' },
  { key: 'post5', icon: '✨', gradient: 'linear-gradient(135deg, #1a5e2a, #2fa06b)' },
  { key: 'post6', icon: '🌟', gradient: 'linear-gradient(135deg, #5e4a1a, #a0802f)' },
];

const INSTAGRAM_URL = 'https://www.instagram.com/maryna_design_nfd/';

export default function Instagram() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal([]);

  return (
    <section id="instagram" className="section instagram" ref={sectionRef} role="region" aria-label={t('instagram.title')}>
      <div className="container">
        <SectionTitle titleKey="instagram.title" subtitleKey="instagram.subtitle" />

        <div className="instagram__grid">
          {CATEGORIES.map(({ key, icon, gradient }) => (
            <a
              key={key}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram__card fade-in"
              style={{ '--card-gradient': gradient }}
            >
              <div className="instagram__card-bg" />
              <div className="instagram__card-content">
                <span className="instagram__card-icon">{icon}</span>
                <span className="instagram__card-label">{t(`instagram.posts.${key}`)}</span>
              </div>
              <div className="instagram__card-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="instagram__cta fade-in">
          <Button variant="gold" href={INSTAGRAM_URL}>
            {t('instagram.follow')} — {t('instagram.follow_username')}
          </Button>
        </div>
      </div>
    </section>
  );
}
