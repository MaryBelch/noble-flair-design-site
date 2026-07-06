import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { resetPassword } from '../../firebase/auth';
import Button from '../UI/Button';
import './AuthModal.css';

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'reset'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      if (mode === 'register') {
        if (password !== confirm) {
          setError('Паролі не співпадають');
          setBusy(false);
          return;
        }
        if (password.length < 6) {
          setError('Пароль має бути мінімум 6 символів');
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
      onClose();
    } catch (err) {
      const code = err.code;
      if (code === 'auth/email-already-in-use') setError('Ця пошта вже зареєстрована');
      else if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') setError('Неправильна пошта або пароль');
      else if (code === 'auth/wrong-password') setError('Неправильний пароль');
      else if (code === 'auth/invalid-email') setError('Неправильний формат пошти');
      else if (code === 'auth/too-many-requests') setError('Забагато спроб. Спробуйте пізніше.');
      else setError(err.message || 'Сталася помилка');
    } finally {
      setBusy(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setResetSent(false);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className="auth-modal__title gold-text">
          {mode === 'login' ? 'Вхід' : mode === 'register' ? 'Реєстрація' : 'Скинути пароль'}
        </h2>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Ваше ім'я"
              className="auth-modal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          {mode !== 'reset' && (
            <input
              type="email"
              placeholder="Email"
              className="auth-modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          {mode === 'reset' && (
            <input
              type="email"
              placeholder="Ваш Email"
              className="auth-modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          {mode !== 'reset' && (
            <input
              type="password"
              placeholder="Пароль"
              className="auth-modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          {mode === 'register' && (
            <input
              type="password"
              placeholder="Підтвердіть пароль"
              className="auth-modal__input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          )}

          {error && <p className="auth-modal__error">{error}</p>}
          {resetSent && (
            <p className="auth-modal__success">
              Лист для скидання пароля надіслано на {email}. Перевірте пошту.
            </p>
          )}

          {!resetSent && (
            <Button variant="primary" type="submit" disabled={busy} className="auth-modal__btn">
              {busy
                ? 'Зачекайте...'
                : mode === 'login'
                  ? 'Увійти'
                  : mode === 'register'
                    ? 'Зареєструватися'
                    : 'Надіслати лист'}
            </Button>
          )}

          {resetSent && (
            <Button variant="primary" onClick={() => switchMode('login')} className="auth-modal__btn">
              Повернутися до входу
            </Button>
          )}
        </form>

        <p className="auth-modal__switch">
          {mode === 'login' && (
            <>
              Ще немає акаунту?{' '}
              <button onClick={() => switchMode('register')} className="auth-modal__link">Зареєструватися</button>
              <br />
              <button onClick={() => switchMode('reset')} className="auth-modal__link" style={{ marginTop: 8, fontSize: '0.85rem', opacity: 0.7 }}>
                Забули пароль?
              </button>
            </>
          )}
          {mode === 'register' && (
            <>
              Вже є акаунт?{' '}
              <button onClick={() => switchMode('login')} className="auth-modal__link">Увійти</button>
            </>
          )}
          {mode === 'reset' && (
            <button onClick={() => switchMode('login')} className="auth-modal__link">
              Повернутися до входу
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
