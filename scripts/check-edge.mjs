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
