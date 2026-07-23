import { useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import { saveSubscriber } from '../../firebase/firestore';
import './Newsletter.css';

export default function Newsletter() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal([]);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');
    try {
      await saveSubscriber(email.trim());
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="newsletter" className="section newsletter" ref={sectionRef} role="region" aria-label={t('newsletter.title')}>
      <div className="container">
        <SectionTitle titleKey="newsletter.title" subtitleKey="newsletter.subtitle" />

        <div className="newsletter__content fade-in">
          <p className="newsletter__description">{t('newsletter.description')}</p>

          <form className="newsletter__form" onSubmit={handleSubmit}>
            <div className="newsletter__field">
              <input
                type="email"
                className="newsletter__input"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label={t('newsletter.placeholder')}
                disabled={status === 'sending'}
              />
              <Button
                variant="primary"
                type="submit"
                className="newsletter__btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? '...' : t('newsletter.btn')}
              </Button>
            </div>

            {status === 'success' && (
              <p className="newsletter__msg newsletter__msg--success" role="status">{t('newsletter.success')}</p>
            )}
            {status === 'error' && (
              <p className="newsletter__msg newsletter__msg--error" role="alert">{t('newsletter.error')}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
