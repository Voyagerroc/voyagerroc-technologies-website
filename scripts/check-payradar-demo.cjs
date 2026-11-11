const {chromium}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../dist'),output=path.resolve(__dirname,'../qa');
fs.mkdirSync(output,{recursive:true});
(async()=>{
 const {securityHeaders}=await import('../src/security-headers.mjs');
 const server=http.createServer((req,res)=>{
  let file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);
  if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file))return res.writeHead(404).end();
  const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.mp4':'video/mp4','.vtt':'text/vtt','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2','.svg':'image/svg+xml'};
  for(const [name,value] of Object.entries(securityHeaders))res.setHeader(name,value);
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  const size=fs.statSync(file).size,range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),size-1):size-1;if(start>end)return res.writeHead(416).end();res.writeHead(206,{'Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});fs.createReadStream(file,{start,end}).pipe(res);}
  else {res.writeHead(200,{'Content-Length':size,'Accept-Ranges':'bytes'});fs.createReadStream(file).pipe(res);}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=process.argv.includes('--live')?'https://voyagerroctechnologies.com':'http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({channel:'chrome',headless:true}),results=[];
 try{
  for(const width of [320,390,768,1440])for(const language of ['tr','en']){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[],failed=[];
   page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.url(),r.status()]);});
   await page.goto(base+(language==='tr'?'/urunler/payradar/':'/en/urunler/payradar/'),{waitUntil:'networkidle'});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Horizontal overflow');
   assert.ok((await page.locator('.product-update').innerText()).includes('2.1.5'));
   const video=page.locator('.product-demo');
   assert.ok((await video.locator('source').getAttribute('src')).includes('native-v12-20261106'));
   assert.equal(await video.getAttribute('autoplay'),null);assert.equal(await video.getAttribute('preload'),'none');
   await video.evaluate(v=>new Promise((resolve,reject)=>{v.onloadedmetadata=resolve;v.onerror=()=>reject(Error('Video decode failed'));v.load();}));
   assert.deepEqual(await video.evaluate(v=>[v.videoWidth,v.videoHeight,Math.round(v.duration)]),[720,1600,36]);
   await video.evaluate(v=>v.play());await page.waitForFunction(()=>document.querySelector('video').currentTime>0.2);await video.evaluate(v=>v.pause());
   for(const second of [3,9,15,21,27,33])await video.evaluate((v,time)=>new Promise(resolve=>{v.onseeked=resolve;v.currentTime=time;}),second);
   if(width===390){
    const accessibility=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(accessibility.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
    await video.screenshot({path:path.join(output,'payradar-v12-video-'+language+'.png')});
   }
   assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
   results.push({width,language,decodedScenes:6,duration:36,errors,failed});await context.close();
  }
  fs.writeFileSync(path.join(output,'payradar-v12-video-results'+(process.argv.includes('--live')?'-live':'')+'.json'),JSON.stringify(results,null,2));
  console.log('PASS: 8 TR/EN phone/tablet/desktop flows; video playback and all 6 scene seeks, current release copy, no overflow/errors, and 2 mobile accessibility scans.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
