# Provident Groups – Education Consultancy Website

A premium, conversion-focused website for **Provident Groups**, an education consultancy and university admissions firm. Built with Next.js (App Router), TypeScript, Tailwind CSS, and GSAP for scroll animations and smooth UX.

## Features

- **Homepage**: Hero, features, about preview, stats counters, courses preview, promo banner, lead form, testimonials carousel, colleges grid, and CTA
- **About**: Mission, vision, and why choose us
- **Courses**: Filterable and searchable course list with detail pages (Overview, Eligibility, Admission, Careers)
- **Gallery**: Photos/Videos tabs with lightbox
- **Contact**: Form (submits to `/api/lead`), contact details, WhatsApp/Call buttons, optional map
- **Admin**: Stub page for Phase 2
- **Lead API**: `POST /api/lead` — validates and optionally sends email via Resend
- **Data-driven**: All content from JSON in `src/data`; data layer can be swapped for FastAPI later

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS** (v4)
- **GSAP** + **ScrollTrigger** (scroll reveals, count-up, parallax)
- **Lenis** (smooth scrolling, integrated with ScrollTrigger)
- **next/image** for images

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/              # Routes and API
  components/       # Layout, sections, UI primitives
  data/             # JSON content (site, courses, testimonials, colleges, gallery)
  lib/              # Data access, animations utils, fonts
  hooks/            # GSAP/Lenis hooks
public/
  assets/           # Logo, hero, course/gallery/college images, patterns
```

## Where to Edit Content

All editable content lives in **`src/data/`**:

| File | Purpose |
|------|--------|
| `site.json` | Brand name, tagline, contact info, nav, hero copy, stats, social links |
| `courses.json` | Course list (slug, title, category, image, descriptions, eligibility, etc.) |
| `testimonials.json` | Testimonial quotes, names, roles |
| `colleges.json` | College names, logos, locations |
| `gallery.json` | Gallery items (src, alt, category: photo/video) |

Change text, add/remove courses or testimonials, and update contact details there. The UI reads from these files via `src/lib/data.ts`.

## Where to Replace Assets

Placeholder assets are under **`public/assets/`**:

| Path | What to replace |
|------|------------------|
| `public/assets/logo.svg` | Your final logo (SVG or PNG) |
| `public/assets/hero.svg` | Hero background (use `hero.jpg` or `hero.mp4` and update `site.json` hero.backgroundImage / backgroundVideo) |
| `public/assets/courses/*.svg` | Course category images (nursing, engineering, etc.) |
| `public/assets/gallery/*.svg` | Gallery photos/video thumbnails |
| `public/assets/colleges/*.svg` | College logos |

Update references in the JSON files if you change file names or add new images. The app uses `next/image` for optimization.

## Environment Variables

Copy `.env.example` to `.env.local` and fill as needed:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | (Optional) Resend API key to email lead form submissions |
| `LEAD_EMAIL_TO` | (Optional) Email address to receive leads |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for floating button (e.g. `919876543210`) |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | (Optional) Google Maps embed URL for contact page |

Without `RESEND_API_KEY` and `LEAD_EMAIL_TO`, lead submissions are logged to the server console and the API still returns success.

## Connecting a FastAPI Backend Later

The data layer is in **`src/lib/data.ts`**. It currently imports JSON and exposes:

- `getSiteData()`
- `getCourses()` / `getCourseBySlug(slug)`
- `getTestimonials()`
- `getColleges()`
- `getGallery()`

To switch to FastAPI:

1. Replace the JSON imports with `fetch()` calls to your API (e.g. `GET /api/site`, `GET /api/courses`, etc.).
2. Optionally make the functions `async` and use them in server components or in `getServerSideProps`-style data fetching.
3. Keep the same return shapes so the UI components do not need to change.

## Deployment

The app is static-friendly where possible (home, about, courses, gallery, contact, course detail pages). The only dynamic route is `POST /api/lead`.

- **Vercel**: Connect the repo and deploy; set env vars in the dashboard.
- **Other hosts**: Run `npm run build` and `npm start`, or use a Node server that runs the built app.

## License

Private – Provident Groups.
