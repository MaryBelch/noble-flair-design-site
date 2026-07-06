import { useState, useRef } from 'react';
import { useTranslation } from '../../context/I18nContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../UI/Toast';
import { saveContactMessage } from '../../firebase/firestore';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import './Contact.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MS = 30000; // 30 seconds between submissions

export default function Contact() {
  const { t, locale } = useTranslation();
  const { user } = useAuth();
  const addToast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const lastSubmit = useRef(0);

  const validate = (data) => {
    const errs = {};
    if (!data.name || data.name.trim().length < 2) {
      errs.name = t('contact.form_name_error');
    }
    if (!data.contact || !EMAIL_RE.test(data.contact)) {
      errs.contact = t('contact.form_email_error');
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      message: formData.get('message'),
    };

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Rate limiting (client-side)
    const now = Date.now();
    if (now - lastSubmit.current < RATE_LIMIT_MS) {
      addToast(t('contact.form_rate_limit'), 'warning');
      return;
    }

    setSending(true);
    setError(false);

    try {
      await saveContactMessage({
        name: data.name,
        contact: data.contact,
        message: data.message || '',
        locale,
        userId: user?.uid || null,
        userEmail: user?.email || null,
      });

      // Also send to Telegram bot as before
      window.open(`https://t.me/noble_flair_design_bot?start=contact_${encodeURIComponent(data.name)}`, '_blank');

      lastSubmit.current = Date.now();
      setSubmitted(true);
      addToast(t('contact.form_success'), 'success');
      e.target.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error saving message:', err);
      setError(true);
      addToast(t('contact.form_error'), 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact" role="region" aria-label={t('contact.title')}>
      <div className="container">
        <SectionTitle titleKey="contact.title" subtitleKey="contact.subtitle" />

        <div className="contact__content">
          <div className="contact__info fade-in">
            <p className="contact__description">{t('contact.description')}</p>

            <div className="contact__brief-cta">
              <p>{t('contact.brief_cta')}</p>
              <a
                href="https://t.me/noble_flair_design_bot?start=brief"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__brief-btn"
              >
                {t('contact.brief_btn')} →
              </a>
            </div>

            <div className="contact__links">
              <a
                href="https://t.me/noble_flair_design_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link card-hover"
              >
                <div className="contact__link-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.087.669.087.669l-1.188 6.113s-.176.523-.682.523a.834.834 0 0 1-.565-.277l-3.118-2.503-1.302.99a.44.44 0 0 1-.404.108l-.538-2.502-2.246-.78s-.308-.141-.316-.331c-.009-.19.262-.302.262-.302l8.909-3.27s.643-.26.643-.183z"/>
                  </svg>
                </div>
                <div>
                  <strong>{t('contact.telegram')}</strong>
                  <span>@noble_flair_design_bot</span>
                </div>
              </a>

              <a
                href="https://instagram.com/noble_flair_design"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link card-hover"
              >
                <div className="contact__link-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </div>
                <div>
                  <strong>Instagram</strong>
                  <span>@noble_flair_design</span>
                </div>
              </a>

              <a href="mailto:noble.flair.design@gmail.com" className="contact__link card-hover">
                <div className="contact__link-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 4l10 8 10-8"/>
                  </svg>
                </div>
                <div>
                  <strong>{t('contact.email')}</strong>
                  <span>noble.flair.design@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          <div className="contact__form-wrapper fade-in">
            <div className="contact__form-card">
              <h3 className="contact__form-title">{t('contact.form_submit')}</h3>
              {submitted ? (
                <p className="contact__form-success">{t('contact.form_success')}</p>
              ) : error ? (
                <p className="contact__form-error">{t('contact.form_error')}</p>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit} noValidate>
                  <div className="contact__form-field">
                    <input
                      type="text"
                      name="name"
                      placeholder={t('contact.form_name_placeholder')}
                      className={`contact__form-input${fieldErrors.name ? ' contact__form-input--error' : ''}`}
                      aria-invalid={fieldErrors.name ? 'true' : undefined}
                      aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                      required
                    />
                    {fieldErrors.name && <span className="contact__field-error" id="contact-name-error" role="alert">{fieldErrors.name}</span>}
                  </div>
                  <div className="contact__form-field">
                    <input
                      type="email"
                      name="contact"
                      placeholder={t('contact.form_email_placeholder')}
                      className={`contact__form-input${fieldErrors.contact ? ' contact__form-input--error' : ''}`}
                      aria-invalid={fieldErrors.contact ? 'true' : undefined}
                      aria-describedby={fieldErrors.contact ? 'contact-email-error' : undefined}
                      required
                    />
                    {fieldErrors.contact && <span className="contact__field-error" id="contact-email-error" role="alert">{fieldErrors.contact}</span>}
                  </div>
                  <div className="contact__form-field">
                    <textarea
                      name="message"
                      placeholder={t('contact.form_message')}
                      className="contact__form-input contact__form-textarea"
                      rows={4}
                    />
                  </div>
                  <Button variant="primary" type="submit" className="contact__form-btn" disabled={sending}>
                    {sending ? '...' : t('contact.form_submit')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
