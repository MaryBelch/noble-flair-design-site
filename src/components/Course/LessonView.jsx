import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { markLessonViewed } from '../../firebase/firestore';
import { useTranslation } from '../../context/I18nContext';
import { useAuth } from '../../context/AuthContext';

/**
 * Renders a single lesson within the course.
 * Fetches lesson content from Firestore by module/lesson index.
 */
export default function LessonView({ selectedLesson, modules, onBack }) {
  const { t, locale } = useTranslation();
  const { user } = useAuth();
  const [lessonData, setLessonData] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(true);
  const [error, setError] = useState(null);

  const module = modules[selectedLesson.moduleIndex];
  const isFree = selectedLesson.moduleIndex === 0 && selectedLesson.lessonIndex === 0;
  const lessonId = `mod-${selectedLesson.moduleIndex}-lesson-${selectedLesson.lessonIndex}`;

  useEffect(() => {
    let cancelled = false;

    async function fetchLesson() {
      setLessonLoading(true);
      setError(null);
      try {
        const snap = await getDoc(doc(db, 'lessons', lessonId));
        if (!cancelled) {
          setLessonData(snap.exists() ? snap.data() : null);
        }
      } catch (err) {
        console.error('Error fetching lesson:', err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLessonLoading(false);
      }
    }

    fetchLesson();

    // Mark as viewed
    if (user) {
      markLessonViewed(user.uid, lessonId).catch(() => {});
    }

    return () => { cancelled = true; };
  }, [lessonId, user]);

  const content = lessonData?.content?.[locale] || lessonData?.content?.uk;
  const videoUrl = lessonData?.videoUrl;
  const files = lessonData?.files || [];

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

  return (
    <section id="course" className="section course">
      <div className="container">
        <div className="course__back-bar">
          <button className="course__back-btn" onClick={onBack}>
            ← {module?.title || t('course.title')}
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
            ) : error ? (
              <p style={{ color: '#e74c3c' }}>Помилка завантаження: {error}</p>
            ) : content ? (
              <div className="course__lesson-content" dangerouslySetInnerHTML={{ __html: renderContent(content) }} />
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
