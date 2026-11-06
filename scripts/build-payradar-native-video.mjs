// A labelled tour of authentic Android screenshots, never a simulated live flow.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const work=path.join(root,'qa/native-video');fs.mkdirSync(work,{recursive:true});
const font=process.env.VIDEO_FONT||(process.platform==='win32'?path.join(process.env.WINDIR||'C:/Windows','Fonts/arial.ttf'):'/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf');
fs.copyFileSync(font,path.join(work,'font.ttf'));
const steps=[['home','Ödeme özeti ve ayrı para birimleri'],['payments','Vadeler ve yenilenen ödeme kartları'],['editor','Ödeme formu ve giriş açıklamaları'],['legal','Ayrı KVKK aydınlatma bölümü'],['dark','Phoenix Ember koyu tema'],['tablet','Ortalanmış tablet görünümü']];
fs.writeFileSync(path.join(work,'title.txt'),'PayRadar 2.1.5 (12) / ANDROID');
fs.writeFileSync(path.join(work,'note.txt'),'Gerçek Android ekranları · Örnek veriler');
fs.writeFileSync(path.join(work,'limit.txt'),'Sürüm adayı · Mağaza yayını doğrulanmadı');
const fontFilter='fontfile=qa/native-video/font.ttf';
const args=['-hide_banner','-loglevel','error','-y','-filter_complex_threads','1'];
for(const [id] of steps)args.push('-loop','1','-t','6','-i','content/media/payradar-native/'+id+'.png');
const filters=steps.map(([id,title],i)=>{
 fs.writeFileSync(path.join(work,'step'+i+'.txt'),(i+1)+' / '+steps.length+' — '+title);
 return '['+i+':v]scale=540:1200:force_original_aspect_ratio=decrease:flags=lanczos,pad=540:1200:(ow-iw)/2:(oh-ih)/2:color=0xFFF8F4,pad=720:1600:90:160:color=0xFFF8F4,setsar=1,fps=24,'+
  'drawtext='+fontFilter+':textfile=qa/native-video/title.txt:fontsize=28:fontcolor=0xA52D3A:x=(w-text_w)/2:y=55,'+
  'drawtext='+fontFilter+':textfile=qa/native-video/step'+i+'.txt:fontsize=24:fontcolor=0x271317:x=(w-text_w)/2:y=1405,'+
  'drawtext='+fontFilter+':textfile=qa/native-video/note.txt:fontsize=23:fontcolor=0x784D55:x=(w-text_w)/2:y=1475,'+
  'drawtext='+fontFilter+':textfile=qa/native-video/limit.txt:fontsize=22:fontcolor=0x784D55:x=(w-text_w)/2:y=1515,'+
  'fade=t=in:st=0:d=0.2,fade=t=out:st=5.8:d=0.2[v'+i+']';
});
filters.push(steps.map((_,i)=>'[v'+i+']').join('')+'concat=n='+steps.length+':v=1:a=0[out]');
const base='payradar-native-v12-20261106';
const output='dist/assets/demos/'+base+'.mp4';
args.push('-filter_complex',filters.join(';'),'-map','[out]','-c:v','libx264','-preset','medium','-crf','22','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',output);
const ffmpeg=process.env.FFMPEG||'ffmpeg';
function run(a){const result=spawnSync(ffmpeg,a,{cwd:root,encoding:'utf8'});if(result.error)throw result.error;if(result.status!==0)throw Error(result.stderr);}
run(args);
run(['-hide_banner','-loglevel','error','-y','-ss','0.5','-i',output,'-frames:v','1','-q:v','3','dist/assets/demos/'+base+'.jpg']);
const tr=steps.map(([,title])=>title+'.');
const en=['Payment overview and separate currencies.','Due dates and updated payment cards.','Payment form and input guidance.','Separate KVKK information notice.','Phoenix Ember dark theme.','Centered tablet layout.'];
for(const [lang,captions] of [['tr',tr],['en',en]]){
 const time=n=>'00:'+String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')+'.000';
 fs.writeFileSync(path.join(root,'dist/assets/demos/'+base+'.'+lang+'.vtt'),'WEBVTT\n\n'+captions.map((text,i)=>time(i*6)+' --> '+time((i+1)*6)+'\n'+text+'\n').join('\n'));
}
console.log('Built 36-second 720×1600 version12 native screenshot tour, aspect-preserving tablet scene, poster and TR/EN captions.');
