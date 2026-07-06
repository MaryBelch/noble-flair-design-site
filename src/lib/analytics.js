/**
 * Analytics helper.
 * In development, events are logged to console.
 * In production, uses Firebase Analytics (Google Analytics 4).
 */

import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase/config';

const IS_DEV = import.meta.env.DEV;

/**
 * Track a user action.
 * @param {'interaction'|'navigation'|'auth'|'form'|'course'} category
 * @param {string} action  — e.g. 'click', 'submit', 'view', 'login'
 * @param {string} [label] — optional detail
 */
export function trackEvent(category, action, label) {
  if (IS_DEV) {
    console.log(`[Analytics] ${category} / ${action}${label ? ` / ${label}` : ''}`);
    return;
  }
  try {
    if (analytics) {
      logEvent(analytics, action, { category, label });
    }
  } catch {
    // Silently ignore analytics errors
  }
}

/**
 * Track a page view.
 * @param {string} section — path or section name
 */
export function trackPageView(section) {
  if (IS_DEV) {
    console.log(`[Analytics] PageView: ${section || 'home'}`);
    return;
  }
  try {
    if (analytics) {
      logEvent(analytics, 'page_view', { page_path: section || 'home' });
    }
  } catch {
    // Silently ignore
  }
}
