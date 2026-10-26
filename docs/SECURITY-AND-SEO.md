# Security and search configuration

This document describes the portfolio website. It is not a security certification for linked applications, customer projects or future SaaS services.

## Exposure and controls

The deployment serves static files. A small stateless edge guard enforces HTTPS and the canonical hostname, permits GET/HEAD and forwards asset responses. There is no business API, login, database, upload endpoint, visitor-submitted HTML or runtime secret. No remote script, font, embedded frame or 3D model is required. Product dialogs escape displayed project data. There is no advertising integration. A later change adds privacy-choice storage, minimized custom security records and an INACTIVE optional telemetry endpoint; see [privacy operations](PRIVACY-OPERATIONS.md) for its gates and legal verification limits.

`scripts/build-site.mjs` emits `dist/_headers`. The content security policy permits scripts from the same origin and exact hashes of the generated JSON-LD blocks. Inline event handlers, `eval`, remote scripts, frames, plugins, workers and form submissions are not allowed. Inline styles remain permitted because the scene and dialog UI set style properties. This is a deliberate limit of the policy, not a claim that every injection risk is eliminated.

HSTS is scoped to this hostname, without `includeSubDomains` or preload, to avoid changing unrelated applications. Other headers include `nosniff`, `DENY` frame protection, `no-referrer`, same-origin opener/resource isolation and restricted browser permissions. `no-transform` is retained to prevent the previously observed automatic browser-measurement injection. The edge guard applies these headers to asset and guard responses; `_headers` alone would not cover Worker-generated responses. Response headers must be verified on the deployed hostname, not assumed from a local file.

`404.html` provides a real not-found response on Workers Static Assets. Requests for `.env`, Git metadata and nonexistent administrative paths must not receive the home page or an application shell. `.well-known/security.txt` provides a vulnerability-reporting contact; it does not promise a bounty or legal safe harbour.

The Undici dependency used by Miniflare is pinned through an override to patched `7.30.1`. Wrangler remains pinned to `4.152.0`. A clean `npm ci --ignore-scripts` and full `npm audit` returned zero reported vulnerabilities on 25 October 2026. This is a dated dependency check, not a guarantee of future safety. Development packages are not shipped in `dist/`.

## Account controls remain separate

Site source cannot establish whether Cloudflare, GitHub, the domain registrar or email accounts have passkeys/MFA enabled. These settings were not changed or certified in this task. Their recovery methods, permissions, tokens and authorised devices should be reviewed in the account dashboards. Protecting the deployment account is essential even when the site itself is static.

Cloudflare supplies the hosting edge. No paid WAF product, managed challenge, custom rate limit, account-wide firewall policy or DDoS service tier was enabled or claimed here. Rules that challenge all visitors can also interfere with search crawling; make such changes against observed traffic and verify crawler access.

## Search configuration

- The primary canonical host is `https://voyagerroctechnologies.com`.
- Five featured products have static, crawlable Turkish pages at `/urunler/{id}/`, linked directly from the main page. Their status and limitations come from the same public product data as the dialogs.
- Sitemap contains the home page, nine legal pages, five product pages and three project approach pages. The dates describe this content revision and are not refreshed on every request.
- Homepage JSON-LD describes a WebSite, a Brand and a five-item portfolio. Product pages use WebPage/CreativeWork and visible breadcrumbs with BreadcrumbList. Project approach pages use WebPage. No registered corporation, address, rating, price, review, successful subscription launch or customer count is invented.
- Open Graph and social-card metadata use a local 1200×630 brand visual. Titles, descriptions, visible content and canonical URLs refer to the same products.
- `robots.txt` permits crawling and supplies the sitemap. HTTP and the alternate Workers hostname return a permanent 308 redirect to the canonical HTTPS host. Redirects also carry `X-Robots-Tag: noindex, follow`.
- TR/EN is a browser UI switch on one URL, not two independently served language routes. No misleading `hreflang` links are added. The crawlable default content and product pages are Turkish.

The guard runs before static assets, so requests consume the account’s normal Worker request allowance; no paid service was purchased.

A public Google Search Console HTML ownership-verification tag is present on the homepage for the HTTPS URL-prefix property. This is not a tracking script or a private signing key. The domain property still requires DNS verification; the deployment OAuth token does not grant DNS access. Record Google-confirmed ownership, sitemap and indexing outcomes in docs/SEARCH-OPERATIONS.md. Search engines decide when to crawl, index and display results; no ranking guarantee or fabricated performance score is offered.

## Build and verify

Run `npm run build` after changing product data or HTML. It regenerates legal pages, product pages, metadata, the sitemap and the CSP hashes as a unit. Then run `npm run check` and `npm run check:search`. `npm run deploy` invokes both through `predeploy`.

Browser QA should cover the real response headers, JSON-LD parsing, canonical URLs, all product pages, missing-path status codes, both UI languages, paused/reduced motion, WebGL fallback, offscreen suspension and phone layouts. Native-device GPU performance and a professional penetration test are outside the checks performed here.

Primary references: [Cloudflare static headers](https://developers.cloudflare.com/workers/static-assets/headers/), [Google structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [Google robots directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

## Product evidence update
A self-hosted, silent PayRadar demo uses sample records and actual browser UI. MP4 is user-initiated (`preload="none"`, no autoplay), with optional Turkish captions and a visible text summary. CSP allows only same-origin media; fullscreen is allowed only for the site itself. No remote video embed or analytics script was introduced. The technical case page at `/notlar/payradar-web-push-bildirimleri/` records the tested workerd fix and distinguishes provider acceptance from physical-phone delivery. Sitemap now has 19 pages.

## Progressive 3D and image delivery
Header logo and scene poster use stripped-metadata WebP derivatives; original brand assets are preserved. The scene loader paints the poster before loading the bundled, minified Three.js module. Reduced-motion and save-data users retain the poster until explicit opt-in. Visible content is no longer dimmed for scroll entrance effects; transforms retain the motion. Scene role and visual button names were corrected for accessibility. Bundling preserves the upstream license and emits no source map. This deployment adds neither trackers nor external scripts. Performance is measured with Lighthouse lab runs; those are not field Core Web Vitals or proof of ranking.
