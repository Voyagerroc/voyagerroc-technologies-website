# Voyagerroc Technologies — canlı dağıtım doğrulaması

6 Kasım 2026. Kullanıcı, yerel uygulama raporundan sonra canlıya alma işlemini açıkça onayladı.

- Site: https://voyagerroctechnologies.com/
- Worker: `voyagerroc-technologies`
- Cloudflare sürümü: `1781b365-8fd3-47e2-a5a3-cb97de350347`
- Dağıtım komutu: `npm run deploy` (otomatik `predeploy` kontrolleri dahil)
- Sonuç: Başarılı. Altı değişen statik dosya yüklendi; özel alan adı ve www tetikleyicileri yayımlandı. Worker başlangıcı CLI çıktısında 2 ms.

## Canlı doğrulama

| Kontrol | Sonuç |
|---|---|
| Ana sayfa, İngilizce ana sayfa ve incelenen statik dosyaların SHA-256 eşitliği | Canlı yanıtlar incelenen yerel build ile birebir eşleşti |
| HTML cache | `public, max-age=0, must-revalidate, no-transform` |
| JS/CSS/poster cache | `public, max-age=3600, must-revalidate, no-transform` |
| Kayıp `.js` | 404; uzun statik cache uygulanmadı |
| Güvenlik başlıkları | CSP script-src-attr none, COOP/CORP same-origin, nosniff doğrulandı |
| www yönlendirmesi | 308; ürün yolu ve sorgu korunarak ana alan adına yönlendirildi |
| 320/390/768/1440 px × Türkçe/İngilizce | Sekiz akış geçti; axe erişilebilirlik ihlali, JavaScript hatası, yatay taşma veya harici kaynak isteği yok |
| Gerçek tarayıcı cache kullanımı | İkinci gezinmede CDP üzerinden 18 kaynak cache hit olayı gözlendi; bunların tamamının disk cache olduğu iddia edilmedi |
| Ürün görseli/başlığı ve önizleme | Doğrudan ürün sayfası bağlantıları, ayrı modal düğmesi ve klavye odağı testleri geçti |
| Seçim rengi, Türkçe metin, düğme yerleşimi | Geçti |
| Zararlı HTML nitelikleri ve URL şeması | Tarayıcı içi fixture testleri geçti; sunucu içeriği değiştirilmedi |
| WhatsApp pano akışı | TR/EN başarı ve izin reddi senaryoları geçti; sabit bağlantı korundu, dış pencere testte stub ile engellendi; gerçek mesaj gönderilmedi |
| Bağımsız Firecrawl canlı okuma | HTTP 200; EİP, PayRadar ve LaserDeck derin ürün bağlantıları bulundu |

`predeploy` aşamasında build, syntax, edge, telemetri, 41 sitemap sayfası ve scene yükleyici kontrolleri yeniden geçti. Sır taraması 202 dosyada bulgu üretmedi.

## Canlı mobil performans

Chrome/Lighthouse varsayılan mobil simülasyonuyla gerçek HTTPS alan adına tek koşu:

- Performans puanı: **92/100**
- LCP: **2.148 ms (2,15 saniye)**
- Toplam bloklama süresi: **301 ms**
- CLS: **0,00015**
- Lighthouse uyarısı: yok.

Bu bir laboratuvar ölçümüdür; gerçek telefon/alan verisi veya sürekli performans garantisi değildir. PDF'deki **LCP < 2 saniye hedefi henüz sağlanmadı**. Yerel önce/sonra değerleriyle sunucu ve ağ koşulları aynı olmadığı için doğrudan sayısal iyileşme oranı çıkarılmadı.

## Kanıtlar ve kapsam

Ignored `qa/orchestration/` altında `deploy-20261106.log`, `verify-live.cjs`, `live-http-browser-20261106.json`, `live-report-fixes-results-20261106.json`, `lighthouse-live-20261106.json`, `live-mobile-20261106.png` bulunur. QA koşucusu mevcut kabul testini bellek içinde HTTPS hedefine yönelterek tekrar kullandı; yayımlanan kaynak dosyaları test sırasında değişmedi.

Kodlama aşamasındaki Sonnet/Flash işçi çıktıları önceki [uygulama raporunda](teknik-rapor-uygulama-2026-11-06.md) açıklanır. Bu aşamada Codex dağıtımı ve canlı kabul kontrollerini yürüttü. Ek model çağrısı yapılmadı; mevcut kanıtların doğrulanması için gerekli değildi.

Git commit/push veya skill oluşturma yapılmadı. Skill adı kullanıcının sonuç değerlendirmesine bırakıldı. Sıfır izleme, hukuki uygunluk veya dış sağlayıcı sözleşmeleri hakkında bu teknik testlerin ötesinde yeni bir garanti verilmedi.
