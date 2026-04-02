export default function MovieSkeleton() {

    
  return (
    <div className="rounded-xl bg-slate-900/50 p-0 overflow-hidden border border-slate-800">
      {/* Poster Area */}
      <div className="aspect-[2/3] w-full animate-pulse bg-slate-800" />
      
      {/* Text Area */}
      <div className="p-4 space-y-3">
        {/* Title line */}
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-800" />
        
        {/* Metadata line */}
        <div className="flex justify-between">
          <div className="h-3 w-1/4 animate-pulse rounded bg-slate-800" />
          <div className="h-3 w-1/6 animate-pulse rounded bg-slate-800" />
        </div>
      </div>
    </div>
  );
}