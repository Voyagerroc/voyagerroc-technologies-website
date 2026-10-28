# Live website review — 27 October 2026

Reviewed 22 sitemap pages at 360 and 1440 pixels (44 route visits) in local Chrome against the live HTTPS origin. Evidence: qa/current-site-review.json, qa/current-home-{360,1440}.png, qa/current-contact-{360,1440}.png. Browser script: qa/current-site-review.cjs. No production source changes or deployment.

## Verified working

All 44 route visits returned HTTP 200, one H1, no horizontal overflow, no empty unlabeled anchors and no pageerror events. Homepage initially renders nine project cards; searching PayRadar returns one card in both widths. English selection updates document language and title. Contact section exposes WhatsApp and two mailto addresses; no messages were sent and mailbox delivery was not tested. Local search checker passed 22 unique sitemap URLs, canonicals, headings, static internal links and JSON-LD/CSP.

Initial image audit listed below-fold loading=lazy images as unloaded. Follow-up forced loading on homepage and PayRadar page: every listed image completed with nonzero naturalWidth. These are NOT broken-image findings. The raw initial JSON retains those candidates and must be read together with this correction.

## Prioritized opportunities

1. Conversion: mobile hero has Products and Development approach actions, without a direct project-inquiry action. Service destinations exist further down. Add a clear project-inquiry CTA and concise audience/problem/value statement if acquiring custom-development customers is the main goal. This is a UX recommendation, not a failed control.
2. Product readiness: /android/ states EIP and PayRadar new-tester channels await Google review; LaserDeck Play test release is unpublished. These external access constraints limit immediate acquisition. Preserve accurate status and provide clearly labeled web/demo alternatives; do not promise an available download.
3. Evidence: PayRadar has a genuine demo video and a technical case note. EIP candidate/employer walkthrough and LaserDeck two-device demonstration remain absent per docs/DEMO-CAPTURE-PLAN.md. Produce them only with real test flows/devices and nonpersonal data. Do not fabricate customers or performance figures.
4. Measurement: deployed /privacy-config.js says analyticsAvailable=false; local Worker config ANALYTICS_ENABLED=false. UTM URLs alone do not provide a visit/conversion report. Decide on a privacy-appropriate measurement setup before claiming LinkedIn traffic gains; do not silently enable tracking.
5. SEO polish: live homepage and About use the same meta description. Give About a distinct founder/brand/product description. Static English product/service destinations are not offered throughout the site; homepage language switching is not a complete multilingual site. Separate indexable English routes are an optional growth project, not required for current Turkish audience.
6. Resilience: the 18-project collection is populated by JavaScript; source HTML has an empty grid and a noscript notice. Core product links are already static, so not a total search-discovery failure. Server-rendering initial cards would improve resilience if scripts fail.

## Limits

No new Lighthouse performance or field Core Web Vitals run. No security penetration test, legal-compliance certification, form submission, mailbox send, Google Play account verification or physical-device test. Technical pass is not a ranking or revenue guarantee. Prior same-session Search Console confirmed homepage/About indexed, while LaserDeck was discovered but not indexed and its manual request returned an error.
