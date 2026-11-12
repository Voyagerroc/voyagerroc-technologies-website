import * as THREE from './vendor/three.module.js';
import initWasm, { ApertureEngine } from './pkg/aperture_core.js';

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

  // Procedural Studio HDRI Environment for real anisotropic reflections & iridescence
  if (!mobile.matches) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    const l1 = new THREE.DirectionalLight(0xff6b7d, 3.5);
    l1.position.set(3, 5, 4);
    envScene.add(l1);
    const l2 = new THREE.DirectionalLight(0xffeedd, 2.5);
    l2.position.set(-4, -2, -3);
    envScene.add(l2);
    const l3 = new THREE.DirectionalLight(0x4080ff, 1.8);
    l3.position.set(0, -4, 3);
    envScene.add(l3);
    const envTex = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();
  }

  // Dramatic Studio Lighting for high-end PBR depth
  const ambient = new THREE.HemisphereLight(0xffe8eb, 0x1f060b, 1.1);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(-3.5, 4.5, 5.0);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xff7085, 2.0);
  fillLight.position.set(4.0, -1.0, 3.0);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffe0e6, 32, 14);
  rimLight.position.set(-2.0, 3.0, -3.5);
  scene.add(rimLight);

  const rubyGlow = new THREE.PointLight(0xff2244, 28, 9);
  rubyGlow.position.set(0, 0.3, 2.2);
  scene.add(rubyGlow);

  const sculpture = new THREE.Group();
  sculpture.rotation.set(0.14, -0.2, 0);
  scene.add(sculpture);

  const Surface = mobile.matches ? THREE.MeshStandardMaterial : THREE.MeshPhysicalMaterial;

  const rubyWingMat = new Surface({
    color: 0xc82a3a,
    metalness: mobile.matches ? 0.65 : 0.82,
    roughness: 0.16,
    ...(!mobile.matches ? {
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      sheen: 0.85,
      sheenColor: new THREE.Color(0xff8a99),
      sheenRoughness: 0.28,
      iridescence: 0.44,
      iridescenceIOR: 1.34,
      iridescenceThicknessRange: [120, 360]
    } : {}),
    envMapIntensity: 1.8
  });

  const roseWingMat = new Surface({
    color: 0xdf384b,
    metalness: mobile.matches ? 0.65 : 0.82,
    roughness: 0.16,
    ...(!mobile.matches ? {
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      sheen: 0.85,
      sheenColor: new THREE.Color(0xff9aa8),
      sheenRoughness: 0.28,
      iridescence: 0.44,
      iridescenceIOR: 1.34,
      iridescenceThicknessRange: [120, 360]
    } : {}),
    envMapIntensity: 1.8
  });

  const bodyMat = new Surface({
    color: 0x881422,
    metalness: mobile.matches ? 0.7 : 0.88,
    roughness: 0.2,
    ...(!mobile.matches ? {
      clearcoat: 0.92,
      clearcoatRoughness: 0.1,
      sheen: 0.65,
      sheenColor: new THREE.Color(0xff7788),
      sheenRoughness: 0.35,
      iridescence: 0.32,
      iridescenceIOR: 1.28,
      iridescenceThicknessRange: [100, 320]
    } : {}),
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

  // Luminous Ember Heart in Center (with organic pulsating material)
  const heartMat = new THREE.MeshStandardMaterial({
    color: 0xff3b56,
    emissive: 0xc82a3a,
    emissiveIntensity: 0.85,
    roughness: 0.1
  });
  const heart = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.19),
    heartMat
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
    nodes.push({ node: nMesh, pulse, curve, track, color: colors[i], mat: nMat });
  }

  // 5. Crystalline Agentic Facets (01 Context, 02 Tool Execution, 03 Human-in-the-loop)
  const facetsGroup = new THREE.Group();
  sculpture.add(facetsGroup);

  const facetGeom = new THREE.OctahedronGeometry(0.25, 0);
  facetGeom.scale(0.52, 1.85, 0.52);

  const facetMat = mobile.matches
    ? new THREE.MeshStandardMaterial({
        color: 0xff4d66,
        roughness: 0.25,
        metalness: 0.35,
        emissive: 0xc82a3a,
        emissiveIntensity: 0.35
      })
    : new THREE.MeshPhysicalMaterial({
        color: 0xfff0f4,
        roughness: 0.05,
        metalness: 0.08,
        transmission: 0.82,
        ior: 1.58,
        thickness: 0.75,
        transparent: true,
        opacity: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        iridescence: 0.78,
        iridescenceIOR: 1.45,
        iridescenceThicknessRange: [160, 420],
        attenuationColor: new THREE.Color(0xff2244),
        attenuationDistance: 0.5
      });

  const facetWireMat = new THREE.LineBasicMaterial({
    color: 0xff9eb0,
    transparent: true,
    opacity: 0.85
  });
  const facetEdges = new THREE.EdgesGeometry(facetGeom);

  const facetCoords = [
    { x: -1.75, y: 0.9, z: 0.55, rx: 0.25, ry: 0.35, speed: 0.28 },
    { x: 1.85, y: -0.65, z: 0.45, rx: -0.2, ry: 0.45, speed: -0.24 },
    { x: 0.0, y: -1.8, z: -0.3, rx: 0.4, ry: -0.25, speed: 0.32 }
  ];

  const facets = facetCoords.map(c => {
    const mesh = new THREE.Mesh(facetGeom, facetMat);
    const wire = new THREE.LineSegments(facetEdges, facetWireMat);
    mesh.add(wire);
    mesh.position.set(c.x, c.y, c.z);
    mesh.rotation.set(c.rx, c.ry, 0);
    facetsGroup.add(mesh);
    return { mesh, ...c, basePos: new THREE.Vector3(c.x, c.y, c.z) };
  });

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

  // Autoplay is intended on every viewport. Reduced motion softens the pace.
  let paused = false;
  let fitDistance = 10.5;
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

  // Rust / WebAssembly Kinematics Accelerator
  let wasmEngine = null;
  let wasmView = null;
  let wasmMem = null;

  try {
    const wasm = await initWasm({ module_or_path: '/aperture_core_bg.wasm' });
    wasmEngine = new ApertureEngine();
    wasmMem = wasm.memory;
    wasmView = new Float32Array(wasmMem.buffer, wasmEngine.state_ptr(), wasmEngine.state_floats());
    canvas.dataset.engine = 'rust-wasm';
  } catch (err) {
    console.warn('[Aperture] WebAssembly acceleration fallback to JavaScript:', err);
    canvas.dataset.engine = 'js-fallback';
  }

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

  function pose(instant = false, dt = 0) {
    const n = story.active ? story.index : focus;

    if (wasmEngine) {
      wasmEngine.tick(
        dt,
        pointer.x,
        pointer.y,
        focus,
        story.active,
        story.progress,
        story.index,
        fitDistance,
        instant,
        reduced.matches
      );

      if (!wasmView || wasmView.buffer !== wasmMem.buffer || wasmView.byteLength === 0) {
        wasmView = new Float32Array(wasmMem.buffer, wasmEngine.state_ptr(), wasmEngine.state_floats());
      }

      // 1. Sculpture Group Rotation
      sculpture.rotation.set(wasmView[0], wasmView[1], wasmView[2]);

      // 2. Left Wing [scale, rot_y, rot_z]
      leftWingPivot.scale.set(wasmView[3], wasmView[3], wasmView[3]);
      leftWingPivot.rotation.y = wasmView[4];
      leftWingPivot.rotation.z = wasmView[5];

      // 3. Right Wing [scale, rot_y, rot_z]
      rightWingPivot.scale.set(wasmView[6], wasmView[6], wasmView[6]);
      rightWingPivot.rotation.y = wasmView[7];
      rightWingPivot.rotation.z = wasmView[8];

      // 4. Ember Heart [scale, rot_y, emissive_intensity]
      heart.scale.setScalar(wasmView[9]);
      heart.rotation.y = wasmView[10];
      heartMat.emissiveIntensity = wasmView[11];

      // 5. Orbital Product Nodes (8 floats each, starting at index 12)
      for (let i = 0; i < 5; i++) {
        const o = 12 + i * 8;
        nodes[i].node.scale.setScalar(wasmView[o]);
        nodes[i].mat.emissiveIntensity = wasmView[o + 1];
        nodes[i].track.material.opacity = wasmView[o + 2];
        nodes[i].pulse.scale.setScalar(wasmView[o + 3]);
        nodes[i].pulse.position.set(wasmView[o + 4], wasmView[o + 5], wasmView[o + 6]);
        nodes[i].pulse.visible = wasmView[o + 7] > 0.5;
      }

      // 6. Crystalline Facets (7 floats each, starting at index 52)
      for (let i = 0; i < 3; i++) {
        const o = 52 + i * 7;
        facets[i].mesh.position.set(wasmView[o], wasmView[o + 1], wasmView[o + 2]);
        facets[i].mesh.rotation.set(wasmView[o + 3], wasmView[o + 4], wasmView[o + 5]);
        facets[i].mesh.scale.setScalar(wasmView[o + 6]);
      }

      // 7. Telemetry & Camera
      camera.position.z = wasmView[73];
      camera.lookAt(0, 0, 0);

      time = wasmView[74];
      progress = wasmView[75];

      if (selected !== n) {
        selected = n;
        updateState();
      }
      canvas.dataset.storyStep = String(story.index);
      canvas.dataset.scrollProgress = progress.toFixed(3);
      canvas.dataset.animationTime = time.toFixed(3);
      return;
    }

    // Pure JavaScript Fallback
    const l = instant ? 1 : 0.055;
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

    // Heart organic breathing pulsation
    const heartPulse = Math.pow(Math.sin(time * 1.6), 4) * 0.18 + Math.sin(time * 0.8) * 0.05;
    const isDomainFocused = n >= 0;
    heart.scale.setScalar(1.0 + heartPulse + (story.active ? 0.22 : 0) + (isDomainFocused ? 0.12 : 0));
    heart.rotation.y = time * 0.7;
    heartMat.emissiveIntensity = 0.85 + heartPulse * 1.4 + (isDomainFocused ? 0.5 : 0);

    // Awakening Network: target domain orientation & interactive pointer tilt
    const targetAngle = isDomainFocused ? (n * Math.PI * 2) / 5 - Math.PI / 2 : 0;
    const domainBiasX = isDomainFocused ? Math.cos(targetAngle) * 0.09 : 0;
    const domainBiasY = isDomainFocused ? Math.sin(targetAngle) * 0.06 : 0;

    sculpture.rotation.y = -0.18 + smooth.x * 0.22 + domainBiasX + Math.sin(time * 0.14) * 0.08;
    sculpture.rotation.x = 0.14 + smooth.y * 0.14 + domainBiasY + (story.active ? -0.1 + progress * 0.18 : 0);
    sculpture.rotation.z = Math.sin(time * 0.1) * 0.03;

    // Orbital nodes animation & project focus (Awakening Network)
    nodes.forEach((node, i) => {
      const isFocused = i === n;
      const active = n < 0 || isFocused;
      node.node.scale.setScalar(isFocused ? 2.0 : active ? 1.1 : 0.65);
      node.mat.emissiveIntensity = isFocused ? 1.4 : (active ? 0.6 : 0.15);
      node.track.material.opacity = isFocused ? 0.85 : (active ? 0.28 : 0.05);
      node.pulse.visible = active;
      const pulseSpeed = isFocused ? 0.35 : 0.12;
      const pulseT = (time * pulseSpeed + i * 0.2) % 1;
      node.pulse.position.copy(node.curve.getPoint(pulseT));
      node.pulse.scale.setScalar(isFocused ? 2.2 : 1.0);
    });

    // Crystalline agentic facets flotation and subtle alignment
    facets.forEach((f, idx) => {
      const fPulse = Math.sin(time * f.speed + idx * 1.8) * 0.07;
      f.mesh.position.y = f.basePos.y + fPulse + (isDomainFocused ? domainBiasY * 0.5 : 0);
      f.mesh.position.x = f.basePos.x + (isDomainFocused ? domainBiasX * 0.5 : 0);
      f.mesh.rotation.x = f.rx + Math.sin(time * 0.35 + idx) * 0.12;
      f.mesh.rotation.y = f.ry + time * f.speed * 0.5;
      f.mesh.scale.setScalar(isDomainFocused ? 1.15 : 1.0);
    });

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, story.active ? fitDistance * 0.94 : fitDistance, l);
    camera.lookAt(0, 0, 0);

    if (selected !== n) {
      selected = n;
      updateState();
    }
    canvas.dataset.storyStep = String(story.index);
    canvas.dataset.scrollProgress = progress.toFixed(3);
    canvas.dataset.animationTime = time.toFixed(3);
  }

  function tick(now) {
    raf = 0;
    if (paused || !visible || document.hidden) return;
    const elapsed = now - last;
    if (elapsed < 1000 / (mobile.matches ? 24 : 30)) {
      raf = requestAnimationFrame(tick);
      return;
    }
    const dt = Math.min(elapsed / 1000, 0.08);
    if (!wasmEngine) {
      time += dt * (reduced.matches ? 0.4 : 1);
    }
    last = now;
    pose(false, dt);
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
    renderer.setPixelRatio(Math.min(devicePixelRatio, r.width < 500 ? 1.25 : r.width < 800 ? 1.5 : 1.75));
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    // Fit wings and orbital ring with motion clearance at every aspect ratio.
    const tangent = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    fitDistance = Math.max(2.9 / tangent, 3.1 / (tangent * camera.aspect)) + 0.6;
    camera.position.z = fitDistance;
    canvas.dataset.viewport = Math.round(r.width) + 'x' + Math.round(r.height);
    canvas.dataset.cameraDistance = fitDistance.toFixed(2);
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
      if (paused || reduced.matches || e.pointerType === 'touch') return;
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
    pointer.x = 0;
    pointer.y = 0;
    pose(true);
    draw();
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
  canvas.addEventListener('webglcontextrestored', () => {
    document.body.dataset.webgl = 'ready';
    if (toggle) toggle.hidden = false;
    if (wasmEngine) wasmEngine.set_time(time);
    resize();
    label();
    start();
  });

  document.body.dataset.webgl = 'ready';
  label();
  resize();
  start();
}
