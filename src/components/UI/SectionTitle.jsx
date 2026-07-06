import { useTranslation } from '../../context/I18nContext';
import './SectionTitle.css';

export default function SectionTitle({ titleKey, subtitleKey, forceTitle, forceSubtitle, align = 'center' }) {
  const { t } = useTranslation();

  const title = forceTitle ?? (titleKey ? t(titleKey) : '');
  const subtitle = forceSubtitle ?? (subtitleKey ? t(subtitleKey) : null);

  if (!title) return null;

  return (
    <div className={`section-title section-title--${align}`}>
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && (
        <p className="section-title__subtitle">{subtitle}</p>
      )}
      <div className="section-title__divider" />
    </div>
  );
}
