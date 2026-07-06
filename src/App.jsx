import { lazy, Suspense, useState, useEffect } from 'react';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/UI/Toast';
import Header from './components/Header/Header';
import Loader from './components/UI/Loader';
import ScrollToTop from './components/UI/ScrollToTop';
import ProgressBar from './components/UI/ProgressBar';
import ErrorBoundary from './components/UI/ErrorBoundary';
import { trackPageView } from './lib/analytics';
import './styles/global.css';

// Eager-loaded sections
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';

// Lazy-loaded sections (below the fold)
const Course = lazy(() => import('./components/Course/Course'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const Vacancies = lazy(() => import('./components/Vacancies/Vacancies'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const AdminPanel = lazy(() => import('./components/Admin/AdminPanel'));

/** JSON-LD structured data for local business / org */
const structuredData = {
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
};

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      Перейти до вмісту
    </a>
  );
}

function AppContent() {
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
      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <SkipLink />
        <ProgressBar />
        <Header />
        <main id="main-content">
          <Hero />
          <About />
          <Suspense fallback={null}><ErrorBoundary><Course /></ErrorBoundary></Suspense>
          <Services />
          <Suspense fallback={null}><ErrorBoundary><Testimonials /></ErrorBoundary></Suspense>
          <Suspense fallback={null}><ErrorBoundary><Portfolio /></ErrorBoundary></Suspense>
          <Suspense fallback={null}><ErrorBoundary><FAQ /></ErrorBoundary></Suspense>
          <Suspense fallback={null}><ErrorBoundary><Vacancies /></ErrorBoundary></Suspense>
          <Suspense fallback={null}><ErrorBoundary><Contact /></ErrorBoundary></Suspense>
        </main>
        <Suspense fallback={null}><ErrorBoundary><AdminPanel /></ErrorBoundary></Suspense>
        <Suspense fallback={null}><ErrorBoundary><Footer /></ErrorBoundary></Suspense>
        <ScrollToTop />
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
