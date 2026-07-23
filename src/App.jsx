import { lazy, Suspense, useState, useEffect } from 'react';
import { I18nProvider, useTranslation } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/UI/Toast';
import Header from './components/Header/Header';
import Loader from './components/UI/Loader';
import ScrollToTop from './components/UI/ScrollToTop';
import ProgressBar from './components/UI/ProgressBar';
import ErrorBoundary, { TranslatedErrorBoundary } from './components/UI/ErrorBoundary';
import SWUpdateNotification from './components/UI/SWUpdateNotification';
import AmbientEffects from './components/UI/AmbientEffects';
import Newsletter from './components/Newsletter/Newsletter';
import Instagram from './components/Instagram/Instagram';
import LeadMagnet from './components/LeadMagnet/LeadMagnet';
import Blog from './components/Blog/Blog';
import { trackPageView } from './lib/analytics';
import './styles/global.css';

// Eager-loaded sections
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';

// Lazy-loaded sections (below the fold)
const Course = lazy(() => import('./components/Course/Course'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const Vacancies = lazy(() => import('./components/Vacancies/Vacancies'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const AdminPanel = lazy(() => import('./components/Admin/AdminPanel'));

/** JSON-LD structured data */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Noble Flair Design',
    url: 'https://marybelch.github.io/noble-flair-design-site/',
    description: 'Преміальна дизайн-студія. Розробка презентацій, сайтів, поліграфія та навчання.',
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'maryna.nfd@gmail.com',
      url: 'https://t.me/noble_flair_design_bot',
    },
    sameAs: [
      'https://www.instagram.com/maryna_design_nfd/',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Мистецтво презентацій',
    description: 'Навчіться створювати презентації, які запам\'ятовуються. Від композиції до подачі — повний курс з дизайну презентацій.',
    provider: {
      '@type': 'Organization',
      name: 'Noble Flair Design',
      sameAs: 'https://marybelch.github.io/noble-flair-design-site/',
    },
    offers: [
      { '@type': 'Offer', name: 'Базовий', price: 100, priceCurrency: 'USD', priceValidUntil: '2026-07-31' },
      { '@type': 'Offer', name: 'Стандарт', price: 150, priceCurrency: 'USD', priceValidUntil: '2026-07-31' },
      { '@type': 'Offer', name: 'ВИП', price: 300, priceCurrency: 'USD', priceValidUntil: '2026-07-31' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Noble Flair Design',
    url: 'https://marybelch.github.io/noble-flair-design-site/',
    inLanguage: ['uk', 'ru', 'en'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Дизайн презентацій',
    provider: { '@type': 'Organization', name: 'Noble Flair Design' },
    areaServed: ['UA', 'US', 'EU'],
    description: 'Розробка презентацій преміум-класу для бізнесу, стартапів та освітніх проєктів.',
  },
];

function AppContent() {
  const { t, locale } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Show loader briefly while Firebase / i18n initialises
    const timer = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Track page view on mount
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  // Dynamic SEO title + meta per locale
  useEffect(() => {
    const title = t('seo.title');
    const description = t('seo.description');

    document.title = title;

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    const metaDesc = document.querySelector('meta[name="description"]');

    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', description);
    if (twTitle) twTitle.setAttribute('content', title);
    if (twDesc) twDesc.setAttribute('content', description);
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [locale, t]);

  // Locale-aware FAQ structured data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('faq.course_format_q'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.course_format_a') },
      },
      {
        '@type': 'Question',
        name: t('faq.duration_q'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.duration_a') },
      },
      {
        '@type': 'Question',
        name: t('faq.tools_q'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.tools_a') },
      },
      {
        '@type': 'Question',
        name: t('faq.certificate_q'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.certificate_a') },
      },
    ],
  };

  return (
    <>
      {!ready && <Loader />}
      <a
        href="#main-content"
        className="skip-link"
      >
        {t('nav.skip_link')}
      </a>
      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <AmbientEffects />
        <ProgressBar />
        <Header />
        <main id="main-content">
          <ErrorBoundary>
            <Hero />
            <About />
            <TranslatedErrorBoundary><Services /></TranslatedErrorBoundary>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><Portfolio /></TranslatedErrorBoundary></Suspense>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><Course /></TranslatedErrorBoundary></Suspense>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><Testimonials /></TranslatedErrorBoundary></Suspense>
            <TranslatedErrorBoundary><Instagram /></TranslatedErrorBoundary>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><FAQ /></TranslatedErrorBoundary></Suspense>
            <TranslatedErrorBoundary><Blog /></TranslatedErrorBoundary>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><Vacancies /></TranslatedErrorBoundary></Suspense>
            <TranslatedErrorBoundary><LeadMagnet /></TranslatedErrorBoundary>
            <TranslatedErrorBoundary><Contact /></TranslatedErrorBoundary>
            <TranslatedErrorBoundary><Newsletter /></TranslatedErrorBoundary>
          </ErrorBoundary>
        </main>
        <Suspense fallback={<div style={{ minHeight: 100 }} />}><TranslatedErrorBoundary><AdminPanel /></TranslatedErrorBoundary></Suspense>
        <Suspense fallback={<div style={{ minHeight: 100 }} />}><TranslatedErrorBoundary><Footer /></TranslatedErrorBoundary></Suspense>
        <ScrollToTop />
        <SWUpdateNotification />
      </div>

      {/* JSON-LD structured data */}
      {[...structuredData, faqStructuredData].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <I18nProvider>
          <AppContent />
        </I18nProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
