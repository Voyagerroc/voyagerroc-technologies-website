# Veri ihlali müdahale planı

Sürüm: 2026-10-31. Kapsam: voyagerroctechnologies.com, kurumsal iletişim, Cloudflare, Google ve isteğe bağlı WhatsApp kanalı.
Bu dosya işletim prosedürüdür; gerçekleşmiş bir ihlal kaydı veya tamamlanmış uygunluk onayı değildir.

## Sorumluluk ve erişim

- Birincil ürün/teknik koordinasyon: Erol Taşcı; iletişim: voyagerroc@voyagerroctechnologies.com.
- Yedek koordinatör: henüz atanmadı. Üretim kabulünden önce isim, telefon, erişim yetkisi ve tatbikat kaydı tamamlanmalı.
- Veri sorumlusu adına bildirim kararı/gönderimi: yetkili kişi tarafından yürütülür; görevlendirme olay kaydına yazılır.
- Sağlayıcı kanalları: Cloudflare, Google, WhatsApp hesaplarının resmî destek/güvenlik kanalları.
- Üretim erişimi kişisel ve MFA korumalı hesaplarla verilir. Kurtarma kodları kod deposuna veya bu belgeye konmaz.

## Tetikleme ve zaman takibi

Yetkisiz erişim, ifşa, yanlış alıcı, cihaz/anahtar kaybı, veri bütünlüğü kaybı ve sağlayıcı ihbarları değerlendirmeye alınır.
Her hata otomatik olarak bildirilecek veri ihlali sayılmaz. Karar, kapsam ve gerekçesi kaydedilir.
İlk fark edilme ile veri sorumlusunun öğrenme zamanını ayrı UTC alanlarında tutun; araştırmayı bitirmeyi bekleyerek saati sıfırlamayın.
Öğrenme zamanına göre 24/48/60/70 saat kontrol görevleri ve 72 saat son tarihi açın; yedek kişiye erişim sağlanana kadar birincil kişi takibi devretmez.

## Müdahale adımları

1. **0–4 saat:** olay numarası açın; koordinatörü bilgilendirin; etkilenen sistemi sınırlandırın. Gereken oturumları iptal edin, anahtarları döndürün. Aktif istismarı durdururken delil/log silmeyin.
2. **4–24 saat:** etkilenen hesapları, veri türlerini, kişi/kayıt sayılarını, zaman aralığını, erişim yolunu ve sağlayıcıları belirleyin. Belirsizlikleri açıkça yazın. Gerçek finansal içeriği genel görev sistemine taşımayın.
3. **24–48 saat:** olası etkileri ve alınan önlemleri değerlendirin. Bildirim sorumlusu, karar gerekçesi, iletişim kanalı ve gerekli resmî form için görev açın. Gerekli uzman incelemesini koordine edin.
4. **Gecikmeksizin / en geç 72 saat:** bildirime konu ihlalde Kurul bildirimini öğrenme zamanına göre takip edin. Bilgiler eksikse aşamalı tamamlamayı planlayın; gecikme varsa gerekçeyi kaydedin. Otomatik dış bildirim gönderilmez; yetkili kişi içeriği doğrular.
5. **İlgili kişiler:** etkilenen kişiler belirlendikten sonra makul olan en kısa süre için ayrı bildirim görevi açın. Olay, etki, alınan tedbirler, kişinin yapabilecekleri ve iletişim noktası anlaşılır olmalı. İlgili kişi bildirimi ile Kurul bildiriminin zamanlamasını aynı alan sanmayın.
6. **Geri dönüş:** temiz sürümü ve erişim sınırlarını doğrulayın; geri yüklemenin silinmiş veriyi yeniden etkinleştirmediğini kontrol edin. Gerekirse eski yedeklere silme listesini yeniden uygulayın.
7. **Kapanış:** kök neden, test kanıtı, bildirim kayıtları, açık riskler ve düzeltme sorumlularını kaydedin. Olay sonrasında ve en az altı ayda bir planı gözden geçirin; yılda en az bir masa başı tatbikat yapın. Bunlar işletim tercihleridir.

## Olay kayıt şablonu

Olay ID / ilk fark edilme UTC / öğrenme UTC / 72 saat son tarihi / koordinatör ve yedek / etkilenen hizmetler / veri ve kişi kapsamı / bilinenler ve belirsizlikler / kanıt konumu ve erişim listesi / yapılan işlemler ve zamanları / bildirim kararı ve yetkilisi / gönderim ve takip kayıtları / geri dönüş testleri / saklama inceleme tarihi / kapanış onayı.

Kanıt arşivi erişimi sınırlıdır. Parola, token, imzalı portal URL'si, PIN veya tam ödeme içeriği loglanmaz. Olay kayıtlarının saklama süresi ve varsa muhafaza gerekçesi ayrıca belirlenir; süresiz genel log arşivi oluşturulmaz.

Kaynak: https://www.kvkk.gov.tr/Icerik/5362/Veri-Ihlali-Bildirimi — 2019/10 sayılı karar açıklaması.
