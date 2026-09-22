import { lazy, Suspense } from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import { LazyLoad } from '../components/UI/LazyLoad';
import Newsletter from '../components/Newsletter/Newsletter';
import Instagram from '../components/Instagram/Instagram';
import LeadMagnet from '../components/LeadMagnet/LeadMagnet';
import Blog from '../components/Blog/Blog';
import Footer from '../components/Footer/Footer';

const LazyCourse = lazy(() => import('../components/Course/Course'));
const LazyTestimonials = lazy(() => import('../components/Testimonials/Testimonials'));
const LazyPortfolio = lazy(() => import('../components/Portfolio/Portfolio'));
const LazyFAQ = lazy(() => import('../components/FAQ/FAQ'));
const LazyVacancies = lazy(() => import('../components/Vacancies/Vacancies'));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <LazyPortfolio />
      </Suspense>
      <Instagram />
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <LazyCourse />
      </Suspense>
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <LazyTestimonials />
      </Suspense>
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <LazyFAQ />
      </Suspense>
      <Blog />
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <LazyVacancies />
      </Suspense>
      <LeadMagnet />
      <Newsletter />
      <Footer />
    </>
  );
}