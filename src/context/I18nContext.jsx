import { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext(null);

const SUPPORTED_LOCALES = ['uk', 'ru', 'en'];
const DEFAULT_LOCALE = 'uk';

function getInitialLocale() {
  try {
    const saved = localStorage.getItem('noble-flair-lang');
    if (saved && SUPPORTED_LOCALES.includes(saved)) return saved;
  } catch {}
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale);
  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    import(`../data/translations/${locale}.json`)
      .then((mod) => {
        setTranslations(mod.default);
        setLoading(false);
      })
      .catch(() => {
        // fallback to uk if error
        import(`../data/translations/uk.json`)
          .then((mod) => {
            setTranslations(mod.default);
            setLocale('uk');
            setLoading(false);
          });
      });
  }, [locale]);

  const changeLocale = (newLocale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocale(newLocale);
      try {
        localStorage.setItem('noble-flair-lang', newLocale);
      } catch {}
    }
  };

  const t = (key) => {
    if (!translations) return key;
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, changeLocale, t, loading, SUPPORTED_LOCALES }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}
