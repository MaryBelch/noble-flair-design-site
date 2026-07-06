import { useEffect, useRef } from 'react';

/**
 * Custom hook that watches a section ref for scroll-triggered fade-in animations.
 * Adds `.visible` class to all `.fade-in`, `.fade-in-left`, `.fade-in-right` children
 * when the section enters the viewport.
 *
 * @param {Array} deps — dependency array passed to useEffect (e.g. [locale, data.length])
 * @param {number} threshold — IntersectionObserver threshold (default 0.1)
 * @returns {React.RefObject} ref to attach to the section element
 */
export default function useScrollReveal(deps = [], threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const selector = '.fade-in, .fade-in-left, .fade-in-right, .hero__animate';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(selector).forEach((child) => child.classList.add('visible'));
        }
      },
      { threshold }
    );

    observer.observe(el);

    // Fallback timer: reveal after 1s regardless
    const timer = setTimeout(() => {
      el.querySelectorAll(selector).forEach((child) => child.classList.add('visible'));
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, deps);

  return ref;
}
