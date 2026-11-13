import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const key = '4a9b8c7d6e5f40392817263544332211';
const host = 'voyagerroctechnologies.com';

const sitemapFile = path.join(dist, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) {
  console.error('[indexnow] sitemap.xml not found');
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapFile, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`[indexnow] Submitting ${urls.length} URLs to IndexNow...`);

const payload = {
  host,
  key,
  keyLocation: `https://${host}/${key}.txt`,
  urlList: urls,
};

async function submitIndexNow() {
  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });
      console.log(`[indexnow] ${endpoint} -> HTTP ${res.status}`);
    } catch (err) {
      console.warn(`[indexnow] ${endpoint} submission error:`, err.message);
    }
  }
}

try {
  await submitIndexNow();
  console.log('[indexnow] Submission completed.');
} catch (err) {
  console.error('[indexnow] Fatal error during submission:', err);
  process.exitCode = 1;
}
