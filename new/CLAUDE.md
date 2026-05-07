# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview production build locally
```

No linting or test commands are configured.

## Architecture

Astro static site for Montierra — a luxury residential real estate project in Sofia, Bulgaria. Outputs plain HTML/CSS/JS with no server component.

**Routing:** File-based via `src/pages/`. Each `.astro` file maps directly to a route.

**Layout:** `src/layouts/Layout.astro` is the single base template. It bootstraps the language toggle, scroll reveal observer, and mobile menu logic in a single `<script>` block — all client-side JS lives here or in individual component `<script>` tags.

**Bilingual support (BG/EN):** No build-time i18n routing. Instead, every piece of text renders two sibling `<span>` elements (`data-lang-bg` and `data-lang-en`), and CSS hides one based on a `data-lang` attribute on `<html>`. The user's preference is persisted in `localStorage` under the key `montierra-lang`. All translation strings live in `src/i18n/translations.ts` and are imported directly into components.

**Apartment data:** `src/data/apartments.ts` exports typed arrays (`Apartment[]`, `Garage[]`) with status (`available | reserved | sold`), pricing, and floor info. The apartments page (`src/pages/apartments.astro`) is the most complex file — it handles filtering, a floor-plan selector, and status-color mapping entirely in Astro + inline script.

**Styling:** Tailwind CSS v4 via `@tailwindcss/vite`. No `tailwind.config.js` — the custom theme (colors: charcoal, gold, cream, stone; fonts: Cormorant Garamond, DM Sans) is declared with `@theme` inside `src/styles/global.css`. Scroll reveal uses a `.reveal` class with staggered variants (`.reveal-delay-1` through `.reveal-delay-4`).

## Key conventions

- Add translations as `{ bg: '...', en: '...' }` entries to `src/i18n/translations.ts` and render them with paired `data-lang-bg` / `data-lang-en` spans.
- Apartment/garage status drives color: `available` → green, `reserved` → gold, `sold` → red — keep these consistent with the Tailwind classes already in use.
- TypeScript strict mode is on. The project uses `astro/tsconfigs/strict`.
- Node.js ≥ 22.12.0 is required.
