import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/I18nContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../Auth/AuthModal';
import './Header.css';

export default function Header() {
  const { t, locale, changeLocale, SUPPORTED_LOCALES } = useTranslation();
  const { user, userDoc, loading, logout, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
    { key: 'faq', href: '#faq' },
    { key: 'vacancies', href: '#vacancies' },
    { key: 'contact', href: '#contact' },
  ];

  const localeLabels = { uk: 'UA', ru: 'RU', en: 'EN' };

  const handleNavClick = (href) => {
    setMobileOpen(false);
  };

  /** Calculate remaining access days */
  const getRemainingDays = () => {
    if (!userDoc?.accessExpiresAt) return null;
    const expires = userDoc.accessExpiresAt.toDate
      ? userDoc.accessExpiresAt.toDate()
      : new Date(userDoc.accessExpiresAt);
    const diff = expires.getTime() - Date.now();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const tariffLabels = { basic: 'Базовий', standard: 'Стандарт', vip: 'ВИП' };
  const tariffColors = { basic: '#2ecc71', standard: '#D4AF37', vip: '#e74c3c' };
  const remainingDays = getRemainingDays();

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
          <div className="header__auth">
            {loading ? null : user ? (
              <div className="header__user">
                <div className="header__user-info" onClick={() => setShowProfile(!showProfile)}>
                  <span className="header__user-name" title={user.email}>
                    {userDoc?.name || user.email?.split('@')[0] || 'User'}
                  </span>
                  {userDoc?.tariff && (
                    <span
                      className="header__user-tariff"
                      style={{ borderColor: tariffColors[userDoc.tariff] || '#888' }}
                    >
                      {tariffLabels[userDoc.tariff] || userDoc.tariff}
                    </span>
                  )}
                </div>

                {showProfile && (
                  <div className="header__profile-dropdown">
                    {userDoc?.tariff && (
                      <div className="header__profile-row">
                        <span className="header__profile-label">Тариф:</span>
                        <span className="header__profile-value">
                          {tariffLabels[userDoc.tariff] || userDoc.tariff}
                        </span>
                      </div>
                    )}
                    {(userDoc?.tariff && tariffLabels[userDoc.tariff] !== 'ВИП') && remainingDays !== null && (
                      <div className="header__profile-row">
                        <span className="header__profile-label">Доступ:</span>
                        <span className={`header__profile-value ${remainingDays <= 14 ? 'header__profile-value--warning' : ''}`}>
                          {remainingDays > 0 ? `${remainingDays} дн.` : 'Закінчився'}
                        </span>
                      </div>
                    )}
                    {userDoc?.tariff === 'vip' && (
                      <div className="header__profile-row">
                        <span className="header__profile-label">Доступ:</span>
                        <span className="header__profile-value" style={{ color: '#2ecc71' }}>Назавжди</span>
                      </div>
                    )}
                    <div className="header__profile-row">
                      <span className="header__profile-label">Email:</span>
                      <span className="header__profile-value" style={{ fontSize: '0.8rem' }}>{user.email}</span>
                    </div>
                    {isAdmin && (
                      <a href="#admin" className="header__profile-admin-link">Адмін-панель</a>
                    )}
                    <button className="header__profile-logout" onClick={logout}>Вийти</button>
                  </div>
                )}

                {isAdmin && (
                  <a href="#admin" className="header__admin-link gold-border-hover">
                    Адмін
                  </a>
                )}
                <button className="header__logout-btn" onClick={logout} title="Вийти">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button className="header__login-btn" onClick={() => setShowAuth(true)}>
                Увійти
              </button>
            )}
          </div>

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

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </header>
  );
}
