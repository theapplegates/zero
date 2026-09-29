---
title: "Shiki Code Highlighting"
description: "How syntax highlighting and styling works in ZeroIndex"
category: "shiki"
order: 2
lastUpdated: 2025-07-01
---

# Shiki Code Highlighting

This guide explains how Shiki-powered code highlighting is styled in your project, including line numbers, token colors, diff/focus annotations, and light/dark mode theming.

---

## Line Numbers

Line numbers are rendered using CSS `counter-increment`:

```css
code {
  counter-reset: step;
  counter-increment: step 0;
}
code .line::before {
  content: counter(step);
  counter-increment: step;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: right;
  padding-left: 0.5rem;
  color: theme(colors.base.400);
}
````

Each line increases the `step` counter, and numbers are displayed using a `::before` pseudo-element with right alignment and light color.

---

## ➕➖ Diff Annotations

Shiki supports diff annotations via custom classes, enabled with `transformerNotationDiff`:

```css
.diff.add {
  background-color: oklch(77.7% 0.152 181.912 / 10%) !important;
  border-left: 1px solid theme(colors.teal.500) !important;
}
.diff.remove {
  background-color: oklch(83.3% 0.145 321.434 / 10%) !important;
  border-left: 1px solid theme(colors.fuchsia.500) !important;
}
```

* `.diff.add` highlights added lines with a soft teal background
* `.diff.remove` highlights removed lines with a light pink-red background
* A colored border on the left makes the change stand out visually

---

## Focus & Highlight Lines

Two optional features from Shiki’s `transformerNotationFocus` and `transformerMetaHighlight`:

```css
.focused {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-left: 1px solid #0366d6 !important;
}

.highlighted {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
```

These styles:

* Apply emphasis (usually during tutorials or documentation walkthroughs)
* Are compatible with light and dark themes, with slight variations

Dark mode overrides ensure proper contrast:

```css
:root.dark .focused {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
:root.dark .highlighted {
  background-color: rgba(255, 255, 255, 0.02) !important;
}
```

---

## Token Colors via CSS Variables

Shiki uses [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) (`--astro-code-token-*`) to define how different parts of code are colored.

These are declared globally in `:root` and overridden in `:root.dark`:

```css
:root {
  --astro-code-token-keyword: theme(colors.accent.700);
  --astro-code-token-string: theme(colors.lime.700);
  --astro-code-token-function: theme(colors.blue.700);
  ...
}

:root.dark {
  --astro-code-token-keyword: theme(colors.accent.300);
  --astro-code-token-string: theme(colors.lime.300);
  --astro-code-token-function: theme(colors.blue.300);
  ...
}
```

Examples:

* Keywords like `if`, `return`, `import` → `--astro-code-token-keyword`
* Strings → `--astro-code-token-string`
* Booleans & numbers → `--astro-code-token-boolean` / `--astro-code-token-number`
* HTML attributes → `--astro-code-token-attr-name` / `--astro-code-token-attr-value`
* Comments → `--astro-code-token-comment`

This allows precise, theme-consistent customization and clean overrides between light/dark modes.

---

## Supported Token Categories

You can customize colors for every syntax category Shiki supports:

| Token                 | Example                     |
| --------------------- | --------------------------- |
| `keyword`             | `if`, `return`, `export`    |
| `string`              | `"hello"`, `'world'`        |
| `function`            | `console.log`               |
| `variable`            | `count`, `myValue`          |
| `boolean`, `number`   | `true`, `42`                |
| `attr-name/value`     | `href="..."`, `class="..."` |
| `tag`, `selector`     | `<div>`, `body {}`          |
| `comment`             | `// note`, `/* block */`    |
| `deleted`, `inserted` | from diff syntax blocks     |

---

## Summary

*  Use `transformerNotation*` for advanced line highlighting
*  Define global CSS tokens for light/dark code themes
*  Enable line numbers with simple counter CSS
*  Easily style added/removed/active lines for guides or diffs
* Fully accessible with semantic highlighting classes

This setup is modern, flexible, and consistent across themes and modes.

