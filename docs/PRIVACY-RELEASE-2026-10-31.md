# Privacy remediation and operations

Technical owner: Erol Taşcı. Updated 2026-10-31. This records source changes, not a legal approval or completed provider verification.

## Implemented

- The project brief is no longer placed in a WhatsApp URL. The visitor copies and pastes it explicitly. Opening the link does not automatically send a message.
- Email sharing hands the brief to the visitor's selected mail application. No automatic backend submission or marketing enrollment is added.
- The form has a privacy notice link and a request not to share passwords, identity documents or customer data. The notices now distinguish a local brief form from a server submission form.
- Optional analytics remains off on both client and server. No advertising/newsletter sender is installed. Self-hosted fonts and scripts remain self-hosted.
- Unexpected upstream failures now return a generic uncached response with security headers; minimised security records do not include the underlying message, URL query, IP, cookies or brief.
- `data-breach.md` defines incident coordination, evidence handling, awareness time, escalation and 72-hour tracking. A named backup coordinator and a recorded drill remain required operational tasks.
- `check:security` scans tracked/new source and built browser files for common secret formats without printing matches. CI runs it with pinned action revisions and read-only repository permissions.

## Retention procedure

Each month the owner reviews support, project-enquiry and data-request mail/WhatsApp threads. Record purpose, request closure, any documented hold/reason, next review date and deletion evidence. Remove records once the purpose and any justified hold end; do not use indefinite inbox retention as a default. Exported reports and backups must be included in the review. No personal correspondence is copied into the public repository.

For Cloudflare/Google/WhatsApp separately record: contract owner, processing region/subprocessors, overseas-transfer mechanism verification, actual retention, access roles/MFA, recovery access and deletion/backups. Provider dashboard and contract facts cannot be replaced by public privacy prose. The earlier `PRIVACY-OPERATIONS.md` pending activation checks still apply; analytics stays off while unmet.

## Marketing gate

Keep marketing disabled until a specific feature requires it. Before activation: separate unchecked choice, purpose/channel/policy version, UTC opt-in and withdrawal dates, minimal evidence, suppression checks at actual send time, working unsubscribe on every marketing email, verified sender postal address, and withdrawal tests. A contact message or Google login is never reused as marketing permission. Do not invent an address, consent record, contract signature or legal entity.

## Production checklist

- [ ] Owner verifies provider contracts, processing/transfer register and actual log/backups retention.
- [ ] Owner verifies MFA, least privilege, alert destination and named incident backup.
- [ ] Document incident drill and monthly retention review.
- [ ] Publish the tested static build and worker together; check live form links, zero automatic brief transfer and generic failure behavior.

These unchecked items remain visible release gates. No claim of complete legal compliance or zero penalties is made.

## Verification result

Build, syntax, edge failure/security headers, analytics/consent and all 27 SEO routes passed. Four browser flows (TR/EN, 360/1440px) passed: privacy link, literal text rendering, no third-party URL brief, no automatic requests, no persisted brief, no overflow. Secret scanning found no common secret-format matches. The implementation is local and has not been published to the live worker in this turn.
