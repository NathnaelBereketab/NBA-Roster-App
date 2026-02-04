function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="team-list">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-logo"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-badge"></div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
