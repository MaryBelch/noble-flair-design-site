import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal([]);

  return (
    <footer className="footer" ref={sectionRef} role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#hero" className="footer__logo">
            <span className="footer__logo-text">Noble Flair Design</span>
            <span className="footer__logo-dot">.</span>
          </a>
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>

        <div className="footer__nav">
          <h4 className="footer__nav-title">{t('footer.navigation')}</h4>
          <nav>
            <a href="#about">{t('nav.about')}</a>
            <a href="#services">{t('nav.services')}</a>
            <a href="#portfolio">{t('nav.portfolio')}</a>
            <a href="#course">{t('nav.course')}</a>
            <a href="#contact">{t('nav.contact')}</a>
          </nav>
        </div>

        <div className="footer__social">
          <h4 className="footer__nav-title">{t('contact.subtitle')}</h4>
          <div className="footer__social-links">
            <a href="https://t.me/noble_flair_design_bot" target="_blank" rel="noopener noreferrer" title="Telegram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.087.669.087.669l-1.188 6.113s-.176.523-.682.523a.834.834 0 0 1-.565-.277l-3.118-2.503-1.302.99a.44.44 0 0 1-.404.108l-.538-2.502-2.246-.78s-.308-.141-.316-.331c-.009-.19.262-.302.262-.302l8.909-3.27s.643-.26.643-.183z"/>
              </svg>
            </a>
            <a href="https://instagram.com/noble_flair_design" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="mailto:noble.flair.design@gmail.com" title="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 4l10 8 10-8"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
