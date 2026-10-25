/* Curated public product data. No private paths or account identifiers. */
window.PORTFOLIO_PROJECTS = [
  {
    "id": "eip",
    "name": "Evidence Intelligence Platform",
    "short": "EİP",
    "category": "platforms",
    "status": "web",
    "stack": [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Kotlin"
    ],
    "live": "https://eip-frontend.voyagerroc.workers.dev",
    "image": "assets/eip-icon.png",
    "featured": true,
    "tr": {
      "tag": "Yetenek & işe alım platformu",
      "summary": "Belge ve çalışma örnekleriyle aday değerlendirme.",
      "description": "Adayların deneyimini belgeleri ve çalışma örnekleriyle birlikte ele alan; başvuru, işveren ve değerlendirme süreçlerini aynı çatı altında buluşturan platform.",
      "problem": "Bir özgeçmişin anlattıkları ile kişinin gösterebildikleri her zaman aynı şey değil.",
      "approach": "Aday kanıt merkezi, başvurular, işveren çalışma alanı ve raporlar üzerinden daha incelenebilir bir süreç kuruyor.",
      "scope": "Tanıtım ve giriş arayüzü erişilebilir. Canlı sayfanın açılması; tüm API, değerlendirme veya mobil akışların test edildiği anlamına gelmez.",
      "visual": "Ürünün mevcut uygulama ikonu."
    },
    "en": {
      "tag": "Talent & recruitment platform",
      "summary": "Candidate evaluation with documents and work samples.",
      "description": "A platform connecting experience with documents and work samples, bringing applications, employer workflows and evaluation into one workspace.",
      "problem": "What a CV says and what a person can demonstrate are not always the same.",
      "approach": "A candidate evidence centre, applications, employer workspace and reporting make the process more inspectable.",
      "scope": "The public landing interface is accessible. This does not establish end-to-end API, evaluation or mobile testing.",
      "visual": "The project's existing app icon."
    },
    "androidTest": "https://play.google.com/store/apps/details?id=com.voyagerroc.eip"
  },
  {
    "id": "payradar",
    "name": "PayRadar",
    "category": "apps",
    "status": "web",
    "stack": [
      "React",
      "TypeScript",
      "PWA",
      "WebCrypto"
    ],
    "live": "https://payradar-bkp.pages.dev",
    "androidTest": "https://play.google.com/store/apps/details?id=com.payradar.app",
    "image": "assets/payradar-current-demo.png",
    "featured": true,
    "tr": {
      "tag": "Günlük hayat / Finans",
      "summary": "Abonelik, taksit ve düzenli ödeme takibi.",
      "description": "Kira, abonelik ve taksitleri bir araya getiren; çevrimdışı kullanımı ve cihazdaki veri kontrolünü öne alan ödeme takip uygulaması.",
      "problem": "Düzenli ödemeler farklı yerlerde durunca yenileme tarihlerini ve toplam yükü görmek zorlaşıyor.",
      "approach": "Yerel kasa, mobil ödeme özeti, ertelenen ödemeler ve bildirim paneli. İsteğe bağlı senkronizasyon ile Cloudflare tabanlı arka plan hatırlatma kaynakları aynı ürün ailesinde geliştiriliyor.",
      "scope": "Web uygulaması erişilebilir. Android 1.1.0 sürümü Google Play iç test kanalında yayınlandı. Orbit 3D teması ve bildirim tanılama akışı web sürümünde mevcut. Gerçek telefonda arka plan bildirim teslimi ayrıca test gerektirir. iOS için App Store yayını iddiası yoktur; bulut senkronizasyonu E2EE olarak sunulmaz.",
      "visual": "Güncel yerel arayüzün örnek ödeme verileriyle görünümü; kişisel hesap kaydı değildir."
    },
    "en": {
      "tag": "Everyday tools / Finance",
      "summary": "Track subscriptions, instalments and recurring payments.",
      "description": "A recurring-payment tracker that brings rent, subscriptions and instalments together, with offline use and control over on-device data.",
      "problem": "Scattered recurring payments make renewals and total spending hard to see.",
      "approach": "A local vault, mobile payment overview, deferred payments and a notification panel. Optional sync and Cloudflare-based background reminder sources are developed within the same product family.",
      "scope": "The web app is available. Android 1.1.0 is available to internal testers on Google Play. The web release includes the Orbit 3D theme and notification diagnostics. Background notification delivery still requires physical-device verification. No App Store release is claimed; cloud sync is not presented as E2EE.",
      "visual": "The current local interface with sample payment data, not a personal account record."
    }
  },
  {
    "id": "laserdeck",
    "name": "LaserDeck PTT",
    "category": "apps",
    "status": "beta",
    "stack": [
      "Kotlin",
      "Android",
      "Bluetooth"
    ],
    "live": "https://laserdeck-ptt.voyagerroc.workers.dev",
    "tr": {
      "tag": "Mobil / İletişim",
      "summary": "Android cihazlar arasında Bluetooth iletişim.",
      "description": "İki Android telefon arasında Bluetooth üzerinden bas-konuş, sesli arama, mesaj ve fotoğraf aktarımı.",
      "problem": "Hesap ve internet bağlantısı olmadan, yakın mesafede doğrudan iletişim kurma ihtiyacı.",
      "approach": "Bluetooth Classic RFCOMM tabanlı Android uygulaması; PTT, arama ve yardımcı mesafe modülleri.",
      "scope": "v2.1.0 tanıtım/kurulum sayfası erişilebilir; kapalı test olarak sunuluyor. Optik lazer donanımı değil. Bu incelemede iki fiziksel cihazla yeniden test yapılmadı.",
      "visual": "Şematik Bluetooth bas-konuş görünümü; gerçek uygulama ekranı değildir."
    },
    "en": {
      "tag": "Mobile / Communication",
      "summary": "Bluetooth communication between Android devices.",
      "description": "Bluetooth push-to-talk, calls, messages and photo transfer between two Android phones.",
      "problem": "Direct nearby communication without an account or internet connection.",
      "approach": "An Android app built on Bluetooth Classic RFCOMM, with PTT and supporting distance tools.",
      "scope": "The v2.1.0 installation page is accessible and describes closed testing. This is not optical laser hardware; no new two-device test was performed.",
      "visual": "Schematic Bluetooth push-to-talk view, not an application screenshot."
    },
    "featured": true,
    "androidTest": "https://play.google.com/store/apps/details?id=com.voyagerroc.laserdeck.ptt",
    "androidGuide": "https://laserdeck-ptt.voyagerroc.workers.dev/test"
  },
  {
    "id": "pharos",
    "name": "Pharos Onion Researcher",
    "category": "intelligence",
    "status": "source",
    "stack": [
      "Python",
      "FastAPI",
      "Elasticsearch",
      "Tor",
      "Redis"
    ],
    "tr": {
      "tag": "Araştırma & istihbarat yazılımı",
      "summary": "Hibrit arama ve kaynak ilişkisi analizi.",
      "description": "Onion servislerinde aramayı, altyapı ilişkilerini ve zaman içindeki değişimleri tek araştırma yüzeyinde birleştiren, kendi sunucunda çalıştırılabilen analiz platformu.",
      "problem": "Dağınık kayıtları bulmak tek başına yetmiyor. Bir servisin başka kayıtlarla ilişkisini ve zaman içinde neyin değiştiğini incelemek gerekiyor.",
      "approach": "BM25 ve vektör benzerliğini birleştiren arama; cüzdan, PGP, favicon ve sunucu izi üzerinden varlık geçişleri; snapshot, diff, klon adayları ve izleme listeleri.",
      "scope": "Kaynak uygulama self-hosted Pharos. Portföy sunumunda Onion Researcher adı kullanılıyor. Klon çıktıları adaydır, kesin atıf değildir. Bu incelemede canlı tarama yapılmadı; eski indeks/test sayıları güncel metrik olarak sunulmuyor.",
      "visual": "Pharos kaynak uygulamasının mevcut logosu.",
      "capabilities": [
        "Hibrit arama",
        "Varlık ilişkileri",
        "Snapshot & diff",
        "Klon adayları",
        "Watchlist & RSS",
        "Self-hosted dağıtım"
      ]
    },
    "en": {
      "tag": "Research & intelligence software",
      "summary": "Hybrid search and source relationship analysis.",
      "description": "A self-hosted research platform bringing onion-service search, infrastructure relationships and changes over time into one investigative workspace.",
      "problem": "Finding scattered records is only the beginning. Researchers also need to inspect relationships and understand what changed over time.",
      "approach": "Hybrid BM25/vector search, entity pivots across wallet/PGP/favicon/server fingerprints, snapshots, diffs, clone candidates and watchlists.",
      "scope": "The underlying source application is self-hosted Pharos; Onion Researcher is the portfolio presentation name. Clone results are candidates, not definitive attribution. No live crawl was performed; historical index/test counts are not current metrics.",
      "visual": "The existing Pharos source-application logo.",
      "capabilities": [
        "Hybrid search",
        "Entity pivots",
        "Snapshots & diffs",
        "Clone candidates",
        "Watchlist & RSS",
        "Self-hosted deployment"
      ]
    },
    "featured": true,
    "short": "Pharos",
    "image": "assets/pharos-logo.svg"
  },
  {
    "id": "bungalow",
    "name": "Bungalow OS",
    "category": "platforms",
    "status": "prototype",
    "stack": [
      "Next.js",
      "Fastify",
      "Prisma",
      "Redis"
    ],
    "tr": {
      "tag": "Konaklama operasyon platformu",
      "summary": "Tesis operasyonları ve onay kontrollü otomasyon.",
      "description": "Rezervasyon, misafir hesabı, temizlik, bakım ve finansı tek operasyon merkezinde toplayan; istisnalara ve onay gerektiren kararlara odaklanan platform.",
      "problem": "Konaklamada birbirine bağlı işlerin farklı listelerde ve uygulamalarda takip edilmesi.",
      "approach": "Modüler API, operasyon panosu, olay ve worker hattı; RBAC, denetim kaydı ve onay kapılı ajan. Rezervasyondan finans kapanışına uzanan iş alanları ayrı modüllerde.",
      "scope": "Tek tesis için geliştirilen ürün platformu; kanıtlanmış çok kiracılı abonelik SaaS veya müşteri kullanımı iddiası yok. Harici WhatsApp/SMS/e-posta teslimi ve bazı sağlayıcılar tamamlanmamış. Kaynakta Anthropic ve NullProvider ayrımı mevcut.",
      "visual": "Bungalow OS kaynak uygulamasının mevcut ikonu.",
      "capabilities": [
        "Rezervasyon & takvim",
        "Misafir & folyo",
        "Temizlik & bakım",
        "Finans & envanter",
        "Onay kapılı ajan"
      ]
    },
    "en": {
      "tag": "Hospitality operations platform",
      "summary": "Property operations and approval-gated automation.",
      "description": "An operations platform connecting reservations, guest accounts, housekeeping, maintenance and finance, with attention on exceptions and decisions that need approval.",
      "problem": "Coordinating connected operational work scattered across lists and apps.",
      "approach": "A modular API, command centre, event/worker pipeline, RBAC, audit logs and approval-gated agent. Separate domains span reservation through financial close.",
      "scope": "A platform developed for one property, not a verified multi-tenant subscription SaaS or customer deployment. External WhatsApp/SMS/email delivery and some provider integrations remain incomplete.",
      "visual": "The existing Bungalow OS application icon.",
      "capabilities": [
        "Reservations & calendar",
        "Guests & folios",
        "Housekeeping & maintenance",
        "Finance & inventory",
        "Approval-gated agent"
      ]
    },
    "featured": true,
    "image": "assets/bungalow-icon.svg"
  },
  {
    "id": "tabela",
    "name": "Tabela",
    "category": "apps",
    "status": "web",
    "stack": [
      "JavaScript",
      "Node.js",
      "PWA",
      "PostgreSQL"
    ],
    "live": "https://futboltabela.netlify.app",
    "tr": {
      "tag": "Veri / Futbol",
      "summary": "Tahmini yaz. Sonucunu takip et.",
      "description": "Maç verilerini, istatistiksel tahminleri ve kişisel analiz günlüğünü bir araya getiren futbol çalışma alanı.",
      "problem": "Tahmin üretmek kolay; gerekçesini ve gerçekleşen sonuçla farkını izlemek daha zor.",
      "approach": "Fikstür, istatistiksel modeller, isteğe bağlı Si analizi ve tahmin defteri.",
      "scope": "Web sayfası erişilebilir. Bazı analizler kullanıcının sağlayıcı anahtarını gerektiriyor. Tahmin doğruluğu veya kazanç garantisi yok."
    },
    "en": {
      "tag": "Data / Football",
      "summary": "Make a prediction. Track its outcome.",
      "description": "A football workspace combining match data, statistical predictions and a personal analysis log.",
      "problem": "Producing predictions is easy; tracking reasoning and actual outcomes takes more care.",
      "approach": "Fixtures, statistical modelling, optional Si analysis and a prediction journal.",
      "scope": "The web interface is accessible. Some analyses require the user's provider key; no accuracy or financial return is guaranteed."
    },
    "featured": false
  },
  {
    "id": "audit-trail",
    "name": "Open-LLM-Audit-Trail",
    "category": "tools",
    "status": "source",
    "stack": [
      "Python",
      "FastAPI",
      "DLP"
    ],
    "tr": {
      "tag": "Güvenlik / Gözlemlenebilirlik",
      "summary": "Model trafiğine görünürlük.",
      "description": "LLM isteklerinde hassas veri maskeleme ve istek metaverisi denetimi için geliştirilen yerel ağ geçidi.",
      "problem": "Si servislerine giden veride ne bulunduğunu ve hangi isteklerin yapıldığını takip etmek.",
      "approach": "Proxy katmanı, DLP kuralları ve denetim kayıtları.",
      "scope": "Beta kaynakları incelendi. Hassas verinin her koşulda engelleneceğine veya sıfır sızıntıya ilişkin garanti sunulmuyor."
    },
    "en": {
      "tag": "Security / Observability",
      "summary": "Visibility into model traffic.",
      "description": "A local gateway for sensitive-data masking and request metadata auditing in LLM traffic.",
      "problem": "Understanding what data leaves the system and which requests were made.",
      "approach": "A proxy layer, DLP rules and audit records.",
      "scope": "Beta source inspected. No universal detection or zero-leak guarantee is claimed."
    },
    "featured": false
  },
  {
    "id": "aptflow",
    "name": "AptFlow",
    "category": "tools",
    "status": "starter",
    "stack": [
      "Python",
      "CLI",
      "FFmpeg"
    ],
    "repo": "https://github.com/Voyagerroc/AptFlow",
    "tr": {
      "tag": "Açık kaynak / Orkestrasyon",
      "summary": "Her işi, uygun araca.",
      "description": "Hafıza, araştırma ve üretim adımlarını uzman araçlara ayırmak için kişiselleştirilebilir başlangıç iskeleti.",
      "problem": "Bir fikri farklı servislerden geçirirken bağlamı, yapılandırmayı ve çıktıları yönetmek.",
      "approach": "Hesapsız sentetik demo, kullanıcıya özel yapılandırma, açık adaptör sınırları ve isteğe bağlı yerel video render.",
      "scope": "GitHub'da yayımlanmış MIT lisanslı iskelet. Canlı NotebookLM, TinyFish ve HeyGen adaptörleri henüz uygulanmadı."
    },
    "en": {
      "tag": "Open source / Orchestration",
      "summary": "The right tool for each task.",
      "description": "A configurable starter for separating memory, research and production into specialist-tool steps.",
      "problem": "Managing context, configuration and artifacts across several services.",
      "approach": "An account-free synthetic demo, user configuration, explicit adapter boundaries and optional local rendering.",
      "scope": "Published on GitHub under MIT. Live NotebookLM, TinyFish and HeyGen adapters are not implemented yet."
    },
    "featured": false
  },
  {
    "id": "shortlint",
    "name": "shortlint",
    "category": "tools",
    "status": "source",
    "stack": [
      "Python",
      "FFmpeg",
      "CLI"
    ],
    "tr": {
      "tag": "Medya / Kalite",
      "summary": "Yayınlamadan önce bir kontrol.",
      "description": "Kısa videolarda süre, ses ve teknik kaliteyi denetleyen yerel komut satırı aracı.",
      "problem": "Küçük teknik sorunlar, hazır bir videonun yayın kalitesini düşürebiliyor.",
      "approach": "Deterministik kurallar ve FFmpeg/ffprobe üzerinden tekrar edilebilir denetimler.",
      "scope": "v0.2.0 kaynakları incelendi. Anlamsal içerik değerlendirmesi gelecek çalışma olarak ayrılıyor."
    },
    "en": {
      "tag": "Media / Quality",
      "summary": "One check before publishing.",
      "description": "A local command-line quality gate for short-form video duration, audio and technical checks.",
      "problem": "Small technical defects can undermine otherwise finished video.",
      "approach": "Repeatable deterministic rules using FFmpeg and ffprobe.",
      "scope": "v0.2.0 source inspected. Semantic content assessment remains separate future work."
    },
    "featured": false
  },
  {
    "id": "atlas",
    "name": "Atlas Global OS",
    "category": "intelligence",
    "status": "prototype",
    "stack": [
      "TypeScript",
      "Express",
      "SQLite",
      "React"
    ],
    "tr": {
      "tag": "Sistem / Kontrol katmanı",
      "summary": "Düğümler, durumlar, güven sınırları.",
      "description": "Hesaplama düğümlerini güven puanı üzerinden değerlendiren kontrol katmanı ve operatör arayüzü prototipi.",
      "problem": "Dağıtık düğümlerin durumunu ve erişim kararlarını ortak bir modelde göstermek.",
      "approach": "Çekirdek servis, web arayüzü, CLI ve spesifikasyonlardan oluşan çalışma ailesi.",
      "scope": "Prototip ve örnek veri kullanan modüller incelendi; üretim güvenlik güvencesi sunulmuyor."
    },
    "en": {
      "tag": "Systems / Control plane",
      "summary": "Nodes, states and trust boundaries.",
      "description": "A control-plane and operator-interface prototype exploring scored trust for computing nodes.",
      "problem": "Representing node state and access decisions in a common model.",
      "approach": "A core service, dashboard, CLI and specifications.",
      "scope": "Prototype modules use demo data; no production security assurance is claimed."
    },
    "featured": false
  },
  {
    "id": "ai-news",
    "name": "Güncel Si Haberleri",
    "category": "intelligence",
    "status": "source",
    "stack": [
      "n8n",
      "JavaScript",
      "RSS",
      "Blogger"
    ],
    "tr": {
      "tag": "İçerik / Otomasyon",
      "summary": "Kaynaklardan, editoryal bir akışa.",
      "description": "Haber kaynaklarını derleyip içerikleri editoryal kontrol ve farklı anlatım kalıplarıyla yayına hazırlayan otomasyon hattı.",
      "problem": "Tekrarlanan haberleri ayıklayıp birden çok kaynaktan tutarlı içerik üretmek.",
      "approach": "RSS derleme, benzerlik kontrolü ve editoryal iş akışları.",
      "scope": "Workflow kaynakları incelendi. Güncel yayın takvimi ve dış servislerin çalışması doğrulanmadı."
    },
    "en": {
      "tag": "Content / Automation",
      "summary": "From feeds to an editorial workflow.",
      "description": "An automation pipeline collecting news sources and preparing content through editorial checks.",
      "problem": "Deduplicating stories and preparing consistent content from multiple sources.",
      "approach": "RSS collection, similarity checks and editorial workflows.",
      "scope": "Workflow source inspected. Current schedules and external publishing connections were not verified."
    },
    "featured": false
  },
  {
    "id": "artisan",
    "name": "artisan-web",
    "category": "tools",
    "status": "source",
    "stack": [
      "Python",
      "HTML",
      "CSS",
      "Agent skills"
    ],
    "image": "assets/artisan-gallery.png",
    "tr": {
      "tag": "Tasarım / Geliştirici deneyimi",
      "summary": "Tasarım kararlarını sisteme dönüştür.",
      "description": "Web tasarım yönlerini, tekrar kullanılabilir standartları ve otomatik görsel kalite denetimini birleştiren geliştirici becerisi.",
      "problem": "Bir web sitesinin görsel niteliğini rastlantıya bırakmadan iyi bir başlangıç oluşturmak.",
      "approach": "Tasarım yönleri, HTML örnekleri ve çalışan Python denetim betikleri.",
      "scope": "Kaynak araçları incelendi. Galerideki görseller tasarım örnekleridir; müşteri referansı değildir.",
      "visual": "Beceri deposundaki tasarım örnekleri."
    },
    "en": {
      "tag": "Design / Developer experience",
      "summary": "Turn design decisions into a system.",
      "description": "A developer skill combining design directions, reusable standards and visual-quality auditing.",
      "problem": "Creating a thoughtful starting point without leaving visual quality to chance.",
      "approach": "Design directions, HTML examples and working Python audit scripts.",
      "scope": "Source tools inspected. Gallery images are design examples, not client endorsements.",
      "visual": "Design examples from the skill repository."
    },
    "featured": false
  },
  {
    "id": "prompt-os",
    "name": "Prompt Operating System",
    "category": "tools",
    "status": "source",
    "stack": [
      "Documentation",
      "Prompt design"
    ],
    "tr": {
      "tag": "Standart / Üretim",
      "summary": "Daha açık talimat. Daha tutarlı süreç.",
      "description": "Ajanlar ve yaratıcı üretim akışları için yapılandırılmış prompt, bağlam ve kanıt standartları.",
      "problem": "Tekrarlanan görevlerde beklentileri ve sınırları açık biçimde aktarmak.",
      "approach": "Dokümantasyon ve tekrar kullanılabilir prompt yapıları.",
      "scope": "Dokümantasyon çalışması; bağımsız çalışan bir yazılım ürünü olarak sunulmuyor."
    },
    "en": {
      "tag": "Standards / Production",
      "summary": "Clearer instructions. More consistent work.",
      "description": "Structured prompt, context and evidence standards for agents and creative workflows.",
      "problem": "Communicating expectations and boundaries across repeated tasks.",
      "approach": "Documentation and reusable instruction structures.",
      "scope": "A documentation project, not a standalone executable product."
    },
    "featured": false
  },
  {
    "id": "field-report",
    "name": "Construction Daily Report",
    "category": "apps",
    "status": "source",
    "stack": [
      "JavaScript",
      "PWA",
      "PDF"
    ],
    "image": "assets/field-report.svg",
    "tr": {
      "tag": "Saha / Raporlama",
      "summary": "Şantiyeden, düzenli bir rapora.",
      "description": "Günlük ilerleme ve saha verilerini cihazda tutarak baskıya hazır A4 raporlarına dönüştüren araç.",
      "problem": "Dağınık saha notlarını paylaşılabilir, tutarlı bir günlük rapora çevirmek.",
      "approach": "Yerel veri, form, canlı rapor önizlemesi ve dışa aktarım.",
      "scope": "PWA ve rapor kaynakları incelendi. Eski GitHub Pages adresi erişilemediği için canlı bağlantı sunulmuyor.",
      "visual": "Mevcut depo içindeki arayüz illüstrasyonu."
    },
    "en": {
      "tag": "Fieldwork / Reporting",
      "summary": "From site notes to a clear report.",
      "description": "A local-first tool turning daily construction progress into print-ready A4 reports.",
      "problem": "Turning scattered field notes into consistent, shareable daily reporting.",
      "approach": "Local data, forms, report previews and exports.",
      "scope": "PWA/report source inspected. The old GitHub Pages link was unavailable.",
      "visual": "The existing repository's interface illustration."
    },
    "featured": false
  },
  {
    "id": "ekin-medikal",
    "name": "Ekin Medikal",
    "category": "web",
    "status": "source",
    "stack": [
      "HTML",
      "JavaScript",
      "D3",
      "CSS"
    ],
    "image": "assets/ekin-project.webp",
    "featured": false,
    "tr": {
      "tag": "Kurumsal web & ürün kataloğu",
      "summary": "Ürün bilgisini anlaşılır bir deneyime taşı.",
      "description": "Medikal üretici için kurumsal anlatımı, kategori bazlı ürün kataloğunu ve görsel doküman incelemesini bir araya getiren web projesi.",
      "problem": "Teknik ürün bilgisini ve kurumsal kapsamı ziyaretçinin kolayca gezebileceği bir yapıda sunmak.",
      "approach": "Beş sayfalı statik mimari, ürün detayları, lightbox, tema geçişi ve etkileşimli dünya haritası. İletişim e-posta ve WhatsApp bağlantıları üzerinden.",
      "scope": "Kurumsal katalog web projesidir; hesaplı SaaS, sipariş veya ödeme motoru değildir. Görseller müşterinin ürün/tesis içeriğidir; Voyagerroc üretim tesisi veya sertifikası olarak sunulmaz.",
      "visual": "Müşteri web projesindeki tesis görseli; Voyagerroc tesisi değildir."
    },
    "en": {
      "tag": "Corporate web & product catalogue",
      "summary": "Make product information easy to explore.",
      "description": "A corporate website for a medical manufacturer, connecting product categories, visual document inspection and company information.",
      "problem": "Presenting technical product information in a structure visitors can easily navigate.",
      "approach": "A five-page static site with product details, lightboxes, themes and an interactive world map. Contact uses email and WhatsApp links.",
      "scope": "A corporate catalogue website, not an account-based SaaS, order system or checkout. Imagery belongs to the client project, not a Voyagerroc factory or certification.",
      "visual": "A facility image from the client website project; not a Voyagerroc facility."
    }
  },
  {
    "id": "sarihan",
    "name": "Sarıhan / Dolunay",
    "category": "web",
    "status": "source",
    "stack": [
      "React",
      "Three.js",
      "GSAP",
      "Vite"
    ],
    "image": "assets/dolunay-concept.jpg",
    "featured": false,
    "tr": {
      "tag": "Mekân / Etkileşim",
      "summary": "Çizimden, anlaşılabilir mekâna.",
      "description": "Mimari projeleri, etkileşimli 3D modelleri ve görsel anlatımı aynı dijital deneyimde buluşturan çalışma ailesi.",
      "problem": "Teknik çizimler, projeyi ilk kez gören herkes için yeterince anlaşılır olmayabiliyor.",
      "approach": "WebGL model, dolaşılabilir sahne ve akıcı web etkileşimleriyle yapının ilişkilerini görünür kılıyor. Eski statik vitrin ile yeni etkileşimli kaynaklar birlikte değerlendirildi.",
      "scope": "Kaynaklar ve görseller incelendi. Eski Railway adresi erişilebilir olmadığı için canlı demo bağlantısı sunulmuyor.",
      "visual": "Dolunay konsept 3D görselleştirmesi; tamamlanmış yapı fotoğrafı değildir."
    },
    "en": {
      "tag": "Space / Interaction",
      "summary": "From drawings to understandable space.",
      "description": "A family of architectural presentations combining interactive 3D models, visual storytelling and responsive web experiences.",
      "problem": "Technical drawings are not equally accessible to everyone encountering a project.",
      "approach": "WebGL scenes and interactive presentations make spatial relationships easier to understand.",
      "scope": "Source and visuals inspected. The old Railway URL was unavailable, so no live demo is presented.",
      "visual": "Dolunay concept rendering; not a photograph of completed construction."
    }
  },
  {
    "id": "astera",
    "name": "ASTERA",
    "category": "web",
    "status": "concept",
    "stack": [
      "HTML",
      "CSS",
      "Digital showcase"
    ],
    "tr": {
      "tag": "Mekân / Konsept",
      "summary": "Yıldız isimli bir kaçış fikri.",
      "description": "Karadeniz'de A-frame bungalovlar için hazırlanmış konsept ve dijital sunum.",
      "problem": "Bir konaklama fikrinin atmosferini, yerleşimini ve deneyimini anlaşılır biçimde anlatmak.",
      "approach": "Kendi içinde paketlenmiş statik konsept vitrini.",
      "scope": "Mevcut kaynak statik arşiv sunumu. Eski README'deki React web/ dizini bu kopyada yok. Yapıların tamamlandığı veya rezervasyonun çalıştığı iddia edilmiyor."
    },
    "en": {
      "tag": "Space / Concept",
      "summary": "An escape named after the stars.",
      "description": "A concept and digital presentation for A-frame bungalows on the Black Sea coast.",
      "problem": "Communicating the atmosphere and layout of a hospitality concept.",
      "approach": "A self-contained static concept presentation.",
      "scope": "The current source is an archived static showcase. The old README's React web directory is absent. No completed construction or booking flow is claimed."
    },
    "featured": false
  },
  {
    "id": "mimari-cad",
    "name": "Mimari CAD / BIM",
    "category": "web",
    "status": "source",
    "stack": [
      "Python",
      "Blender",
      "IFC"
    ],
    "tr": {
      "tag": "Mekân / Dönüşüm",
      "summary": "Çizim katmanlarından, 3D çıktıya.",
      "description": "Mimari çizimleri katmanlı 3D ve IFC/BIM çıktılarına dönüştürmeye yönelik işleme çalışması.",
      "problem": "Teknik çizimlerdeki bilgiyi farklı görselleştirme ve modelleme araçlarına taşımak.",
      "approach": "DWG, DXF, OBJ, Blender ve IFC arasında dönüşüm betikleri.",
      "scope": "İşleme kaynakları ve model dosyaları incelendi. Bağımsız web uygulaması veya her çizimde otomatik sonuç garantisi değil."
    },
    "en": {
      "tag": "Space / Conversion",
      "summary": "From drawing layers to 3D output.",
      "description": "A processing workspace for converting architectural drawings into layered 3D and IFC/BIM outputs.",
      "problem": "Moving technical drawing information across visualisation and modelling tools.",
      "approach": "Conversion scripts between DWG, DXF, OBJ, Blender and IFC.",
      "scope": "Processing source and models inspected. Not a standalone web app or a guarantee for every drawing."
    },
    "featured": false
  }
];
