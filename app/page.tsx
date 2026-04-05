import { Suspense } from 'react';
import SearchBar from '@/features/listing/search-bar';
import MoviesGrid from '@/features/listing/movies-grid';

interface HomePageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
    minRating?: string;
  }>;
}




export default async function HomePage({ searchParams }: HomePageProps) {

  const { query, page, minRating } = await searchParams;
  const currentPage = Number(page) || 1;
  const ratingThreshold = Number(minRating) || 0;




  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 md:px-8">
      {/* Premium Header & Search Area - Loads Instantly */}
      <header className="mx-auto mb-16 max-w-4xl text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          Content <span className="text-indigo-500">Explorer</span>
        </h1>
        <p className="mb-10 text-lg text-slate-400">
          The ultimate database for cinema lovers. Search, filter, and discover.
        </p>

        <SearchBar />

      </header>

      {/* Results Section */}
      <section aria-label="Movie grid">
        {/*
          The 'key' ensures that when the user searches or changes pages, 
          the loading state (fallback) shows up again immediately.
        */}
        <Suspense
          key={currentPage + ratingThreshold}
          fallback={
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[2/3] w-full rounded-xl bg-slate-900" />
              ))}
            </div>
          }
        >
          <MoviesGrid
            query={query}
            currentPage={currentPage}
            ratingThreshold={ratingThreshold}
          />
        </Suspense>
      </section>
    </main>
  );
}