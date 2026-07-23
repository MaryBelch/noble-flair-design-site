import { getDbInstance } from './config';

let _db = null;
async function getDb() {
  if (!_db) _db = await getDbInstance();
  return _db;
}

/* ── User management ── */

/** Create a user document on registration */
export async function createUserDoc(uid, name, email) {
  const db = await getDb();
  const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
  await setDoc(doc(db, 'users', uid), {
    name,
    email,
    hasCourseAccess: false,
    role: 'user',
    createdAt: serverTimestamp(),
  });
}

/** Get user document from Firestore */
export async function getUserDoc(uid) {
  const db = await getDb();
  const { doc, getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Update a user field (e.g. hasCourseAccess, role) */
export async function updateUserDoc(uid, data) {
  const db = await getDb();
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(db, 'users', uid), data);
}

/** Get all users (admin only) */
export async function getAllUsers() {
  const db = await getDb();
  const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ── Lessons ── */

/** Mark a lesson as viewed by the user */
export async function markLessonViewed(uid, lessonId) {
  const db = await getDb();
  const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
  await setDoc(doc(db, 'users', uid), {
    [`progress.${lessonId}`]: serverTimestamp(),
  }, { merge: true });
}

/** Get a lesson document by ID */
export async function getLessonDoc(lessonId) {
  const db = await getDb();
  const { doc, getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, 'lessons', lessonId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Get all lessons, ordered */
export async function getAllLessons() {
  const db = await getDb();
  const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
  const q = query(collection(db, 'lessons'), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ── Contact messages ── */

/** Save a contact form submission to Firestore */
export async function saveContactMessage(data) {
  const db = await getDb();
  const { doc, collection, setDoc, serverTimestamp } = await import('firebase/firestore');
  const ref = doc(collection(db, 'messages'));
  await setDoc(ref, {
    name: data.name,
    contact: data.contact,
    message: data.message || '',
    locale: data.locale || '',
    userId: data.userId || null,
    userEmail: data.userEmail || null,
    read: false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Get all contact messages (admin only) */
export async function getAllMessages() {
  const db = await getDb();
  const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Mark a message as read */
export async function markMessageRead(id) {
  const db = await getDb();
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(db, 'messages', id), { read: true });
}

/* ── Newsletter subscribers ── */

/** Save a subscriber email */
export async function saveSubscriber(email) {
  const db = await getDb();
  const { doc, collection, setDoc, serverTimestamp } = await import('firebase/firestore');
  const ref = doc(collection(db, 'subscribers'));
  await setDoc(ref, {
    email,
    subscribedAt: serverTimestamp(),
  });
  return ref.id;
}

/* ── Vacancies ── */

/** Get all vacancies, ordered */
export async function getAllVacancies() {
  const db = await getDb();
  const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
  const q = query(collection(db, 'vacancies'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Add a new vacancy */
export async function saveVacancy(data) {
  const db = await getDb();
  const { doc, collection, setDoc, serverTimestamp } = await import('firebase/firestore');
  const ref = doc(collection(db, 'vacancies'));
  await setDoc(ref, {
    title_uk: data.title_uk || '',
    title_ru: data.title_ru || '',
    title_en: data.title_en || '',
    desc_uk: data.desc_uk || '',
    desc_ru: data.desc_ru || '',
    desc_en: data.desc_en || '',
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Delete a vacancy */
export async function deleteVacancy(id) {
  const db = await getDb();
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(db, 'vacancies', id), { deleted: true });
}
