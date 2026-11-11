const {chromium}=require('@playwright/test');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../dist'),out=path.resolve(__dirname,'../qa/aperture');fs.mkdirSync(out,{recursive:true});
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404);return res.end();}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--enable-unsafe-swiftshader']});
const cases=[{name:'android-small',width:360,height:800,isMobile:true,hasTouch:true,deviceScaleFactor:3},{name:'android',width:412,height:915,isMobile:true,hasTouch:true,deviceScaleFactor:2.625},{name:'tablet-portrait',width:768,height:1024,hasTouch:true,deviceScaleFactor:2},{name:'tablet-landscape',width:1024,height:768,hasTouch:true,deviceScaleFactor:2},{name:'desktop',width:1440,height:900},{name:'desktop-wide',width:1920,height:1080},{name:'reduced-motion',width:390,height:844,isMobile:true,hasTouch:true,reducedMotion:'reduce'}];
const results=[];try{for(const cfg of cases){
 const {name,width,height,...options}=cfg;const context=await browser.newContext({viewport:{width,height},...options});const page=await context.newPage();const errors=[];let requestedWithoutInteraction=false;
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().includes('scene-3d.min.js'))requestedWithoutInteraction=true;});
 await page.goto(base+(name==='tablet-landscape'?'/en/':'/'));
 // No scrolling or clicking is needed to request/initialise the animation.
 await page.waitForFunction(()=>document.body.dataset.webgl==='ready',{},{timeout:15000});assert.ok(requestedWithoutInteraction);
 assert.equal(await page.locator('body').getAttribute('data-motion'),'running');
 await page.locator('#scene-container').scrollIntoViewIfNeeded();
 const time=()=>page.locator('#nexus-canvas').evaluate(el=>Number(el.dataset.animationTime));
 const before=await time();await page.waitForFunction(t=>Number(document.getElementById('nexus-canvas').dataset.animationTime)>t+0.1,before);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 const frame=await page.locator('#nexus-canvas').evaluate(el=>({viewport:el.dataset.viewport,camera:Number(el.dataset.cameraDistance),width:el.width,height:el.height,time:Number(el.dataset.animationTime)}));
 assert.ok(frame.width>0&&frame.height>0&&frame.camera>0);
 await page.locator('#scene-container').screenshot({path:path.join(out,name+'-scene.png')});await page.screenshot({path:path.join(out,name+'-viewport.png')});
 await page.locator('#motion-toggle').click();assert.equal(await page.locator('body').getAttribute('data-motion'),'paused');const paused=await time();await page.waitForTimeout(180);assert.equal(await time(),paused);
 await page.locator('#motion-toggle').click();await page.waitForFunction(t=>Number(document.getElementById('nexus-canvas').dataset.animationTime)>t,paused);
 if(name==='tablet-portrait'){await page.setViewportSize({width:1024,height:768});await page.locator('#scene-container').scrollIntoViewIfNeeded();await page.waitForFunction(old=>document.getElementById('nexus-canvas').dataset.viewport!==old,frame.viewport);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);const rotated=await time();await page.waitForFunction(t=>Number(document.getElementById('nexus-canvas').dataset.animationTime)>t,rotated);}
 if(name==='desktop'){
  await page.evaluate(()=>{window.apertureTestLoss=document.getElementById('nexus-canvas').getContext('webgl2').getExtension('WEBGL_lose_context');window.apertureTestLoss.loseContext();});
  await page.waitForFunction(()=>document.body.dataset.webgl==='fallback');await page.waitForTimeout(1100);
  await page.evaluate(()=>window.apertureTestLoss.restoreContext());await page.waitForFunction(()=>document.body.dataset.webgl==='ready');
  const restored=await time();await page.waitForFunction(t=>Number(document.getElementById('nexus-canvas').dataset.animationTime)>t,restored);
 }
 assert.deepEqual(errors,[]);results.push({name,viewportWidth:width,viewportHeight:height,autoStarted:true,moving:true,pauseResume:true,errors,...frame});await context.close();
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
