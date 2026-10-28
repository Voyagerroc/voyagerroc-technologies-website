(() => {
 'use strict';
 const form=document.getElementById('enquiry-form');
 if(!form)return;
 const en=document.documentElement.lang==='en';
 const result=document.getElementById('brief-result'),preview=document.getElementById('brief-preview'),status=document.getElementById('brief-status');
 const params=new URLSearchParams(location.search),context=Array.from(params.get('product')||params.get('area')||'').slice(0,100).join('').replace(/[\r\n]/g,' ');
 if(context){const note=document.createElement('p');note.textContent=(en?'Enquiry about: ':'Görüşme konusu: ')+context;form.prepend(note);}
 const languageLink=document.querySelector('[data-enquiry-language]');
 if(languageLink&&context){const target=new URL(languageLink.href);target.searchParams.set(params.has('product')?'product':'area',context);languageLink.href=target.href;}
 const type=document.getElementById('brief-type');
 if(params.get('product'))type.selectedIndex=4;
 else if(params.get('area')){const area=params.get('area').toLowerCase();type.selectedIndex=area.includes('saas')?2:area.includes('web')||area.includes('mobil')?1:area.includes('akış')||area.includes('workflow')?3:0;}
 form.addEventListener('submit',event=>{
  event.preventDefault();const goal=document.getElementById('brief-goal');goal.setCustomValidity(goal.value.trim().length<20?(en?'Please describe your need in at least 20 characters.':'İhtiyacınızı en az 20 karakterle anlatın.'):'');if(!form.reportValidity())return;
  const values=new FormData(form),parts=[en?'Voyagerroc Technologies — project enquiry':'Voyagerroc Technologies — proje görüşmesi'];
  if(context)parts.push((en?'Subject: ':'Konu: ')+context);
  for(const [key,label] of [['name',en?'Name / team':'Ad / ekip'],['type',en?'Area':'Çalışma alanı'],['stage',en?'Stage':'Aşama'],['goal',en?'Need and expected outcome':'İhtiyaç ve beklenen sonuç'],['timing',en?'Timing':'Hedef zaman']]){const value=String(values.get(key)||'').trim();if(value)parts.push(label+': '+value);}
  const text=parts.join('\n\n');preview.textContent=text;
  document.getElementById('brief-email').href='mailto:voyagerroc@voyagerroctechnologies.com?subject='+encodeURIComponent(en?'Project enquiry':'Proje görüşmesi')+'&body='+encodeURIComponent(text);
  document.getElementById('brief-whatsapp').href='https://wa.me/905444219322?text='+encodeURIComponent(text);
  status.textContent='';result.hidden=false;result.focus();
 });
 form.addEventListener('input',()=>{document.getElementById('brief-goal').setCustomValidity('');result.hidden=true;status.textContent='';});
 document.getElementById('brief-copy').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(preview.textContent);status.textContent=en?'Brief copied.':'Özet kopyalandı.';}
  catch{const selection=window.getSelection(),range=document.createRange();range.selectNodeContents(preview);selection.removeAllRanges();selection.addRange(range);status.textContent=en?'Select and copy the brief above.':'Yukarıdaki özeti seçip kopyalayabilirsiniz.';}
 });
 form.hidden=false;
})();
