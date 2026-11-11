# SEO and Phoenix brand corrections — 7 November 2026

Published to https://voyagerroctechnologies.com/ as Worker version `ef081276-cae6-4287-8215-f0b77834f349`. The owner authorized the corrections after the parallel audit, then requested Firecrawl for the remaining Google step. No commit or push was made. Existing unrelated working-tree changes were retained.

## Changes

- `content/brand.mjs`: the visible About introduction identifies founder Erol Taşcı and the independent software brand.
- `scripts/build-site.mjs`: render the existing FAQ questions and answers visibly from the same data used by JSON-LD. Regenerate sitemap modification dates for changed pages.
- `scripts/build-english.mjs`: generate English page/website graphs with shared Brand/Person identities, correct `/en/` OpenGraph URL, and English social metadata. `ContactPage` remains the correct type for project enquiries.
- `scripts/generate-brand-assets.mjs`: use local Playwright, allow an explicit browser channel, size SVGs to each viewport, fail with a nonzero exit code, correct AI wording and refresh legacy logo/avatar aliases from the existing Phoenix SVG. No new logo was invented.
- Regenerated logo/favicon/social-card outputs in `dist/` and `brand/`. Former blue VT assets at `dist/assets/brand/voyagerroc-technologies-logo.png`, `linkedin-avatar.png` and the LinkedIn SVG aliases now carry Phoenix. The header already used Phoenix; its vector was preserved.
- `dist/llms.txt` now identifies the personal GitHub profile correctly and no longer claims LinkedIn verification. Corrected `Si` to `AI` in `llms-full.txt`. These files are not treated as a Google AI Overview ranking fix.
- `scripts/check-search.mjs`: regression checks for English page identity/OG URLs, visible FAQ parity and static CSP hash coverage and Cloudflare limits.

## Security and privacy

New JSON-LD blocks increased the global hash set beyond the static `_headers` line limit. The Worker retains a hash-based CSP without permitting arbitrary inline scripts. Static fallback rules contain only each HTML page's hashes: Wrangler parsed 85 valid rules. Each line remains within 2,000 characters. Analytics remains disabled and transfer readiness false; no tracking or additional data collection was added. This is a technical scope check, not a legal certification.

## Verification

- Build, syntax, edge, telemetry, search, secret scanning and scene-loader checks passed as part of `npm run deploy` predeploy.
- Secret scanner inspected 203 files and reported no findings.
- `qa/orchestration/verify-seo-20261107.cjs`: both local and live runs passed 50 HTTP checks. All 41 sitemap pages plus nine logo/favicon/social assets returned 200 and matched reviewed local bytes; each HTML JSON-LD hash was present in the response CSP.
- Eight browser flows each locally and live: home/About in Turkish and English at 390 and 1440 pixels. No horizontal overflow, uncaught page error, observed CSP rejection or axe A/AA violation. About FAQ expansion revealed the disambiguation answer.
- Independent Firecrawl `maxAge:0` retrieval of live About returned 200 and included the visible company-disambiguation question and answer.
- Graphify updated to 670 nodes and 633 edges.

Evidence: ignored `qa/orchestration/seo-local-20261107.json`, `seo-live-20261107.json`, and matching PNG screenshots. Existing Chrome was used via `BRAND_BROWSER_CHANNEL=chrome`; no browser download was required.

## Remaining external processing

Search Console recrawl requests have not yet been submitted. The TinyFish attempt did not start because of wallet balance; the owner then selected Firecrawl. Firecrawl's first Search Console fetch reached the signed-out introduction page. Its interact prompt timed out, but a read-only inspection of the same session succeeded and confirmed Google's email/phone sign-in screen. The owner was given the interactive viewer link for manual sign-in; that private session link is intentionally not stored here. No credentials were entered, and no Google account settings, ownership or external social profile were changed. Awaiting owner sign-in before requesting recrawl.

Google's currently displayed favicon, Knowledge Panel and AI Overview were not proven updated. Published corrected files and accepted recrawl requests, when available, must be distinguished from Google completing a crawl or changing an answer. No ranking or AI Overview outcome is guaranteed.

References: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/docs/appearance/favicon-in-search ; https://developers.cloudflare.com/workers/platform/limits/ .
