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

The blog feature allows you to create posts by simply adding Markdown files. The site automatically builds and deploys when you push changes to the `master` branch.

### Quick Start

1. **Create a new Markdown file** in `src/content/blog/`:
   ```bash
   # Use the template as a starting point
   cp src/content/blog/_template.md src/content/blog/my-new-post.md
   ```

2. **Edit the frontmatter** with your post details:
   ```yaml
   ---
   title: "Your Post Title"
   description: "A brief description of your post (1-2 sentences)"
   pubDate: 2026-01-18
   updatedDate: 2026-01-18  # Optional: for updated posts
   author: "Pongsiri P."     # Optional: defaults to "Pongsiri P."
   heroImage: "/assets/img/blog/post-image.jpg"  # Optional
   tags: ["tag1", "tag2"]    # Optional: for categorization
   ---
   ```

3. **Write your content** using Markdown:
   ```markdown
   # Your Post Title
   
   Introduction paragraph...
   
   ## Section 1
   
   Your content here with **bold**, *italic*, and `code`.
   
   ```javascript
   // Code blocks with syntax highlighting
   const greeting = "Hello, World!";
   ```
   
   ## Section 2
   
   More content...
   ```

4. **Commit and push**:
   ```bash
   git add src/content/blog/my-new-post.md
   git commit -m "Add new blog post: Your Post Title"
   git push origin master
   ```

5. **Automatic deployment**: GitHub Actions will automatically build and deploy your site to GitHub Pages.

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ Yes | The title of your blog post |
| `description` | string | ✅ Yes | A brief summary (shown in listings and meta tags) |
| `pubDate` | date | ✅ Yes | Publication date in YYYY-MM-DD format |
| `updatedDate` | date | ❌ No | Last updated date (shows if different from pubDate) |
| `author` | string | ❌ No | Author name (defaults to "Pongsiri P.") |
| `heroImage` | string | ❌ No | Path to header image for the post |
| `tags` | array | ❌ No | List of tags for categorization |

### Markdown Features

Your blog posts support full Markdown syntax with enhanced features:

- **Headings**: Use `#` for h1, `##` for h2, etc.
- **Emphasis**: `*italic*` or `**bold**`
- **Code**: Inline `code` or fenced code blocks with syntax highlighting
- **Lists**: Ordered and unordered lists
- **Links**: `[text](url)`
- **Images**: `![alt text](image-url)`
- **Blockquotes**: `> Quote text`

### Example Code Blocks

````markdown
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

```python
def greet(name):
    return f"Hello, {name}!"
```
````

### Best Practices

1. **Filename convention**: Use lowercase with hyphens (e.g., `my-awesome-post.md`)
2. **Descriptive titles**: Clear, engaging titles that describe the content
3. **Good descriptions**: Write compelling 1-2 sentence summaries for listings
4. **Relevant tags**: Use 2-5 tags that accurately categorize your content
5. **Images**: Optimize images before adding them to keep page load fast
6. **Dates**: Use YYYY-MM-DD format for dates (e.g., 2026-01-18)
7. **Proofread**: Check your content locally with `npm run dev` before pushing

### Testing Locally

Before pushing, test your blog post locally:

```bash
npm run dev
```

Then visit http://localhost:4321/blog to see your post in the listing and click through to read it.

### Examples

Check out these example posts in the repository:
- `src/content/blog/welcome.md` - A simple welcome post
- `src/content/blog/building-scalable-systems.md` - Technical deep-dive with code examples
- `src/content/blog/future-of-ai-in-development.md` - Opinion piece with multiple sections

## 🚀 Deployment

This site is configured for GitHub Pages deployment. Push to the `master` branch to trigger automatic deployment.

To set up deployment:
1. Go to your repository Settings → Secrets and variables → Actions
2. Add a new secret: `PUBLIC_GEMINI_API_KEY` with your Gemini API key

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!
