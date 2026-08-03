# Ruige Kong, Academic Website

A static academic portfolio built with Astro. The site presents research, publications, selected experience, and biographical information for Ruige Kong.

## Local development

```bash
npm install
npm run dev
```

The local site is available at `http://localhost:4321`.

## Verification

```bash
npm run build
npm run preview -- --host 127.0.0.1
npm run test:site
```

`npm run build` performs strict Astro and TypeScript checks before generating the static site. `npm run test:site` expects the preview server on port 4321 and audits all primary routes at mobile and desktop sizes for HTTP failures, broken images, horizontal overflow, serious accessibility violations, mobile-menu behavior, and internal-link failures.

The browser audit uses the installed Google Chrome by default. Override it when needed:

```bash
CHROME_PATH=/path/to/chrome npm run test:site
```

## Deployment

The default canonical URL is `https://kongruige.github.io`. Set the production URL at build time when a custom domain is chosen:

```bash
PUBLIC_SITE_URL=https://example.com npm run build
```

The generated deployment is in `dist/`. It can be served by GitHub Pages, Cloudflare Pages, Netlify, or Vercel without a server runtime.

## Updating content

- Shared profile links: `src/data/site.ts`
- Homepage: `src/pages/index.astro`
- Research: `src/pages/research.astro`
- Publications: `src/pages/publications.astro`
- Experience: `src/pages/experience.astro`
- About: `src/pages/about.astro`
- Visual system: `src/styles/global.css`
- Public images and CV: `public/`

The FISICA project is intentionally represented only by a generic confidentiality statement. Do not add repository links, collaborators, technical methods, datasets, results, or figures without explicit clearance.
