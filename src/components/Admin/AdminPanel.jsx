import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/I18nContext';
import { getAllUsers, updateUserDoc, getAllMessages, markMessageRead, getAllVacancies, saveVacancy, deleteVacancy } from '../../firebase/firestore';
import SectionTitle from '../UI/SectionTitle';
import './AdminPanel.css';

const TARIFF_LABELS = { basic: 'admin.basic', standard: 'admin.standard', vip: 'admin.vip' };

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [vacancies, setVacancies] = useState([]);
  const [newVacancy, setNewVacancy] = useState({ title_uk: '', title_ru: '', title_en: '', desc_uk: '', desc_ru: '', desc_en: '' });
  const [visible, setVisible] = useState(false);

  // Check hash for #admin
  useEffect(() => {
    const onHash = () => {
      const newVisible = window.location.hash === '#admin';
      setVisible(newVisible);
      if (newVisible) {
        loadUsers();
        loadMessages();
        loadVacancies();
      }
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const loadUsers = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      // Silent: admin operations fail gracefully
    }
  }, [isAdmin]);

  const loadMessages = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const data = await getAllMessages();
      setMessages(data);
    } catch {
      // Silent: admin operations fail gracefully
    }
  }, [isAdmin]);

  const loadVacancies = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const data = await getAllVacancies();
      setVacancies(data.filter((v) => !v.deleted));
    } catch {
      // Silent
    }
  }, [isAdmin]);

  useEffect(() => {
    if (visible && isAdmin) {
      setLoading(true);
      Promise.all([loadUsers(), loadMessages(), loadVacancies()]).finally(() => setLoading(false));
    }
  }, [visible, isAdmin, loadUsers, loadMessages, loadVacancies]);

  const tConfirm = (key) => t('admin.confirm_template').replace('{action}', t(key));

  /* ── User actions ── */

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
    } catch {
      // Silent: admin operations fail gracefully
    } finally {
      setSaving((s) => ({ ...s, [uid]: false }));
    }
  };

  const revokeAccess = async (uid) => {
    if (!window.confirm(tConfirm('admin.confirm_revoke'))) return;
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
    } catch {
      // Silent: admin operations fail gracefully
    } finally {
      setSaving((s) => ({ ...s, [uid]: false }));
    }
  };

  const toggleRole = async (uid, currentRole) => {
    if (!window.confirm(tConfirm('admin.confirm_role'))) return;
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setSaving((s) => ({ ...s, [uid]: true }));
    try {
      await updateUserDoc(uid, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === uid ? { ...u, role: newRole } : u))
      );
    } catch {
      // Silent: admin operations fail gracefully
    } finally {
      setSaving((s) => ({ ...s, [uid]: false }));
    }
  };

  /* ── Message actions ── */

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    } catch {
      // Silent: admin operations fail gracefully
    }
  };

  /* ── Helpers ── */

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
          forceTitle={t('admin.title')}
          forceSubtitle={t('admin.subtitle')}
        />

        {/* ── Tabs ── */}
        <div className="admin-panel__tabs">
          <button
            className={`admin-panel__tab ${tab === 'users' ? 'admin-panel__tab--active' : ''}`}
            onClick={() => setTab('users')}
          >
            {t('admin.tab_users')} ({users.length})
          </button>
          <button
            className={`admin-panel__tab ${tab === 'messages' ? 'admin-panel__tab--active' : ''}`}
            onClick={() => setTab('messages')}
          >
            {t('admin.tab_messages')} ({messages.length})
          </button>
          <button
            className={`admin-panel__tab ${tab === 'vacancies' ? 'admin-panel__tab--active' : ''}`}
            onClick={() => setTab('vacancies')}
          >
            {t('admin.tab_vacancies')} ({vacancies.length})
          </button>
        </div>

        {loading ? (
          <p className="admin-panel__loading">{t('admin.loading')}</p>
        ) : tab === 'users' ? (
          /* ── Users table ── */
          users.length === 0 ? (
            <p className="admin-panel__empty">{t('admin.no_users')}</p>
          ) : (
            <div className="admin-panel__table-wrapper">
              <table className="admin-panel__table">
                <thead>
                  <tr>
                    <th>{t('admin.col_name')}</th>
                    <th>{t('admin.col_email')}</th>
                    <th>{t('admin.col_registered')}</th>
                    <th>{t('admin.col_tariff')}</th>
                    <th>{t('admin.col_access')}</th>
                    <th>{t('admin.col_role')}</th>
                    <th>{t('admin.col_actions')}</th>
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
                            {t(TARIFF_LABELS[u.tariff]) || u.tariff}
                          </span>
                        ) : (
                          <span style={{ color: '#666', fontSize: '0.85rem' }}>—</span>
                        )}
                      </td>
                      <td>
                        <span className={`admin-panel__badge ${u.hasCourseAccess ? 'admin-panel__badge--active' : ''}`}>
                          {u.hasCourseAccess ? t('admin.access_yes') : t('admin.access_no')}
                        </span>
                        {u.accessExpiresAt && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#888', marginTop: 4 }}>
                            до {formatDate(u.accessExpiresAt)}
                          </span>
                        )}
                      </td>
                      <td>{u.role === 'admin' ? t('admin.admin_label') : t('admin.user_label')}</td>
                      <td className="admin-panel__actions">
                        {!u.tariff ? (
                          <>
                            <button
                              className="admin-panel__btn admin-panel__btn--grant"
                              onClick={() => setTariff(u.id, 'basic')}
                              disabled={saving[u.id]}
                            >
                              {saving[u.id] ? '...' : t('admin.basic')}
                            </button>
                            <button
                              className="admin-panel__btn admin-panel__btn--grant"
                              onClick={() => setTariff(u.id, 'standard')}
                              disabled={saving[u.id]}
                            >
                              {saving[u.id] ? '...' : t('admin.standard')}
                            </button>
                            <button
                              className="admin-panel__btn admin-panel__btn--grant"
                              onClick={() => setTariff(u.id, 'vip')}
                              disabled={saving[u.id]}
                            >
                              {saving[u.id] ? '...' : t('admin.vip')}
                            </button>
                          </>
                        ) : (
                          <button
                            className="admin-panel__btn admin-panel__btn--revoke"
                            onClick={() => revokeAccess(u.id)}
                            disabled={saving[u.id]}
                          >
                            {saving[u.id] ? '...' : t('admin.revoke')}
                          </button>
                        )}
                        <button
                          className="admin-panel__btn admin-panel__btn--role"
                          onClick={() => toggleRole(u.id, u.role)}
                          disabled={saving[u.id] || u.id === user?.uid}
                        >
                          {u.role === 'admin' ? t('admin.make_user') : t('admin.make_admin')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : tab === 'vacancies' ? (
          /* ── Vacancies tab ── */
          <div className="admin-panel__vacancies">
            <div className="admin-panel__vacancies-form">
              <h4 style={{ marginBottom: 12, color: '#D4AF37' }}>{t('admin.vacancy_add')}</h4>
              <div className="admin-panel__vacancies-grid">
                <input className="admin-panel__input" placeholder="Назва (укр)" value={newVacancy.title_uk} onChange={(e) => setNewVacancy((v) => ({ ...v, title_uk: e.target.value }))} />
                <input className="admin-panel__input" placeholder="Название (рус)" value={newVacancy.title_ru} onChange={(e) => setNewVacancy((v) => ({ ...v, title_ru: e.target.value }))} />
                <input className="admin-panel__input" placeholder="Title (en)" value={newVacancy.title_en} onChange={(e) => setNewVacancy((v) => ({ ...v, title_en: e.target.value }))} />
                <textarea className="admin-panel__input" placeholder="Опис (укр)" rows={3} value={newVacancy.desc_uk} onChange={(e) => setNewVacancy((v) => ({ ...v, desc_uk: e.target.value }))} />
                <textarea className="admin-panel__input" placeholder="Описание (рус)" rows={3} value={newVacancy.desc_ru} onChange={(e) => setNewVacancy((v) => ({ ...v, desc_ru: e.target.value }))} />
                <textarea className="admin-panel__input" placeholder="Description (en)" rows={3} value={newVacancy.desc_en} onChange={(e) => setNewVacancy((v) => ({ ...v, desc_en: e.target.value }))} />
              </div>
              <button
                className="admin-panel__btn admin-panel__btn--grant"
                style={{ marginTop: 12 }}
                onClick={async () => {
                  if (!newVacancy.title_uk && !newVacancy.title_ru && !newVacancy.title_en) return;
                  await saveVacancy(newVacancy);
                  setNewVacancy({ title_uk: '', title_ru: '', title_en: '', desc_uk: '', desc_ru: '', desc_en: '' });
                  loadVacancies();
                }}
              >
                {t('admin.vacancy_add')}
              </button>
            </div>

            {vacancies.length === 0 ? (
              <p className="admin-panel__empty" style={{ marginTop: 24 }}>{t('admin.no_vacancies')}</p>
            ) : (
              <div className="admin-panel__vacancies-list" style={{ marginTop: 24 }}>
                {vacancies.map((v) => (
                  <div key={v.id} className="admin-panel__vacancy-item">
                    <div className="admin-panel__vacancy-info">
                      <strong>{v.title_uk || v.title_ru || v.title_en || '—'}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#888' }}>{v.desc_uk || v.desc_ru || v.desc_en || ''}</span>
                    </div>
                    <button
                      className="admin-panel__btn admin-panel__btn--revoke"
                      onClick={async () => {
                        if (window.confirm('Delete this vacancy?')) {
                          await deleteVacancy(v.id);
                          loadVacancies();
                        }
                      }}
                    >
                      {t('admin.vacancy_delete')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Messages tab ── */
          messages.length === 0 ? (
            <p className="admin-panel__empty">{t('admin.no_messages')}</p>
          ) : (
            <div className="admin-panel__messages">
              {messages.map((m) => (
                <div key={m.id} className={`admin-panel__message ${!m.read ? 'admin-panel__message--unread' : ''}`}>
                  <div className="admin-panel__message-header">
                    <div className="admin-panel__message-from">
                      <strong>{m.name}</strong>
                      <span className="admin-panel__message-contact">{m.contact}</span>
                    </div>
                    <div className="admin-panel__message-meta">
                      <span className="admin-panel__message-date">{formatDate(m.createdAt)}</span>
                      {!m.read && (
                        <button className="admin-panel__message-read-btn" onClick={() => handleMarkRead(m.id)}>
                          {t('admin.read')}
                        </button>
                      )}
                    </div>
                  </div>
                  {m.message && <p className="admin-panel__message-text">{m.message}</p>}
                  {m.locale && <span className="admin-panel__message-locale">{m.locale.toUpperCase()}</span>}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
}
