import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {androidAccess} from '../content/android.mjs';
import {fileURLToPath} from 'node:url';
import {products,services} from '../content/search.mjs';
import {studies,payradarDemo} from '../content/studies.mjs';
import {securityHeaders} from '../src/security-headers.mjs';
const dist=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const origin='https://voyagerroctechnologies.com';
const sitemap=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,'Duplicate sitemap entries');
for(const url of urls){
 const route=new URL(url);assert.equal(route.origin,origin);
 const file=path.join(dist,route.pathname,'index.html');assert.ok(fs.existsSync(file),'Missing sitemap page: '+url);
 const html=fs.readFileSync(file,'utf8');
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,'Each page needs one main heading: '+url);
 assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html),'Indexable sitemap page: '+url);
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/);assert.ok(canonical,'Missing canonical: '+url);
 assert.equal(new URL(canonical[1]).href,url);
 const titles=[...html.matchAll(/<title>([^<]+)<\/title>/g)];assert.equal(titles.length,1);
 for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
  JSON.parse(json);const hash="'sha256-"+crypto.createHash('sha256').update(json).digest('base64')+"'";
  assert.ok(securityHeaders['Content-Security-Policy'].includes(hash),'JSON-LD blocked by CSP: '+url);
 }
 for(const [,href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)){
  const target=path.join(dist,href);
  assert.ok(fs.existsSync(target),'Broken local link or asset: '+href+' from '+url);
 }
}
const home=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const graphFrom=html=>JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
const homeGraph=graphFrom(home),identity=homeGraph.find(n=>n['@type']==='Brand');
const aboutHtml=fs.readFileSync(path.join(dist,'hakkimizda/index.html'),'utf8'),aboutGraph=graphFrom(aboutHtml);
assert.equal(aboutGraph.find(n=>n['@type']==='AboutPage').mainEntity['@id'],identity['@id'],'About page must identify the same brand');
assert.equal(aboutGraph.find(n=>n['@type']==='Brand').name,identity.name,'Brand name differs across pages');
const personalProfile=aboutGraph.find(n=>n['@type']==='AboutPage').relatedLink;
assert.ok(aboutHtml.includes('href="'+personalProfile+'"'),'Founder profile must be visibly linked');
assert.ok(!identity.sameAs.includes(personalProfile),'Personal profile must not be equated with the brand');
assert.ok(home.includes('/hakkimizda/'),'Brand identity page orphaned');
for(const service of services)assert.ok(home.includes('/calismalar/'+service.slug+'/'),'Service orphaned');
for(const id of Object.keys(products)){
 const html=fs.readFileSync(path.join(dist,'urunler',id,'index.html'),'utf8');
 assert.ok(html.includes('Sık sorulan sorular'));assert.ok(html.includes('BreadcrumbList'));
 assert.ok(home.includes('/urunler/'+id+'/'),'Product orphaned');
}
assert.ok(!fs.readFileSync(path.join(dist,'urunler/payradar/index.html'),'utf8').includes('henüz commit edilmemiş'));
assert.ok(securityHeaders['Content-Security-Policy'].includes("media-src 'self'"),'Same-origin video must be allowed explicitly');
for(const study of studies){
 assert.ok(home.includes('/notlar/'+study.slug+'/'),'Study orphaned');
 const html=fs.readFileSync(path.join(dist,'notlar',study.slug,'index.html'),'utf8');
 assert.ok(html.includes('preload="none"'),'Do not load demo video before user playback');
 assert.ok(html.includes(payradarDemo.captions),'Video needs captions');
 assert.ok(html.includes('Fiziksel telefonda'),'Physical-device limits must be visible');
}
assert.ok(fs.readFileSync(path.join(dist,payradarDemo.captions),'utf8').startsWith('WEBVTT'));
const android=fs.readFileSync(path.join(dist,'android/index.html'),'utf8');
const portfolio={window:{}};vm.runInNewContext(fs.readFileSync(path.join(dist,'data/projects.js'),'utf8'),portfolio);
for(const p of portfolio.window.PORTFOLIO_PROJECTS.filter(x=>x.androidTest)){
 assert.equal(p.androidAccess,'/android/#'+p.id,'Android CTA must lead through enrollment guidance');
 assert.ok(android.includes('id="'+p.id+'"'),'Missing product enrollment anchor');
 assert.ok(fs.readFileSync(path.join(dist,'urunler',p.id,'index.html'),'utf8').includes('href="'+p.androidAccess+'"'),'Product bypasses enrollment guide');
 const a=androidAccess[p.id];for(const key of ['groupUrl','enrollmentUrl'])if(a[key])assert.ok(android.includes('href="'+a[key]+'"'),'Configured participation link missing');
}
assert.ok(android.includes('Bu site Google hesabınızı veya testçi üyeliğinizi göremez'),'Do not imply the site can verify Google test consent');
assert.ok(!android.includes('<form'),'Do not collect Google account data for test registration');
console.log('PASS: '+urls.length+' unique sitemap pages, canonical URLs, headings, internal links, structured data/CSP and product/service discovery.');
