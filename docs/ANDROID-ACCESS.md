# Android access and tester enrollment

The corporate website routes Android buttons to `/android/#<product>` for PayRadar, LaserDeck PTT and EİP. Tabela is a public web application and is linked directly, including from this guide.

## Verified configuration — 27 October 2026

Public self-join group: https://groups.google.com/g/voyagerroc-technologies-android-testers

The group accepts anyone on the web. Only the owner can view the member list and conversations or post. Joining the group is separate from Google Play consent and does not grant download access before the corresponding track is published.

PayRadar and EİP use separate closed `Website Testers` tracks. Their existing Alpha email lists were preserved. Existing 1.1.0 artifacts (version code 2) were reused. The new group, 178 country/region targets and release changes were submitted for review. `review` mode displays the group link and honest pending instructions while retaining the store link for existing authorized testers. The actual Google Play opt-in link is intentionally withheld until it has been copied and verified against the published track.

LaserDeck remains `pending`: no available closed-test release was verified. It has no download CTA in the guide. Do not suggest that joining a group makes this unpublished app installable.

## Modes and verification

`content/android.mjs` controls access. Modes: `restricted`, `review`, `pending`, `group`, `open`, `production`. Only use `group` after the release is available and the actual opt-in URL is copied from Console. Verify the complete group → Google Play consent → installation route with an eligible new account before claiming public self-service works. The site cannot verify Google membership, and it never marks visitors enrolled from clicks.

Internal tests are limited; personal developer accounts can require closed testing before production/open testing. Do not bypass account eligibility, invent device tests or submit unrelated declarations. Review submission is not approval.

Sources: https://support.google.com/googleplay/android-developer/answer/9845334 and https://support.google.com/googleplay/android-developer/answer/14151465 .

LaserDeck follow-up: the existing Alpha draft is version 3 (1.0.2), targeting one country/region. Console blocks preview/save with: "You must let us know whether your app uses any Foreground Service permissions." The declaration currently identifies `FOREGROUND_SERVICE_CONNECTED_DEVICE`. No permission answers or unsupported demonstration evidence were submitted. Complete and validate the real connected-device workflow before publishing its test.
