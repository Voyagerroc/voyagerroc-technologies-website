const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const root=path.resolve(__dirname,'../dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2'};
const headers=Object.fromEntries(fs.readFileSync(path.join(root,'_headers'),'utf8').split('\n\n')[0].split('\n').slice(1).filter(Boolean).map(line=>{const at=line.indexOf(':');return [line.slice(0,at).trim(),line.slice(at+1).trim()];}));
const server=http.createServer((req,res)=>{
 let file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);
 if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404);return res.end();}
 for(const [key,value] of Object.entries(headers))res.setHeader(key,value);
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const results=[];
 try{
  for(const en of [false,true]){
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
   const page=await context.newPage();
   await page.goto(base+(en?'/en/':'/'),{waitUntil:'networkidle'});
   const prefix=en?'/en':'';
   const visual=page.locator('#featured-projects a.feature-visual').filter({has:page.locator('*')}).first();
   assert.ok(await visual.count(),'Product visual must be a normal anchor');
   for(const id of ['eip','payradar','laserdeck']){
    const card=page.locator('#featured-projects .feature-card').filter({has:page.locator('a[href="'+prefix+'/urunler/'+id+'/"]')});
    assert.equal(await card.count(),1);
    assert.ok(await card.locator('h3 a[href="'+prefix+'/urunler/'+id+'/"]').count(),'Product title must navigate');
   }
   assert.equal(await page.locator('a[href*="/en/en/"]').count(),0);
   assert.equal(await page.locator('[data-i18n="sceneCaption"]').textContent(),en?'Five product domains. A conceptual system study.':'Be\u015f \u00fcr\u00fcn alan\u0131. Kavramsal sistem g\u00f6rseli.');
   const preview=page.locator('#featured-projects button[data-project="payradar"]');
   const separated=await preview.evaluate(button=>button.getBoundingClientRect().top>=button.closest('.feature-card').querySelector('.feature-summary').getBoundingClientRect().bottom);
   assert.ok(separated,'Preview must follow the summary without overlapping text');
   await preview.click();assert.equal(await page.locator('#project-dialog').evaluate(el=>el.open),true);
   await page.keyboard.press('Escape');assert.equal(await preview.evaluate(el=>el===document.activeElement),true);
   const selection=await page.locator('h1').evaluate(el=>{const s=getComputedStyle(el,'::selection');return {color:s.color,background:s.backgroundColor};});
   assert.equal(selection.color,'rgb(255, 255, 255)');
   // Untrusted project strings must never create executable attributes or URLs.
   await page.evaluate(()=>{const p=window.PORTFOLIO_PROJECTS.find(p=>p.id==='payradar');p.image='x" onerror="window.reportProbeExecuted=true';p.live='javascript:window.reportProbeExecuted=true';p.repo='https://example.invalid/" onclick="window.reportProbeExecuted=true';});
   await preview.click();
   assert.equal(await page.locator('#dialog-content [onerror],#dialog-content [onclick],#dialog-content a[href^="javascript:"]').count(),0);
   assert.equal(await page.evaluate(()=>window.reportProbeExecuted===true),false);
   await page.keyboard.press('Escape');
   await page.locator('#featured-projects h3 a[href="'+prefix+'/urunler/payradar/"]').click();
   await page.waitForURL(base+prefix+'/urunler/payradar/');
   assert.ok((await page.locator('main').innerText()).includes('PayRadar'));
   await context.close();results.push({language:en?'en':'tr',navigation:true,previewFocus:true,selection:true,attributeSafety:true});
   for(const denied of [false,true]){
    const ctx=await browser.newContext({viewport:{width:390,height:844}});
    await ctx.route('https://wa.me/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<title>WhatsApp stub</title>'}));
    await ctx.addInitScript(({denied})=>{window.copiedBriefs=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{if(denied)throw new Error('denied fixture');window.copiedBriefs.push(text);}}});},{denied});
    const enquiry=await ctx.newPage();
    await enquiry.goto(base+(en?'/en/project-enquiry/':'/proje-gorusmesi/'));
    await enquiry.locator('#brief-type').selectOption({index:1});
    await enquiry.locator('#brief-goal').fill('Fixture project goal with sufficient detail for validation.');
    await enquiry.locator('#enquiry-form button[type="submit"]').click();
    const text=await enquiry.locator('#brief-preview').innerText();
    assert.equal(await enquiry.locator('#brief-whatsapp').getAttribute('href'),'https://wa.me/905444219322');
    const popupPromise=enquiry.waitForEvent('popup');await enquiry.locator('#brief-whatsapp').click();
    const popup=await popupPromise;await popup.close();
    await enquiry.waitForFunction(()=>document.getElementById('brief-status').textContent.trim().length>0);
    const status=await enquiry.locator('#brief-status').innerText();
    if(denied){assert.deepEqual(await enquiry.evaluate(()=>window.copiedBriefs),[]);assert.match(status,en?/copy|select/i:/kopyala|seç/i);}
    else{assert.deepEqual(await enquiry.evaluate(()=>window.copiedBriefs),[text]);assert.match(status,en?/copied/i:/kopyalandı/i);}
    await enquiry.locator('#brief-goal').fill('Another fixture project goal with sufficient detail.');
    assert.equal(await enquiry.locator('#brief-result').isVisible(),false);
    await ctx.close();results.push({language:en?'en':'tr',clipboard:denied?'manual-fallback':'success',fixedWhatsAppURL:true,staleBriefHidden:true});
   }
  }
  fs.mkdirSync(path.resolve(__dirname,'../qa/orchestration'),{recursive:true});
  fs.writeFileSync(path.resolve(__dirname,'../qa/orchestration/report-fixes-results.json'),JSON.stringify(results,null,2));
  console.log('PASS: TR/EN product navigation, preview focus, selection contrast, injected attributes/URLs, clipboard success/failure and stale brief invalidation.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
