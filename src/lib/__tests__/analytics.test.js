import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/analytics and firebase config before importing analytics
vi.mock('firebase/analytics', () => ({
  logEvent: vi.fn(),
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(() => Promise.resolve(false)),
}));

vi.mock('../../firebase/config', () => ({
  analytics: null,
  getAuthInstance: vi.fn(),
  getDbInstance: vi.fn(),
  default: {},
}));

describe('trackEvent', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('logs to console in DEV environment', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { trackEvent } = await import('../../lib/analytics');
    trackEvent('interaction', 'click', 'test_button');
    expect(logSpy).toHaveBeenCalledWith('[Analytics] interaction / click / test_button');
  });

  it('handles missing label gracefully', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { trackEvent } = await import('../../lib/analytics');
    trackEvent('navigation', 'scroll');
    expect(logSpy).toHaveBeenCalledWith('[Analytics] navigation / scroll');
  });

  it('does not throw for any category', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { trackEvent } = await import('../../lib/analytics');
    expect(() => trackEvent('auth', 'login', 'email')).not.toThrow();
    expect(() => trackEvent('form', 'submit')).not.toThrow();
    expect(() => trackEvent('course', 'view', 'lesson-1')).not.toThrow();
  });
});

describe('trackPageView', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('logs to console in DEV environment', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { trackPageView } = await import('../../lib/analytics');
    trackPageView('/about');
    expect(logSpy).toHaveBeenCalledWith('[Analytics] PageView: /about');
  });

  it('logs "home" for undefined section', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { trackPageView } = await import('../../lib/analytics');
    trackPageView();
    expect(logSpy).toHaveBeenCalledWith('[Analytics] PageView: home');
  });
});
