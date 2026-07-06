import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import { useAuth } from '../../context/AuthContext';
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

export default function Course() {
  const { t, tp, locale } = useTranslation();
  const { user, loading: authLoading, hasAccess, isAdmin } = useAuth();
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [openModule, setOpenModule] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const modules = tp('course.modules') || [];

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
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');

    if (!name || !email) return;

    setSubmitted(true);
    window.open(`https://t.me/noble_flair_design_bot?start=course_${name}`, '_blank');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  // Open first module by default once data loads
  useEffect(() => {
    if (modules.length > 0 && openModule === null) {
      setOpenModule(0);
    }
  }, [modules.length]);

  const handleLessonClick = (moduleIndex, lessonIndex, lessonTitle) => {
    if (authLoading) return;
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (!hasAccess && !isAdmin) return;
    setSelectedLesson({ moduleIndex, lessonIndex, title: lessonTitle });
  };

  if (!modules.length) return null;

  // If a lesson is selected, show LessonView
  if (selectedLesson) {
    const module = modules[selectedLesson.moduleIndex];
    const lessonContent = module?.lessons?.[selectedLesson.lessonIndex] || selectedLesson.title;
    return (
      <section id="course" className="section course" ref={ref}>
        <div className="container">
          <div className="course__back-bar">
            <button
              className="course__back-btn"
              onClick={() => setSelectedLesson(null)}
            >
              ← Назад до модулів
            </button>
            <span className="course__back-bar-title">
              {module?.title} — {selectedLesson.title}
            </span>
          </div>
          <div className="course__lesson-view fade-in visible">
            <h2 className="course__lesson-title">{selectedLesson.title}</h2>
            <div className="course__lesson-body">
              <p style={{ color: '#888' }}>
                {t('course.lesson_placeholder')}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const renderLessonItem = (lesson, moduleIndex, lessonIndex) => {
    const locked = !user || (!hasAccess && !isAdmin);

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
        <span className="course__lesson-bullet">✦</span>
        <span>{lesson}</span>
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
                      <h4 className="course__module-title">{mod.title}</h4>
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

          <div className="course__form-wrapper fade-in">
            <div className="course__form-card">
              <h3 className="course__form-title">{t('course.cta')}</h3>
              {submitted ? (
                <p className="course__form-success">{t('contact.form_success')}</p>
              ) : (
                <form className="course__form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder={t('course.placeholder_name')}
                    className="course__form-input"
                    required
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder={t('course.placeholder_email')}
                    className="course__form-input"
                    required
                  />
                  <Button variant="outline-animated" type="submit" className="course__form-btn">
                    {t('course.submit')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </section>
  );
}
