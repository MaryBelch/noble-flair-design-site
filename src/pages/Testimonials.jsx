import { lazy, Suspense } from 'react';
import Testimonials from '../components/Testimonials/Testimonials';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function TestimonialsPage() {
  return (
    <>
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <TranslatedErrorBoundary>
          <Testimonials />
        </TranslatedErrorBoundary>
      </Suspense>
    </>
  );
}