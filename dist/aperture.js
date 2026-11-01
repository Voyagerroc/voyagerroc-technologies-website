import * as THREE from './vendor/three.module.js';

// APERTURE: Voyagerroc Phoenix 3D Motion Sculpture
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
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(0, 0.2, 9.4);

  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile.matches ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.setClearColor(0, 0);

  // High-key clean studio lighting tuned for pure white / crimson theme
  const ambient = new THREE.HemisphereLight(0xfff6f7, 0xfce8eb, 1.8);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfff0f2, 4.2);
  keyLight.position.set(-3.5, 4.5, 5.0);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffd8dc, 2.4);
  fillLight.position.set(4.0, -1.0, 3.0);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 28, 14);
  rimLight.position.set(-2.0, 3.0, -3.0);
  scene.add(rimLight);

  const rubyGlow = new THREE.PointLight(0xc82a3a, 22, 10);
  rubyGlow.position.set(0, 0.5, 2.2);
  scene.add(rubyGlow);

  const sculpture = new THREE.Group();
  sculpture.rotation.set(0.18, -0.22, 0);
  scene.add(sculpture);

  const Surface = mobile.matches ? THREE.MeshStandardMaterial : THREE.MeshPhysicalMaterial;

  const rubyMat = new Surface({
    color: 0xc82a3a,
    metalness: mobile.matches ? 0.6 : 0.85,
    roughness: 0.18,
    ...(!mobile.matches ? { clearcoat: 0.95, clearcoatRoughness: 0.12 } : {}),
    envMapIntensity: 1.6
  });

  const deepBurgundyMat = new Surface({
    color: 0x80101d,
    metalness: mobile.matches ? 0.7 : 0.9,
    roughness: 0.22,
    ...(!mobile.matches ? { clearcoat: 0.85 } : {})
  });

  const roseGoldMat = new Surface({
    color: 0xe84a5f,
    metalness: 0.8,
    roughness: 0.15,
    ...(!mobile.matches ? { clearcoat: 0.9 } : {})
  });

  const lineMat = new THREE.LineBasicMaterial({
    color: 0xe89ca6,
    transparent: true,
    opacity: 0.35
  });

  // Phoenix Root Group
  const phoenix = new THREE.Group();
  sculpture.add(phoenix);

  // 1. Central Body & Spine
  const bodyCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -1.5, -0.35),
    new THREE.Vector3(0, -0.4, 0.2),
    new THREE.Vector3(0, 0.75, 0.32),
    new THREE.Vector3(0, 1.45, 0.08)
  );
  const bodyMesh = new THREE.Mesh(
    new THREE.TubeGeometry(bodyCurve, 32, 0.17, 12, false),
    deepBurgundyMat
  );
  phoenix.add(bodyMesh);

  // 2. Head & Beak & Crown Crest
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.5, 0.1);
  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 16), deepBurgundyMat);
  headMesh.scale.set(0.85, 1.15, 1.05);
  headGroup.add(headMesh);

  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(0.08, 0.35, 12),
    rubyMat
  );
  beak.rotation.x = Math.PI / 2 + 0.25;
  beak.position.set(0, -0.04, 0.26);
  headGroup.add(beak);

  // Crown Plumes
  const crestPlumes = [];
  [-0.07, 0, 0.07].forEach((ox, idx) => {
    const cCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(ox, 0.1, 0.05),
      new THREE.Vector3(ox * 1.4, 0.42, -0.18),
      new THREE.Vector3(ox * 2.2, 0.72 + idx * 0.1, -0.42 - idx * 0.08),
      new THREE.Vector3(ox * 1.8, 0.98 + idx * 0.12, -0.68)
    );
    const cMesh = new THREE.Mesh(
      new THREE.TubeGeometry(cCurve, 18, 0.032 - idx * 0.005, 8, false),
      idx === 1 ? roseGoldMat : rubyMat
    );
    headGroup.add(cMesh);
    crestPlumes.push(cMesh);
  });
  phoenix.add(headGroup);

  // Luminous Phoenix Heart Jewel
  const heart = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.18),
    new THREE.MeshStandardMaterial({
      color: 0xff3b56,
      emissive: 0xc82a3a,
      emissiveIntensity: 0.75,
      roughness: 0.1
    })
  );
  heart.position.set(0, 0.32, 0.26);
  phoenix.add(heart);

  // 3. Dual Soaring Wings (Left & Right)
  const leftWingGroup = new THREE.Group();
  const rightWingGroup = new THREE.Group();
  leftWingGroup.position.set(-0.2, 0.45, 0.05);
  rightWingGroup.position.set(0.2, 0.45, 0.05);
  phoenix.add(leftWingGroup);
  phoenix.add(rightWingGroup);

  const featherCount = 5;
  const leftFeathers = [];
  const rightFeathers = [];

  for (let i = 0; i < featherCount; i++) {
    const t = i / (featherCount - 1);
    const spanX = 1.1 + t * 1.85;
    const liftY = 0.95 - t * 0.65;
    const sweepZ = -0.25 + t * 0.35;

    // Left feather curve
    const lCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -i * 0.08, 0),
      new THREE.Vector3(-spanX * 0.42, liftY * 0.85 + 0.3, sweepZ * 0.5),
      new THREE.Vector3(-spanX * 0.82, liftY * 1.12 + 0.35, sweepZ * 0.8),
      new THREE.Vector3(-spanX * 1.25, liftY * 0.85 - i * 0.12, sweepZ)
    );

    // Right feather curve
    const rCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -i * 0.08, 0),
      new THREE.Vector3(spanX * 0.42, liftY * 0.85 + 0.3, sweepZ * 0.5),
      new THREE.Vector3(spanX * 0.82, liftY * 1.12 + 0.35, sweepZ * 0.8),
      new THREE.Vector3(spanX * 1.25, liftY * 0.85 - i * 0.12, sweepZ)
    );

    const rad = 0.072 - i * 0.009;
    const fMat = i % 2 === 0 ? rubyMat : roseGoldMat;

    const lMesh = new THREE.Mesh(new THREE.TubeGeometry(lCurve, 24, rad, 8, false), fMat);
    const rMesh = new THREE.Mesh(new THREE.TubeGeometry(rCurve, 24, rad, 8, false), fMat);

    leftWingGroup.add(lMesh);
    rightWingGroup.add(rMesh);

    leftFeathers.push({ mesh: lMesh, index: i });
    rightFeathers.push({ mesh: rMesh, index: i });
  }

  // 4. Flowing Tail Plumes
  const tailGroup = new THREE.Group();
  tailGroup.position.set(0, -1.5, -0.3);
  phoenix.add(tailGroup);
  const tailPlumes = [];
  [-0.18, 0, 0.18].forEach((tx, idx) => {
    const tCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(tx * 0.4, 0, 0),
      new THREE.Vector3(tx * 1.1, -0.7, -0.25),
      new THREE.Vector3(tx * 1.5, -1.45, -0.55),
      new THREE.Vector3(tx * 0.7, -2.25 - idx * 0.25, -0.85)
    );
    const tMesh = new THREE.Mesh(
      new THREE.TubeGeometry(tCurve, 20, 0.042 - idx * 0.007, 8, false),
      idx === 1 ? rubyMat : deepBurgundyMat
    );
    tailGroup.add(tMesh);
    tailPlumes.push(tMesh);
  });

  // 5. Orbital Product Nodes (Five domains connecting to Phoenix)
  const outer = new THREE.Group();
  sculpture.add(outer);

  // Subtle orbital halo rings
  [2.15, 2.35].forEach((r, i) => {
    const ringGeo = new THREE.TorusGeometry(r, i === 0 ? 0.008 : 0.004, 6, 80);
    const ring = new THREE.Mesh(ringGeo, lineMat);
    ring.rotation.x = Math.PI / 2.3;
    ring.position.y = -0.15;
    outer.add(ring);
  });

  const nodes = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
    const radius = 2.45;
    const np = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * 0.7 - 0.2, Math.sin(angle) * radius * 0.55);
    const nMat = new THREE.MeshStandardMaterial({
      color: colors[i],
      emissive: colors[i],
      emissiveIntensity: 0.55,
      roughness: 0.2
    });
    const nMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.08), nMat);
    nMesh.position.copy(np);
    outer.add(nMesh);

    // Energy track from node towards Phoenix heart
    const curve = new THREE.CubicBezierCurve3(
      np,
      new THREE.Vector3(np.x * 0.6, np.y * 0.6 + 0.3, np.z * 0.6),
      new THREE.Vector3(np.x * 0.25, np.y * 0.3 + 0.4, np.z * 0.3),
      new THREE.Vector3(0, 0.32, 0.26)
    );
    const track = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)),
      new THREE.LineBasicMaterial({ color: colors[i], transparent: true, opacity: 0.22 })
    );
    outer.add(track);

    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 6), nMat);
    outer.add(pulse);
    nodes.push({ node: nMesh, pulse, curve, track, color: colors[i] });
  }

  // Sparkling Ember Points (Rose and Gold sparks floating around the Phoenix)
  let seed = 971;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const sparkPts = [];
  for (let i = 0; i < 240; i++) {
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
    opacity: 0.45,
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
    // Below scroll in story: Wings become PROMINENT, spreading wide and soaring!
    const scrollLift = story.active ? 0.28 + progress * 0.42 : 0;
    const wingSpan = story.active ? 1.05 + progress * 0.55 : 0.95;
    const wingFlap = Math.sin(time * 1.8) * 0.07;

    leftWingGroup.scale.set(wingSpan, wingSpan, wingSpan);
    rightWingGroup.scale.set(wingSpan, wingSpan, wingSpan);

    leftWingGroup.rotation.z = 0.12 + wingFlap + scrollLift;
    leftWingGroup.rotation.y = -0.15 - (story.active ? progress * 0.35 : 0);

    rightWingGroup.rotation.z = -0.12 - wingFlap - scrollLift;
    rightWingGroup.rotation.y = 0.15 + (story.active ? progress * 0.35 : 0);

    // Tail undulating wave
    tailPlumes.forEach((tp, i) => {
      tp.rotation.x = Math.sin(time * 2.2 + i * 0.7) * 0.12;
      tp.rotation.z = Math.cos(time * 1.7 + i * 0.5) * 0.09;
    });

    // Heart pulsation & active glow
    heart.scale.setScalar(1.0 + Math.sin(time * 3.2) * 0.12 + (story.active ? 0.25 : 0));
    heart.rotation.y = time * 0.8;

    // Head subtle movement
    headGroup.rotation.y = Math.sin(time * 0.9) * 0.1 + smooth.x * 0.15;
    headGroup.rotation.x = Math.sin(time * 1.1) * 0.05 + smooth.y * 0.1;

    // Banking & interactive pointer tilt
    sculpture.rotation.y = -0.22 + smooth.x * 0.22 + Math.sin(time * 0.14) * 0.09;
    sculpture.rotation.x = 0.18 + smooth.y * 0.14 + (story.active ? -0.12 + progress * 0.22 : 0);
    sculpture.rotation.z = Math.sin(time * 0.1) * 0.04;

    // Orbital nodes animation & project focus
    nodes.forEach((node, i) => {
      const active = n < 0 || i === n;
      node.node.scale.setScalar(i === n ? 1.7 : active ? 1.1 : 0.75);
      node.track.material.opacity = active ? (i === n ? 0.65 : 0.28) : 0.06;
      node.pulse.visible = active;
      const pulseT = (time * 0.12 + i * 0.2) % 1;
      node.pulse.position.copy(node.curve.getPoint(pulseT));
    });

    // Camera framing adapts dynamically
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, story.active ? 8.6 : 9.4, l);
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
