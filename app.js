/* =========================
   Roblinder · App (Vanilla JS)
   ========================= */

/* ---------- Fondo dinámico ----------- */
(function bg(){
  const c = document.getElementById('bgParticles');
  const ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();
  const cubes = Array.from({length: 48}).map(()=>({
    x: Math.random()*c.width, y: Math.random()*c.height,
    s: 4 + Math.random()*14,
    vx: (Math.random()*0.6+0.2) * (Math.random()<0.5?-1:1),
    vy: (Math.random()*0.6+0.2) * (Math.random()<0.5?-1:1),
    a: Math.random()*Math.PI
  }));
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    cubes.forEach(q=>{
      q.x += q.vx; q.y += q.vy; q.a += 0.01;
      if(q.x<-30) q.x=c.width+30; if(q.x>c.width+30) q.x=-30;
      if(q.y<-30) q.y=c.height+30; if(q.y>c.height+30) q.y=-30;
      ctx.save(); ctx.translate(q.x,q.y); ctx.rotate(q.a);
      const g = ctx.createLinearGradient(-q.s,-q.s,q.s,q.s);
      g.addColorStop(0,'rgba(255,88,100,.18)'); g.addColorStop(1,'rgba(123,145,255,.18)');
      ctx.fillStyle = g; ctx.strokeStyle = 'rgba(255,255,255,.06)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.rect(-q.s, -q.s, q.s*2, q.s*2); ctx.fill(); ctx.stroke();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- Datos ----------
   Portada = Imagen 1 en el mapping oficial; Slide 2 = Imagen 2 (si existe)
*/
const PEOPLE = [
  // Astrid
  {
    id:'astrid', name:'Astrid', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/1-1.png'},
      {label:'Secundaria', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/1-2.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/1-1.png',
    sign:'Aries', status:'En relación', career:'Medicina (UCSUR)',
    goal:'Tener una familia estable', favFood:'Arroz tapado',
    bio:'Estudio Medicina y me gusta viajar, ilustrar y ver cine.',
    seeks:['Respeto','Honestidad','Metas claras'], tags:['Ilustración','Branding']
  },

  // Pamela (antes "Pamela Cruz")
  {
    id:'pamela', name:'Pamela', gender:'Mujer', age:18, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/4-1.png'},
      {label:'Secundaria', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/4-2.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/4-1.png',
    username:'Imbelvr25', sign:'Tauro', career:'Medicina Humana', status:'Soltera',
    goal:'Tener mi propia clínica y ayudar a las personas con valores',
    favFood:'Ceviche',
    bio:'Pamela, Tauro. Me encanta leer, editar y estudiar Medicina.',
    seeks:['Compañerismo','Amor','Respeto mutuo','Honestidad','Lealtad'],
    tags:['Documentación','Edición']
  },

  // Zulma
  {
    id:'zulma', name:'Zulma', gender:'Mujer', age:19, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/3-1.png'},
      {label:'Secundaria', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/3-2.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/3-1.png',
    username:'Zulma_RXJ', sign:'Leo', career:'Medicina Humana', status:'Soltera',
    goal:'Ser médico cirujano, investigar patologías y ayudar a mis hermanos',
    favFood:'Ceviche',
    bio:'Investigo, organizo y me encantan los retos.',
    seeks:['Respeto','Lealtad','Compromiso','Valores'],
    tags:['Planificación','Control']
  },

  // Abigail
  {
    id:'abigail', name:'Abigail', gender:'Mujer', age:21, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/5-1.png'},
      {label:'Secundaria', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/5-2.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/5-1.png',
    username:'Arroz con leche', sign:'Aries', career:'Enfermería', status:'Soltera',
    goal:'Ser feliz', favFood:'Pollo enrollado con salsa de champiñones',
    bio:'Disfruto el campo, las encuestas y el voluntariado.',
    seeks:['Compromiso','Lealtad','Trabajador','Superación'],
    tags:['Campo','Encuestas']
  },

  // Daira
  {
    id:'daira', name:'Daira', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/6-2.png'},
      {label:'Secundaria', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/6-1.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/6-2.png',
    username:'leebitilin', sign:'Sagitario', career:'Medicina Humana', status:'Soltera',
    goal:'Ser una profesional exitosa y tener una familia estable',
    favFood:'Cheesecake de maracuyá',
    bio:'Sagitario, 17. Estudio Medicina. Me gusta el diseño y los museos.',
    seeks:['Honestidad','Lealtad','Compromiso'],
    tags:['Diseño','UI']
  },

  // Gesú
  {
    id:'gesu', name:'Gesú', gender:'Hombre', age:20, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/2-1.png'},
      {label:'Secundaria', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/2-2.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/2-1.png',
    username:'Nova', sign:'Aries',
    career:'Ingeniería Empresarial de Sistemas (UCSUR)', status:'Soltero',
    goal:'Emprender mi propio negocio', favFood:'Ceviche',
    bio:'Me apasionan la tecnología y los KPIs. Valoro la lealtad y el esfuerzo.',
    seeks:['Lealtad','Valores','Respeto a sí misma','Trabajar','Superación'],
    tags:['Datos','KPIs']
  },

  // María
  {
    id:'maria', name:'María', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/8-1.png'},
      {label:'Secundaria', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/8-2.jpg'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/8-1.png',
    sign:'Sagitario', career:'Medicina Humana',
    status:'Con contrato indefinido (En una relación)',
    goal:'Viajar y terminar la carrera',
    favFood:'Lomo saltado con tallarines a la huancaína',
    bio:'Sagitario y curiosa por naturaleza. Estudio Medicina Humana y me motiva aprender con intensidad. Sueño con viajar mucho y graduarme; busco a alguien que aporte emoción y un toque de drama a la aventura.',
    seeks:['Que le den emoción y drama a su vida'],
    tags:['Storytelling','Video']
  },

  // Sebastián
  {
    id:'sebastian', name:'Sebastián', gender:'Hombre', age:18, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/7-1.jpeg'},
      {label:'Secundaria', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/7-2.jpeg'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/7-1.jpeg',
    username:'Chabazzzx', sign:'Cáncer', career:'Medicina Humana', status:'Soltero',
    goal:'Graduarme, comprarme una casa y un carro', favFood:'Lomo Saltado',
    bio:'Me gusta el humor directo y las metas claras. Busco alguien auténtica que entienda mi humor y se comprometa.',
    seeks:['Fidelidad','Entender mi humor','Cierta dosis de celos'],
    tags:['Fullstack','Automatización']
  },

  // Nazli
  {
    id:'nazli', name:'Nazli', gender:'Mujer', age:22, city:'Huancayo', role:'Participante',
    photos:[ {label:'Portada', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/9-1.png'} ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/9-1.png',
    sign:'Libra', status:'Soltera', career:'—', goal:'—', favFood:'—',
    bio:'Le gusta el análisis y las entrevistas.',
    seeks:['Viajar','Café','Fotografía'],
    tags:['Investigación','Redacción']
  },

  // Profesor
  {
    id:'prof', name:'Víctor Andrés Mendoza Guerrón', gender:'Hombre', age:35, city:'Lima', role:'Profesor',
    photos:[ {label:'Foto', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_10_profesor.png'} ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_10_profesor.png',
    isProfessor:true,
    username:'—', sign:'—',
    career:'Abogado (PUCP). Especialista en Derecho Laboral y Seguridad Social.',
    status:'—', goal:'Gestión de relaciones laborales y resolución de conflictos.', favFood:'—',
    bio:'Abogado PUCP. Máster y Segunda Especialidad. Curso Internacional (Univ. Salamanca). Gerente RL en Valtx. Árbitro laboral. Docente en USMP y UCSur.',
    seeks:['Respeto','Profesionalismo','Ética'],
    tags:['Supervisión','Feedback']
  }
];

/* Actividades (todas desbloqueadas) */
const ACTIVITIES = [
  { id:'a1', title:'Cambios y permanencia',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/primer-congreso.jpg',
    desc:'Explora procesos históricos.', icon:'📜',
    q:[
      {q:'¿Qué define mejor un “cambio”?', opts:['Continuidad','Transformación de estructuras o prácticas','Repetición'], ok:1},
      {q:'Para analizar un cambio debes ubicar…', opts:['Quién','Qué, cuándo y por qué','Impacto económico'], ok:1},
      {q:'Ejemplo típico de cambio:', opts:['Mismos procedimientos','Nueva ley que reemplaza marco anterior','Costumbres inalteradas'], ok:1},
    ]
  },
  { id:'a2', title:'Autoritarismo y democracia',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/velasco_alvarado.jpg',
    desc:'Compara rasgos.', icon:'⚖️',
    q:[
      {q:'Rasgo autoritario:', opts:['Elecciones libres','Concentración de poder y control de prensa','Pluralismo'], ok:1},
      {q:'Democracia se sostiene en…', opts:['Eliminar Congreso','Separación de poderes y derechos','De facto'], ok:1},
      {q:'Controlar medios y justicia es propio de…', opts:['Régimen autoritario','Democracia','Monarquía'], ok:0},
    ]
  },
  { id:'a3', title:'Períodos de bonanza',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/PeriodicoUNAL-061022-01am01.jpg',
    desc:'Identifica ciclos.', icon:'📈',
    q:[
      {q:'Disparador típico:', opts:['Caída exportadora','Alza de exportaciones','Menor demanda'], ok:1},
      {q:'Sectores que aceleran:', opts:['Construcción y servicios','Solo agricultura','Todos caen'], ok:0},
      {q:'Política prudente:', opts:['Gasto procíclico','Fondo de estabilización','Eliminar reglas'], ok:1},
    ]
  },
  { id:'a4', title:'Terrorismo',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/fotomarcha2carrusel-scaled.jpg',
    desc:'Analiza impactos.', icon:'🛡️',
    q:[
      {q:'Actor subversivo (1980–2000):', opts:['Sendero Luminoso','FAP','Defensoría'], ok:0},
      {q:'Impacto recurrente:', opts:['Vacaciones','Desplazamientos forzados','Más inversión cultural inmediata'], ok:1},
      {q:'Política para víctimas:', opts:['Ignorar','Plan Integral de Reparaciones','Más aranceles'], ok:1},
    ]
  }
];

/* ---------- Utilidades ---------- */
const $ = (s, r=document)=> r.querySelector(s);
const $$ = (s, r=document)=> Array.from(r.querySelectorAll(s));
function el(tag, attrs={}, html=''){ const n=document.createElement(tag); for(const [k,v] of Object.entries(attrs)){ if(v!=null) n.setAttribute(k, v); } if(html!==''&&html!=null) n.innerHTML=html; return n; }
function toast(msg){ const t=el('div',{class:'toast'}); t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 1800); }

/* ---------- Router (hash) ---------- */
function parseHash(){
  const h=(location.hash||'').replace(/^#/,''); if(!h) return {name:'',query:{}};
  const [name, q] = h.split('?'); const query={}; if(q) new URLSearchParams(q).forEach((v,k)=> query[k]=v);
  return {name, query};
}

/* ---------- DECK (Inicio) ---------- */
let deckIdx = 0;
const deckShell = $('#deckShell'), dotsEl = $('#dots');
function renderDots(){ dotsEl.innerHTML = PEOPLE.map((_,i)=>`<span class="dot ${i===deckIdx?'active':''}"></span>`).join(''); }
function renderDeck(){
  const p = PEOPLE[deckIdx]; if(!p) return;
  deckShell.querySelectorAll('.deck-card').forEach(n=>n.remove());
  const alt = (p.id==='gesu') ? 'Gesú - participante' : (p.name || 'Participante');
  const imgUrl = (p.photos?.[0]?.url) || p.avatar;
  const card = el('article', {class:`deck-card ${p.isProfessor?'pro-gold':''}`});
  card.innerHTML = `
    <img src="${imgUrl}" alt="${alt}" />
    <div class="badge like" id="badgeLike">LIKE</div>
    <div class="badge nope" id="badgeNope">NOPE</div>
    <div class="deck-meta">
      <div class="deck-name">${p.name} · ${p.age ?? ''}</div>
      <div class="deck-sub">${p.city ?? ''} · ${p.role ?? ''} · ${p.gender ?? ''}${p.isProfessor?' · <span class="p-badge">Profesor</span>':''}</div>
      <div class="deck-tags">${(p.tags||[]).map(t=>`<span class='pill'>${t}</span>`).join('')}</div>
    </div>`;
  card.addEventListener('click', ()=> openProfile(p.id));
  deckShell.appendChild(card);
  renderDots();
}
function next(){ deckIdx = (deckIdx+1) % PEOPLE.length; renderDeck(); }
function prev(){ deckIdx = (deckIdx-1+PEOPLE.length) % PEOPLE.length; renderDeck(); }
function flash(type){
  const id=(type==='like')?'#badgeLike':'#badgeNope'; const b=deckShell.querySelector(id); if(!b) return;
  b.style.opacity=1; setTimeout(()=>b.style.opacity=0, 400);
}

/* Eventos deck */
$('#zoneRight').addEventListener('click', ()=>{ flash('like'); next(); });
$('#zoneLeft').addEventListener('click', ()=>{ flash('nope'); prev(); });
$('#btnLike').addEventListener('click', ()=>{ flash('like'); next(); });
$('#btnNope').addEventListener('click', ()=>{ flash('nope'); next(); });
$('#btnOpen').addEventListener('click', ()=> openProfile(PEOPLE[deckIdx].id));
window.addEventListener('keydown', (e)=>{ if(e.key==='ArrowRight'){ flash('like'); next(); } if(e.key==='ArrowLeft'){ flash('nope'); prev(); } if(e.key==='Enter'){ openProfile(PEOPLE[deckIdx].id); } });

/* ---------- PARTICIPANTES (Masonry + Tilt) ---------- */
const masonry = $('#peopleMasonry');
function chip(text, cls=''){ return `<span class="chip ${cls}">${text}</span>`; }
function renderParticipants(){
  masonry.innerHTML = PEOPLE.map(p=>{
    const cover = (p.photos?.[0]?.url) || p.avatar;
    const alt = (p.id==='gesu') ? 'Gesú - participante' : (p.name || 'Participante');
    const chips = [
      chip(`Edad: ${p.age ?? '-'}`,'p1'),
      chip(`Signo: ${p.sign ?? '-'}`,'p2'),
      chip(`Carrera: ${p.career ?? '-'}`,'p3'),
      chip(`Estado: ${p.status ?? '-'}`,'p1'),
      chip(`Meta: ${p.goal ?? '-'}`,'p2'),
      chip(`Comida: ${p.favFood ?? '-'}`,'p3'),
      chip(`Busca: ${(p.seeks&&p.seeks.length)? p.seeks.join(', '): '-'}`,'p1'),
    ].join('');
    return `
    <article class="card" data-id="${p.id}">
      <img class="cover" src="${cover}" alt="${alt}">
      <div class="body">
        <div class="title">${p.name}${p.isProfessor? ' <span class="p-badge" style="background:var(--gold);color:#1a1a1a;padding:3px 8px;border-radius:999px;font-size:11px">Profesor</span>':''}</div>
        <div class="meta">${p.city ?? ''} · ${p.role ?? ''} · ${p.gender ?? ''}</div>
        <div class="chips">${chips}</div>
        <div class="actions">
          <button class="btn btn-ghost js-nope">NOPE</button>
          <button class="btn btn-cta js-open">Ver perfil</button>
          <button class="btn js-like">LIKE</button>
        </div>
      </div>
    </article>`;
  }).join('');

  // Tilt 3D ligero
  $$('.card', masonry).forEach(card=>{
    const onMove = (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
    };
    const onLeave = ()=>{ card.style.transform=''; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });

  // Clicks
  masonry.addEventListener('click', (e)=>{
    const card = e.target.closest('.card'); if(!card) return;
    const id = card.getAttribute('data-id');
    if(e.target.classList.contains('js-open')){ openProfile(id); }
    if(e.target.classList.contains('js-like')){ flash('like'); deckIdx = PEOPLE.findIndex(p=>p.id===id); renderDeck(); }
    if(e.target.classList.contains('js-nope')){ flash('nope'); deckIdx = PEOPLE.findIndex(p=>p.id===id); renderDeck(); }
  });
}

/* ---------- MODAL PERFIL + CAROUSEL ---------- */
const modal = $('#perfilModal');
const modalBackdrop = $('#modalBackdrop');
const modalClose = $('#modalClose');
const perfilDialog = $('#perfilDialog');
const carTrack = $('#carTrack');
const carDots = $('#carDots');
const carPrev = $('#carPrev');
const carNext = $('#carNext');
const profileSheet = $('#profileSheet');
let carIndex = 0, carPhotos = [], currentPerson = null;
let modalKbHandler = null;

function openProfile(id){
  const p = PEOPLE.find(x=>x.id===id); if(!p) return;
  currentPerson = p;

  // Fotos: si solo hay 1, NO duplicar (mostrar única slide)
  carPhotos = (p.photos && p.photos.length) ? p.photos : [{label:'Foto', url:p.avatar}];
  carIndex = 0;

  carTrack.innerHTML = carPhotos.map(ph=>`
    <div class="carousel-slide">
      <img src="${ph.url}" alt="${p.name} (${ph.label})">
    </div>
  `).join('');
  carDots.innerHTML = carPhotos.length > 1
    ? carPhotos.map((_,i)=>`<span class="dot ${i===0?'active':''}" data-i="${i}" aria-label="Ir a imagen ${i+1}"></span>`).join('')
    : '';

  // Mostrar/ocultar flechas según número de fotos
  carPrev.style.display = carPhotos.length > 1 ? 'block' : 'none';
  carNext.style.display = carPhotos.length > 1 ? 'block' : 'none';

  profileSheet.innerHTML = `
    <h3 id="perfilTitle" class="name">${p.name} · ${p.age ?? ''}</h3>
    <div class="sub">${p.city ?? ''} · ${p.role ?? ''} · ${p.gender ?? ''}${p.isProfessor?' · Profesor':''}</div>
    <p style="opacity:.85">${p.bio ?? ''}</p>
    <div class="chips" style="margin:8px 0 10px">${(p.tags||[]).map(t=>`<span class="chip">${t}</span>`).join('')}</div>
    <ul class="kv" aria-label="Ficha de ${p.name}">
      <li><span>Nombre</span><b>${p.name ?? '-'}</b></li>
      <li><span>Usuario</span><b>${p.username ?? '-'}</b></li>
      <li><span>Signo</span><b>${p.sign ?? '-'}</b></li>
      <li><span>Edad</span><b>${p.age ?? '-'}</b></li>
      <li><span>Carrera</span><b>${p.career ?? '-'}</b></li>
      <li><span>Estado civil</span><b>${p.status ?? '-'}</b></li>
      <li><span>Meta en la vida</span><b>${p.goal ?? '-'}</b></li>
      <li><span>Comida favorita</span><b>${p.favFood ?? '-'}</b></li>
      <li><span>Qué busca</span><b>${(p.seeks&&p.seeks.length)? p.seeks.join(', ') : '-'}</b></li>
    </ul>
  `;

  updateCarousel();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  // Accesibilidad: foco inicial y navegación con teclado (← → Esc)
  perfilDialog.focus();
  modalKbHandler = (e)=>{
    if(modal.classList.contains('active')){
      if(e.key==='Escape'){ closeProfile(); }
      if(carPhotos.length>1 && e.key==='ArrowRight'){ carIndex=(carIndex+1)%carPhotos.length; updateCarousel(); }
      if(carPhotos.length>1 && e.key==='ArrowLeft'){ carIndex=(carIndex-1+carPhotos.length)%carPhotos.length; updateCarousel(); }
    }
  };
  window.addEventListener('keydown', modalKbHandler);
}
function closeProfile(){
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden','true');
  if(modalKbHandler){ window.removeEventListener('keydown', modalKbHandler); modalKbHandler=null; }
}
modalBackdrop.addEventListener('click', closeProfile);
modalClose.addEventListener('click', closeProfile);

function updateCarousel(){
  const w = $('.carousel').clientWidth;
  carTrack.style.transform = `translateX(${-carIndex*w}px)`;
  $$('.carousel-dots .dot').forEach((d,i)=> d.classList.toggle('active', i===carIndex));
}
carPrev.addEventListener('click', ()=>{ carIndex = (carIndex-1+carPhotos.length)%carPhotos.length; updateCarousel(); });
carNext.addEventListener('click', ()=>{ carIndex = (carIndex+1)%carPhotos.length; updateCarousel(); });
carDots.addEventListener('click', (e)=>{ const d=e.target.closest('.dot'); if(!d) return; carIndex = +d.dataset.i; updateCarousel(); });

// Swipe (touch)
(function swipe(){
  const root = $('.carousel');
  let sx=0, dx=0, moving=false;
  root.addEventListener('touchstart', (e)=>{ sx=e.touches[0].clientX; moving=true; });
  root.addEventListener('touchmove',  (e)=>{ if(!moving) return; dx = e.touches[0].clientX - sx; });
  root.addEventListener('touchend',   ()=>{ if(!moving) return; moving=false; if(Math.abs(dx)>40){ if(dx<0) carIndex=(carIndex+1)%carPhotos.length; else carIndex=(carIndex-1+carPhotos.length)%carPhotos.length; updateCarousel(); } dx=0; });
})();

/* ---------- ACTIVIDADES + QUIZ en modal ---------- */
const actGrid = $('#actGrid');
function renderActivities(){
  actGrid.innerHTML = ACTIVITIES.map(a=>`
    <article class="act-card" data-id="${a.id}" aria-label="${a.title}">
      <span class="cta">Abrir quiz</span>
      <img src="${a.cover}" alt="${a.title}" />
      <div class="topics">${(a.q||[]).map((_,i)=>`<span class="pill mini">P${i+1}</span>`).join('')}</div>
      <div class="title">${a.icon||''} ${a.title}</div>
    </article>
  `).join('');
}
renderActivities();

const quizModal = $('#quizModal');
const quizBackdrop = $('#quizBackdrop');
const quizClose = $('#quizClose');
const quizCard = $('#quizCard');

let quizState = { a:null, i:0, ok:0, ans:0 };

function openQuiz(actId){
  const a = ACTIVITIES.find(x=>x.id===actId); if(!a) return;
  quizState = { a:actId, i:0, ok:0, ans:0 };
  renderQuiz();
  quizModal.classList.add('active');
  quizModal.setAttribute('aria-hidden','false');
}
function closeQuiz(){
  quizModal.classList.remove('active');
  quizModal.setAttribute('aria-hidden','true');
}
quizBackdrop.addEventListener('click', closeQuiz);
quizClose.addEventListener('click', closeQuiz);

function renderQuiz(){
  const a = ACTIVITIES.find(x=>x.id===quizState.a);
  const q = a.q[quizState.i];
  const total = a.q.length;
  const wrong = Math.max(0, quizState.ans - quizState.ok);
  const left  = Math.max(0, total - quizState.ans);

  const group = `q-${a.id}`;
  quizCard.innerHTML = `
    <div class="qf-top">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="level">${a.title}</span>
        <span class="pill">Quiz</span>
      </div>
      <div class="score">
        <div class="cell">✔ <span class="v">${quizState.ok}</span></div>
        <div class="cell">✖ <span class="v">${wrong}</span></div>
        <div class="cell">⧗ <span class="v">${left}</span></div>
        <div class="cell">Q <span class="v">${quizState.i+1}/${total}</span></div>
      </div>
    </div>
    <div class="qf-q">${q.q}</div>
    ${q.opts.map((t,k)=>`
      <label class="qf-opt"><input type="radio" name="${group}" value="${k}"> <span>${t}</span></label>
    `).join('')}
    <div class="qf-actions">
      <button class="btn" id="qPrev" ${quizState.i===0?'disabled':''}>← Anterior</button>
      <button class="btn btn-cta" id="qNext">${quizState.i===total-1?'Finalizar →':'Siguiente →'}</button>
    </div>
  `;

  $('#qPrev', quizCard)?.addEventListener('click', ()=>{
    if(quizState.i>0){ quizState.i--; renderQuiz(); }
  });

  $('#qNext', quizCard)?.addEventListener('click', ()=>{
    const picked = Array.from(quizCard.querySelectorAll(`input[name='${group}']`)).find(e=>e.checked);
    if(!picked){ toast('Elige una opción'); return; }
    const sel = parseInt(picked.value,10);
    quizState.ans++;
    if(sel===q.ok) quizState.ok++;

    if(quizState.i < total-1){ quizState.i++; renderQuiz(); }
    else {
      const pct = Math.round((quizState.ok/quizState.ans)*100);
      quizCard.innerHTML = `
        <div class="qf-top">
          <div style="display:flex;align-items:center;gap:10px">
            <span class="level">${a.title}</span>
            <span class="pill">Resultado</span>
          </div>
        </div>
        <div class="qf-q">Puntaje final: <b>${pct}%</b> (✔ ${quizState.ok} · ✖ ${quizState.ans-quizState.ok})</div>
        <div class="qf-actions">
          <button class="btn" id="qAgain">Reintentar</button>
          <button class="btn btn-cta" id="qClose">Cerrar</button>
        </div>
      `;
      $('#qAgain').addEventListener('click', ()=>{ quizState.i=0; quizState.ok=0; quizState.ans=0; renderQuiz(); });
      $('#qClose').addEventListener('click', closeQuiz);
    }
  });
}

actGrid.addEventListener('click', (e)=>{
  const card = e.target.closest('.act-card'); if(!card) return;
  openQuiz(card.dataset.id);
});

/* ---------- Navegación hash ---------- */
function handleHash(){
  const r = parseHash();
  if(r.name==='perfil'){ openProfile(r.query.id); }
  if(r.name==='actividad'){ openQuiz(r.query.id); }
  if(r.name==='corrupcion'){ corruptionOpen(); }
}
window.addEventListener('hashchange', handleHash);

/* ---------- INIT ---------- */
function init(){
  renderDeck();
  renderParticipants();
  handleHash();
  // Smooth scroll + Corrupción
  $$('.nav a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el){
          el.removeAttribute?.('hidden'); // no ocultamos otras secciones
          el.scrollIntoView({behavior:'smooth'});
          if(href==='#corrupcion'){ corruptionOpen(); }
        }
      }
    });
  });

  // Idempotente: click directo en el nuevo nav (por si el selector de arriba cambia)
  document.getElementById('nav-corrupcion')?.addEventListener('click', (e)=>{
    const href = e.currentTarget.getAttribute('href');
    if(href==='#corrupcion'){ e.preventDefault(); corruptionOpen(); document.getElementById('corrupcion')?.scrollIntoView({behavior:'smooth'}); }
  });
}
init();

/* ==========================================================
   START: corruption-block (logic)
   ========================================================== */
const corruptionReportUrl = "assets/docs/peru-vs-mexico.json"; // opcional (si lo subes)
const corruptionDocxUrl   = "https://github.com/GESU2020/Tinder_Roblox/raw/refs/heads/main/assets/downloads/Peru%20vs%20Mexico_Daira.docx";

let corruptionLoaded = false;

function corruptionOpen(){
  // Mostrar sección (sin ocultar otras)
  const sec = document.getElementById('corrupcion');
  if(sec?.hasAttribute('hidden')) sec.removeAttribute('hidden');

  // SEO básico
  try {
    document.title = 'Corrupción · Perú vs. México — Roblinder';
    let meta = document.querySelector('meta[name="description"]');
    if(!meta){
      meta = document.createElement('meta');
      meta.setAttribute('name','description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content','Análisis de la problemática social y comparativa Perú vs. México: dimensiones, sesiones S9–S11, perspectivas teóricas, estrategias y referencias bibliográficas.');
  } catch(_){}

  // Botón de descarga → DOCX de Daira
  const a = document.getElementById('corrupcion-download');
  if(a) a.href = corruptionDocxUrl;

  // Cargar solo una vez
  if(corrosionAlreadyDone()) return; // typo defensivo
  if(corruptionLoaded) return;

  corruptionLoad().then((json)=>{
    corruptionLoaded = true;
    const mount = document.getElementById('corrupcion-content');
    corruptionRender(json, mount);
    // Autor
    const author = (json && (json.author || json.integrante)) || '—';
    const sp = document.getElementById('corrupcion-author');
    if(sp) sp.textContent = `Integrante: ${author}`;
  }).catch(()=>{
    const mount = document.getElementById('corrupcion-content');
    if(mount){
      mount.innerHTML = `<p>No se pudo cargar el informe. Puedes descargar el DOCX y volver a intentar.</p>`;
    }
  });
}
function corrosionAlreadyDone(){ return corruptionLoaded; } // idempotencia defensiva

async function corruptionLoad(){
  // 1) Si existe window.CORRUPTION_REPORT, úsalo
  if(window.CORRUPTION_REPORT) return window.CORRUPTION_REPORT;

  // 2) Intenta JSON externo
  try{
    const r = await fetch(corruptionReportUrl, {cache:'no-store'});
    if(r.ok){
      const j = await r.json();
      if(j && Array.isArray(j.sections)) return j;
    }
  }catch(_){}

  // 3) Fallback mínimo con secciones requeridas (basado en el DOCX)
  return {
    author: "Daira Gabriela Cano Velasco",
    sections: [
      {type:"h2", text:"Descripción de la problemática social"},
      {type:"p", text:"La corrupción en la gestión pública afecta el desarrollo sostenible, la confianza institucional y la equidad. En Perú, evidencia reciente sugiere que normalizar la corrupción aumenta la disposición individual a sobornar; en México, la percepción de corrupción reduce el apoyo ciudadano a políticas públicas."},
      {type:"h2", text:"Clasificación por dimensiones (histórica, política, económica, social)"},
      {type:"ul", items:[
        "Histórica: inestabilidad institucional y redes clientelares de larga data.",
        "Política: baja rendición de cuentas y captura de instituciones.",
        "Económica: sobrecostos, ineficiencia y menor inversión.",
        "Social: tolerancia a prácticas informales y desconfianza generalizada."
      ]},
      {type:"h2", text:"Relación con actividades sincrónicas (S9–S11)"},
      {type:"p", text:"S9 (Modelos económicos): la corrupción distorsiona mercados y competitividad. S10 (Desigualdad): profundiza brechas y privilegios. S11 (Migraciones): alienta movilidad por pérdida de oportunidades y confianza."},
      {type:"h2", text:"Análisis de perspectivas teóricas"},
      {type:"table", headers:["Autor/a","Año","Postura / Enfoque principal","Limitaciones"], rows:[
        ["Incio & Seifert","2024","Percepción de corrupción ↑ → mayor propensión a sobornar (normas sociales)","Enfoque principalmente urbano; faltan variables estructurales"],
        ["Davidović","2024","Percepción de corrupción ↓ confianza y ↓ apoyo a políticas (p.ej., impuestos ambientales)","Foco en políticas ambientales; faltan series longitudinales"]
      ]},
      {type:"h2", text:"Estrategias de acción"},
      {type:"table", headers:["Estrategia","Institución","Descripción","Pertinencia","Resultados"], rows:[
        ["Transparencia digital","SIP/Perú – SFP/México","Portales de datos abiertos y monitoreo","Alta","Menor discrecionalidad en contrataciones"],
        ["Profesionalización del servicio civil","SERVIR – INAP","Meritocracia y control de nepotismo","Alta","Mejora de eficiencia y confianza"],
        ["Educación ética y cívica","MINEDU – SEP","Campañas de valores e integridad","Media","Cambios actitudinales graduales"]
      ]},
      {type:"h2", text:"Referencias bibliográficas"},
      {type:"ref", text:"Davidović, D. (2024). Does corruption shape attitudes towards carbon taxes? Energy Research & Social Science, 108, 104838.", href:"https://doi.org/10.1016/j.erss.2024.104838"},
      {type:"ref", text:"Incio, J., & Seifert, M. (2024). How the perception of corruption shapes the willingness to bribe. International Journal of Public Opinion Research, 36(3), edae035.", href:"https://doi.org/10.1093/ijpor/edae035"}
    ]
  };
}

function corruptionRender(json, mountEl){
  if(!mountEl) return;
  const S = json?.sections || [];
  const frag = document.createDocumentFragment();

  const mk = (tag, attrs={}, html='')=>{
    const n = document.createElement(tag);
    for(const k in attrs) n.setAttribute(k, attrs[k]);
    if(html) n.innerHTML = html;
    return n;
  };
  const esc = (s)=> (s||'').replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));

  const linkifyDOI = (txt)=>{
    if(!txt) return '';
    return txt.replace(/\b(10\.\d{4,9}\/[^\s"']+)\b/gi, (m)=> `<a data-doi target="_blank" rel="noopener" href="https://doi.org/${m}">${m}</a>`);
  };

  // Limpia placeholder
  mountEl.innerHTML = '';

  // Recorre secciones
  S.forEach(node=>{
    if(node.type==='h2'){
      frag.appendChild(mk('h2',{}, esc(node.text)));
    } else if(node.type==='h3'){
      frag.appendChild(mk('h3',{}, esc(node.text)));
    } else if(node.type==='p'){
      const p = mk('p',{}, linkifyDOI(esc(node.text)));
      frag.appendChild(p);
    } else if(node.type==='blockquote'){
      const bq = mk('blockquote',{}, esc(node.text) + (node.cite? `<cite>${esc(node.cite)}</cite>`:''));
      frag.appendChild(bq);
    } else if(node.type==='ul'){
      const ul = mk('ul');
      (node.items||[]).forEach(it=>{
        const li = mk('li',{}, esc(it));
        ul.appendChild(li);
      });
      frag.appendChild(ul);
    } else if(node.type==='table'){
      const wrap = mk('div', {class:'corrupcion-table-wrapper'});
      const table = mk('table', {class:'corrupcion-table'});
      if(node.headers && node.headers.length){
        const thead = mk('thead');
        const tr = mk('tr');
        node.headers.forEach(h=> tr.appendChild(mk('th',{}, esc(h))));
        thead.appendChild(tr); table.appendChild(thead);
      }
      const tbody = mk('tbody');
      (node.rows||[]).forEach(row=>{
        const tr = mk('tr');
        row.forEach(cell=> tr.appendChild(mk('td',{}, esc(cell))));
        tbody.appendChild(tr);
      });
      table.appendChild(tbody); wrap.appendChild(table); frag.appendChild(wrap);
    } else if(node.type==='ref'){
      const p = mk('p');
      const t = esc(node.text||'');
      if(node.href){
        const a = mk('a', {href:node.href, target:'_blank', rel:'noopener', 'data-doi':''}, esc(node.href));
        p.innerHTML = `${t} `;
        p.appendChild(a);
      } else {
        p.textContent = t;
      }
      frag.appendChild(p);
    }
  });

  mountEl.appendChild(frag);
}
/* ==========================================================
   END: corruption-block (logic)
   ========================================================== */
