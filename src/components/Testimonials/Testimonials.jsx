import { useState, useCallback } from 'react';
import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import './Testimonials.css';

function avatarUrl(name) {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&background=D4AF37&color=0a0a0a&bold=true&size=128&font-size=0.4&format=svg`;
}

const TESTIMONIALS = [
  {
    name: 'Ольга Коваленко',
    role_uk: 'Підприємець, пройшла курс',
    role_ru: 'Предприниматель, прошла курс',
    role_en: 'Entrepreneur, completed the course',
    text_uk: 'Дуже рада, що знайшла цей курс! Раніше мої презентації виглядали нудно, а тепер я отримую компліменти від партнерів після кожної зустрічі. Модуль з інфографікою — просто знахідка, навчилася подавати дані гарно та зрозуміло. Дякую Марині за крутий матеріал і підтримку!',
    text_ru: 'Очень рада, что нашла этот курс! Раньше мои презентации выглядели скучно, а теперь я получаю комплименты от партнёров после каждой встречи. Модуль с инфографикой — просто находка, научилась подавать данные красиво и понятно. Спасибо Марине за крутой материал и поддержку!',
    text_en: 'So glad I found this course! My presentations used to look boring, but now I get compliments from partners after every meeting. The infographics module was a game-changer — I learned to present data beautifully and clearly. Thank you, Marina, for the great material and support!',
  },
  {
    name: 'Андрій Мельник',
    role_uk: 'Засновник стартапу',
    role_ru: 'Основатель стартапа',
    role_en: 'Startup founder',
    text_uk: 'Замовляв дизайн презентації для пітч-деку. Результат перевершив очікування — інвестори відзначили візуальну подачу, і ми отримали перший раунд фінансування. Марина дуже уважно вникла в наш продукт і зробила саме те, що потрібно. Рекомендую!',
    text_ru: 'Заказывал дизайн презентации для питч-дека. Результат превзошёл ожидания — инвесторы отметили визуальную подачу, и мы получили первый раунд финансирования. Марина очень внимательно вникла в наш продукт и сделала именно то, что нужно. Рекомендую!',
    text_en: 'I ordered a presentation design for a pitch deck. The result exceeded expectations — investors praised the visual delivery, and we secured our first funding round. Marina thoroughly understood our product and delivered exactly what was needed. Highly recommend!',
  },
  {
    name: 'Наталія Романюк',
    role_uk: 'Власниця б\'юті-студії',
    role_ru: 'Владелица бьюти-студии',
    role_en: 'Beauty studio owner',
    text_uk: 'Довго шукала, хто зробить мені сайт, і дуже рада, що звернулась саме сюди. Сайт вийшов легкий, сучасний, клієнти кажуть, що все інтуїтивно зрозуміло. Запитів на запис стало значно більше! Окреме спасибі за підтримку після запуску — все працює ідеально.',
    text_ru: 'Долго искала, кто сделает мне сайт, и очень рада, что обратилась именно сюда. Сайт получился лёгкий, современный, клиенты говорят, что всё интуитивно понятно. Запросов на запись стало значительно больше! Отдельное спасибо за поддержку после запуска — всё работает идеально.',
    text_en: 'I looked for a long time for someone to build my website and I\'m so glad I came here. The site is light, modern, and clients say everything is intuitive. Appointment requests have increased significantly! Special thanks for the post-launch support — everything works perfectly.',
  },
  {
    name: 'Дмитро Савченко',
    role_uk: 'Маркетолог, B2B-компанія',
    role_ru: 'Маркетолог, B2B-компания',
    role_en: 'Marketer, B2B company',
    text_uk: 'Замовляв дизайн фірмового стилю та серію банерів для рекламної кампанії. Робота виконана швидко, якісно і з повним розумінням задачі. Банери отримали високий CTR, а новий візуальний стиль виглядає професійно та впізнавано. Ціна-якість на висоті!',
    text_ru: 'Заказывал дизайн фирменного стиля и серию баннеров для рекламной кампании. Работа выполнена быстро, качественно и с полным пониманием задачи. Баннеры получили высокий CTR, а новый визуальный стиль выглядит профессионально и узнаваемо. Цена-качество на высоте!',
    text_en: 'I ordered a brand identity design and a series of banners for an ad campaign. The work was done quickly, with high quality and full understanding of the brief. The banners achieved a high CTR, and the new visual style looks professional and recognizable. Great value for money!',
  },
  {
    name: 'Катерина Лисенко',
    role_uk: 'Наречена, замовляла запрошення',
    role_ru: 'Невеста, заказывала приглашения',
    role_en: 'Bride, ordered wedding invitations',
    text_uk: 'Замовляла весільні запрошення та брендований пакет для гостей. Це було щось неймовірне! Марина допомогла підібрати стиль, кольори та текстури, які ідеально відповідали тематиці весілля. Гості були в захваті, багато хто забрав запрошення додому як пам\'ять. Якість друку — супер!',
    text_ru: 'Заказывала свадебные приглашения и брендированный пакет для гостей. Это было нечто невероятное! Марина помогла подобрать стиль, цвета и текстуры, которые идеально соответствовали тематике свадьбы. Гости были в восторге, многие забрали приглашения домой на память. Качество печати — супер!',
    text_en: 'I ordered wedding invitations and a branded package for guests. It was incredible! Marina helped choose the style, colors, and textures that perfectly matched the wedding theme. Guests were delighted — many took the invitations home as keepsakes. The print quality is superb!',
  },
  {
    name: 'Ірина Поліщук',
    role_uk: 'Постійна клієнтка прикрас',
    role_ru: 'Постоянная клиентка украшений',
    role_en: 'Regular jewelry client',
    text_uk: 'Вже втретє замовляю прикраси з епоксидки, і щоразу це маленький витвір мистецтва. Кулон із лавандою ношу майже не знімаю — всі питають, де таке купити. Нещодавно замовила браслет у подарунок подрузі, вона була безмежно щаслива. Теплота ручної роботи — це особливе!',
    text_ru: 'Уже в третий раз заказываю украшения из эпоксидки, и каждый раз это маленькое произведение искусства. Кулон с лавандой ношу почти не снимая — все спрашивают, где такое купить. Недавно заказала браслет в подарок подруге, она была безмерно счастлива. Теплота ручной работы — это особенное!',
    text_en: 'This is my third time ordering epoxy resin jewelry, and each piece is a little work of art. I wear my lavender pendant almost every day — everyone asks where I got it. Recently ordered a bracelet as a gift for a friend, and she was absolutely thrilled. The warmth of handmade work is truly special!',
  },
];

export default function Testimonials() {
  const { t, locale } = useTranslation();
  const sectionRef = useScrollReveal([]);
  const [current, setCurrent] = useState(0);

  const getText = (item) => {
    if (locale === 'uk' && item.text_uk) return item.text_uk;
    if (locale === 'ru' && item.text_ru) return item.text_ru;
    return item.text_en || item.text_uk;
  };

  const getRole = (item) => {
    if (locale === 'uk' && item.role_uk) return item.role_uk;
    if (locale === 'ru' && item.role_ru) return item.role_ru;
    return item.role_en || item.role_uk;
  };

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const item = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="section testimonials" ref={sectionRef}>
      <div className="container">
        <SectionTitle
          titleKey={null}
          subtitleKey={null}
          forceTitle="Відгуки"
          forceSubtitle="Що кажуть наші клієнти"
        />
        <div className="testimonials__carousel fade-in">
          {/* Progress dots */}
          <div className="testimonials__dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={t('testimonial') + ` ${i + 1}`}
              />
            ))}
          </div>

          {/* Card */}
          <div className="testimonials__card" key={current}>
            <div className="testimonials__stars">★★★★★</div>
            <p className="testimonials__text">{getText(item)}</p>
            <div className="testimonials__author">
              <img
                src={avatarUrl(item.name)}
                alt={item.name}
                className="testimonials__avatar"
                loading="lazy"
              />
              <div>
                <div className="testimonials__name">{item.name}</div>
                <div className="testimonials__role">{getRole(item)}</div>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="testimonials__nav">
            <button className="testimonials__nav-btn" onClick={goPrev} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="testimonials__counter">{current + 1}/{TESTIMONIALS.length}</span>
            <button className="testimonials__nav-btn" onClick={goNext} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
