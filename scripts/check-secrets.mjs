// Print locations and classifications only. Never print a detected value.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
const files=new Set(execFileSync('git',['ls-files','-z','--cached','--others','--exclude-standard'],{encoding:'utf8'}).split('\0').filter(Boolean));
function built(dir){try{for(const name of readdirSync(dir)){const file=path.join(dir,name),st=statSync(file);if(st.isDirectory())built(file);else files.add(file);}}catch{}}
built('dist');
built('android-native/app/build/generated/source/buildConfig');
const patterns=[
 ['supabase-secret',/sb_secret_[A-Za-z0-9_-]{16,}/g],
 ['payment-secret',/sk_(?:live|test)_[A-Za-z0-9]{16,}/g],
 ['github-token',/(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})/g],
 ['aws-access-id',/AKIA[A-Z0-9]{16}/g],
 ['private-key',/-----BEGIN (?:RSA |EC |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/g],
];
let count=0;const findings=[];
for(const file of files){
 if(!/\.(?:[cm]?js|tsx?|html|css|json|map|kt|java|xml|sql|ya?ml|md|properties|toml|example)$/.test(file)||/cloud\.properties$/.test(file))continue;
 let text;try{const st=statSync(file);if(st.size>20_000_000){findings.push({file,type:'scan-size-limit'});continue;}text=readFileSync(file,'utf8');}catch{continue;}count++;
 const found=(type,index)=>findings.push({file,line:text.slice(0,index).split('\n').length,type});
 for(const [type,pattern] of patterns)for(const m of text.matchAll(pattern))found(type,m.index);
 for(const m of text.matchAll(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g)){
  try{const role=JSON.parse(Buffer.from(m[0].split('.')[1],'base64url').toString()).role;if(role!=='anon')found(role==='service_role'?'service-role-jwt':'embedded-nonpublic-jwt',m.index);}catch{found('unclassified-embedded-jwt',m.index);}
 }
}
console.log(JSON.stringify({scannedFiles:count,findings},null,2));
if(findings.length)process.exitCode=1;
