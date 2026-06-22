export function CardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 animate-pulse">
      <div className="h-3 w-24 bg-zinc-700 rounded mb-4" />
      <div className="h-8 w-32 bg-zinc-700 rounded mb-2" />
      <div className="h-3 w-40 bg-zinc-800 rounded" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-10 bg-zinc-800 rounded" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-zinc-900 rounded" />
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 animate-pulse">
      <div className="h-4 w-40 bg-zinc-700 rounded mb-4" />
      <div className="h-48 bg-zinc-800 rounded" />
    </div>
  )
}
