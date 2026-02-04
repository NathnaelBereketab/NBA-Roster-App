import LoadingSkeleton from './LoadingSkeleton';

function LoadingSpinner({ message = 'Loading...', showSkeleton = false, skeletonCount = 6 }) {
  if (showSkeleton) {
    return <LoadingSkeleton count={skeletonCount} />;
  }

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
