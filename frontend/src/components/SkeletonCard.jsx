export function SkeletonCard() {
  return (
    <div className="aspect-square skeleton rounded-none" aria-hidden="true" />
  );
}

export function SkeletonServiceCard() {
  return (
    <div className="card-dark space-y-4" aria-hidden="true">
      <div className="skeleton w-12 h-12 rounded-none" />
      <div className="skeleton h-5 w-3/4 rounded" />
      <div className="space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
      </div>
    </div>
  );
}

export function SkeletonReview() {
  return (
    <div className="card-dark space-y-4" aria-hidden="true">
      <div className="flex items-center gap-4">
        <div className="skeleton w-12 h-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-32 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="skeleton h-3 w-4/6 rounded" />
      </div>
    </div>
  );
}