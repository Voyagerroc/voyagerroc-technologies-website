# Website content and interaction audit — 27 October 2026

Published Worker version: `7db1b323-c4df-498d-bec7-b590091080cb`.

## Scope and evidence

Reviewed all 22 sitemap pages, the 18-project bilingual catalogue, Android access guidance, brand/about copy, product notes, legal/privacy presentation and homepage interactions. The user's deliberate `Si` spelling was retained. Existing pending changes were preserved; the initial diff is recorded locally in ignored `qa/before-deep-audit.patch`.

The automated browser audit executes 693 checks across 320px and 1440px viewports: page structure, duplicate IDs, internal anchors, overflow, missing bilingual fields, every project dialog, Android destinations, metadata, filters, search, Escape and runtime errors. The baseline captured 15 failing instances; the final run has no failures. Additional tests cover dialog browser-history navigation, outside-click menu dismissal, privacy/ARIA language, contact labels and article dates. Default-motion 3D tests at 390px/1440px cover animation, pause/resume and docking; reduced-motion fallback and manual opt-in also passed.

## Corrections

- Homepage story Android buttons now use the enrollment guide in both server-rendered HTML and JavaScript. They previously bypassed the guide and linked directly to Google Play, including pending test releases.
- Tabela now has its own schematic football visual. Its featured card previously displayed Bungalow OS operations labels. Missing TR/EN image descriptions were added.
- Tabela copy no longer claims zero hosting cost, continuous availability, universal precision, confirmed squads/referees or shortcomings of every competing prediction engine. The public app confirms that provider keys are required for model-assisted analysis; that requirement is now explained. The Dixon-Coles wording describes a Poisson correction. Product-specific usage steps and four FAQs were added.
- PayRadar's current scope and case study include the 27 October notification deployment. Actual phone display remains unverified. The case study retains the original 25 October test history and separately records its update date in visible text, JSON-LD and sitemap.
- English selection updates page/OG/Twitter titles and descriptions plus OG locale. Contact, founder, navigation and visible privacy-banner labels follow the selected language. Turkish-only destination sections remain explicitly marked.
- Featured product headings now contain buttons, rather than invalid heading elements nested inside buttons. Visual buttons have explicit product names for assistive technologies.
- Mobile navigation closes with Escape or an outside click. Existing project-dialog back/forward/Escape behavior was tested.
- Pharos status is consistent between its homepage card and product page. Android headings describe checking availability rather than promising immediate installation.
- Internal repository-directory and obsolete-host explanations were removed from visitor-facing ASTERA, field-report and architectural-project scope notes. The actual concept/source/live distinctions remain.
- Brand description punctuation, the Turkish EİP name and the security-log explanation were corrected. Only the two edited legal pages received a new visible update date; legal provisions and privacy collection behavior were not expanded.
- Search validation now checks both languages' required catalogue fields and catches static homepage Android links that bypass enrollment.
- `www.voyagerroctechnologies.com` is attached to the existing Worker as an additional Custom Domain. The existing canonical-host guard issues an HTTPS 308 to the apex while retaining path and query.

## Publication verification

`npm run deploy` passed build, syntax, search, edge and telemetry gates. Cloudflare uploaded 16 changed static files and retained analytics as disabled.

The live verifier compares all 22 served HTML files and five changed public JS/CSS/data assets with the prepared output, and checks JSON-LD against the actual runtime CSP hashes. All match. Cloudflare and Google public DNS resolvers resolve the new www hostname; trusted HTTPS returned `308` from `/urunler/tabela/?ref=deep-audit` to the same apex path/query. The local resolver still had an earlier NXDOMAIN cached, so this particular HTTPS probe used the public DNS answer with ordinary certificate validation and the correct SNI/Host. Some resolver caches may need time to refresh.

Local evidence: `qa/deep-before-audit.json`, `qa/deep-after-audit.json`, `qa/deep-interactions.json`, `qa/deep-scene/scene-smoke.json`, `qa/deep-live-check.json` and the accompanying screenshots. These private QA files are excluded from the public asset bundle.

## Limits and external observations

This audits the portfolio website; access to a product's public UI does not verify all its authenticated or physical-device functions. Tabela, EİP, LaserDeck and AptFlow public descriptions were consulted; GitLab's Tabela page blocked the fetch, so it was not labelled a broken or private repository. The email domain's Google MX records resolve, but no email was sent or mailbox delivery claimed. No Google ranking improvement, complete legal compliance or physical-phone notification success is claimed.

Cloudflare's documented Custom Domain behavior provisions DNS and certificates for the Worker: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/ .
