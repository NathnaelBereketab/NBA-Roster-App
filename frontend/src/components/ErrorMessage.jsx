function ErrorMessage({ message, onRetry, retryCount = 0 }) {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          {retryCount > 0 ? '🔄 Try Again' : '🔄 Retry'}
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
