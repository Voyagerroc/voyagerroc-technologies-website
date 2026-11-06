import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {fileURLToPath} from 'node:url';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import {launch} from 'chrome-launcher';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404);return res.end();}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const chrome=await launch({chromeFlags:['--headless','--no-first-run'],ignoreDefaultFlags:false});
try{
 const results=[];
 for(const desktop of [false,true]){
  const {lhr}=await lighthouse('http://127.0.0.1:'+server.address().port+'/',{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']},desktop?desktopConfig:undefined);
  results.push({device:desktop?'desktop':'mobile',scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['largest-contentful-paint','cumulative-layout-shift','total-blocking-time'].map(id=>[id,lhr.audits[id].numericValue])),failed:Object.entries(lhr.audits).filter(([,a])=>a.score!==null&&a.score<1&&a.details?.items?.length).map(([id,a])=>({id,title:a.title,displayValue:a.displayValue,...(id==='label-content-name-mismatch'?{items:a.details.items}:{})}))});
 }
 const target=path.join(root,'../qa/lighthouse-audit.json');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await chrome.kill();server.close();}
