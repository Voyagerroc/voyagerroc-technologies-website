// Scan reachable HEAD text blobs without printing blob content or credentials.
import {execFileSync} from 'node:child_process';
import {isScannable,scanText} from './secret-scanner.mjs';
const git=(args,options={})=>execFileSync('git',args,{maxBuffer:128*1024*1024,...options});
const objects=new Map();
for(const line of git(['rev-list','--objects','HEAD'],{encoding:'utf8'}).trim().split('\n')){
 const split=line.indexOf(' ');if(split<0)continue;const file=line.slice(split+1);if(isScannable(file))objects.set(line.slice(0,split),file);
}
const metadata=objects.size?git(['cat-file','--batch-check=%(objectname) %(objecttype) %(objectsize)'],{input:[...objects.keys()].join('\n')+'\n',encoding:'utf8'}).trim().split('\n'):[];
let scannedBlobs=0;const findings=[];
for(const entry of metadata){
 const [oid,type,size]=entry.split(' ');if(type!=='blob')continue;
 if(Number(size)>20_000_000){findings.push({file:objects.get(oid),blob:oid,type:'scan-size-limit'});continue;}
 const data=git(['cat-file','blob',oid]);if(data.includes(0))continue;scannedBlobs++;
 findings.push(...scanText(data.toString('utf8'),objects.get(oid)).map(f=>({...f,blob:oid})));
}
console.log(JSON.stringify({scope:'reachable HEAD history',scannedBlobs,findings},null,2));
if(findings.length)process.exitCode=1;
