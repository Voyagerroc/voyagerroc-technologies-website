# PayRadar update announcement — 30 October 2026

The user requested that the latest PayRadar changes be stated on
voyagerroctechnologies.com. The existing custom Cloudflare website repository
was updated; no Sites migration or hosting changes were needed.

Source changes:

- `content/search.mjs`: dated product update covering retry/renewal, device
  display-operation confirmation, midnight day counters and calendar-month
  due-date behavior.
- `content/studies.mjs`: two latest-first October 30 sections, updated heading,
  description and modification date; earlier investigation retained as history.
- `dist/data/projects.js`: Turkish and English product scope updated.
- `scripts/build-site.mjs`: optional product-update section, per-product
  `dateModified`, and sitemap dates derived from the modified product/study.
- Generated product page, study page, home/discovery pages, sitemap and CSP
  headers rebuilt. Unrelated untracked growth/email files were preserved.

Publication succeeded with Worker version
`cea79026-268a-4505-9015-6ee99a139d53`. Previous version for rollback:
`eddfdc56-a745-4ce8-92fa-d3fe9fc5c8ff`.

Live pages:

- https://voyagerroctechnologies.com/urunler/payradar/
- https://voyagerroctechnologies.com/notlar/payradar-web-push-bildirimleri/

`npm run predeploy` passed build, syntax, edge, telemetry and search checks.
The search check verified 26 sitemap pages, links, canonical URLs and JSON-LD
hashes in CSP. Local 320/1440px previews passed four route checks. After
publication, `node qa/deep-live-check.mjs` verified all 26 pages and selected
assets match the local build exactly, and `www` retains its 308 redirect.
Four live 320/1440px route checks passed without page errors or overflow.

Artifacts:

- `qa/payradar-update-preview-20261030.json`
- `qa/payradar-update-live-20261030.json`
- `qa/payradar-update-live-20261030-320.png`
- `qa/payradar-update-live-20261030-1440.png`
- `qa/deep-live-check.json`

The public copy does not claim unbreakable delivery or verified physical-phone
visibility. It distinguishes provider acceptance, device display-operation
confirmation and human reading/sound. The PayRadar production cron's first
successful run was independently confirmed at 12:55:33 Europe/Istanbul.
