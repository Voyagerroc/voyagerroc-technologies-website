(()=>{'use strict';
const search=document.getElementById('portfolio-search'),category=document.getElementById('portfolio-category');if(!search||!category)return;
const cards=[...document.querySelectorAll('.portfolio-entry')],count=document.getElementById('portfolio-count'),en=document.documentElement.lang==='en';
const normalize=value=>value.toLocaleLowerCase(en?'en':'tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
function filter(){const query=normalize(search.value.trim());let visible=0;for(const card of cards){card.hidden=!(category.value==='all'||card.dataset.category===category.value)||!normalize(card.textContent).includes(query);if(!card.hidden)visible++;}count.textContent=visible+' / '+cards.length+' '+(en?'projects':'çalışma');}
search.addEventListener('input',filter);category.addEventListener('change',filter);document.querySelector('.portfolio-tools').hidden=false;filter();
})();
