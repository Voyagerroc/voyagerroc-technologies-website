# Website audit remediation — 5–6 November 2026

Status: source prepared and locally verified. Nothing in this report establishes deployment, executed provider agreements or legal compliance.

## Main website

Follow-up: the PayRadar product introduction now uses a 24-second native Android screenshot tour. The old web recording remains only in the historical web-push case study. See `PAYRADAR-NATIVE-VIDEO-2026-11-06.md`; the new tour is explicitly not a live interaction recording.

- `src/home.html` is now the stable homepage template. The builder no longer reads and rewrites its own generated output as source.
- `content/projects.json` supplies the catalogue; `content/releases.mjs` supplies the verified PayRadar landing version (2.1.3-phoenix / code 10), platform and retired-web status. Generated product data, product pages and the full portfolio share those records.
- Homepage copy explains the service before technical terminology. Three featured products replace repeated story/catalogue sections. The complete 18-project portfolio retains search and category filtering on its dedicated TR and EN pages.
- Logo SVG viewBox widened to preserve the full wordmark. Mobile headings wrap; button sizing and body copy improved. Following the user's animation direction, APERTURE now starts automatically on every viewport; see `APERTURE-AUTOPLAY-2026-11-06.md` for current behavior and responsive tests.
- Added static `/en/` home, six products, three service pages, portfolio, about, privacy and terms. Canonical and reciprocal language alternates are generated. Android test enrolment and some detailed Turkish notices are explicitly linked as Turkish.
- Public-interface screenshots of EIP and Tabela were captured without sign-in or private data. EIP capture is delivered as an 81 KB JPEG. PayRadar's obsolete web recording is labelled an archive, not an available product demo.
- No first-visit decision banner or new consent cookie while optional analytics is disabled. Existing privacy information remains accessible from the footer. Server-side analytics gates remain closed. Legal notices reflect this behavior.
- Fixed accessible-name mismatches detected by Lighthouse. Fixed a new 320px heading overflow detected during responsive tests.
- Local development now has an explicit loopback-only mode; public-host and production HTTPS redirects remain enforced. This prevents local preview from immediately redirecting to the live site.

## Verification

- `npm run predeploy`: build, JS syntax, edge behavior, telemetry gates, search/canonical/schema/CSP checks and secret patterns passed. 41 sitemap pages verified; 192 files scanned without a credential finding at that run.
- `npm run check:audit`: eight TR/EN combinations across 320, 390, 768 and 1440px passed. Production CSP applied; no horizontal overflow, runtime errors, failed asset requests or external page requests. Menu Escape, modal focus return, inactive analytics, English product navigation, portfolio filters, motion smoke and no-JS fallback passed. Automated WCAG-tagged checks found no violations in those home-page cases.
- Lighthouse 13.6 local simulated run before the subsequent autoplay restoration: mobile performance 96, desktop 100; accessibility, best practices and SEO 100 on both. Mobile LCP ~2.79 s, desktop ~0.61 s, TBT 0 in that run. These are historical lab results, not measurements of the autoplay build, production field data or a manual accessibility certification.
- Remaining performance opportunities include unused legacy CSS, minification and image/cache tuning. No immutable caching was added to mutable asset URLs.

## Related product changes

| Project | Working tree | Prepared changes |
|---|---|---|
| Tabela | `C:\Users\erol_\My Project\Tabela` | Correct provider/key/proxy disclosures, controller/rights/retention, current canonical/OG; removed key-prefix logging. Build, logic and real Chrome tests passed. |
| EIP | `C:\Users\erol_\My Project\evidence-intelligence-platform\eip-core` | Improved public disclosures and deletion UI; durable blob-erasure outbox, additive migration, partial 202 response and retry CLI; default-off minimal Sentry. 26 focused backend tests and frontend tests/build/browser fixtures passed. See its privacy-review report. |
| PayRadar | `C:\Users\erol_\My Project\PayRadar-audit-20261105` | Latest GitLab source isolated from old local checkout. Android-only landing builder, truthful scope, default-off telemetry, fail-closed encrypted envelopes, repaired credential scanner. 58 logic and 64 selected unit tests passed. |

## Publication and unresolved evidence

1. Main site: deploy the prepared Worker/static assets only after publication authorization; validate the public TR/EN pages and redirects with Firecrawl afterward.
2. Tabela: deploy matching frontend and proxy together; public page checks do not prove provider/database operating settings.
3. EIP: verify backup/restore and apply migration `b7a93c014f26` before backend release, then release frontend. Configure and monitor the blob-erasure retry job; a CLI existing in source is not proof that a scheduled cleanup runs. No live migration or job configuration was performed.
4. PayRadar: use `android-landing-dist/` for the retired-web landing and preserve existing Pages native-auth callbacks/API functions. Do not publish the legacy Vite `dist/` and accidentally restore the retired app. Native updates need their own release packaging and device acceptance; no store submission occurred.
5. Operator postal/business identity and applicable provider transfer safeguards require real user/account evidence. The operator was asked for these facts; none were fabricated. Existing notices disclose uncertainty; that disclosure does not discharge the underlying duty.
6. PayRadar UID-derived cloud key architecture was reviewed. A full secret-based migration remains unactivated pending recovery decisions, old-client write guards, compare-and-swap coordination and restore/interruption tests. The current patch prevents unreadable/future envelopes from being mistaken for plaintext; it does not claim E2EE.

See `docs/PRIVACY-OPERATIONS.md` for telemetry activation gates. Signed contracts, credentials and actual personal data must remain outside public repositories and audit artifacts.
