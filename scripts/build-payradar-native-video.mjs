// A labelled tour of authentic Android screenshots, never a simulated live flow.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const work=path.join(root,'qa/native-video');fs.mkdirSync(work,{recursive:true});
const font=process.env.VIDEO_FONT||(process.platform==='win32'?path.join(process.env.WINDIR||'C:/Windows','Fonts/arial.ttf'):'/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf');
fs.copyFileSync(font,path.join(work,'font.ttf'));
const steps=[['home','Ana ekran ve cihazdaki kayıtlar'],['editor','Yeni ödeme ekleme ekranı'],['calendar','Material 3 tarih seçici'],['settings','Hesap ve yerel hatırlatma ayarları']];
fs.writeFileSync(path.join(work,'title.txt'),'PayRadar / ANDROID NATIVE');
fs.writeFileSync(path.join(work,'note.txt'),'Gerçek Android ekranlarından hazırlanmış tur.');
fs.writeFileSync(path.join(work,'limit.txt'),'Canlı işlem kaydı değildir.');
const fontFilter='fontfile=qa/native-video/font.ttf';
const args=['-hide_banner','-loglevel','error','-y','-filter_complex_threads','1'];
for(const [id] of steps)args.push('-loop','1','-t','6','-i','content/media/payradar-native/'+id+'.png');
const filters=steps.map(([id,title],i)=>{
 fs.writeFileSync(path.join(work,'step'+i+'.txt'),(i+1)+' / 4 — '+title);
 return '['+i+':v]scale=540:1200:flags=lanczos,pad=720:1600:90:160:color=0xFFF8F4,setsar=1,fps=24,'+
  'drawtext='+fontFilter+':textfile=qa/native-video/title.txt:fontsize=28:fontcolor=0xA52D3A:x=(w-text_w)/2:y=55,'+
  'drawtext='+fontFilter+':textfile=qa/native-video/step'+i+'.txt:fontsize=25:fontcolor=0x271317:x=(w-text_w)/2:y=1405,'+
  'drawtext='+fontFilter+':textfile=qa/native-video/note.txt:fontsize=23:fontcolor=0x784D55:x=(w-text_w)/2:y=1475,'+
  'drawtext='+fontFilter+':textfile=qa/native-video/limit.txt:fontsize=22:fontcolor=0x784D55:x=(w-text_w)/2:y=1515,'+
  'fade=t=in:st=0:d=0.2,fade=t=out:st=5.8:d=0.2[v'+i+']';
});
filters.push(steps.map((_,i)=>'[v'+i+']').join('')+'concat=n=4:v=1:a=0[out]');
const output='dist/assets/demos/payradar-native-tour-20261106.mp4';
args.push('-filter_complex',filters.join(';'),'-map','[out]','-c:v','libx264','-preset','medium','-crf','22','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',output);
const ffmpeg=process.env.FFMPEG||'ffmpeg';
function run(a){const result=spawnSync(ffmpeg,a,{cwd:root,encoding:'utf8'});if(result.error)throw result.error;if(result.status!==0)throw Error(result.stderr);}
run(args);
run(['-hide_banner','-loglevel','error','-y','-ss','0.5','-i',output,'-frames:v','1','-q:v','3','dist/assets/demos/payradar-native-tour-20261106.jpg']);
const tr=['Ana ekran: cihazdaki kayıtlar, arama ve kategoriler.','Yeni ödeme ekranı: ad, tutar, para birimi ve tekrar bilgileri.','Android Material 3 takviminden vade tarihi seçimi.','Ayarlar: isteğe bağlı hesap eşitlemesi ve yerel hatırlatmalar.'];
const en=['Home: on-device records, search and categories.','New payment screen: name, amount, currency and recurrence.','Android Material 3 calendar for selecting a due date.','Settings: optional account sync and local reminders.'];
for(const [lang,captions] of [['tr',tr],['en',en]]){
 const time=n=>'00:'+String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')+'.000';
 fs.writeFileSync(path.join(root,'dist/assets/demos/payradar-native-tour-20261106.'+lang+'.vtt'),'WEBVTT\n\n'+captions.map((text,i)=>time(i*6)+' --> '+time((i+1)*6)+'\n'+text+'\n').join('\n'));
}
console.log('Built 24-second 720×1600 native screenshot tour, poster and TR/EN captions. No live interaction claim.');
