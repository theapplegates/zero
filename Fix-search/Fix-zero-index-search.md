Both files are attached above:

SearchBar.astro → replaces src/components/global/navigation/SearchBar.astro
search.json.js → save as src/pages/search.json.js (new file)




Since you weren't seeing results, a couple of likely causes to check after dropping these in:

Dev server needs a restart after adding search.json.js — Astro has to pick up the new route.
Visit /search.json directly in the browser (e.g. http://localhost:4321/search.json) to confirm it returns JSON with your docs and posts. If it 404s, the file isn't in src/pages/ or isn't named exactly search.json.js.
Check the browser console in the search modal for a fetch error — if /search.json returns HTML (a 404 page) instead of JSON, .json() will throw and the results panel will just stay empty with no visible error unless you have devtools open.
Collection name mismatch — if getCollection("posts") throws, that endpoint will fail entirely. Confirm posts is the exact collection name in src/content.config.ts.

If it's still not showing items after that, paste what /search.json returns (or the console error) and I'll narrow it down.

