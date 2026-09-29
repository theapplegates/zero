---
title: "Sidebar Links"
description: "Understanding the sidebar accordion links"
category: "navigation"
order: 2
lastUpdated: 2025-07-01
---



The `SidebarLinks` component handles the navigation structure for each section in the docs sidebar, with collapsible accordion functionality and active state highlighting.

## Usage

Each section (e.g. “Getting Started”, “Components”, etc.) is passed to this component via props:

```ts
interface Props {
  title: string;
  docs: Array<{ slug: string; title: string; order: number }>;
  index: number;
}
````

It expects a list of `docs` belonging to that category, and renders them under a toggleable section.

---

## Accordion Behavior

Each section is collapsed or expanded based on the current page. This logic is handled by:

```ts
const isOpenByDefault =
  docs.some((doc) => currentPath === `/docs/${doc.id}` || currentPath === `/docs/${doc.id}/`) ||
  (title.toLowerCase() === "integrations" && currentPath.startsWith("/integrations")) ||
  (title.toLowerCase() === "changelog" && currentPath.startsWith("/changelog"));
```

This ensures:

* The accordion automatically opens if the current route matches one of its links
* The background highlight fades in when open

---

## Highlight Background

A subtle background overlay appears when a section is open. It’s handled by this block:

```html
<div
  class="absolute inset-y-0 left-0 right-0 bg-base-50 dark:bg-white/2 rounded-md transition-all duration-300 z-0"
  data-background
  aria-hidden="true"
></div>
```

This layer is placed behind the content using `z-0` so the button and nav remain clickable.

---

## Toggle Button

The section header is rendered as a styled button:

```html
<button
  class="relative w-full px-4 py-2.5 text-left text-xs font-medium text-base-900 dark:text-white z-10"
  data-accordion-trigger
  aria-expanded={isOpenByDefault}
>
  {title}
</button>
```

This button toggles the visibility of the section’s links and updates `aria-expanded`.

---

## Content Area

The links are wrapped inside a `div.accordion-content`, which is animated using `height`, `opacity`, and `transform`:

```html
<div
  class="overflow-hidden accordion-content transition-all duration-500 ease-in-out"
  style={`height: ${isOpenByDefault ? "auto" : "0"}; opacity: ${isOpenByDefault ? "1" : "0"}; transform: translateY(${isOpenByDefault ? "0" : "-0.5rem"})`}
>
  <nav> ... </nav>
</div>
```

JavaScript handles toggling these styles smoothly.

---

## Link Highlighting

Each link uses active state styling if the current path matches:

```tsx
const isActive = currentPath === href || currentPath === `${href}/`;
```

Links get a colored left border and updated text color when active:

```html
<a
  class={`block px-3 ml-4 py-2 text-xs border-l ${
    isActive
      ? "border-l-accent-500 dark:border-l-accent-400 text-base-600 font-medium"
      : "border-l-base-300 dark:border-l-base-500 text-base-500 hover:text-base-600"
  }`}
>
  {doc.title}
</a>
```

---

## JavaScript Interactivity

Accordion toggling is powered by a small script:

```js
document.addEventListener("astro:page-load", initializeAccordions);
document.addEventListener("DOMContentLoaded", initializeAccordions);

function initializeAccordions() {
  const sections = document.querySelectorAll(".accordion-section");

  sections.forEach((section) => {
    const toggle = section.querySelector("[data-accordion-trigger]");
    const content = section.querySelector(".accordion-content");
    const background = section.querySelector("[data-background]");

    toggle?.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";

      sections.forEach((s) => {
        // collapse others
      });

      // toggle current
      if (isOpen) {
        ...
      } else {
        ...
      }
    });
  });
}
```

This ensures:

* Only one section is open at a time
* Animations apply smoothly
* `aria-expanded` reflects state

---

## Accessibility Notes

* Uses semantic `<button>` for toggling
* Manages `aria-expanded` attributes
* Keyboard and screen reader friendly

---

## Customization

You can:

* Change the section background (`data-background`)
* Override transitions via Tailwind utilities
* Customize the `SidebarLinks.astro` to remove the JS and use native `<details>` if desired

---

## Troubleshooting

* **Accordion not clickable?** Check `z-index` and `data-background` isn’t covering the button
* **Not toggling?** Ensure JS runs on `astro:page-load` and `DOMContentLoaded`
* **Wrong links opening?** Ensure `slug` values in frontmatter match sidebar structure

---

## Example

```astro
<SidebarLinks
  title="Components"
  docs={[
    { slug: "button", title: "Button", order: 1 },
    { slug: "badge", title: "Badge", order: 2 },
  ]}
  index={1}
/>
```

---

This component powers all dynamic navigation in the sidebar and is designed to work seamlessly with content collections.

