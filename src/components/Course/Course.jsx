import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { markLessonViewed } from '../../firebase/firestore';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import AuthModal from '../Auth/AuthModal';
import './Course.css';

function getLessonLabel(count, locale) {
  if (locale === 'en') return count === 1 ? 'lesson' : 'lessons';
  if (locale === 'ru') {
    if (count === 1) return 'урок';
    if (count >= 2 && count <= 4) return 'урока';
    return 'уроков';
  }
  if (count === 1) return 'урок';
  if (count >= 2 && count <= 4) return 'уроки';
  return 'уроків';
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

// Sale ends July 31, 2026 at midnight
const SALE_END = new Date('2026-07-31T23:59:59+03:00');

export default function Course() {
  const { t, tp, locale } = useTranslation();
  const { user, userDoc, loading: authLoading, hasAccess, isAdmin } = useAuth();
  const ref = useRef(null);
  const [openModule, setOpenModule] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [progress, setProgress] = useState({}); // { "mod-0-lesson-0": true, ... }
  const modules = tp('course.modules') || [];
  const countdown = useSaleCountdown(SALE_END);

  // Load user progress from Firestore
  useEffect(() => {
    if (!user || !userDoc) {
      setProgress({});
      return;
    }
    const p = userDoc.progress || {};
    setProgress(p);
  }, [user, userDoc]);

  // Show fade-in elements
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-in').forEach((child) => child.classList.add('visible'));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    const timer = setTimeout(() => {
      el.querySelectorAll('.fade-in').forEach((child) => child.classList.add('visible'));
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [modules.length]);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  // Open first module by default once data loads
  useEffect(() => {
    if (modules.length > 0 && openModule === null) {
      setOpenModule(0);
    }
  }, [modules.length]);

  /** Check if a specific lesson is the free trial (first lesson of first module) */
  const isFreeLesson = (moduleIndex, lessonIndex) => moduleIndex === 0 && lessonIndex === 0;

  const handleLessonClick = (moduleIndex, lessonIndex, lessonTitle) => {
    // Free trial lesson — always accessible
    if (isFreeLesson(moduleIndex, lessonIndex)) {
      setSelectedLesson({ moduleIndex, lessonIndex, title: lessonTitle });
      setLessonData(null);
      setLessonLoading(true);
      markAsViewed(moduleIndex, lessonIndex);
      return;
    }

    if (authLoading) return;
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (!hasAccess && !isAdmin) return;
    setSelectedLesson({ moduleIndex, lessonIndex, title: lessonTitle });
    setLessonData(null);
    setLessonLoading(true);
    markAsViewed(moduleIndex, lessonIndex);
  };

  /** Save viewed lesson to Firestore and local state */
  const markAsViewed = (moduleIndex, lessonIndex) => {
    const lessonId = `mod-${moduleIndex}-lesson-${lessonIndex}`;
    setProgress((prev) => ({ ...prev, [lessonId]: true }));
    // Save to Firestore if user is logged in
    if (user) {
      markLessonViewed(user.uid, lessonId).catch(() => {});
    }
  };

  // Fetch lesson content from Firestore when a lesson is selected
  useEffect(() => {
    if (!selectedLesson) return;

    const lessonId = `mod-${selectedLesson.moduleIndex}-lesson-${selectedLesson.lessonIndex}`;

    async function fetchLesson() {
      try {
        const snap = await getDoc(doc(db, 'lessons', lessonId));
        if (snap.exists()) {
          setLessonData(snap.data());
        } else {
          setLessonData(null);
        }
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setLessonData(null);
      } finally {
        setLessonLoading(false);
      }
    }

    fetchLesson();
  }, [selectedLesson]);

  // Simple markdown-to-HTML converter for basic formatting
  function renderContent(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/^[-•] (.+)$/gm, '<span class="course__lesson-li">• $1</span>');
    html = html.replace(/^(\d+)\. (.+)$/gm, '<span class="course__lesson-li">$1. $2</span>');
    html = html.replace(/\n\n+/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    return `<p>${html}</p>`;
  }

  // If a lesson is selected, show LessonView
  if (selectedLesson) {
    const module = modules[selectedLesson.moduleIndex];
    const content = lessonData?.content?.[locale];
    const videoUrl = lessonData?.videoUrl;
    const files = lessonData?.files || [];
    const isFree = isFreeLesson(selectedLesson.moduleIndex, selectedLesson.lessonIndex);

    return (
      <section id="course" className="section course" ref={ref}>
        <div className="container">
          <div className="course__back-bar">
            <button
              className="course__back-btn"
              onClick={() => { setSelectedLesson(null); setLessonData(null); }}
            >
              ← {module?.title}
            </button>
            <span className="course__back-bar-title">
              {isFree && <span className="course__free-tag">FREE</span>}
              {' '}{selectedLesson.title}
            </span>
          </div>
          <div className="course__lesson-view fade-in visible">
            <h2 className="course__lesson-title">
              {isFree && <span className="course__free-tag" style={{ fontSize: '0.7rem', verticalAlign: 'middle', marginRight: 12 }}>FREE</span>}
              {selectedLesson.title}
            </h2>
            <div className="course__lesson-body">
              {lessonLoading ? (
                <p style={{ color: '#888' }}>Завантаження...</p>
              ) : content ? (
                <div
                  className="course__lesson-content"
                  dangerouslySetInnerHTML={{ __html: renderContent(content) }}
                />
              ) : (
                <p style={{ color: '#888' }}>
                  {isFree
                    ? '🎉 Це безкоштовний пробний урок! Контент з\'явиться незабаром.'
                    : t('course.lesson_placeholder')}
                </p>
              )}
            </div>
            {videoUrl && (
              <div className="course__lesson-video">
                <h4>🎬 Відео до уроку</h4>
                <video controls src={videoUrl} style={{ width: '100%', maxWidth: 720, borderRadius: 8 }} />
              </div>
            )}
            {files.length > 0 && (
              <div className="course__lesson-files">
                <h4>📎 Матеріали до уроку</h4>
                <ul>
                  {files.map((f, fi) => (
                    <li key={fi}>
                      <a href={f.url} target="_blank" rel="noopener noreferrer">{f.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

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
          <span className="course__lesson-bullet">
            {!user ? '🔒' : '🔒'}
          </span>
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
        <span className="course__lesson-bullet">
          {viewed ? '✓' : '✦'}
        </span>
        <span>
          {freeLesson && <span className="course__free-tag">FREE</span>}{' '}
          {lesson}
        </span>
      </li>
    );
  };

  return (
    <section id="course" className="section course" ref={ref}>
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
                  🎉 Спробуйте безкоштовний перший урок!
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

            <div className="course__modules-list">
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className={`course__module ${openModule === i ? 'course__module--open' : ''}`}
                >
                  <button
                    className="course__module-header"
                    onClick={() => toggleModule(i)}
                  >
                    <div className="course__module-header-left">
                      <span className="course__module-number">
                        {i === 0 ? t('course.modules.0.title') : `Модуль ${i}`}
                      </span>
                      <h4 className="course__module-title">
                        {i === 0 && (
                          <span className="course__free-tag" style={{ marginRight: 6 }}>FREE</span>
                        )}
                        {mod.title}
                      </h4>
                    </div>
                    <div className="course__module-meta">
                      <span className="course__module-count">
                        {mod.lessons.length} {getLessonLabel(mod.lessons.length, locale)}
                      </span>
                      <span
                        className={`course__module-arrow ${openModule === i ? 'course__module-arrow--open' : ''}`}
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
          </div>

          {/* Tariffs with countdown */}
          {selectedLesson === null && (
            <div className="course__tariffs fade-in">
              <h3 className="course__tariffs-title">{t('course.tariffs.title')}</h3>

              {!countdown.ended && (
                <div className="course__countdown">
                  <span className="course__countdown-label">⏳ Знижка діє ще:</span>
                  <div className="course__countdown-timer">
                    <div className="course__countdown-unit">
                      <span className="course__countdown-value">{String(countdown.days).padStart(2, '0')}</span>
                      <span className="course__countdown-text">дн</span>
                    </div>
                    <span className="course__countdown-sep">:</span>
                    <div className="course__countdown-unit">
                      <span className="course__countdown-value">{String(countdown.hours).padStart(2, '0')}</span>
                      <span className="course__countdown-text">год</span>
                    </div>
                    <span className="course__countdown-sep">:</span>
                    <div className="course__countdown-unit">
                      <span className="course__countdown-value">{String(countdown.minutes).padStart(2, '0')}</span>
                      <span className="course__countdown-text">хв</span>
                    </div>
                    <span className="course__countdown-sep">:</span>
                    <div className="course__countdown-unit">
                      <span className="course__countdown-value">{String(countdown.seconds).padStart(2, '0')}</span>
                      <span className="course__countdown-text">сек</span>
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
                          <span className="course__tariff-check">✦</span> {f}
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
          )}
        </div>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </section>
  );
}
