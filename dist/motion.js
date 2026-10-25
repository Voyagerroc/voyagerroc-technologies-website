(() => {
  'use strict';
  const story=document.querySelector('#product-story');
  const home=document.querySelector('#scene-home');
  const dock=document.querySelector('#story-dock');
  const scene=document.querySelector('#scene-container');
  const toolbar=document.querySelector('.scene-toolbar');
  const steps=[...document.querySelectorAll('.story-step')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=matchMedia('(min-width: 901px)');
  const ids=['eip','payradar','laserdeck','pharos','bungalow'];
  let active=-1,scheduled=false;
  const copy={tr:{kicker:'BİR EKOSİSTEM. BEŞ GERÇEK İHTİYAÇ.',title:'Parçalar farklı.<br><em>Düşünce ortak.</em>',intro:'Kanıttan karara, ödemeden operasyona. Her ürün, kendi ihtiyacının etrafında şekillenir.',scroll:'Kaydır. Sistemleri keşfet.',detail:'Ürünü incele',open:'Ürünü aç ↗',source:'Kaynağı incele ↗',contact:'Ürün hakkında konuşalım ↗',labels:['KANIT','KONTROL','İLETİŞİM','İLİŞKİ','OPERASYON']},en:{kicker:'ONE ECOSYSTEM. FIVE REAL NEEDS.',title:'Different parts.<br><em>A shared mindset.</em>',intro:'From evidence to decisions, payments to operations. Every product takes shape around its own need.',scroll:'Scroll to explore the systems.',detail:'Explore the product',open:'Open product ↗',source:'Explore source ↗',contact:'Talk about this product ↗',labels:['EVIDENCE','CONTROL','COMMUNICATION','CONNECTION','OPERATIONS']}};
  function translate(){
    const lang=document.documentElement.lang==='en'?'en':'tr',c=copy[lang];
    document.querySelector('#story-kicker').textContent=c.kicker;
    document.querySelector('#story-title').innerHTML=c.title;
    document.querySelector('#story-intro').textContent=c.intro;
    document.querySelector('#story-scroll').textContent=c.scroll;
    steps.forEach((step,i)=>{const p=window.PORTFOLIO_PROJECTS.find(p=>p.id===ids[i]);step.querySelector('.story-topic').textContent=c.labels[i];step.querySelector('h3').textContent=p[lang].summary;step.querySelector('.story-description').textContent=p[lang].description;step.querySelector('button').textContent=c.detail+' ↗';let android=step.querySelector('.story-android');if(p.androidTest){if(!android){android=document.createElement('a');android.className='story-android button button-primary';android.target='_blank';android.rel='noopener noreferrer';step.querySelector('.story-actions').append(android);}android.href=p.androidTest;android.textContent=lang==='tr'?'Google Play · Android testi ↗':'Google Play · Android test ↗';}let guide=step.querySelector('.story-guide');if(p.androidGuide){if(!guide){guide=document.createElement('a');guide.className='story-guide';guide.target='_blank';guide.rel='noopener noreferrer';step.querySelector('.story-actions').append(guide);}guide.href=p.androidGuide;guide.textContent=lang==='tr'?'Test kurulum rehberi ↗':'Test installation guide ↗';}const link=step.querySelector('.story-destination');link.href=p.live||p.repo||'mailto:voyagerroc@voyagerroctechnologies.com?subject='+encodeURIComponent(p.name);link.textContent=p.live?c.open:p.repo?c.source:c.contact;link.target=p.live||p.repo?'_blank':'_self';});
  }
  function update(){
    scheduled=false;
    const r=story.getBoundingClientRect();
    const inStory=r.top<innerHeight*.65&&r.bottom>innerHeight*.3;
    const target=desktop.matches&&inStory?dock:home;
    if(scene.parentElement!==target){target.append(scene,toolbar);window.dispatchEvent(new Event('resize'));}
    let best=0,distance=Infinity;
    steps.forEach((step,i)=>{const sr=step.getBoundingClientRect();const d=Math.abs(sr.top+sr.height/2-innerHeight/2);if(d<distance){best=i;distance=d;}});
    if(active!==best){active=best;steps.forEach((s,i)=>s.classList.toggle('is-active',i===best));document.querySelectorAll('.story-index span').forEach((s,i)=>s.classList.toggle('is-active',i===best));document.querySelector('#story-active-name').textContent=steps[best].querySelector('.story-product').textContent;}
    const range=Math.max(1,story.offsetHeight-innerHeight);
    const progress=Math.max(0,Math.min(1,-r.top/range));
    story.style.setProperty('--story-progress',progress);
    window.dispatchEvent(new CustomEvent('portfolio:story',{detail:{active:inStory,index:best,progress,reduced:reduced.matches}}));
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);desktop.addEventListener('change',schedule);reduced.addEventListener('change',schedule);
  window.addEventListener('portfolio:language',()=>{translate();schedule();});
  document.addEventListener('pointermove',e=>{if(reduced.matches||!matchMedia('(hover:hover)').matches)return;const card=e.target.closest('.feature-visual');if(!card)return;const r=card.getBoundingClientRect();card.style.setProperty('--tilt-x',((e.clientY-r.top)/r.height-.5)*-5+'deg');card.style.setProperty('--tilt-y',((e.clientX-r.left)/r.width-.5)*5+'deg');},{passive:true});
  document.addEventListener('pointerout',e=>{const card=e.target.closest('.feature-visual');if(card&&!card.contains(e.relatedTarget)){card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');}});
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');revealObserver.unobserve(e.target);}}),{threshold:.08});
  // Content is visible by default; only off-screen elements get an entrance.
  function reveal(){document.querySelectorAll('.section-heading,.capability-grid article,.feature-card,.company-story,.contact-heading').forEach(el=>{if(el.dataset.revealObserved)return;el.dataset.revealObserved='true';if(!reduced.matches&&el.getBoundingClientRect().top>innerHeight){el.classList.add('will-reveal');revealObserver.observe(el);}});}
  new MutationObserver(reveal).observe(document.querySelector('#featured-projects'),{childList:true});
  reduced.addEventListener('change',()=>{if(reduced.matches)document.querySelectorAll('.will-reveal').forEach(el=>el.classList.add('is-revealed'));});
  translate();reveal();update();
})();
