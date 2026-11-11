// Keep the poster until page load and an idle slot; no user interaction is required.
const target = document.getElementById('scene-container');
const toggle = document.getElementById('motion-toggle');
let started = false;
let scheduled = false;

const load = () => {
  if (started || !target) return;
  started = true;
  document.body.dataset.webgl = 'loading';
  import('./scene-3d.min.js').catch(() => {
    document.body.dataset.webgl = 'fallback';
    if (toggle) toggle.hidden = true;
  });
};

const scheduleLoad = () => {
  if (scheduled || started || !target) return;
  scheduled = true;
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(load, { timeout: 2500 });
  } else {
    setTimeout(load, 400);
  }
};

if (target) {
  document.body.dataset.webgl = 'poster';
  if (document.readyState === 'complete') {
    scheduleLoad();
  } else {
    window.addEventListener('load', scheduleLoad, { once: true });
  }
}
