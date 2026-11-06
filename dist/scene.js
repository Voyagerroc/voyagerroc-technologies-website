// Start APERTURE on entry on every viewport; no click or idle timer is required.
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
  load();
}
