export const CONSENT_COOKIE='__Host-vrt_privacy';
export function analyticsReady(env){return env.ANALYTICS_ENABLED==='true'&&env.ANALYTICS_TRANSFER_READY==='true'&&!!env.ANALYTICS_LIMITER&&typeof env.CONSENT_VERSION==='string'&&/^[A-Za-z0-9_-]+$/.test(env.CONSENT_VERSION)&&!env.CONSENT_VERSION.endsWith('-preview');}
export function consentAllowed(request,env,now=Date.now()){
 const entry=(request.headers.get('Cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(CONSENT_COOKIE+'='));
 if(!entry)return false;
 try{const [version,choice,day]=decodeURIComponent(entry.slice(CONSENT_COOKIE.length+1)).split('.');const age=Math.floor(now/86400000)-Number(day);return version===env.CONSENT_VERSION&&choice==='allow'&&Number.isInteger(Number(day))&&age>=-1&&age<180;}catch{return false;}
}
export function routeClass(pathname){
 if(pathname==='/')return 'home';
 if(/^\/urunler\/(eip|payradar|laserdeck|pharos|bungalow)\/$/.test(pathname))return pathname.slice(0,-1);
 if(/^\/yasal\/(?:kvkk\/|gizlilik\/|cerezler\/|kullanim\/|fikri-haklar\/|basvuru\/|isbirligi\/|iletisim\/)?$/.test(pathname))return 'legal';
 return 'other';
}
export function deviceClass(ua){return /bot|crawler|spider/i.test(ua)?'automation':/ipad|tablet/i.test(ua)?'tablet':/mobile|android|iphone/i.test(ua)?'mobile':'desktop-or-other';}
export function browserClass(ua){return /Edg\//.test(ua)?'Edge':/Firefox\//.test(ua)?'Firefox':/Chrome\//.test(ua)?'Chromium':/Safari\//.test(ua)?'Safari':'Other';}
export function securityRecord(request,status){
 // No request URL, query, IP, UA, cookie, body or user identifier is logged.
 if(status!==405&&status!==429&&status<500&&!(status===404&&routeClass(new URL(request.url).pathname)==='other'))return;
 console.log({kind:'vrt_security',minute:new Date().toISOString().slice(0,16),method:['GET','HEAD','POST','OPTIONS'].includes(request.method)?request.method:'OTHER',status,route:routeClass(new URL(request.url).pathname)});
}
export async function collectAnalytics(request,env){
 const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'};
 const reply=(status,message)=>new Response(JSON.stringify({message}),{status,headers});
 if(!analyticsReady(env))return reply(503,'Optional analytics is not active.');
 if(request.method!=='POST')return reply(405,'POST required.');
 if(request.headers.get('Origin')!==env.CANONICAL_ORIGIN||request.headers.get('Sec-Fetch-Site')!=='same-origin')return reply(403,'Same-origin request required.');
 if(request.headers.get('Sec-GPC')==='1'||!consentAllowed(request,env))return reply(403,'Current consent required.');
 const rate=await env.ANALYTICS_LIMITER.limit({key:request.headers.get('CF-Connecting-IP')||'unknown'});if(!rate.success)return reply(429,'Rate limit.');
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply(415,'JSON required.');
 const length=Number(request.headers.get('Content-Length')||0);if(length>512)return reply(413,'Payload too large.');
 // Bounded streaming avoids reading an untrusted unbounded body into memory.
 const reader=request.body?.getReader();if(!reader)return reply(400,'Body required.');
 let chunks=[],bytes=0;for(;;){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>512){await reader.cancel();return reply(413,'Payload too large.');}chunks.push(value);}
 let data;try{const merged=new Uint8Array(bytes);let offset=0;for(const c of chunks){merged.set(c,offset);offset+=c.length;}data=JSON.parse(new TextDecoder().decode(merged));}catch{return reply(400,'Invalid JSON.');}
 if(!data||Array.isArray(data)||Object.keys(data).some(k=>!['event','page','project'].includes(k)))return reply(400,'Unknown fields.');
 if(!['page_view','project_open','whatsapp_click'].includes(data.event)||typeof data.page!=='string'||data.page.length>100||routeClass(data.page)==='other')return reply(400,'Invalid event.');
 if(data.project!==undefined&&!['eip','payradar','laserdeck','pharos','bungalow'].includes(data.project))return reply(400,'Invalid project.');
 const ua=request.headers.get('User-Agent')||'',country=/^[A-Z]{2}$/.test(request.cf?.country||'')?request.cf.country:'XX';
 if(deviceClass(ua)==='automation')return new Response(null,{status:204,headers});
 // Coarse fields only. Each event is not a unique visitor or verified identity.
 console.log({kind:'vrt_optional_analytics',day:new Date().toISOString().slice(0,10),event:data.event,page:routeClass(data.page),project:data.project||null,country,device:deviceClass(ua),browser:browserClass(ua),consentVersion:env.CONSENT_VERSION});
 return new Response(null,{status:204,headers});
}
