export const payradarDemo = {
  src: '/assets/demos/payradar-demo-20261025.mp4',
  poster: '/assets/demos/payradar-demo-20261025.jpg',
  captions: '/assets/demos/payradar-demo-20261025.tr.vtt',
  title: 'PayRadar: ödeme ekleme, Orbit 3D ve çevrimdışı kullanım',
  note: 'Gerçek web uygulamasından, yalnızca örnek ödeme kayıtlarıyla alınmış sessiz tarayıcı kaydı. Ödeme ekleme, Orbit 3D görünümü ve ağ kapatıldıktan sonra yeniden açılış gösterilir. Fiziksel telefonda bildirim teslimi bu videoda test edilmez.'
};

export const studies = [{
  slug: 'payradar-web-push-bildirimleri',
  title: 'PayRadar Web Push Bildirimleri: Sorun, Düzeltme ve Test | Voyagerroc Technologies',
  heading: 'PayRadar bildirimleri: hata sonrası toparlanan motor',
  description: '30 Ekim PayRadar güncellemesi: otomatik yeniden deneme, abonelik yenileme, cihaz gösterim onayı ve gün sayacı düzeltmesi. Geliştirme notları ve doğrulama sınırları.',
  date: '2026-10-25',
  modified: '2026-10-30',
  intro: 'Telefona bildirim gelmediğinde tek bir düğmeyi düzeltmek yetmiyor. Tarayıcının izni, abonelik kaydı, sunucudaki plan ve push servisine çıkan istek ayrı ayrı kontrol edilmeli. PayRadar’da da sorun bu hattın birden fazla yerindeydi.',
  sections: [
    {heading: '30 Ekim güncellemesi: hata sonrası toparlanan bildirim motoru', paragraphs: [
      'Arka plan bildirimleri için kalıcı gönderim günlüğü eklendi. Aynı günlük gönderim eşzamanlı işlemlerde korunur; işlem yarıda kalırsa süreli kilit açılarak yeniden denenebilir. Geçici bağlantı ve sağlayıcı hatalarında artan aralıklarla, en fazla altı deneme yapılır. Sağlayıcının yeniden deneme için bildirdiği bekleme süresi de dikkate alınır.',
      'Günlük kontrol beş dakikada bir çalışır; uygun vadeler yerel saat 09.00 sonrasında değerlendirilir. Süresi dolan aboneliğin tekrar kaydedilmesi yerine yenilenmesi sağlandı. Ayarlar ekranındaki tanılama, gönderim durumunu ve günlük kontrol motorunun çalışmasını ayrı gösterir.',
      'Cihaz, bildirim gösterme işlemi tamamlandıktan sonra imzalı bir onay gönderir. İnternet kesilirse bu onay cihazda saklanır ve bağlantı olduğunda tekrar iletilir. Bu kayıt, insanın bildirimi gördüğünü, okuduğunu veya ses duyduğunu kanıtlamaz; yalnızca bildirim gösterme işleminin cihaz tarafından onaylandığını belirtir.',
      '39 mantık/Worker testi ve 59 tarayıcı testi geçti. Worker ve web sürümü 30 Ekim’de canlıya alındı; canlı dosya eşleşmesi, kayıt yetkilendirmesi ve sahte onayların reddedilmesi doğrulandı. Yeni zamanlayıcının ilk canlı çalışması Türkiye saatiyle 12.55’te hatasız tamamlandı. Fiziksel Android teslimatı bu otomatik kontrollerden ayrı bir kabul testidir.'
    ]},
    {heading: '30 Ekim güncellemesi: gecikmiş ödeme ve gün sayacı', paragraphs: [
      'Aylık ödeme, sabit 30 gün değil bir takvim ayı olarak ilerler. 28 Ekim vadeli ödeme 30 Ekim’de ödendiğinde yeni vade 28 Kasım olur ve 29 gün kalır. 28 Kasım vadeli ödeme 30 Kasım’da ödendiğinde ise 28 Aralık’a 28 gün kalır. Ödeme işlemi eski vadeden bir dönem ilerler; gecikme yeni döneme eklenmez ve diğer ödenmemiş dönemler atlanmaz.',
      'İncelemede ayrı bir gösterim hatası bulundu: uygulama gece açık bırakıldığında gün sayacı eski tarihi gösterebiliyordu. Kartlar ve ana özet artık yerel gece yarısında ve uygulamaya dönüldüğünde yenileniyor. Takvim ayına bağlı mevcut vade günleri korunuyor.'
    ]},
    {heading: 'İlk sorun: ekrandaki ayar ile gönderilen ayar aynı değildi', paragraphs: [
      'Bildirimler ayar ekranında açılmışken, arka plan kaydı bazı adımlarda henüz kaydedilmemiş tercihi kullanmıyordu. Kullanıcı düğmeyi açtığını görse de kayıt işlemi önceki kasa durumuyla ilerleyebiliyordu.',
      'Arka plan etkinleştirmesi güncel ayar taslağıyla çalışacak şekilde düzenlendi. Kontrol yalnızca düğmenin rengine bağlanmadı: tarayıcı aboneliği ve sunucudaki kayıt durumu da tanılama akışına eklendi.'
    ]},
    {heading: 'İkinci sorun: istek daha ağa çıkmadan reddediliyordu', paragraphs: [
      'Push gönderimi için hazırlanan istek, Cloudflare workerd ortamında redirect: "error" seçeneği nedeniyle başarısız oluyordu. Node üzerinde ağ isteğini taklit eden test, bu çalışma ortamı farkını ortaya çıkarmamıştı.',
      'Aynı istek gerçek workerd çalışma ortamında yeniden denendiğinde hata ağdan önce üretildi. Yönlendirme davranışı "manual" olarak değiştirildi. Böylece istek otomatik olarak başka bir adrese yönlendirilmez; başarılı olmayan HTTP yanıtları da ayrıca hata olarak ele alınır.'
    ], code: 'const response = await fetch(endpoint, {\n  ...payload,\n  redirect: "manual",\n});\nif (!response.ok) {\n  // Teslim edildi varsayma; başarısız yanıtı işle.\n}', codeNote: 'Bu örnek yalnızca yönlendirme ve HTTP durum kontrolünü gösterir. Gerçek abonelik adresi, yetkilendirme başlığı veya anahtar içermez.'},
    {heading: 'Kabul edildi ile telefonda görüldü farklı sonuçlar', paragraphs: [
      'Push servisinin isteği kabul etmesi, bildirimin telefon ekranında görüldüğü anlamına gelmez. İşletim sisteminin arka plan kısıtlamaları, izinler ve tarayıcı davranışı son aşamayı etkileyebilir.',
      'Bu nedenle test geri bildirimi sunucunun isteği kabul etmesiyle sınırlı tutuldu. Bağlantı kontrolü; bildirim iznini, kayıt durumunu ve uygun vade olup olmadığını ayrı bilgiler olarak gösterir. Kayıt yenileme akışı da arızayı anlamayı kolaylaştırmak için eklendi.'
    ]},
    {heading: 'Neyi doğruladık, neyi henüz doğrulamadık?', paragraphs: [
      'Yayın öncesi ilgili doğrulamada 28 mantık/Worker testi ve 50 tarayıcı testi geçti. Workerd üzerinde istek oluşturma sorunu yeniden üretildi ve düzeltildi. Canlı varlıklar, servis çalışanı ve geçici kayıt durum/silme kontrolleri ayrıca incelendi. Bunlar 25 Ekim 2026 tarihli kontrollerdir; her cihaz için sürekli başarı oranı değildir.',
      'Android 1.1.0, Google Play iç test kanalında doğrulandı. Fiziksel telefonda, uygulama kapalıyken gerçek bildirimin görünmesi bu çalışmanın açık doğrulama adımıdır. Bu yazı, o testi tamamlanmış gibi sunmaz.'
    ]},
    {heading: '27 Ekim güncellemesi: günlük uyarı ve doğru saat bilgisi', paragraphs: [
      'Günlük hatırlatma, önceki günün okunmamış bildirimiyle aynı etiketi kullandığında mevcut bildirimi sessizce yenileyebiliyordu. Günlük gönderim de yeniden uyarı isteyecek şekilde düzenlendi. Bu tercih telefonun bildirim izinlerini veya Rahatsız Etmeyin ayarını geçersiz kılmaz.',
      'Bağlantı kontrolü artık uygun vade bulunmaması, yerel saat 09.00’ın beklenmesi ve günlük gönderim kaydı bulunmasını ayrı gösteriyor. Worker ve web düzeltmeleri 27 Ekim’de yayımlandı; 30 mantık testi ve ilgili tarayıcı testi geçti. Fiziksel telefonda görünürlük doğrulaması bu sonuçlardan ayrıdır.'
    ]},
    {heading: 'Bu çalışmadan çıkardığımız uygulama kararı', paragraphs: [
      'Testlerde ağ yanıtını taklit etmek yararlı; ama istek daha gönderilmeden çalışma ortamı tarafından reddediliyorsa yeterli olmuyor. Böyle bir sorunda aynı isteği ürünün çalıştığı ortamda sınamak gerekiyor.',
      'İkinci karar, kullanıcıya tek bir "çalışıyor" etiketi göstermek yerine hattın hangi bölümünün doğrulandığını söylemek. Kayıt bulundu, uygun vade var, istek kabul edildi ve telefonda görüldü birbirinin yerine kullanılabilecek ifadeler değil.'
    ]}
  ],
  references: [
    ['PayRadar kaynak deposu', 'https://gitlab.com/Voyagerroc/payradar'],
    ['Cloudflare düzeltmesini içeren kaynak sürümü', 'https://gitlab.com/Voyagerroc/payradar/-/commit/20b9958d26459acc5d6e545d1408717d94dea01b'],
    ['PayRadar ürün sayfası', '/urunler/payradar/']
  ]
}];
