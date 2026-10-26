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
  import('./scene-3d.min.js').catch(() => {
    document.body.dataset.webgl = 'fallback';
    if (toggle) toggle.hidden = true;
  });
};
const idle = () => {
  if ('requestIdleCallback' in window) requestIdleCallback(load, {timeout: 1200});
  else setTimeout(load, 0);
};
const afterPaint = () => requestAnimationFrame(() => requestAnimationFrame(idle));
const visible = () => {
  if (poster && !poster.complete) { poster.addEventListener('load', afterPaint, {once: true}); poster.addEventListener('error', afterPaint, {once: true}); }
  else afterPaint();
};
if (target) {
  document.body.dataset.webgl = 'poster';
  if (toggle) {
    toggle.textContent = document.documentElement.lang === 'en' ? 'Load 3D view' : '3D görünümü yükle';
    toggle.addEventListener('click', load, {once: true});
  }
  // Save-data and reduced-motion visitors keep the light poster unless they opt in.
  if (!reduced.matches && !navigator.connection?.saveData) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); visible(); }
      }, {rootMargin: '100px'});
      observer.observe(target);
    } else visible();
  }
}
