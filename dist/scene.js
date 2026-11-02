// Progressive enhancement: start 3D aperture motion directly.
const target = document.getElementById('scene-container');
const toggle = document.getElementById('motion-toggle');
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

if (target) {
  document.body.dataset.webgl = 'poster';
  if (reduced.matches || navigator.connection?.saveData) {
    if (toggle) {
      toggle.textContent = document.documentElement.lang === 'en' ? 'Load 3D view' : '3D görünümü yükle';
      toggle.addEventListener('click', load, {once: true});
    }
    target.addEventListener('click', load, {once: true});
    target.addEventListener('touchstart', load, {once: true, passive: true});
  } else {
    // Direct motion: load 3D aperture immediately after initial paint
    if (toggle) {
      toggle.textContent = document.documentElement.lang === 'en' ? 'Pause motion' : 'Hareketi durdur';
    }
    const schedule = 'requestIdleCallback' in window
      ? (cb) => requestIdleCallback(cb, {timeout: 400})
      : (cb) => setTimeout(cb, 50);
    schedule(load);
  }
}
