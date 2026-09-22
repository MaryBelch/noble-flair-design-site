import { lazy, Suspense } from 'react';
import Services from '../components/Services/Services';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function ServicesPage() {
  return (
    <>
      <TranslatedErrorBoundary>
        <Services />
      </TranslatedErrorBoundary>
    </>
  );
}