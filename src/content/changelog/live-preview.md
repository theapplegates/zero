---
pubDate: 2025-05-25
page: Live Preview with Hot Reload
description: "Instantly see your changes as you code. Our new Live Preview engine includes hot reload, error overlays, and mobile view testing—no build step required."
image:
  url: "/src/images/changelog/2.jpg"
  alt: "your alt text"
---

We're rolling out **Live Preview**, a fast and responsive real-time rendering engine that dramatically speeds up your development workflow.

## Instant Feedback

Live Preview renders your updates immediately in the browser — no build step, no manual refresh. Just code and see the result.

- Changes to HTML, CSS, Markdown, and components are reflected instantly.
- Built-in error overlays surface bugs as they happen, without breaking your flow.

## Hot Reload Support

Unlike traditional dev servers that fully reload the page, our system preserves app state with **hot module replacement (HMR)**. Edit a component and it updates in place — no lost inputs, scroll position, or context.

## Responsive View Testing

Switch between desktop, tablet, and mobile previews without leaving the editor. You can now simulate different screen sizes to test layout behavior and breakpoint consistency.

## Works Offline

The new system is fully local. Everything works even if you disconnect from the internet — perfect for travel, remote environments, or spotty networks.

## Behind the Scenes

Live Preview is powered by a combination of:
- WebSockets for real-time communication
- Lightweight Vite-based server
- In-memory filesystem caching for speed

---

This release makes it easier than ever to prototype, debug, and itera
