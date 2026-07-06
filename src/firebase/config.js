import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// ╔══════════════════════════════════════════════════════╗
// ║  Вставте сюди дані вашого Firebase проекту          ║
// ║  Firebase Console → Project Settings → Web App      ║
// ╚══════════════════════════════════════════════════════╝
const firebaseConfig = {
  apiKey: 'AIzaSyBYmhyQ8WjUUgE2IN7eKCVQ9V6zFIO7XqY',
  authDomain: 'noble-flair-app.firebaseapp.com',
  projectId: 'noble-flair-app',
  storageBucket: 'noble-flair-app.firebasestorage.app',
  messagingSenderId: '884435593575',
  appId: '1:884435593575:web:90aa1e19f9b93ae655e7c2',
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
