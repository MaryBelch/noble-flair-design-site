import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, updateUserDoc } from '../../firebase/firestore';
import SectionTitle from '../UI/SectionTitle';
import './AdminPanel.css';

const TARIFF_LABELS = { basic: 'Базовий', standard: 'Стандарт', vip: 'ВИП' };

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

  const setTariff = async (uid, tariff) => {
    setSaving((s) => ({ ...s, [uid]: true }));
    const now = new Date();
    let accessExpiresAt = null;
    if (tariff === 'basic') {
      accessExpiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    } else if (tariff === 'standard') {
      accessExpiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    }
    try {
      await updateUserDoc(uid, {
        tariff,
        hasCourseAccess: true,
        accessGrantedAt: now.toISOString(),
        accessExpiresAt: accessExpiresAt ? accessExpiresAt.toISOString() : null,
      });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === uid ? { ...u, tariff, hasCourseAccess: true, accessGrantedAt: now, accessExpiresAt } : u
        )
      );
    } catch (err) {
      console.error('Error setting tariff:', err);
    } finally {
      setSaving((s) => ({ ...s, [uid]: false }));
    }
  };

  const revokeAccess = async (uid) => {
    setSaving((s) => ({ ...s, [uid]: true }));
    try {
      await updateUserDoc(uid, {
        hasCourseAccess: false,
        tariff: null,
        accessGrantedAt: null,
        accessExpiresAt: null,
        progress: {},
      });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === uid
            ? { ...u, hasCourseAccess: false, tariff: null, accessGrantedAt: null, accessExpiresAt: null }
            : u
        )
      );
    } catch (err) {
      console.error('Error revoking access:', err);
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
                  <th>Тариф</th>
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
                      {u.tariff ? (
                        <span className="admin-panel__badge admin-panel__badge--active">
                          {TARIFF_LABELS[u.tariff] || u.tariff}
                        </span>
                      ) : (
                        <span style={{ color: '#666', fontSize: '0.85rem' }}>—</span>
                      )}
                    </td>
                    <td>
                      <span className={`admin-panel__badge ${u.hasCourseAccess ? 'admin-panel__badge--active' : ''}`}>
                        {u.hasCourseAccess ? '✓ Доступ є' : '✗ Немає'}
                      </span>
                      {u.accessExpiresAt && (
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#888', marginTop: 4 }}>
                          до {formatDate(u.accessExpiresAt)}
                        </span>
                      )}
                    </td>
                    <td>{u.role === 'admin' ? 'Адмін' : 'Користувач'}</td>
                    <td className="admin-panel__actions">
                      {!u.tariff ? (
                        <>
                          <button
                            className="admin-panel__btn admin-panel__btn--grant"
                            onClick={() => setTariff(u.id, 'basic')}
                            disabled={saving[u.id]}
                          >
                            {saving[u.id] ? '...' : 'Базовий'}
                          </button>
                          <button
                            className="admin-panel__btn admin-panel__btn--grant"
                            onClick={() => setTariff(u.id, 'standard')}
                            disabled={saving[u.id]}
                          >
                            {saving[u.id] ? '...' : 'Стандарт'}
                          </button>
                          <button
                            className="admin-panel__btn admin-panel__btn--grant"
                            onClick={() => setTariff(u.id, 'vip')}
                            disabled={saving[u.id]}
                          >
                            {saving[u.id] ? '...' : 'ВИП'}
                          </button>
                        </>
                      ) : (
                        <button
                          className="admin-panel__btn admin-panel__btn--revoke"
                          onClick={() => revokeAccess(u.id)}
                          disabled={saving[u.id]}
                        >
                          {saving[u.id] ? '...' : 'Відкликати'}
                        </button>
                      )}
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
