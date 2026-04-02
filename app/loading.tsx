import MovieSkeleton from '@/components/movie-skeleton';

export default function Loading() {

  const skeletonItems = Array.from({ length: 20 });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 md:px-8">
      {/* Match the Header Height of the Home Page */}
      <header className="mb-10 text-center">
        <div className="mx-auto mb-4 h-10 w-64 animate-pulse rounded-lg bg-slate-900" />
        <div className="mx-auto h-4 w-48 animate-pulse rounded bg-slate-900" />
      </header>

      {/* The Grid - Matching the exact responsive breakpoints of MovieCard */}
      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {skeletonItems.map((_, index) => (
            <MovieSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </section>
    </main>
  );
}