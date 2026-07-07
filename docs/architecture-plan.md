# System Architecture Plan

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Animations:** Tailwind CSS Animations (replaced Framer Motion for better mobile performance)
- **Deployment:** Vercel

## Component Strategy
- **Server Components:** Default for all pages to ensure lightning-fast initial loads and zero-JS hydration for static content (e.g., Landing Page backgrounds).
- **Client Components:** Used strictly for interactive elements (e.g., Header with scroll detection, Login Forms, Payment Forms, Confetti animations).
- **Lazy Loading (Dynamic Imports):** Heavy UI components that are below the fold are loaded asynchronously.

## Performance Optimizations
- Replaced requestAnimationFrame with setInterval for confetti.
- SVG vectors used for logos for infinite scalability.
