import { useEffect, useRef } from 'react';
import { useTranslation } from '../../context/I18nContext';
import SectionTitle from '../UI/SectionTitle';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: '—',
    role: '—',
    text_uk: 'Тут будуть відгуки ваших студентів. Марина, додайте текст у цей компонент або завантажте з Firestore.',
    text_ru: 'Здесь будут отзывы ваших студентов. Марина, добавьте текст в этот компонент или загрузите из Firestore.',
    text_en: 'Student testimonials will appear here. Marina, add text to this component or load from Firestore.',
    avatar: null,
  },
];

export default function Testimonials() {
  const { t, locale } = useTranslation();
  const ref = useRef(null);

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
    }, 1000);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const getText = (item) => {
    if (locale === 'uk' && item.text_uk) return item.text_uk;
    if (locale === 'ru' && item.text_ru) return item.text_ru;
    return item.text_en || item.text_uk;
  };

  return (
    <section id="testimonials" className="section testimonials" ref={ref}>
      <div className="container">
        <SectionTitle
          titleKey={null}
          subtitleKey={null}
          forceTitle="Відгуки"
          forceSubtitle="Що кажуть наші студенти"
        />
        <div className="testimonials__grid fade-in">
          {TESTIMONIALS.map((item, i) => (
            <div className="testimonials__card" key={i}>
              <div className="testimonials__stars">★★★★★</div>
              <p className="testimonials__text">{getText(item)}</p>
              <div className="testimonials__author">
                {item.avatar && (
                  <img src={item.avatar} alt={item.name} className="testimonials__avatar" />
                )}
                <div>
                  <div className="testimonials__name">{item.name}</div>
                  <div className="testimonials__role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
