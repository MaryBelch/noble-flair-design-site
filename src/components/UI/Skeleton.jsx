import './Skeleton.css';

export default function Skeleton({ width = '100%', height = '20px', borderRadius = '8px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  );
}

/** Skeleton block for a content card */
export function CardSkeleton({ lines = 3 }) {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <Skeleton height="24px" width="60%" />
      <Skeleton height="14px" width="40%" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height="12px" width={`${70 + Math.random() * 30}%`} />
      ))}
    </div>
  );
}

/** Skeleton block for a module/lesson list */
export function ListSkeleton({ rows = 5 }) {
  return (
    <div className="skeleton-list" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height="48px" borderRadius="10px" />
      ))}
    </div>
  );
}
