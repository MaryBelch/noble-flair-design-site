# Noble Flair Design — Преміальна дизайн-студія

**Noble Flair Design** — це веб-сайт преміальної дизайн-студії, що спеціалізується на розробці презентацій, веб-сайтів, поліграфії, а також навчанні (курс «Мистецтво презентацій») та авторських прикрасах з епоксидної смоли.

Сайт підтримує три мови (українська, російська, англійська), має систему автентифікації, PWA-режим та оптимізовану продуктивність.

**🌐 Демо:** https://marybelch.github.io/noble-flair-design-site/

---

## Технологічний стек

- **React 19** + **Vite 8** — швидкий збірник з HMR
- **Firebase** — автентифікація (email/password), Firestore (уроки, повідомлення, payments, користувачі), Analytics (GA4)
- **PWA** — Service Worker (network-first кешування), Web App Manifest, офлайн-доступ
- **i18n** — власний I18nContext з динамічним імпортом JSON-перекладів (uk/ru/en)
- **Анімації** — CSS golden shimmer, IntersectionObserver scroll-reveal, typing-ефект, паралакс

---

## Функціонал

| Можливість | Статус |
|---|---|
| 🎨 Головна з typing-ефектом та паралаксом | ✅ |
| 📖 Курс «Мистецтво презентацій» з модулями та тарифами | ✅ |
| 🖼️ Портфоліо з фільтрацією по категоріях | ✅ |
| 📞 Контактна форма з валідацією та Firestore | ✅ |
| 🔐 Автентифікація (вхід/реєстрація/скидання пароля) | ✅ |
| 👑 Адмін-панель для керування контентом | ✅ |
| 🌍 Мультимовність (UK/RU/EN) | ✅ |
| 📱 PWA (офлайн, встановлення на екран) | ✅ |
| ♿ Доступність (ARIA, Skip Link, Focus Trap) | ✅ |
| 📊 SEO (JSON-LD, Open Graph, hreflang, sitemap) | ✅ |
| 🚀 Оптимізована продуктивність (lazy loading, manual chunks) | ✅ |

---

## Запуск локально

```bash
# Встановлення залежностей
npm install

# Розробка (HMR)
npm run dev

# Збірка для продакшену
npm run build

# Локальний перегляд збірки
npm run preview

# Аналіз бандла (відкриває stats.html)
npm run analyze
```

### Змінні оточення

Скопіюйте `.env.example` у `.env` та заповніть Firebase-ключі:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_SALE_END=2026-07-16T23:59:59
```

---

## Структура проєкту

```
noble-flair-design-site/
├── public/
│   ├── sw.js              # Service Worker
│   ├── manifest.json       # PWA-маніфест
│   ├── 404.html            # GitHub Pages 404
│   └── favicon.svg         # Іконка сайту
├── src/
│   ├── components/
│   │   ├── About/          # Секція "Про студію"
│   │   ├── Admin/          # Адмін-панель
│   │   ├── Auth/           # Модалка автентифікації
│   │   ├── Contact/        # Контактна форма
│   │   ├── Course/         # Сторінка курсу
│   │   ├── FAQ/            # Часті питання
│   │   ├── Footer/         # Підвал
│   │   ├── Header/         # Шапка + навігація
│   │   ├── Hero/           # Головний екран
│   │   ├── Portfolio/      # Портфоліо
│   │   ├── Services/       # Послуги
│   │   ├── Testimonials/   # Відгуки
│   │   ├── UI/             # UI-компоненти (Button, Loader, Toast тощо)
│   │   └── Vacancies/      # Вакансії
│   ├── context/            # React Context (Auth, I18n)
│   ├── data/               # JSON-файли (translations, services, portfolio, testimonials)
│   ├── firebase/           # Firebase конфіг та сервіси (auth, firestore)
│   ├── hooks/              # Кастомні хуки (useScrollReveal)
│   ├── lib/                # Утиліти (analytics)
│   ├── styles/             # Глобальні стилі
│   ├── App.jsx             # Головний компонент
│   └── main.jsx            # Точка входу
├── .env.example            # Шаблон змінних оточення
├── .github/workflows/      # CI/CD (GitHub Actions → GitHub Pages)
├── package.json
├── vite.config.js
└── sitemap.xml
```

---

## CI/CD

При пуші в гілку `main` автоматично запускається збірка та деплой на GitHub Pages (GitHub Actions).

---

## Доступність (Accessibility)

- ARIA-ролі та атрибути (banner, navigation, region, tablist тощо)
- Skip-link для навігації з клавіатури
- Focus trap у модальних вікнах та мобільному меню
- aria-hidden для декоративних іконок
- aria-live для повідомлень про оновлення
- Підтримка prefers-reduced-motion
- Анімації з `@media (prefers-reduced-motion: no-preference)`

---

## Оптимізація продуктивності

- **Lazy loading** секцій нижче згину (React.lazy + Suspense)
- **Manual chunks** для Firebase та vendor (React)
- **rAF-тротлінг** для паралакса
- **IntersectionObserver** для scroll-reveal анімацій
- **CSS-анімації** замість JS для плавності
- **Network-first SW** з кешуванням статики

---

## Ліцензія

© 2026 Noble Flair Design. Всі права захищені.
