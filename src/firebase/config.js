import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase config — reads from env vars with fallback to hardcoded values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBYmhyQ8WjUUgE2IN7eKCVQ9V6zFIO7XqY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'noble-flair-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'noble-flair-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'noble-flair-app.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '884435593575',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:884435593575:web:90aa1e19f9b93ae655e7c2',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Lazy-init analytics — fails silently in unsupported environments (extensions, SSR)
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(() => {});

export { analytics };
export default app;
