// Progressive enhancement: high-fidelity static poster first. 3D engine loads on explicit user intent.
const target = document.getElementById('scene-container');
const toggle = document.getElementById('motion-toggle');
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
  if (toggle) {
    toggle.textContent = document.documentElement.lang === 'en' ? 'Load 3D view' : '3D görünümü yükle';
    toggle.addEventListener('click', load, {once: true});
  }
  // Load 3D engine on explicit user gesture on the interactive canvas/container
  target.addEventListener('click', load, {once: true});
  target.addEventListener('touchstart', load, {once: true, passive: true});
}
