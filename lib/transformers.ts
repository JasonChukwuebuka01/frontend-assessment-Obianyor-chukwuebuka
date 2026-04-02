/**
 * Takes a TMDB path and returns the full image URL.
 * Falls back to a placeholder if the path is missing.
 */

export function getMovieImageUrl(path: string | null, size: 'w500' | 'original' = 'w500'): string {
  
    if (!path) {
    // You can replace this with a local placeholder image in your public folder later
    return 'https://via.placeholder.com/500x750?text=No+Image+Available';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};




/**
 * Formats a date string into a more human-readable version.
 */
export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}