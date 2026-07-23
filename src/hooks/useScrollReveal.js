import { useEffect, useRef } from 'react';

/**
 * Custom hook that watches a section ref for scroll-triggered fade-in animations.
 * Adds `.visible` class to all `.fade-in`, `.fade-in-left`, `.fade-in-right` children
 * when the section enters the viewport.
 *
 * Supports staggering: children without explicit transitionDelay get a computed delay
 * based on their index. Pass `stagger` to control base delay (default 0.1s).
 *
 * @param {Array} deps — dependency array passed to useEffect (e.g. [locale, data.length])
 * @param {number|{threshold:number, stagger:number}} options — threshold (0-1) or config object
 * @returns {React.RefObject} ref to attach to the section element
 */
export default function useScrollReveal(deps = [], options = 0.1) {
  const ref = useRef(null);
  const threshold = typeof options === 'number' ? options : (options.threshold ?? 0.1);
  const stagger = typeof options === 'number' ? null : (options.stagger ?? null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const selector = '.fade-in, .fade-in-left, .fade-in-right, .fade-in-reveal, .hero__animate';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll(selector);
          children.forEach((child, i) => {
            // If staggering is enabled and child has no explicit transition-delay, apply staggered delay
            if (stagger && !child.style.transitionDelay) {
              child.style.setProperty('--reveal-delay', `${i * stagger}s`);
            }
            // Use requestAnimationFrame to ensure the browser picks up the --reveal-delay
            // before the class toggles the visibility
            requestAnimationFrame(() => {
              child.classList.add('visible');
            });
          });
        }
      },
      { threshold }
    );

    observer.observe(el);

    // Fallback timer: reveal after 1.5s regardless
    const timer = setTimeout(() => {
      el.querySelectorAll(selector).forEach((child) => {
        child.classList.add('visible');
      });
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, deps);

  return ref;
}