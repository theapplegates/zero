---
title: "Sidebar"
description: "Understanding the sidebar"
category: "navigation"
order: 1
lastUpdated: 2025-07-01
---



The sidebar provides organized navigation for your documentation site with collapsible sections and active state management.

## How It Works

The sidebar automatically generates navigation based on two sources:

### 1. Dynamic Content from Collections
- Reads all documents from the `docs` content collection
- Groups documents by their `category` frontmatter field
- Sorts documents within each category by their `order` field
- Only displays categories defined in `categoryConfig`

### 2. Static Links
- Hardcoded links that appear at the bottom of the navigation
- Always visible regardless of category configuration

## Adding or Removing Document Categories

### To Add a New Category

1. **Add to categoryConfig**: Edit the `categoryConfig` object in your sidebar component:

```javascript
const categoryConfig = {
  "getting-started": { name: "Getting Started", order: 1 },
  "components": { name: "Components", order: 2 },
  "examples": { name: "Examples", order: 3 },
  "new-category": { name: "My New Section", order: 4 }, // Add this line
  "help": { name: "Help & Support", order: 5 },
};
```

2. **Create documents**: Create markdown files in your `src/content/docs/` folder with the matching category:

```markdown
---
title: "My New Document"
category: "new-category"  # Must match the key in categoryConfig
order: 1
---

Content here...
```

### To Remove a Category

Simply remove or comment out the category from `categoryConfig`:

```javascript
const categoryConfig = {
  "getting-started": { name: "Getting Started", order: 1 },
  "components": { name: "Components", order: 2 },
  // "examples": { name: "Examples", order: 3 }, // Removed
  "help": { name: "Help & Support", order: 4 },
};
```

Documents with the removed category will be automatically filtered out and won't appear in the sidebar.

## Adding or Removing Static Links

Edit the `staticLinks` array at the top of the sidebar component:

```javascript
const staticLinks = [
  { href: "/integrations", title: "Integrations" },
  { href: "/changelog", title: "Changelog" },
  { href: "/infopages/licensing", title: "Licensing" },
  { href: "/new-page", title: "New Page" }, // Add new link
];
```

To remove a static link, simply delete or comment out the corresponding line.

## Document Ordering

### Within Categories
Documents are sorted by their `order` frontmatter field:

```markdown
---
title: "First Document"
category: "guides"
order: 1  # Will appear first
---
```

```markdown
---
title: "Second Document" 
category: "guides"
order: 2  # Will appear second
---
```

### Category Ordering
Categories are sorted by the `order` value in `categoryConfig`:

```javascript
const categoryConfig = {
  "getting-started": { name: "Getting Started", order: 1 }, // First
  "components": { name: "Components", order: 2 },           // Second
  "help": { name: "Help & Support", order: 3 },             // Third
};
```

## Active States

The sidebar automatically highlights:
- **Active category sections**: When viewing a document from that category
- **Active document links**: When viewing that specific document
- **Active static links**: When on that specific page

This is handled automatically based on the current URL path.

## Accordion Behavior

- Only one category section can be open at a time
- Clicking a category header toggles that section
- The active category (containing the current page) opens automatically
- Smooth animations for expand/collapse transitions

## Special Category Handling

Some categories have special behavior in the `SidebarLinks` component:

- **Integrations**: Shows a "View Integrations" link
- **Changelog**: Shows a "View Changelog" link

These are hardcoded in the `SidebarLinks.astro` component and will need manual updates if you rename these categories.

## File Structure

```
src/
├── content/
│   └── docs/
│       ├── getting-started/
│       │   ├── installation.md
│       │   └── quick-start.md
│       ├── components/
│       │   ├── buttons.md
│       │   └── forms.md
│       └── help/
│           └── faq.md
└── components/
    └── global/
        └── navigation/
            ├── Sidebar.astro        # Main sidebar component
            └── SidebarLinks.astro   # Individual category sections
```

## Troubleshooting

### Links Not Clickable
If accordion buttons become unclickable, ensure:
1. Only one accordion script is running (remove script from `SidebarLinks.astro` if present)
2. The main sidebar script has proper event listener initialization
3. All required CSS classes are present

### Category Not Showing
If a category doesn't appear:
1. Check that it's defined in `categoryConfig`
2. Verify documents have the correct `category` frontmatter
3. Ensure the category key matches exactly (case-sensitive)

### Wrong Order
If items appear in the wrong order:
1. Check `order` values in document frontmatter
2. Verify `order` values in `categoryConfig`
3. Remember that lower numbers appear first