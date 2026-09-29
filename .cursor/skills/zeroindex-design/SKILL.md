---
name: zeroindex-design
description: ZeroIndex's design system - typography, color, spacing, and component rules. Use whenever creating or modifying UI in this theme (new pages, sections, components) so the result matches ZeroIndex's visual language.
---

# ZeroIndex design system

ZeroIndex is a documentation-first SaaS theme: quiet, technical, and
utilitarian. Small restrained type, hairline borders, pill-shaped controls,
monospace meta labels, and full light/dark support. New UI should be
indistinguishable from the existing docs shell and landing sections.

## Design personality

- Quiet and technical: headings are deliberately small (docs-scale, not
  marketing-scale); hierarchy comes from weight and spacing, not size.
- Hairline structure: layout is drawn with 1px `base-200`/`base-800` borders -
  the content column even has visible vertical rules - never with shadows or
  heavy panels.
- Monochrome plus one accent: pure zero-chroma grays with a single sky-blue
  accent; semantic colors exist only inside component variants.
- Dual-theme by design: every surface, text, and border class ships with a
  `dark:` counterpart.

## Typography

Fonts are **Geist** (`--font-sans`) and **Geist Mono** (`--font-mono`),
defined in `src/styles/global.css` and loaded from Google Fonts in
`fundations/head/Fonts.astro`. Never introduce another font.

Always use the `Text` component (`@/components/fundations/elements/Text.astro`).
It offers `display6XL`-`displayXS` and `textXL`-`textXS`, but real usage is
deliberately modest:

- Page/hero title: `tag="h1" variant="displaySM"` + `font-semibold
  text-base-900 dark:text-white` (see `fundations/containers/Header.astro`).
  Heroes in this theme are docs-scale - never `display2XL` and up.
- Section heading: `tag="h2" variant="textLG"` + `font-medium text-base-900
  dark:text-white`.
- Card / feature title: `tag="h3" variant="textBase"` + `font-medium`.
- Body: `variant="textSM"` with `text-base-500 dark:text-base-300` (lead
  paragraphs, often `leading-6 text-pretty` or `text-balance`) or
  `text-base-600 dark:text-base-400` (card descriptions).
- Meta / eyebrow labels (dates, categories, kickers) use the signature
  ZeroIndex pattern: `font-mono text-xs font-medium tracking-wide uppercase
  text-base-500 dark:text-base-400`. This is the only place uppercase appears.

Weight ceiling: `font-semibold` for the h1, `font-medium` everywhere else.
No `font-bold` anywhere.

## Color system

Two custom oklch scales in `@theme` (`src/styles/global.css`): `accent`
(sky blue, 50-950) and `base` (pure zero-chroma gray, 50-950). Use only
these for page UI - never Tailwind `gray`/`slate`/`zinc`, never hex values
in markup.

Usage rules:

- Page shell is `bg-base-100 dark:bg-base-700`; the content surface sits on
  top as a white panel: `bg-white dark:bg-base-900`.
- Cards are `bg-base-50 dark:bg-white/2` with `rounded-xl` - no border, no
  shadow.
- Inline links and interactive accents: `text-accent-600 hover:text-accent-500
  dark:text-accent-400`.
- Semantic hues (`cyan`, `emerald`, `orange`, `rose` from Tailwind defaults)
  live ONLY inside `Button`, `Badge`, and `Alert` variants. Do not spread
  them into sections or custom markup.
- Dark mode is genuine and class-based: `@custom-variant dark
  (&:where(.dark, .dark *))` plus a three-state `ThemeToggle`
  (system/light/dark) persisted via `ToggleLocalStorage`. **Every new
  color/bg/border class must have a `dark:` twin.**

## Layout and spacing

- `Wrapper` (`@/components/fundations/containers/Wrapper.astro`) has two
  variants: `standard` (`max-w-5xl 2xl:max-w-6xl px-4` with **visible
  vertical hairlines**: `border-x border-base-200 dark:border-base-800`) and
  `prose` (the fully-configured typography-plugin class string for markdown
  bodies). Don't hand-roll `max-w-* mx-auto` containers.
- The docs shell (`DocsLayout`) is a fixed `Sidebar` (main gets `lg:pl-72`)
  plus `MobileTopBar`/`DesktopTopBar`; main content is the white panel with
  `lg:border-r border-base-200 dark:border-base-800`.
- Landing sections inside the shell are plain `<section>` blocks padded with
  `px-8 py-12` (page headers via the `Header` container use `p-8`).
- Rhythm: title to paragraph `mt-2`-`mt-4`; section intro to grid `mt-12`;
  card content to its CTA link `mt-8`; CTA rows under a header `mt-8` with
  `gap-2`.
- Grids are tight: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`
  for feature lists, or the intro + cards split `lg:grid-cols-3` with the
  card grid on `lg:col-span-2` and `gap-2` (see `landing/Resources.astro`).
  Card grids never use `gap-8`.

## Components

Reuse these (`src/components/fundations/`) before writing anything new:

- **Button** (`fundations/elements/Button.astro`): variants `default` (black,
  inverts to white in dark), `accent` (accent-600), `muted`, `info`,
  `success`, `warning`, `danger`, plus `outline` and `outline-{accent,info,
  success,warning,danger}`, and `none`. Sizes `mini`, `xxs`, `xs`, `sm`,
  `base`, `md`, `lg`, `xl` with fixed heights (`h-6.5` to `h-13`); `iconOnly`
  renders a square (`size-6` to `size-13`); `gap` prop for icon spacing;
  `isLink` + `href` renders an anchor. Buttons are **`rounded-full` pills** -
  never override the radius. The component is a block-level `flex` that
  stretches to its container: standalone CTAs need `w-fit` (see
  `IntegrationsLayout`), buttons in a flex row need no width class. Real
  call sites use `size="xs"` for hero/section CTAs and `size="xxs"` for
  inline docs actions (feedback buttons).
- **Text**: the only sanctioned type scale (see Typography).
- **Badge** (`fundations/elements/Badge.astro`): `rounded-full` pill with an
  `outline` ring; variants `default`/`muted`/`accent`/`info`/`success`/
  `warning`/`danger`, sizes `sm`/`md`/`lg`; has `w-fit` built in.
- **Header** (`fundations/containers/Header.astro`): the standard page-intro
  panel (h1 `displaySM font-semibold` + `max-w-xl` description on
  `bg-white dark:bg-base-900`); pass extra padding via `innerClass`.
- **Alert**, **Accordion/AccordionItem**, **Tab** components live in
  `fundations/elements/`.
- Icons live in `fundations/icons/` as individual Astro components with a
  `size` prop; add new ones there in the same stroke style, don't import
  icon packs.
- `/system/*` pages (overview, typography, colors, buttons, links, badges,
  alerts) are the theme's living style guide - check them when unsure.

## Corners, borders, shadows

- Radius policy: interactive controls are `rounded-full` pills (Button,
  Badge, ThemeToggle); cards and media panels are `rounded-xl` (the most
  common card radius, 10 uses); `rounded-md` (15 uses) is for small docs UI
  (code-block chrome, inputs, feedback widgets). Nothing is sharp-cornered
  and nothing exceeds `rounded-2xl`.
- Borders do all the structural work: 1px `border-base-200
  dark:border-base-800` hairlines on layout columns, prose images, and code
  blocks. No heavy or colored borders.
- Shadows are near-absent: `shadow-sm` appears only on floating UI (search
  bar, theme toggle, auth form cards). Never shadow cards, sections, or
  images.

## Voice and copy

Developer-docs voice: plain, instructional, benefit-first ("Get up and
running in minutes with our step-by-step guide"). Sentence case everywhere;
link labels are short verbs ("Get started", "Explore", "Read further");
uppercase appears only in the mono meta labels. No exclamation marks, no
emoji, no marketing superlatives.

## Do / Don't

Do:

- Copy an existing section (`landing/GettinStarted.astro`,
  `landing/Resources.astro`) before inventing a new layout.
- Add the `dark:` counterpart for every color, background, and border class.
- Use the mono uppercase meta-label pattern for dates, categories, kickers.
- Keep headings docs-scale: `displaySM` is the h1 ceiling in this shell.

Don't:

- Don't use `displayLG` and larger for heroes - this theme is intentionally
  understated.
- Don't add shadows to cards/sections or borders heavier than 1px.
- Don't use Tailwind `gray`/`slate`/`zinc` - the neutral scale is `base-*`.
- Don't use semantic colors (emerald, rose, cyan, orange) outside
  Button/Badge/Alert variants.
- Don't override the pill radius on buttons or badges, and don't invent new
  radii beyond `rounded-md`/`rounded-xl`/`rounded-full`.

## Quality check before finishing

1. Every new colored class has a `dark:` twin - visually check both themes.
2. Fonts, colors, and spacing all come from existing tokens and match a
   sibling section.
3. Headings use `Text` variants; buttons and badges use component variants.
4. New UI reads correctly at `sm`, `md`, and `lg`; no new dependencies, no
   unused imports, minimal diff.
