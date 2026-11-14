(()=>{'use strict';
 const origin='https://voyagerroctechnologies.com';
 function safeURL(value){
  if(typeof value!=='string'||!value||/[\u0000-\u0020\u007f\\]/.test(value)||/%(?:0[0-9a-f]|1[0-9a-f]|7f|5c)/i.test(value))return '';
  const local=value.startsWith('/')&&!value.startsWith('//');
  if(value.startsWith('//')||/^\/(?:%2f|%5c)/i.test(value))return '';
  try{const url=new URL(value,origin);if(url.username||url.password)return '';if(local)return url.origin===origin?value:'';return /^https:\/\//i.test(value)&&url.protocol==='https:'?url.href:'';}catch{return '';}
 }
 window.VT_URL_POLICY=Object.freeze({safeURL});
})();
