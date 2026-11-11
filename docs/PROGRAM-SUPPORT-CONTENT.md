# Maintaining program-support announcements

Public page: `/destekler/`. Source: `content/support.mjs`.

Add a confirmed record to `supportRecords` with a unique slug ID and these
fields: `confirmed: true`, `provider`, `program`, `type`, `status`, `duration`,
`benefit`, `recordedOn`, `summary`, `evidence`, `terms`, `programUrl` and
`informationUrl`. `amount` is optional and should be used only when a documented
grant or financial amount is specifically authorized for public disclosure.
Update `supportPage.modified` when the public content changes.

Use the actual benefit type: software access, a documented grant, accelerator
participation or another precisely described program benefit. Applying to a
program is not receipt of support. Do not infer monetary values, investment,
partnership, customer endorsement or awards from discounted software access.
The builder rejects unconfirmed records, duplicate/unsafe IDs, missing fields,
invalid dates and non-HTTPS references.

`recordedOn` means the date the announcement was entered on the website.
It does not establish the support's activation or expiry date. Keep finite
benefits historical rather than presenting them as permanently active.

Retain source evidence privately. Never put full approval emails, recipient
addresses, workspace identifiers, redeem codes, invoices, signatures or private
program terms in `content/` or `dist/`. An official public program page describes
the program; it does not independently verify this participant's approval.
The first Notion record is based on the approval message supplied by the owner.

The Notion announcement describes three months of Business and AI software
access. It uses a text-only program name, and no Notion logo, partner badge,
endorsement schema, cash value or reproduced email. The program's own conditions
still apply. Do not add third-party logos without checking the relevant
authorization and guidelines for that use.

Research reviewed on 2026-10-30:

- https://www.notion.com/help/notion-for-startups — official Business/AI offer
  categories and email-confirmation process; the user's specific three-month
  award is supported by the user-supplied message.
- https://www.notion.com/startups — public program description.
- https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/ticari-reklamlar-ve-haksiz-ticari-uygulamalar-hakkinda-bilgilendirme
  — official guidance on truthful, non-misleading commercial statements.

The linked Notion startup terms and brand guideline pages could not be fully
retrieved (timeout/error). No blanket contractual publication or logo license
was assumed. This content design reduces misleading claims; it is not a legal
clearance or a guarantee of compliance with every applicable contract or law.
For an award with publicity/confidentiality restrictions, resolve those
restrictions before setting `confirmed: true` and publishing its announcement.

Build and validate with `npm run predeploy`, inspect mobile/desktop output, then
publish using the site's existing deployment workflow. Confirm live canonical
URLs, sitemap, structured-data CSP and links from home/about. Existing
unrelated local documents must remain outside the commit.

## Initial publication — 2026-10-30

Published Worker `102548ff-abca-4a68-a89a-bb38c3ac331b`; rollback target
`cea79026-268a-4505-9015-6ee99a139d53`. `npm run deploy` completed its build,
syntax, edge, telemetry and search checks. The sitemap contains 27 pages.
`node qa/deep-live-check.mjs` verified all 27 live pages match the local build,
structured-data CSP hashes and selected assets; the `www` redirect is intact.
320px and 1440px browser checks verified the support page, Turkish/English home
footer links, about-page discovery, no overflow or page errors, and no private
workspace identifier or approval-email address in the public HTML. Screenshots
and results are in `qa/support-live-20261030-*` and
`qa/support-live-20261030.json`; the 320px screenshot was visually inspected.
