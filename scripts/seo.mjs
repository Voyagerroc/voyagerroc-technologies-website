// Shared search-engine helpers: hreflang links and an honest, generated sitemap.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const XHTML_NS = 'http://www.w3.org/1999/xhtml';
const SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

/** Reciprocal language annotations for a Turkish/English page pair. Turkish is the default. */
export function hreflangLinks(origin, trRoute, enRoute) {
  return [['tr', trRoute], ['en', enRoute], ['x-default', trRoute]]
    .map(([lang, route]) => '<link rel="alternate" hreflang="' + lang + '" href="' + origin + route + '">')
    .join('');
}

/** Replace any existing hreflang annotations in a page head with the given pair. */
export function setHreflang(html, origin, trRoute, enRoute) {
  return html
    .replace(/<link rel="alternate" hreflang="[^"]+"[^>]*>/g, '')
    .replace('</head>', hreflangLinks(origin, trRoute, enRoute) + '</head>');
}

const attribute = (html, pattern) => html.match(pattern)?.[1];

function readPage(file) {
  const html = fs.readFileSync(file, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  return {
    html,
    canonical: attribute(head, /<link rel="canonical" href="([^"]+)"/),
    noindex: /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(head),
    alternates: [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map(([, lang, href]) => [lang, href])
  };
}

/**
 * Fingerprint what a visitor or crawler can read. Markup-only changes (asset
 * hashes, injected consent assets) must not look like a content update.
 */
export function contentFingerprint(html) {
  const title = attribute(html, /<title>([^<]*)<\/title>/) || '';
  const description = attribute(html, /<meta name="description" content="([^"]*)"/) || '';
  const body = html.slice(html.indexOf('<body'))
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return crypto.createHash('sha256').update(title + '\n' + description + '\n' + body).digest('hex').slice(0, 16);
}

function indexablePages(dist, origin) {
  const pages = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name === 'index.html') {
        const route = '/' + path.relative(dist, dir).split(path.sep).join('/');
        const url = origin + (route === '/' ? '/' : route + '/');
        const page = readPage(file);
        // Only self-canonical, indexable pages belong in a sitemap.
        if (!page.noindex && page.canonical === url) pages.push({url, ...page});
      }
    }
  })(dist);
  return pages.sort((a, b) => a.url.localeCompare(b.url, 'en'));
}

/**
 * Write dist/sitemap.xml from the built pages.
 *
 * `lastmod` only advances when a page's readable content changes; the dates
 * live in a committed manifest so repeated builds do not fake freshness.
 */
export function writeSitemap({dist, origin, manifestFile, today = new Date().toISOString().slice(0, 10)}) {
  const sitemapFile = path.join(dist, 'sitemap.xml');
  const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {};
  // First run only: keep the dates that were already published.
  const published = fs.existsSync(sitemapFile)
    ? new Map([...fs.readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(([, url, date]) => [url, date]))
    : new Map();
  const pages = indexablePages(dist, origin);
  const known = new Set(pages.map(page => page.url));
  const next = {};
  const entries = pages.map(page => {
    const hash = contentFingerprint(page.html);
    const previous = manifest[page.url];
    const lastmod = previous ? (previous.hash === hash ? previous.lastmod : today) : (published.get(page.url) || today);
    next[page.url] = {hash, lastmod};
    for (const [lang, href] of page.alternates) {
      if (!known.has(href)) throw Error('hreflang ' + lang + ' of ' + page.url + ' points to a page outside the sitemap: ' + href);
    }
    const alternates = page.alternates.map(([lang, href]) => '<xhtml:link rel="alternate" hreflang="' + lang + '" href="' + href + '"/>').join('');
    return '<url><loc>' + page.url + '</loc><lastmod>' + lastmod + '</lastmod>' + alternates + '</url>';
  });
  fs.writeFileSync(sitemapFile, '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="' + SITEMAP_NS + '" xmlns:xhtml="' + XHTML_NS + '">\n' + entries.join('\n') + '\n</urlset>\n');
  fs.writeFileSync(manifestFile, JSON.stringify(next, null, 2) + '\n');
  return pages.map(page => page.url);
}
