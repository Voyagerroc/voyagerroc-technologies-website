// Public, evidence-based copy. Do not add client claims or unverified release promises.
export const products = {
  payradar: {
    title: 'PayRadar — Abonelik ve Ödeme Takibi | Voyagerroc Technologies',
    description: 'Kira, abonelik ve taksitleri PayRadar ile takip edin. Çevrimdışı web uygulaması, farklı para birimleri ve Android test sürümü hakkında bilgi alın.',
    heading: 'Abonelik ve ödeme takibi',
    intro: 'Kira, taksit ve abonelik yenilemelerini aynı listede izlemek isteyenler için. Her ödemenin tarihi ve tutarı kayıtta kalır; özet ekranı yaklaşan yükümlülükleri birlikte gösterir.',
    steps: ['Ödemeyi tutarı, para birimi ve tekrar aralığıyla kaydedin.', 'Yaklaşan ödemeleri ve dönem toplamını özet ekranından kontrol edin.', 'Hatırlatmaları kullanacaksanız bildirim iznini açın ve cihazınızda test edin.'],
    faq: [
      ['İnternet olmadan kullanabilir miyim?', 'Web uygulaması çevrimdışı kullanım için hazırlanmıştır. Bulut senkronizasyonu, yeni döviz verisi ve arka plan bildirimleri bağlantı gerektirir.'],
      ['Döviz kurları anlık mı?', 'Hayır. Kaynak günlük kur tablosu sağlar. Çevrimdışı kullanımda son bilinen tablo veya gömülü yedek kullanılabilir; bunlar anlık alış-satış fiyatı değildir.'],
      ['Android sürümü herkese açık mı?', '1.1.0 sürümü Google Play iç test kanalında doğrulanmıştır. Erişim, ilgili test kanalına katılımınıza bağlıdır; mağaza bağlantısının bulunması herkese açık yayın anlamına gelmez.'],
      ['Bildirim her telefonda garanti mi?', 'Bildirim izni, tarayıcı ve cihazın arka plan ayarları teslimi etkileyebilir. Tanılama ve test akışı vardır; gerçek cihazda teslimi ayrıca kontrol etmek gerekir.']
    ]
  },
  laserdeck: {
    title: 'LaserDeck PTT — Bluetooth Bas-Konuş Uygulaması | Voyagerroc Technologies',
    description: 'LaserDeck PTT, Android telefonlar arasında Bluetooth üzerinden bas-konuş, arama ve mesaj aktarımı için geliştirilir. Test erişimini ve kullanım sınırlarını inceleyin.',
    heading: 'Bluetooth üzerinden bas-konuş',
    intro: 'Yakın mesafedeki iki Android cihaz arasında doğrudan iletişim kurmaya odaklanır. Kullanım senaryosu, internet hesabına bağlı bir sohbet hizmetinden farklıdır: bağlantı cihazlar arasında Bluetooth ile kurulur.',
    steps: ['Kurulum rehberinden desteklenen sürümü ve gereken Android izinlerini kontrol edin.', 'İki cihazda Bluetooth bağlantısını kurun ve eşleşmeyi doğrulayın.', 'PTT, arama ve aktarım işlevlerini kullanacağınız ortamda iki cihazla deneyin.'],
    faq: [
      ['İletişim için internet gerekiyor mu?', 'Cihazlar arasındaki iletişim Bluetooth Classic RFCOMM bağlantısını kullanır. Uygulamayı indirmek veya rehbere erişmek için internet gerekebilir.'],
      ['Ne kadar mesafede çalışır?', 'Sabit bir menzil taahhüdü yoktur. Telefon donanımı, engeller ve ortam koşulları bağlantıyı etkiler; gerçek kullanım alanında ölçüm yapılmalıdır.'],
      ['Lazer donanımı kullanıyor mu?', 'Hayır. LaserDeck PTT bu kapsamda Android ve Bluetooth tabanlı bir yazılım projesidir.'],
      ['Test sürümünü nasıl edinebilirim?', 'Bu sayfadaki Google Play ve test kurulum rehberi bağlantılarını kullanın. Kapalı test erişimi hesap ve katılım koşullarına bağlı olabilir.']
    ]
  },
  eip: {
    title: 'EİP — Aday ve İşe Alım Değerlendirme Platformu | Voyagerroc Technologies',
    description: 'Evidence Intelligence Platform, aday belgelerini, çalışma örneklerini ve başvuruları birlikte ele alır. İşveren akışlarını ve ürünün mevcut kapsamını inceleyin.',
    heading: 'Aday değerlendirmesinde belge ve çalışma örneği',
    intro: 'Bir başvuruyu yalnızca özgeçmişteki ifadelerle değerlendirmek yerine, adayın sunduğu belgeleri ve çalışma örneklerini aynı süreçte inceleme yaklaşımıdır. Amaç, değerlendirmede hangi bilginin neye dayandığını görünür kılmaktır.',
    steps: ['Değerlendirilecek rolün gereksinimlerini ve kabul edilecek çalışma örneklerini belirleyin.', 'Aday belgeleri, başvuru bilgileri ve örnekleri birlikte inceleyin.', 'Değerlendirme gerekçelerini raporlayın; işe alım kararını sorumlu kişilerle sonuçlandırın.'],
    faq: [
      ['EİP neyi bir araya getiriyor?', 'Aday kanıt merkezi, başvurular, işveren çalışma alanı ve raporlama aynı ürün kapsamında ele alınır. Canlı erişim tek başına bütün akışların uçtan uca doğrulandığını göstermez.'],
      ['Sistem tek başına işe alım kararı verir mi?', 'Bu sayfa otomatik veya hatasız işe alım kararı vaat etmez. Ürün yaklaşımı, belge ve çalışma örneklerini insan değerlendirmesine daha açık biçimde sunmaktır.'],
      ['Ürünü nasıl inceleyebilirim?', 'Web arayüzünü ve Android test bağlantısını aşağıdan açabilirsiniz. Hesaba bağlı işlevlerin kapsamını bir değerlendirme görüşmesinde netleştirebiliriz.']
    ]
  }
};

export const services = [
  {
    slug: 'web-mobil-uygulama-gelistirme', title: 'Web ve Mobil Uygulama Geliştirme',
    description: 'Web ve mobil uygulama fikrini kapsam, prototip, cihaz testi ve yayın adımlarıyla değerlendirin. Voyagerroc Technologies ürünlerinden somut örneklerle.',
    intro: 'Önce uygulamanın kimin hangi işini çözeceğini netleştiriyoruz. Ardından web, PWA veya mobil uygulama seçimini; cihaz erişimi, çevrimdışı kullanım ve dağıtım ihtiyacına göre değerlendiriyoruz.',
    sections: [
      ['İlk görüşmede neyi netleştiriyoruz?', 'Kullanıcıları, temel ekranları, veri akışını ve uygulamanın çalışacağı cihazları. Hesap, bildirim, ödeme veya dış servis gereksinimi varsa bunları ilk kapsamın içinde ayrıca ele alıyoruz.'],
      ['İncelenebilir çıktı', 'Kapsam netleştikten sonra ekran akışı, prototip ve kabul ölçütleri üzerinde anlaşılır. Kaynak kodu, kurulum notları, test kapsamı ve yayın sorumlulukları teklif ve sözleşmede belirlenir.'],
      ['Portföyden örnek', 'PayRadar çevrimdışı ödeme takibini; LaserDeck PTT ise Bluetooth ve Android cihaz izinlerini gösterir. Bunlar farklı teknik ihtiyaçlara sahip ürünlerdir; her proje için aynı altyapıyı önermiyoruz.']
    ], examples: ['payradar', 'laserdeck']
  },
  {
    slug: 'saas-gelistirme', title: 'SaaS ve Ürün Platformu Geliştirme',
    description: 'SaaS fikrinde kullanıcı rolleri, veri sınırları, yönetim ekranı ve işletim gereksinimlerini birlikte planlayın. EİP ve Bungalow OS üzerinden ürün yaklaşımını inceleyin.',
    intro: 'Bir yönetim ekranı hazırlamak ile işletilebilir bir SaaS kurmak aynı kapsam değil. Kullanıcı rolleri, veri ayrımı, destek, izleme ve maliyetler ürünün ilk tasarımında yer almalı.',
    sections: [
      ['Önce iş akışı', 'Kimin hangi kaydı oluşturduğunu, kimin onay verdiğini ve hangi işlemlerin iz bırakması gerektiğini çıkarıyoruz. İlk sürümü, bu akışın çalıştırılabilir en küçük kapsamına göre planlıyoruz.'],
      ['Abonelikten önce işletim', 'Çok kiracılı yapı, abonelik, faturalama, yedekleme ve veri silme ihtiyacı ayrı kararlardır. Bir prototipi, bu gereksinimler tamamlanmadan yayındaki abonelik hizmeti olarak tanımlamıyoruz.'],
      ['Portföyden örnek', 'EİP aday ve işveren akışlarını; Bungalow OS tesis operasyonları ile onay gerektiren işlemleri ele alır. Bungalow OS geliştirme aşamasındadır; bu örnekler kanıtlanmış müşteri veya çok kiracılı SaaS kullanımı iddiası değildir.']
    ], examples: ['eip', 'bungalow']
  },
  {
    slug: 'si-is-akisi-otomasyonu', title: 'Si Destekli İş Akışı ve Ajan Tasarımı',
    description: 'Si destekli iş akışlarında bağlam, kaynak erişimi, insan onayı ve değerlendirme ölçütlerini planlayın. Pharos ve Bungalow OS yaklaşımlarını inceleyin.',
    intro: 'Bir iş akışına model bağlamak tek başına yeterli değil. Hangi kaynağın kullanılacağı, hangi aracın neye erişebileceği ve hangi adımda insan onayı gerektiği birlikte tasarlanmalı.',
    sections: [
      ['Bağlamı hazırlamak', 'Context engineering; göreve uygun talimatları, verileri ve kaynakları hazırlama işidir. Gereksiz veriyi her adımda taşımak yerine, görevin ihtiyaç duyduğu bilgiye erişimi planlıyoruz.'],
      ['Arama ve araç seçimi', 'Hibrit arama, kelime eşleşmesini ve vektör benzerliğini birlikte kullanır. Pharos bu yaklaşımın portföydeki örneğidir. Arama, dosya işleme ve yayın gibi görevlerde araç seçimini işin gereğine göre yapıyoruz.'],
      ['Onay ve değerlendirme', 'Dış sistemde değişiklik yapacak adımlarda yetki ve onay sınırı belirlenir. Örnek görevler, beklenen çıktılar ve başarısızlık durumları proje kapsamında değerlendirilir; burada ölçülmüş bir başarı oranı veya sınırsız otonomi iddiası yoktur.']
    ], examples: ['pharos', 'bungalow']
  }
];
