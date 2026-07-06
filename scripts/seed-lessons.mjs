import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYmhyQ8WjUUgE2IN7eKCVQ9V6zFIO7XqY',
  authDomain: 'noble-flair-app.firebaseapp.com',
  projectId: 'noble-flair-app',
  storageBucket: 'noble-flair-app.firebasestorage.app',
  messagingSenderId: '884435593575',
  appId: '1:884435593575:web:90aa1e19f9b93ae655e7c2',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const lessons = [
  // ═══ МОДУЛЬ 0: Вступний модуль ═══
  {
    id: 'mod-0-lesson-0',
    moduleIndex: 0,
    order: 0,
    title: { uk: 'Як пройти курс з користю', ru: 'Как пройти курс с пользой', en: 'How to benefit from this course' },
    content: {
      uk: `Цей урок — ваш план дій на весь курс. Ми розберемо, як побудувати навчання так, щоб отримати максимальний результат.

**Як побудований курс**
Курс складається з 9 модулів, кожен з яких присвячений окремій темі. Ви можете проходити їх послідовно або вибірково, залежно від ваших цілей.

**Практичні завдання**
Після кожного модуля вас чекають практичні завдання. Не пропускайте їх — саме практика перетворює знання на навички.

**Додаткові матеріали**
До кожного уроку додаються шаблони, чек-листи та корисні посилання. Завантажуйте їх і використовуйте у своїх проектах.

**Порада:** Ведіть конспект у Obsidian або Google Docs — це допоможе систематизувати знання.`,
      ru: `Этот урок — ваш план действий на весь курс. Мы разберем, как построить обучение так, чтобы получить максимальный результат.

**Как построен курс**
Курс состоит из 9 модулей, каждый из которых посвящен отдельной теме. Вы можете проходить их последовательно или выборочно, в зависимости от ваших целей.

**Практические задания**
После каждого модуля вас ждут практические задания. Не пропускайте их — именно практика превращает знания в навыки.

**Дополнительные материалы**
К каждому уроку прилагаются шаблоны, чек-листы и полезные ссылки. Скачивайте их и используйте в своих проектах.

**Совет:** Ведите конспект в Obsidian или Google Docs — это поможет систематизировать знания.`,
      en: `This lesson is your action plan for the entire course. We'll explore how to structure your learning for maximum results.

**Course Structure**
The course consists of 9 modules, each covering a separate topic. You can go through them sequentially or selectively, depending on your goals.

**Practical Tasks**
Each module includes practical assignments. Don't skip them — practice turns knowledge into skills.

**Additional Materials**
Every lesson comes with templates, checklists, and useful links. Download and use them in your projects.

**Tip:** Take notes in Obsidian or Google Docs — it helps organize your knowledge.`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-0-lesson-1',
    moduleIndex: 0,
    order: 1,
    title: { uk: 'Мій «Другий мозок» в Obsidian', ru: 'Мой «Второй мозг» в Obsidian', en: 'My Second Brain in Obsidian' },
    content: {
      uk: `У цьому уроці ми познайомимося з системою знань на базі Obsidian — потужного інструменту для нотаток.

**Що таке «Другий мозок»**
Методика «Другий мозок» (Second Brain) — це система збору, організації та використання інформації. Вона допомагає нічого не забувати і швидко знаходити потрібні матеріали.

**Чому Obsidian**
- Безкоштовний
- Працює локально (ваші дані — ваші)
- Підтримує зв'язки між нотатками
- Велика бібліотека плагінів

**Структура для курсу**
Ми створимо окремий проект в Obsidian для цього курсу. Він міститиме:
- Конспекти уроків
- Список ресурсів (посилання, кольори, шрифти)
- Замітки з ідеями для проектів
- Шаблони для презентацій`,
      ru: `В этом уроке мы познакомимся с системой знаний на базе Obsidian — мощного инструмента для заметок.

**Что такое «Второй мозг»**
Методика «Второй мозг» (Second Brain) — это система сбора, организации и использования информации. Она помогает ничего не забывать и быстро находить нужные материалы.

**Почему Obsidian**
- Бесплатный
- Работает локально (ваши данные — ваши)
- Поддерживает связи между заметками
- Большая библиотека плагинов

**Структура для курса**
Мы создадим отдельный проект в Obsidian для этого курса. Он будет содержать:
- Конспекты уроков
- Список ресурсов (ссылки, цвета, шрифты)
- Заметки с идеями для проектов
- Шаблоны для презентаций`,
      en: `In this lesson we'll explore the Second Brain knowledge system using Obsidian — a powerful note-taking tool.

**What is Second Brain**
The Second Brain methodology is a system for collecting, organizing, and using information. It helps you never forget anything and quickly find the materials you need.

**Why Obsidian**
- Free
- Works locally (your data stays yours)
- Supports connections between notes
- Large plugin library

**Course Structure**
We'll create a dedicated Obsidian project for this course containing:
- Lesson notes
- Resource lists (links, colors, fonts)
- Project idea notes
- Presentation templates`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-0-lesson-2',
    moduleIndex: 0,
    order: 2,
    title: { uk: 'Планування проекту', ru: 'Планирование проекта', en: 'Project Planning' },
    content: {
      uk: `Перш ніж створювати презентацію, потрібно чітко розуміти, для чого вона і кому призначена.

**Аналіз аудиторії**
Хто буде дивитися вашу презентацію? Керівники, клієнти, студенти? Від цього залежить стиль, глибина деталізації та формат подачі.

**Мета презентації**
Чого ви хочете досягти? Продати ідею, отримати інвестиції, навчити, звітувати? Кожна мета потребує різної структури.

**Структура проекту**
Створіть документ з планом презентації:
1. Тема та мета
2. Цільова аудиторія
3. Ключові повідомлення
4. Структура слайдів
5. Ресурси (зображення, іконки, шрифти)
6. Делайн

**Інструменти:** Google Docs, Notion, Obsidian — оберіть зручний для вас.`,
      ru: `Прежде чем создавать презентацию, нужно четко понимать, для чего она и кому предназначена.

**Анализ аудитории**
Кто будет смотреть вашу презентацию? Руководители, клиенты, студенты? От этого зависит стиль, глубина детализации и формат подачи.

**Цель презентации**
Чего вы хотите достичь? Продать идею, получить инвестиции, обучить, отчитаться? Каждая цель требует разной структуры.

**Структура проекта**
Создайте документ с планом презентации:
1. Тема и цель
2. Целевая аудитория
3. Ключевые сообщения
4. Структура слайдов
5. Ресурсы (изображения, иконки, шрифты)
6. Дедлайн

**Инструменты:** Google Docs, Notion, Obsidian — выберите удобный для вас.`,
      en: `Before creating a presentation, you need to clearly understand its purpose and audience.

**Audience Analysis**
Who will watch your presentation? Executives, clients, students? The style, detail depth, and format depend on this.

**Presentation Goal**
What do you want to achieve? Sell an idea, get investment, teach, report? Each goal requires a different structure.

**Project Structure**
Create a planning document:
1. Topic and goal
2. Target audience
3. Key messages
4. Slide structure
5. Resources (images, icons, fonts)
6. Deadline

**Tools:** Google Docs, Notion, Obsidian — choose what works for you.`,
    },
    videoUrl: '',
    files: [],
  },

  // ═══ МОДУЛЬ 1: База дизайну (Теорія + Софт) ═══
  {
    id: 'mod-1-lesson-0',
    moduleIndex: 1,
    order: 0,
    title: { uk: 'Візуальна мова. Композиція, типографіка та ієрархія', ru: 'Визуальный язык. Композиция, типографика и иерархия', en: 'Visual Language. Composition, Typography & Hierarchy' },
    content: {
      uk: `Основа будь-якої презентації — візуальна мова. Це те, як глядач сприймає ваші слайди.

**Композиція**
Правильне розташування елементів на слайді. Основні принципи:
- Правило третин — розділіть слайд на 3×3 сітку
- Симетрія та асиметрія для створення динаміки
- Баланс між текстом і зображеннями
- Не залишайте порожніх просторів без уваги

**Типографіка**
Вибір шрифтів та їх поєднання:
- Не більше 2 шрифтів на одну презентацію
- Заголовки: жирний, великий кегль
- Тіло тексту: легкий для читання шрифт, 14-18pt
- Контраст між заголовком і текстом

**Ієрархія**
Глядач має розуміти, на що дивитися в першу чергу:
- Найважливіше — найбільшим шрифтом або яскравим кольором
- Другорядне — менше, приглушене
- Деталі — мінімальним розміром`,
      ru: `Основа любой презентации — визуальный язык. Это то, как зритель воспринимает ваши слайды.

**Композиция**
Правильное расположение элементов на слайде. Основные принципы:
- Правило третей — разделите слайд на сетку 3×3
- Симметрия и асимметрия для создания динамики
- Баланс между текстом и изображениями
- Не оставляйте пустые пространства без внимания

**Типографика**
Выбор шрифтов и их сочетание:
- Не более 2 шрифтов на одну презентацию
- Заголовки: жирный, крупный кегль
- Текст: легкий для чтения шрифт, 14-18pt
- Контраст между заголовком и текстом

**Иерархия**
Зритель должен понимать, на что смотреть в первую очередь:
- Самое важное — самым крупным шрифтом или ярким цветом
- Второстепенное — мельче, приглушенно
- Детали — минимальным размером`,
      en: `The foundation of any presentation is visual language — how the viewer perceives your slides.

**Composition**
Proper arrangement of elements on a slide. Key principles:
- Rule of thirds — divide the slide into a 3×3 grid
- Symmetry and asymmetry for dynamics
- Balance between text and images
- Don't leave empty spaces unattended

**Typography**
Font selection and pairing:
- Maximum 2 fonts per presentation
- Headers: bold, large size
- Body text: easy-to-read font, 14-18pt
- Contrast between header and body

**Hierarchy**
The viewer should know what to look at first:
- Most important → largest font or bright color
- Secondary → smaller, muted
- Details → minimum size`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-1-lesson-1',
    moduleIndex: 1,
    order: 1,
    title: { uk: 'Інтерфейс PowerPoint / Google Slides. Робота з шаблонами', ru: 'Интерфейс PowerPoint / Google Slides. Работа с шаблонами', en: 'PowerPoint / Google Slides Interface. Working with Templates' },
    content: {
      uk: `Знайомство з інструментами, в яких ми будемо працювати.

**PowerPoint**
Ключові можливості:
- Режими перегляду (Normal, Outline, Slide Sorter)
- Робота з майстрами слайдів (Slide Master)
- Анімація та переходи
- Експорт у PDF, відео, формати зображень

**Google Slides**
Переваги:
- Безкоштовний, працює в браузері
- Спільна робота в реальному часі
- Історія змін
- Інтеграція з Google Drive

**Шаблони**
Створення власних шаблонів:
- Налаштуйте майстер-слайд один раз
- Збережіть кольори та шрифти в темі
- Використовуйте зразки слайдів для повторюваних макетів`,
      ru: `Знакомство с инструментами, в которых мы будем работать.

**PowerPoint**
Ключевые возможности:
- Режимы просмотра (Normal, Outline, Slide Sorter)
- Работа с образцами слайдов (Slide Master)
- Анимация и переходы
- Экспорт в PDF, видео, форматы изображений

**Google Slides**
Преимущества:
- Бесплатный, работает в браузере
- Совместная работа в реальном времени
- История изменений
- Интеграция с Google Drive

**Шаблоны**
Создание собственных шаблонов:
- Настройте мастер-слайд один раз
- Сохраните цвета и шрифты в теме
- Используйте образцы слайдов для повторяющихся макетов`,
      en: `Getting familiar with the tools we'll be working with.

**PowerPoint**
Key features:
- View modes (Normal, Outline, Slide Sorter)
- Slide Master functionality
- Animation and transitions
- Export to PDF, video, image formats

**Google Slides**
Advantages:
- Free, works in browser
- Real-time collaboration
- Version history
- Google Drive integration

**Templates**
Creating your own templates:
- Set up the master slide once
- Save colors and fonts in the theme
- Use slide layouts for recurring designs`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-1-lesson-2',
    moduleIndex: 1,
    order: 2,
    title: { uk: 'Ресурсна база', ru: 'Ресурсная база', en: 'Resource Base' },
    content: {
      uk: `Для створення якісних презентацій потрібні якісні ресурси. Зберемо базу найкращих джерел.

**Безкоштовні зображення**
- Unsplash — фото високої якості
- Pexels — відео та фото
- Freepik — векторна графіка та ілюстрації
- Pixeden — мокапи та дизайн-елементи

**Іконки**
- Flaticon — найбільша бібліотека іконок
- Icon8 — стильні іконки різних форматів
- The Noun Project — мінімалістичні іконки

**Шрифти**
- Google Fonts — безкоштовні веб-шрифти
- Font Squirrel — ліцензійно чисті шрифти
- DaFont — декоративні шрифти

**Кольори**
- Coolors — генератор колірних палітр
- Adobe Color — створення та аналіз палітр`,
      ru: `Для создания качественных презентаций нужны качественные ресурсы. Соберем базу лучших источников.

**Бесплатные изображения**
- Unsplash — фото высокого качества
- Pexels — видео и фото
- Freepik — векторная графика и иллюстрации
- Pixeden — мокапы и дизайн-элементы

**Иконки**
- Flaticon — крупнейшая библиотека иконок
- Icon8 — стильные иконки разных форматов
- The Noun Project — минималистичные иконки

**Шрифты**
- Google Fonts — бесплатные веб-шрифты
- Font Squirrel — лицензионно чистые шрифты
- DaFont — декоративные шрифты

**Цвета**
- Coolors — генератор цветовых палитр
- Adobe Color — создание и анализ палитр`,
      en: `Creating quality presentations requires quality resources. Let's build a base of the best sources.

**Free Images**
- Unsplash — high-quality photos
- Pexels — videos and photos
- Freepik — vector graphics and illustrations
- Pixeden — mockups and design elements

**Icons**
- Flaticon — largest icon library
- Icon8 — stylish icons in various formats
- The Noun Project — minimalist icons

**Fonts**
- Google Fonts — free web fonts
- Font Squirrel — licensed clean fonts
- DaFont — decorative fonts`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-1-lesson-3',
    moduleIndex: 1,
    order: 3,
    title: { uk: 'Насмотреність. Pinterest, Behance, Dribbble', ru: 'Насмотренность. Pinterest, Behance, Dribbble', en: 'Visual Inspiration. Pinterest, Behance, Dribbble' },
    content: {
      uk: `Насмотреність — це здатність дизайнера відрізняти хороший дизайн від поганого. Вона розвивається через постійне вивчення робіт інших.

**Pinterest**
Пошук ідей та референсів:
- Створюйте дошки за темами (презентації, кольори, шрифти)
- Використовуйте пошук за зображенням
- Підписуйтесь на дизайнерів та студії

**Behance**
Професійне портфоліо:
- Найкращі роботи дизайнерів з усього світу
- Детальні кейси з описом процесу
- Можливість аналізувати чужі презентації

**Dribbble**
Швидкі скетчі та ідеї:
- Короткі візуальні рішення
- Тренди в дизайні
- Пошук за тегами`,
      ru: `Насмотренность — это способность дизайнера отличать хороший дизайн от плохого. Она развивается через постоянное изучение работ других.

**Pinterest**
Поиск идей и референсов:
- Создавайте доски по темам (презентации, цвета, шрифты)
- Используйте поиск по изображению
- Подписывайтесь на дизайнеров и студии

**Behance**
Профессиональное портфолио:
- Лучшие работы дизайнеров со всего мира
- Детальные кейсы с описанием процесса
- Возможность анализировать чужие презентации

**Dribbble**
Быстрые скетчи и идеи:
- Короткие визуальные решения
- Тренды в дизайне
- Поиск по тегам`,
      en: `Visual literacy is a designer's ability to distinguish good design from bad. It develops through constant study of others' work.

**Pinterest**
Finding ideas and references:
- Create boards by topic (presentations, colors, fonts)
- Use image search
- Follow designers and studios

**Behance**
Professional portfolio:
- Best designer works worldwide
- Detailed cases with process descriptions
- Opportunity to analyze others' presentations

**Dribbble**
Quick sketches and ideas:
- Short visual solutions
- Design trends
- Tag-based search`,
    },
    videoUrl: '',
    files: [],
  },

  // ═══ МОДУЛЬ 2: Дизайн елементів і Figma ═══
  {
    id: 'mod-2-lesson-0',
    moduleIndex: 2,
    order: 0,
    title: { uk: 'Титульний лист — обличчя проекту', ru: 'Титульный лист — лицо проекта', en: 'Title Slide — The Face of Your Project' },
    content: {
      uk: `Титульний слайд — перше, що бачить глядач. Він задає настрій всій презентації.

**Елементи титульного слайда**
- Назва проекту (великим, чітким шрифтом)
- Підзаголовок або уточнення
- Ваше ім'я / назва компанії
- Дата (опціонально)

**Дизайн-принципи**
- Мінімалізм: не перевантажуйте перший слайд
- Візуальний акцент: велике зображення або графічний елемент
- Контраст: текст має читатися на фоні
- Брендування: використовуйте кольори компанії

**Помилки**
- Забагато тексту на першому слайді
- Погані, розтягнуті зображення
- Відсутність контакту (автор, компанія)
- Нечитабельний шрифт на фоні`,
      ru: `Титульный слайд — первое, что видит зритель. Он задает настроение всей презентации.

**Элементы титульного слайда**
- Название проекта (крупным, четким шрифтом)
- Подзаголовок или уточнение
- Ваше имя / название компании
- Дата (опционально)

**Дизайн-принципы**
- Минимализм: не перегружайте первый слайд
- Визуальный акцент: большое изображение или графический элемент
- Контраст: текст должен читаться на фоне
- Брендирование: используйте цвета компании

**Ошибки**
- Слишком много текста на первом слайде
- Плохие, растянутые изображения
- Отсутствие контакта (автор, компания)
- Нечитабельный шрифт на фоне`,
      en: `The title slide is the first thing the viewer sees. It sets the mood for the entire presentation.

**Title Slide Elements**
- Project name (large, clear font)
- Subtitle or clarification
- Your name / company name
- Date (optional)

**Design Principles**
- Minimalism: don't overload the first slide
- Visual accent: large image or graphic element
- Contrast: text must be readable on the background
- Branding: use company colors`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-2-lesson-1',
    moduleIndex: 2,
    order: 1,
    title: { uk: 'Іконки', ru: 'Иконки', en: 'Icons' },
    content: {
      uk: `Іконки — потужний інструмент візуальної комунікації. Вони допомагають швидко передати ідею без тексту.

**Де використовувати іконки**
- Списки переваг або особливостей
- Навігація та кнопки дій
- Інфографіка та діаграми
- Контактна інформація

**Правила роботи з іконками**
- Єдиний стиль: всі іконки мають бути в одному стилі
- Однакова товщина ліній
- Відповідний розмір (не занадто дрібні)
- Колір: контрастний до фону

**Формати:** SVG (найкраще для вебу), PNG, векторні в Figma`,
      ru: `Иконки — мощный инструмент визуальной коммуникации. Они помогают быстро передать идею без текста.

**Где использовать иконки**
- Списки преимуществ или особенностей
- Навигация и кнопки действий
- Инфографика и диаграммы
- Контактная информация

**Правила работы с иконками**
- Единый стиль: все иконки должны быть в одном стиле
- Одинаковая толщина линий
- Соответствующий размер (не слишком мелкие)
- Цвет: контрастный к фону

**Форматы:** SVG (лучше всего для веба), PNG, векторные в Figma`,
      en: `Icons are a powerful visual communication tool. They help quickly convey an idea without text.

**Where to use icons**
- Feature lists
- Navigation and action buttons
- Infographics and charts
- Contact information

**Icon Rules**
- Single style: all icons should match
- Consistent line thickness
- Appropriate size (not too small)
- Color: contrast with background

**Formats:** SVG (best for web), PNG, vector in Figma`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-2-lesson-2',
    moduleIndex: 2,
    order: 2,
    title: { uk: 'Слайд «Про себе» та «Команда»', ru: 'Слайд «О себе» и «Команда»', en: 'About Me and Team Slides' },
    content: {
      uk: `Слайди "Про себе" та "Команда" — це про довіру. Вони показують, хто стоїть за проектом.

**Слайд «Про себе»**
- Ваше фото (професійне, якісне)
- Ім'я та посада
- 2-3 ключові досягнення
- Контактні дані (опціонально)

**Слайд «Команда»**
Можливі варіанти:
- Фото всіх членів команди в єдиному стилі
- Ім'я, посада, короткий опис
- Розташування: сітка або горизонтальний ряд

**Дизайн-поради**
- Всі фото мають бути в одному стилі (колір, обробка)
- Використовуйте єдиний шаблон для карток команди
- Додайте іконки соціальних мереж (LinkedIn, Instagram)`,
      ru: `Слайды «О себе» и «Команда» — это про доверие. Они показывают, кто стоит за проектом.

**Слайд «О себе»**
- Ваше фото (профессиональное, качественное)
- Имя и должность
- 2-3 ключевых достижения
- Контактные данные (опционально)

**Слайд «Команда»**
Возможные варианты:
- Фото всех членов команды в едином стиле
- Имя, должность, краткое описание
- Расположение: сетка или горизонтальный ряд

**Дизайн-советы**
- Все фото должны быть в одном стиле (цвет, обработка)
- Используйте единый шаблон для карточек команды
- Добавьте иконки соцсетей (LinkedIn, Instagram)`,
      en: `"About Me" and "Team" slides are about building trust. They show who is behind the project.

**About Me Slide**
- Professional photo
- Name and position
- 2-3 key achievements
- Contact info (optional)

**Team Slide**
Variations:
- All team photos in a unified style
- Name, position, short description
- Layout: grid or horizontal row`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-2-lesson-3',
    moduleIndex: 2,
    order: 3,
    title: { uk: 'Слайд «До/Після»', ru: 'Слайд «До/После»', en: 'Before/After Slide' },
    content: {
      uk: `Слайд "До/Після" — один з найефективніших способів показати цінність вашої роботи.

**Коли використовувати**
- Демонстрація результатів дизайну
- Показ покращень
- Портфоліо кейсів
- Презентація послуг

**Дизайн**
- Розділіть слайд на дві рівні половини
- Ліворуч — "До", праворуч — "Після"
- Однаковий масштаб та ракурс для чесного порівняння
- Додайте підписи та короткі коментарі

**Анімація**
Ефектний прийом: показувати спочатку "До", а потім по кліку — "Після". Це створює ефект "вау" у глядача.`,
      ru: `Слайд «До/После» — один из самых эффективных способов показать ценность вашей работы.

**Когда использовать**
- Демонстрация результатов дизайна
- Показ улучшений
- Портфолио кейсов
- Презентация услуг

**Дизайн**
- Разделите слайд на две равные половины
- Слева — «До», справа — «После»
- Одинаковый масштаб и ракурс для честного сравнения
- Добавьте подписи и короткие комментарии`,
      en: `The Before/After slide is one of the most effective ways to demonstrate the value of your work.

**When to use**
- Design results showcase
- Improvement demonstrations
- Portfolio cases
- Service presentations

**Design**
- Split the slide into two equal halves
- Left — "Before", Right — "After"
- Same scale and angle for fair comparison`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-2-lesson-4',
    moduleIndex: 2,
    order: 4,
    title: { uk: 'Ілюстрація', ru: 'Иллюстрация', en: 'Illustration' },
    content: {
      uk: `Ілюстрації роблять презентацію унікальною та запам'ятовуваною. Вони можуть замінити текст там, де слова зайві.

**Типи ілюстрацій**
- Векторні графічні елементи
- 3D-рендери та об'єкти
- Фотографії з обробкою
- Інфографіка
- Штрихові малюнки

**Де брати ілюстрації**
- Генерація в Midjourney / Adobe Firefly
- Сервіси: Storyset, unDraw, Humaaans
- Власні ілюстрації в Figma або Illustrator

**Поради**
- Ілюстрації мають підтримувати стиль презентації
- Використовуйте ілюстрації, які посилюють ваше повідомлення
- Не використовуйте стокові ілюстрації "як є" — адаптуйте їх`,
      ru: `Иллюстрации делают презентацию уникальной и запоминающейся. Они могут заменить текст там, где слова лишние.

**Типы иллюстраций**
- Векторные графические элементы
- 3D-рендеры и объекты
- Фотографии с обработкой
- Инфографика
- Штриховые рисунки

**Где брать иллюстрации**
- Генерация в Midjourney / Adobe Firefly
- Сервисы: Storyset, unDraw, Humaaans
- Собственные иллюстрации в Figma или Illustrator`,
      en: `Illustrations make presentations unique and memorable. They can replace text where words are unnecessary.

**Types of Illustrations**
- Vector graphic elements
- 3D renders and objects
- Processed photos
- Infographics
- Line drawings

**Sources**
- Midjourney / Adobe Firefly generation
- Storyset, unDraw, Humaaans
- Custom illustrations in Figma or Illustrator`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-2-lesson-5',
    moduleIndex: 2,
    order: 5,
    title: { uk: 'Мокапи', ru: 'Мокапы', en: 'Mockups' },
    content: {
      uk: `Мокапи допомагають показати ваш дизайн у реальному контексті: на екрані ноутбука, в руках людини, на вулиці тощо.

**Навіщо потрібні мокапи**
- Презентація дизайну клієнту в реалістичному вигляді
- Портфоліо — роботи виглядають професійніше
- Соціальні мережі — привертають більше уваги

**Де брати мокапи**
- Mockup World — велика бібліотека безкоштовних мокапів
- Pixeden — преміум та безкоштовні мокапи
- Smartmockups — генерація мокапів онлайн
- Placeit — величезна бібліотека

**Формати:** PSD (Photoshop), Figma-шаблони, онлайн-генератори

**Порада:** Використовуйте мокапи в єдиному стилі для всієї презентації.`,
      ru: `Мокапы помогают показать ваш дизайн в реальном контексте: на экране ноутбука, в руках человека, на улице и т.д.

**Зачем нужны мокапы**
- Презентация дизайна клиенту в реалистичном виде
- Портфолио — работы выглядят профессиональнее
- Социальные сети — привлекают больше внимания

**Где брать мокапы**
- Mockup World — большая библиотека бесплатных мокапов
- Pixeden — премиум и бесплатные мокапы
- Smartmockups — генерация мокапов онлайн
- Placeit — огромная библиотека

**Совет:** Используйте мокапы в едином стиле для всей презентации.`,
      en: `Mockups help showcase your design in a real-world context: on a laptop screen, in someone's hands, outdoors, etc.

**Why use mockups**
- Present designs to clients realistically
- Portfolio work looks more professional
- Social media — attracts more attention

**Sources**
- Mockup World — free mockup library
- Pixeden — premium and free mockups
- Smartmockups — online mockup generation`,
    },
    videoUrl: '',
    files: [],
  },

  // ═══ МОДУЛЬ 3: Візуалізація даних ═══
  {
    id: 'mod-3-lesson-0',
    moduleIndex: 3,
    order: 0,
    title: { uk: 'Таймлайни та списки', ru: 'Таймлайны и списки', en: 'Timelines and Lists' },
    content: {
      uk: `Таймлайни та списки допомагають структурувати інформацію в часі або за пріоритетом.

**Таймлайн (лінія часу)**
Коли використовувати:
- Історія компанії або проекту
- План розвитку (roadmap)
- Етапи впровадження
- Хронологія подій

**Дизайн таймлайну**
- Горизонтальний або вертикальний
- Ключові точки з датами
- Короткий опис кожної точки
- Візуальний зв'язок (лінія або стрічка)

**Списки**
- Марковані списки для перерахувань
- Нумеровані для послідовностей
- Іконкові списки для переваг`,
      ru: `Таймлайны и списки помогают структурировать информацию во времени или по приоритету.

**Таймлайн (линия времени)**
Когда использовать:
- История компании или проекта
- План развития (roadmap)
- Этапы внедрения
- Хронология событий

**Дизайн таймлайна**
- Горизонтальный или вертикальный
- Ключевые точки с датами
- Краткое описание каждой точки
- Визуальная связь (линия или лента)`,
      en: `Timelines and lists help structure information over time or by priority.

**Timeline**
When to use:
- Company or project history
- Development plan (roadmap)
- Implementation stages
- Event chronology

**Timeline Design**
- Horizontal or vertical layout
- Key points with dates
- Short description per point`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-3-lesson-1',
    moduleIndex: 3,
    order: 1,
    title: { uk: 'Діаграми та графіки', ru: 'Диаграммы и графики', en: 'Charts and Graphs' },
    content: {
      uk: `Діаграми та графіки — найкращий спосіб показати цифри та тенденції.

**Типи діаграм**
- Стовпчикові — порівняння значень
- Кругові — частки від цілого
- Лінійні — тренди та зміни в часі
- Точкові — кореляція даних

**Принципи дизайну діаграм**
- Видаліть все зайве (gridlines, рамки)
- Використовуйте кольори для акцентів
- Підписуйте дані безпосередньо
- Один слайд — одне ключове повідомлення

**Інструменти**
- Вбудовані засоби PowerPoint / Google Slides
- Flourish — інтерактивні візуалізації
- Datawrapper — прості та красиві графіки
- Canva — швидкі візуалізації`,
      ru: `Диаграммы и графики — лучший способ показать цифры и тенденции.

**Типы диаграмм**
- Столбчатые — сравнение значений
- Круговые — доли от целого
- Линейные — тренды и изменения во времени
- Точечные — корреляция данных

**Принципы дизайна диаграмм**
- Удалите все лишнее (gridlines, рамки)
- Используйте цвета для акцентов
- Подписывайте данные напрямую`,
      en: `Charts and graphs are the best way to show numbers and trends.

**Chart Types**
- Bar charts — value comparison
- Pie charts — parts of a whole
- Line charts — trends over time
- Scatter plots — data correlation

**Design Principles**
- Remove everything unnecessary
- Use colors for emphasis
- Label data directly`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-3-lesson-2',
    moduleIndex: 3,
    order: 2,
    title: { uk: 'Складні схеми (Діаграма Венна та ін.)', ru: 'Сложные схемы (Диаграмма Венна и др.)', en: 'Complex Diagrams (Venn Diagram, etc.)' },
    content: {
      uk: `Складні схеми допомагають візуалізувати взаємозв'язки між концепціями.

**Діаграма Венна**
Показує перетин множин. Ідеально для:
- Порівняння характеристик
- Синтезу ідей
- Аналізу спільного та відмінного

**Дерево / ієрархія**
Для показу структури:
- Організаційна структура
- Класифікація
- Схема процесу прийняття рішень

**Блок-схема**
Алгоритми та послідовності дій:
- Використовуйте стандартні символи (умови, дії)
- Логічні зв'язки між блоками`,
      ru: `Сложные схемы помогают визуализировать взаимосвязи между концепциями.

**Диаграмма Венна**
Показывает пересечение множеств. Идеально для:
- Сравнения характеристик
- Синтеза идей
- Анализа общего и различного

**Дерево / иерархия**
Для показа структуры:
- Организационная структура
- Классификация
- Схема процесса принятия решений`,
      en: `Complex diagrams help visualize relationships between concepts.

**Venn Diagram**
Shows set intersections. Perfect for:
- Feature comparison
- Idea synthesis
- Similarities and differences analysis

**Tree / Hierarchy**
For showing structure:
- Organizational structure
- Classification
- Decision-making process`,
    },
    videoUrl: '',
    files: [],
  },

  // ═══ МОДУЛЬ 4: Анімація та динаміка ═══
  {
    id: 'mod-4-lesson-0',
    moduleIndex: 4,
    order: 0,
    title: { uk: 'Базова анімація', ru: 'Базовая анимация', en: 'Basic Animation' },
    content: {
      uk: `Анімація оживляє презентацію та привертає увагу до ключових елементів.

**Типи анімації**
- Вхід (Fade, Fly In, Zoom) — поява елемента
- Акцент (Pulse, Spin, Grow) — привернення уваги
- Вихід (Fade Out, Fly Out) — зникнення
- Шляхи переміщення — рух по траєкторії

**Правила гарної анімації**
- Анімація має бути доречною
- Не використовуйте більше 2 типів анімації на слайд
- Швидкість: 0.5-1 секунда — оптимально
- Затримка між елементами: 0.3-0.5 секунди`,
      ru: `Анимация оживляет презентацию и привлекает внимание к ключевым элементам.

**Типы анимации**
- Вход (Fade, Fly In, Zoom) — появление элемента
- Акцент (Pulse, Spin, Grow) — привлечение внимания
- Выход (Fade Out, Fly Out) — исчезновение
- Пути перемещения — движение по траектории

**Правила хорошей анимации**
- Анимация должна быть уместной
- Не используйте больше 2 типов анимации на слайд`,
      en: `Animation brings presentations to life and draws attention to key elements.

**Animation Types**
- Entrance (Fade, Fly In, Zoom) — element appears
- Emphasis (Pulse, Spin, Grow) — draw attention
- Exit (Fade Out, Fly Out) — disappears
- Motion Paths — movement along a trajectory`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-4-lesson-1',
    moduleIndex: 4,
    order: 1,
    title: { uk: 'Анімація', ru: 'Анимация', en: 'Animation' },
    content: {
      uk: `Поглиблений урок з анімації: секвенції, тригери та налаштування часу.

**Секвенції**
Послідовна поява елементів:
- По черзі з'являються пункти списку
- Кожен наступний елемент з'являється після попереднього
- Використовуйте опцію "After Previous" для автоматичної появи

**Тригери**
- On Click — по кліку миші
- With Previous — одночасно з попереднім
- After Previous — після попереднього
- Trigger on Bookmark — по закладці в медіа

**Таймінг**
Налаштування тривалості та затримок:
- Duration: як довго триває анімація
- Delay: пауза перед початком`,
      ru: `Углубленный урок по анимации: секвенции, триггеры и настройка времени.

**Секвенции**
Последовательное появление элементов:
- По очереди появляются пункты списка
- Каждый следующий элемент появляется после предыдущего
- Используйте опцию «After Previous» для автоматического появления

**Триггеры**
- On Click — по клику мыши
- With Previous — одновременно с предыдущим
- After Previous — после предыдущего`,
      en: `Advanced animation lesson: sequences, triggers, and timing.

**Sequences**
Sequential element appearance:
- List items appear one by one
- Each following element appears after the previous
- Use "After Previous" for automatic appearance`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-4-lesson-2',
    moduleIndex: 4,
    order: 2,
    title: { uk: 'Магія Morph (Трансформація)', ru: 'Магия Morph (Трансформация)', en: 'Morph Magic (Transformation)' },
    content: {
      uk: `Morph — це перехід, який плавно трансформує один слайд в інший. Це виглядає дуже професійно.

**Як працює Morph**
PowerPoint автоматично анімує зміни між двома слайдами:
- Об'єкти, які є на обох слайдах, плавно змінюють позицію, розмір, колір
- Нові об'єкти з'являються
- Видалені об'єкти зникають

**Коли використовувати**
- Збільшення деталі (zoom in)
- Перехід між списком і деталізацією
- Демонстрація змін (до/після)
- Навігація по інфографіці

**Вимоги**
- PowerPoint 2016 або новіший
- Два слайди з однаковими назвами об'єктів
- Застосуйте перехід Morph до другого слайда`,
      ru: `Morph — это переход, который плавно трансформирует один слайд в другой. Выглядит очень профессионально.

**Как работает Morph**
PowerPoint автоматически анимирует изменения между двумя слайдами:
- Объекты, которые есть на обоих слайдах, плавно меняют позицию, размер, цвет
- Новые объекты появляются
- Удаленные объекты исчезают

**Когда использовать**
- Увеличение детали (zoom in)
- Переход между списком и детализацией
- Демонстрация изменений`,
      en: `Morph is a transition that smoothly transforms one slide into another. It looks very professional.

**How Morph works**
PowerPoint automatically animates changes between two slides:
- Objects present on both slides smoothly change position, size, color
- New objects appear
- Removed objects disappear`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-4-lesson-3',
    moduleIndex: 4,
    order: 3,
    title: { uk: 'Інтерактив. Кнопки, гіперпосилання та навігація', ru: 'Интерактив. Кнопки, гиперссылки и навигация', en: 'Interactivity. Buttons, Hyperlinks & Navigation' },
    content: {
      uk: `Інтерактивна презентація — це не лінійний показ, а діалог з глядачем.

**Гіперпосилання**
- На інший слайд (для non-linear презентацій)
- На зовнішній сайт або ресурс
- На файл (PDF, документ)
- На email

**Кнопки дій**
- "Детальніше" → перехід на слайд з деталями
- "Назад до меню" → повернення до змісту
- "Зв'язатися з нами" → посилання на контакти

**Меню навігації**
Ідеально для:
- Каталогів продуктів
- Освітніх матеріалів
- Портфоліо з різними категоріями`,
      ru: `Интерактивная презентация — это не линейный показ, а диалог со зрителем.

**Гиперссылки**
- На другой слайд (для non-linear презентаций)
- На внешний сайт или ресурс
- На файл (PDF, документ)
- На email

**Кнопки действий**
- «Подробнее» → переход на слайд с деталями
- «Назад в меню» → возвращение к содержанию
- «Связаться с нами» → ссылка на контакты`,
      en: `An interactive presentation is not a linear show but a dialogue with the viewer.

**Hyperlinks**
- To another slide (non-linear presentations)
- To external website or resource
- To a file (PDF, document)
- To email

**Action Buttons**
- "Learn More" → detail slide
- "Back to Menu" → return to contents
- "Contact Us" → contact link`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-4-lesson-4',
    moduleIndex: 4,
    order: 4,
    title: { uk: 'Барчарт і графіки', ru: 'Барчарт и графики', en: 'Bar Charts and Graphs' },
    content: {
      uk: `Анімовані барчарти та графіки справляють потужне враження на глядача.

**Анімація барчарту**
- Стовпчики з'являються по черзі або всі разом
- "Зростання" стовпчика від нуля до значення
- Зміна кольору для акцентів
- Додавання підписів значень при появі

**Анімація кругової діаграми**
- Поява секторів по черзі
- Обертання діаграми
- Виділення окремого сектора

**Інструменти**
- Вбудована анімація PowerPoint
- Анімовані діаграми з Flourish
- After Effects для складних анімацій`,
      ru: `Анимированные барчарты и графики производят мощное впечатление на зрителя.

**Анимация барчарта**
- Столбцы появляются по очереди или все вместе
- «Рост» столбца от нуля до значения
- Смена цвета для акцентов
- Добавление подписей значений при появлении

**Анимация круговой диаграммы**
- Появление секторов по очереди
- Вращение диаграммы
- Выделение отдельного сектора`,
      en: `Animated bar charts and graphs make a powerful impression on viewers.

**Bar Chart Animation**
- Bars appear one by one or all together
- Bars "grow" from zero to value
- Color change for emphasis
- Value labels appear with bars`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-4-lesson-5',
    moduleIndex: 4,
    order: 5,
    title: { uk: 'Інфографіка', ru: 'Инфографика', en: 'Infographics' },
    content: {
      uk: `Інфографіка поєднує дані та дизайн для створення потужних візуальних історій.

**Що таке інфографіка**
Це візуальне представлення інформації, яке поєднує текст, дані, зображення та графіку.

**Принципи створення**
- Одна тема на одну інфографіку
- Візуальна ієрархія: найважливіше — найбільше
- Використовуйте іконки для швидкого сприйняття
- Мінімум тексту, максимум візуалу

**Етапи створення**
1. Збір та аналіз даних
2. Вибір ключового повідомлення
3. Створення структури
4. Дизайн та візуалізація
5. Анімація (опціонально)`,
      ru: `Инфографика объединяет данные и дизайн для создания мощных визуальных историй.

**Что такое инфографика**
Это визуальное представление информации, объединяющее текст, данные, изображения и графику.

**Принципы создания**
- Одна тема на одну инфографику
- Визуальная иерархия: самое важное — самое крупное
- Используйте иконки для быстрого восприятия
- Минимум текста, максимум визуала`,
      en: `Infographics combine data and design to create powerful visual stories.

**What is Infographics**
A visual representation of information that combines text, data, images, and graphics.

**Creation Principles**
- One topic per infographic
- Visual hierarchy: most important = largest
- Use icons for quick comprehension
- Minimum text, maximum visuals`,
    },
    videoUrl: '',
    files: [],
  },

  // ═══ МОДУЛЬ 5: Figma ═══
  {
    id: 'mod-5-lesson-0',
    moduleIndex: 5,
    order: 0,
    title: { uk: 'Інтерфейс', ru: 'Интерфейс', en: 'Interface' },
    content: {
      uk: `Figma — це інструмент для дизайну інтерфейсів та презентацій. Він працює в браузері.

**Основні елементи інтерфейсу**
- Toolbar (верхня панель) — інструменти та дії
- Layers panel (ліворуч) — шари вашого дизайну
- Canvas (по центру) — робоча область
- Properties panel (праворуч) — властивості об'єкта

**Ключові інструменти**
- Move Tool (V) — переміщення
- Frame (F) — рамки та артборди
- Shape Tools (R, O, L) — прямокутники, кола, лінії
- Text (T) — текст
- Pen (P) — криві та векторні фігури

**Фрейми**
У Figma замість артбордів використовуються фрейми. Вони можуть бути будь-якого розміру — від іконки до презентації.`,
      ru: `Figma — это инструмент для дизайна интерфейсов и презентаций. Работает в браузере.

**Основные элементы интерфейса**
- Toolbar (верхняя панель) — инструменты и действия
- Layers panel (слева) — слои вашего дизайна
- Canvas (по центру) — рабочая область
- Properties panel (справа) — свойства объекта

**Ключевые инструменты**
- Move Tool (V) — перемещение
- Frame (F) — рамки и артборды
- Shape Tools (R, O, L) — прямоугольники, круги, линии
- Text (T) — текст
- Pen (P) — кривые и векторные фигуры`,
      en: `Figma is a design tool for interfaces and presentations. It works in the browser.

**Interface Elements**
- Toolbar (top) — tools and actions
- Layers panel (left) — design layers
- Canvas (center) — workspace
- Properties panel (right) — object properties`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-5-lesson-1',
    moduleIndex: 5,
    order: 1,
    title: { uk: 'Плагіни', ru: 'Плагины', en: 'Plugins' },
    content: {
      uk: `Плагіни розширюють можливості Figma та автоматизують рутинні завдання.

**Корисні плагіни для презентацій**
- Unsplash — вставка безкоштовних фото прямо у Figma
- Iconify — бібліотека іконок
- Autoflow — створення блок-схем
- Remove BG — видалення фону з зображень
- Figmoji — емодзі для дизайну

**Плагіни для тексту**
- Text to Styles — створення стилів тексту
- Word Counter — підрахунок слів
- Lorem Ipsum — генерація тексту-заповнювача

**Як встановити**
Меню Resources (або Shift+I) → Plugins → Browse → Встановити`,
      ru: `Плагины расширяют возможности Figma и автоматизируют рутинные задачи.

**Полезные плагины для презентаций**
- Unsplash — вставка бесплатных фото прямо в Figma
- Iconify — библиотека иконок
- Autoflow — создание блок-схем
- Remove BG — удаление фона из изображений`,
      en: `Plugins extend Figma's capabilities and automate routine tasks.

**Useful Plugins for Presentations**
- Unsplash — insert free photos directly in Figma
- Iconify — icon library
- Autoflow — create flowcharts
- Remove BG — remove image backgrounds`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-5-lesson-2',
    moduleIndex: 5,
    order: 2,
    title: { uk: 'Перенос у PowerPoint', ru: 'Перенос в PowerPoint', en: 'Transfer to PowerPoint' },
    content: {
      uk: `Дизайн у Figma, фінальна презентація — у PowerPoint. Як перенести роботу без втрати якості.

**Способи переносу**
1. Експорт слайдів як PNG/SVG та вставка в PowerPoint
2. Копіювання через Figma → PowerPoint плагін
3. Експорт у PDF та імпорт у PowerPoint

**Експорт через зображення**
- Виділіть фрейм → Export → PNG (2x для ретіни)
- Вставте зображення в PowerPoint
- Налаштуйте розмір під слайд

**Плагін Figma → PowerPoint**
- Встановіть плагін "Export to PowerPoint"
- Виберіть фрейми для експорту
- Налаштуйте порядок слайдів
- Завантажте .pptx файл

**Важливо:** Інтерактивні елементи та анімацію Figma не переносить — додавайте їх у PowerPoint.`,
      ru: `Дизайн в Figma, финальная презентация — в PowerPoint. Как перенести работу без потери качества.

**Способы переноса**
1. Экспорт слайдов как PNG/SVG и вставка в PowerPoint
2. Копирование через плагин Figma → PowerPoint
3. Экспорт в PDF и импорт в PowerPoint

**Важно:** Интерактивные элементы и анимацию Figma не переносит — добавляйте их в PowerPoint.`,
      en: `Design in Figma, final presentation in PowerPoint. How to transfer without quality loss.

**Transfer Methods**
1. Export slides as PNG/SVG and insert in PowerPoint
2. Copy via Figma → PowerPoint plugin
3. Export to PDF and import in PowerPoint`,
    },
    videoUrl: '',
    files: [],
  },

  // ═══ МОДУЛЬ 6: Нейромережі ═══
  {
    id: 'mod-6-lesson-0',
    moduleIndex: 6,
    order: 0,
    title: { uk: 'Робота з текстом (ChatGPT/Gemini)', ru: 'Работа с текстом (ChatGPT/Gemini)', en: 'Working with Text (ChatGPT/Gemini)' },
    content: {
      uk: `AI-помічники можуть значно прискорити роботу над презентацією — від написання тексту до створення структури.

**ChatGPT/Gemini для презентацій**

Як використовувати:
- Генерація структури презентації за темою
- Написання текстів для слайдів
- Створення сценарію виступу
- Підбір прикладів та метафор

**Приклади запитів:**
- "Напиши структуру презентації про тренди дизайну 2026. 10 слайдів."
- "Створіть текст для слайду 'Про компанію' для IT-стартапу"
- "Напиши 5 варіантів заголовків для слайда про результати року"

**Поради**
- Давайте контекст: хто аудиторія, яка мета
- Просіть кілька варіантів
- Використовуйте як чернетку — редагуйте самостійно`,
      ru: `AI-помощники могут значительно ускорить работу над презентацией — от написания текста до создания структуры.

**ChatGPT/Gemini для презентаций**

Как использовать:
- Генерация структуры презентации по теме
- Написание текстов для слайдов
- Создание сценария выступления
- Подбор примеров и метафор`,
      en: `AI assistants can significantly speed up presentation work — from writing text to creating structure.

**ChatGPT/Gemini for Presentations**

How to use:
- Generate presentation structure by topic
- Write slide content
- Create speaking scripts
- Find examples and metaphors`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-6-lesson-1',
    moduleIndex: 6,
    order: 1,
    title: { uk: 'Генерація візуалу (Adobe Firefly / Midjourney)', ru: 'Генерация визуала (Adobe Firefly / Midjourney)', en: 'Visual Generation (Adobe Firefly / Midjourney)' },
    content: {
      uk: `AI-генерація зображень відкриває безмежні можливості для створення унікальних візуалів.

**Midjourney**
Генерація через Discord. Ключові параметри:
- Промпти: опис того, що ви хочете
- Співвідношення сторін: --ar 16:9 для презентацій
- Стилі: --style raw, --v 6 для реалістичних зображень

**Adobe Firefly**
Працює в браузері, інтегрований з Adobe:
- Генерація зображень за текстом
- Заповнення/розширення (Generative Fill)
- Текстові ефекти
- Безпечний для комерційного використання

**Поради для промптів**
- Будьте конкретними: "професійна презентація, темний фон, золоті акценти, мінімалізм"
- Вказуйте стиль: "3D render, flat design, photo realistic"
- Додавайте контекст: "для бізнес-презентації, аудиторія — керівники"`,
      ru: `AI-генерация изображений открывает безграничные возможности для создания уникальных визуалов.

**Midjourney**
Генерация через Discord. Ключевые параметры:
- Промпты: описание того, что вы хотите
- Соотношение сторон: --ar 16:9 для презентаций
- Стили: --style raw, --v 6 для реалистичных изображений`,
      en: `AI image generation opens endless possibilities for creating unique visuals.

**Midjourney**
Generation via Discord. Key parameters:
- Prompts: description of what you want
- Aspect ratio: --ar 16:9 for presentations
- Styles: --style raw, --v 6 for realistic images`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-6-lesson-2',
    moduleIndex: 6,
    order: 2,
    title: { uk: 'Видалення фону та апскейл', ru: 'Удаление фона и апскейл', en: 'Background Removal and Upscaling' },
    content: {
      uk: `Інструменти для покращення зображень — must-have у роботі дизайнера.

**Видалення фону**
- Remove.bg — швидко, якісно, безкоштовно
- Adobe Photoshop — точне видалення з ручним налаштуванням
- Canva — вбудований інструмент
- Figma плагін Remove BG

**Апскейл (збільшення)**
Збільшення роздільної здатності без втрати якості:
- Topaz Gigapixel AI — найкращий результат
- Upscale.media — безкоштовний онлайн
- Let's Enhance — зручний сервіс
- Adobe Photoshop Super Resolution

**Коли потрібно**
- Збільшення маленьких іконок
- Покращення якості старих фото
- Підготовка до друку`,
      ru: `Инструменты для улучшения изображений — must-have в работе дизайнера.

**Удаление фона**
- Remove.bg — быстро, качественно, бесплатно
- Adobe Photoshop — точное удаление с ручной настройкой
- Canva — встроенный инструмент
- Figma плагин Remove BG

**Апскейл (увеличение)**
Увеличение разрешения без потери качества`,
      en: `Image enhancement tools are a must-have for every designer.

**Background Removal**
- Remove.bg — fast, quality, free
- Adobe Photoshop — precise manual control
- Canva — built-in tool
- Figma plugin Remove BG

**Upscaling**
Increase resolution without quality loss`,
    },
    videoUrl: '',
    files: [],
  },

  // ═══ МОДУЛЬ 7: Нішеві стратегії ═══
  {
    id: 'mod-7-lesson-0',
    moduleIndex: 7,
    order: 0,
    title: { uk: 'Для вчителів: Гейміфікація. Квіз чи гра в слайдах', ru: 'Для учителей: Геймификация. Квиз или игра в слайдах', en: 'For Teachers: Gamification. Quizzes in Slides' },
    content: {
      uk: `Гейміфікація робить навчання цікавим та ефективним. PowerPoint дозволяє створювати справжні ігри.

**Інтерактивні квізи**
- Запитання з варіантами відповідей
- Гіперпосилання на слайди з правильною/неправильною відповіддю
- Підрахунок балів
- Таймер для відповіді

**Як зробити квіз**
1. Слайд з запитанням + 3-4 варіанти
2. Кожен варіант — гіперпосилання на відповідний слайд
3. Слайд "Правильно!" з поясненням і кнопкою "Далі"
4. Слайд "Спробуйте ще" з поверненням до запитання

**Інструменти**
- Mentimeter — інтерактивні опитування
- Kahoot — ігрові квізи
- PowerPoint — ручне створення`,
      ru: `Геймификация делает обучение интересным и эффективным. PowerPoint позволяет создавать настоящие игры.

**Интерактивные квизы**
- Вопросы с вариантами ответов
- Гиперссылки на слайды с правильным/неправильным ответом
- Подсчет баллов
- Таймер для ответа

**Инструменты**
- Mentimeter — интерактивные опросы
- Kahoot — игровые квизы
- PowerPoint — ручное создание`,
      en: `Gamification makes learning engaging and effective. PowerPoint allows creating real games.

**Interactive Quizzes**
- Questions with answer options
- Hyperlinks to correct/incorrect answer slides
- Score tracking
- Answer timer`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-7-lesson-1',
    moduleIndex: 7,
    order: 1,
    title: { uk: 'Для бізнесу та маркетологів: Пітч-дек', ru: 'Для бизнеса и маркетологов: Питч-дек', en: 'For Business & Marketers: Pitch Deck' },
    content: {
      uk: `Пітч-дек — це презентація для інвесторів або партнерів. Її мета — отримати фінансування або схвалення.

**Структура пітч-деку**
1. Титул — назва проекту + слоган
2. Проблема — яку проблему ви вирішуєте
3. Рішення — як ви це робите
4. Ринок — розмір та потенціал
5. Бізнес-модель — як заробляєте
6. Команда — хто за проектом
7. Конкуренти — чому ви кращі
8. Фінанси — ключові показники
9. Запит — скільки грошей потрібно

**Дизайн пітч-деку**
- Мінімум тексту, максимум візуалу
- Одна ідея на один слайд
- Контактна інформація на останньому слайді`,
      ru: `Питч-дек — это презентация для инвесторов или партнеров. Ее цель — получить финансирование или одобрение.

**Структура питч-дека**
1. Титул — название проекта + слоган
2. Проблема — какую проблему вы решаете
3. Решение — как вы это делаете
4. Рынок — размер и потенциал
5. Бизнес-модель — как зарабатываете`,
      en: `A pitch deck is a presentation for investors or partners. Its goal is to secure funding or approval.

**Pitch Deck Structure**
1. Title — project name + tagline
2. Problem — what problem you're solving
3. Solution — how you're doing it
4. Market — size and potential
5. Business Model — how you make money`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-7-lesson-2',
    moduleIndex: 7,
    order: 2,
    title: { uk: 'Виступ: Як пов\'язати слайди зі своєю мовою', ru: 'Выступление: Как связать слайды со своей речью', en: 'Presentation: Connecting Slides with Your Speech' },
    content: {
      uk: `Слайди — це половина успіху. Друга половина — це ви і ваша мова.

**Слайди як підтримка**
Слайди НЕ мають:
- Дублювати ваш текст слово в слово
- Бути шпаргалкою для вас
- Містити все, що ви плануєте сказати

Слайди МАЮТЬ:
- Підсилювати ваші слова візуально
- Показувати те, що складно описати словами
- Фокусувати увагу аудиторії

**Режим доповідача**
PowerPoint має режим доповідача, де ви бачите:
- Поточний слайд
- Нотатки до слайда
- Наступний слайд
- Таймер

**Підготовка**
- Напишіть сценарій виступу
- Відрепетируйте з таймером
- Підготуйте відповіді на можливі запитання`,
      ru: `Слайды — это половина успеха. Вторая половина — это вы и ваша речь.

**Слайды как поддержка**
Слайды НЕ должны:
- Дублировать ваш текст слово в слово
- Быть шпаргалкой для вас
- Содержать все, что вы планируете сказать

Слайды ДОЛЖНЫ:
- Усиливать ваши слова визуально
- Показывать то, что сложно описать словами`,
      en: `Slides are half the success. The other half is you and your speech.

**Slides as Support**
Slides should NOT:
- Duplicate your speech word for word
- Be your cheat sheet
- Contain everything you plan to say

Slides SHOULD:
- Visually reinforce your words
- Show what's hard to describe`,
    },
    videoUrl: '',
    files: [],
  },

  // ═══ МОДУЛЬ 8: Особистий бренд і Портфоліо ═══
  {
    id: 'mod-8-lesson-0',
    moduleIndex: 8,
    order: 0,
    title: { uk: 'Оформлення Instagram/LinkedIn', ru: 'Оформление Instagram/LinkedIn', en: 'Instagram/LinkedIn Profile Design' },
    content: {
      uk: `Ваш особистий бренд у соціальних мережах — це ваше портфоліо та візитівка.

**Instagram**
- Єдиний стиль візуалу: кольори, шрифти, фільтри
- Аватар: професійне фото або логотип
- Bio: чітко, хто ви і чим корисні
- Highlights: структуруйте за категоріями
- Stories: щоденний контент про роботу

**LinkedIn**
- Професійне фото
- Заголовок: не посада, а цінність для клієнта
- Про себе: історія + результати + цифри
- Рекомендації від клієнтів

**Портфоліо**
- Найкращі роботи, не всі
- Кейси: задача → рішення → результат`,
      ru: `Ваш личный бренд в социальных сетях — это ваше портфолио и визитка.

**Instagram**
- Единый стиль визуала: цвета, шрифты, фильтры
- Аватар: профессиональное фото или логотип
- Bio: четко, кто вы и чем полезны
- Highlights: структурируйте по категориям`,
      en: `Your social media personal brand is your portfolio and business card.

**Instagram**
- Unified visual style: colors, fonts, filters
- Avatar: professional photo or logo
- Bio: clear statement of who you are and your value
- Highlights: structure by categories`,
    },
    videoUrl: '',
    files: [],
  },
  {
    id: 'mod-8-lesson-1',
    moduleIndex: 8,
    order: 1,
    title: { uk: 'Пошук перших замовлень / Ріст в компанії', ru: 'Поиск перовых заказов / Рост в компании', en: 'Finding First Clients / Growth Within a Company' },
    content: {
      uk: `Після освоєння навичок постає питання: де брати перші замовлення?

**Пошук клієнтів**
- Сарафанне радіо: друзі, знайомі, колишні колеги
- LinkedIn: публікуйте кейси, пишіть статті
- Instagram: показуйте процес та результати
- Behance/Dribbble: портфоліо для міжнародних клієнтів
- Фріланс-біржі: Upwork, Freelancehunt, Kabanchik

**Поради для початківців**
- Перші проекти можна робити безкоштовно або зі знижкою — для портфоліо
- Завжди просіть відгук та дозвіл на публікацію
- Створіть простий сайт-портфоліо
- Ніколи не припиняйте навчатися`,
      ru: `После освоения навыков встает вопрос: где брать первые заказы?

**Поиск клиентов**
- Сарафанное радио: друзья, знакомые, бывшие коллеги
- LinkedIn: публикуйте кейсы, пишите статьи
- Instagram: показывайте процесс и результаты
- Фриланс-биржи: Upwork, Freelancehunt, Kabanchik`,
      en: `After mastering the skills, the question arises: where to find first clients?

**Finding Clients**
- Word of mouth: friends, acquaintances, former colleagues
- LinkedIn: publish cases, write articles
- Instagram: show process and results
- Freelance platforms: Upwork, Freelancehunt, Kabanchik`,
    },
    videoUrl: '',
    files: [],
  },
];

async function seed() {
  const batch = writeBatch(db);
  for (const lesson of lessons) {
    const ref = doc(db, 'lessons', lesson.id);
    batch.set(ref, lesson);
  }
  await batch.commit();
  console.log(`✅ Успішно залито ${lessons.length} уроків у Firestore!`);
}

seed().catch((err) => {
  console.error('❌ Помилка:', err);
  process.exit(1);
});
