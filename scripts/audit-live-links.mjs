import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Read-only HTTP audit. No forms, messages or authenticated actions are submitted.
const origin = 'https://voyagerroctechnologies.com';
const reportPath = process.argv[2] || 'qa/link-audit.json';
const cache = new Map();
const decode = value => value.replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
async function get(url) {
  if (!cache.has(url)) cache.set(url, (async () => {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
      const bytes = Buffer.from(await response.arrayBuffer());
      return { url, status: response.status, finalUrl: response.url, type: response.headers.get('content-type') || '', bytes };
    } catch (error) { return { url, status: null, error: error.message, cause: error.cause?.code }; }
  })());
  return cache.get(url);
}
async function batch(items, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += 6) results.push(...await Promise.all(items.slice(i, i + 6).map(fn)));
  return results;
}
const sitemap = await get(origin + '/sitemap.xml');
if (sitemap.status !== 200) throw Error('Cannot read live sitemap: ' + JSON.stringify(sitemap));
const pages = [...sitemap.bytes.toString().matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decode(m[1]));
const bodies = await batch(pages, get);
const targets = new Map();
for (const page of bodies) {
  if (!page.bytes) continue;
  for (const [, raw] of page.bytes.toString().matchAll(/\b(?:href|src|poster)\s*=\s*["']([^"']+)["']/gi)) {
    const value = decode(raw);
    let url;
    try { url = new URL(value, page.finalUrl); } catch { continue; }
    if (!['https:', 'http:'].includes(url.protocol)) continue;
    const key = url.href;
    if (!targets.has(key)) targets.set(key, []);
    targets.get(key).push(page.url);
  }
}
const links = await batch([...targets], async ([href, sources]) => {
  const url = new URL(href), hash = url.hash; url.hash = '';
  const result = await get(url.href);
  let fragment = null;
  if (hash && url.origin === origin && result.type?.includes('text/html') && result.bytes) {
    const id = decodeURIComponent(hash.slice(1));
    fragment = [...result.bytes.toString().matchAll(/\b(?:id|name)\s*=\s*["']([^"']+)["']/gi)].some(m => decode(m[1]) === id) ? 'present' : 'needs_browser_check';
  }
  return { href, sources: [...new Set(sources)], status: result.status, finalUrl: result.finalUrl, error: result.error, cause: result.cause, fragment };
});
const files = fs.readdirSync('dist', { recursive: true }).filter(f => fs.statSync(path.join('dist', f)).isFile() && !['_headers', '_redirects'].includes(f));
const parity = await batch(files, async file => {
  const route = '/' + file.replaceAll('\\', '/').replace(/index\.html$/, '');
  const live = await get(origin + route), local = fs.readFileSync(path.join('dist', file));
  const hash = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
  return { file: file.replaceAll('\\', '/'), status: live.status, exactMatch: !!live.bytes && hash(local) === hash(live.bytes) };
});
const issues = links.filter(l => l.status === null || l.status >= 400 || l.fragment === 'needs_browser_check');
const report = { checkedAt: new Date().toISOString(), sitemapPages: pages.length, uniqueLinks: links.length, pages: bodies.map(p => ({ url: p.url, status: p.status })), links, issues, parity, limitations: ['Static href/src/poster links from live sitemap pages; script-generated links need browser checks.', 'External login, bot protection and test enrollment restrictions are not automatically broken links.', 'mailto/tel are not sent or dialed; delivery is not tested.'] };
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ sitemapPages: pages.length, uniqueLinks: links.length, issues, parityMismatches: parity.filter(p => !p.exactMatch) }, null, 2));
if (bodies.some(p => p.status !== 200) || links.some(l => new URL(l.href).origin === origin && (l.status === null || l.status >= 400))) process.exitCode = 1;
