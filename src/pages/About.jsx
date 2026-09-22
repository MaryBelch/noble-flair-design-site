import { lazy, Suspense } from 'react';
import About from '../components/About/About';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function AboutPage() {
  return (
    <>
      <TranslatedErrorBoundary>
        <About />
      </TranslatedErrorBoundary>
    </>
  );
}