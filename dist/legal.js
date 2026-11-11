(() => {
  'use strict';
  const clear=document.querySelector('#clear-language');
  clear?.addEventListener('click',()=>{
    let success=true;
    try{sessionStorage.removeItem('voyagerroc-lang');localStorage.removeItem('voyagerroc-lang');}catch{success=false;}
    document.querySelector('#storage-result').textContent=success?'Bu sekmedeki dil tercihi ve önceki sürümden kalan dil kaydı temizlendi. Diğer site verilerine dokunulmadı.':'Tarayıcı depolamasına erişilemedi. Tercihi tarayıcınızın site verileri ayarından silebilirsiniz.';
  });
})();
