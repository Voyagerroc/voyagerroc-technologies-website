# Privacy choices and minimised telemetry

## Current deployment

The founder WhatsApp link has a prefilled message. Opening the link does not send the message; the visitor must send it in WhatsApp.

Every HTML page includes a first-party preference panel with equally prominent accept/reject controls, settings, withdrawal and a dismiss option. Access is not conditional on accepting. The choice is stored only after a click in a Secure `__Host-vrt_privacy` cookie for 180 days. It contains policy version, allow/deny and decision day, not a visitor ID. This duration is an implementation choice, not a statutory universal period. Language remains in sessionStorage.

**Optional analytics is INACTIVE.** `content/privacy.mjs` has `analyticsAvailable: false`. `wrangler.jsonc` has both `ANALYTICS_ENABLED` and `ANALYTICS_TRANSFER_READY` set to `false` and uses a `-preview` consent version. The panel explicitly says saving a choice does not start additional collection. Existing preview choices cannot be reused for future activation; a new version requires a new visitor decision.

This is a technical safeguard because the operator's Turkish-law overseas-transfer mechanism has not been verified. It is not a claim that the current hosting/provider arrangements have received legal approval. Cookie consent alone cannot establish every requirement for continuous overseas transfers. Cloudflare's published EU SCCs are not automatically proof of the Turkish-law mechanism or required notification.

## Security records

`src/telemetry.mjs` emits `vrt_security` only for disallowed methods, server errors and unknown-path 404 events. The custom fields are minute, method class, status and route class. No IP, city, GPS, full URL/query, user-agent, cookies, request body or identity is placed in the application's custom record. The provider still processes technical traffic to deliver and secure its service; rejecting optional analytics cannot prevent that network processing.

Workers Logs is enabled, with invocation logs disabled, query redaction enabled and tracing disabled. Custom logs are retained under the active Cloudflare plan, currently documented as 3 days on Free and 7 days on Paid Workers. Do not assume a particular account plan or promise those limits for all provider-side processing. No separate permanent visitor database or public log viewer is created. Restrict dashboard permissions and review provider retention and transfer terms.

## Prepared optional collection

`/api/analytics` is fail-closed. Activation requires two explicit flags, a fresh non-preview consent version, a rate-limiter binding and the visitor's current allow cookie. Origin, fetch-site, GPC, age, content type, a 512-byte body limit, event/page/project allowlists and a fixed field schema are checked. A browser also caps its event submissions. The endpoint has no log-reading function.

Permitted application fields are day, event type, route class, optional featured project ID, approximate country, broad device class, browser family and consent version. Event types are page view, featured project open and WhatsApp click. These are event counts, not unique visitors, verified people, reliable physical location or verified device identities. No names, raw IP records, city, GPS, model/serial, full browser strings, message text, query parameters, fingerprinting or cross-site identifiers are included. Unknown country remains unknown. Browser/device classification may be inaccurate; bots/VPNs affect statistics.

The prepared server writes these minimised events as structured custom logs only when active. No third-party analytics SDK, marketing pixel, session replay, D1 database or Analytics Engine resource has been added. Revoking consent prevents future optional submissions; earlier lawfully processed data is handled under applicable rights and retention, not a promise that withdrawal retroactively erases every provider record.

## Before activation

1. Document the real controller, contact channels, purposes, necessity and retention. Resolve the pre-existing address/contact and provider-operation questions.
2. Verify an applicable Turkish-law overseas-transfer mechanism for the actual provider/recipient roles. If using Turkish SCCs, verify signature, correct module/annexes and required notification rather than relying on an EU DPA alone. Keep evidence outside the public repository.
3. Review provider custom-log enrichment, access permissions, retention and billing. Avoid collecting raw request metadata just because a dashboard can display it.
4. Configure and test a supported Cloudflare rate limiter for `ANALYTICS_LIMITER`; keep collection closed if it is absent. No such binding is deployed in the inactive version.
5. Update notices to the actual active scope. Set a **new** consent version in both config sources, change `analyticsAvailable`, and set both runtime flags only after review. Preview choices must fail the new version check.
6. Run `npm run check:telemetry` and browser tests for first visit, rejection, acceptance, settings/withdrawal, stale versions, GPC and zero pre-consent requests. Verify the actual active provider settings after deployment.

## Viewing and exporting

Cloudflare dashboard: Workers & Pages → `voyagerroc-technologies` → Observability → Logs. Filter `kind = vrt_security`; after any later approved activation, optional records use `kind = vrt_optional_analytics`.

`wrangler tail` is a real-time stream, not a query of all historical visits. The initial piped capture yielded no usable records. A subsequent interactive tail connected successfully and showed the minimised custom log for one controlled 404 verification request. That proves the current security stream works; it is not a history of real visitors. No past country/device history or visitor identities were invented. A public status page or anonymous log-download endpoint must not be added.

Primary sources: [KVKK cookie guide](https://www.kvkk.gov.tr/Icerik/7353/Cerez-Uygulamalari-Hakkinda-Rehber), [KVKK transfer guide](https://www.kvkk.gov.tr/Icerik/8142/Kisisel-Verilerin-Yurt-Disina-Aktarilmasi-Rehberi), [KVKK SCC notice](https://www.kvkk.gov.tr/Icerik/8170/Yurt-Disina-Kisisel-Veri-Aktariminda-Kullanilacak-Standart-Sozlesmelerde-Dikkat-Edilmesi-Gereken-Hususlara-Iliskin-Kamuoyu-Duyurusu), [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/), [real-time logs](https://developers.cloudflare.com/workers/observability/logs/real-time-logs/).
