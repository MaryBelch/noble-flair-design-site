import { lazy, Suspense } from 'react';
import Vacancies from '../components/Vacancies/Vacancies';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function VacanciesPage() {
  return (
    <>
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <TranslatedErrorBoundary>
          <Vacancies />
        </TranslatedErrorBoundary>
      </Suspense>
    </>
  );
}