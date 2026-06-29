export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-surface-800/50 ${className}`} />;
}

export function KPISkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-10" />
          </div>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ className = 'chart-height' }: { className?: string }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className={`w-full ${className}`} />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card !p-0 overflow-hidden">
      {[1, 2, 3, 4, 5].slice(0, rows).map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b border-surface-800/50 last:border-b-0">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].slice(0, count).map((i) => (
        <div key={i} className="card space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton({ charts = 2, tableRows = 0 }: { charts?: number; tableRows?: number }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
      <KPISkeleton />
      {charts > 0 && (
        <div className={`grid grid-cols-1 ${charts > 1 ? 'lg:grid-cols-2' : ''} gap-4`}>
          {[1, 2].slice(0, charts).map((i) => <ChartSkeleton key={i} />)}
        </div>
      )}
      {tableRows > 0 && <TableSkeleton rows={tableRows} />}
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeMap[size]} border-2 border-surface-700 border-t-primary-500 rounded-full animate-spin`} />
    </div>
  );
}
