import { useState, useRef } from 'react';
import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import { useToast } from '../UI/Toast';
import { saveLead } from '../../firebase/firestore';
import './LeadMagnet.css';

export default function LeadMagnet() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal([]);
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSending(true);
    try {
      await saveLead(name, email);
      setCompleted(true);
      addToast(t('leadMagnet.success'), 'success');
    } catch {
      addToast(t('leadMagnet.error'), 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="lead-magnet" className="section lead-magnet" ref={sectionRef} role="region" aria-label={t('leadMagnet.title')}>
      <div className="container">
        <div className="lead-magnet__card fade-in">
          <div className="lead-magnet__visual">
            <div className="lead-magnet__mockup">
              <div className="lead-magnet__mockup-header">
                <span className="lead-magnet__mockup-dot" style={{ background: '#e74c3c' }} />
                <span className="lead-magnet__mockup-dot" style={{ background: '#f1c40f' }} />
                <span className="lead-magnet__mockup-dot" style={{ background: '#2ecc71' }} />
              </div>
              <div className="lead-magnet__mockup-body">
                <span className="lead-magnet__mockup-badge">ЧЕК-ЛИСТ</span>
                <span className="lead-magnet__mockup-title">Ідеальна презентація</span>
                <div className="lead-magnet__mockup-items">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="lead-magnet__mockup-row">
                      <span className="lead-magnet__mockup-check" />
                      <span className="lead-magnet__mockup-line" style={{ width: `${60 + Math.random() * 30}%` }} />
                    </div>
                  ))}
                </div>
                <div className="lead-magnet__mockup-footer">
                  <div className="lead-magnet__mockup-page">1 / 2</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lead-magnet__form-wrap">
            <div className="lead-magnet__header">
              <SectionTitle titleKey="leadMagnet.title" subtitleKey="leadMagnet.subtitle" align="left" />
              <p className="lead-magnet__description">{t('leadMagnet.description')}</p>
            </div>

            {completed ? (
              <div className="lead-magnet__success fade-in">
                <p className="lead-magnet__success-text">{t('leadMagnet.success')}</p>
                <Button
                  variant="gold"
                  href="/noble-flair-design-site/checklist.html"
                >
                  📄 {t('leadMagnet.download_btn')}
                </Button>
              </div>
            ) : (
              <form className="lead-magnet__form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="lead-magnet__input"
                  placeholder={t('leadMagnet.name_placeholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="lead-magnet__input"
                  placeholder={t('leadMagnet.email_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button variant="gold" type="submit" disabled={sending}>
                  {sending ? t('leadMagnet.sending') : t('leadMagnet.btn')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
