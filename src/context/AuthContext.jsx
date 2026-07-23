import { createContext, useContext, useState, useEffect } from 'react';
import { getAuthInstance } from '../firebase/config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Firebase auth user
  const [userDoc, setUserDoc] = useState(null); // Firestore user doc (hasCourseAccess, role)
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    let unsubscribe = null;
    let mounted = true;

    (async () => {
      const auth = await getAuthInstance();
      const { onAuthStateChanged } = await import('firebase/auth');
      const { getUserDoc } = await import('../firebase/firestore');

      if (!mounted) return;

      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          const doc = await getUserDoc(firebaseUser.uid);
          setUserDoc(doc);
        } else {
          setUserDoc(null);
        }
        setLoading(false);
      });
    })();

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Refresh user doc from Firestore (e.g. after admin grants access)
  const refreshUserDoc = async () => {
    if (!user) return;
    const { getUserDoc } = await import('../firebase/firestore');
    const doc = await getUserDoc(user.uid);
    setUserDoc(doc);
  };

  const login = async (email, password) => {
    const { loginUser } = await import('../firebase/auth');
    const fbUser = await loginUser(email, password);
    const { getUserDoc } = await import('../firebase/firestore');
    const doc = await getUserDoc(fbUser.uid);
    setUserDoc(doc);
    return fbUser;
  };

  const register = async (name, email, password) => {
    const { registerUser } = await import('../firebase/auth');
    const fbUser = await registerUser(name, email, password);
    const { getUserDoc } = await import('../firebase/firestore');
    const doc = await getUserDoc(fbUser.uid);
    setUserDoc(doc);
    return fbUser;
  };

  const logout = async () => {
    const { logoutUser } = await import('../firebase/auth');
    await logoutUser();
    setUser(null);
    setUserDoc(null);
  };

  const value = {
    user,
    userDoc,
    loading,
    login,
    register,
    logout,
    refreshUserDoc,
    hasAccess: userDoc?.hasCourseAccess ?? false,
    isAdmin: userDoc?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
