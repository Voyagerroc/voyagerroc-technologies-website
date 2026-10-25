import * as THREE from './vendor/three.module.js';

// APERTURE: five product domains in a conceptual routing study, not live data.
const container=document.getElementById('scene-container'),canvas=document.getElementById('nexus-canvas'),toggle=document.getElementById('motion-toggle');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 760px)');
const ids=['eip','payradar','laserdeck','pharos','bungalow'];
const names=['Evidence Intelligence','PayRadar','LaserDeck PTT','Pharos','Bungalow OS'];
const colors=[0x9cbfff,0xc3b5f5,0xe9c79c,0x87d7cb,0xa0c9e0];
function fallback(){document.body.dataset.webgl='fallback';toggle.hidden=true;}
let renderer;try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});}catch{fallback();}
if(renderer){
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(33,1,.1,40);camera.position.set(0,.35,9.2);
 renderer.setPixelRatio(Math.min(devicePixelRatio,mobile.matches?1.25:1.65));renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;renderer.setClearColor(0,0);
 const lightCanvas=document.createElement('canvas');lightCanvas.width=1024;lightCanvas.height=512;
 const ctx=lightCanvas.getContext('2d');ctx.fillStyle='#060a13';ctx.fillRect(0,0,1024,512);
 [[70,50,100,410,'#c4d8f0'],[400,0,55,512,'#e4d8bf'],[670,80,160,330,'#527f9e']].forEach(([x,y,w,h,c])=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);});
 const env=new THREE.CanvasTexture(lightCanvas);env.mapping=THREE.EquirectangularReflectionMapping;env.colorSpace=THREE.SRGBColorSpace;
 const pmrem=new THREE.PMREMGenerator(renderer),map=pmrem.fromEquirectangular(env);scene.environment=map.texture;env.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0x9caeca,0x030509,1.3));
 const key=new THREE.DirectionalLight(0xcbdcf6,5);key.position.set(-3,4,5);scene.add(key);
 const warm=new THREE.PointLight(0xe5c79c,19,12);warm.position.set(1.3,-.3,2);scene.add(warm);
 const rim=new THREE.PointLight(0x719ddf,32,12);rim.position.set(-2,1,-2);scene.add(rim);
 const sculpture=new THREE.Group();sculpture.rotation.set(.26,-.36,-.15);scene.add(sculpture);
 const metal=new THREE.MeshPhysicalMaterial({color:0x273445,metalness:1,roughness:.24,clearcoat:.7,envMapIntensity:1.6});
 const dark=new THREE.MeshPhysicalMaterial({color:0x0b111d,metalness:.95,roughness:.29,envMapIntensity:1.8});
 const pale=new THREE.MeshBasicMaterial({color:0x9fb9d7,transparent:true,opacity:.28});
 const lineMat=new THREE.LineBasicMaterial({color:0x8dadd1,transparent:true,opacity:.17});
 const torus=(r,t,arc=Math.PI*2)=>new THREE.TorusGeometry(r,t,6,100,arc);
 const sectors=[];
 for(let i=0;i<5;i++){
  const group=new THREE.Group();group.rotation.z=i*Math.PI*2/5;sculpture.add(group);
  const body=new THREE.Mesh(torus(1.16,.205,Math.PI*2/5-.14),metal);body.rotation.z=.07;group.add(body);
  const lip=new THREE.Mesh(torus(1.38,.018,Math.PI*2/5-.22),metal);lip.rotation.z=.11;lip.position.z=.09;group.add(lip);
  const insetMaterial=new THREE.MeshBasicMaterial({color:colors[i],transparent:true,opacity:.7});
  const inset=new THREE.Mesh(torus(.965,.009,Math.PI*2/5-.24),insetMaterial);inset.rotation.z=.12;inset.position.z=.08;group.add(inset);
  for(let j=0;j<8;j++){const a=.14+j*.135,rib=new THREE.Mesh(new THREE.BoxGeometry(.025,.23,.27),dark);rib.position.set(Math.cos(a)*1.21,Math.sin(a)*1.21,.02);rib.rotation.z=a-Math.PI/2;group.add(rib);}
  const plate=new THREE.Mesh(new THREE.BoxGeometry(.3,.13,.19),metal),a=Math.PI/5;plate.position.set(Math.cos(a)*1.58,Math.sin(a)*1.58,-.11);plate.rotation.z=a;group.add(plate);
  sectors.push({group,insetMaterial,phase:i*Math.PI*2/5});
 }
 const core=new THREE.Group();sculpture.add(core);
 core.add(new THREE.Mesh(new THREE.SphereGeometry(.61,32,24),new THREE.MeshPhysicalMaterial({color:0x020409,metalness:1,roughness:.2,envMapIntensity:.7})));
 const halo=new THREE.Mesh(torus(.635,.015),new THREE.MeshBasicMaterial({color:0xd9c8a8}));halo.position.z=.13;core.add(halo);
 const innerHalo=new THREE.Mesh(torus(.68,.004),pale);innerHalo.position.z=.13;core.add(innerHalo);
 const prism=new THREE.Mesh(new THREE.OctahedronGeometry(.35),new THREE.MeshPhysicalMaterial({color:0xa3b8ce,metalness:1,roughness:.14,envMapIntensity:2}));prism.scale.set(.68,1.55,.65);prism.position.z=.7;core.add(prism);
 const seam=new THREE.Mesh(new THREE.BoxGeometry(.009,.77,.012),new THREE.MeshBasicMaterial({color:0xf4e7cd}));seam.position.z=.93;core.add(seam);
 const outer=new THREE.Group();sculpture.add(outer);
 [1.77,1.84,2.03].forEach((r,i)=>{const ring=new THREE.Mesh(torus(r,i===1?.009:.003),i===1?dark:pale);ring.position.z=-.28-i*.06;outer.add(ring);});
 const ticks=[];for(let i=0;i<70;i++){const a=i/70*Math.PI*2,r=1.92,len=i%14===0?.1:.035;ticks.push(new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r,-.39),new THREE.Vector3(Math.cos(a)*(r+len),Math.sin(a)*(r+len),-.39));}
 outer.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ticks),lineMat));
 const nodes=[];
 for(let i=0;i<5;i++){
  const a=i*Math.PI*2/5+Math.PI/5,p=new THREE.Vector3(Math.cos(a)*2.03,Math.sin(a)*2.03,-.24),mat=new THREE.MeshBasicMaterial({color:colors[i]});
  const node=new THREE.Mesh(new THREE.OctahedronGeometry(.065),mat);node.position.copy(p);outer.add(node);
  const curve=new THREE.CubicBezierCurve3(p,new THREE.Vector3(p.x*.8,p.y*.8,.15),new THREE.Vector3(p.x*.3,p.y*.3,.3),new THREE.Vector3(0,0,.45));
  const track=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(35)),new THREE.LineBasicMaterial({color:colors[i],transparent:true,opacity:.2}));outer.add(track);
  const signal=new THREE.Mesh(new THREE.SphereGeometry(.021,8,6),mat);outer.add(signal);nodes.push({node,signal,curve,track});
 }
 let seed=971;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 const pts=[];for(let i=0;i<390;i++)pts.push((random()-.5)*8,(random()-.5)*5,(random()-.5)*3-1.8);
 scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(pts,3)),new THREE.PointsMaterial({color:0x93b7de,size:.012,transparent:true,opacity:.32,depthWrite:false})));
 let paused=reduced.matches,visible=true,raf=0,last=0,time=0,frame=0,focus=-1,progress=0,selected=-2;
 let story={active:false,index:0,progress:0};const pointer={x:0,y:0},smooth={x:0,y:0},stateLabel=document.getElementById('scene-state');
 function updateState(){const en=document.documentElement.lang==='en',n=story.active?story.index:focus;stateLabel.textContent=n<0?(en?'05 DOMAINS / CONCEPT STUDY':'05 ALAN / KAVRAMSAL GÖRSEL'):String(n+1).padStart(2,'0')+' / '+names[n];canvas.dataset.focus=String(n);}
 function label(){const en=document.documentElement.lang==='en';toggle.textContent=paused?(en?'Resume motion':'Hareketi başlat'):(en?'Pause motion':'Hareketi durdur');toggle.setAttribute('aria-pressed',String(paused));document.body.dataset.motion=paused?'paused':'running';updateState();}
 function draw(){renderer.render(scene,camera);canvas.dataset.frames=String(++frame);}
 function pose(instant=false){
  const l=instant?1:.055,n=story.active?story.index:focus;progress=THREE.MathUtils.lerp(progress,story.progress,l);
  smooth.x=THREE.MathUtils.lerp(smooth.x,pointer.x,l);smooth.y=THREE.MathUtils.lerp(smooth.y,pointer.y,l);
  sculpture.rotation.y=-.36+smooth.x*.15+Math.sin(time*.12)*.1;sculpture.rotation.x=.26+smooth.y*.1;sculpture.rotation.z=-.15+time*.025+(story.active?progress*.7:0);
  sectors.forEach((s,i)=>{const active=i===n,d=story.active?.12+progress*.12:0,opening=d+(active?.12:0),a=s.phase+Math.PI/5;s.group.position.lerp(new THREE.Vector3(Math.cos(a)*opening,Math.sin(a)*opening,active?.15:0),l);s.insetMaterial.opacity=THREE.MathUtils.lerp(s.insetMaterial.opacity,active?1:n<0?.65:.2,l);});
  nodes.forEach((node,i)=>{const active=n<0||i===n;node.node.scale.setScalar(i===n?1.55:1);node.track.material.opacity=active?.32:.06;node.signal.visible=active;node.signal.position.copy(node.curve.getPoint((time*.1+i*.2)%1));});
  prism.rotation.y=time*.14;prism.rotation.z=.16+Math.sin(time*.2)*.08;camera.position.z=THREE.MathUtils.lerp(camera.position.z,story.active?8.55:9.2,l);camera.lookAt(0,0,0);
  if(selected!==n){selected=n;updateState();}canvas.dataset.storyStep=String(story.index);canvas.dataset.scrollProgress=progress.toFixed(3);
 }
 function tick(now){raf=0;if(paused||!visible||document.hidden)return;const elapsed=now-last;if(elapsed<1000/(mobile.matches?24:30)){raf=requestAnimationFrame(tick);return;}time+=Math.min(elapsed/1000,.08);last=now;pose();draw();raf=requestAnimationFrame(tick);}
 function start(){if(!raf&&!paused&&visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(tick);}}
 function stop(){if(raf)cancelAnimationFrame(raf);raf=0;}
 function resize(){const r=container.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();pose(true);draw();}
 new ResizeObserver(resize).observe(container);new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start();else stop();},{threshold:.03}).observe(container);
 container.addEventListener('pointermove',e=>{if(paused||e.pointerType==='touch')return;const r=container.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width*2-1;pointer.y=(e.clientY-r.top)/r.height*2-1;},{passive:true});
 container.addEventListener('pointerleave',()=>{pointer.x=pointer.y=0;});
 toggle.addEventListener('click',()=>{paused=!paused;label();if(paused)stop();else start();});
 reduced.addEventListener('change',()=>{paused=reduced.matches;label();if(paused){stop();pose(true);draw();}else start();});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());window.addEventListener('portfolio:language',label);
 window.addEventListener('portfolio:story',e=>{story=e.detail;if(paused){pose(true);draw();}updateState();});
 window.addEventListener('portfolio:product-focus',e=>{focus=ids.indexOf(e.detail);updateState();if(paused){pose(true);draw();}});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stop();fallback();});document.body.dataset.webgl='ready';label();resize();start();
}
