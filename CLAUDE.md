# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Astro dev server at `http://localhost:4321`
- `npm run build` — produce a static build in `dist/`
- `npm run preview` — preview the built site locally
- `npm run astro -- --help` — Astro CLI (use for `astro add`, `astro check`, etc.)

There is no test runner, linter, or formatter wired up in this project.

## Architecture

This is a **static marketing site for the Pacebeats running app**, built with **Astro 5 + React 19 + Tailwind 4**. The app itself lives elsewhere — this repo only ships HTML/CSS/JS and links to APK releases hosted on GitHub.

### The Astro-shell-plus-React-island pattern

Every interactive section follows the same two-file split:

- `src/components/Foo.astro` — server-rendered wrapper that owns the `<section>`, SEO markup (JSON-LD blocks, schema.org `itemprop`s, `sr-only` content), and any static styling.
- `src/components/client/FooClient.tsx` — the React island it hydrates via `<FooClient client:load />`. Animations live here (`motion/react`), as do icons (`lucide-react`) and any state.

Sections currently using this pattern: `Hero`, `Features`, `How`, `Navbar` (+ `MobileMenuClient`), `Users`. Other sections (`Maps`, `Wear`, `Words`, `Techstack`, `TeamSection`, `Footer`, `Support`, `PrivacyModal`, `TermsModal`) are pure Astro — add a `client/*.tsx` only when a section actually needs JS state or animation.

When editing a section, check whether interactivity belongs in the `.astro` file (and may need `<script>`) or in the `.tsx` island — the two files often look similar but hydration boundaries matter.

### Page composition

`src/pages/index.astro` is just an ordered list of section components inside `<Layout>`. To add or reorder a section, edit that file. `Layout.astro` (in `src/layouts/`) is intentionally minimal — `<head>` + `<slot/>` + a black `<body>`; per-section `<head>` metadata is emitted via inline `<script type="application/ld+json">` blocks inside each section component, not centralized.

Standalone pages: `privacy-policy.astro` and `terms-and-conditions.astro`. The `PrivacyModal`/`TermsModal` components are the in-page modal versions of the same content — keep them in sync if updating legal text.

### Release config

`src/config/apkRelease.ts` exports `APK_RELEASE` and `WEAR_RELEASE` consts (downloadUrl, version, updatedAt, fileSize, checksumUrl). **Every "Download APK" button and version label in the site reads from here** — update this file when cutting a new release rather than hand-editing component text. The actual APKs are hosted at `github.com/KpG782/pacebeats-release-files/releases/latest`.

### Styling

- Tailwind 4 is wired via the `@tailwindcss/vite` plugin in `astro.config.mjs` (no `tailwind.config.js`). `src/styles/global.css` is just `@import "tailwindcss"` plus scrollbar hides, scroll-padding for the fixed navbar, and a few mobile/landscape overrides.
- Several components carry large inline `<style>` blocks with media queries and `prefers-reduced-motion` / `prefers-contrast` branches (e.g. `Hero.astro`). Prefer extending those over creating new global CSS.
- The fixed navbar is ~6rem tall; `scroll-padding-top: 6rem` and per-section `scroll-margin-top: 6rem` keep anchor links from being covered. Mobile drops to 5rem.

### SEO / accessibility conventions

Inline JSON-LD (`SoftwareApplication`, `BreadcrumbList`, etc.) is duplicated across `Hero.astro` and `Navbar.astro` — when changing app facts (rating, feature list, screenshots, version), grep for the field and update every occurrence. Sections also use `itemscope` / `itemprop` microdata, `sr-only` blocks for screen readers, and skip-to-content links — preserve these when refactoring markup.

## Wear OS companion

The site links to a separate Wear OS APK with its own installation flow documented in `docs/GALAXY_WATCH_INSTALLATION.md` (adb sideload to a Galaxy Watch). Keep that doc in sync with `WEAR_RELEASE` in `apkRelease.ts`.
