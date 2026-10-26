# Brand identity clarification — 26 October 2026

The owner reported Google/Gemini confusing Voyagerroc Technologies with a similarly named business. An external search backend did not reproduce the exact personalized Google AI overview, so this is recorded as an owner-reported issue rather than a verified reproduction of Google's summary.

## Published changes
- Homepage H1 now says Voyagerroc Technologies, in both TR and EN UI. The visible opening paragraph defines it as an independent software brand and names PayRadar, LaserDeck PTT and EİP.
- `/hakkimizda/` is a static About page describing the name, spelling (Voyagerroc, including the final roc), exact official domain, portfolio and confirmed public brand pages. Operating identity and collaboration conditions link to existing legal notices; no registered company, address, trademark registration or affiliation is invented.
- `content/brand.mjs` holds a consistent public identity. WebSite name/alternateName and Brand description/disambiguatingDescription/sameAs link to one stable brand ID. AboutPage.mainEntity and Brand.mainEntityOfPage connect the same identity. Metadata and default HTML match browser-translated copy.
- Homepage/all generated page footers link to the identity page. Sitemap contains20 URLs; only homepage/about page revision dates are26October.
- GitHub profile and the public GitLab brand document use the same definition and link to the identity page. New commits keep the brand/noreply identity; no personal email or local path was added.

## Verification and limits
Build, syntax, edge/telemetry and search checks passed. Twenty sitemap targets/canonical/headings/static links and JSON-LD/CSP hashes validate; cross-page brand IDs are checked. Eighteen local mobile/desktop routes passed with no overflow, broken images or exceptions. Live home/about/sitemap returned200 with exact brand identity and20served URLs.

Google's site-name and generative-search guidance informed this change. No AI-only hidden instructions, made-up Knowledge Graph IDs, fabricated third-party mentions, competitor keywords, llms.txt workaround or forced Knowledge Panel was added. No direct Gemini account/model setting can guarantee which brand will be described. Search Console ownership/indexing is separate from AI answer selection. Re-crawling and answer changes are not immediate or guaranteed; standalone Gemini and Google Search AI summaries are distinct surfaces.

Official references:
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Search Console inspected the new About page as not indexed / URL unknown. Request indexing was clicked once; the last visible state was Testing if live URL can be indexed. No final Indexing requested confirmation or failure was observed. This is an initiated check, not a confirmed indexing submission. The previously indexed homepage is not proof that the new page is indexed or that Gemini now describes the brand correctly.

## Owner-provided LinkedIn
The owner supplied https://www.linkedin.com/in/erol-t-66791821a/ . The site links to it as a personal founder profile in the homepage footer and About page; the public GitHub/GitLab brand documents also link to it. AboutPage.relatedLink describes the association. It is deliberately excluded from Brand.sameAs because a person's profile is not the same entity as the brand. No additional personal details were copied. LinkedIn blocked automated public retrieval (HTTP999), so profile contents and the reciprocal website field were not verified or edited. Adding an outbound link does not create an inbound link from LinkedIn or guarantee a Gemini answer.
