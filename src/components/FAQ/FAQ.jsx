import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../context/I18nContext';
import SectionTitle from '../UI/SectionTitle';
import './FAQ.css';

const FAQ_DATA = [
  { key: 'course_format' },
  { key: 'duration' },
  { key: 'tools' },
  { key: 'certificate' },
  { key: 'support' },
  { key: 'refund' },
];

export default function FAQ() {
  const { t, locale } = useTranslation();
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

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

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section faq" ref={ref}>
      <div className="container">
        <SectionTitle
          titleKey="faq.title"
          subtitleKey="faq.subtitle"
        />
        <div className="faq__list fade-in">
          {FAQ_DATA.map((item, i) => (
            <div
              key={item.key}
              className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}
            >
              <button
                className="faq__question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{t(`faq.${item.key}_q`)}</span>
                <svg
                  className={`faq__arrow ${openIndex === i ? 'faq__arrow--open' : ''}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="faq__answer">
                <p>{t(`faq.${item.key}_a`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
