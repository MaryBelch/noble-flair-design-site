import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import './Course.css';

const MODULE_COUNT = 4;

export default function Course() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-in').forEach((child) => child.classList.add('visible'));
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const modules = Array.from({ length: MODULE_COUNT }, (_, i) => i + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');

    if (!name || !email) return;

    const text = encodeURIComponent(`🙋 Заявка на курс «Мистецтво презентацій»\nІм'я: ${name}\nКонтакт: ${email}`);
    setSubmitted(true);

    // Open Telegram with pre-filled message
    window.open(`https://t.me/noble_flair_design_bot?start=course_${name}`, '_blank');

    setTimeout(() => setSubmitted(false), 5000);
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
            <h3 className="course__modules-title">{t('course.program_title')}</h3>
            <div className="course__modules-grid">
              {modules.map((m) => (
                <div key={m} className="course__module">
                  <div className="course__module-number">0{m}</div>
                  <div className="course__module-content">
                    <h4>{t(`course.module${m}_title`)}</h4>
                    <p>{t(`course.module${m}_desc`)}</p>
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
                  <Button variant="primary" type="submit" className="course__form-btn">
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
