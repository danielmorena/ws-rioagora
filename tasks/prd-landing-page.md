# PRD: Landing Page — rioagora.org

## Introduction

Landing page for **rioagora.org**, a non-partisan, non-profit, time-limited initiative that promotes public debates on essential topics for the State of Rio de Janeiro. The landing page serves two goals: (1) establish the brand's online presence and institutional identity, and (2) promote the first public debate on Education (Feb 23, 2026) at Palacio Capanema.

The site is a Next.js static export deployed to Cloudflare Pages, with heavy emphasis on animation (motion/react + motion-plus), custom typography (Intro font family), and a content-driven architecture where all copy lives in a structured JSON file rendered via `dangerouslySetInnerHTML` for rich text support.

---

## Goals

- Launch the rioagora.org brand with a polished, animated landing page
- Promote the first debate event (Educacao, Feb 23, 2026) with clear details
- Present the team (4 people) and mission with institutional credibility
- Achieve perfect SEO with static HTML output, JSON-LD, meta tags, and GA placeholder
- Separate content from code via a build-time JSON file with HTML rich text
- Deploy to Cloudflare Pages via Wrangler in a single command

---

## Content Architecture

All landing page copy is extracted from `project/content/rio-agora-content.md` into a single JSON file at `@/content/site-content.json`. This file is imported at build time (static import in Next.js).

### JSON Structure

```json
{
  "meta": {
    "title": "RioAgora.org — Um Rio de futuros",
    "description": "...",
    "ogImage": "/og-image.png",
    "url": "https://rioagora.org"
  },
  "hero": {
    "tagline": "Um Rio de futuros",
    "title": "Construindo o futuro do Rio de Janeiro através do diálogo e da ação coletiva",
    "slides": [
      { "src": "/images/hero/slide-01.jpg", "alt": "..." },
      ...
    ]
  },
  "about": {
    "title": "O que somos",
    "content": "<p>Em um ano marcado por eleições, <strong>RioAgora.org</strong> é uma iniciativa apartidária...</p>..."
  },
  "team": {
    "title": "Quem Somos",
    "members": [
      {
        "name": "Guilherme Cezar Coelho",
        "bio": "<p>Formado em economia pela Universidade Stanford, é fundador da <strong>República.org</strong>...</p>",
        "image": "/images/people/people-placeholder.png"
      },
      ...
    ],
    "footer": "<p><strong>RioAgora.org</strong> é uma ação da República.org...</p>"
  },
  "agenda": {
    "title": "Agenda",
    "events": [
      {
        "label": "Debate 1: Educação",
        "date": "2026-02-23",
        "dateDisplay": "23 de fevereiro",
        "time": "16h",
        "location": "Auditório do Palácio Capanema – Rua da Imprensa 16, Centro, Rio de Janeiro",
        "image": "/images/agenda/capanema.jpg",
        "participants": [
          { "name": "Anna Backheuser", "org": "Instituto João e Maria Backheuser" },
          { "name": "Antoine Lousao", "org": "Secretaria Municipal de Educação do Rio de Janeiro" },
          { "name": "Julia Sant'Anna", "org": "Centro de Inovação para a Educação Brasileira (CIEB)" },
          { "name": "Ricardo Henriques", "org": "Instituto Unibanco" }
        ],
        "mediator": { "name": "Eloy H.S. Oliveira", "role": "diretor executivo RioAgora.org" }
      }
    ]
  },
  "footer": {
    "copyright": "© 2026 RioAgora.org. Todos os direitos reservados.",
    "tagline": "Uma ação da República.org, financiada por AFloresta.org"
  }
}
```

### Rich Text Strategy

- Content fields like `about.content`, `team.members[].bio`, and `team.footer` contain HTML strings with `<strong>`, `<em>`, `<a>`, `<p>` tags
- Rendered via `dangerouslySetInnerHTML` — safe because content is static build-time data, never user-generated
- No sanitization library needed

---

## Brand Identity

### Colors (from brand guide)

| Name    | HEX       | Usage                              |
|---------|-----------|------------------------------------|
| Verde   | `#2B553C` | Primary / backgrounds / headings   |
| Laranja | `#F37052` | Accents / CTAs / highlights        |
| Azul    | `#13BECF` | Secondary accents / links          |

### Typography

- **Primary font:** Intro (Regular, Italic, Bold, Bold Italic) — woff2 files from `project/visualidade/type/Intro-FontFamily/`
- Font files copied to `@/typography/fonts/`
- Font index at `@/typography/index.js` for clean imports
- Remove default Geist font from Next.js
- Fallback: Arial, sans-serif (as per brand guide for digital)

### Logo Assets (from `project/visualidade/marca/`)

- `RioAgora_RGB.png` — primary color logo
- `RioAgora_CorNegativa_RGB.png` — negative/white version
- `RioAgora_MonoPositiva.png` / `RioAgora_MonoNegativa.png` — mono variants
- Balloon seals: `RioAgora_BalaoVerde_RGB.png`, `RioAgora_BalaoLaranja_RGB.png`, `RioAgora_BalaoAzul_RGB.png`

---

## User Stories

### US-001: Project Scaffolding

**Description:** As a developer, I need the Next.js project bootstrapped with all dependencies so that I can start building sections.

**Acceptance Criteria:**
- [ ] Next.js project created in `landing/` folder with static export config (`output: 'export'`)
- [ ] pnpm as package manager
- [ ] Tailwind CSS v4 installed and configured
- [ ] `motion` and `motion-plus` installed
- [ ] `lenis` installed for smooth scrolling
- [ ] Geist font removed, Intro font family set up in `@/typography/fonts/` with index at `@/typography/index.js` (Regular, Italic, Bold, Bold Italic only)
- [ ] `globals.css` includes the required base styles (responsive text sizing, scrollbar-hidden, size-screen, debug border)
- [ ] Absolute imports configured via `jsconfig.json` with `@/` prefix
- [ ] Project runs with `pnpm dev` without errors

### US-002: Content JSON and Rich Text Rendering

**Description:** As a developer, I need all landing page content in a structured JSON file so that content is separated from code and easy to update.

**Acceptance Criteria:**
- [ ] `@/content/site-content.json` created with all sections (meta, hero, about, team, agenda, footer)
- [ ] All text from `project/content/rio-agora-content.md` extracted accurately
- [ ] Rich text fields contain proper HTML (`<strong>`, `<em>`, `<a>` with `target="_blank"`)
- [ ] Content imported as static JSON in page components
- [ ] `RichText` from `@/components/Typography.jsx` renders HTML via `dangerouslySetInnerHTML`
- [ ] No sanitization library required (static content only)
- [ ] Typecheck/lint passes

### US-003: SEO, Meta Tags, and JSON-LD

**Description:** As the project owner, I want complete SEO so the site ranks and previews correctly on search engines and social media.

**Acceptance Criteria:**
- [ ] `layout.jsx` exports metadata with title, description, Open Graph tags, Twitter card
- [ ] JSON-LD structured data (`Organization` type) embedded in layout
- [ ] `<html lang="pt-BR">` set
- [ ] Google Analytics placeholder script included (commented out, with `GA_MEASUREMENT_ID` placeholder)
- [ ] Favicon configured (use brand logo or placeholder)
- [ ] Typecheck/lint passes

### US-004: Lenis Smooth Scroll

**Description:** As a user, I want smooth scrolling across the page for a polished browsing experience.

**Acceptance Criteria:**
- [ ] Lenis smooth scroll initialized in layout or a client provider
- [ ] Smooth scroll works across all sections
- [ ] Brand logo in hero scrolls to top when clicked
- [ ] No scroll jank or conflicts with section animations
- [ ] Typecheck/lint passes

### US-005: AnimatedText Component

**Description:** As a developer, I need a reusable animated text component based on motion/motion-plus `splitText` for use across sections.

**Acceptance Criteria:**
- [ ] `AnimatedText` component at `@/components/AnimatedText.jsx` using `motion` `animate` + `stagger` and `motion-plus` `splitText`
- [ ] Supports modes via prop: `"line"` (line by line), `"word"` (word by word), `"letter"` (letter by letter)
- [ ] Uses `{children}` — wraps any text element
- [ ] Masked reveal animation (clip/overflow hidden on each line, text slides up into view)
- [ ] `once` prop: animate only on first viewport entry (IntersectionObserver)
- [ ] Waits for `document.fonts.ready` before measuring/splitting
- [ ] Hidden until fonts loaded, then visible + animated
- [ ] `.split-word` / `.split-line` / `.split-char` classes get `will-change: transform, opacity`
- [ ] Typecheck/lint passes

### US-006: Typography Composition Components

**Description:** As a developer, I need pre-composed typography components that wrap `AnimatedText` to reduce repetitive class names across sections.

**Acceptance Criteria:**
- [ ] `@/components/Typography.jsx` exports: `SectionTitle`, `SectionText`, `CardName`, `CardText`, `RichText`
- [ ] `SectionTitle` — large heading with `AnimatedText` mode="letter", once, appropriate Tailwind classes
- [ ] `SectionText` — body text block with `AnimatedText` mode="line", once
- [ ] `CardName` — h3-level heading with `AnimatedText` mode="word", once
- [ ] `CardText` — paragraph text, no animation (static)
- [ ] `RichText` — renders HTML strings via `dangerouslySetInnerHTML`, accepts `className` prop for styling, wraps in a `<div>`
- [ ] All use Tailwind classes only (no inline styles, no additions to globals.css)
- [ ] Typecheck/lint passes

### US-007: Hero Section

**Description:** As a visitor, I want to see an impactful hero with a fullscreen slideshow, the brand logo, and the initiative's headline.

**Acceptance Criteria:**
- [ ] `<Hero>` component renders as `<section>` with `size-screen` (fullscreen)
- [ ] Contains `<header>` wrapping the slideshow, brand mark, and title
- [ ] **Slideshow:** 4 slides from hero images, auto-advancing every 5 seconds, motion-plus animated transitions, fullscreen background images (cover)
- [ ] Hero images copied from `project/fotos/hero/` to `public/images/hero/`, resized so the smaller dimension is max 1920px (landscape) or 910px (portrait)
- [ ] **Brand mark (marca):** 200x200px placeholder in bottom-right corner, contains `<h1>` with two `<span>`s — one for screen readers ("rioagora para leitores de texto"), one as clickable image that scrolls to page top
- [ ] Uses `RioAgora_CorNegativa_RGB.png` as the logo (white on dark image)
- [ ] **Hero title:** "Construindo o futuro do Rio de Janeiro através do diálogo e da ação coletiva" — positioned over slideshow with readable contrast
- [ ] Responsive: works on mobile (375px) and desktop (1920px)
- [ ] Typecheck/lint passes

### US-008: "O Que Somos" Section

**Description:** As a visitor, I want to understand what RioAgora.org is and what it does.

**Acceptance Criteria:**
- [ ] `<About>` component renders as `<section>` with `size-screen`
- [ ] Title "O que somos" uses `SectionTitle` (letter-by-letter masked animation, once)
- [ ] Content block uses `SectionText` (line-by-line masked animation, once)
- [ ] Content pulled from `site-content.json` `about` section, rendered via `RichText` (dangerouslySetInnerHTML)
- [ ] Three paragraphs of content displayed with proper spacing
- [ ] Responsive layout
- [ ] Typecheck/lint passes

### US-009: "Quem Somos" Section with Stacking Cards

**Description:** As a visitor, I want to see who is behind RioAgora.org via scrolling cards that stack on top of each other.

**Acceptance Criteria:**
- [ ] `<Team>` component renders as `<section>` with `size-screen`
- [ ] Title "Quem Somos" is sticky during scroll
- [ ] 4 cards (Guilherme, Eloy, Isabel, Julia) that stack/overlap as user scrolls (scroll-driven stacking effect)
- [ ] Each card has rounded corners except bottom-right (which is square: `rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none` or equivalent)
- [ ] Each `<Card>` contains: `<figure>` with `<img>` (people-placeholder.png), `<figcaption>` with `<h3>` (name via `CardName`) and `<p>` (bio via `RichText`)
- [ ] Data from `site-content.json` `team.members` array
- [ ] Team footer text (Republica.org / AFloresta.org attribution) rendered below cards via `RichText`
- [ ] Responsive layout
- [ ] Typecheck/lint passes

### US-010: "Agenda" Section with Event Card

**Description:** As a visitor, I want to see upcoming debate events with full details so I can attend.

**Acceptance Criteria:**
- [ ] `<Agenda>` component renders as `<section>` with `size-screen`
- [ ] Title "Agenda" uses `SectionTitle`
- [ ] `<EventCard>` component for each event
- [ ] Event card has a background `<figure>` with image of Palacio Capanema (placeholder for now)
- [ ] Info block overlaid on image with: date (using `<time datetime="2026-02-23">`), time "16h", location, participants list, mediator
- [ ] Data from `site-content.json` `agenda.events[0]`
- [ ] Readable contrast (dark overlay or gradient on image)
- [ ] Responsive layout
- [ ] Typecheck/lint passes

### US-011: Footer

**Description:** As a visitor, I want to see a footer with copyright and date.

**Acceptance Criteria:**
- [ ] `<Footer>` component renders as `<footer>`
- [ ] Displays copyright text and tagline from `site-content.json`
- [ ] Current year displayed dynamically
- [ ] Clean, minimal design consistent with brand colors
- [ ] Typecheck/lint passes

### US-012: Image Processing Pipeline

**Description:** As a developer, I need hero images resized and optimized before being added to the project.

**Acceptance Criteria:**
- [ ] Hero images from `project/fotos/hero/` resized: max 1920px on smaller dimension (landscape) or 910px (portrait)
- [ ] Output to `landing/public/images/hero/` with clean filenames (slide-01.jpg through slide-04.jpg for the 4 chosen slides)
- [ ] People placeholder copied to `landing/public/images/people/people-placeholder.png`
- [ ] Brand logos copied to `landing/public/images/brand/`
- [ ] Image quality maintained (JPEG quality >= 85)

### US-013: Cloudflare Pages Deployment

**Description:** As the project owner, I want to deploy the static site to Cloudflare Pages with a single command using my already-authenticated Wrangler CLI.

**Acceptance Criteria:**
- [ ] `wrangler` installed as dev dependency
- [ ] `wrangler.toml` configured for Pages project (name: `rioagora`, compatibility_date set)
- [ ] `pnpm run deploy` script in `package.json` that runs `next build && wrangler pages deploy out`
- [ ] Uses the currently logged-in Cloudflare account (no new account creation needed — `wrangler whoami` already works)
- [ ] README documents how to deploy and how to switch accounts in the future if needed
- [ ] Successful deploy to Cloudflare Pages

### US-014: Page Assembly and Layout

**Description:** As a developer, I need the main page to compose all sections in order and the layout to wrap everything properly.

**Acceptance Criteria:**
- [ ] `layout.jsx` wraps children with Lenis provider, font classes, metadata
- [ ] `page.jsx` renders sections in order: `<Hero>`, `<About>`, `<Team>`, `<Agenda>`, `<Footer>`
- [ ] Each section is a separate component imported from `@/components/`
- [ ] Page renders without errors
- [ ] All sections visible and scrollable with smooth scroll
- [ ] Typecheck/lint passes

---

## Functional Requirements

- **FR-01:** Project uses Next.js with `output: 'export'` for static HTML generation
- **FR-02:** All content is stored in `@/content/site-content.json` and imported at build time
- **FR-03:** Rich text fields in JSON use HTML strings rendered via `dangerouslySetInnerHTML`
- **FR-04:** Typography uses Intro font family (Regular, Italic, Bold, Bold Italic) loaded via `@/typography/`
- **FR-05:** Lenis smooth scroll is active across the entire page
- **FR-06:** `AnimatedText` component supports line, word, and letter split modes with masked reveal
- **FR-07:** Hero slideshow auto-advances every 5 seconds with motion transitions
- **FR-08:** Brand logo in hero is clickable and scrolls to page top
- **FR-09:** "Quem Somos" cards stack on scroll with sticky title
- **FR-10:** Event card displays date via semantic `<time>` element
- **FR-11:** SEO: proper meta tags, JSON-LD, `lang="pt-BR"`, OG tags
- **FR-12:** Google Analytics placeholder included (not active)
- **FR-13:** Static export deploys to Cloudflare Pages via `wrangler pages deploy`
- **FR-14:** Responsive design: mobile-first (375px base) scaling to desktop (1920px base)
- **FR-15:** All images optimized and served from `public/images/`

---

## Non-Goals (Out of Scope)

- No CMS or admin panel — content is a static JSON file edited by hand
- No ouvidoria digital (public input system) — that is a separate future product
- No multi-language support
- No authentication or user accounts
- No Instagram post generation or social media tooling
- No backend or API — purely static
- No event registration or RSVP system
- No analytics beyond GA placeholder
- No dark mode
- No multi-event pagination — single event card for now
- No CI/CD pipeline — manual deploy via `pnpm run deploy`

---

## Design Considerations

### Layout

- All main sections are fullscreen (`size-screen` = `w-screen h-dvh md:h-screen`)
- Vertical scroll through sections with Lenis smooth scroll
- Mobile: 375px base, Desktop: 1920px base (as per globals.css responsive rem sizing)

### Animation Strategy

- `motion` (`animate`, `stagger`) + `motion-plus` (`splitText`) for text animations
- `motion` for slideshow transitions
- Scroll-driven stacking for team cards (CSS scroll-driven or motion scroll triggers)
- All animations triggered once on viewport entry (IntersectionObserver)
- Fonts must load before split-text measurements

### Visual Identity

- Background: dark tones (Verde `#2B553C` as primary dark)
- Accent: Laranja `#F37052` for highlights
- Secondary: Azul `#13BECF` for links/details
- Text: white on dark backgrounds
- Cards: rounded corners with bottom-right square corner as brand signature

---

## Technical Considerations

### Dependencies

| Package        | Purpose                          |
|----------------|----------------------------------|
| next           | Framework (latest, static export)|
| tailwindcss    | Styling (v4)                     |
| motion         | Animations                       |
| motion-plus    | splitText, advanced animations   |
| lenis          | Smooth scroll                    |
| wrangler       | Cloudflare Pages deployment      |

### File Structure

```
landing/
├── public/
│   ├── images/
│   │   ├── hero/          (slide-01.jpg ... slide-04.jpg)
│   │   ├── people/        (people-placeholder.png)
│   │   ├── brand/         (logos, seals)
│   │   └── agenda/        (capanema placeholder)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   └── globals.css
│   ├── components/
│   │   ├── AnimatedText.jsx
│   │   ├── Typography.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Team.jsx
│   │   ├── Agenda.jsx
│   │   ├── EventCard.jsx
│   │   └── Footer.jsx
│   ├── content/
│   │   └── site-content.json
│   ├── typography/
│   │   ├── fonts/
│   │   │   ├── Intro-Regular.woff2
│   │   │   ├── Intro-Italic.woff2 (RegularItalic)
│   │   │   ├── Intro-Bold.woff2
│   │   │   └── Intro-BoldItalic.woff2
│   │   └── index.js
│   └── providers/
│       └── LenisProvider.jsx
├── wrangler.toml
├── jsconfig.json
├── next.config.mjs
├── package.json
├── tailwind.config.js  (if needed by v4)
└── README.md
```

### Constraints

- No TypeScript (user rule)
- No `framer-motion` (deprecated — use `motion` from `motion/react`)
- No emojis in code
- pnpm only
- useState convention: `const [state, $state] = useState()`
- useRef convention: `const $name = useRef()`
- Absolute imports: `@/path/Component`

---

## Success Metrics

- Landing page loads fully in under 2 seconds on a 4G connection
- Lighthouse SEO score >= 95
- All animations run at 60fps on modern browsers
- Single-command deploy to Cloudflare Pages works end-to-end
- Content updates require editing only `site-content.json` — no code changes

---

## Open Questions

- Which 4 of the 7 hero images should be used for the slideshow? (Or should all 7 be included and 4 selected in the JSON?)
- Is there a Palacio Capanema image available for the event card, or should we use a placeholder?
- Should the "Temas" list (Educacao, Saude, Meio ambiente, etc.) appear anywhere on the landing page, or is that for a future version?
- Should the balloon seals (BalaoVerde, BalaoLaranja, BalaoAzul) be used anywhere on the landing page?
- What is the Google Analytics measurement ID (when ready)?
