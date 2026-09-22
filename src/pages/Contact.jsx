import Contact from '../components/Contact/Contact';
import Newsletter from '../components/Newsletter/Newsletter';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function ContactPage() {
  return (
    <>
      <TranslatedErrorBoundary>
        <Contact />
      </TranslatedErrorBoundary>
      <Newsletter />
    </>
  );
}