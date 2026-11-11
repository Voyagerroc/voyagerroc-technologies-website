# Live links and source synchronization — 28 October 2026

## Results

- Live sitemap: 26 pages, all returning HTTP 200.
- 173 distinct HTTP(S) href/src/poster targets checked across live sitemap HTML, including query strings and anchors. No same-origin HTTP failures or missing static fragments were found.
- Chrome loaded all 26 pages, plus the English homepage state: 27 views, no page JavaScript errors and no missing rendered fragment targets.
- All live/repo/androidGuide destinations in the project catalogue were already included in the HTTP audit. No additional project destinations were omitted.
- All 76 deployable files under `dist` matched their live counterparts by SHA-256. Cloudflare configuration files `_headers` and `_redirects` are not served files and were excluded from that comparison.

## External access restrictions

| Destination | Observed result | Interpretation |
| --- | --- | --- |
| Founder LinkedIn profile | HTTP 999 | Automated access blocked; not evidence of a deleted profile. |
| Tabela GitLab source | Redirect to GitLab sign-in, HTTP 403; TinyFish also reports bot blocking | Anonymous source access could not be confirmed. The live Tabela application itself responded successfully. |
| EIP Google Play listing | HTTP 404 without a tester session | Restricted-test listing, not a publicly downloadable release. |
| PayRadar Google Play listing | HTTP 404 without a tester session | Restricted-test listing, not a publicly downloadable release. |

The Android guide labels these store buttons “Zaten testçiyim” and explains review/enrollment restrictions. No enrollment state or release status was changed based on an anonymous request. The Tabela source link remains unchanged because a sign-in/bot wall does not establish that the repository was deleted. Anonymous visitors may be unable to open it.

## Reproduction and scope

Run `node scripts/audit-live-links.mjs`; the JSON report defaults to ignored `qa/link-audit.json`. An optional first argument changes the report path. The script makes read-only HTTP requests, follows redirects and compares local deployable files with production. Same-origin HTTP failures produce a nonzero exit status; external restrictions and fragments needing browser inspection are reported separately.

The browser cross-check is recorded locally in ignored `qa/rendered-link-audit.json`. No forms, mail, WhatsApp messages or test enrollment requests were submitted. Mailbox delivery, physical-device behavior and authenticated store downloads are outside this check.

Build, syntax, edge routing/security, telemetry gates and search/link checks passed. The remote `main` branch was missing the current website changes: new project enquiry, English enquiry, founder and portfolio pages; updated product/brand/legal content; associated scripts, styles and security configuration. These website files are included in the synchronization commit. Private operational notes and email-signature drafts are not needed to build or serve the website and remain local.

No production deployment was performed; the existing live build already matched the local website output.
