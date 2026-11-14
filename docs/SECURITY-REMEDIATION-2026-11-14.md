# Security remediation — 14 November 2026

User authorized applying the findings from the website review and extended penetration test.

## Applied and verified

- Cloudflare Minimum TLS Version changed from TLS1.0 to TLS1.2 through the user's existing signed-in Chrome tab. Apex and www reject TLS1.0/1.1 with a server protocol-version alert and accept TLS1.2/1.3 with certificate verification enabled.
- A single `_dmarc` TXT record was added after checking existing records: `v=DMARC1; p=none; rua=mailto:erol@voyagerroctechnologies.com; adkim=r; aspf=r`. TTL is Auto (observed300seconds). This starts monitoring; it does not request rejection of spoofed mail. Sender inventory, SPF/DKIM alignment and reports must be reviewed before quarantine/reject. Authoritative DNS and Cloudflare public DNS returned the record; public-resolver verification is recorded in the external evidence directory.
- `dist/url-policy.js` validates the product-dialog live/repository/Android links. Only credential-free HTTPS and single-slash site-local paths are accepted. Unsafe links are omitted. The helper is loaded before app.js from a root-relative URL on both TR/EN pages.
- Custom404/405/429/5xx security records have independent per-minute budgets,20per status class per isolate. No IP/path keys are retained. This is not a global request limiter, exact event counter or global billing ceiling.
- Worker version `23ec57b3-5cbb-4692-b490-70cf4d34da93` deployed to the existing apex/www custom domains. Live TR/EN dialogs work without runtime errors; app.js and url-policy.js match local SHA256. Analytics remains disabled.

## Release checks and source configuration

The masked secret scanner covers additional provider patterns, jsonc/txt/env/lock/Rust/key files, and a separate gate scans unique text blobs reachable from HEAD. Oversized files fail the check; matching values are never printed. Current final gate:253files and417historical blobs, no matches; npm audit0advisories. These are heuristic checks, not proof that all possible secret formats are absent.

`npm run predeploy` now includes history scan, security regression checks and npm audit. Its final full run passed. CI configuration adds full checkout history and the same checks. `.github/` was previously ignored and the local workflow untracked; the workflow is now included in this security commit. Verify the corresponding GitHub Actions run separately: local check results alone are not remote CI evidence.

## Validation and limits

Shared URL policy, JWT public/private classification, redaction, bounded log budgets and both language loaders have focused regression coverage. Browser tests with real and maliciously substituted portfolio URLs pass on TR/EN. Provider changes were verified without exporting browser cookies or credentials.

The broader existing `check:audit` fails at320px with336px document width. A controlled comparison of HEAD's original HTML/app.js and current code reproduced the same336px width in both, confirming a pre-existing layout issue. It was not reported as a new security regression or silently counted as passing. Focused security/browser checks passed.

Initial CLI access could read the zone but returned403for TLS settings and DNS. Browser automation initially used a separate session; the user requested continuing in their existing browser. Windows UI Automation attached to that existing Cloudflare window and applied the authorized settings. No new browser was launched after that instruction. No password, session cookie or token was exported.

## Still requiring operational follow-up

- Review DMARC reports and legitimate SPF/DKIM alignment before stronger enforcement.
- Review the corresponding GitHub Actions run after publication; local release checks are already implemented.
- Assign a real backup incident coordinator and verify actual account MFA/recovery, provider WAF/quotas and retention. No person or provider evidence was invented.
- The earlier320px layout issue remains outside this security change.

Detailed evidence and scripts: `C:\Users\erol_\Voyagerroc-Duzeltmeler-2026-11-14`.
