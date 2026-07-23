import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/I18nContext';
import { resetPassword } from '../../firebase/auth';
import { trackEvent } from '../../lib/analytics';
import Button from '../UI/Button';
import './AuthModal.css';

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const { t } = useTranslation();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Close on Escape key + focus trap
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);

    // Auto-focus first input
    setTimeout(() => firstInputRef.current?.focus(), 100);

    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Focus trap: Tab cycles within the modal
  const handleKeyDown = (e) => {
    if (e.key !== 'Tab' || !modalRef.current) return;

    const focusable = modalRef.current.querySelectorAll(
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setResetSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      if (mode === 'register') {
        if (password !== confirm) {
          setError(t('auth.error_password_mismatch'));
          setBusy(false);
          return;
        }
        if (password.length < 6) {
          setError(t('auth.error_password_length'));
          setBusy(false);
          return;
        }
        await register(name, email, password);
      } else if (mode === 'reset') {
        await resetPassword(email);
        setResetSent(true);
        setBusy(false);
        return;
      } else {
        await login(email, password);
      }
      trackEvent('auth', mode, null);
      onClose();
    } catch (err) {
      const code = err.code;
      if (code === 'auth/email-already-in-use')
        setError(t('auth.error_email_exists'));
      else if (code === 'auth/user-not-found' || code === 'auth/invalid-credential')
        setError(t('auth.error_invalid_credentials'));
      else if (code === 'auth/wrong-password')
        setError(t('auth.error_wrong_password'));
      else if (code === 'auth/invalid-email')
        setError(t('auth.error_invalid_email'));
      else if (code === 'auth/too-many-requests')
        setError(t('auth.error_too_many'));
      else setError(err.message || t('auth.error_generic'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label={t('auth.title_login')}
      >
        <button className="auth-modal__close" onClick={onClose} aria-label={t('auth.close')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <title>{t('auth.close')}</title>
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className="auth-modal__title gold-text">
          {mode === 'login'
            ? t('auth.title_login')
            : mode === 'register'
              ? t('auth.title_register')
              : t('auth.title_reset')}
        </h2>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              ref={firstInputRef}
              type="text"
              placeholder={t('auth.name_placeholder')}
              className="auth-modal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          )}
          {mode !== 'register' && (
            <input
              ref={firstInputRef}
              type="email"
              placeholder={t('auth.email_placeholder')}
              className="auth-modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          )}
          {mode === 'register' && (
            <input
              type="email"
              placeholder={t('auth.email_placeholder')}
              className="auth-modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          {mode !== 'reset' && (
            <input
              type="password"
              placeholder={t('auth.password_placeholder')}
              className="auth-modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          {mode === 'register' && (
            <input
              type="password"
              placeholder={t('auth.confirm_placeholder')}
              className="auth-modal__input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          )}

          {error && <p className="auth-modal__error" role="alert">{error}</p>}
          {resetSent && (
            <p className="auth-modal__success">
              {t('auth.reset_sent')} {email}. {t('auth.reset_check')}
            </p>
          )}

          {!resetSent && (
            <Button variant="primary" type="submit" disabled={busy} className="auth-modal__btn">
              {busy
                ? t('auth.submit_wait')
                : mode === 'login'
                  ? t('auth.submit_login')
                  : mode === 'register'
                    ? t('auth.submit_register')
                    : t('auth.submit_reset')}
            </Button>
          )}

          {resetSent && (
            <Button variant="primary" onClick={() => switchMode('login')} className="auth-modal__btn">
              {t('auth.switch_back')}
            </Button>
          )}
        </form>

        <p className="auth-modal__switch">
          {mode === 'login' && (
            <>
              {t('auth.switch_register_question')}{' '}
              <button onClick={() => switchMode('register')} className="auth-modal__link">
                {t('auth.submit_register')}
              </button>
              <br />
              <button onClick={() => switchMode('reset')} className="auth-modal__link" style={{ marginTop: 8, fontSize: '0.85rem', opacity: 0.7 }}>
                {t('auth.forgot')}
              </button>
            </>
          )}
          {mode === 'register' && (
            <>
              {t('auth.switch_login_question')}{' '}
              <button onClick={() => switchMode('login')} className="auth-modal__link">
                {t('auth.submit_login')}
              </button>
            </>
          )}
          {mode === 'reset' && (
            <button onClick={() => switchMode('login')} className="auth-modal__link">
              {t('auth.switch_back')}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
