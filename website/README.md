# Sustainability Atlas Website

A modern website built with Next.js to showcase tools, methods, and resources for sustainable entrepreneurship and innovation.

## Features

- 🎨 **Modern Design**: Clean, minimal interface with light/dark theme support
- 🔍 **Search & Filter**: Find resources by title, description, or tags
- 📱 **Responsive**: Works beautifully on all devices
- ⚡ **Fast**: Static site generation for optimal performance
- 🔗 **Smart Links**: Automatic conversion of Obsidian wiki-links
- 📚 **Three Categories**:
  - Tools, Methods & Frameworks
  - Collections, Compendia & Kits
  - Practical Academic Articles & Scientific Reports

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Remark** - Markdown processing
- **Gray Matter** - Frontmatter parsing

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
website/
├── app/
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   ├── tools/         # Tools category pages
│   ├── collections/   # Collections category pages
│   ├── articles/      # Articles category pages
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Homepage
│   └── globals.css    # Global styles
├── public/            # Static assets
└── ...config files
```

## Content

The website reads markdown files from the parent directory:
- `1 – Tools, methods, frameworks, or guides/`
- `2 – Collections, Compendia, or Kits/`
- `3 – Practical academic articles and scientific reports/`

## Theme

The color scheme matches the original Obsidian Publish site:
- **Light mode**: White background (#ffffff) with dark text (#222222)
- **Dark mode**: Dark gray background (#1e1e1e) with light text (#dadada)

## License

ISC
