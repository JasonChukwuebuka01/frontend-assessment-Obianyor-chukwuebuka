'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // TMDB limits free searches to 500 pages usually
    const maxPages = Math.min(totalPages, 500);

    function handlePageChange(newPage: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    }

    
    // Hide pagination if there's only one page
    if (maxPages <= 1) return null;

    return (
        <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 disabled:opacity-30"
            >
                Previous
            </button>

            <span className="text-slate-400">
                Page <strong className="text-white">{currentPage}</strong> of {maxPages}
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= maxPages}
                className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 disabled:opacity-30"
            >
                Next
            </button>
        </nav>
    );
}