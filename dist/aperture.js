import * as THREE from './vendor/three.module.js';

// APERTURE: Voyagerroc Phoenix 3D Motion — Authentic Brand Logo in 3D
const container = document.getElementById('scene-container');
const canvas = document.getElementById('nexus-canvas');
const toggle = document.getElementById('motion-toggle');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 760px)');

const ids = ['eip', 'payradar', 'laserdeck', 'pharos', 'bungalow'];
const names = ['Evidence Intelligence', 'PayRadar', 'LaserDeck PTT', 'Pharos', 'Bungalow OS'];
const colors = [0x5073a8, 0xc82a3a, 0x3d8b7a, 0x8e527a, 0xb07d42];

function fallback() {
  document.body.dataset.webgl = 'fallback';
  if (toggle) toggle.hidden = true;
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power'
  });
} catch {
  fallback();
}

if (renderer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 40);
  camera.position.set(0, 0.1, 8.8);

  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile.matches ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.setClearColor(0, 0);

  // Clean, high-key studio lighting for white background
  const ambient = new THREE.HemisphereLight(0xffffff, 0xfce8eb, 2.0);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfff5f6, 4.5);
  keyLight.position.set(-3.5, 4.5, 5.0);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffd8dc, 2.2);
  fillLight.position.set(4.0, -1.0, 3.0);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 25, 12);
  rimLight.position.set(-2.0, 2.5, -3.0);
  scene.add(rimLight);

  const rubyGlow = new THREE.PointLight(0xc82a3a, 24, 10);
  rubyGlow.position.set(0, 0.3, 2.4);
  scene.add(rubyGlow);

  const sculpture = new THREE.Group();
  sculpture.rotation.set(0.14, -0.2, 0);
  scene.add(sculpture);

  const Surface = mobile.matches ? THREE.MeshStandardMaterial : THREE.MeshPhysicalMaterial;

  const rubyWingMat = new Surface({
    color: 0xc82a3a,
    metalness: mobile.matches ? 0.65 : 0.82,
    roughness: 0.18,
    ...(!mobile.matches ? { clearcoat: 0.95, clearcoatRoughness: 0.1 } : {}),
    envMapIntensity: 1.8
  });

  const roseWingMat = new Surface({
    color: 0xdf384b,
    metalness: mobile.matches ? 0.65 : 0.82,
    roughness: 0.18,
    ...(!mobile.matches ? { clearcoat: 0.95, clearcoatRoughness: 0.1 } : {}),
    envMapIntensity: 1.8
  });

  const bodyMat = new Surface({
    color: 0x881422,
    metalness: mobile.matches ? 0.7 : 0.88,
    roughness: 0.22,
    ...(!mobile.matches ? { clearcoat: 0.9 } : {}),
    envMapIntensity: 1.5
  });

  const lineMat = new THREE.LineBasicMaterial({
    color: 0xe89ca6,
    transparent: true,
    opacity: 0.38
  });

  // Helper to parse official SVG path into THREE.Shape
  function parseSvgPath(d, scale = 0.021, ox = -128, oy = -135) {
    const shape = new THREE.Shape();
    const tokens = d.match(/([A-Z])|([-+]?[0-9]*\.?[0-9]+)/gi);
    let i = 0;
    let cmd = '';
    while (i < tokens.length) {
      if (/^[A-Z]$/i.test(tokens[i])) {
        cmd = tokens[i++];
      }
      if (cmd === 'M') {
        const x = (parseFloat(tokens[i++]) + ox) * scale;
        const y = -(parseFloat(tokens[i++]) + oy) * scale;
        shape.moveTo(x, y);
      } else if (cmd === 'L') {
        const x = (parseFloat(tokens[i++]) + ox) * scale;
        const y = -(parseFloat(tokens[i++]) + oy) * scale;
        shape.lineTo(x, y);
      } else if (cmd === 'C') {
        const cp1x = (parseFloat(tokens[i++]) + ox) * scale;
        const cp1y = -(parseFloat(tokens[i++]) + oy) * scale;
        const cp2x = (parseFloat(tokens[i++]) + ox) * scale;
        const cp2y = -(parseFloat(tokens[i++]) + oy) * scale;
        const x = (parseFloat(tokens[i++]) + ox) * scale;
        const y = -(parseFloat(tokens[i++]) + oy) * scale;
        shape.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      } else if (cmd === 'Z') {
        shape.closePath();
      }
    }
    return shape;
  }

  // Exact Official Phoenix 04 Plume Brand Vector Paths
  const pLeft = 'M124 162C79 148 45 116 26 73C19 56 14 39 13 23C37 57 63 82 93 100C72 72 59 47 55 23C93 54 118 89 131 126L124 162Z';
  const pRight = 'M135 153C171 145 203 121 222 89C235 68 241 47 243 25C220 53 194 80 165 100C185 74 196 52 201 29C170 53 148 82 134 114L135 153Z';
  const pCenter = 'M136 32L146 40C151 39 155 41 159 44L169 48L155 54C148 55 144 64 142 77C138 101 139 126 147 145C159 172 150 199 130 219C119 230 106 238 91 242C108 228 119 212 124 197C130 180 127 164 118 150C108 134 112 117 120 101C129 83 140 60 136 32Z';

  const shapeLeft = parseSvgPath(pLeft);
  const shapeRight = parseSvgPath(pRight);
  const shapeCenter = parseSvgPath(pCenter);

  const extrudeOpts = {
    depth: 0.16,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035
  };

  const phoenix = new THREE.Group();
  sculpture.add(phoenix);

  // 1. Central Spine, Head and Crest
  const centerMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shapeCenter, extrudeOpts), bodyMat);
  phoenix.add(centerMesh);

  // Luminous Ember Heart in Center
  const heart = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.19),
    new THREE.MeshStandardMaterial({
      color: 0xff3b56,
      emissive: 0xc82a3a,
      emissiveIntensity: 0.85,
      roughness: 0.1
    })
  );
  heart.position.set(0.08, 0.25, 0.24);
  phoenix.add(heart);

  // 2. Left Wing Pivot Group
  const leftWingPivot = new THREE.Group();
  leftWingPivot.position.set(-0.08, -0.58, 0.02);
  phoenix.add(leftWingPivot);

  const leftMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shapeLeft, extrudeOpts), rubyWingMat);
  leftMesh.position.set(0.08, 0.58, -0.02);
  leftWingPivot.add(leftMesh);

  // 3. Right Wing Pivot Group
  const rightWingPivot = new THREE.Group();
  rightWingPivot.position.set(0.12, -0.4, 0.02);
  phoenix.add(rightWingPivot);

  const rightMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shapeRight, extrudeOpts), roseWingMat);
  rightMesh.position.set(-0.12, 0.4, -0.02);
  rightWingPivot.add(rightMesh);

  // 4. Orbital Domain Nodes (Five Product Domains)
  const outer = new THREE.Group();
  sculpture.add(outer);

  // Subtle orbital halo rings
  [2.35, 2.65].forEach((r, i) => {
    const ringGeo = new THREE.TorusGeometry(r, i === 0 ? 0.008 : 0.004, 6, 80);
    const ring = new THREE.Mesh(ringGeo, lineMat);
    ring.rotation.x = Math.PI / 2.3;
    ring.position.y = -0.15;
    outer.add(ring);
  });

  const nodes = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
    const radius = 2.65;
    const np = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * 0.7 - 0.2, Math.sin(angle) * radius * 0.55);
    const nMat = new THREE.MeshStandardMaterial({
      color: colors[i],
      emissive: colors[i],
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const nMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.085), nMat);
    nMesh.position.copy(np);
    outer.add(nMesh);

    // Energy track from node towards Phoenix heart
    const curve = new THREE.CubicBezierCurve3(
      np,
      new THREE.Vector3(np.x * 0.6, np.y * 0.6 + 0.3, np.z * 0.6),
      new THREE.Vector3(np.x * 0.25, np.y * 0.3 + 0.4, np.z * 0.3),
      new THREE.Vector3(0.08, 0.25, 0.24)
    );
    const track = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)),
      new THREE.LineBasicMaterial({ color: colors[i], transparent: true, opacity: 0.25 })
    );
    outer.add(track);

    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 6), nMat);
    outer.add(pulse);
    nodes.push({ node: nMesh, pulse, curve, track, color: colors[i] });
  }

  // Sparkling Ember Points
  let seed = 971;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const sparkPts = [];
  for (let i = 0; i < 220; i++) {
    sparkPts.push(
      (random() - 0.5) * 8.5,
      (random() - 0.5) * 5.5,
      (random() - 0.5) * 4.0 - 0.5
    );
  }
  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute('position', new THREE.Float32BufferAttribute(sparkPts, 3));
  const sparkMat = new THREE.PointsMaterial({
    color: 0xc82a3a,
    size: 0.018,
    transparent: true,
    opacity: 0.4,
    depthWrite: false
  });
  scene.add(new THREE.Points(sparkGeo, sparkMat));

  let paused = reduced.matches;
  let visible = true;
  let raf = 0;
  let last = 0;
  let time = 0;
  let frame = 0;
  let focus = -1;
  let progress = 0;
  let selected = -2;
  let story = { active: false, index: 0, progress: 0 };
  const pointer = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  const stateLabel = document.getElementById('scene-state');

  function updateState() {
    const en = document.documentElement.lang === 'en';
    const n = story.active ? story.index : focus;
    if (stateLabel) {
      stateLabel.textContent =
        n < 0
          ? en
            ? '05 DOMAINS / PHOENIX STUDY'
            : '05 ALAN / ANKA SİSTEMİ'
          : String(n + 1).padStart(2, '0') + ' / ' + names[n];
    }
    canvas.dataset.focus = String(n);
  }

  function label() {
    const en = document.documentElement.lang === 'en';
    if (toggle) {
      toggle.textContent = paused
        ? en
          ? 'Resume motion'
          : 'Hareketi başlat'
        : en
        ? 'Pause motion'
        : 'Hareketi durdur';
      toggle.setAttribute('aria-pressed', String(paused));
    }
    document.body.dataset.motion = paused ? 'paused' : 'running';
    updateState();
  }

  function draw() {
    renderer.render(scene, camera);
    canvas.dataset.frames = String(++frame);
  }

  function pose(instant = false) {
    const l = instant ? 1 : 0.055;
    const n = story.active ? story.index : focus;
    progress = THREE.MathUtils.lerp(progress, story.progress, l);
    smooth.x = THREE.MathUtils.lerp(smooth.x, pointer.x, l);
    smooth.y = THREE.MathUtils.lerp(smooth.y, pointer.y, l);

    // Dynamic Phoenix Wingspan & Elevation on Scroll
    // When user scrolls down: Wings spread wide, lift, and become distinctly prominent!
    const scrollLift = story.active ? 0.32 + progress * 0.48 : 0;
    const wingSpan = story.active ? 1.08 + progress * 0.45 : 1.0;
    const wingFlap = Math.sin(time * 1.8) * 0.05;

    leftWingPivot.scale.set(wingSpan, wingSpan, wingSpan);
    rightWingPivot.scale.set(wingSpan, wingSpan, wingSpan);

    leftWingPivot.rotation.z = -wingFlap + scrollLift;
    leftWingPivot.rotation.y = -0.12 - (story.active ? progress * 0.35 : 0);

    rightWingPivot.rotation.z = wingFlap - scrollLift;
    rightWingPivot.rotation.y = 0.12 + (story.active ? progress * 0.35 : 0);

    // Heart pulsation
    heart.scale.setScalar(1.0 + Math.sin(time * 3.2) * 0.14 + (story.active ? 0.25 : 0));
    heart.rotation.y = time * 0.7;

    // Banking & interactive pointer tilt
    sculpture.rotation.y = -0.18 + smooth.x * 0.22 + Math.sin(time * 0.14) * 0.08;
    sculpture.rotation.x = 0.14 + smooth.y * 0.14 + (story.active ? -0.1 + progress * 0.18 : 0);
    sculpture.rotation.z = Math.sin(time * 0.1) * 0.03;

    // Orbital nodes animation & project focus
    nodes.forEach((node, i) => {
      const active = n < 0 || i === n;
      node.node.scale.setScalar(i === n ? 1.7 : active ? 1.1 : 0.75);
      node.track.material.opacity = active ? (i === n ? 0.65 : 0.28) : 0.06;
      node.pulse.visible = active;
      const pulseT = (time * 0.12 + i * 0.2) % 1;
      node.pulse.position.copy(node.curve.getPoint(pulseT));
    });

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, story.active ? 8.2 : 8.8, l);
    camera.lookAt(0, 0, 0);

    if (selected !== n) {
      selected = n;
      updateState();
    }
    canvas.dataset.storyStep = String(story.index);
    canvas.dataset.scrollProgress = progress.toFixed(3);
  }

  function tick(now) {
    raf = 0;
    if (paused || !visible || document.hidden) return;
    const elapsed = now - last;
    if (elapsed < 1000 / (mobile.matches ? 24 : 30)) {
      raf = requestAnimationFrame(tick);
      return;
    }
    time += Math.min(elapsed / 1000, 0.08);
    last = now;
    pose();
    draw();
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (!raf && !paused && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function resize() {
    const r = container.getBoundingClientRect();
    if (!r.width || !r.height) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    pose(true);
    draw();
  }

  await renderer.compileAsync(scene, camera);
  new ResizeObserver(resize).observe(container);
  new IntersectionObserver(
    es => {
      visible = es[0].isIntersecting;
      if (visible) start();
      else stop();
    },
    { threshold: 0.03 }
  ).observe(container);

  container.addEventListener(
    'pointermove',
    e => {
      if (paused || e.pointerType === 'touch') return;
      const r = container.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    },
    { passive: true }
  );

  container.addEventListener('pointerleave', () => {
    pointer.x = 0;
    pointer.y = 0;
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      paused = !paused;
      label();
      if (paused) stop();
      else start();
    });
  }

  reduced.addEventListener('change', () => {
    paused = reduced.matches;
    label();
    if (paused) {
      stop();
      pose(true);
      draw();
    } else start();
  });

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  window.addEventListener('portfolio:language', label);
  window.addEventListener('portfolio:story', e => {
    story = e.detail;
    if (paused) {
      pose(true);
      draw();
    }
    updateState();
  });
  window.addEventListener('portfolio:product-focus', e => {
    focus = ids.indexOf(e.detail);
    updateState();
    if (paused) {
      pose(true);
      draw();
    }
  });

  canvas.addEventListener('webglcontextlost', e => {
    e.preventDefault();
    stop();
    fallback();
  });

  document.body.dataset.webgl = 'ready';
  label();
  resize();
  start();
}
