// features/listing/movies-service.ts
import { getFromTMDB } from '@/lib/api-client';
import { MovieDetail, MovieResponse } from '@/types';

/**
 * Fetches a list of popular movies for the home page.
 */
export async function getPopularMovies(page: number = 1): Promise<MovieResponse> {
  return getFromTMDB(`/movie/popular?page=${page}`);
}

/**
 * Searches for movies based on a text query.
 */
export async function searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
  return getFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
};



export async function getMovieDetails(id: string): Promise<MovieDetail> {
  return getFromTMDB(`/movie/${id}`);
}