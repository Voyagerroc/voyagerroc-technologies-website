# PayRadar product video correction

The user identified the product-page introduction video, not the image card. The current TR and EN PayRadar product pages now use `payradar-native-tour-20261106.mp4` instead of the retired web-app recording.

- Real Android native emulator screenshots: home, payment editor, Material 3 date picker and settings. Source files are retained under `content/media/payradar-native/`; they contain no signed-in account or personal records.
- 24-second, 720×1600 H.264/yuv420p MP4 with fast-start metadata, native poster and TR/EN WebVTT captions. File size approximately 267 KB.
- Clearly labelled as a screenshot-based screen tour, not a live interaction recording or physical-device test. No synthetic clicks or fabricated transactions were added.
- `scripts/build-payradar-native-video.mjs` rebuilds the tour with FFmpeg. Font is read from the local OS (or `VIDEO_FONT`); no system font file is published.
- `content/studies.mjs` now distinguishes `payradarDemo` (current native screen tour) and `payradarArchiveDemo` (historical web case study). The old web recording remains only in the explicitly historical web-push article.
- Product video layout uses the native portrait aspect ratio. Product-page checks reject the retired web video URL. Full predeploy checks passed.

Prepared locally; not deployed. Publishing remains subject to the pending publication authorization.


## Git eşitlemesi — 6 Kasım 2026
Eski web videosu, posteri, altyazısı ve kullanılmayan web ekranı yayın ağacından kaldırıldı. Tarihsel teknik yazı da güncel native ekran turunu kullanır. README masaüstü ve mobil önizlemeleri son başarılı tarayıcı testindeki ekranlarla güncellendi. Git geçmişi yeniden yazılmaz.
