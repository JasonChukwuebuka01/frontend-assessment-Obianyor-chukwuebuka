# Movie Explorer 

A  movie discovery application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, powered by the **TMDB API**.


##  Quick Start (Under 5 Commands)

## 🚀 Quick Start (Under 5 Commands)

1. **Clone:** `git clone https://github.com/JasonChukwuebuka01/frontend-assessment-Obianyor-chukwuebuka.git`
2. **Install:** `npm install --legacy-peer-deps`
3. **Environment:** Create a `.env` file with your `TMDB_API_KEY` and `TMDB_BASE_URL`
4. **Run:** `npm run dev`



##  Architecture Decisions
Feature-Based Folder Structure: Organized by domain (e.g., features/listing) rather than generic folders. This improves scalability and makes it easier to locate logic.

Separation of Concerns: UI components (JSX) are kept "dumb." All data fetching and complex logic are moved to Server Components or Utility Functions.

Server-First Approach: Used React Server Components (RSC) to minimize the JavaScript sent to the client, improving initial load times.




## Performance Optimizations

React 18 Streaming (B-2): Implemented Suspense boundaries around the MoviesGrid. This allows the page shell (Header/Search) to render instantly while the movie data streams in the background.

Image Optimization: Used the Next.js Image component for automatic resizing, WebP conversion, and lazy loading of movie posters.

Conditional Prefetching: Leveraging Next.js Link component to prefetch movie detail pages for near-instant navigation.




## Bonus Tasks Attempted

 Streaming with Suspense:Throttle your network to "Fast 3G" in DevTools. Notice the Header appears immediately while the Grid shows a skeleton loader.




## 🌐 Deployment Evolution: The Pivot from Cloudflare to Vercel

Initially, this project was architected for **Cloudflare Pages** using the `@cloudflare/next-on-pages` adapter. During the final deployment phase, a strategic shift to **Vercel** was made due to the following technical challenges:

1. **The "Logo-Only" Rendering Bug:** Post-deployment on Cloudflare, the application encountered a runtime execution error where the page would hang, displaying only the static logo/shell without fetching or rendering the dynamic movie content. This indicated a deep compatibility issue between the TMDB fetch logic and the Cloudflare Edge Runtime.

2. **Dependency Conflicts:** As a project leveraging **Next.js 15+**, I encountered significant peer dependency mismatches with the Cloudflare adapter. To maintain the project's integrity and use the latest React 19 features, a more native environment was required.

3. **Optimizing for Streaming :** Vercel provides native, zero-config support for **React 18 Streaming**. To ensure the Suspense boundaries and movie-grid streaming worked flawlessly for this assessment, Vercel was the scientifically superior choice.