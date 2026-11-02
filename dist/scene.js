// Progressive enhancement: paint the local poster before loading the 3D engine.
const target = document.getElementById('scene-container');
const toggle = document.getElementById('motion-toggle');
const poster = target?.querySelector('.scene-fallback');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let started = false;

const load = () => {
  if (started || !target) return;
  started = true;
  document.body.dataset.webgl = 'loading';
  cleanup();
  import('./scene-3d.min.js').catch(() => {
    document.body.dataset.webgl = 'fallback';
    if (toggle) toggle.hidden = true;
  });
};

const triggers = ['pointerdown', 'touchstart', 'scroll'];
const onTrigger = () => load();
const cleanup = () => {
  triggers.forEach(t => window.removeEventListener(t, onTrigger, {passive: true}));
  target?.removeEventListener('pointerenter', onTrigger);
};

if (target) {
  document.body.dataset.webgl = 'poster';
  if (toggle) {
    toggle.textContent = document.documentElement.lang === 'en' ? 'Load 3D view' : '3D görünümü yükle';
    toggle.addEventListener('click', load, {once: true});
  }
  // Save-data and reduced-motion visitors keep the light poster unless they opt in.
  if (!reduced.matches && !navigator.connection?.saveData) {
    triggers.forEach(t => window.addEventListener(t, onTrigger, {once: true, passive: true}));
    target.addEventListener('pointerenter', onTrigger, {once: true, passive: true});
    // Idle fallback: only load after page load + 3.5s idle window to keep initial TBT at 0ms
    window.addEventListener('load', () => {
      const schedule = 'requestIdleCallback' in window 
        ? (cb) => requestIdleCallback(cb, {timeout: 4000}) 
        : (cb) => setTimeout(cb, 3500);
      schedule(load);
    }, {once: true});
  }
}
