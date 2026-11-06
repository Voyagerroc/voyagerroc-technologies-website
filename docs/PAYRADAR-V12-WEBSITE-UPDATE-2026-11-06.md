# PayRadar website and video update — 6 November 2026

Owner requested that the corporate site and product presentation reflect the latest Android changes. Updated and deployed to `https://voyagerroctechnologies.com`.

## Content and media

- TR/EN PayRadar product pages, portfolio data/cards and Android access copy now distinguish the owner-reported current store version **2.1.4-phoenix (11)** from the signed **2.1.5-phoenix (12) candidate**. Candidate store publication has not been verified.
- Added payment overview, separate-currency monthly estimates, Turkish search, filter reset, inline date/amount/installment validation, stale-edit protection, payment undo, offline reminder recovery and separate legal-notice sections.
- Updated the technical note with the 6 November native reminder work. Earlier web push notes remain explicitly historical; no web interface is presented as the current Android product.
- Captured authentic version12 Android preview screens in isolated API36 emulator `emulator-5588`, using only the opt-in synthetic fixture. No real customer data, production package, login or cloud upload was used. Cleaned up the fixture and stopped only the owned emulator afterward. PayRadar source remained clean.
- New **36-second, 720×1600 H.264** silent screen tour: overview, payment cards, editor, KVKK notice, dark theme and tablet layout. Tablet aspect ratio is preserved. TR/EN WebVTT captions, poster and written summary updated. The video is labelled as a screenshot tour, with sample data and candidate status; it is not a live interaction recording or a real-device acceptance test.
- New versioned media URL: `/assets/demos/payradar-native-v12-20261106.mp4`; 458,751 bytes; SHA-256 `1c25e8f441a36ec06f6dfc40cc66b4fc2933f944009d7f82b6cacca18d5febbf`.
- Replaced the product image with `/assets/payradar-phoenix-v12.png`. Removed the superseded tour/poster/captions, old product image and unused old calendar capture from the current source/deployment inventory. This does not claim deletion of Git history or every provider/browser cache.

## Verification

- `npm run predeploy`: passed, including build/syntax, edge, telemetry, security and **41 sitemap pages**. No new analytics, consent or account processing enabled; generated CSP hashes reflect the updated content.
- `npm run check:audit`: **8 TR/EN responsive flows** at 320/390/768/1440px; no overflow/page errors/external requests; home accessibility, navigation/dialog focus, no-JS, motion and portfolio filtering passed.
- New `npm run check:payradar-video`: **8 product-page flows**, real decoding/playback of the 36-second video and seeks to all six scenes, no overflow/page errors/failed responses; two mobile WCAG scans passed. Repeated after correcting cold-start captures so dark/tablet scenes show the dashboard rather than the launch screen.
- Same video suite with `--live`: **8/8 passed** against the custom domain, including all scene seeks.
- Live TR/EN HTML, MP4, poster, both caption files and product image: **7/7 SHA-256 matches** to local deployment files. The CDN returned a complete MP4 with HTTP200 for a Range request, rather than206; exact-body verification and browser playback/seeking passed. No partial-response claim is made.
- Superseded `/assets/demos/payradar-native-tour-20261106.mp4` returns **404** on the live custom domain.
- Manual visual inspection of form, legal notice, dark theme, tablet and encoded frames completed. Original capture timing was corrected before final deployment.

## Deployment and limits

- `npm run deploy`: successful with predeploy checks; Worker `voyagerroc-technologies`, custom apex/www domains and workers.dev route.
- Cloudflare version ID: `67688ac3-8f71-4712-85a8-ec796f77e7d0`.
- This publishes the corporate website only. It does not upload/review/roll out an Android package, publish the separate PayRadar access domain's legal files, complete provider agreements or certify legal compliance.
