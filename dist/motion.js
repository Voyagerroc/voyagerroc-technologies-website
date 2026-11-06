(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');observer.unobserve(e.target);}}),{threshold:.08});
function reveal(){document.querySelectorAll('.section-heading,.capability-grid article,.feature-card,.company-story,.contact-heading').forEach(el=>{if(el.dataset.revealObserved)return;el.dataset.revealObserved='true';if(!reduced.matches&&el.getBoundingClientRect().top>innerHeight){el.classList.add('will-reveal');observer.observe(el);}});}
const featured=document.querySelector('#featured-projects');if(featured)new MutationObserver(reveal).observe(featured,{childList:true});
reduced.addEventListener('change',()=>{if(reduced.matches)document.querySelectorAll('.will-reveal').forEach(el=>el.classList.add('is-revealed'));});reveal();
})();
