// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import process from "node:process";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerMetaHighlight,
} from "@shikijs/transformers";
import rehypeCloudinaryPicture from "./src/plugins/rehype-cloudinary-picture.mjs";

const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "PUBLIC_");

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    drafts: true,
    syntaxHighlight: "shiki",
    rehypePlugins: [
      [rehypeCloudinaryPicture, { cloudName: env.PUBLIC_CLOUDINARY_CLOUD_NAME }],
    ],
    shikiConfig: {
      theme: "css-variables",
      transformers: [
        transformerNotationDiff({
          // Make sure these match your CSS classes
          classLineAdd: "diff add",
          classLineRemove: "diff remove",
        }),
        transformerNotationFocus({
          classActiveLine: "focused",
        }),
        transformerMetaHighlight(),
      ],
      wrap: false,
    },
  },
  site: "https://zero.paulapplegate.com",
  integrations: [
    sitemap(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "css-variables",
        transformers: [
          transformerNotationDiff({
            classLineAdd: "diff add",
            classLineRemove: "diff remove",
          }),
          transformerNotationFocus({
            classActiveLine: "focused",
          }),
          transformerMetaHighlight(),
        ],
        wrap: true,
      },
    }),
  ],
});
