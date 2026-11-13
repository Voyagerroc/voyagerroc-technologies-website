import {portfolioTools} from './portfolio-tools.mjs';
import {payradarDemo} from '../content/studies.mjs';
import {hreflangLinks,setHreflang} from './seo.mjs';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

// Search-result copy for English product pages: a descriptive title and a 120-160 character summary.
const productSearch={
  eip:['EİP — Evidence-Led Candidate Evaluation','Evidence Intelligence Platform (EİP) brings candidate documents, work samples, applications and employer workflows into one evaluation workspace.'],
  payradar:['PayRadar — Android Payment Tracking','PayRadar is a Kotlin Android app for tracking rent, bills, subscriptions and instalments, with offline records, Turkish search and local reminders.'],
  laserdeck:['LaserDeck PTT — Bluetooth Push-to-Talk','LaserDeck PTT provides Bluetooth push-to-talk, calls, messages and photo transfer between two Android phones. Review test access and current limits.'],
  pharos:['Pharos Onion Researcher — Hybrid Search','Pharos Onion Researcher is a self-hosted research platform combining hybrid search, infrastructure relationships and change tracking for onion services.'],
  bungalow:['Bungalow OS — Property Operations','Bungalow OS is an in-development operations platform connecting reservations, housekeeping, maintenance and finance with approval-gated automation.'],
  tabela:['Tabela — Football Analysis and Forecasts','Tabela is a football analysis workspace for fixtures, match news, probabilistic score forecasts and a prediction history you can compare with results.']
};
const englishBrand={
  description:'An independent software brand founded by Erol Taşcı, focused on web and Android applications, SaaS and AI workflows.',
  disambiguatingDescription:'Voyagerroc Technologies is the independent software brand founded by Erol Taşcı, with products including PayRadar, LaserDeck PTT and Evidence Intelligence Platform. Its official website is voyagerroctechnologies.com. It is independent of Voyager Technologies and Voyager Space.',
  slogan:'We design models, tools and data together',
  knowsAbout:['Web and mobile application development','SaaS platform architecture','AI agent workflows','Native Android development','Bluetooth push-to-talk communication','Payment and subscription tracking']
};
// Static English replacements for Turkish strings the dictionary pass cannot reach.
const homeStrings=words=>[
  ['aria-label="Ana gezinme"','aria-label="'+words.navLabel+'"'],
  ['aria-label="Kapat"','aria-label="'+words.close+'"'],
  ['aria-label="Voyagerroc Technologies ana sayfa"','aria-label="Voyagerroc Technologies home"'],
  ['<span id="scene-state">05 ALAN / KAVRAMSAL GÖRSEL</span>','<span id="scene-state">05 DOMAINS / PHOENIX STUDY</span>'],
  ["Ürün ayrıntıları ve filtreler için JavaScript'i etkinleştirin. İletişim:",'Enable JavaScript for product details and filters. Contact:'],
  ['<a data-lang="tr" href="/" hreflang="tr" lang="tr" aria-current="true">','<a data-lang="tr" href="/" hreflang="tr" lang="tr">'],
  ['<a data-lang="en" href="/en/" hreflang="en" lang="en">','<a data-lang="en" href="/en/" hreflang="en" lang="en" aria-current="true">']
];

export function buildEnglish({dist,origin,home,projects,services,escape,shell,metadata,jsonld}) {
  const urls=[];
  const imageAlt='Voyagerroc Technologies — Web and mobile applications, SaaS and AI workflows';
  const homeGraphs=[...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match=>JSON.parse(match[1])['@graph']||[]);
  // Reuse the home page entities (same @id values) so both languages describe one brand, organisation and website.
  const sharedNodes=homeGraphs.filter(node=>['WebSite','Brand','Organization','Person'].includes(node['@type'])).map(node=>{
    const copy=structuredClone(node);
    if(copy['@type']==='Person')copy.description='Founder of Voyagerroc Technologies and operator of this website, working on web and mobile applications, SaaS and AI workflows.';
    else if(copy['@type']==='WebSite')copy.description=englishBrand.description;
    else Object.assign(copy,englishBrand);
    if(copy['@type']==='Brand')copy.mainEntityOfPage={'@id':origin+'/en/about/#page'};
    return copy;
  });
  const websiteId=origin+'/#website';
  const structuredData=(route,title,description)=>jsonld({'@context':'https://schema.org','@graph':[
    {'@type':route==='/en/about/'?'AboutPage':'WebPage','@id':origin+route+'#page',url:origin+route,name:title,description,inLanguage:'en',isPartOf:{'@id':websiteId},about:{'@id':origin+'/#brand'}},
    ...sharedNodes,
    ...(route==='/en/'?[]:[{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/en/'},{'@type':'ListItem',position:2,name:title,item:origin+route}]}])
  ]});
  const localizeImageAlt=html=>html.replace(/(<meta property="og:image:alt" content=")[^"]*(">)/g,'$1'+escape(imageAlt)+'$2');
  const serviceCopy=[
    ['Web and Android development','Choose the platform around your users, device capabilities, offline needs and distribution.','We clarify users, screen flows, data sources and integrations, then agree on a prototype and acceptance criteria. Source delivery, installation notes, testing and publishing responsibilities belong in the written scope.'],
    ['SaaS and product platforms','Plan roles, data isolation, support and operating costs before subscriptions.','We map the workflow and the smallest useful release. Multi-tenancy, billing, backups and erasure are separate decisions. EIP and Bungalow OS illustrate our work; they are not evidence of production customer adoption.'],
    ['AI workflows and agent design','Define context, tool access and the steps that require human approval.','We combine task-specific instructions and retrieval with explicit permissions. Evaluation scenarios, failure handling and expected outputs are agreed as part of the scope.']
  ];
  // Turn the Turkish product-page shell into its English counterpart.
  const localizeShell=html=>localizeImageAlt(html).replace('<html lang="tr">','<html lang="en">').replaceAll('content="tr_TR"','content="en_US"').replaceAll('İçeriğe geç','Skip to content').replaceAll('Tüm ürünler ↗','All products ↗').replace('href="/#products"','href="/en/#products"')
    .replace(/<footer>[\s\S]*?<\/footer>/,'<footer><a href="/en/">Home</a><a href="/en/about/">About</a><a href="/en/calismalar/">All projects</a><a href="/en/privacy/">Privacy</a><a href="/en/terms/">Terms</a><a href="/en/project-enquiry/">Contact</a></footer>')
    .replace('<a class="product-brand" href="/">','<a class="product-brand" href="/en/">');
  // Served for unknown addresses under /en/ (Static Assets picks the nearest 404.html).
  fs.mkdirSync(path.join(dist,'en'),{recursive:true});
  fs.writeFileSync(path.join(dist,'en','404.html'),localizeShell(shell('Page not found — Voyagerroc Technologies','<meta name="robots" content="noindex,nofollow">','<p class="kicker">404 / PAGE NOT FOUND</p><h1>There is no page at this address.</h1><p class="lead">The address may have changed. You can continue from the home page or the project list.</p><div class="product-links"><a class="product-link" href="/en/">Back to home ↗</a><a class="product-link" href="/en/calismalar/">All projects ↗</a><a class="product-link" href="/">Türkçe ↗</a></div>')));
  const page=(route,tr,title,description,body)=>{
    let html=shell(title+' | Voyagerroc Technologies','<meta name="description" content="'+escape(description)+'"><link rel="canonical" href="'+origin+route+'">'+hreflangLinks(origin,tr,route)+metadata(title+' | Voyagerroc Technologies',description,origin+route)+structuredData(route,title,description),body);
    html=localizeShell(html);
    if(route==='/en/calismalar/')html=portfolioTools(html,projects,true);
    const folder=path.join(dist,route);fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'index.html'),html);urls.push(origin+route);
    const trFile=path.join(dist,tr,'index.html');if(fs.existsSync(trFile))fs.writeFileSync(trFile,setHreflang(fs.readFileSync(trFile,'utf8'),origin,tr,route));
  };
  const links=projects.filter(p=>p.featured).map(p=>'<a class="product-link" href="/en/urunler/'+p.id+'/">'+escape(p.name)+' ↗</a>').join('');
  for(const p of projects.filter(p=>p.featured)){
    const c=p.en,[searchTitle,searchDescription]=productSearch[p.id]||[p.name,c.summary];
    const access=p.androidTest?'<a class="product-link" href="/android/#'+p.id+'">Android test access (Turkish) ↗</a>':'';
    const live=p.live?'<a class="product-link" href="'+escape(p.live)+'" target="_blank" rel="noopener noreferrer">'+(p.id==='payradar'?'Android download guide':'Open product page')+' ↗</a>':'';
    const demo=p.id==='payradar'?'<section class="demo-section"><h2>PayRadar 2.1.5 — Android screen tour</h2><video class="product-demo product-demo-native" controls playsinline preload="none" width="720" height="1600" poster="'+payradarDemo.poster+'" aria-label="PayRadar Android native screen tour"><source src="'+payradarDemo.src+'" type="video/mp4"><track kind="captions" src="'+payradarDemo.englishCaptions+'" srclang="en" label="English"></video><p class="fineprint">A 36-second silent tour of the 2.1.5-phoenix (12) candidate using authentic Android emulator screens and sample records: payment overview, cards, editor, separate KVKK notice, dark theme and tablet layout. Store publication of this candidate has not been verified. This is not a live interaction recording or a physical-device test.</p></section>':'';
    const update=p.id==='payradar'?'<section class="product-update" aria-label="Latest update"><h2>6 November 2026 — the 2.1.5 Android candidate</h2><ul><li>Updated payment overview with overdue, today and next-seven-day counts; monthly estimates remain separate by currency.</li><li>Turkish search, resettable filters, inline input validation and responsive phone/tablet layouts.</li><li>Offline reminder recovery, stale-edit protection and safer payment undo.</li><li>Separate in-app terms, KVKK notice and privacy information. Contract acceptance does not grant notification permission or privacy consent.</li></ul><p class="fineprint">The signed 2.1.5-phoenix (12) candidate passed local checks; store publication has not been verified. The owner reports 2.1.4-phoenix (11) as the current store version. Android notification permissions and power management still apply.</p></section>':'';
    const image=p.evidenceImage?'<figure class="product-evidence"><img src="/'+p.evidenceImage+'" width="1200" height="800" alt="'+escape(c.visual)+'" loading="lazy"><figcaption>'+escape(c.visual)+'</figcaption></figure>':'';
    page('/en/urunler/'+p.id+'/','/urunler/'+p.id+'/',searchTitle,searchDescription,'<p class="kicker">'+escape(c.tag)+'</p><h1>'+escape(p.name)+'</h1><p class="lead">'+escape(c.summary)+'</p><p>'+escape(c.description)+'</p><p class="status">'+escape(p.status==='beta'?'Test build':p.status==='web'?'Web access available':p.status==='prototype'?'In development':'Self-hosted source project')+'</p>'+update+demo+image+'<section><h2>The need</h2><p>'+escape(c.problem)+'</p></section><section><h2>Approach</h2><p>'+escape(c.approach)+'</p></section><section><h2>Current scope and limits</h2><p>'+escape(c.scope)+'</p><p>'+(p.id==='payradar'?'Product update prepared on 6 November 2026.':'Published information checked on 5 November 2026.')+' An accessible interface is not evidence that every workflow has passed end-to-end testing.</p></section><div class="product-links">'+access+live+'<a class="product-link" href="/en/project-enquiry/?product='+encodeURIComponent(p.name)+'">Discuss this product ↗</a></div><nav class="related-pages" aria-label="Other products">'+links+'</nav>');
  }
  services.forEach((s,i)=>{const [title,intro,detail]=serviceCopy[i];page('/en/calismalar/'+s.slug+'/','/calismalar/'+s.slug+'/',title,intro,'<p class="kicker">PROJECT APPROACH</p><h1>'+title+'</h1><p class="lead">'+intro+'</p><section><h2>What we agree together</h2><p>'+detail+'</p></section><p>This page describes an approach, not a binding offer. Scope, deliverables, intellectual property, fees and acceptance are agreed in writing before a commercial project starts.</p><div class="product-links">'+s.examples.map(id=>'<a href="/en/urunler/'+id+'/">'+escape(projects.find(p=>p.id===id).name)+'</a>').join('')+'</div><a class="product-link" href="/en/project-enquiry/">Discuss your project ↗</a>');});
  page('/en/calismalar/','/calismalar/','Projects and products','Explore Voyagerroc Technologies projects and products: the purpose, technical approach, development stage and current scope of each piece of work.','<h1>Projects and products.</h1><p class="lead">Each project has its own scope and development stage.</p>'+projects.map(p=>'<article class="portfolio-entry" id="'+p.id+'"><h2>'+escape(p.name)+'</h2><p>'+escape(p.en.description)+'</p><h3>Current scope</h3><p>'+escape(p.en.scope)+'</p><a class="product-link" href="'+(p.featured?'/en/urunler/'+p.id+'/':'/en/project-enquiry/?product='+encodeURIComponent(p.name))+'">Explore this work ↗</a></article>').join(''));
  page('/en/about/','/hakkimizda/','About Voyagerroc Technologies','Voyagerroc Technologies is an independent software brand founded by Erol Taşcı, building web and Android applications, SaaS platforms and AI workflows.','<h1>Voyagerroc Technologies</h1><p class="lead">An independent software brand founded and operated by Erol Taşcı.</p><p>We build web and Android applications, product platforms and AI-assisted workflows. Our portfolio distinguishes test builds, available interfaces, source projects and products in development.</p><p>The brand name does not establish a separate incorporated company or a registered trademark. Voyagerroc Technologies is independent of the US aerospace companies Voyager Technologies and Voyager Space.</p><h2>Selected work</h2><div class="product-links">'+links+'</div><h2>Contact</h2><a href="mailto:erol@voyagerroctechnologies.com">erol@voyagerroctechnologies.com</a><p><a href="/en/project-enquiry/">Discuss your project ↗</a></p>');
  page('/en/privacy/','/yasal/gizlilik/','Privacy and data requests','How the Voyagerroc Technologies portfolio site processes visits, language preferences and project enquiries, and how to make a data request under KVKK.','<h1>Privacy and data requests</h1><p>Updated 5 November 2026. Scope: this portfolio website, not the separate product applications.</p><h2>Controller and contact</h2><p>Erol Taşcı operates this site under the Voyagerroc Technologies brand. Contact: <a href="mailto:erol@voyagerroctechnologies.com">erol@voyagerroctechnologies.com</a>.</p><h2>Visits and preferences</h2><p>Cloudflare processes technical connection data, including IP addresses, to deliver and secure the site. Necessary, proportionate delivery and security processing is assessed under KVKK Article 5(2)(f); specific legal obligations under Article 5(2)(ç). Optional analytics is disabled. No analytics decision is required to read the site. Language selection can use sessionStorage in the current tab. A previous privacy choice may remain for its original 180-day lifetime.</p><h2>Enquiries</h2><p>The project brief is prepared in browser memory. It is not submitted or saved automatically. Sending email shares the information with our Google email service. General enquiries are assessed under Article 5(2)(f), necessary contract enquiries under Article 5(2)(c). Do not send passwords, identity documents or unnecessary sensitive data.</p><h2>Recipients, transfers and retention</h2><p>Cloudflare and Google may process data outside Türkiye. The applicable KVKK Article 9 transfer mechanism requires separate verification; this notice is not an executed safeguard. Data should be retained only for the purpose and applicable legal requirements. Actual provider log and backup periods depend on service configuration. The detailed Turkish notices describe these limits.</p><h2>Your rights</h2><p>Under KVKK Article 11 you may request information, correction, erasure where applicable, notification to recipients, object to adverse results based solely on automated analysis, and seek compensation for unlawful processing. Contact the controller to arrange proportionate identity verification and a valid submission channel. Requests are handled as soon as possible, within 30 days. We have not published a postal or KEP address; those operational details remain to be completed. Read <a href="/yasal/basvuru/">request procedures (Turkish)</a> and <a href="/yasal/cerezler/">storage details (Turkish)</a>.</p>');
  page('/en/terms/','/yasal/kullanim/','Terms and intellectual property','Terms for the Voyagerroc Technologies portfolio: what product statuses mean, intellectual property, third-party licences and applicable law.','<h1>Terms and intellectual property</h1><p>This portfolio presents software projects. Viewing it does not create a paid service, licence or purchase agreement. Scope, fees, delivery, acceptance and intellectual property are agreed separately in writing.</p><h2>Product status</h2><p>Test builds, available web interfaces, prototypes and source projects are distinct. A live page is not a guarantee of all features, device support or production readiness. Sample screens and archive demos are labelled accordingly.</p><h2>Rights and third parties</h2><p>Rights depend on the work, contributor agreements and applicable law. Public repository access alone does not license every brand asset. Third-party components retain their own licences, including Three.js (MIT), Manrope and Space Grotesk (SIL OFL). AI assistance does not guarantee exclusive ownership or freedom from third-party rights. Contact erol@voyagerroctechnologies.com for rights enquiries.</p><h2>Applicable law</h2><p>Turkish law applies, without removing mandatory consumer or data-subject rights. These terms do not exclude liability where the law does not permit exclusion. Detailed <a href="/yasal/fikri-haklar/">licence notices (Turkish)</a> remain available.</p>');
  const box={window:{VT_COPY_ONLY:true}};vm.runInNewContext(fs.readFileSync(path.join(dist,'app.js'),'utf8'),box);
  const words=box.window.VT_COPY.en;
  let english=home.replace('<html lang="tr">','<html lang="en">');
  english=english.replace(/<([a-z][\w-]*)\b([^>]*\bdata-i18n(?:-html)?="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g,(all,tag,attrs,key)=>words[key]?'<'+tag+attrs+'>'+words[key]+'</'+tag+'>':all);
  english=english.replace(/<link rel="canonical" href="[^"]+">/,'<link rel="canonical" href="'+origin+'/en/">').replace(/<title>[^<]+<\/title>/,'<title>'+words.metaTitle+'</title>').replaceAll('content="tr_TR"','content="en_US"');
  english=english.replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*(">)/g,'$1'+escape(words.metaDescription)+'$2');
  english=english.replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*(">)/g,'$1'+escape(words.metaTitle)+'$2');
  english=english.replace(/<[a-z][\w-]*\b[^>]*\bdata-i18n-aria="([^"]+)"[^>]*>/g,(tag,key)=>words[key]?tag.replace(/(\baria-label=")[^"]*(")/,(_,start,end)=>start+escape(words[key])+end):tag);
  for(const [turkish,englishText] of homeStrings(words)){if(!english.includes(turkish))throw Error('English home: source string changed: '+turkish);english=english.replace(turkish,englishText);}
  english=english.replace(/(<div id="scene-container"[^>]*aria-label=")[^"]*(")/,(_,start,end)=>start+escape(words.sceneAria)+end);
  // Replace TR page identity with an EN graph while preserving shared brand/person IDs.
  english=english.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
  english=english.replace('</head>',structuredData('/en/',words.metaTitle,words.metaDescription)+'</head>');
  english=english.replace(/(<meta property="og:url" content=")[^"]*(">)/g,'$1'+origin+'/en/$2');
  english=localizeImageAlt(english);
  english=english.replace(/(src|href)="((?:assets\/|data\/|(?:app|motion|scene)\.|style\.|motion\.css)[^"]*)"/g,'$1="/$2"');
  english=english.replaceAll('href="/hakkimizda/"','href="/en/about/"').replaceAll('href="/calismalar/"','href="/en/calismalar/"').replaceAll('href="/proje-gorusmesi/"','href="/en/project-enquiry/"').replaceAll('href="/urunler/','href="/en/urunler/').replaceAll('href="/calismalar/','href="/en/calismalar/');
  english=english.replace(/(<div id="featured-projects" class="featured-grid">)[\s\S]*?(<\/div>\s*<!-- products:start -->)/,(_,start,end)=>start+projects.filter(p=>['eip','payradar','laserdeck'].includes(p.id)).map(p=>'<article class="feature-card"><div class="feature-info"><div><p class="feature-tag">'+escape(p.en.tag)+'</p><h3><a href="/en/urunler/'+p.id+'/">'+escape(p.name)+'</a></h3><p class="feature-summary">'+escape(p.en.summary)+'</p><a href="/en/urunler/'+p.id+'/">Product scope and access ↗</a></div></div></article>').join('')+end);
  services.forEach((s,i)=>{english=english.replaceAll('>'+escape(s.title)+' ↗<','>'+serviceCopy[i][0]+' ↗<');});
  english=english.replaceAll('href="/yasal/gizlilik/"','href="/en/privacy/"').replaceAll('href="/yasal/kullanim/"','href="/en/terms/"');
  english=setHreflang(english,origin,'/','/en/');
  const dir=path.join(dist,'en');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),english);urls.push(origin+'/en/');
  fs.writeFileSync(path.join(dist,'index.html'),setHreflang(fs.readFileSync(path.join(dist,'index.html'),'utf8'),origin,'/','/en/'));
  return urls;
}
