import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieDetails } from '@/features/listing/movies-service';
import { getMovieImageUrl, formatDate } from '@/lib/transformers';



interface Props {
  params: Promise<{ id: string }>;
}

/**
 * This generates the <title> and <meta> tags on the server.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(id);
    return {
      title: `${movie.title} | Content Explorer`,
      description: movie.overview,
      openGraph: {
        images: [getMovieImageUrl(movie.backdrop_path, 'original')],
      },
    };
  } catch {
    return { title: 'Movie Not Found' };
  }
}




export default async function MovieDetailPage({ params }: Props) {


  const { id } = await params;
  
  let movie;

  try {
    movie = await getMovieDetails(id);
  } catch (error) {
    notFound();
  }




  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Backdrop Section */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={getMovieImageUrl(movie.backdrop_path, 'original')}
          alt=""
          fill
          priority // F-2: Priority for above-the-fold image
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        
        {/* F-2: Breadcrumb Navigation */}
        <nav className="absolute left-4 top-8 md:left-8" aria-label="Breadcrumb">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition"
          >
            ← Back to Listing
          </Link>
        </nav>
      </div>

      {/* Content Section */}
      <article className="relative mx-auto -mt-32 max-w-6xl px-4 pb-20 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Poster */}
          <div className="w-64 flex-shrink-0 self-center md:self-start">
            <div className="aspect-[2/3] overflow-hidden rounded-2xl border-4 border-slate-900 shadow-2xl">
              <Image
                src={getMovieImageUrl(movie.poster_path)}
                alt={movie.title}
                width={300}
                height={450}
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-6">
            <header>
              <h1 className="text-4xl font-extrabold md:text-5xl">{movie.title}</h1>
              {movie.tagline && (
                <p className="mt-2 text-xl italic text-slate-400">{movie.tagline}</p>
              )}
            </header>

            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-indigo-400 border border-indigo-500/30">
                {movie.status}
              </span>
              <span className="text-slate-400">{formatDate(movie.release_date)}</span>
              <span className="text-slate-400">{movie.runtime} mins</span>
              <div className="flex items-center gap-1 text-yellow-500">
                <span>★</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>

            <section>
              <h2 className="mb-2 text-xl font-bold">Overview</h2>
              <p className="leading-relaxed text-slate-300 md:text-lg">
                {movie.overview}
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-bold">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="rounded-lg bg-slate-900 px-3 py-1 text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}