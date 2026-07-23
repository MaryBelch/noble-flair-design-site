import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Register service worker for PWA offline support with update detection
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/noble-flair-design-site/sw.js')
      .then((registration) => {
        // Track updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            // New SW installed and waiting — notify the user
            // (navigator.serviceWorker.controller exists only when an SW controls
            //  the page, i.e. this isn't the very first install)
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              window.dispatchEvent(
                new CustomEvent('sw-update', { detail: registration })
              );
            }
          });
        });
      })
      .catch(() => {});
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
