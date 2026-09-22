import { useTranslation } from '../../context/I18nContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../UI/SectionTitle';
import './Founder.css';

export default function FounderPage() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal([]);

  return (
    <section id="founder" className="section founder" ref={sectionRef}>
      <div className="container">
        <SectionTitle
          titleKey="founder.title"
          subtitleKey="founder.subtitle"
        />

        {/* Шапка с фото и кратким введением */}
        <div className="founder__header">
          <div className="founder__photo">
            {/* Замените на реальное фото основательницы */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
              alt="Maryna Belch - основатель Noble Flair Design"
              className="founder__photo-img"
            />
          </div>
          <div className="founder__intro">
            <h1 className="founder__name">Maryna Belch</h1>
            <p className="founder__tagline">Основатель и креативный директор Noble Flair Design</p>
            <p className="founder__description">
              {t('founder.description')}
            </p>
          </div>
        </div>

        {/* Блок истории пути */}
        <div className="founder__story">
          <h2 className="founder__section-title">{t('founder.story_title')}</h2>
          <div className="founder__story-content">
            <p>{t('founder.story_paragraph1')}</p>
            <p>{t('founder.story_paragraph2')}</p>
            <p>{t('founder.story_paragraph3')}</p>
          </div>
          {/* Визуальная линия пути или иконки этапов */}
          <div className="founder__timeline">
            <div className="founder__timeline-item">
              <h3>{t('founder.timeline_year1')}</h3>
              <p>{t('founder.timeline_desc1')}</p>
            </div>
            <div className="founder__timeline-item">
              <h3>{t('founder.timeline_year2')}</h3>
              <p>{t('founder.timeline_desc2')}</p>
            </div>
            <div className="founder__timeline-item">
              <h3>{t('founder.timeline_year3')}</h3>
              <p>{t('founder.timeline_desc3')}</p>
            </div>
          </div>
        </div>

        {/* Блок образования и экспертизы */}
        <div className="founder__expertise">
          <h2 className="founder__section-title">{t('founder.expertise_title')}</h2>
          <div className="founder__expertise-grid">
            <div className="founder__expertise-item">
              <h3>{t('founder.formal_education')}</h3>
              <p>{t('founder.formal_education_desc')}</p>
            </div>
            <div className="founder__expertise-item">
              <h3>{t('founder.continuous_learning')}</h3>
              <p>{t('founder.continuous_learning_desc')}</p>
            </div>
            <div className="founder__expertise-item">
              <h3>{t('founder.practical_experience')}</h3>
              <p>{t('founder.practical_experience_desc')}</p>
            </div>
            <div className="founder__expertise-item">
              <h3>{t('founder.specializations')}</h3>
              <p>{t('founder.specializations_desc')}</p>
            </div>
          </div>
        </div>

        {/* Блок дизайнерской философии */}
        <div className="founder__philosophy">
          <h2 className="founder__section-title">{t('founder.philosophy_title')}</h2>
          <div className="founder__philosophy-grid">
            <div className="founder__philosophy-item">
              <div className="founder__philosophy-icon">🎯</div>
              <h3>{t('founder.principle1_title')}</h3>
              <p>{t('founder.principle1_desc')}</p>
            </div>
            <div className="founder__philosophy-item">
              <div className="founder__philosophy-icon">👥</div>
              <h3>{t('founder.principle2_title')}</h3>
              <p>{t('founder.principle2_desc')}</p>
            </div>
            <div className="founder__philosophy-item">
              <div className="founder__philosophy-icon">🏗️</div>
              <h3>{t('founder.principle3_title')}</h3>
              <p>{t('founder.principle3_desc')}</p>
            </div>
            <div className="founder__philosophy-item">
              <div className="founder__philosophy-icon">⚖️</div>
              <h3>{t('founder.principle4_title')}</h3>
              <p>{t('founder.principle4_desc')}</p>
            </div>
            <div className="founder__philosophy-item">
              <div className="founder__philosophy-icon">✨</div>
              <h3>{t('founder.principle5_title')}</h3>
              <p>{t('founder.principle5_desc')}</p>
            </div>
          </div>
        </div>

        {/* Блок достижений и социального доказательства */}
        <div className="founder__achievements">
          <h2 className="founder__section-title">{t('founder.achievements_title')}</h2>
          <div className="founder__achievements-content">
            <div className="founder__testimonials">
              <h3>{t('founder.testimonials_title')}</h3>
              <div className="founder__testimonial">
                <p>{t('founder.testimonial1')}</p>
                <p className="founder__testimonial-author">— {t('founder.testimonial1_author')}</p>
              </div>
              <div className="founder__testimonial">
                <p>{t('founder.testimonial2')}</p>
                <p className="founder__testimonial-author">— {t('founder.testimonial2_author')}</p>
              </div>
              <div className="founder__testimonial">
                <p>{t('founder.testimonial3')}</p>
                <p className="founder__testimonial-author">— {t('founder.testimonial3_author')}</p>
              </div>
            </div>
            <div className="founder__recognition">
              <h3>{t('founder.recognition_title')}</h3>
              <div className="founder__recognition-items">
                <span className="founder__recognition-item">{t('founder.recognition1')}</span>
                <span className="founder__recognition-item">{t('founder.recognition2')}</span>
                <span className="founder__recognition-item">{t('founder.recognition3')}</span>
                <span className="founder__recognition-item">{t('founder.recognition4')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Блок личных качеств и подхода к работе */}
        <div className="founder__personal">
          <h2 className="founder__section-title">{t('founder.personal_title')}</h2>
          <div className="founder__personal-grid">
            <div className="founder__personal-item">
              <h3>{t('founder.personal_quality1')}</h3>
              <p>{t('founder.personal_desc1')}</p>
            </div>
            <div className="founder__personal-item">
              <h3>{t('founder.personal_quality2')}</h3>
              <p>{t('founder.personal_desc2')}</p>
            </div>
            <div className="founder__personal-item">
              <h3>{t('founder.personal_quality3')}</h3>
              <p>{t('founder.personal_desc3')}</p>
            </div>
          </div>
        </div>

        {/* Блок призыва к действию */}
        <div className="founder__cta">
          <h2 className="founder__section-title">{t('founder.cta_title')}</h2>
          <p className="founder__cta-description">{t('founder.cta_description')}</p>
          <div className="founder__cta-buttons">
            <a
              href="https://t.me/noble_flair_design_bot?start=consultation_found"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary founder__cta-btn"
            >
              {t('founder.cta_button1')}
            </a>
            <a
              href="/portfolio"
              className="btn btn--outline-animated founder__cta-btn"
            >
              {t('founder.cta_button2')}
            </a>
          </div>
        </div>

        {/* Опциональный блок "позади кулис" */}
        <div className="founder__behind-scenes">
          <h2 className="founder__section-title">{t('founder.behind_scenes_title')}</h2>
          <p className="founder__behind-scenes-description">{t('founder.behind_scenes_description')}</p>
          <div className="founder__behind-scenes-icons">
            <div className="founder__behind-scenes-item">
              <div className="founder__behind-scenes-icon">📚</div>
              <p>{t('founder.behind_scenes1')}</p>
            </div>
            <div className="founder__behind-scenes-item">
              <div className="founder__behind-scenes-icon">🌿</div>
              <p>{t('founder.behind_scenes2')}</p>
            </div>
            <div className="founder__behind-scenes-item">
              <div className="founder__behind-scenes-icon">☕</div>
              <p>{t('founder.behind_scenes3')}</p>
            </div>
            <div className="founder__behind-scenes-item">
              <div className="founder__behind-scenes-icon">🎨</div>
              <p>{t('founder.behind_scenes4')}</p>
            </div>
            <div className="founder__behind-scenes-item">
              <div className="founder__behind-scenes-icon">👨‍👩‍👧</div>
              <p>{t('founder.behind_scenes5')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* JSON-LD structured data for Person */}
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Maryna Belch',
        jobTitle: 'Основатель и креативный директор Noble Flair Design',
        url: 'https://marybelch.github.io/noble-flair-design-site/founder',
        sameAs: [
          'https://www.instagram.com/maryna_design_nfd/',
          'https://t.me/noble_flair_design_bot'
        ],
        description: t('founder.description'),
        worksFor: {
          '@type': 'Organization',
          name: 'Noble Flair Design',
          url: 'https://marybelch.github.io/noble-flair-design-site/'
        }
      })}
    </script>
  );
}