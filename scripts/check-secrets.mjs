// Print locations and classifications only. Never print a detected value.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import {isScannable,scanText} from './secret-scanner.mjs';
const files=new Set(execFileSync('git',['ls-files','-z','--cached','--others','--exclude-standard'],{encoding:'utf8'}).split('\0').filter(Boolean));
function built(dir){try{for(const name of readdirSync(dir)){const file=path.join(dir,name),st=statSync(file);if(st.isDirectory())built(file);else files.add(file);}}catch{}}
built('dist');
built('android-native/app/build/generated/source/buildConfig');
let count=0;const findings=[];
for(const file of files){
 if(!isScannable(file))continue;
 let text;try{const st=statSync(file);if(st.size>20_000_000){findings.push({file,type:'scan-size-limit'});continue;}text=readFileSync(file,'utf8');}catch{continue;}count++;
 findings.push(...scanText(text,file));
}
console.log(JSON.stringify({scannedFiles:count,findings},null,2));
if(findings.length)process.exitCode=1;
