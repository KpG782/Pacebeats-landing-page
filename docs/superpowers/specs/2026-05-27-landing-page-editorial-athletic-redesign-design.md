# Pacebeats Landing Page — Editorial Athletic Redesign

**Date:** 2026-05-27
**Status:** Draft — awaiting user review
**Scope:** Whole-site, single design pass
**Owner:** Ken Patrick Garcia

## 1. Goals & non-goals

### Goals
- Replace the current "generic dark tech" look with a deliberate, cohesive Editorial Athletic identity that reads as a serious running/performance product, not a SaaS template.
- Establish a real design system (tokens for type/color/spacing/motion) that every section pulls from, instead of the ad-hoc inline styles the site has today.
- Add the one missing module that the design-system analysis flagged: an animated stat-counter section establishing social proof / scale.
- Tighten headline copy across the site to a punchier, athletic voice consistent with the new aesthetic.
- Preserve current SEO posture (JSON-LD, microdata, `sr-only` content, semantic landmarks) — do not regress.

### Non-goals
- Adding testimonials or quotes. Deferred until real user quotes exist.
- Changing site information architecture (sections stay in the same order, modal/page pattern unchanged).
- Touching the Android/Wear OS apps themselves or the APK release pipeline.
- Migrating off Astro / React islands / Tailwind 4 / `motion` library — current stack stays.
- Rewriting privacy policy / terms content.

## 2. Locked design decisions

These were settled during brainstorming; the rest of the spec assumes them.

| Decision | Value |
|---|---|
| Aesthetic direction | Editorial Athletic (magazine-grade typography, asymmetric grids, generous whitespace) |
| Theme | Dark (near-black base) |
| Accent color | Electric Lime `#D8FF3D` — the *only* accent |
| Display typeface | Barlow Condensed (600/700/800) |
| Body typeface | Barlow (400/500) |
| Numeric / data typeface | JetBrains Mono (400/500) — stats, version labels only |
| Content scope | Restyle existing sections, rewrite headline copy, add stat-counter section. No testimonials. |

## 3. Design tokens

All tokens live in `src/styles/global.css` inside a Tailwind 4 `@theme` block, exposing them as both CSS custom properties and Tailwind utilities. No `tailwind.config.js` is introduced — Tailwind 4's CSS-first config is the source of truth.

### 3.1 Typography

```
@font-face: import Barlow Condensed (600,700,800), Barlow (400,500), JetBrains Mono (400,500) from Google Fonts.
--font-display: 'Barlow Condensed', system-ui, sans-serif
--font-body:    'Barlow', system-ui, sans-serif
--font-mono:    'JetBrains Mono', ui-monospace, monospace
```

- All `font-inter` classes on existing components get replaced with `font-display` (for headings) or `font-body` (for paragraphs).
- Display sizes: `clamp(2.5rem, 6vw, 7rem)` for hero h1, `clamp(2rem, 4.5vw, 5rem)` for section h2.
- Display tracking: `-0.02em`. Display line-height: `0.9` for hero, `0.95` for section h2.
- Body line-height: `1.5`. Body line-length capped via `max-w-[65ch]` on long-form paragraphs.
- No italic for emphasis — use weight or lime accent.

### 3.2 Color

```
--ink:      #0A0A0A   /* page background */
--ink-2:    #141414   /* cards, raised surfaces */
--ink-3:    #1F1F1F   /* hairline borders */
--paper:    #F5F4F0   /* primary text (warm white, not pure) */
--paper-2:  #A8A8A3   /* muted text */
--lime:     #D8FF3D   /* the only accent — buttons, key numerals, underlines, focus */
--lime-ink: #0A0A0A   /* text on lime backgrounds */
```

Hard rules:
- No greys outside `--paper` / `--paper-2`. Existing `text-gray-200`, `text-gray-300`, `text-gray-400` all collapse to one of these two values based on hierarchy.
- No blue (`bg-blue-*`, `text-blue-*`, `text-cyan-*`) or red (`text-red-*`) Tailwind utilities anywhere. Lime is the only accent.
- No gradients on text or backgrounds (currently used in Wear/Hero/How). Replace with solid `--paper` or `--lime`.
- Contrast: `--paper` on `--ink` is ≥ 18:1; `--lime-ink` on `--lime` is ≥ 16:1; `--paper-2` on `--ink` is ≥ 8:1. All comfortably pass WCAG AA.

### 3.3 Spacing & layout

- Base unit: 8px. Tailwind's default scale already follows this; no override needed.
- Section vertical rhythm: `py-32 md:py-40` (currently inconsistent: `py-16`, `py-20`, `min-h-screen`).
- Content container: `max-w-7xl mx-auto px-6 md:px-10`.
- Grid: 12-column where helpful, with asymmetric breaks (text 1–7, visual 8–12, then flipped next section). Not every section needs a grid — pure-typography sections (Words, Footer headline) can be single-column.
- Border-radius scale: `0` (default), `4px` (small chips), `12px` (cards). No `rounded-2xl` or `rounded-3xl` — too soft for this aesthetic. The current "rounded-full" pills on buttons get replaced with square buttons with a 4px corner radius.
- Borders: hairline `1px solid var(--ink-3)` is the primary divider. Shadows are removed from cards (currently `shadow-2xl`, `shadow-xl` everywhere) — editorial aesthetic uses borders, not shadows.

### 3.4 Motion

- Library: continue using `motion/react` (already a dependency) for React islands; CSS-only for pure-Astro sections.
- Page-load stagger: 150ms apart, 600ms duration, easing `cubic-bezier(0.2, 0.8, 0.2, 1)`. No spring physics.
- Scroll reveal: `IntersectionObserver`, fire once per element, `threshold: 0.15`, fade + 16px translateY.
- Hover: 200ms, color/opacity only. **No scale transforms on cards** (current site has `hover:scale-105` everywhere — this causes layout shift and is on the `ui-ux-pro-max` anti-pattern list).
- Stat counters: number count-up over 1200ms with `easeOutExpo`, triggered when the section enters viewport.
- All animation gated on `prefers-reduced-motion: reduce` via existing media query pattern.

### 3.5 Iconography

- Continue using `lucide-react` (React islands) and `@lucide/astro` (Astro components) — already dependencies.
- Stroke width: standardize at `2`. Size scale: `w-4 h-4` (inline), `w-5 h-5` (button), `w-6 h-6` (feature icon).
- No emoji icons anywhere. The README and inline comments use emoji — those stay in docs/comments only, not in shipped UI.

## 4. Section-by-section redesign

Sections are listed in `index.astro` order. Each entry covers: **intent** (what the section says), **layout** (the new shape), **specifics** (concrete changes), **kill list** (what's removed).

### 4.1 Navbar (`Navbar.astro` + `NavbarClient.tsx`)

- **Intent:** Quiet, persistent wayfinding. Don't compete with the hero.
- **Layout:** Same fixed-top pattern, but slimmer. Logo left, primary nav inline, single lime "Download" CTA right. The current "Features" dropdown is kept but restyled as a flat panel with hairline borders, no rounded corners, no white background — opens to `--ink-2` with `--ink-3` divider.
- **Specifics:**
  - Logo uses `pacebeats-text-white.svg` (already in `public/`).
  - Height: `64px` desktop, `56px` mobile. Currently `py-6 sm:py-8` which is ~88px — too tall, eats hero space.
  - Background: `--ink` at 70% opacity with `backdrop-blur-md`, hairline bottom border on scroll.
  - Mobile menu (`MobileMenuClient.tsx`): full-screen overlay with `--ink` background, large Barlow Condensed nav links, no gradients, no rounded buttons.
- **Kill list:** scale-on-hover, white/95 dropdown background, blue focus rings (move to lime), gradient buttons.

### 4.2 Hero (`Hero.astro` + `HeroClient.tsx`)

- **Intent:** Make the first 5 seconds unforgettable. One headline that commits to the aesthetic.
- **Layout:** Two-column on desktop (text cols 1–7, phone cols 8–12). On mobile, headline stacks above phone. Background photo (`/hero-section2.jpg`) stays, but overlay is solid `--ink` at 78% rather than the current 3-stop gradient — more editorial, less "sponsored ad".
- **Specifics:**
  - H1 in Barlow Condensed 800, sized `clamp(3.5rem, 8vw, 8rem)`, line-height `0.88`, tracking `-0.03em`. Two lines, second line in lime: `RUN TO THE RHYTHM. / ACHIEVE YOUR PACE.` (second line is `text-lime`).
  - Subtitle in Barlow 400, `max-w-[55ch]`, `text-paper-2`.
  - CTAs: two buttons, both square with `4px` radius. Primary: `bg-lime text-lime-ink`, label "Download APK". Secondary: `border border-paper text-paper`, label "How it works".
  - Beneath CTAs: a single line of mono text — `v0.1.0-beta · UPDATED MAR 2026` — reading from `APK_RELEASE` in `src/config/apkRelease.ts` (unchanged source of truth).
  - Phone mockup (`/hero-screen-1.svg`) — keep, but drop the cyan blur-halo and the `whileHover scale+rotate` motion. Replace with a static `--ink-3` 1px border framing it, like a contact sheet print.
  - Scroll indicator: simplify to a single Barlow Condensed "SCROLL" label + chevron in lime, fixed at bottom-center.
- **Kill list:** text-glow effects, `bg-blue-600` CTA, cyan blur halo, hover-rotate on phone, double "skip to main content" links (one is duplicated between `Header.astro` and `Navbar.astro` — keep one).

### 4.3 Maps / Spotify (`Maps.astro`)

- **Intent:** Show the music integration is real. Currently the headline says "Seamless Spotify Integration" and the section feels like a generic feature card.
- **Layout:** Asymmetric flip from Hero — image cols 1–5 (left), text cols 7–12 (right). Image is `/spotify.jpg`, framed with a 1px `--ink-3` border.
- **Specifics:**
  - H2 Barlow Condensed 700, sized `clamp(2.5rem, 5vw, 5rem)`, lime word "SPOTIFY" called out within the heading.
  - Body in Barlow 400, `--paper-2`.
  - The "Note: Currently available to Spotify developer accounts" callout becomes a small hairline-bordered chip (no rounded-lg, no blue tint) with mono "NOTE" prefix.
- **Kill list:** blue text-glow, subtle blue background tint behind phone, gradient text, animated glow keyframes.

### 4.4 Features (`Features.astro` + `FeaturesClient.tsx`)

- **Intent:** Communicate four core capabilities at a glance. Currently has a full-width image block with floating labels — busy.
- **Layout:** Editorial bento-ish 12-col grid. One large feature card (cols 1–7, 2 rows tall) for the headline feature (Smart Pace Detection), three smaller cards (cols 8–12, stacked) for the rest.
- **Specifics:**
  - Cards: `bg-ink-2`, hairline `--ink-3` border, no shadow, no rounded-2xl. Padding `p-8 md:p-10`.
  - Card title in Barlow Condensed 700, size `clamp(1.5rem, 2.5vw, 2.5rem)`.
  - Card body in Barlow 400, `text-paper-2`.
  - Icon at top-left in lime (lucide), 24px stroke 2.
  - Hover: card border transitions from `--ink-3` to `--lime` over 200ms. No scale, no shadow change.
  - The follow-up full-width photo block (`/users.jpg` with "Built for Every Music Enthusiast" overlay) is removed from this section — that imagery moves to the new Stats section (see 4.6).
- **Kill list:** four equal-size cards, floating "Pace Tracking" / "Night Run Ready" labels on the image, gradient overlays, "Powerful Features" generic heading (see § 5 for new copy).

### 4.5 Users (`Users.astro` + `UsersClient.tsx`)

- **Intent:** Show real app screens. Currently has 5 phone mockup images (`users-1.png` through `users-5.png`).
- **Layout:** Horizontal scroll-snap row of phone mockups on desktop and mobile (touch-friendly), with section heading anchored above. *Note: horizontal scroll only inside this single section, not the whole page (which the design-system tool mistakenly suggested).*
- **Specifics:**
  - Section heading: short Barlow Condensed 700 line, lime underline on the verb.
  - Each phone in a hairline-bordered frame with a Barlow caption underneath (e.g. "01 / RUN SUMMARY", "02 / PACE GRAPH", in mono).
  - Drag/scroll indicator using lucide `MoveRight` arrow in lime.
- **Kill list:** generic grid of phones with no captions, any blue overlays.

### 4.6 NEW — Stats (insert between Users and Wear)

This is the only structural addition. New file: `src/components/Stats.astro` + `src/components/client/StatsClient.tsx`.

- **Intent:** Establish scale and credibility with concrete numbers. Closes the "social proof" gap the design-system analysis flagged.
- **Layout:** Four-column row on desktop, 2x2 on tablet, stacked on mobile. Hairline dividers between columns. Full-bleed dark band against `--ink`.
- **Specifics:**
  - Each stat: huge mono numeral (JetBrains Mono 500, `clamp(3rem, 7vw, 7rem)`) + Barlow Condensed label below in `--paper-2`.
  - Numbers count up from 0 on viewport entry, 1200ms `easeOutExpo`.
  - The four stats (initial values — TODO: confirm real numbers with team before launch):
    1. **1,284** runners syncing now
    2. **48,200 KM** logged this month
    3. **172 BPM** average cadence
    4. **96%** of users finish their run
  - Numbers are static values in the component for now (no live API). If/when a backend exists, these become props.
- **Open question:** are these numbers OK to ship as approximations, or do we need real telemetry before going live? (See § 9.)

### 4.7 Wear (`Wear.astro`)

- **Intent:** Sell the Galaxy Watch companion + walk the user to download/install.
- **Layout:** Full-bleed dark hero with the `/wear1.jpg` background image, but overlay is a solid `--ink` at 80% (currently a 3-stop gradient). Content stacked center on mobile, two-column on desktop (text left, install steps as a numbered list right).
- **Specifics:**
  - "Available Now" badge becomes a small hairline-bordered chip with mono "AVAILABLE NOW · v1.0.0" — pulls from `WEAR_RELEASE` in `src/config/apkRelease.ts`.
  - H2 Barlow Condensed 700, no gradient-clip (currently `bg-gradient-to-r ... bg-clip-text text-transparent` — falls back badly and is generic).
  - "How to connect it properly" steps: keep the 4-step list, but render with mono step numbers (`01`, `02`, `03`, `04`) and Barlow body text. Code snippets stay in JetBrains Mono.
  - CTA: single primary lime button "Download Wear APK". Secondary "Installation Guide" links to `/docs/GALAXY_WATCH_INSTALLATION.md` (which is in this repo).
- **Kill list:** gradient text headline, blue/cyan accent colors, "Companion Features" modal button (incoming `showWearFeatures()` — see § 7 architecture cleanup), animated pulse SVG on the status chip.

### 4.8 How (`How.astro` + `HowClient.tsx`)

- **Intent:** Explain the user journey in 3–5 steps. Currently has an interactive "Music Recommendation Flow" component plus a "Currently in Development" callout.
- **Layout:** Numbered editorial step-list down the page. Step number in giant lime mono (e.g. `01`), title in Barlow Condensed 700, body in Barlow 400, vertical hairline running down the left margin connecting steps.
- **Specifics:**
  - Steps:
    1. **CONNECT** — Pair Pacebeats with Spotify and (optionally) your Galaxy Watch.
    2. **CALIBRATE** — One short run sets your baseline cadence and pace zones.
    3. **RUN** — Music adapts to your stride in real time; pace targets surface as you go.
    4. **REVIEW** — Post-run breakdown of pace, cadence, and music sync quality.
  - The "Currently in Development" phase grid stays, but restyled: three hairline-bordered cards with `01 / 02 / 03` mono labels and Barlow titles. Drop the icon-in-gradient-circle.
- **Kill list:** blue/purple/green text accents on the phase cards (all collapse to lime for active, `--paper-2` for upcoming), gradient icon circle, generic "How It Works" heading (see § 5).

### 4.9 Techstack (`Techstack.astro`)

- **Intent:** Establish technical credibility — show the actual stack the app is built on.
- **Layout:** Logo wall + spec sheet. Grid of monochrome SVG logos at top (each in `--paper-2`, lime on hover). Below, a two-column "spec sheet" listing technologies with one-line descriptions, formatted like a product manual.
- **Specifics:**
  - All logos monochrome (`--paper-2`), no brand colors, no glass cards. Hover: logo turns `--paper`.
  - Spec sheet rows: left column is the tech name in Barlow Condensed 600, right column is one-line description in Barlow 400 `--paper-2`. Hairline rules between rows.
- **Kill list:** colorful logo backgrounds, glass-morphism cards, any motion-heavy "tech stack carousel".

### 4.10 Team (`TeamSection.astro`)

- **Intent:** Put faces to the project. Currently lists 4 team members.
- **Layout:** Editorial 4-up portrait grid. Square portraits, hairline border, name in Barlow Condensed 700, role in Barlow 400 `--paper-2`. Hover reveals a one-line bio + lime underline on the name.
- **Specifics:**
  - Portrait frames: 4:5 aspect, hairline `--ink-3` border, no shadow.
  - Optional social link icons (GitHub etc.) as lucide icons, `--paper-2`, lime on hover.
  - Names from the README team list (Ken Patrick Garcia, Timothy Forte, Brian Ashley Papa, Lanz Corpuz).
- **Kill list:** circle avatar frames, gradient overlays, glass-effect cards.

### 4.11 Words (`Words.astro`)

- **Intent:** "Word cloud" of running-related terms with "OWN THE PACE" highlighted.
- **Layout:** Keep the concept — it's a strong typographic moment — but execute it as a single full-bleed editorial block. Massive Barlow Condensed display words at varied sizes scattered across a 12-col grid; the phrase "OWN THE PACE" is the largest (`clamp(5rem, 12vw, 14rem)`) in lime.
- **Specifics:**
  - All other words in `--paper-2` at varied weights and sizes between `1rem` and `4rem`.
  - No background image, no hover effects on the small words — let typography do the work.
  - Words are static markup, not generated.
- **Kill list:** circle-word bubble UI (`CircleWords.astro` util can stay if used elsewhere, but Words section no longer uses bubbles — they look like skill chips on a resume).

### 4.12 Footer (`Footer.astro`)

- **Intent:** Site navigation, social, download, legal. Don't bury links.
- **Layout:** Three rows.
  1. Huge Barlow Condensed wordmark across full width — "PACEBEATS" — in `--ink-2` outlined text or `--paper` at low opacity, as the "large brand text overlay" the README describes.
  2. 4-column link grid: Product / Resources / Company / Legal. Each column header in mono uppercase, links in Barlow 400.
  3. Bottom bar: copyright in mono, social icons right-aligned, hairline top border.
- **Specifics:**
  - "Made in the Philippines" line moves into the bottom bar as a small mono caption.
  - Privacy / Terms link to `/privacy-policy` and `/terms-and-conditions` (existing routes) — not to the modal versions. The `PrivacyModal.astro` and `TermsModal.astro` stay for in-page links elsewhere but the Footer goes to full pages.
- **Kill list:** any gradient backgrounds, rounded social-icon buttons, app-store-badge graphics if they exist (replace with text "DOWNLOAD APK" link).

## 5. Headline copy rewrites

New copy is shorter, more imperative, more athletic. Approved tone: like a Tracksmith / Nike Run editorial — confident, not corporate.

| Section | Current headline | New headline |
|---|---|---|
| Hero | "Run to the Rhythm. / Achieve your Pace." | **"RUN TO THE RHYTHM. / ACHIEVE YOUR PACE."** (kept verbatim — already strong; uppercase + Barlow Condensed treatment is the change) |
| Maps | "Seamless Spotify Integration for your ultimate running experience." | **"YOUR PLAYLIST. / YOUR PACE. / IN SYNC."** |
| Features | "Powerful Features" | **"BUILT FOR THE WAY YOU RUN."** |
| Users (in-image) | "Built for Every Music Enthusiast" | (removed — the photo block goes away) |
| Users | (no heading currently) | **"INSIDE PACEBEATS."** |
| Stats (new) | — | **"BY THE NUMBERS."** |
| Wear | "Pacebeats Companion / for Wear OS" | **"WEAR THE RUN."** with subline "Pacebeats Companion for Wear OS" |
| How | "How It Works" | **"FOUR STEPS. FIRST RUN."** |
| Techstack | "Built with Modern Tech" | **"BUILT ON."** |
| Team | "Meet the Team" | **"THE TEAM."** |
| Words | (no heading) | (no heading — the words ARE the section) |

Subtitles and body copy stay intact unless they directly reference the old headline.

## 6. Architecture & implementation strategy

### 6.1 Where tokens live

- `src/styles/global.css` gains a `@theme { ... }` block (Tailwind 4 syntax) declaring all custom properties as Tailwind theme tokens. This makes `bg-ink`, `text-paper`, `text-lime`, `font-display`, etc. work as standard Tailwind utilities throughout `.astro` and `.tsx` files.
- Font imports done via Google Fonts `@import` at the top of `global.css`. Preload critical weights (Barlow Condensed 800, Barlow 400) via `<link rel="preload">` in `Layout.astro` to avoid FOIT.

### 6.2 Migration pattern

Per existing project convention (now documented in `CLAUDE.md`):
- `.astro` shell owns section markup, SEO/JSON-LD, and CSS — gets the new tokens applied via Tailwind utility classes + the existing `<style>` block reduced to only true exceptions.
- `client/*Client.tsx` islands own animation + interactive state — `motion/react` variants get updated to the new motion language (no spring, custom cubic-bezier, no scale-on-hover).
- The `Foo.astro` + `client/FooClient.tsx` split stays. No section currently pure-Astro gets a React island added unless it needs JS state. The new `Stats.astro` gets a `StatsClient.tsx` (the count-up animation needs `useInView` + state).

### 6.3 Files touched (estimate)

| File | Change |
|---|---|
| `src/styles/global.css` | Replace; add `@theme`, font imports, reset only |
| `src/layouts/Layout.astro` | Add font preload links, update title/meta if needed |
| `src/components/Navbar.astro` + `client/NavbarClient.tsx` + `client/MobileMenuClient.tsx` | Restyle, simplify, remove gradient/blue |
| `src/components/Header.astro` | Remove duplicate skip-link (already in Navbar) |
| `src/components/Hero.astro` + `client/HeroClient.tsx` | Restyle, replace blue CTA with lime, drop text-glow / hover-rotate |
| `src/components/Maps.astro` | Restyle, drop blue glow + gradient |
| `src/components/Features.astro` + `client/FeaturesClient.tsx` | Restyle to bento, remove follow-up image block |
| `src/components/Users.astro` + `client/UsersClient.tsx` | Restyle to horizontal scroll-snap row |
| `src/components/Stats.astro` + `client/StatsClient.tsx` | **NEW** — stat counter row |
| `src/components/Wear.astro` | Restyle, drop gradient text & blue accents |
| `src/components/How.astro` + `client/HowClient.tsx` | Restyle to editorial step-list |
| `src/components/Techstack.astro` | Restyle to monochrome logo wall + spec sheet |
| `src/components/TeamSection.astro` | Restyle to 4-up editorial portrait grid |
| `src/components/Words.astro` | Restyle to full-bleed typographic block, drop CircleWords usage |
| `src/components/Footer.astro` | Restyle to 3-row editorial footer |
| `src/components/util/CircleWords.astro` | **Delete if no longer used** (currently only Words uses it) |
| `src/pages/index.astro` | Insert `<Stats />` between `<Users />` and `<Wear />` |
| `src/pages/privacy-policy.astro`, `src/pages/terms-and-conditions.astro` | Reapply new tokens (background, type, link color) |
| `src/components/PrivacyModal.astro`, `src/components/TermsModal.astro` | Reapply new tokens |
| `src/components/Support.astro` | Reapply new tokens (lightweight) |

### 6.4 Modal cleanup (incidental)

While in `Wear.astro`, the `showWearFeatures()` global function is referenced by an `onclick` but no corresponding modal markup is visible in the file head — investigate during implementation. Either wire it up to a real modal component or remove the button. Same for any other `window.functionName` references discovered en route.

### 6.5 No backend, no analytics changes

No new third-party scripts. No new env vars. No new routes beyond what exists. Build output is still 100% static.

## 7. Motion & accessibility checklist

Applied per the `ui-ux-pro-max` pre-delivery checklist plus our own:

- [ ] All clickable elements have `cursor-pointer`.
- [ ] No `hover:scale-*` on interactive cards (causes layout shift).
- [ ] Focus rings use `--lime` (`outline: 2px solid var(--lime); outline-offset: 2px`).
- [ ] All hover/transition durations between 150ms and 300ms.
- [ ] No motion in `prefers-reduced-motion: reduce` (existing media query pattern preserved).
- [ ] No content jumps when async resources (fonts) load — `font-display: swap` + matched fallback metrics.
- [ ] All text contrast ≥ 4.5:1 (`--paper` on `--ink` = ~18:1 ✓; `--paper-2` on `--ink` = ~8:1 ✓).
- [ ] Touch targets ≥ 44×44px (current buttons at `py-3` ≈ 48px ✓; mobile nav links need explicit padding).
- [ ] No emoji icons in shipped UI (lucide only).
- [ ] Tab order matches visual order.
- [ ] All images have `alt` text (current site already does this — preserve).
- [ ] JSON-LD blocks updated to reflect any changed copy (Hero, Wear). Schema.org `itemprop`s preserved.

## 8. Out of scope

- Backend / API work (live stats, real user counts).
- Real testimonial collection — separate effort, requires legal/PR signoff for real names.
- Translating site (i18n) — roadmap item per README.
- A/B testing infrastructure — roadmap item.
- App-store badges or iOS download flow — not relevant since APKs are direct-download.
- New imagery — reuses existing assets in `public/`. If new photography is desired, that's a follow-up.

## 9. Open questions

1. **Stat numbers (§ 4.6):** Are the four sample stats OK to ship as approximations, or do we need real telemetry first? Default: ship as approximations with "approximate" mono caption beneath the section; if not acceptable, the Stats section is removed from MVP and the spec drops to "restyle only".
2. **`showWearFeatures()` function (§ 6.4):** Does this currently open a modal that I missed, or is it a dead reference? Implementation phase will investigate and either wire or remove.
3. **Section heading copy (§ 5):** New headlines are proposals — flag any you want to revise before implementation kicks off.
4. **`/users.jpg` photo block in Features:** Confirmed OK to remove from Features section? The imagery is good — could move to Stats section background instead at 30% opacity. Default: drop it; revisit only if Stats section feels visually thin.

## 10. Success criteria

- A visitor lands on the site and cannot mistake it for a generic SaaS template within the first 2 seconds — the typography and the lime accent should immediately signal "athletic / performance / music".
- All sections share visible design DNA (same type scale, same hairlines, same accent, same motion language).
- Lighthouse Performance score does not regress from current baseline.
- Lighthouse Accessibility score is ≥ 95.
- Mobile (375px) and desktop (1440px) both look intentional, not the same layout scaled.
- The `CLAUDE.md` architectural patterns (Astro shell + React island, `apkRelease.ts` as single source of truth, no `tailwind.config.js`) remain accurate after the redesign.
