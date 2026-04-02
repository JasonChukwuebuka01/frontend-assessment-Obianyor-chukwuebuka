export default function DetailSkeleton() {

    
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* 1. Backdrop Skeleton */}
      <div className="relative h-[50vh] w-full animate-pulse bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* 2. Content Layout Skeleton */}
      <div className="relative mx-auto -mt-32 max-w-6xl px-4 pb-20 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          
          {/* Left: Poster Skeleton */}
          <div className="w-64 flex-shrink-0 self-center md:self-start">
            <div className="aspect-[2/3] animate-pulse rounded-2xl bg-slate-900 border-4 border-slate-950 shadow-2xl" />
          </div>

          {/* Right: Info Skeleton */}
          <div className="flex-1 space-y-8 pt-8">
            <div className="space-y-4">
              {/* Title Line */}
              <div className="h-12 w-3/4 animate-pulse rounded-lg bg-slate-900" />
              {/* Tagline Line */}
              <div className="h-6 w-1/2 animate-pulse rounded-lg bg-slate-900/50" />
            </div>

            {/* Badges Row */}
            <div className="flex gap-4">
              <div className="h-8 w-20 animate-pulse rounded-full bg-slate-900" />
              <div className="h-8 w-24 animate-pulse rounded-full bg-slate-900" />
              <div className="h-8 w-16 animate-pulse rounded-full bg-slate-900" />
            </div>

            {/* Overview Block */}
            <div className="space-y-3">
              <div className="h-6 w-32 animate-pulse rounded bg-slate-900" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}