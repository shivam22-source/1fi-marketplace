export default function ErrorState({
  title = "Couldn't load this right now",
  description = "Check your connection and try again.",
  onRetry,
}) {
  return (
    <div className="error-wrap">
      <div className="error-title">{title}</div>
      <div className="error-desc">{description}</div>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
