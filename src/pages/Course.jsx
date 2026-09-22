import { lazy, Suspense } from 'react';
import Course from '../components/Course/Course';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function CoursePage() {
  return (
    <>
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <TranslatedErrorBoundary>
          <Course />
        </TranslatedErrorBoundary>
      </Suspense>
    </>
  );
}