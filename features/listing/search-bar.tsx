'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from './use-debounce';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Sync local state with the URL initially
  const [text, setText] = useState(searchParams.get('query') || '');
  const [rating, setRating] = useState(searchParams.get('minRating') || '');

  const debouncedQuery = useDebounce(text, 400);

  // 2. The Fix: Only update if the Search/Filter values actually changed
  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';
    const currentRating = searchParams.get('minRating') || '';

    // If the URL already matches our local state, do nothing!
    // This prevents the "Infinite Loop" when Pagination changes the URL.
    if (debouncedQuery === currentQuery && rating === currentRating) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    // Update Query Param
    if (debouncedQuery) {
      params.set('query', debouncedQuery);
    } else {
      params.delete('query');
    }



    // Update Rating Param
    if (rating) {
      params.set('minRating', rating);
    } else {
      params.delete('minRating');
    }

    // IMPORTANT: Reset to page 1 only when a NEW search or filter is applied
    params.set('page', '1');

    // Use { scroll: false } to keep the user's scroll position smooth
    router.push(`?${params.toString()}`, { scroll: false });

  }, [debouncedQuery, rating, router, searchParams]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      {/* Search Input Container */}
      <div className="relative group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search for movies..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 px-12 py-4 text-white backdrop-blur-md transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 group-focus-within:opacity-100 transition-opacity">
          🔍
        </span>
      </div>

      {/* Filter Row */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <label htmlFor="rating" className="text-sm font-medium text-slate-400">
            Min. Rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-white focus:border-indigo-500 outline-none transition"
          >
            <option value="">All Ratings</option>
            <option value="8">8+ (Top Tier)</option>
            <option value="7">7+ (Good)</option>
            <option value="5">5+ (Average)</option>
          </select>
        </div>

        {/* Subtle status text */}
        <p className="text-xs text-slate-500 italic">
          {debouncedQuery ? `Searching for "${debouncedQuery}"` : 'Trending Movies'}
        </p>
      </div>
    </div>
  );
}