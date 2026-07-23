import { describe, it, expect } from 'vitest';

// Replicate the Contact component's validation logic for isolated testing
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_RE = /^@[\w]+$/;

function validateContact(data) {
  const errs = {};
  if (!data.name || data.name.trim().length < 2) {
    errs.name = 'name_error';
  }
  if (!data.contact || (!EMAIL_RE.test(data.contact) && !TELEGRAM_RE.test(data.contact))) {
    errs.contact = 'contact_error';
  }
  return errs;
}

describe('Contact validation — EMAIL_RE', () => {
  it.each([
    'user@example.com',
    'test@domain.co',
    'name@company.org.ua',
    'a@b.cd',
    'user+tag@gmail.com',
  ])('accepts valid email: %s', (email) => {
    expect(EMAIL_RE.test(email)).toBe(true);
  });

  it.each([
    '',
    'notanemail',
    '@domain.com',
    'user@',
    'user@.com',
    'user @example.com',
    '  spaced@test.com  ',
  ])('rejects invalid email: %s', (email) => {
    expect(EMAIL_RE.test(email)).toBe(false);
  });
});

describe('Contact validation — TELEGRAM_RE', () => {
  it.each([
    '@username',
    '@user_name',
    '@user123',
  ])('accepts valid telegram: %s', (tg) => {
    expect(TELEGRAM_RE.test(tg)).toBe(true);
  });

  it.each([
    '',
    'username',
    '@user name',
    '@',
    ' @username',
  ])('rejects invalid telegram: %s', (tg) => {
    expect(TELEGRAM_RE.test(tg)).toBe(false);
  });
});

describe('Contact validation — validate function', () => {
  it('returns empty errors for valid data', () => {
    const errs = validateContact({ name: 'John', contact: 'john@example.com' });
    expect(Object.keys(errs)).toHaveLength(0);
  });

  it('accepts telegram handle as contact', () => {
    const errs = validateContact({ name: 'Jane', contact: '@jane_doe' });
    expect(Object.keys(errs)).toHaveLength(0);
  });

  it('rejects missing name', () => {
    const errs = validateContact({ name: '', contact: 'john@example.com' });
    expect(errs.name).toBe('name_error');
  });

  it('rejects short name', () => {
    const errs = validateContact({ name: 'A', contact: 'john@example.com' });
    expect(errs.name).toBe('name_error');
  });

  it('rejects missing contact', () => {
    const errs = validateContact({ name: 'John', contact: '' });
    expect(errs.contact).toBe('contact_error');
  });

  it('rejects invalid contact format', () => {
    const errs = validateContact({ name: 'John', contact: 'not-an-email-or-tg' });
    expect(errs.contact).toBe('contact_error');
  });

  it('rejects if both name and contact are missing', () => {
    const errs = validateContact({ name: '', contact: '' });
    expect(Object.keys(errs)).toHaveLength(2);
  });

  it('handles name with only whitespace as invalid', () => {
    const errs = validateContact({ name: '   ', contact: 'john@example.com' });
    expect(errs.name).toBe('name_error');
  });
});
