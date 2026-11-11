import {securityHeaders} from './security-headers.mjs';
import {collectAnalytics,securityRecord} from './telemetry.mjs';

const MIME_BY_EXT = new Map([
  ['.js', 'application/javascript'],
  ['.mjs', 'application/javascript'],
  ['.css', 'text/css'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.ttf', 'font/ttf'],
  ['.json', 'application/json'],
  ['.webmanifest', 'application/manifest+json'],
  ['.wasm', 'application/wasm']
]);

function isStaticAsset(url, response) {
  const dotIdx = url.pathname.lastIndexOf('.');
  if (dotIdx === -1) return false;
  const ext = url.pathname.slice(dotIdx).toLowerCase();
  const expectedMime = MIME_BY_EXT.get(ext);
  if (!expectedMime) return false;
  const contentType = (response.headers.get('Content-Type') || '').toLowerCase().trim();
  if (!contentType || contentType.startsWith('text/html')) return false;
  const mime = contentType.split(';', 1)[0].trim();
  return mime === expectedMime || (['.js', '.mjs'].includes(ext) && mime === 'text/javascript');
}

// Transport guard and consent-gated, minimised telemetry. No identity lookup.
export default {
 async fetch(request,env){
  const url=new URL(request.url),canonical=new URL(env.CANONICAL_ORIGIN);
  const headers=new Headers(securityHeaders);
  try {
  // An explicit local CLI flag permits loopback HTTP preview only. It cannot
  // bypass redirects for a public host or a production HTTPS canonical URL.
  const localPreview=(env.LOCAL_DEV===true||env.LOCAL_DEV==='true')&&canonical.protocol==='http:'&&canonical.hostname===url.hostname&&['localhost','127.0.0.1','[::1]'].includes(url.hostname);
  if(!localPreview&&(url.protocol!=='https:'||url.host!==canonical.host)){
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
  if((response.ok || response.status === 304) && isStaticAsset(url, response)){
   response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate, no-transform');
  }
  // A dedicated public logo is embedded in email signatures on other origins.
  if(url.pathname==='/assets/email-signature-logo.png'&&response.ok)response.headers.set('Cross-Origin-Resource-Policy','cross-origin');
  return response;
  } catch {
   securityRecord(request,503);
   headers.set('Content-Type','text/plain; charset=utf-8');
   headers.set('Cache-Control','no-store');
   return new Response('Service temporarily unavailable',{status:503,headers});
  }
 }
};
