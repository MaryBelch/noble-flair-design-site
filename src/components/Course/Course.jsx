import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
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
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [openModule, setOpenModule] = useState(null);
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

  if (!modules.length) return null;

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
                      {mod.lessons.map((lesson, j) => (
                        <li key={j} className="course__module-lesson">
                          <span className="course__lesson-bullet">✦</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
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
      </div>
    </section>
  );
}
