# Pongsiri P. - Personal Portfolio & Blog

A modern personal portfolio website built with [Astro](https://astro.build), featuring a bento grid layout, AI chat integration, and blog functionality.

## 🚀 Features

- **Modern Design**: Beautiful bento grid layout with glass morphism effects
- **AI Chat**: Integrated Gemini AI assistant for interactive Q&A
- **Blog**: Content collection-based blog with Markdown support
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Static site generation for optimal performance
- **SEO-friendly**: Built-in meta tags and semantic HTML

## 🛠️ Tech Stack

- [Astro](https://astro.build) - Static Site Generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Chart.js](https://www.chartjs.org) - Data visualization
- [Font Awesome](https://fontawesome.com) - Icons
- [Gemini AI](https://ai.google.dev) - AI chat integration

## 📁 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Astro components
│   ├── content/         # Blog posts (Markdown)
│   │   └── blog/
│   ├── layouts/         # Page layouts
│   └── pages/           # Route pages
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── package.json
```

## 🔧 Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Gemini API key:
   ```
   PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_GEMINI_API_KEY` | Your Google Gemini API key for the AI chat feature |

> ⚠️ **Security Note**: The `PUBLIC_` prefix means this key is exposed to the client. Use rate limiting and domain restrictions in your Google Cloud Console to protect your API key.

## 📝 Adding Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A brief description"
pubDate: 2026-01-10
tags: ["tag1", "tag2"]
---

Your content here...
```

## 🚀 Deployment

This site is configured for GitHub Pages deployment. Push to the `master` branch to trigger automatic deployment.

To set up deployment:
1. Go to your repository Settings → Secrets and variables → Actions
2. Add a new secret: `PUBLIC_GEMINI_API_KEY` with your Gemini API key

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!
