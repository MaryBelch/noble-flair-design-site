import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from '../../context/I18nContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../Auth/AuthModal';
import './Header.css';

/** Smooth-scroll to a section with header offset */
function scrollToSection(href) {
  const target = document.querySelector(href);
  if (!target) return;
  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Header() {
  const { t, locale, changeLocale, SUPPORTED_LOCALES } = useTranslation();
  const { user, userDoc, loading, logout, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'course', href: '#course' },
    { key: 'testimonials', href: '#testimonials' },
    { key: 'faq', href: '#faq' },
    { key: 'vacancies', href: '#vacancies' },
    { key: 'contact', href: '#contact' },
  ];

  const localeLabels = { uk: 'UA', ru: 'RU', en: 'EN' };

  /* ── Scroll event for header background ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active nav link via IntersectionObserver ── */
  useEffect(() => {
    let observer = null;

    const setupObserver = () => {
      // Disconnect previous observer if re-setting up
      if (observer) observer.disconnect();

      const sectionEls = navItems
        .map((item) => document.querySelector(item.href))
        .filter(Boolean);

      if (sectionEls.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-72px 0px -50% 0px' }
      );

      sectionEls.forEach((el) => observer.observe(el));
    };

    setupObserver();

    // Watch for lazy-loaded sections appearing in the DOM
    const mo = new MutationObserver(() => setupObserver());
    const target = document.getElementById('main-content') || document.body;
    mo.observe(target, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mo.disconnect();
    };
  }, []);

  /* ── Focus trap for mobile nav ── */
  useEffect(() => {
    if (!mobileOpen) return;

    // Focus the first nav link when mobile menu opens
    const firstLink = navRef.current?.querySelector('.header__link');
    firstLink?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        burgerRef.current?.focus();
        return;
      }

      // Trap Tab focus within the nav
      if (e.key === 'Tab') {
        const focusable = navRef.current?.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  /* ── Close mobile nav on resize past breakpoint ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Close profile on click outside ── */
  useEffect(() => {
    if (!showProfile) return;
    const handler = (e) => {
      if (!e.target.closest('.header__profile-dropdown') && !e.target.closest('.header__user-info')) {
        setShowProfile(false);
      }
    };
    // Delay to avoid the same click that opened it
    setTimeout(() => document.addEventListener('click', handler), 0);
    return () => document.removeEventListener('click', handler);
  }, [showProfile]);

  /* ── Swipe left to close mobile nav ── */
  useEffect(() => {
    if (!mobileOpen) return;
    let startX = 0;

    const onTouchStart = (e) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx < -60) setMobileOpen(false);
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [mobileOpen]);

  /* ── Lock body scroll when mobile nav is open ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    setShowProfile(false);
    scrollToSection(href);
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
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="container header__inner">
        <a href="#hero" className="header__logo" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}>
          <span className="header__logo-text">NFD</span>
          <span className="header__logo-dot">.</span>
        </a>

        {/* Overlay behind mobile nav */}
        <div
          className={`header__overlay ${mobileOpen ? 'header__overlay--visible' : ''}`}
          onClick={() => {
            setMobileOpen(false);
            burgerRef.current?.focus();
          }}
          aria-hidden="true"
          tabIndex={-1}
        />

        <nav
          ref={navRef}
          className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`}
          aria-label="Main navigation"
          role="navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`header__link gold-border-hover ${activeSection === item.href.slice(1) ? 'header__link--active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
              aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              tabIndex={mobileOpen ? 0 : undefined}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <div className="header__auth">
            {loading ? null : user ? (
              <div className="header__user">
                <div className="header__user-info" onClick={() => setShowProfile((p) => !p)}>
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
                  <div className="header__profile-dropdown" role="menu">
                    {userDoc?.tariff && (
                      <div className="header__profile-row" role="menuitem">
                        <span className="header__profile-label">{t('profile.tariff')}:</span>
                        <span className="header__profile-value">
                          {tariffLabels[userDoc.tariff] || userDoc.tariff}
                        </span>
                      </div>
                    )}
                    {(userDoc?.tariff && tariffLabels[userDoc.tariff] !== 'vip') && remainingDays !== null && (
                      <div className="header__profile-row" role="menuitem">
                        <span className="header__profile-label">{t('profile.access')}:</span>
                        <span className={`header__profile-value ${remainingDays <= 14 ? 'header__profile-value--warning' : ''}`}>
                          {remainingDays > 0 ? `${remainingDays} ${t('profile.days_short')}` : t('admin.access_no')}
                        </span>
                      </div>
                    )}
                    {userDoc?.tariff === 'vip' && (
                      <div className="header__profile-row" role="menuitem">
                        <span className="header__profile-label">{t('profile.access')}:</span>
                        <span className="header__profile-value" style={{ color: '#2ecc71' }}>{t('profile.forever')}</span>
                      </div>
                    )}
                    <div className="header__profile-row" role="menuitem">
                      <span className="header__profile-label">Email:</span>
                      <span className="header__profile-value" style={{ fontSize: '0.8rem' }}>{user.email}</span>
                    </div>
                    {isAdmin && (
                      <a href="#admin" className="header__profile-admin-link" onClick={() => setShowProfile(false)} role="menuitem">
                        {t('profile.admin_panel')}
                      </a>
                    )}
                    <button className="header__profile-logout" onClick={logout} role="menuitem">{t('profile.logout')}</button>
                  </div>
                )}

                {isAdmin && (
                  <a href="#admin" className="header__admin-link gold-border-hover">
                    {t('nav.admin')}
                  </a>
                )}
                <button className="header__logout-btn" onClick={logout} title={t('profile.logout')} aria-label={t('profile.logout')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button className="header__login-btn" onClick={() => setShowAuth(true)}>
                {t('nav.login') || 'Увійти'}
              </button>
            )}
          </div>

          <div className="header__lang" role="radiogroup" aria-label={t('header.lang_aria')}>
            {SUPPORTED_LOCALES.map((l) => (
              <button
                key={l}
                className={`header__lang-btn ${locale === l ? 'header__lang-btn--active' : ''}`}
                onClick={() => changeLocale(l)}
                role="radio"
                aria-checked={locale === l}
                aria-label={l === 'uk' ? 'Українська' : l === 'ru' ? 'Русский' : 'English'}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>

          <button
            ref={burgerRef}
            className={`header__burger ${mobileOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t('header.close_menu') : t('header.open_menu')}
            aria-expanded={mobileOpen}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </header>
  );
}
