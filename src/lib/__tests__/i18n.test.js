import { describe, it, expect } from 'vitest';
import uk from '../../data/translations/uk.json';
import ru from '../../data/translations/ru.json';
import en from '../../data/translations/en.json';

/**
 * Pure translation resolution — mirrors the `t()` function from I18nContext.
 * Tests this logic against real translation data to catch missing keys.
 */
function resolveT(translations, key) {
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
}

const LOCALES = { uk, ru, en };

/** Recursively collect all leaf string keys from a translation object */
function collectKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') {
      keys.push(path);
    } else if (v && typeof v === 'object') {
      keys = keys.concat(collectKeys(v, path));
    }
  }
  return keys;
}

describe('Translation key resolution', () => {
  // Get the union of all keys across all locales
  const allKeys = new Set();
  for (const locale of Object.values(LOCALES)) {
    collectKeys(locale).forEach((k) => allKeys.add(k));
  }

  it.each([...allKeys])('resolves key "%s" in all locales', (key) => {
    for (const [name, translations] of Object.entries(LOCALES)) {
      const result = resolveT(translations, key);
      expect(result, `${key} missing in ${name}`).not.toBe(key);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it('returns the key itself for missing keys', () => {
    const result = resolveT(uk, 'nonexistent.key.path');
    expect(result).toBe('nonexistent.key.path');
  });

  it('returns the key when translations is null', () => {
    const result = resolveT(null, 'nav.home');
    expect(result).toBe('nav.home');
  });
});

describe('Locale completeness', () => {
  const ukKeys = new Set(collectKeys(uk));
  const ruKeys = new Set(collectKeys(ru));
  const enKeys = new Set(collectKeys(en));

  it('ru has all uk keys', () => {
    for (const key of ukKeys) {
      expect(ruKeys.has(key), `ru missing key: ${key}`).toBe(true);
    }
  });

  it('en has all uk keys', () => {
    for (const key of ukKeys) {
      expect(enKeys.has(key), `en missing key: ${key}`).toBe(true);
    }
  });
});

describe('Locale translations are non-empty strings', () => {
  it.each([...collectKeys(uk)])('uk "%s" is a non-empty string', (key) => {
    const val = resolveT(uk, key);
    expect(val).not.toBe(key);
    expect(val.length).toBeGreaterThan(0);
  });

  it.each([...collectKeys(ru)])('ru "%s" is a non-empty string', (key) => {
    const val = resolveT(ru, key);
    expect(val).not.toBe(key);
    expect(val.length).toBeGreaterThan(0);
  });

  it.each([...collectKeys(en)])('en "%s" is a non-empty string', (key) => {
    const val = resolveT(en, key);
    expect(val).not.toBe(key);
    expect(val.length).toBeGreaterThan(0);
  });
});
