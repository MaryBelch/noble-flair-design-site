import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Portfolio from '../components/Portfolio/Portfolio';
import PortfolioItem from '../components/Portfolio/PortfolioItem';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function PortfolioPage() {
  const { id } = useParams();

  return (
    <>
      <Suspense fallback={<div className="section"><div className="container" style={{ minHeight: 200 }} /></div>}>
        <TranslatedErrorBoundary>
          {id ? <PortfolioItem /> : <Portfolio />}
        </TranslatedErrorBoundary>
      </Suspense>
    </>
  );
}