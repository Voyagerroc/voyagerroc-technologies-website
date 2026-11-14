// Return classifications/locations only; detected values must never reach logs.
export function isScannable(file){
 return /\.(?:[cm]?js|tsx?|html|css|jsonc?|map|kt|java|xml|sql|ya?ml|md|txt|properties|toml|lock|rs|pem|key|example)$/.test(file)||/(?:^|\/)\.env(?:\.[^/]*)?$/.test(file);
}
const patterns=[
 ['supabase-secret',/sb_secret_[A-Za-z0-9_-]{16,}/g],
 ['payment-secret',/sk_(?:live|test)_[A-Za-z0-9]{16,}/g],
 ['openai-secret',/\bsk-(?:proj|svcacct)-[A-Za-z0-9_-]{20,}/g],
 ['google-api-key',/\bAIza[A-Za-z0-9_-]{30,}/g],
 ['github-token',/(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})/g],
 ['gitlab-token',/\bglpat-[A-Za-z0-9_-]{20,}/g],
 ['slack-token',/\bxox[baprs]-[A-Za-z0-9-]{15,}/g],
 ['notion-token',/\b(?:secret_|ntn_)[A-Za-z0-9]{32,}/g],
 ['sendgrid-key',/\bSG\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/g],
 ['aws-access-id',/\b(?:AKIA|ASIA)[A-Z0-9]{16}/g],
 ['private-key',/-----BEGIN (?:RSA |EC |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/g],
 ['assigned-credential',/\b(?:api[_-]?key|api[_-]?token|client[_-]?secret|access[_-]?token|password)["']?\s*[=:]\s*["'][A-Za-z0-9_./+-]{24,}["']/gi]
];
export function scanText(text,file){
 const findings=[];
 const found=(type,index)=>findings.push({file,line:text.slice(0,index).split('\n').length,type});
 for(const [type,pattern] of patterns)for(const m of text.matchAll(pattern))found(type,m.index);
 for(const m of text.matchAll(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g)){
  try{const role=JSON.parse(Buffer.from(m[0].split('.')[1],'base64url').toString()).role;if(role!=='anon')found(role==='service_role'?'service-role-jwt':'embedded-nonpublic-jwt',m.index);}catch{found('unclassified-embedded-jwt',m.index);}
 }
 return findings;
}
