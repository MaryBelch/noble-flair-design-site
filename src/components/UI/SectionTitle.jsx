import { useTranslation } from '../../context/I18nContext';
import './SectionTitle.css';

export default function SectionTitle({ titleKey, subtitleKey, align = 'center' }) {
  const { t } = useTranslation();

  return (
    <div className={`section-title section-title--${align}`}>
      <h2 className="section-title__heading">{t(titleKey)}</h2>
      {subtitleKey && (
        <p className="section-title__subtitle">{t(subtitleKey)}</p>
      )}
      <div className="section-title__divider" />
    </div>
  );
}
