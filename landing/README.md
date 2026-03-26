# RioAgora.org — Landing Page

Static landing page for [RioAgora.org](https://rioagora.org), a nonpartisan initiative promoting public debates on essential topics for the State of Rio de Janeiro ahead of the 2026 elections.

## Tech Stack

- **Next.js 16** — static export (`output: 'export'`)
- **Tailwind CSS v4** — utility-first styling
- **Motion** — scroll-triggered animations and transitions
- **Lenis** — smooth scroll
- **Cloudflare Pages** — hosting and deployment

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) package manager

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Starts the dev server at [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Produces a static export in the `out/` directory.

## Deploy

```bash
pnpm run pages
```

Builds the site and deploys to Cloudflare Pages in a single command. On first run, Wrangler will prompt you to create the project if it doesn't exist yet.

### Cloudflare account (Rio Agora)

Deploy targets the **Rio Agora** Cloudflare account. Copy `.env.example` to `.env` (already gitignored); it sets `CLOUDFLARE_ACCOUNT_ID`. You must be logged in with the user that owns that account (`pnpm exec wrangler login`).

```bash
# Log in (opens browser for OAuth)
pnpm exec wrangler login

# Verify which account is active (must show the Rio Agora account)
pnpm exec wrangler whoami
```

If `pnpm exec wrangler whoami` shows a different account, run `pnpm exec wrangler login` and choose the Cloudflare account that owns the Rio Agora Pages project.

## Content Editing

All landing page copy lives in a single file:

```
src/content/site-content.json
```

The JSON is organized into sections:

| Key | Description |
|---|---|
| `meta` | Page title, description, OG image, canonical URL |
| `hero` | Tagline, title overlay, slideshow image paths |
| `about` | "O que somos" — section title and rich-text HTML content |
| `team` | "Quem Somos" — section title, member cards (name, bio HTML, image), footer text |
| `agenda` | "Agenda" — events array with date, time, location, participants, mediator |
| `footer` | Copyright text and tagline |

Rich-text fields (`about.content`, `team.members[].bio`, `team.footer`) use HTML strings with `<p>`, `<strong>`, `<em>`, and `<a>` tags. Edit them directly in the JSON.

After editing content, rebuild and deploy:

```bash
pnpm run pages
```

## Project Structure

```
landing/
├── public/
│   └── images/
│       ├── brand/        # Logo variants (RGB, negative, mono, seals)
│       ├── hero/         # Slideshow background images
│       ├── people/       # Team member photos
│       └── agenda/       # Event venue images
├── src/
│   ├── app/
│   │   ├── layout.jsx    # Root layout (fonts, metadata, JSON-LD, Lenis)
│   │   ├── page.jsx      # Main page composing all sections
│   │   └── globals.css   # Base styles, Tailwind imports, brand colors
│   ├── components/
│   │   ├── AnimatedText.jsx   # Split-text reveal animation
│   │   ├── Typography.jsx     # SectionTitle, SectionText, CardName, RichText
│   │   ├── Hero.jsx           # Fullscreen hero with slideshow
│   │   ├── About.jsx          # "O que somos" section
│   │   ├── Team.jsx           # "Quem Somos" with stacking cards
│   │   ├── Agenda.jsx         # Events listing
│   │   ├── EventCard.jsx      # Individual event card
│   │   └── Footer.jsx         # Footer with copyright
│   ├── content/
│   │   └── site-content.json  # All page copy and data
│   ├── providers/
│   │   └── LenisProvider.jsx  # Smooth scroll provider
│   └── typography/
│       ├── index.js           # Font declarations (Intro family)
│       └── fonts/             # .woff2 font files
├── next.config.mjs
├── wrangler.toml
└── package.json
```

