# Tasks: Landing Page — rioagora.org

Source PRD: `tasks/prd-landing-page.md`

---

## Relevant Files

- `landing/package.json` - Project manifest with scripts and dependencies
- `landing/next.config.mjs` - Next.js config with static export (`output: 'export'`)
- `landing/jsconfig.json` - Absolute import paths (`@/` → `src/`)
- `landing/wrangler.toml` - Cloudflare Pages deployment config
- `landing/README.md` - Project documentation (setup, dev, deploy)
- `landing/src/app/layout.jsx` - Root layout with fonts, metadata, JSON-LD, Lenis provider
- `landing/src/app/page.jsx` - Main page composing all sections
- `landing/src/app/globals.css` - Base styles (responsive rem, scrollbar-hidden, size-screen)
- `landing/src/content/site-content.json` - All landing page copy (meta, hero, about, team, agenda, footer)
- `landing/src/typography/fonts/Intro-Regular.woff2` - Intro Regular font file
- `landing/src/typography/fonts/Intro-Italic.woff2` - Intro Italic font file
- `landing/src/typography/fonts/Intro-Bold.woff2` - Intro Bold font file
- `landing/src/typography/fonts/Intro-BoldItalic.woff2` - Intro Bold Italic font file
- `landing/src/typography/index.js` - Font declarations and exports
- `landing/src/providers/LenisProvider.jsx` - Lenis smooth scroll client provider
- `landing/src/components/AnimatedText.jsx` - Reusable split-text animation (line/word/letter modes)
- `landing/src/components/Typography.jsx` - Composed typography components (SectionTitle, SectionText, CardName, CardText, RichText)
- `landing/src/components/Hero.jsx` - Hero section with slideshow, brand mark, title
- `landing/src/components/About.jsx` - "O que somos" section
- `landing/src/components/Team.jsx` - "Quem Somos" section with stacking cards
- `landing/src/components/Agenda.jsx` - "Agenda" section
- `landing/src/components/EventCard.jsx` - Event detail card with image background
- `landing/src/components/Footer.jsx` - Footer with copyright and tagline
- `landing/public/images/hero/slide-01.jpg` - Hero slideshow image 1
- `landing/public/images/hero/slide-02.jpg` - Hero slideshow image 2
- `landing/public/images/hero/slide-03.jpg` - Hero slideshow image 3
- `landing/public/images/hero/slide-04.jpg` - Hero slideshow image 4
- `landing/public/images/people/people-placeholder.png` - Team member placeholder photo
- `landing/public/images/brand/` - Logo files (RGB, negative, mono, balloon seals)
- `landing/public/images/agenda/capanema.jpg` - Event venue placeholder image

### Notes

- No TypeScript — all files use `.jsx` / `.js` extensions
- No unit tests required per PRD (static landing page with no business logic)
- Content is static build-time JSON — no API routes or server-side logic
- All images are served from `public/images/` (no next/image optimization in static export)
- Font files sourced from `project/visualidade/type/Intro-FontFamily/`
- Hero images sourced from `project/fotos/hero/` and must be resized before copying

## Instructions for Completing Tasks

As you complete each task, check it off by changing `- [ ]` to `- [x]` in this file. Update after each sub-task, not only after the whole parent task. This allows `/impl` to track progress.

## Tasks

- [x] 0.0 Create repository
  - [x] 0.1 Initialize a git repository in the workspace root (`ws-rio-agora`) with `git init` and create an initial commit

- [x] 1.0 Project scaffolding and configuration
  - [x] 1.1 Create a new Next.js project inside `landing/` using `pnpm create next-app` — no TypeScript, with App Router, with src directory, with Tailwind CSS, no ESLint (or configure later), pnpm as package manager
  - [x] 1.2 Install additional dependencies: `motion`, `motion-plus`, `lenis` — verify they appear in `package.json`
  - [x] 1.3 Configure `next.config.mjs` to use `output: 'export'` for static HTML generation and set `images.unoptimized: true` (required for static export)
  - [x] 1.4 Configure `jsconfig.json` with `@/*` path alias mapping to `./src/*` for absolute imports
  - [x] 1.5 Copy the 4 Intro font files (Regular, Italic, Bold, BoldItalic `.woff2`) from `project/visualidade/type/Intro-FontFamily/` to `landing/src/typography/fonts/`. Create `landing/src/typography/index.js` that declares the Intro font family using `next/font/local` with all 4 weights/styles. Remove the default Geist font references from `layout.jsx`
  - [x] 1.6 Configure `landing/src/app/globals.css` with the required base styles: `@import "tailwindcss"`, responsive rem sizing (`text-[calc(100vw/375*16)]` mobile / `text-[calc(100vw/1920*16)]` desktop), `body` defaults (w-screen, h-dvh, scrollbar-hidden, text-white), `.--` debug border, `.size-screen` utility, `@utility scrollbar-hidden` block
  - [x] 1.7 Add brand color CSS custom properties to `globals.css` or Tailwind config: Verde `#2B553C`, Laranja `#F37052`, Azul `#13BECF`
  - [x] 1.8 Run `pnpm dev` inside `landing/` and verify the project starts without errors, Intro font loads, and Tailwind classes work

- [x] 2.0 Content JSON, asset pipeline and SEO
  - [x] 2.1 Read `project/content/rio-agora-content.md` and extract all copy into `landing/src/content/site-content.json` following the JSON structure defined in the PRD (sections: meta, hero, about, team, agenda, footer). Rich text fields (`about.content`, `team.members[].bio`, `team.footer`) must contain proper HTML strings with `<strong>`, `<em>`, `<a target="_blank">`, `<p>` tags
  - [x] 2.2 Process hero images: pick 4 images from `project/fotos/hero/`, resize so the smaller dimension is max 1920px (landscape) or 910px (portrait), JPEG quality >= 85, save as `landing/public/images/hero/slide-01.jpg` through `slide-04.jpg`
  - [x] 2.3 Copy brand assets from `project/visualidade/marca/` (all PNG files: RGB logo, negative logo, mono variants, balloon seals) to `landing/public/images/brand/`
  - [x] 2.4 Copy `project/fotos/people/people-placeholder.png` to `landing/public/images/people/people-placeholder.png`
  - [x] 2.5 Create a placeholder image at `landing/public/images/agenda/capanema.jpg` (can be a copy of one of the hero images or a solid color placeholder until a real venue photo is provided)
  - [x] 2.6 Set up `layout.jsx` metadata: title ("RioAgora.org — Um Rio de futuros"), description, Open Graph tags (title, description, url, image), Twitter card tags, `<html lang="pt-BR">`, and configure a favicon using the brand logo
  - [x] 2.7 Add JSON-LD structured data to `layout.jsx` as a `<script type="application/ld+json">` block — use `Organization` schema type with name, url, description, and logo
  - [x] 2.8 Add a commented-out Google Analytics `<script>` placeholder in `layout.jsx` with `GA_MEASUREMENT_ID` ready to be replaced when the real ID is available

- [x] 3.0 Animation and typography infrastructure
  - [x] 3.1 Create `landing/src/providers/LenisProvider.jsx` — a `"use client"` component that initializes Lenis smooth scroll, wraps children, and cleans up on unmount. Must expose the Lenis instance for scroll-to-top functionality
  - [x] 3.2 Integrate `LenisProvider` into `layout.jsx`, wrapping the page children. Verify smooth scroll works when navigating between sections
  - [x] 3.3 Create `landing/src/components/AnimatedText.jsx` — a `"use client"` component that: accepts `mode` prop (`"line"` | `"word"` | `"letter"`), accepts `once` prop (default true) to animate only on first viewport entry via IntersectionObserver, wraps `{children}`, waits for `document.fonts.ready` before running `splitText` from `motion-plus`, performs masked reveal animation (overflow hidden on each split unit, content translates up into view) using `animate` + `stagger` from `motion`, sets `will-change: transform, opacity` on `.split-word` / `.split-line` / `.split-char` elements, stays hidden (`visibility: hidden`) until fonts are loaded then becomes visible and animates
  - [x] 3.4 Create `landing/src/components/Typography.jsx` exporting 5 components: `SectionTitle` (large heading, wraps children in AnimatedText mode="letter" once, appropriate Tailwind size/weight classes), `SectionText` (body text, wraps in AnimatedText mode="line" once), `CardName` (h3-level, wraps in AnimatedText mode="word" once), `CardText` (static paragraph, no animation), `RichText` (renders HTML string via `dangerouslySetInnerHTML` in a `<div>`, accepts `className` prop). All styling via Tailwind only — no additions to globals.css

- [x] 4.0 Landing page sections
  - [x] 4.1 Create `landing/src/components/Hero.jsx` — fullscreen `<section>` (`size-screen`) containing a `<header>`. Inside: (a) slideshow of 4 hero images auto-advancing every 5s with animated transitions using `motion`, fullscreen background (object-cover), (b) brand mark in bottom-right corner (200x200px area) with `<h1>` containing a screen-reader `<span>` and a visible clickable `<img>` of `RioAgora_CorNegativa_RGB.png` that scrolls to page top, (c) hero title "Construindo o futuro do Rio de Janeiro..." overlaid with readable contrast. Responsive for 375px and 1920px
  - [x] 4.2 Create `landing/src/components/About.jsx` — fullscreen `<section>` (`size-screen`). Title "O que somos" using `SectionTitle`. Content from `site-content.json` `about.content` rendered via `RichText` wrapped in `SectionText`-style animation. Three paragraphs with proper spacing. Responsive layout
  - [x] 4.3 Create `landing/src/components/Team.jsx` — fullscreen `<section>`. Sticky title "Quem Somos". 4 team member cards that stack/overlap as user scrolls (scroll-driven stacking effect using CSS sticky or motion scroll triggers). Each card: rounded corners with bottom-right square (`rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl`), contains `<figure>` with `<img>` (people-placeholder.png) and `<figcaption>` with `<h3>` (name via `CardName`) + `<p>` (bio via `RichText`). Data from `site-content.json` `team.members`. Team footer text rendered below via `RichText`
  - [x] 4.4 Create `landing/src/components/EventCard.jsx` — card with background `<figure>` + `<img>` (capanema placeholder), dark overlay for contrast, info block overlaid showing: date via `<time datetime="2026-02-23">`, time "16h", location address, participants list (name + org), mediator (name + role). Data passed via props
  - [x] 4.5 Create `landing/src/components/Agenda.jsx` — fullscreen `<section>` (`size-screen`). Title "Agenda" using `SectionTitle`. Label "Debate 1: Educacao". Renders `<EventCard>` with data from `site-content.json` `agenda.events[0]`. Responsive layout
  - [x] 4.6 Create `landing/src/components/Footer.jsx` — `<footer>` element displaying copyright text and tagline from `site-content.json`, with current year rendered dynamically. Minimal design with brand colors (Verde background)
  - [x] 4.7 Assemble `landing/src/app/page.jsx` — import and render all sections in order: `<Hero>`, `<About>`, `<Team>`, `<Agenda>`, `<Footer>` inside an `<article>`. Verify all sections render, scroll smoothly, and animations trigger on viewport entry

- [x] 5.0 Cloudflare deployment and final polish
  - [x] 5.1 Install `wrangler` as a dev dependency (`pnpm add -D wrangler`)
  - [x] 5.2 Create `landing/wrangler.toml` configured for Cloudflare Pages: project name `rioagora`, set `compatibility_date` to current date
  - [x] 5.3 Add a `"deploy"` script to `package.json`: `"next build && wrangler pages deploy out"`. Verify `pnpm run deploy` works end-to-end with the currently logged-in Cloudflare account
  - [x] 5.4 Write `landing/README.md` documenting: project overview, prerequisites (Node, pnpm), setup (`pnpm install`), development (`pnpm dev`), build (`pnpm build`), deploy (`pnpm run deploy`), how to switch Cloudflare accounts (`wrangler login`, `wrangler whoami`), content editing instructions (edit `site-content.json`)
  - [x] 5.5 Run `pnpm build` and verify the static export completes without errors — check that the `out/` directory contains the generated HTML and assets
  - [x] 5.6 Deploy to Cloudflare Pages via `pnpm run deploy` and verify the site loads correctly at the generated URL
