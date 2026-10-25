import {securityHeaders} from './security-headers.mjs';

// A stateless transport guard. No business API, credentials or visitor storage.
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
  if(!['GET','HEAD'].includes(request.method)){
   headers.set('Allow','GET, HEAD');headers.set('Content-Type','text/plain; charset=utf-8');
   return new Response('Method not allowed',{status:405,headers});
  }
  const asset=await env.ASSETS.fetch(request),response=new Response(asset.body,asset);
  for(const [key,value] of Object.entries(securityHeaders))response.headers.set(key,value);
  return response;
 }
};
