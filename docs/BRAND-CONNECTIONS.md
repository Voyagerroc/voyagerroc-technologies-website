# Brand links and product evidence — 25 October 2026

## Completed
- GitHub public profile README: Voyagerroc Technologies domain and PayRadar/LaserDeck/EİP product links. Profile repository homepage also set to the corporate domain.
- GitLab PayRadar, LaserDeck and eip-core README files link to the brand and corresponding product pages. Documentation-only updates used separate checkouts where remote histories diverged; unrelated application changes were preserved.
- PayRadar Play Console Store settings Website changed from https://payradar-bkp.pages.dev to https://voyagerroctechnologies.com/urunler/payradar/ . Console confirmed Change published. This changes the store contact website, not the application's launch origin or privacy policy.
- PayRadar browser demo and technical case study published on the corporate site. The recording uses only sample data in a fresh browser context and demonstrates a real payment addition and service-worker-controlled offline reload. No notification receipt is staged or claimed.

## Access limits
- GitHub account-level Website field could not be changed: authenticated token lacks user scope. The public profile README and repository homepage provide the brand links instead; no auth scope expansion was performed.
- GitLab account profile API returned HTTP 403. No profile/account permission settings were changed. Product README links were published via the already authorized Git transport.
- No Android device was connected via adb. Physical-phone notification delivery and two-device Bluetooth operation are not verified by this browser recording.
- EİP Store contact Website changed from https://eip-frontend.voyagerroc.workers.dev to https://voyagerroctechnologies.com/urunler/eip/ with Change published confirmation. LaserDeck Website changed from empty to https://voyagerroctechnologies.com/urunler/laserdeck/ and saved. Publishing overview contains 11 other pending items (testing, listing, app-content declarations and category); review submission is disabled. Those unrelated items were not changed or submitted. The website value is saved, but its publication is not confirmed.

## Evidence and safeguards
New README commits passed redacted Gitleaks checks. Public website output, source snapshot and outgoing commit are scanned before publication. Raw browser recordings, audit evidence and working scripts stay in ignored qa/; only the final example-data MP4, poster and captions are public. No private keys or credentials are included.

## Public visibility check
Unauthenticated GitLab API confirms PayRadar is public. The LaserDeck and eip-core paths returned 404 without credentials (including lowercase LaserDeck); their public visibility is not established. No repository visibility was changed and those two README links are not counted as confirmed publicly crawlable mentions. GitHub profile and corporate product pages are public.

## 26 October 2026: minimal public brand pages
GitHub profile README now uses only the brand, factual product summaries and official website links. New profile and GitLab brand-document commits use the brand name and GitHub account noreply address. GitLab has an anonymously accessible brand document at https://gitlab.com/Voyagerroc/payradar/-/blob/main/docs/voyagerroc-technologies.md (public project, raw document HTTP200), linked from its README. No private repository was made public. The website visibly links to both verified public brand pages and lists them in Brand sameAs. New text contains no personal email, local path or credential. Existing account identity and historical commits were not deleted or rewritten; public publication is not anonymous or footprint-free.
