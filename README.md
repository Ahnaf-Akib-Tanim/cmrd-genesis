# CMRD — Front-end Redesign (Demo)

Demo front end for the redesigned **Centre for Medical Research & Development** website (cmrd.info).
Covers the publicly accessible pages only; authenticated areas (dashboard, course player, IRB submission forms) are out of scope.

## Design direction
Simple, organized and connected — built on the original cmrd.info content and structure.
- **Structure** — the home page follows the live site's section order; every page uses the same header, section headings and cards
- **Connected** — each page ends with "Where to go next" links and a helpline / WhatsApp strip, so visitors always know the next step
- **Plain language** — original content kept, with clearer, simpler wording
- **Look** — warm-white backgrounds, one navy section per page, a single orange accent, Archivo headings + Inter Tight body, gentle fade-in on scroll

## Stack
- React 19 + Vite 7
- Tailwind CSS v4
- Framer Motion
- React Router 7

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
