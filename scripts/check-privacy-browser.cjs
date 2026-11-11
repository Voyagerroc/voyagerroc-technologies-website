const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'@playwright/test');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp'};
const server=http.createServer((req,res)=>{
 let file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({headless:true});
 try{
  let checks=0;
  for(const width of [360,1440])for(const en of [false,true]){
   const context=await browser.newContext({viewport:{width,height:950},reducedMotion:'reduce'}),page=await context.newPage();
   const external=[],errors=[],posts=[];
   page.on('request',r=>{if(new URL(r.url()).origin!==base)external.push(r.url());if(r.method()!=='GET')posts.push(r.method());});
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+(en?'/en/project-enquiry/':'/proje-gorusmesi/'));
   await page.locator('[data-privacy-dismiss]').click().catch(()=>{});
   assert.ok(await page.locator('#enquiry-form a[href="/yasal/kvkk/"]').count());
   await page.locator('#brief-name').fill('Privacy fixture <img src=x onerror=alert(1)>');
   await page.locator('#brief-type').selectOption({index:1});
   await page.locator('#brief-goal').fill('Confidential fixture project brief. This must never enter a third-party URL.');
   await page.locator('button[type=submit]').click();
   assert.equal(await page.locator('#brief-result').isVisible(),true);
   assert.equal(await page.locator('#brief-preview img').count(),0);
   const wa=new URL(await page.locator('#brief-whatsapp').getAttribute('href'));
   assert.equal(wa.origin,'https://wa.me');assert.equal(wa.search,'');
   assert.ok(new URL(await page.locator('#brief-email').getAttribute('href')).searchParams.get('body').includes('Confidential fixture'));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   assert.deepEqual(external,[]);assert.deepEqual(posts,[]);assert.deepEqual(errors,[]);
   await page.reload();assert.equal(await page.locator('#brief-name').inputValue(),'');
   await context.close();checks++;
  }
  console.log(`PASS: ${checks} TR/EN desktop/mobile privacy flows; notice link, safe rendering, no brief in WhatsApp URL, no automatic/external submission, no retained brief.`);
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
