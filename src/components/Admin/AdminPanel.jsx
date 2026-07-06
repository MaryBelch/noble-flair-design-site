import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, updateUserDoc } from '../../firebase/firestore';
import SectionTitle from '../UI/SectionTitle';
import './AdminPanel.css';

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [visible, setVisible] = useState(false);

  // Check hash for #admin
  useEffect(() => {
    const onHash = () => {
      const newVisible = window.location.hash === '#admin';
      setVisible(newVisible);
      if (newVisible) loadUsers();
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const loadUsers = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (visible && isAdmin) loadUsers();
  }, [visible, isAdmin, loadUsers]);

  const toggleAccess = async (uid, current) => {
    setSaving((s) => ({ ...s, [uid]: true }));
    try {
      await updateUserDoc(uid, { hasCourseAccess: !current });
      setUsers((prev) =>
        prev.map((u) => (u.id === uid ? { ...u, hasCourseAccess: !current } : u))
      );
    } catch (err) {
      console.error('Error updating access:', err);
    } finally {
      setSaving((s) => ({ ...s, [uid]: false }));
    }
  };

  const toggleRole = async (uid, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setSaving((s) => ({ ...s, [uid]: true }));
    try {
      await updateUserDoc(uid, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === uid ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error('Error updating role:', err);
    } finally {
      setSaving((s) => ({ ...s, [uid]: false }));
    }
  };

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('uk-UA', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (!visible || !isAdmin) return null;

  return (
    <section id="admin" className="section admin-panel">
      <div className="container">
        <SectionTitle
          titleKey={null}
          subtitleKey={null}
          forceTitle="Адмін-панель"
          forceSubtitle="Керування доступом до курсу"
        />

        {loading ? (
          <p className="admin-panel__loading">Завантаження...</p>
        ) : users.length === 0 ? (
          <p className="admin-panel__empty">Немає зареєстрованих користувачів</p>
        ) : (
          <div className="admin-panel__table-wrapper">
            <table className="admin-panel__table">
              <thead>
                <tr>
                  <th>Ім'я</th>
                  <th>Email</th>
                  <th>Зареєстровано</th>
                  <th>Доступ</th>
                  <th>Роль</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name || '—'}</td>
                    <td>{u.email}</td>
                    <td className="admin-panel__date">{formatDate(u.createdAt)}</td>
                    <td>
                      <span className={`admin-panel__badge ${u.hasCourseAccess ? 'admin-panel__badge--active' : ''}`}>
                        {u.hasCourseAccess ? '✓ Доступ є' : '✗ Немає'}
                      </span>
                    </td>
                    <td>{u.role === 'admin' ? 'Адмін' : 'Користувач'}</td>
                    <td className="admin-panel__actions">
                      <button
                        className={`admin-panel__btn ${u.hasCourseAccess ? 'admin-panel__btn--revoke' : 'admin-panel__btn--grant'}`}
                        onClick={() => toggleAccess(u.id, u.hasCourseAccess)}
                        disabled={saving[u.id]}
                      >
                        {saving[u.id]
                          ? '...'
                          : u.hasCourseAccess
                            ? 'Забрати доступ'
                            : 'Надати доступ'}
                      </button>
                      <button
                        className="admin-panel__btn admin-panel__btn--role"
                        onClick={() => toggleRole(u.id, u.role)}
                        disabled={saving[u.id] || u.id === user?.uid}
                      >
                        {u.role === 'admin' ? 'Зробити user' : 'Зробити адміном'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
