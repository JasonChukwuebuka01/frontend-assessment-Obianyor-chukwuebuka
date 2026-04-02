import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import { getMovieImageUrl, formatDate } from '@/lib/transformers';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    
    return (
        <Link href={`/items/${movie.id}`} className="group block">
            <article className="relative overflow-hidden rounded-xl bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
                {/* Image Container with Aspect Ratio to prevent Layout Shift (CLS) */}
                <div className="aspect-[2/3] relative w-full overflow-hidden">
                    <Image
                        src={getMovieImageUrl(movie.poster_path)}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    // Priority is false by default, which is good for grid items
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="mb-1 truncate text-lg font-bold text-white group-hover:text-indigo-400">
                        {movie.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-slate-400">
                        <time dateTime={movie.release_date}>
                            {formatDate(movie.release_date)}
                        </time>
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}