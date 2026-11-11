# Project enquiry flow — 27 October 2026

Published after user approval and final correction loop. Production version: a703efda-f279-4420-93d9-3f637a25ee50. Live: https://voyagerroctechnologies.com/proje-gorusmesi/ and https://voyagerroctechnologies.com/en/project-enquiry/ .

## Result

Header and hero conversation CTAs open a dedicated short project brief page. Product and service enquiry links carry their context, including language-specific homepage dialog links. Visitors select a project area and stage, describe the need/outcome and optionally provide name/team and timing. A preview prepares encoded email/WhatsApp drafts or copies the text; the user completes sending in their chosen application. No request is silently submitted, no lead database/storage is added, and no success/delivery claim is shown. Input edits hide stale previews. Optional contact fields are omitted because the selected conversation channel already provides a reply channel.

Generated Turkish and English ContactPage routes have canonical, alternate-language, social metadata and sitemap entries. Homepage/About descriptions now differ. Homepage value proposition describes collaboration, and its primary action is project enquiry. The initial 18 portfolio descriptions are in static HTML for script failures; normal JavaScript still shows nine initially with filtering and show-more.

## Changed files

- scripts/build-enquiry.mjs: bilingual HTML generator using existing page shell/security pipeline.
- dist/enquiry.js and enquiry.css: local brief preparation, validation, safe text handling and responsive layout.
- scripts/build-site.mjs: generator integration, links, unique About metadata, static fallback, sitemap and CSP generation.
- dist/app.js: localized project CTA and dialog routes; clearer hero copy.
- package.json: include the new JavaScript files in syntax validation.
- Generated dist/proje-gorusmesi/index.html, dist/en/project-enquiry/index.html and existing generated homepage/product/service/About/sitemap/headers plus src/security-headers.mjs.
- QA files under ignored qa/: check-enquiry.cjs, enquiry-check.json, enquiry screenshots, deep-enquiry-audit.json. Existing user's uncommitted changes preserved.

## Validation

npm run predeploy passes build, syntax, edge, telemetry and 24-page search checks. Four browser scenarios (TR/EN at 360/1440) verify required fields, whitespace rejection, safe handling of markup in query/content, decoded email/WhatsApp bodies, no POST or other submission, no script errors, no overflow, language-specific CTA routing and stale-preview invalidation. JavaScript-disabled checks verify 18 initial portfolio cards and direct-contact fallback. Existing full browser audit: 24 pages, 18 projects, 320/1440 widths, 713 checks, zero issues.

## Remaining external work

EIP walkthrough and LaserDeck two-device demo require real test accounts/devices and verified flows. Google Play review remains external. Analytics stays disabled under the existing operational configuration: readiness/transfer/rate-limiter work documented in PRIVACY-OPERATIONS.md has not been completed; no new analytics activation is claimed. English enquiry is available, while the rest of the product/legal site remains partially Turkish and is labelled accordingly. Actual message delivery and conversion improvements have not been measured.

User approved publication and requested a further review/fix loop. Final corrections: preserve sanitized product/service context when switching languages; preselect the relevant enquiry category; hide interactive form until handlers attach so script failure cannot expose a native GET submission flow; correct new/changed route sitemap dates; label static enquiry links accurately; wrap long context; truncate context by Unicode code point to avoid splitting an emoji and breaking URL encoding.

Publication: npm run deploy passed all predeploy gates, uploaded 17 changed static files, deployed both apex/www custom domains and version a703efda-f279-4420-93d9-3f637a25ee50. Analytics flags remain false.

Post-deploy verification: deep-live-check.mjs confirmed all 24 served HTML files match the prepared build and their JSON-LD hashes are permitted by the runtime CSP. Existing public assets matched; www returns HTTPS 308 preserving path/query. check-enquiry.cjs ran against the real HTTPS origin for TR/EN at 360/1440, including context/language selection, no-script fallback, safe markup, required fields, message draft contents and no submission. An additional real-origin 320px check with a Unicode boundary context passed. Full 24-page/18-project browser regression (320/1440): 713 checks, zero issues. Real email/WhatsApp delivery was not tested or claimed.
