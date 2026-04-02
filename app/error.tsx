'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}




export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service (or just console for now)
    console.error('Captured Error:', error);
  }, [error]);





  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      <div className="mb-6 text-6xl">⚠️</div>
      <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
        Something went wrong!
      </h1>
      <p className="mb-8 max-w-md text-slate-400">
        We ran into an issue while loading this content. It might be a temporary connection problem.
      </p>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* F-4: Actionable button to retry */}
        <button
          onClick={() => reset()}
          className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-500"
        >
          Try Again
        </button>
        
        <a
          href="/"
          className="rounded-full border border-slate-800 px-8 py-3 font-semibold text-white transition hover:bg-slate-900"
        >
          Go to Homepage
        </a>
      </div>
    </main>
  );
}