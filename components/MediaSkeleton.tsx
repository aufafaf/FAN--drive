export default function MediaSkeleton() {
  return (
    <div className="media-card skeleton">
      <div className="skeleton-image"></div>
      <div className="card-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-footer">
          <div className="skeleton-size"></div>
          <div className="skeleton-btn"></div>
        </div>
      </div>
    </div>
  );
}

export function MediaGridSkeleton() {
  return (
    <div className="media-grid">
      {Array.from({ length: 9 }).map((_, i) => (
        <MediaSkeleton key={i} />
      ))}
    </div>
  );
}
