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
- EİP Store contact Website changed from https://eip-frontend.voyagerroc.workers.dev to https://voyagerroctechnologies.com/urunler/eip/ with Change published confirmation. LaserDeck Website changed from empty to https://voyagerroctechnologies.com/urunler/laserdeck/ and saved; review/publication status is being checked.

## Evidence and safeguards
New README commits passed redacted Gitleaks checks. Public website output, source snapshot and outgoing commit are scanned before publication. Raw browser recordings, audit evidence and working scripts stay in ignored qa/; only the final example-data MP4, poster and captions are public. No private keys or credentials are included.
