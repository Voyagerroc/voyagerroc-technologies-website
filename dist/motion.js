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

/* Linear engine motion: product window settle and pointer light.
   Gate follows ECC motion-foundations: reduced motion wins, then low-end devices. */
(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const lowEnd=typeof navigator!=='undefined'&&navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=4;
const root=document.documentElement;
const board=document.querySelector('.hero-board');
if(!board)return;
if(reduced.matches||lowEnd){root.classList.add('le-calm');return;}
root.classList.add('le-live');
let queued=false;
function settle(){
  queued=false;
  const r=board.getBoundingClientRect();
  const start=innerHeight*0.98,end=innerHeight*0.42;
  const p=Math.min(1,Math.max(0,(start-r.top)/(start-end)));
  board.style.setProperty('--le-p',p.toFixed(3));
}
function request(){if(!queued){queued=true;requestAnimationFrame(settle);}}
addEventListener('scroll',request,{passive:true});
addEventListener('resize',request,{passive:true});
settle();
if(matchMedia('(hover: hover) and (pointer: fine)').matches){
  let lit=false;
  board.addEventListener('pointermove',e=>{
    if(lit)return;lit=true;
    requestAnimationFrame(()=>{
      const r=board.getBoundingClientRect();
      board.style.setProperty('--le-x',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
      board.style.setProperty('--le-y',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
      board.style.setProperty('--le-glow','1');
      lit=false;
    });
  },{passive:true});
  board.addEventListener('pointerleave',()=>board.style.setProperty('--le-glow','0'));
}
reduced.addEventListener('change',()=>{if(reduced.matches){root.classList.remove('le-live');root.classList.add('le-calm');}});
})();
