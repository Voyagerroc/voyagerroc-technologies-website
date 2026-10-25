# Voyagerroc Technologies

Corporate website for a product ecosystem spanning evidence-led recruitment, personal finance, Bluetooth communication, research and operations.

**Website:** https://voyagerroctechnologies.com  
**Cloudflare origin:** https://voyagerroc-technologies.voyagerroc.workers.dev

The website runs independently on **Cloudflare Workers Static Assets**. It does not require OpenAI Sites, an OpenAI account, or an AI API key. All runtime scripts, fonts and 3D assets are served from the same origin.

## What is included

- Turkish and English content, project search, filters and product detail dialogs.
- Featured products: EIP, PayRadar, LaserDeck PTT, Pharos Onion Researcher and Bungalow OS.
- A native-scroll product story linked to one Three.js scene, with five distinct product modules.
- Mobile layouts, keyboard navigation, motion pause, reduced-motion support and a static WebGL fallback.
- Android test links for EIP, PayRadar and LaserDeck. Test links do not imply a public production release; eligibility is managed by each application.

Some product visuals are explicitly labelled schematic or use sample data. Product statuses describe current scope rather than claiming every workflow passed end-to-end testing.

## Run locally

Install Node.js 20 or later, then:

```sh
npm ci
npm run dev
```

Open http://localhost:8890. The static files are in `dist/`; there is no application build step. Use an HTTP server rather than opening `index.html` directly because the 3D scene uses JavaScript modules.

```sh
npm run check
```

This checks JavaScript syntax. Browser checks should also cover both languages, mobile navigation, all five story steps, product dialogs, reduced motion and WebGL failure. No real-device FPS or Lighthouse score is claimed.

## Deploy to your own Cloudflare account

1. Change `name` in `wrangler.jsonc` to a unique Worker name.
2. Remove `routes`, or replace the hostname with a domain you control in an active Cloudflare zone.
3. Replace company content, branding, contact addresses, canonical/social URLs, `robots.txt` and `sitemap.xml` for your deployment.
4. Authenticate and deploy:

```sh
npx wrangler login
npm run deploy
```

For a first deployment, omit `routes` and verify the returned `workers.dev` address before adding a custom domain. A `custom_domain: true` route lets Cloudflare manage the Worker domain binding and certificate. Preserve unrelated DNS and email records. OpenAI verification TXT records and OpenAI Sites A targets are not used by this deployment.

Deployments are manual from the CLI; this repository does not configure automatic GitHub deployment or require a stored API token.

## Project structure

```text
dist/
  index.html             Page structure and static story content
  app.js                 Languages, search, filters and product dialogs
  motion.js / motion.css Scroll story and progressive motion
  scene.js               Three.js scene and product modules
  data/projects.js       Curated public product data
  assets/                Images, logo, icons and self-hosted fonts
  vendor/                Three.js modules and license
brand/                   Separate master PNG logo copy
wrangler.jsonc           Cloudflare static deployment and custom domain
```

The logo PNG is a raster brand asset, not a vector master. Fonts and Three.js retain their included upstream license files. No general open-source license is granted for the original code or brand assets in this repository. Replace Voyagerroc branding and product content before publishing a derivative site.

**Contact:** voyagerroc@voyagerroctechnologies.com

## Preview

![Voyagerroc Technologies desktop website](docs/preview-desktop.png)

[Mobile preview](docs/preview-mobile.png)

## Development dependency note

The deployed site has no npm runtime dependencies. The pinned Wrangler development tool currently reports three transitive audit findings (two moderate, one high, through Miniflare/Undici). These packages are used by local tooling and are not shipped in `dist/`. Review upstream fixes before exposing a local development server; it should remain bound to localhost.

## Legal content and privacy controls

The legal centre is served at `/yasal/`, with static Turkish notices for KVKK, privacy, browser storage, terms, intellectual property, data requests and operator contact. It covers this portfolio site, not all linked applications. The operator identity appears only where the legal notices require it; the main page uses the brand name.

Edit `content/legal.mjs`, then run `npm run build:legal` to regenerate the nine HTML pages and sitemap. The deploy script runs generation and syntax checks first. Do not copy these identity-specific notices unchanged to another business, or treat their presence as a compliance certification. Provider transfer safeguards, actual retention settings, contact-information duties and rights/permissions require separate operational verification.

`dist/_headers` applies no-transform to suppress automatically injected browser measurement, restricts scripts and connections to the same origin, and adds security/privacy headers. Only sessionStorage is used for an explicitly selected language; the former localStorage key is removed. The storage notice provides a targeted clear button. No consent-acceptance wall, advertising tracker or marketing form is added. Reassess policies and consent before adding any optional analytics, embeds, accounts, forms or payments.

## Developer collaboration scope

The redundant footer branding/domain/social block was removed. `/yasal/isbirligi/` describes prospective collaboration for the operator's own projects; it is linked from the company section and legal navigation. It does not launch a vacancy, applicant pool, paid intermediary service or CV form. Actual worker classification, tax/social insurance duties, project terms and written IP arrangements remain separate from this general notice. No blanket freelancer exemption or automatic rights transfer is asserted.
