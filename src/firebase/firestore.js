import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

/* ── User management ── */

/** Create a user document on registration */
export async function createUserDoc(uid, name, email) {
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
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Update a user field (e.g. hasCourseAccess, role) */
export async function updateUserDoc(uid, data) {
  await updateDoc(doc(db, 'users', uid), data);
}

/** Get all users (admin only) */
export async function getAllUsers() {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ── Lessons ── */

/** Mark a lesson as viewed by the user */
export async function markLessonViewed(uid, lessonId) {
  await setDoc(doc(db, 'users', uid), {
    [`progress.${lessonId}`]: serverTimestamp(),
  }, { merge: true });
}

/** Get a lesson document by ID */
export async function getLessonDoc(lessonId) {
  const snap = await getDoc(doc(db, 'lessons', lessonId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Get all lessons, ordered */
export async function getAllLessons() {
  const q = query(collection(db, 'lessons'), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ── Contact messages ── */

/** Save a contact form submission to Firestore */
export async function saveContactMessage(data) {
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
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Mark a message as read */
export async function markMessageRead(id) {
  await updateDoc(doc(db, 'messages', id), { read: true });
}
