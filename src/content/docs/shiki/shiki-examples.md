---
title: "Shiki anotations usage examples"
description: "Simple examples to get you started with basic functionality."
category: "shiki"
order: 1
lastUpdated: 2025-07-01
---

## Hello World

The simplest possible example:

```js
import { initialize } from "our-package"; // [!code ++]

// Initialize
const app = initialize({
  // [!code ++]
  apiKey: "your-api-key", // [!code ++]
  environment: "development", // [!code ++]
}); // [!code ++]

// Make your first call
const result = await app.getData(); // [!code ++]
console.log("Hello World:", result); // [!code ++]
```

---

## Fetching Data

Retrieve data with filtering and pagination:

```js
const activeItems = await app.getData({
  // [!code focus]
  limit: 10, // [!code focus]
  filter: { status: "active" }, // [!code focus]
}); // [!code focus]

console.log(`Found ${activeItems.length} active items`);

const nextPage = await app.getData({
  limit: 10,
  offset: 10,
  filter: { status: "active" },
});
```

---

## Creating Data

Create new entries:

```js
const newItem = await app.createData({
  // [!code ++]
  name: "My First Item", // [!code ++]
  description: "This is a test item", // [!code ++]
  category: "example", // [!code ++]
  tags: ["test", "demo"], // [!code ++]
}); // [!code ++]

console.log("Created item:", newItem.id);

const items = [
  { name: "Item 1", category: "type-a" },
  { name: "Item 2", category: "type-b" },
  { name: "Item 3", category: "type-a" },
];

for (const item of items) {
  await app.createData(item);
}
```

---

## Updating Data

Update existing entries:

```js
await app.updateData("item-123", {
  status: "active", // [!code --]
  status: "completed", // [!code ++]
});

await app.updateData("item-456", {
  name: "Updated Name", // [!code ++]
  description: "Updated description",
  lastModified: new Date(),
});
```

---

## Error Handling

Handle errors gracefully:

```js
try {
  // [!code ++]
  const data = await app.getData(); // [!code ++]
  console.log("Success:", data); // [!code ++]
} catch (error) {
  // [!code ++]
  if (error.code === "AUTH_REQUIRED") {
    // [!code ++]
    console.error("Please check your API key"); // [!code ++]
  } else if (error.code === "RATE_LIMITED") {
    // [!code ++]
    console.error("Too many requests, please wait"); // [!code ++]
  } else {
    // [!code ++]
    console.error("Unexpected error:", error.message); // [!code ++]
  } // [!code ++]
} // [!code ++]
```

---

## Working with Filters

Advanced filtering examples:

```js
const searchResults = await app.getData({
  filter: {
    name: { contains: "search term" }, // [!code focus]
  },
});

const recentItems = await app.getData({
  filter: {
    createdAt: {
      gte: new Date("2024-01-01"),
      lte: new Date("2024-12-31"),
    },
  },
});

const complexFilter = await app.getData({
  filter: {
    status: "active",
    category: { in: ["type-a", "type-b"] },
    priority: { gte: 5 },
  },
});
```

---

## Before and After Example

Show what changes when refactoring:

```js
// Old way
const oldConfig = {
  // [!code --]
  apiEndpoint: "https://api.old.com", // [!code --]
  timeout: 5000, // [!code --]
  retries: 3, // [!code --]
}; // [!code --]

// New way
const newConfig = {
  // [!code ++]
  baseURL: "https://api.new.com/v2", // [!code ++]
  timeout: 10000, // [!code ++]
  retries: 5, // [!code ++]
  cache: true, // [!code ++]
}; // [!code ++]
```

---

## CSS Example (using JavaScript syntax for highlighting)

Since Shiki annotations don't work well with CSS, we use JS syntax:

```js
// Before
"@tailwind base;"; // [!code --]
"@tailwind components;"; // [!code --]
"@tailwind utilities;"; // [!code --]

// After
"@import 'tailwindcss';"; // [!code ++]
```
