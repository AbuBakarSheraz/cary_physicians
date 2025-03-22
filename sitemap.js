import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL =  "https://caryphysicians.com";
  process.env.NODE_ENV === "https://caryphysicians.com"

const pages = ["", "about", "services", "contact", "blog"]; // Add all static pages here

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${BASE_URL}/${page}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join("\n")}
</urlset>`;

fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapContent, "utf8");

console.log("✅ Sitemap generated successfully at /public/sitemap.xml");
