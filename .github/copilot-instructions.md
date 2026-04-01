# Montierra — Project Guidelines

Boutique real estate website for a luxury residential building in Dragalevtsi, Sofia.
All active work is in the `new/` folder. The `old/` folder is legacy reference only — do not modify it.

## Build & Dev

Commands are run from the `new/` directory:

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:4321
npm run build      # production build → ./dist/
npm run preview    # preview the production build
```

## Architecture

```
new/src/
├── components/       # Header.astro, Footer.astro
├── data/             # apartments.ts — TypeScript interfaces + data arrays
├── i18n/             # translations.ts — all UI strings (bilingual)
├── layouts/          # Layout.astro — single shared page shell
├── pages/            # index, description, investor, apartments, contacts
└── styles/           # global.css — Tailwind v4 @theme config
```

- **Every page** imports `Layout.astro`, `Header.astro` (passing `currentPage`), `Footer.astro`, and `{ t }` from `../i18n/translations`.
- **No server-side rendering** — static site, no API routes or endpoints.

## i18n (BG / EN)

Language is stored in `localStorage` key `montierra-lang` (default: `bg`) and applied as `data-lang="bg|en"` on `<html>`.

CSS handles visibility — never toggle text with JS:
```html
<!-- Always use this pattern, never plain text nodes -->
<span data-lang-bg>{t.section.key.bg}</span>
<span data-lang-en>{t.section.key.en}</span>
```

All new strings must be added to `src/i18n/translations.ts` as `{ bg: string; en: string }` before use.

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.*` file — config lives in `src/styles/global.css` under `@theme`).

Custom design tokens (use these, not arbitrary hex values):

| Token | Purpose |
|-------|---------|
| `charcoal` / `charcoal-light` | Primary dark backgrounds |
| `dark` | Deepest backgrounds |
| `gold` / `gold-light` / `gold-dark` | Brand accent colour |
| `cream` / `cream-dark` | Light backgrounds |
| `stone` / `stone-light` | Muted text |
| `font-heading` | Cormorant Garamond — headings |
| `font-body` | DM Sans — body text |

## Scroll Animations

Add `class="reveal"` to any element that should animate in on scroll. Use `reveal-delay-1` through `reveal-delay-4` for staggered children. The `IntersectionObserver` in `Layout.astro` handles this automatically.

## Data Model

Apartment statuses: `'available' | 'reserved' | 'sold'`
Apartment types: `'1BR' | '2BR' | '3BR' | 'studio'`

`price: null` means "price on request" — render accordingly, never display `null`.

## Conventions

- Page links use trailing slashes: `/apartments/`, `/contacts/`, etc.
- `Header.astro` receives `currentPage` (string key matching `navItems`) to highlight the active nav link.
- Headings use `font-heading`; body copy uses `font-body` (applied globally via CSS).
- Inline SVG icons preferred over icon libraries.
