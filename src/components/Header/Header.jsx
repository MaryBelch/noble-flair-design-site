import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/I18nContext';
import './Header.css';

export default function Header() {
  const { t, locale, changeLocale, SUPPORTED_LOCALES } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'course', href: '#course' },
    { key: 'services', href: '#services' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'vacancies', href: '#vacancies' },
    { key: 'contact', href: '#contact' },
  ];

  const localeLabels = { uk: 'UA', ru: 'RU', en: 'EN' };

  const handleNavClick = (href) => {
    setMobileOpen(false);
    // smooth scroll already handled by CSS
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#hero" className="header__logo" onClick={() => setMobileOpen(false)}>
          <span className="header__logo-text">NFD</span>
          <span className="header__logo-dot">.</span>
        </a>

        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="header__link gold-border-hover"
              onClick={() => handleNavClick(item.href)}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <div className="header__lang">
            {SUPPORTED_LOCALES.map((l) => (
              <button
                key={l}
                className={`header__lang-btn ${locale === l ? 'header__lang-btn--active' : ''}`}
                onClick={() => changeLocale(l)}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>

          <button
            className={`header__burger ${mobileOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
