# Monica Howe — studio site

React + Vite build of the homepage and project case-study template from the
`MonicaHowe_Homepage_F` design file.

## Stack

- React 19 + Vite
- React Router (`/` home, `/work/:slug` case studies)
- Plain CSS with a shared token system in `src/index.css` (no framework)

## Run it

```bash
yarn install
yarn start       # http://localhost:5173
yarn build       # production build to /dist
yarn lint
```

## Structure

```
src/
  data/projects.js        project content (client, year, problem/impact/solution copy)
  components/              Header, Hero, WorkList, About, Packages, Contact, Footer
  pages/Home.jsx            composes the homepage sections
  pages/ProjectDetail.jsx   case-study template, reads a project by :slug
  index.css                 design tokens: colour, type, spacing
```

## Design tokens (from the brief)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#F4F1E8` | page background (cream) |
| `--color-bg-dark` | `#141310` | selected-work section, footer contrast |
| `--color-accent` / `--color-accent-dim` | `#C6D94D` / `#A9BB3A` | links, hover states, italic emphasis |
| `--font-display` | Archivo (800/700) | headlines |
| `--font-accent` | Instrument Serif italic | emphasis words ("that lasts") |

## What's still a placeholder

The five project entries in `src/data/projects.js` only have real copy for
**Telavi** (from the provided PDF). The other four (Be Casa, Medinaceli,
Worldcoo, The Tiny Flea) have placeholder problem/impact/solution copy —
swap it for the real case-study writeups.

**Images:** the `.ai` file turned out to be PDF-compatible, so the real
raster assets were extractable — they're not just a design preview. Telavi's
case study (showreel thumbnail, hero collage, logo/packaging/stationery
grid, billboard, website mockup) now uses the actual exported images, in
`src/assets/telavi/`. The other four projects have no source assets at all
(the file only contains the homepage + Telavi pages), so they still render
labelled placeholder colour plates in `src/pages/ProjectDetail.jsx` — drop
real exports into `src/assets/<slug>/` and add an `images` object to that
project's entry in `src/data/projects.js` (same shape as Telavi's) to swap
them in.

Contact details (email, LinkedIn, Instagram) are placeholders in
`src/components/Contact.jsx` and `src/components/Packages.jsx` — update the
links before launch.
