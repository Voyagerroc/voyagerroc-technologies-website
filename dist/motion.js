(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(max-width: 760px)');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');observer.unobserve(e.target);}}),{threshold:.08});

function initCardTilt(){
  if(reduced.matches||mobile.matches)return;
  document.querySelectorAll('.feature-card,.capability-grid article').forEach(card=>{
    if(card.dataset.tiltBound)return;
    card.dataset.tiltBound='true';
    let ticking=false;
    card.addEventListener('pointermove',e=>{
      if(reduced.matches||mobile.matches||e.pointerType==='touch')return;
      if(!ticking){
        requestAnimationFrame(()=>{
          const r=card.getBoundingClientRect();
          const x=(e.clientX-r.left)/r.width-0.5;
          const y=(e.clientY-r.top)/r.height-0.5;
          const px=((e.clientX-r.left)/r.width)*100;
          const py=((e.clientY-r.top)/r.height)*100;
          card.style.setProperty('--tilt-x',(-y*7.5).toFixed(2)+'deg');
          card.style.setProperty('--tilt-y',(x*9.5).toFixed(2)+'deg');
          card.style.setProperty('--mouse-x',px.toFixed(1)+'%');
          card.style.setProperty('--mouse-y',py.toFixed(1)+'%');
          ticking=false;
        });
        ticking=true;
      }
    },{passive:true});
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--tilt-x','0deg');
      card.style.setProperty('--tilt-y','0deg');
    });
  });
}

function reveal(){
  let cardIdx=0;
  document.querySelectorAll('.section-heading,.capability-grid article,.feature-card,.company-story,.contact-heading').forEach(el=>{
    if(el.dataset.revealObserved)return;
    el.dataset.revealObserved='true';
    if(el.classList.contains('feature-card')||el.closest('.capability-grid')){
      el.style.setProperty('--stagger',String(cardIdx++%3));
    }
    if(!reduced.matches&&el.getBoundingClientRect().top>innerHeight){
      el.classList.add('will-reveal');
      observer.observe(el);
    }
  });
  initCardTilt();
}

const featured=document.querySelector('#featured-projects');
if(featured)new MutationObserver(reveal).observe(featured,{childList:true});
reduced.addEventListener('change',()=>{
  if(reduced.matches){
    document.querySelectorAll('.will-reveal').forEach(el=>el.classList.add('is-revealed'));
    document.querySelectorAll('.feature-card,.capability-grid article').forEach(el=>{
      el.style.setProperty('--tilt-x','0deg');
      el.style.setProperty('--tilt-y','0deg');
    });
  }
});
reveal();
})();
