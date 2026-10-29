# Repository guide

## Purpose and structure

Ruige Kong's academic portfolio: a static Astro site presenting scientific machine learning, physical dynamics, flow control, publications, experience, and background. Preserve the restrained academic style: cream backgrounds, green accents, serif headings, compact records, and responsive layouts.

- `src/pages/index.astro`: primary overview, with publication, research, experience, and background anchors.
- `src/pages/research.astro`: detailed projects and research figures. Preserve existing fragment IDs.
- `src/pages/publications.astro`: publication and manuscript records, plus published wildfire BibTeX.
- `src/pages/about.astro`, `experience.astro`: biography and full experience.
- `src/data/site.ts`: shared profile links, navigation, and interests.
- `src/data/research.ts`: current paper titles, summaries, and separate journal/workshop statuses, shared across pages.
- `src/layouts/BaseLayout.astro`: metadata, canonical URLs, Person structured data, header/footer, global styles.
- `src/components/`: reusable Astro components; mobile navigation lives in `Header.astro`.
- `src/styles/global.css`: shared visual system and responsive rules. Reuse existing classes for content edits.
- `public/`: deployed images, favicon, and CV at `/files/Ruige_Kong_CV.pdf`.
- `papers/`: reference manuscripts, not public download assets. `photos/` and the root CV are local source material.

## Research content and factual accuracy

As of the owner's September 30, 2026 update:

- `papers/mbrl research.pdf`: **Audited Surrogate Gradients for Efficient Model-Based Flow Control**; preparing a submission to Transactions on Machine Learning Research (TMLR).
- `papers/inference hypothesis research.pdf`: **When Does Memory Substitute for Space in Forecasting Partially Observed Fields?**; preparing a submission to TMLR.
- `papers/mbrl workshop.pdf`: **Audited Surrogate Gradients for Efficient Model-Based Flow Control**; accepted to the Sim2Science workshop at NeurIPS 2026, per the owner.

October 29, 2026 update: the field-inference paper is now titled **Spatial Context or Memory? Sizing the Inputs of Neural Surrogates for Partially Observed Fields**, authored by Ruige Kong, with preprint https://arxiv.org/abs/2610.12723. The owner confirms submission to the **Learning for Dynamics and Control Conference (L4DC)**, superseding its previous TMLR preparation status. The flow-control statuses above remain unchanged.

The owner's stated status takes precedence over template text such as “Under review” in draft PDFs. TMLR preparation must not become submitted, under review, or accepted without a new update. Workshop acceptance is not a NeurIPS main-conference acceptance or journal acceptance. Keep the two versions distinct. The supplied PDFs are anonymous; do not infer new author lists. Existing flow-control author information comes from the previous site, not those PDFs.

Use full manuscript titles, not internal shorthand such as “mbrl.” Base scientific summaries on the manuscripts and retain qualifications on findings. Do not invent publication URLs, dates, DOIs, or results. Do not copy anonymous working drafts into `public/` without an explicit request to publish them. `pdftotext -layout 'papers/filename.pdf' -` can read the papers locally.

The FISICA project is intentionally described only by a generic confidentiality statement. Do not add repository links, collaborators, methods, datasets, results, or figures without explicit clearance.

Research, publication, and experience information appears on multiple pages; check all relevant pages for consistency. The CV is a separate binary asset and is not regenerated from site content.

## Working and verification

1. Read this guide, `README.md`, `package.json`, and the relevant source files. Check `git status --short`; preserve the owner's existing changes and untracked reference files.
2. Make focused source edits. Do not edit generated `dist/`, `.astro/`, or dependencies in `node_modules/`.
3. Run `npm run build` (Astro/TypeScript checks followed by the static build).
4. Start `npm run preview -- --host 127.0.0.1`, then run `npm run test:site`. The existing audit checks five main routes at mobile and desktop sizes, images, overflow, serious accessibility failures, console errors, navigation, and homepage internal links. It does not verify scientific claims or external URLs.
5. Review changed content and the final diff. Avoid new tests for simple copy edits; use the existing audit.

`npm run dev` starts development on port 4321. The browser audit uses installed Google Chrome; override `CHROME_PATH` if necessary and `SITE_URL` for a different preview address.

## Deployment

`astro.config.mjs` sets static directory output and sitemap generation. The canonical origin defaults to `https://kongruige.github.io`, overridable with `PUBLIC_SITE_URL`. `.github/workflows/` deploys to GitHub Pages on pushes to `main` or manual dispatch. Keep local content updates separate from publishing unless deployment is requested.

`AGENT.md` is the canonical initialization guide; `CLAUDE.md` and `AGENTS.md` point here to avoid divergent instructions.
