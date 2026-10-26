# Android access and tester enrollment

The corporate website routes Android entry buttons to `/android/#<product>` for PayRadar, LaserDeck PTT and EİP. The existing Google Play URLs remain available for already authorized testers. The guide is visible without a Google account; Google, not this site, handles tester consent and membership.

`content/android.mjs` controls the published access instructions. `restricted` is the current conservative setting: no public enrollment URL has been verified for any of the three apps in this change. The page offers an email access request rather than claiming that clicking a store link makes someone a tester.

For an eligible open test, copy the actual opt-in URL from Play Console and set `mode: 'open'`. For a closed test using a Google Group, first configure a real eligible group in Console, verify self-join settings and membership privacy, copy its public join URL and the actual opt-in URL, then set `mode: 'group'`. The guide orders group membership before Google Play consent. Never publish a guessed group address, infer account eligibility, scrape tester emails or mark a visitor enrolled from a button click.

An internal test is limited and is not a public self-service distribution channel. New personal developer accounts can require closed testing before production/open testing; verify account eligibility and the exact app release status in Console. Production release review cannot be bypassed by website settings. Do not submit unrelated pending app declarations or claim device tests were completed to unlock access.

Sources: https://support.google.com/googleplay/android-developer/answer/9845334 and https://support.google.com/googleplay/android-developer/answer/14151465 .

Status26October2026: guide and safe fallback implemented. Current CLI profile records LinkedIn only; Google Console login requested. No Play track, audience, Google Group or release was changed. Public tester self-enrollment is pending account access and verified enrollment configuration.
