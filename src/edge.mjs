import {securityHeaders} from './security-headers.mjs';
import {collectAnalytics,securityRecord} from './telemetry.mjs';

// Transport guard and consent-gated, minimised telemetry. No identity lookup.
export default {
 async fetch(request,env){
  const url=new URL(request.url),canonical=new URL(env.CANONICAL_ORIGIN);
  const headers=new Headers(securityHeaders);
  if(url.protocol!=='https:'||url.host!==canonical.host){
   // Never resolve untrusted paths against the base: // paths can replace a host.
   const destination=new URL(canonical);destination.pathname=url.pathname;destination.search=url.search;destination.hash='';
   headers.set('Location',destination.href);headers.set('X-Robots-Tag','noindex, follow');
   return new Response(null,{status:308,headers});
  }
  if(url.pathname==='/api/analytics'){
   const response=await collectAnalytics(request,env);for(const [key,value] of Object.entries(securityHeaders))if(key!=='Cache-Control')response.headers.set(key,value);return response;
  }
  if(!['GET','HEAD'].includes(request.method)){
   securityRecord(request,405);
   headers.set('Allow','GET, HEAD');headers.set('Content-Type','text/plain; charset=utf-8');
   return new Response('Method not allowed',{status:405,headers});
  }
  const asset=await env.ASSETS.fetch(request),response=new Response(asset.body,asset);
  securityRecord(request,asset.status);
  for(const [key,value] of Object.entries(securityHeaders))response.headers.set(key,value);
  return response;
 }
};
