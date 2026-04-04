import { getPopularMovies, searchMovies } from './movies-service';
import MovieCard from '@/components/movie-card';
import Pagination from './pagination';

interface MoviesGridProps {
    query?: string;
    currentPage: number;
    ratingThreshold: number;
}

export default async function MoviesGrid({ query, currentPage, ratingThreshold }: MoviesGridProps) {

    const data = query
        ? await searchMovies(query, currentPage)
        : await getPopularMovies(currentPage);




    const filteredMovies = data.results.filter(
        (movie) => movie.vote_average >= ratingThreshold
    );


    const hasResults = filteredMovies.length > 0;



    return (
        <>
            {!hasResults ? (

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
                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {
                            filteredMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        }
                    </div>

                    {/* Pagination */}
                    <div className="mt-16 border-t border-slate-900 pt-10">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={data.total_pages}
                        />
                    </div>
                </>
            )}
        </>
    );
}