import { useEffect, useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import { useAuth } from '../../context/AuthContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import AuthModal from '../Auth/AuthModal';
import LessonView from './LessonView';
import { ListSkeleton } from '../UI/Skeleton';
import './Course.css';

/** Return the correct plural form of "lesson" using locale plural forms */
function getLessonLabel(count, pluralForms = ['урок', 'уроки', 'уроків']) {
  if (count === 1) return `${count} ${pluralForms[0]}`;
  if (count >= 2 && count <= 4) return `${count} ${pluralForms[1]}`;
  return `${count} ${pluralForms[2]}`;
}

/** Return days until sale ends, for countdown display */
function useSaleCountdown(endDate) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: false });

  useEffect(() => {
    function tick() {
      const diff = endDate.getTime() - Date.now();
      if (diff <= 0) {
        setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }
      const totalSec = Math.floor(diff / 1000);
      setRemaining({
        days: Math.floor(totalSec / 86400),
        hours: Math.floor((totalSec % 86400) / 3600),
        minutes: Math.floor((totalSec % 3600) / 60),
        seconds: totalSec % 60,
        ended: false,
      });
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return remaining;
}

// Sale ends July 31, 2026 at midnight — configurable via VITE_SALE_END env var (ISO date string)
const SALE_END = import.meta.env.VITE_SALE_END
  ? new Date(import.meta.env.VITE_SALE_END)
  : new Date('2026-07-31T23:59:59+03:00');

export default function Course() {
  const { t, tp } = useTranslation();
  const { user, userDoc, loading: authLoading, hasAccess, isAdmin } = useAuth();
  const sectionRef = useScrollReveal([]);
  const [openModule, setOpenModule] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [modulesReady, setModulesReady] = useState(false);
  const modules = tp('course.modules') || [];
  const lessonPlural = tp('course.lesson_plural') || ['урок', 'уроки', 'уроків'];
  const countdown = useSaleCountdown(SALE_END);

  // Small delay to show skeleton before modules hydrate
  useEffect(() => {
    const t = setTimeout(() => setModulesReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Load user progress from Firestore
  useEffect(() => {
    if (!user || !userDoc) {
      setProgress({});
      return;
    }
    setProgress(userDoc.progress || {});
  }, [user, userDoc]);

  // Open first module by default once data loads
  useEffect(() => {
    if (modules.length > 0 && openModule === null) {
      setOpenModule(0);
    }
  }, [modules.length]);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  /** Check if a specific lesson is the free trial */
  const isFreeLesson = (moduleIndex, lessonIndex) => moduleIndex === 0 && lessonIndex === 0;

  const handleLessonClick = (moduleIndex, lessonIndex, lessonTitle) => {
    if (isFreeLesson(moduleIndex, lessonIndex)) {
      setSelectedLesson({ moduleIndex, lessonIndex, title: lessonTitle });
      return;
    }
    if (authLoading) return;
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (!hasAccess && !isAdmin) return;
    setSelectedLesson({ moduleIndex, lessonIndex, title: lessonTitle });
  };

  const getLessonId = (moduleIndex, lessonIndex) => `mod-${moduleIndex}-lesson-${lessonIndex}`;

  const isLessonViewed = (moduleIndex, lessonIndex) => {
    return !!progress[getLessonId(moduleIndex, lessonIndex)];
  };

  const renderLessonItem = (lesson, moduleIndex, lessonIndex) => {
    const freeLesson = isFreeLesson(moduleIndex, lessonIndex);
    const viewed = isLessonViewed(moduleIndex, lessonIndex);
    const locked = !freeLesson && (!user || (!hasAccess && !isAdmin));

    if (locked) {
      return (
        <li
          key={lessonIndex}
          className="course__module-lesson course__module-lesson--locked"
          onClick={() => handleLessonClick(moduleIndex, lessonIndex, lesson)}
        >
          <span className="course__lesson-bullet" aria-hidden="true">🔒</span>
          <span>{lesson}</span>
        </li>
      );
    }

    return (
      <li
        key={lessonIndex}
        className="course__module-lesson course__module-lesson--open"
        onClick={() => handleLessonClick(moduleIndex, lessonIndex, lesson)}
      >
        <span className="course__lesson-bullet" aria-hidden="true">
          {viewed ? '✓' : '✦'}
        </span>
        <span>
          {freeLesson && <span className="course__free-tag">{t('course.free_tag')}</span>}{' '}
          {lesson}
        </span>
      </li>
    );
  };

  // Show lesson view when a lesson is selected
  if (selectedLesson) {
    return (
      <LessonView
        selectedLesson={selectedLesson}
        modules={modules}
        onBack={() => { setSelectedLesson(null); }}
      />
    );
  }

  return (
    <section id="course" className="section course" ref={sectionRef} role="region" aria-label={t('course.title')}>
      <div className="container">
        <SectionTitle titleKey="course.title" subtitleKey="course.subtitle" />

        <div className="course__content">
          <div className="course__info fade-in">
            <p className="course__description">{t('course.description')}</p>
            <p className="course__status gold-text">{t('course.status')}</p>
          </div>

          <div className="course__modules fade-in">
            {/* Access banner */}
            {!authLoading && !user && (
              <div className="course__access-banner">
                <p>{t('course.login_prompt')}</p>
                <p style={{ fontSize: '0.85rem', marginBottom: 14, color: 'var(--color-text-muted)' }}>
                  {t('course.free_trial')}
                </p>
                <Button variant="outline-animated" onClick={() => setShowAuth(true)}>
                  {t('course.login_btn')}
                </Button>
              </div>
            )}
            {!authLoading && user && !hasAccess && !isAdmin && (
              <div className="course__access-banner course__access-banner--pay">
                <p>{t('course.pay_prompt')}</p>
                <Button variant="outline-animated" onClick={() =>
                  window.open('https://t.me/noble_flair_design_bot', '_blank')
                }>
                  {t('course.pay_btn')}
                </Button>
              </div>
            )}

            {!modulesReady ? (
              <ListSkeleton rows={4} />
            ) : (
              <div className="course__modules-list">
                {modules.map((mod, i) => (
                  <div
                    key={i}
                    className={`course__module ${openModule === i ? 'course__module--open' : ''}`}
                  >
                    <button
                      className="course__module-header"
                      onClick={() => toggleModule(i)}
                      aria-expanded={openModule === i}
                    >
                      <div className="course__module-header-left">
                        <span className="course__module-number">
                          {i === 0 ? t('course.modules.0.title') : `${t('course.module_label')} ${i}`}
                        </span>
                        <h4 className="course__module-title">
                          {i === 0 && (
                            <span className="course__free-tag" style={{ marginRight: 6 }}>{t('course.free_tag')}</span>
                          )}
                          {mod.title}
                        </h4>
                      </div>
                      <div className="course__module-meta">
                        <span className="course__module-count">
                          {getLessonLabel(mod.lessons.length, lessonPlural)}
                        </span>
                        <span
                          className={`course__module-arrow ${openModule === i ? 'course__module-arrow--open' : ''}`}
                          aria-hidden="true"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </button>
                    <div className="course__module-body">
                      <ul className="course__module-lessons">
                        {mod.lessons.map((lesson, j) => renderLessonItem(lesson, i, j))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tariffs with countdown */}
          <div className="course__tariffs fade-in">
            <h3 className="course__tariffs-title">{t('course.tariffs.title')}</h3>

            {!countdown.ended && (
              <div className="course__countdown">
                <span className="course__countdown-label">{t('course.countdown_label')}</span>
                <div className="course__countdown-timer">
                  <div className="course__countdown-unit">
                    <span className="course__countdown-value">{String(countdown.days).padStart(2, '0')}</span>
                    <span className="course__countdown-text">{t('course.countdown_days')}</span>
                  </div>
                  <span className="course__countdown-sep">:</span>
                  <div className="course__countdown-unit">
                    <span className="course__countdown-value">{String(countdown.hours).padStart(2, '0')}</span>
                    <span className="course__countdown-text">{t('course.countdown_hours')}</span>
                  </div>
                  <span className="course__countdown-sep">:</span>
                  <div className="course__countdown-unit">
                    <span className="course__countdown-value">{String(countdown.minutes).padStart(2, '0')}</span>
                    <span className="course__countdown-text">{t('course.countdown_minutes')}</span>
                  </div>
                  <span className="course__countdown-sep">:</span>
                  <div className="course__countdown-unit">
                    <span className="course__countdown-value">{String(countdown.seconds).padStart(2, '0')}</span>
                    <span className="course__countdown-text">{t('course.countdown_seconds')}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="course__tariffs-grid">
              {(tp('course.tariffs.items') || []).map((tariff, i) => (
                <div
                  className={`course__tariff-card${tariff.recommended ? ' course__tariff-card--featured' : ''}`}
                  key={i}
                >
                  {tariff.recommended && (
                    <span className="course__tariff-recommended">{t('course.tariffs.recommended')}</span>
                  )}
                  <div className="course__tariff-badge" data-tariff={tariff.name.toLowerCase()}>
                    {tariff.name}
                  </div>
                  <div className="course__tariff-pricing">
                    <span className="course__tariff-price-old">${tariff.price}</span>
                    <span className="course__tariff-price-sale">${tariff.sale_price}</span>
                    <span className="course__tariff-sale-label">{t('course.tariffs.sale')}</span>
                  </div>
                  <p className="course__tariff-desc">{tariff.desc}</p>
                  <ul className="course__tariff-features">
                    {tariff.features.map((f, fi) => (
                      <li key={fi} className="course__tariff-feature">
                        <span className="course__tariff-check" aria-hidden="true">✦</span> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://t.me/noble_flair_design_bot?start=t_${['bazoviy', 'standart', 'vip'][i]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="course__tariff-btn"
                  >
                    {t('course.tariffs.btn')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </section>
  );
}
