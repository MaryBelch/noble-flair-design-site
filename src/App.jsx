import { lazy, Suspense, useState, useEffect } from 'react';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Loader from './components/UI/Loader';
import ScrollToTop from './components/UI/ScrollToTop';
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

function AppContent() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Show loader briefly while Firebase / i18n initialises
    const timer = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!ready && <Loader />}
      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <Header />
        <main>
          <Hero />
          <About />
          <Suspense fallback={null}><Course /></Suspense>
          <Services />
          <Suspense fallback={null}><Testimonials /></Suspense>
          <Suspense fallback={null}><Portfolio /></Suspense>
          <Suspense fallback={null}><FAQ /></Suspense>
          <Suspense fallback={null}><Vacancies /></Suspense>
          <Suspense fallback={null}><Contact /></Suspense>
        </main>
        <Suspense fallback={null}><AdminPanel /></Suspense>
        <Suspense fallback={null}><Footer /></Suspense>
        <ScrollToTop />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </AuthProvider>
  );
}
