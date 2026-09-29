# AGENTS.md — Zeroindex (`@lexington/zeroindex`)

**Zeroindex** is a Lexington Themes Astro template for a **product-style marketing and docs site**: a docs-style shell (sidebar, mobile top bar) wraps a **home** landing (`Hero`, getting-started, resources), **blog**, **changelog**, **integrations**, **team**, **legal**, **sign-in / sign-up**, and **system** UI reference pages. Primary use case: **SaaS / developer product** sites that need documentation, content collections, and a component showcase.

**Publisher:** [Lexington Themes](https://lexingtonthemes.com/)  
**Design rules:** [.cursor/skills/zeroindex-design/SKILL.md](./.cursor/skills/zeroindex-design/SKILL.md) - read before creating or changing any UI.  
**Theme specs / bundle / support (from README):** [Zeroindex template](https://lexingtonthemes.com/templates/zeroindex) · [Documentation](https://lexingtonthemes.com/documentation) · [Theme changelog](https://lexingtonthemes.com/changelog/zeroindex) · [Support](https://lexingtonthemes.com/legal/support/) · [Get the bundle](https://lexingtonthemes.com)

---

## Tech stack

| Source | Details |
|--------|---------|
| **package.json** | `astro` ^6.0.0, `tailwindcss` ^4.1.18 + `@tailwindcss/vite` ^4.1.18, `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide`, `@astrojs/mdx` ^5.0.0, `@astrojs/sitemap` ^3.6.0, `@lexingtonthemes/seo` ^0.1.0, `shiki` ^3.20.0, dev: `@shikijs/transformers` ^3.20.0 |
| **astro.config.mjs** | Vite plugin: `@tailwindcss/vite`; integrations: `@astrojs/sitemap`, `@astrojs/mdx` (Shiki + transformers); Markdown: Shiki `css-variables`, same transformers; `drafts: true` for Markdown; redirect `/blog` → `/blog/1`; `site: "https://yourdomain.com"` (placeholder) |
| **Aliases** | `tsconfig.json`: `@/*` → `src/*` |

---

## Folder map

| Path | Role |
|------|------|
| `src/pages/` | File-based routes: content-driven `[...slug]` / `[page]` / `[tag]` plus static pages (`index.astro`, `sign-in`, `sign-up`, `system/*`). |
| `src/layouts/` | `BaseLayout` (global chrome), `DocsLayout` (sidebar shell), and collection layouts (`BlogLayout`, `ChangelogLayout`, etc.). |
| `src/components/` | `fundations/` (design system: head, elements, containers, icons, scripts), `global/navigation`, `global/footers`, `landing/`, `blog/`, `changelog/`, `integrations/`, `team/`, `assets/`. |
| `src/content/` | Markdown/MDX for all collections (`posts`, `docs`, …). |
| `src/styles/` | `global.css` (`@theme` tokens, Tailwind entry), `syntaxhighlighting.css` (imported from `global.css`). |
| `src/images/` | Optimized assets referenced from content (e.g. `blog/`, `changelog/`, `team/`, `integrations/`). |
| `public/` | **Not present** in this repo; `Favicons.astro` still links to root paths like `/favicon.ico` — add a `public/` folder and assets when deploying. |

---

## Content collections (`src/content.config.ts`)

Entry **IDs** come from file paths relative to each folder (`integrations/1` → id `1`; `docs/getting-started/introduction.mdx` → id `getting-started/introduction`). Use **`image()`** fields only with paths Astro can resolve (existing entries use strings like `"/src/images/..."`).

### `integrations`

- **Folder:** `src/content/integrations/` (`.md` only)
- **Schema:** `email`, `integration`, `description`, `permissions` (string array), `details` (array of `{ title, value, url? }`), `logo: { url: image(), alt }`, `tags` (string array)
- **Template:** copy from `src/content/integrations/1.md`

### `docs`

- **Folder:** `src/content/docs/` (`**/*.{md,mdx}`; id = path without extension)
- **Schema:** `title`, `description`, `category`, `order?`, `lastUpdated?` (coerced date)
- **Template:** copy from `src/content/docs/getting-started/introduction.mdx` (MDX can import `@/components/fundations/...`)

### `legal`

- **Folder:** `src/content/legal/` (`.md`)
- **Schema:** `page` (display title string), `pubDate` (date)
- **Template:** copy from `src/content/legal/terms.md`

### `changelog`

- **Folder:** `src/content/changelog/` (`.md`)
- **Schema:** `page` (title), `description`, `pubDate`, `image: { url: image(), alt }`
- **Template:** copy from `src/content/changelog/command-palette.md`

### `team`

- **Folder:** `src/content/team/` (`.md`)
- **Schema:** `name`, `role?`, `bio?`, `image: { url: image(), alt }`, `socials?` (`twitter?`, `website?`, `linkedin?`, `email?`)
- **Template:** copy from `src/content/team/david-lee.md`  
- **Note:** `posts` frontmatter `team` must match a **team entry id** (e.g. `david-lee` for `david-lee.md`).

### `posts` (blog)

- **Folder:** `src/content/posts/` (`.md`)
- **Schema:** `title`, `pubDate`, `description`, `team` (string → `team` collection id), `image: { url: image(), alt }`, `tags` (string array)
- **Template:** copy from `src/content/posts/1.md`

---

## Routing conventions

| URL pattern | Source |
|-------------|--------|
| `/` | `src/pages/index.astro` (landing in `DocsLayout`) |
| `/docs/{slug}` | `docs` collection; slug = entry `id` (e.g. `getting-started/introduction`). Sorted by `category` then `order`. |
| `/blog`, `/blog/1` | `src/pages/blog/[page].astro` (paginated list, 6 per page). Astro redirect sends `/blog` → `/blog/1`. |
| `/blog/posts/{slug}` | `posts` collection; slug = entry `id` (e.g. `1`). |
| `/blog/tags`, `/blog/tags/{tag}` | Tag index and filtered posts. |
| `/integrations`, `/integrations/{slug}` | `integrations` collection; detail slug = numeric/string id from filename. |
| `/changelog`, `/changelog/{slug}` | `changelog` collection; detail slug = entry `id` (e.g. `command-palette`). |
| `/team`, `/team/{slug}` | `team` collection. |
| `/legal/{slug}` | `legal` collection; slug = entry `id` (e.g. `terms`). |
| `/sign-in`, `/sign-up` | Static pages. |
| `/system/*` | Static design/system reference (`overview`, `colors`, `buttons`, …). `overview` lists many routes (note: some links there may be typos or aspirational vs. this tree). |

Dynamic routes use **`[...slug].astro`** for docs, blog posts, changelog, integrations, legal, and team detail pages.

---

## Customization guide

- **Site URL / domain:** `astro.config.mjs` → `site`. Update **placeholders** in `src/components/fundations/head/Seo.astro` (`canonical`, Open Graph, Twitter) to match production; `AstroSeo` comes from `@lexingtonthemes/seo`.
- **Colors / typography:** `src/styles/global.css` → `@theme` block (`--font-sans`, `--font-mono`, `--color-accent-*`, `--color-base-*`). `syntaxhighlighting.css` complements Shiki `css-variables` theming.
- **Shell / docs chrome:** `src/layouts/DocsLayout.astro` (wraps `BaseLayout` with `hideNav` / `hideFooter`, mounts `Sidebar`, `MobileTopBar`, `DesktopTopBar`). **Navigation** for marketing-style top nav: `src/components/global/navigation/Navigation.astro` (`navigationButtons` array). **Sidebar** doc tree: `Sidebar.astro` / `SidebarLinks.astro`.
- **Footer:** `src/components/global/footers/Footer.astro` (`footerLinks` — verify `/docs/...` targets exist under `src/content/docs/` or update hrefs).
- **Global head:** `src/layouts/BaseLayout.astro` imports `@/styles/global.css` and `BaseHead` from `@/components/fundations/head/BaseHead.astro` (SEO, meta, fonts, favicons, scripts).

---

## Commands

From **README**: Node **18 or 20** (LTS), **npm**.

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server (`astro dev`) |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro …` | Astro CLI |

---

## Guardrails

- **Do not rename** `src/components/fundations/` (typo is intentional in this theme).
- **Content schemas:** changing Zod fields in `src/content.config.ts` requires updating every layout/page that reads `entry.data` and any components assuming those props.
- **`image()` fields:** keep valid image sources so `astro:assets` / content pipelines do not break.
- Prefer **small, pattern-matching diffs**; avoid inventing dependencies not in `package.json`.
- **`/rss.xml`:** referenced from `system/overview` but **no RSS route file is present** in this repo — add an endpoint if you need RSS.
