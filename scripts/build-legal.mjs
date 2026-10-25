import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {pages,updated} from '../content/legal.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const page of pages){
  const href=slug=>'/yasal/'+(slug?slug+'/':'');
  const nav=pages.map(p=>'<a href="'+href(p.slug)+'"'+(p.slug===page.slug?' aria-current="page"':'')+'>'+escape(p.title)+'</a>').join('');
  const body=page.body.replaceAll('<div class="legal-table-wrap">','<p class="legal-table-hint">Dar ekranda tabloyu yatay kaydırabilirsiniz ↔</p><div class="legal-table-wrap" tabindex="0" role="region" aria-label="Yatay kaydırılabilir bilgi tablosu">');
  const output='<!doctype html>\n<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#070c16"><title>'+escape(page.title)+' — Voyagerroc Technologies</title><meta name="description" content="'+escape(page.description)+'"><link rel="canonical" href="https://voyagerroctechnologies.com'+href(page.slug)+'"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/legal.css"><script defer src="/legal.js"></script></head><body><a class="skip-link" href="#legal-content">Metne geç</a><div class="legal-shell"><header class="legal-header"><a class="legal-brand" href="/">VOYAGERROC<small>TECHNOLOGIES</small></a><a href="/">Ana sayfaya dön ↗</a></header><div class="legal-layout"><nav class="legal-nav" aria-label="Hukuki metinler">'+nav+'</nav><main class="legal-article" id="legal-content"><p class="legal-kicker">VOYAGERROC / HUKUKİ BİLGİLER</p><h1>'+escape(page.title)+'</h1><p class="legal-meta">Son güncelleme: '+updated+' · Kapsam: voyagerroctechnologies.com</p><p class="legal-lead">'+escape(page.description)+'</p>'+page.body+'</main></div><footer class="legal-footer"><div><a href="/">Ana sayfa</a><a href="/yasal/iletisim/">İşletmeci ve iletişim</a><a href="/yasal/basvuru/">Kişisel veri başvurusu</a></div><p>© 2026 Voyagerroc Technologies. Üçüncü taraf hakları ve lisansları saklıdır.</p></footer></div></body></html>\n';
  const dir=path.join(root,'dist','yasal',page.slug);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),output.replace(page.body,body));
}
console.log('Built '+pages.length+' static legal pages.');
const urls=['https://voyagerroctechnologies.com/',...pages.map(p=>'https://voyagerroctechnologies.com/yasal/'+(p.slug?p.slug+'/':''))];
fs.writeFileSync(path.join(root,'dist','sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(url=>'<url><loc>'+url+'</loc><lastmod>2026-10-25</lastmod></url>').join('')+'</urlset>\n');
