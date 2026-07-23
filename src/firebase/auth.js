import { getAuthInstance } from './config';
import { createUserDoc } from './firestore';

let _auth = null;
async function getAuth() {
  if (!_auth) _auth = await getAuthInstance();
  return _auth;
}

export async function registerUser(name, email, password) {
  const auth = await getAuth();
  const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await createUserDoc(cred.user.uid, name, email);
  return cred.user;
}

export async function loginUser(email, password) {
  const auth = await getAuth();
  const { signInWithEmailAndPassword } = await import('firebase/auth');
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logoutUser() {
  const auth = await getAuth();
  const { signOut } = await import('firebase/auth');
  return signOut(auth);
}

export async function resetPassword(email) {
  const auth = await getAuth();
  const { sendPasswordResetEmail } = await import('firebase/auth');
  await sendPasswordResetEmail(auth, email);
}
