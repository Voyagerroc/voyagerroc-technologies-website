import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {isScannable,scanText} from './secret-scanner.mjs';
import {createSecurityRecorder} from '../src/telemetry.mjs';
const box={window:{},URL};vm.runInNewContext(readFileSync('dist/url-policy.js','utf8'),box);const {safeURL}=box.window.VT_URL_POLICY;
for(const file of ['dist/index.html','dist/en/index.html']){
 const html=readFileSync(file,'utf8'),scripts=[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]);
 const policy=scripts.findIndex(src=>new URL(src,'https://voyagerroctechnologies.com/en/').pathname==='/url-policy.js');
 const app=scripts.findIndex(src=>/\/?app\.js(?:\?|$)/.test(src));assert.ok(policy>=0&&policy<app,'Shared policy loads before app on both language routes');
}
for(const value of ['javascript:alert(1)','data:text/html,test','//attacker.example','/\\attacker.example','https://user:pass@example.com','http://example.com','/x\nscript','/%2fexample.com','/%5cexample.com','https://example.com/%0aheader','relative/path',null])assert.equal(safeURL(value),'',String(value));
for(const value of ['https://example.com/app','/android/#payradar','/en/project-enquiry/?product=PayRadar'])assert.equal(safeURL(value),value);
for(const file of ['wrangler.jsonc','rules.txt','cloud.properties','.env.production','Cargo.lock','lib.rs'])assert.equal(isScannable(file),true,file);
const fixture='line1\n'+['sk-','proj-','A'.repeat(30)].join('');
const findings=scanText(fixture,'fixture.jsonc');assert.equal(findings.length,1);assert.equal(findings[0].line,2);assert.equal(JSON.stringify(findings).includes('A'.repeat(30)),false);
assert.equal(scanText('public text','file.txt').length,0);
const publicJwt=['eyJ0eXAiOiJKV1QifQ',Buffer.from(JSON.stringify({role:'anon'})).toString('base64url'),'signature'].join('.');
assert.equal(scanText(publicJwt,'public.js').length,0);
const privateJwt=['eyJ0eXAiOiJKV1QifQ',Buffer.from(JSON.stringify({role:'service_role'})).toString('base64url'),'signature'].join('.');
assert.equal(scanText(privateJwt,'private.js')[0].type,'service-role-jwt');
let clock=Date.UTC(2026,10,14,10,0),records=[];
const recorder=createSecurityRecorder({now:()=>clock,write:value=>records.push(value),limit:2});
const request=new Request('https://voyagerroctechnologies.com/private?token=DO-NOT-LOG');
for(let i=0;i<100;i++)recorder(request,404);assert.equal(records.length,2);
recorder(request,500);recorder(request,429);assert.equal(records.length,4,'Noisy404 does not consume5xx or429 budgets');
assert.equal(JSON.stringify(records).includes('DO-NOT-LOG'),false);clock+=60000;recorder(request,404);assert.equal(records.length,5);
const isolated=[];createSecurityRecorder({now:()=>clock,write:x=>isolated.push(x),limit:2})(request,404);assert.equal(isolated.length,1);
console.log('PASS: shared URL policy, secret classification/redaction, public JWT handling and bounded independent security-log budgets.');
