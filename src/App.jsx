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
      email: 'noble.flair.design@gmail.com',
      url: 'https://t.me/noble_flair_design_bot',
    },
    sameAs: [
      'https://instagram.com/noble_flair_design',
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
      { '@type': 'Offer', name: 'Базовий', price: '100', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Стандарт', price: '150', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'ВИП', price: '300', priceCurrency: 'USD' },
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
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Як проходить навчання?',
        acceptedAnswer: { '@type': 'Answer', text: 'Курс повністю онлайн. Ви отримуєте доступ до відеоуроків, текстового контенту та додаткових матеріалів на платформі.' },
      },
      {
        '@type': 'Question',
        name: 'Скільки часу потрібно на курс?',
        acceptedAnswer: { '@type': 'Answer', text: 'Курс розрахований на 4-6 тижнів при регулярних заняттях по 2-3 години на тиждень.' },
      },
      {
        '@type': 'Question',
        name: 'Які програми потрібні?',
        acceptedAnswer: { '@type': 'Answer', text: 'Для більшості уроків достатньо PowerPoint або Google Slides. Окремий модуль присвячений Figma.' },
      },
      {
        '@type': 'Question',
        name: 'Чи видаєте ви сертифікат?',
        acceptedAnswer: { '@type': 'Answer', text: 'Так, після завершення курсу ви отримуєте електронний сертифікат.' },
      },
    ],
  },
];

function AppContent() {
  const { t } = useTranslation();
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
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><Course /></TranslatedErrorBoundary></Suspense>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><Testimonials /></TranslatedErrorBoundary></Suspense>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><Portfolio /></TranslatedErrorBoundary></Suspense>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><FAQ /></TranslatedErrorBoundary></Suspense>
            <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}><TranslatedErrorBoundary><Vacancies /></TranslatedErrorBoundary></Suspense>
            <TranslatedErrorBoundary><Contact /></TranslatedErrorBoundary>
          </ErrorBoundary>
        </main>
        <Suspense fallback={<div style={{ minHeight: 100 }} />}><TranslatedErrorBoundary><AdminPanel /></TranslatedErrorBoundary></Suspense>
        <Suspense fallback={<div style={{ minHeight: 100 }} />}><TranslatedErrorBoundary><Footer /></TranslatedErrorBoundary></Suspense>
        <ScrollToTop />
        <SWUpdateNotification />
      </div>

      {/* JSON-LD structured data */}
      {structuredData.map((data, i) => (
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
