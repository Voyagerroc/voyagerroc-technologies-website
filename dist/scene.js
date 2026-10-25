import * as THREE from './vendor/three.module.js';

// THE NEXUS: an original procedural three-strand orbit. No remote models,
// textures, tracking or third-party runtime requests are used.
const container = document.getElementById('scene-container');
const canvas = document.getElementById('nexus-canvas');
const toggle = document.getElementById('motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
} catch {
  document.body.dataset.webgl = 'fallback';
  toggle.hidden = true;
}

if (renderer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34,1,.1,50);
  camera.position.set(0,.15,7.8);
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.25:1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setClearColor(0x000000,0);

  // Procedural light studio: large soft panels become real reflections.
  const lightCanvas = document.createElement('canvas');
  lightCanvas.width=1024;lightCanvas.height=512;
  const ctx=lightCanvas.getContext('2d');
  ctx.fillStyle='#14233b';ctx.fillRect(0,0,1024,512);
  const panel=(x,y,w,h,c)=>{const g=ctx.createLinearGradient(x,y,x+w,y);g.addColorStop(0,'#14233b');g.addColorStop(.28,c);g.addColorStop(.7,c);g.addColorStop(1,'#14233b');ctx.fillStyle=g;ctx.fillRect(x,y,w,h);};
  panel(40,70,190,350,'#eff6ff');panel(500,95,160,310,'#93bfff');panel(800,150,110,240,'#9ee7d8');
  const environment=new THREE.CanvasTexture(lightCanvas);
  environment.mapping=THREE.EquirectangularReflectionMapping;
  environment.colorSpace=THREE.SRGBColorSpace;
  const pmrem=new THREE.PMREMGenerator(renderer);
  const environmentMap=pmrem.fromEquirectangular(environment);
  scene.environment=environmentMap.texture;
  environment.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xb8d5ff,0x142236,1.5));
  const key=new THREE.DirectionalLight(0xe3eeff,3.2);key.position.set(-3,4,5);scene.add(key);
  const rim=new THREE.PointLight(0x7ae4d0,30,20);rim.position.set(3,1,-1);scene.add(rim);
  const fill=new THREE.PointLight(0x6c95ff,23,20);fill.position.set(-3,-2,2);scene.add(fill);

  const assembly=new THREE.Group();
  assembly.rotation.set(.52,.35,-.08);scene.add(assembly);
  class OrbitCurve extends THREE.Curve {
    constructor(phase){super();this.phase=phase;}
    getPoint(t,target=new THREE.Vector3()){
      const a=t*Math.PI*2;
      const r=1.36+.17*Math.cos(3*a+this.phase);
      return target.set(r*Math.cos(a),.74*Math.sin(2*a+this.phase),r*Math.sin(a));
    }
  }
  const materials=[];
  const strandGroup=new THREE.Group();assembly.add(strandGroup);
  [0,Math.PI*2/3,Math.PI*4/3].forEach((phase,index)=>{
    const material=new THREE.MeshPhysicalMaterial({
      color:[0xc5dcff,0x85b2ed,0xa9e2db][index],metalness:.9,roughness:.19,
      clearcoat:1,clearcoatRoughness:.18,envMapIntensity:1.45,
      emissive:[0x16233d,0x102343,0x0b2827][index],emissiveIntensity:.18
    });
    materials.push(material);
    const strand=new THREE.Mesh(new THREE.TubeGeometry(new OrbitCurve(phase),220,.092,14,true),material);
    strandGroup.add(strand);
  });
  const nucleus=new THREE.Mesh(new THREE.IcosahedronGeometry(.54,0),new THREE.MeshPhysicalMaterial({color:0xb3d3fa,metalness:.65,roughness:.17,clearcoat:1,envMapIntensity:1.6}));
  assembly.add(nucleus);
  const coreOutline=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(.78,0)),new THREE.LineBasicMaterial({color:0x95b9ee,transparent:true,opacity:.24}));
  coreOutline.rotation.set(.4,.4,.1);assembly.add(coreOutline);
  const orbitMaterial=new THREE.MeshBasicMaterial({color:0x6495d3,transparent:true,opacity:.22});
  const rings=new THREE.Group();assembly.add(rings);
  // Five product modules orbit a shared core: evidence, finance, research, operations.
  const moduleColors=[0xc5dcff,0xa5a7ff,0xffc58f,0x8ce5da,0x8ebdea];
  const modules=moduleColors.map((color,i)=>{
    const group=new THREE.Group();
    const material=new THREE.MeshPhysicalMaterial({color,metalness:.6,roughness:.23,clearcoat:1,emissive:color,emissiveIntensity:.08});
    const geometry=i===1?new THREE.TorusGeometry(.23,.075,10,32):i===3?new THREE.IcosahedronGeometry(.27,0):new THREE.BoxGeometry(.38,.52,.1);
    const body=new THREE.Mesh(geometry,material);
    const edge=new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry),new THREE.LineBasicMaterial({color:0xeaf0f8,transparent:true,opacity:.5}));
    group.add(body,edge);assembly.add(group);
    if(i===0){for(let j=1;j<=2;j++){const sheet=new THREE.Mesh(geometry,material);sheet.position.set(-j*.07,j*.06,-j*.12);group.add(sheet);}}
    if(i===3){for(let j=0;j<3;j++){const a=j*Math.PI*2/3;const node=new THREE.Mesh(new THREE.SphereGeometry(.055,8,8),material);node.position.set(Math.cos(a)*.45,Math.sin(a)*.45,0);group.add(node);const link=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),node.position]),new THREE.LineBasicMaterial({color:0x8ce5da}));group.add(link);}}
    if(i===4){body.visible=false;edge.visible=false;for(let j=0;j<4;j++){const tile=new THREE.Mesh(new THREE.BoxGeometry(.19,.19,.1),material);tile.position.set((j%2-.5)*.25,(Math.floor(j/2)-.5)*.25,0);group.add(tile);}}
    if(i===2){body.visible=false;edge.visible=false;for(let j=0;j<2;j++){const phone=new THREE.Mesh(new THREE.BoxGeometry(.2,.4,.07),material);phone.position.x=(j-.5)*.38;group.add(phone);}const bridge=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-.1,0,0),new THREE.Vector3(.1,0,0)]),new THREE.LineBasicMaterial({color:0xffc58f}));group.add(bridge);}
    return {group,material,phase:i*Math.PI*2/5};
  });
  let storyState={active:false,index:0,progress:0},scrollState=0;
  for(let i=0;i<2;i++){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.98+i*.12,.004,5,160),orbitMaterial);
    ring.rotation.set(Math.PI/2+(i*.32),i*.7,.2);rings.add(ring);
  }
  const satelliteMaterial=new THREE.MeshBasicMaterial({color:0xbadcfb,transparent:true,opacity:.62});
  for(let i=0;i<12;i++){
    const a=i/12*Math.PI*2;
    const dot=new THREE.Mesh(new THREE.SphereGeometry(i%3===0?.025:.014,8,8),satelliteMaterial);
    dot.position.set(Math.cos(a)*2.0,Math.sin(a*2)*.43,Math.sin(a)*2.0);rings.add(dot);
  }
  let paused=reducedMotion.matches,visible=true,frame=0,raf=0,last=0,time=0;
  let pointer={x:0,y:0},smooth={x:0,y:0};
  let targetColor=new THREE.Color(0x85b2ed);
  function label(){const en=document.documentElement.lang==='en';toggle.textContent=paused?(en?'Resume motion':'Hareketi başlat'):(en?'Pause motion':'Hareketi durdur');toggle.setAttribute('aria-pressed',String(paused));document.body.dataset.motion=paused?'paused':'running';}
  function renderOnce(){renderer.render(scene,camera);frame++;canvas.dataset.frames=String(frame);}
  function tick(now){
    raf=0;
    if(paused||!visible||document.hidden)return;
    const delta=Math.min((now-last)/1000,.08);
    if(now-last<1000/30){raf=requestAnimationFrame(tick);return;}
    last=now;time+=delta;
    scrollState+=(storyState.progress-scrollState)*.07;
    smooth.x+=(pointer.x-smooth.x)*.035;smooth.y+=(pointer.y-smooth.y)*.035;
    assembly.rotation.y=.35+time*.09+smooth.x*.17+(storyState.active?scrollState*Math.PI*.7:0);
    assembly.rotation.x=.52+Math.sin(time*.21)*.055+smooth.y*.12;
    assembly.rotation.z=-.08+Math.sin(time*.17)*.025;
    nucleus.rotation.y=-time*.16;nucleus.rotation.x=time*.08;
    coreOutline.rotation.y=.4+time*.08;
    rings.rotation.y=-time*.035;
    modules.forEach((module,i)=>{
      const angle=module.phase+(storyState.active?scrollState*.6:0);
      const selected=storyState.active&&i===storyState.index;
      const radius=selected?1.9:1.56;
      module.group.position.lerp(new THREE.Vector3(Math.cos(angle)*radius,Math.sin(angle*2+time*.3)*.2,Math.sin(angle)*radius),.07);
      module.group.rotation.y=-assembly.rotation.y;
      module.group.scale.lerp(new THREE.Vector3().setScalar(selected?1.38:1),.07);
      module.material.emissiveIntensity=THREE.MathUtils.lerp(module.material.emissiveIntensity,selected?.5:.08,.07);
    });
    camera.position.x=THREE.MathUtils.lerp(camera.position.x,storyState.active?Math.sin(scrollState*Math.PI)*.45:0,.04);
    camera.position.z=THREE.MathUtils.lerp(camera.position.z,storyState.active?7.1:7.8,.04);
    camera.lookAt(0,0,0);
    canvas.dataset.storyStep=String(storyState.index);
    canvas.dataset.scrollProgress=scrollState.toFixed(3);
    materials[1].color.lerp(targetColor,.035);
    renderOnce();raf=requestAnimationFrame(tick);
  }
  function start(){if(!raf&&!paused&&visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(tick);}}
  function stop(){if(raf)cancelAnimationFrame(raf);raf=0;}
  function resize(){const r=container.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();renderOnce();}
  new ResizeObserver(resize).observe(container);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop();},{threshold:.05}).observe(container);
  container.addEventListener('pointermove',event=>{if(paused)return;const r=container.getBoundingClientRect();pointer.x=(event.clientX-r.left)/r.width*2-1;pointer.y=(event.clientY-r.top)/r.height*2-1;},{passive:true});
  container.addEventListener('pointerleave',()=>{pointer={x:0,y:0};});
  toggle.addEventListener('click',()=>{paused=!paused;label();if(paused)stop();else start();});
  reducedMotion.addEventListener('change',()=>{paused=reducedMotion.matches;label();if(paused){stop();renderOnce();}else start();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start();});
  window.addEventListener('portfolio:language',label);
  modules.forEach((module,i)=>{module.group.position.set(Math.cos(module.phase)*1.56,0,Math.sin(module.phase)*1.56);});
  window.addEventListener('portfolio:story',event=>{storyState=event.detail;targetColor.set(moduleColors[storyState.index]);});
  window.addEventListener('portfolio:product-focus',event=>{targetColor.set(({eip:0xc5dcff,payradar:0x9caaff,laserdeck:0xffc58f,pharos:0x8ce5da,bungalow:0x8ebdea})[event.detail]||0x85b2ed);if(paused){materials[1].color.copy(targetColor);renderOnce();}});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();stop();document.body.dataset.webgl='fallback';toggle.hidden=true;});
  document.body.dataset.webgl='ready';label();resize();start();
}
