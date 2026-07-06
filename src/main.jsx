import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Register service worker for PWA offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/noble-flair-design-site/sw.js')
      .then(() => {
        // console.log('SW registered');
      })
      .catch((err) => {
        console.error('SW registration failed:', err);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
