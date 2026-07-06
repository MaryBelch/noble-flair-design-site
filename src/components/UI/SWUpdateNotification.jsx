import { useState, useEffect, useCallback } from 'react';
import './SWUpdateNotification.css';

export default function SWUpdateNotification() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setUpdateAvailable(true);
      setRegistration(e.detail);
    };

    window.addEventListener('sw-update', handler);
    return () => window.removeEventListener('sw-update', handler);
  }, []);

  const handleUpdate = useCallback(() => {
    if (!registration || !registration.waiting) return;

    // Send skip-waiting message to the waiting SW
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // Wait for the SW to take over, then reload
    const onStateChange = () => {
      if (registration.waiting?.state === 'activated') {
        window.location.reload();
      }
    };

    registration.waiting.addEventListener('statechange', onStateChange);
  }, [registration]);

  if (!updateAvailable) return null;

  return (
    <div className="sw-update-notification" role="alert" aria-live="polite">
      <div className="sw-update-notification__content">
        <span className="sw-update-notification__icon" aria-hidden="true">🔄</span>
        <p className="sw-update-notification__text">
          Доступна нова версія сайту
        </p>
        <button
          className="sw-update-notification__btn"
          onClick={handleUpdate}
        >
          Оновити
        </button>
        <button
          className="sw-update-notification__close"
          onClick={() => setUpdateAvailable(false)}
          aria-label="Закрити"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
