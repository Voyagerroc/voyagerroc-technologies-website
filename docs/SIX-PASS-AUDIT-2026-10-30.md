# Six-pass website audit — 30 October 2026

Scope: the Voyagerroc Technologies corporate website. The user requested five
to six audit loops, fixes for security/layout/language/SEO issues, then one EIP
post on the company LinkedIn page. Six passes were performed; this is not a
claim that every vulnerability or product workflow has been eliminated/tested.

Published website Worker: `bc0bb49f-9a13-495d-87da-94ce0ca0a05f`.
Rollback target: `102548ff-abca-4a68-a89a-bb38c3ac331b`.

1. **Source and dependencies.** Reviewed the canonical-host guard, security
   headers, escaping, bounded analytics body handling, default-off collection,
   consent and contact-brief generation. `npm audit` reported zero known
   vulnerabilities. Existing edge/telemetry checks passed.
2. **Live security.** Nineteen checks verified private/config/source paths are
   not exposed, disallowed write methods return 405, security headers exist,
   analytics remains disabled and the `www` redirect preserves path/query.
   No vulnerability was confirmed in this pass.
3. **Language and discovery.** TinyFish remote Chrome reproduced zero results
   for `EİP`. Search now includes product IDs and short names, making `EİP`,
   `EIP` and `eip` find the product in both languages. The English enquiry
   footer's new support link and its social-image alt were still Turkish and
   are now translated. A duplicate language-link attribute was removed.
4. **Responsive interaction.** Expanded testing to 280px exposed six pixels
   of header overflow from the logo/controls. Logo size and gaps now adapt at
   320px and below without shrinking the menu's touch target. Six viewport
   widths passed 30 route/layout checks and 36 alias searches after the fix.
   Keyboard dialog close, focus and mobile-menu close were also checked.
5. **SEO.** All 27 pages have unique titles/descriptions, one H1, valid canonical
   URLs and parseable JSON-LD. Existing reciprocal TR/EN language links were
   verified, as were the 1200×630 social image, sitemap, internal links and CSP
   hashes. A strict literal URL assertion initially treated the root URL's
   optional trailing slash as an error; normalized URLs are equivalent and no
   unnecessary canonical change was made. No ranking/indexing promise is made.
6. **Regression and publication.** The existing content audit passed 743 checks
   across 27 pages, 18 products and 320/1440px. Extended narrow/landscape checks
   passed at 280/360/393/640/768/1440px. Four enquiry-flow cases passed safe text,
   validation, no automatic submission and explicit sharing checks. The normal
   build, syntax, edge, telemetry and SEO checks passed before publication.
   Final live-byte and remote-TinyFish regressions passed: 27 live pages match
   the build, and 12 live alias searches across two languages/two viewports
   return exactly one EIP result. English footer/image-alt and narrow overflow
   checks also passed. The remote sessions were explicitly closed afterward.

The menu label was separately asserted as `Menü` / `Menu` and was already
correct. An initial visual suspicion was withdrawn; no menu translation fix
was claimed or applied.

An initial final TinyFish session was closed too early, interrupting its last
navigation. That result was discarded and not used as passing evidence. A new
session completed the final regression successfully before being closed.

Files changed: `dist/app.js`, `dist/style.css`,
`scripts/build-enquiry.mjs`, and generated TR/EN enquiry HTML.

Evidence under ignored `qa/`: `six-pass-2-live-security.json`,
`six-pass-tinyfish-before.json`, `six-pass-4-responsive.json`,
`six-pass-5-seo.json`, `deep-after-audit.json`, `enquiry-check.json` and
`six-pass-summary.json`. TinyFish public browser sessions are explicitly
closed after checks. The saved LinkedIn profile was verified read-only first;
company name/admin controls were confirmed before any publication.

LinkedIn copy uses the official name **Evidence Intelligence Platform (EİP)**,
describes documents/work samples/human review, and links to the current product
scope. It does not claim proven hiring accuracy, autonomous decisions, a public
production Android release or completed end-to-end EIP acceptance testing.

Publication completed: https://www.linkedin.com/feed/update/urn:li:share:7521889500009062400
The company author and exact opening paragraph were independently verified read-only
by TinyFish run `6c2045b6-1ea8-4b75-818f-511506659424` (`verified=true`, no blocker).
Earlier native input attempts did not publish. The successful browser controller
selected `.ql-editor` (excluding Quill clipboard), verified every paragraph against
the approved source, and clicked Post exactly once. Rendering adds extra newlines
to `innerText`; paragraph DOM text was used for exact verification instead.
