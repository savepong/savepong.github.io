# Blog Contribution Guide

This guide provides comprehensive instructions for creating and managing blog posts on this website.

## Quick Start Guide

### 1. Create a New Post

The fastest way to start is by using the template:

```bash
# Copy the template
cp src/content/blog/_template.md src/content/blog/your-post-name.md

# Edit the file with your favorite editor
vim src/content/blog/your-post-name.md
```

### 2. Update Frontmatter

Edit the frontmatter at the top of your file with your post details:

```yaml
---
title: "Your Awesome Post Title"
description: "An engaging description that makes people want to read more"
pubDate: 2026-01-18
author: "Pongsiri P."
tags: ["technology", "leadership", "development"]
---
```

### 3. Write Your Content

Write your blog post using Markdown syntax. See the [Markdown Guide](#markdown-syntax-guide) below for formatting options.

### 4. Test Locally

Always test your post locally before pushing:

```bash
# Start the development server
npm run dev

# Visit http://localhost:4321/blog in your browser
```

### 5. Commit and Push

Once you're happy with your post:

```bash
# Stage your new file
git add src/content/blog/your-post-name.md

# Commit with a descriptive message
git commit -m "Add blog post: Your Awesome Post Title"

# Push to the master branch
git push origin master
```

### 6. Automatic Deployment

GitHub Actions will automatically:
- Build your site with the new post
- Deploy it to GitHub Pages
- Make it live at https://savepong.github.io/blog

The deployment usually takes 2-5 minutes.

## Frontmatter Reference

### Required Fields

| Field | Type | Format | Example |
|-------|------|--------|---------|
| `title` | string | Plain text | `"Building Scalable Systems"` |
| `description` | string | 1-2 sentences | `"Key insights for designing scalable architectures"` |
| `pubDate` | date | YYYY-MM-DD | `2026-01-18` |

### Optional Fields

| Field | Type | Default | Example |
|-------|------|---------|---------|
| `author` | string | `"Pongsiri P."` | `"Pongsiri P."` |
| `updatedDate` | date | none | `2026-01-20` |
| `heroImage` | string | none | `"/assets/img/blog/hero.jpg"` |
| `tags` | array | none | `["ai", "development"]` |

### Field Guidelines

#### Title
- Keep it concise but descriptive (40-60 characters ideal)
- Use title case
- Make it engaging and searchable
- Examples:
  - ✅ "Building Scalable Systems: Lessons from the Field"
  - ❌ "some thoughts on scaling" (too casual, poor SEO)

#### Description
- 1-2 sentences that summarize the post
- 120-160 characters ideal for SEO
- Should entice readers to click
- Examples:
  - ✅ "Key insights and best practices for designing and implementing scalable software architectures that can grow with your business."
  - ❌ "This post talks about scalability." (too vague)

#### Dates
- Use YYYY-MM-DD format (ISO 8601)
- Posts are sorted by `pubDate` in descending order
- `updatedDate` only shows if different from `pubDate`

#### Tags
- Use 2-5 tags per post
- Use lowercase, hyphen-separated words
- Be consistent with existing tags
- Examples: `["ai", "machine-learning", "best-practices"]`

## Markdown Syntax Guide

### Headers

```markdown
# H1 - Main Title (use once at the top)
## H2 - Section Headers
### H3 - Subsection Headers
#### H4 - Sub-subsection Headers
```

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for subtle emphasis
`Inline code` for technical terms, file names, commands
~~Strikethrough~~
```

### Lists

```markdown
Unordered list:
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

Ordered list:
1. First step
2. Second step
3. Third step
```

### Links and Images

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover title")

![Alt text](/path/to/image.jpg)
![Alt text with title](/path/to/image.jpg "Image title")
```

### Code Blocks

Use triple backticks with language identifier:

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

```bash
npm install
npm run dev
```
````

Supported languages: javascript, typescript, python, java, go, rust, bash, yaml, json, html, css, markdown, and many more.

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.

> **Tip**: Use blockquotes for important notes, tips, or quotes.
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Horizontal Rules

```markdown
---
or
***
```

## Styling and Best Practices

### Writing Style

1. **Be Clear and Concise**: Get to the point quickly
2. **Use Active Voice**: "We implemented" vs "It was implemented"
3. **Break Up Text**: Use headers, lists, and images to improve readability
4. **Add Value**: Share unique insights, experiences, or perspectives
5. **Be Authentic**: Write in your natural voice

### Content Structure

A well-structured blog post typically includes:

1. **Introduction** (1-2 paragraphs)
   - Hook the reader
   - Explain what they'll learn
   - Set expectations

2. **Main Content** (multiple sections)
   - Use clear section headers
   - Include examples and code where relevant
   - Add visuals if they enhance understanding

3. **Conclusion**
   - Summarize key takeaways
   - Provide next steps or call to action
   - Link to related resources

### Code Examples

- Keep examples concise and focused
- Use real-world scenarios
- Add comments to explain complex parts
- Test your code examples to ensure they work

### Images

- Use descriptive alt text for accessibility
- Optimize images (compress before uploading)
- Recommended size: max 1200px width
- Supported formats: JPG, PNG, WebP

## File Naming Conventions

### Post Filenames

Use lowercase with hyphens:

```
✅ building-scalable-systems.md
✅ future-of-ai-in-development.md
✅ 2026-01-18-getting-started.md (date prefix optional)

❌ Building Scalable Systems.md (spaces)
❌ building_scalable_systems.md (underscores)
❌ BuildingScalableSystems.md (camel case)
```

### Image Filenames

Store images in `/public/assets/img/blog/`:

```
✅ /public/assets/img/blog/scalable-systems-diagram.png
✅ /public/assets/img/blog/2026-01-18-hero-image.jpg
```

Then reference in Markdown:
```markdown
![Diagram](/assets/img/blog/scalable-systems-diagram.png)
```

## Testing and Quality Assurance

### Before Publishing

- [ ] Test post locally with `npm run dev`
- [ ] Check all links work
- [ ] Verify images load correctly
- [ ] Review spelling and grammar
- [ ] Ensure code examples are correct
- [ ] Test on mobile view
- [ ] Verify frontmatter is complete

### After Publishing

- [ ] Verify post appears in blog listing
- [ ] Check post page renders correctly
- [ ] Test social media sharing (if applicable)
- [ ] Verify tags display correctly

## Updating Existing Posts

To update a post:

1. Edit the markdown file
2. Update the `updatedDate` field in frontmatter:
   ```yaml
   updatedDate: 2026-01-20
   ```
3. Commit and push changes
4. The post will show "Updated on [date]" in the UI

## Troubleshooting

### Post Not Showing Up

1. Check filename doesn't start with `_` (reserved for templates)
2. Verify frontmatter is valid YAML
3. Ensure `pubDate` is not in the future
4. Check for build errors: `npm run build`

### Build Errors

Common issues:

```bash
# Invalid frontmatter - check YAML syntax
# Missing required fields - add title, description, pubDate
# Invalid date format - use YYYY-MM-DD

# View detailed errors:
npm run build
```

### Images Not Loading

1. Verify image path is correct
2. Ensure images are in `/public/` directory
3. Use absolute paths starting with `/`
4. Check file exists and is committed to git

## Examples

### Minimal Post

```markdown
---
title: "Quick Tip: Using Git Aliases"
description: "Save time with these useful Git command shortcuts"
pubDate: 2026-01-18
tags: ["git", "productivity"]
---

# Quick Tip: Using Git Aliases

Here are my favorite Git aliases that save me time every day:

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
```

Try them out and customize to your workflow!
```

### Full-Featured Post

See `src/content/blog/building-scalable-systems.md` for a comprehensive example with:
- Multiple sections
- Code examples in different languages
- Lists and formatting
- Links and references
- Best practices section

## Additional Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review example posts in `src/content/blog/`
3. Test locally with `npm run dev` to see detailed errors
4. Check the GitHub Actions logs for deployment issues

Happy blogging! 🚀
