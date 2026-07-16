# savepong.github.io — Personal portfolio (Astro)

https://savepong.com

This repository is a personal portfolio and blog built with Astro. It includes a bento-grid homepage, an AI chat widget (Gemini), and a content-driven blog using Astro Content Collections.

Quick links
- Site config: [astro.config.mjs](astro.config.mjs)
- Main layout: [src/layouts/Layout.astro](src/layouts/Layout.astro)
- Blog content: [src/content/blog](src/content/blog)

## Features

- Bento-grid homepage with multiple sections (Hero, Projects, Experiences)
- Floating AI chat powered by Gemini (client-exposed key)
- Blog using Astro Content Collections (Markdown + frontmatter)
- Tailwind CSS for styling
- Static output configured in `astro.config.mjs` (site set to https://savepong.github.io)

## Tech stack

- Astro
- Tailwind CSS
- Chart.js (used in components)
- Font Awesome icons

## Project structure (high level)

```
/
├─ public/                    # Static files served as-is
├─ src/
│  ├─ components/             # Reusable UI components
│  ├─ content/                # Astro Content Collections (blog)
│  │  └─ blog/                 # Markdown posts and _template.md
  │  ├─ layouts/              # Page layouts (Layout.astro)
  │  └─ pages/                # Route pages (index.astro, blog pages)
├─ astro.config.mjs           # Astro configuration (site, integrations)
├─ tailwind.config.mjs        # Tailwind config
├─ package.json               # Scripts: dev, build, preview
└─ README.md
```

## Local development

Prerequisites: Node.js (16+ recommended) and npm.

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Content / Blog posts

Add a new post by copying the template:

```bash
cp src/content/blog/_template.md src/content/blog/your-post.md
```

Edit the frontmatter fields (`title`, `description`, `pubDate`, etc.). Posts are available under `/blog`.

Important: the content collection schema is defined in [src/content/config.ts](src/content/config.ts).

## Environment variables

- `PUBLIC_GEMINI_API_KEY` — used by the AI chat widget. Note: variables prefixed with `PUBLIC_` are exposed to client-side code. If you include an API key here, restrict it by domain and usage in the provider console.

## Deployment

This project is set up for static output. The easiest deployment is GitHub Pages (site URL is set in `astro.config.mjs`). Typical flow:

1. Push to the `master` branch (the repo is currently configured with `master` as default). 
2. Use GitHub Actions or Pages to build and deploy the `dist` output.

If you want a GitHub Actions workflow, I can add a minimal `build-and-deploy` Action for GitHub Pages.

## Notes from the review

- `package.json` includes standard scripts: `dev`, `build`, `preview`.
- The AI chat component uses `import.meta.env.PUBLIC_GEMINI_API_KEY` (see [src/components/AIChat.astro](src/components/AIChat.astro)). Exposed keys should be protected via provider restrictions.
- Blog content uses Astro Content Collections; add posts to `src/content/blog/` using the provided `_template.md`.

## Next steps I can help with

- Add a CI workflow for GitHub Pages deployment
- Add a `.env.example` file if you'd like a template for environment variables
- Add simple linting/format scripts (Prettier/ESLint)

## License

MIT
