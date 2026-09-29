import { getCollection } from "astro:content";

const strip = (s = "") =>
  s
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>\[\]|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export async function GET() {
  const docs = (await getCollection("docs")).map((e) => ({
    title: e.data.title,
    content: e.data.description || strip(e.body).slice(0, 200),
    body: strip(e.body),
    category: e.data.category || "Docs",
    url: `/docs/${e.id}`,
  }));

  const posts = (await getCollection("posts")).map((e) => ({
    title: e.data.title,
    content: e.data.description || strip(e.body).slice(0, 200),
    body: strip(e.body),
    category: "Blog",
    url: `/blog/posts/${e.id}`,
  }));

  return new Response(JSON.stringify([...docs, ...posts]), {
    headers: { "Content-Type": "application/json" },
  });
}
