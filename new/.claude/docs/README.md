# Montierra — Architecture & Implementation Notes

## Project overview

Static marketing site for Montierra Luxury Residence — 8 boutique apartments in Dragalevtsi, Sofia. Built with Astro 6 + Tailwind CSS v4. Outputs fully static HTML, no server runtime required.

---

## Key architectural decisions

### Bilingual support via CSS, not routing

Bulgarian/English is implemented entirely on the client without separate routes or build-time compilation. Every piece of text is rendered as two sibling `<span>` elements — one `data-lang-bg`, one `data-lang-en`. A single CSS rule hides the inactive language based on a `data-lang` attribute on `<html>`:

```css
html[data-lang="en"] [data-lang-bg] { display: none !important; }
html[data-lang="bg"] [data-lang-en] { display: none !important; }
```

Language preference is persisted in `localStorage` under `montierra-lang` and applied before first paint in `Layout.astro` to avoid a flash. Consequence: every text node ships twice in the HTML, which is acceptable for a site this size but would need rethinking at scale.

### Tailwind CSS v4 with `@theme` — no `tailwind.config.js`

The project uses Tailwind v4's CSS-first configuration. The entire design token set (colors, fonts) lives in `src/styles/global.css` under `@theme`. There is no `tailwind.config.js`. The Vite plugin `@tailwindcss/vite` handles integration. Arbitrary values like `text-[#7ecba0]` are used in a few places where the design token doesn't map cleanly (tooltip text colors for status states).

### Apartment data — single source of truth via JSON data islands

`src/data/apartments.ts` is the single source of truth for all apartment and garage data. Build-time values are passed to client-side scripts using Astro JSON data islands — `<script type="application/json">` tags placed in the template with `set:html={JSON.stringify(value)}`. The client script reads them with `JSON.parse(document.getElementById('...').textContent)`.

Two data islands are currently embedded just before the closing `</Layout>` in `apartments.astro`:

| Element id          | Source value        | Used by                                      |
|---------------------|---------------------|----------------------------------------------|
| `apartments-data`   | `apartments` array  | Modal, SVG tooltip hover (`apartmentsList`)  |
| `floor-plan-images` | `floorPlanImages` map | Modal floor plan image src (`floorPlanMap`) |
| `parking-data`      | combined garages + parkingSpots + parkingPlaces with `kind` field | Parking SVG tooltip hover (`parkingList`) |

**Never add a hardcoded copy of apartment data in a `<script>` block.** Any new client-side need for apartment data must read from the `apartments-data` island.

### Floor plan SVG polygon overlays — pixel-accurate apartment shapes

The interactive apartment overlays are SVG polygons drawn directly on top of the floor plan images. Each polygon traces the actual wall boundaries of its apartment unit. The technique:

- The floor plan `<img>` uses `object-contain` inside a `4:3` aspect-ratio container.
- An `<svg>` sits absolutely over the image with `viewBox="0 0 4961 3508"` (the native image size) and `preserveAspectRatio="xMidYMid meet"`. This makes the SVG coordinate system scale identically to the image, so polygon points in image pixels land on the correct walls regardless of viewport size.
- Each apartment has a `<polygon>` element coloured by status (green / gold / red) at 22% fill opacity with a matching stroke. On hover, fill-opacity rises to 45%.
- An SVG `<text>` label is centred inside each polygon showing the apartment number.
- A floating HTML tooltip (`#fp-tooltip`) follows the mouse and shows apartment details.

Polygon coordinates live in `aptPolygons` (and centre labels in `aptLabelPos`) in the frontmatter of `apartments.astro`. All images are 4961 × 3508 px (A4 at 300 dpi). If images are replaced, re-trace the wall coordinates in those two records.

**Apartment layout per floor:**
| Floor | Apartments | Notes |
|-------|------------|-------|
| 1     | A1 (upper-right), A2 (lower-right), A3 (bottom-left) | 3 units; A3 has garden |
| 2     | A4 (left), A5 (right) | Left/right split, central core |
| 3     | A6 (left), A7 (right) | Architectural drawing image |
| 4     | A8 | Full-floor penthouse, 142.8 m² |

---

## Asset pipeline

Source assets (raw renders and architectural drawings) live in `/assets/` and are **not** served directly. They are copied to `/public/images/` where Astro serves them as static files:

```
assets/visualizations/1–5.jpg  →  public/images/visualizations/1–5.jpg
assets/floor plans/1–4.jpg     →  public/images/floor-plans/1–4.jpg
assets/floor plans/parking.jpg →  public/images/floor-plans/parking.jpg
```

This copy is manual (not automated in the build). If source assets are updated, re-copy them to `public/images/`.

---

## Interactive floor plan — how it works

1. The apartments page renders one `fp-floor-display` container per floor (1–4 + parking), all but floor 1 hidden via inline `style="display:none"`.
2. Five `fp-floor-tab` buttons at the top control which display is visible. Clicking a tab also updates `activeFloor` and calls `applyFilters()`, so the apartment cards section below syncs to the selected floor automatically.
3. Each residential display contains an `<svg>` overlay with one `<polygon class="fp-apt-polygon">` per apartment. The parking display (floor 0) has an equivalent `<svg>` overlay with `<polygon class="fp-park-polygon">` for each garage, parking spot, and place. Both use `viewBox="0 0 4961 3508"` + `preserveAspectRatio="xMidYMid meet"` to align with the `object-contain` floor plan image.
4. Hovering a polygon raises fill-opacity from 0.22 → 0.45 and shows a floating `#fp-tooltip` div positioned via `mousemove` clientX/Y.
5. Clicking a polygon calls `openModal(id)`, the same function triggered by apartment card "Details" buttons.
6. The modal loads the floor plan image for the apartment's floor from `floorPlanMap` and sets `modalFloorPlanImg.src` dynamically to avoid loading all images upfront.

---

## Scroll reveal

All `.reveal` elements start as `opacity: 0; transform: translateY(30px)` (defined in `global.css`). A single `IntersectionObserver` in `Layout.astro` adds `.visible` when the element crosses a 10% threshold with a 50px bottom margin. Stagger delays `.reveal-delay-1` through `.reveal-delay-4` are pure CSS `transition-delay` values. The observer `unobserve`s after firing — animations play once only.

---

## Status color system

Three apartment statuses map to three semantic color tokens:

| Status    | Token       | Hex       | Usage                          |
|-----------|-------------|-----------|--------------------------------|
| available | `success`   | `#4a7c59` | Green — badges, cards, legend  |
| reserved  | `reserved`  | `#c9a96e` | Gold — same as the brand gold  |
| sold      | `sold`      | `#8b3a3a` | Muted red — badges, cards      |

`reserved` intentionally reuses the brand gold value — reserved units feel "premium" rather than "blocked."

---

## Pages and what each contains

| Route            | File                         | Notes                                           |
|------------------|------------------------------|-------------------------------------------------|
| `/`              | `src/pages/index.astro`      | Hero (viz/2), gallery (all 5 renders), features, about teaser (viz/1), stats |
| `/apartments/`   | `src/pages/apartments.astro` | Interactive floor plan, filtered cards, garages  |
| `/description/`  | `src/pages/description.astro`| Project concept, architecture text, specs table  |
| `/investor/`     | `src/pages/investor.astro`   | Investor profile, why Dragalevtsi, quality CTA   |
| `/contacts/`     | `src/pages/contacts.astro`   | Contact form (client-side), address, hours        |

---

## Known rough edges

- **Floor plan polygon coordinates are traced estimates**: the `aptPolygons` map in `apartments.astro` contains pixel coordinates traced visually against the 4961 × 3508 floor plan images. They approximate wall boundaries closely but are not derived from the architectural CAD data. Recalibrate if images are recomposed or replaced.
- **No CI/CD, linting, or tests**: there are no automated quality checks configured. The only validation is `astro build`, which type-checks via the strict `tsconfig`.
- **Contact form is non-functional**: the form in `contacts.astro` has client-side validation UX (button state, success/error labels) but no backend endpoint. It will need a form handler (e.g. Netlify Forms, a serverless function, or a third-party service) before going live.

---

## Changelog

### 2026-05-04 — Apartment data single source of truth

**Problem:** `apartments.astro` contained a hardcoded `apartmentsList` array inside the `<script>` block that duplicated `src/data/apartments.ts`. The two were out of sync — A1 had price `185000` in the script vs `199000` in the data file. The `floorPlanMap` object in the script was also a duplicate of `floorPlanImages` from the frontmatter.

**Fix:** Replaced both hardcoded duplicates with JSON data islands. The frontmatter serializes the authoritative values at build time; the client script reads them via `JSON.parse`. See the "Apartment data" architectural decision above for the pattern.

**Files changed:** `src/pages/apartments.astro`

---

### 2026-05-06 — Parking SVG overlay layer + data split into 3 types

**Changes:**

**Data (`src/data/apartments.ts`):**
- `garages` array reduced to 2 enclosed garage units (G1, G2 — ~33–34 m², ~€42–44k).
- Added `parkingSpots: Garage[]` — 8 open parking bays (P1–P8, 14.5 m², €17k each; P4 reserved, P7 sold).
- Added `parkingPlaces: Garage[]` — 4 compact places (PL1–PL4, 8 m², €10k each, all available).
- All three arrays reuse the existing `Garage` interface (structurally identical).

**Floor plan (`src/pages/apartments.astro`):**
- Parking floor (0) now renders an interactive SVG overlay identical in behaviour to the residential floors: `<polygon class="fp-park-polygon">` per item, `viewBox="0 0 4961 3508"` + `preserveAspectRatio="xMidYMid meet"`, status-colour fill/stroke, number label.
- `parkPolygons` and `parkLabelPos` records hold **placeholder** coordinates spread across the image coordinate space — these need to be retraced once the real `parking.jpg` boundaries are confirmed.
- Removed the old static "garage status summary" overlay box.
- Floor 0 info bar now lists all 14 parking items (with colour dots) same as residential floors show apartments.
- New `parking-data` JSON data island (`id="parking-data"`) serialises the combined garages + spots + places array with a `kind` field (`'garage' | 'parking' | 'place'`).
- New `fp-park-polygon` JS block wires hover → fill-opacity 0.45, tooltip (name/kind/area/price/status), mouseleave → reset. No modal — parking items use tooltip only.
- Bottom "Parking Section" restructured into 3 labelled sub-grids: Garages / Parking Spots / Places.

**Apartment polygon coordinates (`aptPolygons` / `aptLabelPos`):** updated by developer for all 4 residential floors (A1–A8) to match revised floor plan image layout. Coordinates are in `apartments.astro` frontmatter.

---

### 2026-05-08 — Add logo.JPG to header, footer, and hero

**Changes:**
- `src/components/Header.astro`: replaced the "MONTIERRA" text wordmark with `<img src="/logo.JPG">` (48×48 px, rounded-sm).
- `src/components/Footer.astro`: replaced the "MONTIERRA" text in the brand column with `<img src="/logo.JPG">` (80×80 px).
- `src/pages/index.astro`: added the logo as a centered 112–144 px image above the hero tagline; removed the redundant `<h1>MONTIERRA</h1>` text heading (the logo already carries the wordmark).

**Files changed:** `src/components/Header.astro`, `src/components/Footer.astro`, `src/pages/index.astro`

---

### 2026-05-13 — Move hardcoded home-page strings into translations.ts

**Problem:** Ten strings in `src/pages/index.astro` were hardcoded directly as span content rather than being sourced from `src/i18n/translations.ts`. Affected strings: gallery section title, about-teaser label/heading/body/link, and all four stats labels.

**Fix:** Added `home.gallery`, `home.about`, and `home.stats` keys to `translations.ts`. Updated all ten occurrences in `index.astro` to reference `t.home.*`. Also normalised the about-teaser body paragraph from two sibling `<p data-lang-*>` elements to a single `<p>` with two inner spans, consistent with the rest of the codebase.

**Files changed:** `src/i18n/translations.ts`, `src/pages/index.astro`

---

### 2026-05-04 — Remove auto-scroll on floor tab click

**Problem:** Clicking a floor tab in the interactive floor plan section scrolled the page down to the apartment cards filter section (`#apartments-section`), taking the user away from the floor plan image they just selected.

**Fix:** Removed the `scrollIntoView` call from the floor tab click handler. The view now stays on the floor plan immediately below the tabs.

**Files changed:** `src/pages/apartments.astro`
