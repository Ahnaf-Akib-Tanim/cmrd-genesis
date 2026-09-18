# CMRD — Front-end Redesign (Demo)

Demo front end for the redesigned **Centre for Medical Research & Development** website (cmrd.info).
Covers the publicly accessible pages only; authenticated areas (dashboard, course player, IRB submission forms) are out of scope.

## Design direction
Visual-first, art-directed — scientific institution × editorial magazine × cinematic digital experience.
- **Palette** — near-black, deep navy, warm white; a single signal-orange accent (`src/index.css`)
- **Type** — Archivo variable (enormous uppercase display, width axis for condensed/wide), Inter Tight body, JetBrains Mono metadata
- **Composition** — asymmetric 12-column editorial grid, full-bleed imagery, numbered sections, hairlines, deliberate dark/light rhythm, no card grids
- **Motion** — Lenis smooth scroll, custom cursor, fullscreen typographic menu with image preview, canvas particle network, parallax + clip-path image reveals, pinned full-screen statements, horizontal-scroll "what we do", scroll-driven letter-spacing and word highlight, IRB step system, cursor-following course previews, curtain page transitions with page name, film grain
- **Imagery** — authentic lab / research photography, graded consistently (contrast up, saturation down)

## Stack
- React 19 + Vite 7
- Tailwind CSS v4
- Framer Motion
- React Router 7
- Lenis (smooth scroll)

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Pages
| Route | Page |
|---|---|
| `/` | Home — hero, stats, two service paths, specialties, IRB highlight, courses, testimonials, blog, partners |
| `/consultancy` | Research consultancy — services, process, FAQ, request form |
| `/courses` | Skill development — filterable catalogue (upcoming / ongoing / free) |
| `/projects` | Collaborative works — research & publications with filters |
| `/blog` | CMRD Insights — featured series, category filter, posts (EN + Bangla) |
| `/about` | Mission/vision, story, values, timeline, leadership, location |
| `/irb` | IRB portal — process, requirements, demo approval verification |
| `/join` | Sign in / create account (demo, `?mode=register`) |
| `/contact` | Contact cards, message form, map |
| `/refund-policy`, `/privacy-policy`, `/terms` | Policy pages |

## Content notes
- Organisation details, contact info, partner institutions, specialties, the two real publications and blog titles are taken from the live site.
- Courses, extra projects, testimonials, statistics and team profiles are **placeholder sample data** (see `src/data/`) — the live site currently lists no courses. Replace with real data when wiring to the backend.
- Forms and the IRB verification are front-end demos only (no API calls).
- Photography is loaded from Unsplash (`src/data/images.js`) as placeholders — replace with CMRD's own photographs.

## Structure
```
src/
  components/   Navbar, Footer, ui (typography, buttons, motion, figure, ticker), cards (rows, testimonials, closing CTA)
  data/         site.js, courses.js, projects.js, posts.js, images.js
  pages/        one file per route
  index.css     Tailwind theme, animations, utilities
```
