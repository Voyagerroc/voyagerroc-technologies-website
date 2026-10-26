# Search operations — 25 October 2026

Canonical site: https://voyagerroctechnologies.com/ . Keep the Google ownership meta tag in the homepage head; it identifies the verified Google account and is meant to be public, not used as an API credential. No Google analytics/tracking script was added.

## Published source changes
- Three product pages have intent-specific titles/descriptions, visible usage steps, FAQs and existing product visuals where available. Product stages and limitations remain explicit. FAQ text is not a promise of FAQ rich-result eligibility.
- PayRadar copy now describes Android 1.1.0 internal-test availability, Orbit 3D and notification diagnostics, with physical-device delivery still unverified.
- Three static project pages at /calismalar/web-mobil-uygulama-gelistirme/, /calismalar/saas-gelistirme/ and /calismalar/si-is-akisi-otomasyonu/ describe prospective collaboration and refer to actual portfolio examples. They do not claim existing customers, registered company status or proven subscription operations.
- Homepage links discover all product and project pages. Sitemap has 18 unique URLs. Existing 3D scripts and consent/telemetry settings are retained.
- JSON-LD/CSP hashes are regenerated together. Sitemap generation is idempotent.

## Account setup
Domain property was added but remains unverified because the available Cloudflare OAuth cannot read/write DNS records (HTTP 403). No DNS record was changed. The HTTPS URL-prefix property was confirmed as verified owner in Google Search Console using the supported HTML-tag method. Do not equate it with whole-domain ownership.

Sitemap submission was confirmed, but the first Search Console fetch status was "Couldn't fetch" with 0 discovered pages and no last-read date. Direct HTTP tests (including Googlebot user-agent strings, which do not simulate real Google network access) return 200 and parseable XML. Google live URL inspection succeeded: the homepage is available to Google and indexable. Index data still says Discovered — currently not indexed, without a previous crawl. Request indexing failed three times with the Console message "Oops! Something went wrong. We had a problem submitting your indexing request. Please try again later." No indexing-request confirmation was received. The homepage live-test success does not prove that sitemap fetching has completed; track the sitemap report separately. Product URL indexing requests were not submitted after the repeated Console failure. Reports currently show processing data; no traffic or indexing counts are yet available.

## Validation
npm run build, check, check:edge, check:telemetry and check:search passed. The search check covers sitemap targets, canonical URLs, main headings, static links/assets, discovery and JSON-LD hashes under the deployed CSP. Repeat build is byte-identical. Fourteen browser route/viewport checks at 360/1440px passed without overflow, broken images or uncaught exceptions; visible FAQ toggling passed. Public files passed Gitleaks. Ten live HTTP probes passed after deployment; nonexistent URL returns 404. No field Core Web Vitals or ranking improvement is claimed.

## Next measurement
Inspect Search Console Pages and Performance reports after processing completes, then retry the failed homepage indexing request. Record query, page, impressions, clicks and position using the same date range. Distinguish data processing from no traffic. Measure mobile field performance when sufficient data is available. Request indexing through the supported UI; do not use the restricted Indexing API for these ordinary product pages. Do not buy backlinks, invent reviews or automatically generate near-duplicate landing pages.

## Final sitemap recheck
A separate read-only Sitemaps check confirmed **Success**, type Sitemap, submitted and last read 25 October 2026, **18 discovered pages**, no errors. The earlier Couldn't fetch state no longer appears. Discovery is not indexing. Homepage indexing-request submission still has no confirmation.

## Brand/demo follow-up
The published sitemap now contains 19 URLs, including `/notlar/payradar-web-push-bildirimleri/`. This is the served XML count, not a new claim that Google has discovered or indexed all 19. The earlier independently verified Google sitemap report discovered 18 pages. A later homepage URL inspection reported URL unknown/not indexed and N/A crawl fields; manual Request indexing again returned the same Oops/Something went wrong error (tool reported two failed attempts), with no confirmation. The case page was not manually submitted after this failure. Do not interpret inconsistent new-property report wording as successful indexing, or processing reports as zero traffic.

## 26 October 2026: confirmed indexed homepage
Search Console URL Inspection now reports Page is indexed / URL is on Google for the exact HTTPS homepage. No manual indexing request was made because it is already indexed. Sitemap remains Success, last read25October with18discovered pages; served XML contains19 URLs. Performance reports still process data. This supersedes the previous day's unknown/not-indexed result, not a ranking guarantee. Local evidence: qa/seo-20261026/search-console-status.json (ignored).
