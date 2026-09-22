import { lazy, Suspense } from 'react';
import FAQ from '../components/FAQ/FAQ';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function FAQPage() {
  return (
    <>
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <TranslatedErrorBoundary>
          <FAQ />
        </TranslatedErrorBoundary>
      </Suspense>
    </>
  );
}