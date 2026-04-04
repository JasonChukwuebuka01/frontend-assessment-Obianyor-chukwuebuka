
import { getPopularMovies, searchMovies } from '@/features/listing/movies-service';
import { Suspense } from 'react';
import MovieCard from '@/components/movie-card';
import SearchBar from '@/features/listing/search-bar';
import Pagination from '@/features/listing/pagination';



/**
 * Next.js 15: searchParams is a Promise. 
 * We define exactly what can come from the URL.
 */
interface HomePageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
    minRating?: string;
  }>;
}


export default async function HomePage({ searchParams }: HomePageProps) {
  // 1. Extract and normalize URL parameters
  const { query, page, minRating } = await searchParams;
  const currentPage = Number(page) || 1;
  const ratingThreshold = Number(minRating) || 0;

  // 2. Data Fetching (Server-Side)
  // We fetch 20 items per page as required by F-1
  const data = query
    ? await searchMovies(query, currentPage)
    : await getPopularMovies(currentPage);

  // 3. Apply F-3 Additional Filter (Client-side logic performed on Server)
  // If a user selects "7+", we filter the 20 results we just fetched.
  const filteredMovies = data.results.filter(
    (movie) => movie.vote_average >= ratingThreshold
  );

  const hasResults = filteredMovies.length > 0;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 md:px-8">
      {/* Premium Header & Search Area */}
      <header className="mx-auto mb-16 max-w-4xl text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          Content <span className="text-indigo-500">Explorer</span>
        </h1>
        <p className="mb-10 text-lg text-slate-400">
          The ultimate database for cinema lovers. Search, filter, and discover.
        </p>

        {/* F-3: Search & Filter Feature */}
        <Suspense fallback={<div className="h-12 w-full max-w-xl mx-auto bg-slate-900 animate-pulse rounded-xl" />}>
          <SearchBar />
        </Suspense>
      </header>

      {/* Results Section */}
      <section aria-label="Movie grid">
        {!hasResults ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="mb-6 text-7xl opacity-20">🎬</div>
            <h2 className="text-2xl font-bold text-white">No movies match your criteria</h2>
            <p className="mt-2 text-slate-400">
              Try adjusting your search or lowering the rating filter.
            </p>
            <a
              href="/"
              className="mt-8 rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-indigo-400 hover:bg-slate-800 transition"
            >
              Reset all filters
            </a>
          </div>
        ) : (
          <>
            {/*  Responsive Grid (1 col mobile, 2 tablet, 3-5 desktop) */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* F-1: Pagination Logic */}
            <div className="mt-16 border-t border-slate-900 pt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={data.total_pages}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}