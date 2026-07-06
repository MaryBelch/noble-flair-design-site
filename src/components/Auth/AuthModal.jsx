import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/I18nContext';
import { resetPassword } from '../../firebase/auth';
import Button from '../UI/Button';
import './AuthModal.css';

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const { t, locale } = useTranslation();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // i18n helper
  const $t = (uk, ru, en) => {
    if (locale === 'uk') return uk;
    if (locale === 'ru') return ru;
    return en;
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
          setError($t('Паролі не співпадають', 'Пароли не совпадают', 'Passwords do not match'));
          setBusy(false);
          return;
        }
        if (password.length < 6) {
          setError($t('Пароль має бути мінімум 6 символів', 'Пароль должен быть минимум 6 символов', 'Password must be at least 6 characters'));
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
      if (code === 'auth/email-already-in-use')
        setError($t('Ця пошта вже зареєстрована', 'Эта почта уже зарегистрирована', 'Email already registered'));
      else if (code === 'auth/user-not-found' || code === 'auth/invalid-credential')
        setError($t('Неправильна пошта або пароль', 'Неверная почта или пароль', 'Invalid email or password'));
      else if (code === 'auth/wrong-password')
        setError($t('Неправильний пароль', 'Неверный пароль', 'Wrong password'));
      else if (code === 'auth/invalid-email')
        setError($t('Неправильний формат пошти', 'Неверный формат почты', 'Invalid email format'));
      else if (code === 'auth/too-many-requests')
        setError($t('Забагато спроб. Спробуйте пізніше.', 'Слишком много попыток. Попробуйте позже.', 'Too many attempts. Try again later.'));
      else setError(err.message || $t('Сталася помилка', 'Произошла ошибка', 'An error occurred'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={$t('Вхід', 'Вход', 'Sign in')}>
        <button className="auth-modal__close" onClick={onClose} aria-label={$t('Закрити', 'Закрыть', 'Close')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className="auth-modal__title gold-text">
          {mode === 'login'
            ? $t('Вхід', 'Вход', 'Sign In')
            : mode === 'register'
              ? $t('Реєстрація', 'Регистрация', 'Register')
              : $t('Скинути пароль', 'Сбросить пароль', 'Reset Password')}
        </h2>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              type="text"
              placeholder={$t("Ваше ім'я", 'Ваше имя', 'Your name')}
              className="auth-modal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder={mode === 'reset' ? $t('Ваш Email', 'Ваш Email', 'Your email') : 'Email'}
            className="auth-modal__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {mode !== 'reset' && (
            <input
              type="password"
              placeholder={$t('Пароль', 'Пароль', 'Password')}
              className="auth-modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          {mode === 'register' && (
            <input
              type="password"
              placeholder={$t('Підтвердіть пароль', 'Подтвердите пароль', 'Confirm password')}
              className="auth-modal__input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          )}

          {error && <p className="auth-modal__error" role="alert">{error}</p>}
          {resetSent && (
            <p className="auth-modal__success">
              {$t('Лист для скидання пароля надіслано на', 'Письмо для сброса пароля отправлено на', 'Password reset email sent to')} {email}.
              {$t('Перевірте пошту.', 'Проверьте почту.', 'Check your inbox.')}
            </p>
          )}

          {!resetSent && (
            <Button variant="primary" type="submit" disabled={busy} className="auth-modal__btn">
              {busy
                ? $t('Зачекайте...', 'Подождите...', 'Please wait...')
                : mode === 'login'
                  ? $t('Увійти', 'Войти', 'Sign In')
                  : mode === 'register'
                    ? $t('Зареєструватися', 'Зарегистрироваться', 'Register')
                    : $t('Надіслати лист', 'Отправить письмо', 'Send email')}
            </Button>
          )}

          {resetSent && (
            <Button variant="primary" onClick={() => switchMode('login')} className="auth-modal__btn">
              {$t('Повернутися до входу', 'Вернуться ко входу', 'Back to sign in')}
            </Button>
          )}
        </form>

        <p className="auth-modal__switch">
          {mode === 'login' && (
            <>
              {$t('Ще немає акаунту?', 'Еще нет аккаунта?', "Don't have an account?")}{' '}
              <button onClick={() => switchMode('register')} className="auth-modal__link">
                {$t('Зареєструватися', 'Зарегистрироваться', 'Register')}
              </button>
              <br />
              <button onClick={() => switchMode('reset')} className="auth-modal__link" style={{ marginTop: 8, fontSize: '0.85rem', opacity: 0.7 }}>
                {$t('Забули пароль?', 'Забыли пароль?', 'Forgot password?')}
              </button>
            </>
          )}
          {mode === 'register' && (
            <>
              {$t('Вже є акаунт?', 'Уже есть аккаунт?', 'Already have an account?')}{' '}
              <button onClick={() => switchMode('login')} className="auth-modal__link">
                {$t('Увійти', 'Войти', 'Sign In')}
              </button>
            </>
          )}
          {mode === 'reset' && (
            <button onClick={() => switchMode('login')} className="auth-modal__link">
              {$t('Повернутися до входу', 'Вернуться ко входу', 'Back to sign in')}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
