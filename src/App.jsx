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
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Eager-loaded sections
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';

// Page components
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/Services'));
const PortfolioPage = lazy(() => import('./pages/Portfolio'));
const CoursePage = lazy(() => import('./pages/Course'));
const TestimonialsPage = lazy(() => import('./pages/Testimonials'));
const FAQPage = lazy(() => import('./pages/FAQ'));
const BlogPage = lazy(() => import('./pages/Blog'));
const VacanciesPage = lazy(() => import('./pages/Vacancies'));
const ContactPage = lazy(() => import('./pages/Contact'));
const FounderPage = lazy(() => import('./pages/Founder'));

// Lazy-loaded sections (for home page)
const LazyCourse = lazy(() => import('./components/Course/Course'));
const LazyTestimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const LazyPortfolio = lazy(() => import('./components/Portfolio/Portfolio'));
const LazyFAQ = lazy(() => import('./components/FAQ/FAQ'));
const LazyVacancies = lazy(() => import('./components/Vacancies/Vacancies'));
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
        name: t('faq.how_order_q'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.how_order_a') },
      },
      {
        '@type': 'Question',
        name: t('faq.payment_q'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.payment_a') },
      },
      {
        '@type': 'Question',
        name: t('faq.timing_q'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.timing_a') },
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
        <Router>
          <AmbientEffects />
          <ProgressBar />
          <Header />
          <main id="main-content">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/founder" element={<FounderPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/course" element={<CoursePage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/vacancies" element={<VacanciesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                {/* Redirect unknown paths to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Suspense fallback={<div style={{ minHeight: 100 }} />}><TranslatedErrorBoundary><AdminPanel /></TranslatedErrorBoundary></Suspense>
          <Suspense fallback={<div style={{ minHeight: 100 }} />}><TranslatedErrorBoundary><Footer /></TranslatedErrorBoundary></Suspense>
          <ScrollToTop />
          <SWUpdateNotification />
        </Router>
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
