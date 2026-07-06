import { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      // Clean up after transition
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hidden ? 'loader--hidden' : ''}`}>
      <div className="loader__content">
        <div className="loader__ring" aria-hidden="true" />
        <span className="loader__text">Noble Flair Design</span>
      </div>
    </div>
  );
}
