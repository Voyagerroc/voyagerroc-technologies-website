import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Substitute only the import boundary so scheduling can be tested without a GPU.
const source=fs.readFileSync(new URL('../dist/scene.js',import.meta.url),'utf8').replace("import('./scene-3d.min.js')",'importScene()');
assert.ok(source.includes('importScene()'));
function fixture({complete=false,idle=true,target=true,reject=false}={}){
 const body={dataset:{}},toggle={hidden:false},loads=[],idles=[],timers=[];
 let imports=0;
 const context={document:{body,readyState:complete?'complete':'loading',getElementById:id=>id==='scene-container'?(target?{}:null):toggle},window:{addEventListener:(type,fn,opts)=>{assert.equal(type,'load');assert.equal(opts.once,true);loads.push(fn);}},setTimeout:(fn,delay)=>timers.push({fn,delay}),importScene:()=>{imports++;return reject?Promise.reject(new Error('fixture import failure')):Promise.resolve();}};
 if(idle)context.window.requestIdleCallback=(fn,opts)=>idles.push({fn,opts});
 vm.runInNewContext(source,context);
 return {body,toggle,loads,idles,timers,imports:()=>imports};
}
const deferred=fixture();
assert.equal(deferred.body.dataset.webgl,'poster');assert.equal(deferred.imports(),0);assert.equal(deferred.idles.length,0);
deferred.loads[0]();deferred.loads[0]();assert.equal(deferred.idles.length,1);assert.equal(deferred.idles[0].opts.timeout,2500);assert.equal(deferred.imports(),0);
deferred.idles[0].fn();deferred.idles[0].fn();assert.equal(deferred.imports(),1);assert.equal(deferred.body.dataset.webgl,'loading');
const late=fixture({complete:true});assert.equal(late.loads.length,0);assert.equal(late.idles.length,1);assert.equal(late.imports(),0);late.idles[0].fn();assert.equal(late.imports(),1);
const fallback=fixture({idle:false});fallback.loads[0]();assert.equal(fallback.timers[0].delay,400);assert.equal(fallback.imports(),0);fallback.timers[0].fn();assert.equal(fallback.imports(),1);
const missing=fixture({target:false});assert.equal(missing.imports(),0);assert.equal(missing.loads.length,0);assert.equal(missing.idles.length,0);
const failure=fixture({complete:true,reject:true});failure.idles[0].fn();await new Promise(resolve=>setImmediate(resolve));assert.equal(failure.body.dataset.webgl,'fallback');assert.equal(failure.toggle.hidden,true);
console.log('PASS: poster first, load/idle ordering, already-loaded document, timeout fallback, one import, missing target and import failure.');
