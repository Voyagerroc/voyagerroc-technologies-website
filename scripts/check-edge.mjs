import assert from 'node:assert/strict';
import edge from '../src/edge.mjs';
let reads=0;
const env={CANONICAL_ORIGIN:'https://voyagerroctechnologies.com',ASSETS:{fetch:async request=>{reads++;return new Response(request.method==='HEAD'?null:'not found',{status:404,headers:{'Content-Type':'text/html','ETag':'test'}});}}};
for(const source of ['http://voyagerroctechnologies.com/urunler/eip/?ref=test','https://www.voyagerroctechnologies.com/urunler/payradar/?ref=test','http://www.voyagerroctechnologies.com/hakkimizda/?ref=test','https://voyagerroc-technologies.voyagerroc.workers.dev/urunler/eip/?ref=test','http://voyagerroctechnologies.com//attacker.example/path?x=1']){
 const response=await edge.fetch(new Request(source),env);assert.equal(response.status,308);
 const destination=new URL(response.headers.get('Location'));assert.equal(destination.origin,env.CANONICAL_ORIGIN);assert.equal(destination.username,'');assert.equal(destination.password,'');assert.equal(destination.pathname,new URL(source).pathname);assert.equal(destination.search,new URL(source).search);
}
assert.equal(reads,0);
const rejected=await edge.fetch(new Request(env.CANONICAL_ORIGIN,{method:'POST',body:'ignored'}),env);assert.equal(rejected.status,405);assert.equal(rejected.headers.get('Allow'),'GET, HEAD');assert.equal(reads,0);
for(const method of ['GET','HEAD']){const response=await edge.fetch(new Request(env.CANONICAL_ORIGIN+'/missing/',{method}),env);assert.equal(response.status,404);assert.equal(response.headers.get('ETag'),'test');assert.match(response.headers.get('Content-Security-Policy'),/script-src-attr 'none'/);assert.match(response.headers.get('Strict-Transport-Security'),/31536000/);}
assert.equal(reads,2);console.log('PASS: fixed-host redirects, path/query preservation, method gate, asset status and security headers.');
const publicAssetEnv={...env,ASSETS:{fetch:async()=>new Response('public image',{status:200,headers:{'Content-Type':'image/png'}})}};
for(const [route,policy] of [['/assets/email-signature-logo.png','cross-origin'],['/assets/brand/voyagerroc-technologies-logo.png','same-origin'],['/','same-origin']]){
 const response=await edge.fetch(new Request(env.CANONICAL_ORIGIN+route),publicAssetEnv);
 assert.equal(response.headers.get('Cross-Origin-Resource-Policy'),policy,'Only the dedicated signature logo may embed cross-origin');
 assert.match(response.headers.get('Content-Security-Policy'),/script-src-attr 'none'/);
}
const missingLogo=await edge.fetch(new Request(env.CANONICAL_ORIGIN+'/assets/email-signature-logo.png'),env);assert.equal(missingLogo.headers.get('Cross-Origin-Resource-Policy'),'same-origin');
console.log('PASS: email logo embeds across origins; other responses retain origin isolation.');
const failure=await edge.fetch(new Request(env.CANONICAL_ORIGIN+'/secret-query?email=fixture@example.invalid'),{...env,ASSETS:{fetch:async()=>{throw new Error('private provider detail');}}});
assert.equal(failure.status,503);assert.equal(failure.headers.get('Cache-Control'),'no-store');
assert.doesNotMatch(await failure.text(),/private provider detail|fixture@example/);
assert.match(failure.headers.get('Content-Security-Policy'),/script-src-attr 'none'/);
console.log('PASS: upstream failure returns a generic uncached error with security headers.');
const previewEnv={...publicAssetEnv,LOCAL_DEV:'true',CANONICAL_ORIGIN:'http://127.0.0.1:8890'};
assert.equal((await edge.fetch(new Request('http://127.0.0.1:8890/'),previewEnv)).status,200);
assert.equal((await edge.fetch(new Request('http://127.0.0.1:8890/'),{...previewEnv,LOCAL_DEV:true})).status,200);
// Wrangler rewrites the upstream host without the listening port.
assert.equal((await edge.fetch(new Request('http://127.0.0.1/'),previewEnv)).status,200);
assert.equal((await edge.fetch(new Request('http://127.0.0.1:8890/'),{...previewEnv,LOCAL_DEV:'false'})).status,308);
assert.equal((await edge.fetch(new Request('http://voyagerroctechnologies.com/'),{...publicAssetEnv,LOCAL_DEV:'true'})).status,308);
assert.equal((await edge.fetch(new Request('http://public.example/'),{...previewEnv,CANONICAL_ORIGIN:'http://public.example'})).status,308);
console.log('PASS: explicit loopback preview does not bypass production HTTPS or public-host redirects.');

const cached='public, max-age=3600, must-revalidate, no-transform';
for(const method of ['GET','HEAD'])for(const [route,mime] of [['/app.js','text/javascript; charset=utf-8'],['/scene.js','application/javascript'],['/style.css','text/css'],['/assets/font.woff2','font/woff2'],['/assets/poster.webp','image/webp']]){
 const staticEnv={...env,ASSETS:{fetch:async()=>new Response(method==='HEAD'?null:'fixture',{headers:{'Content-Type':mime,ETag:'fixture-etag'}})}};
 const response=await edge.fetch(new Request(env.CANONICAL_ORIGIN+route,{method}),staticEnv);
 assert.equal(response.headers.get('Cache-Control'),cached,method+' '+route);
 assert.equal(response.headers.get('ETag'),'fixture-etag');
 assert.match(response.headers.get('Content-Security-Policy'),/script-src-attr 'none'/);
 assert.doesNotMatch(response.headers.get('Cache-Control'),/immutable/);
}
for(const [route,mime,status] of [['/','text/html',200],['/missing.js','text/html',200],['/missing.js','text/javascript',404],['/app.js','text/javascript-malformed',200],['/app.js','',304],['/app.js','text/javascript',302],['/api/other.json','text/html',200]]){
 const response=await edge.fetch(new Request(env.CANONICAL_ORIGIN+route),{...env,ASSETS:{fetch:async()=>new Response(status===304?null:'fixture',{status,headers:{'Content-Type':mime}})}});
 assert.match(response.headers.get('Cache-Control'),/max-age=0/,'No static cache for '+route+' '+mime+' '+status);
}
const revalidated=await edge.fetch(new Request(env.CANONICAL_ORIGIN+'/app.js'),{...env,ASSETS:{fetch:async()=>new Response(null,{status:304,headers:{'Content-Type':'text/javascript',ETag:'unchanged'}})}});
assert.equal(revalidated.status,304);assert.equal(revalidated.headers.get('Cache-Control'),cached);assert.equal(revalidated.headers.get('ETag'),'unchanged');
const analytics=await edge.fetch(new Request(env.CANONICAL_ORIGIN+'/api/analytics'),{...env,ANALYTICS_ENABLED:'false'});
assert.match(analytics.headers.get('Cache-Control'),/no-store/);
console.log('PASS: bounded GET/HEAD static caching, JS MIME aliases, HTML/error/redirect exclusions, validators, 304 and uncached analytics.');
