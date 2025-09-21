/* =========================
   Roblinder · App (Vanilla JS)
   ========================= */

/* ---------- Fondo dinámico (cubos/partículas Roblox) ----------- */
(function bg(){
  const c = document.getElementById('bgParticles');
  const ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();

  const cubes = Array.from({length: 48}).map(()=>({
    x: Math.random()*c.width,
    y: Math.random()*c.height,
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
      ctx.save();
      ctx.translate(q.x,q.y);
      ctx.rotate(q.a);
      const g = ctx.createLinearGradient(-q.s,-q.s,q.s,q.s);
      g.addColorStop(0,'rgba(255,88,100,.18)');
      g.addColorStop(1,'rgba(123,145,255,.18)');
      ctx.fillStyle = g;
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.rect(-q.s, -q.s, q.s*2, q.s*2); ctx.fill(); ctx.stroke();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- Datos ---------- */
/* Cada participante puede tener 1 o 2 fotos:
   photos: [{label:'Real', url:'...'}, {label:'Roblox', url:'...'}]  */
const PEOPLE = [
  // Nazli -> nueva foto de mujer (clara y profesional)
  { id:'p1', name:'Nazli', gender:'Mujer', age:22, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Real',   url:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop'},
      {label:'Roblox', url:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop'}
    ],
    avatar:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=60&auto=format&fit=crop',
    tags:['Investigación','Redacción'], bio:'Le gusta el análisis y las entrevistas.',
    sign:'Libra', status:'Soltera', career:'-', goal:'-', favFood:'-', seeks:['Viajar','Café','Fotografía']
  },

  // Daira
  { id:'p2', name:'Daira', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Real',   url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_02_Daira.png'},
      {label:'Roblox', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_02_Daira.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_02_Daira.png',
    username:'leebitilin', sign:'Sagitario', career:'Medicina Humana', status:'Soltera',
    goal:'Ser una profesional exitosa y tener una familia estable',
    favFood:'Cheesecake de maracuyá',
    bio:'Holaaa, soy Daira :] Sagitario, 17, estudio Medicina Humana. User roblox: leebitilin. Meta: éxito y familia estable. Soltera 😝',
    seeks:['Honestidad','Lealtad','Compromiso'],
    tags:['Diseño','UI'], likes:['Diseño','Museos','Correr']
  },

  // Gesú (imagen nueva + alt especial en deck)
  { id:'p3', name:'Gesú', gender:'Hombre', age:20, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Real',   url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/Imagen_03_Gesu.png'},
      {label:'Roblox', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/Imagen_03_Gesu.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/Imagen_03_Gesu.png',
    username:'Nova', sign:'Aries',
    career:'Ingeniería Empresarial de Sistemas (UCSUR)', status:'Soltero',
    goal:'Emprender mi propio negocio',
    favFood:'Ceviche y té de orines verdes',
    bio:'"Soy Nova, me apasiona la tecnología y el mundo empresarial. Valoro la lealtad, el respeto y el esfuerzo."',
    seeks:['Lealtad','Valores','Respeto a sí misma','Trabajar','Superación'],
    tags:['Datos','KPIs'], likes:['Tecnología','Ciclismo','Series']
  },

  // Pamela
  { id:'p4', name:'Pamela Cruz', gender:'Mujer', age:18, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Real',   url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_04_Pamela.png'},
      {label:'Roblox', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_04_Pamela.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_04_Pamela.png',
    username:'Imbelvr25', sign:'Tauro', career:'Medicina Humana', status:'Soltera',
    goal:'Tener mi propia clínica y ayudar a las personas con valores',
    favFood:'Ceviche',
    bio:'Pamela Cruz, Tauro, 18, Medicina Humana. User: Imbelvr25. Meta: clínica propia y ayudar con valores.',
    seeks:['Compañerismo','Amor','Respeto mutuo','Honestidad','Lealtad'],
    tags:['Documentación','Edición'], likes:['Lectura','Edición','Música']
  },

  // Abigail
  { id:'p5', name:'Abigail', gender:'Mujer', age:21, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Real',   url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_05_abigail.png'},
      {label:'Roblox', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_05_abigail.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_05_abigail.png',
    username:'Arroz con leche', sign:'Aries', career:'Enfermería', status:'Soltera',
    goal:'Ser feliz', favFood:'Pollo enrollado con salsa de champiñones',
    bio:'Abigail, Aries, 21, Enfermería. Usuario: Arroz con leche. Meta: Ser feliz.',
    seeks:['Compromiso','Lealtad','Trabajador','Superación'],
    tags:['Campo','Encuestas'], likes:['Encuestas','Voluntariado','Paseos']
  },

  { id:'p6', name:'María', gender:'Mujer', age:22, city:'Huancayo', role:'Participante',
    photos:[{label:'Real',url:'https://i.pravatar.cc/1000?img=30'}],
    avatar:'https://i.pravatar.cc/120?img=30',
    tags:['Storytelling','Video'], bio:'Produce clips y limpia audio.',
    sign:'Leo', status:'Soltera', career:'-', goal:'-', favFood:'-', seeks:['Video','Teatro','Mar']
  },

  // Sebastián (ACTUALIZADO con QR y biografía)
  { id:'p7', name:'Sebastián', gender:'Hombre', age:18, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Real',   url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/foto_sebastian.png'},
      {label:'Roblox', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/foto_sebastian.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/foto_sebastian.png',
    username:'Chabazzzx', sign:'Cáncer', career:'Medicina Humana', status:'Soltero',
    goal:'Graduarme, comprarme una casa y un carro', favFood:'Lomo Saltado',
    bio:'Soy Sebastián. Me gusta el humor directo y las metas claras. Estoy enfocado en Medicina Humana y en construir mi camino paso a paso. Busco alguien auténtica que disfrute mi humor y tenga compromiso.',
    seeks:['Ser mujer','Fidelidad','Entender mi humor','Celosa','Estar viva (opcional)'],
    qrData:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/foto_sebastian.png',
    tags:['Fullstack','Automatización'], likes:['Código','Automatización','Fútbol']
  },

  // Astrid
  { id:'p8', name:'Astrid', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Real',   url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_08_astrid.png'},
      {label:'Roblox', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_08_astrid.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_08_astrid.png',
    username:'Lynettd_2', sign:'Aries', career:'Medicina (Universidad Científica del Sur)',
    status:'En relación', goal:'Tener una familia estable', favFood:'Arroz tapado',
    bio:'Soy Astrid, estudio Medicina en la UCSur. User Roblox: Lynettd_2. Meta: familia estable.',
    seeks:['Respeto','Honestidad','Metas claras'],
    tags:['Ilustración','Branding'], likes:['Ilustración','Cine','Viajar']
  },

  // Zulma
  { id:'p9', name:'Zulma', gender:'Mujer', age:19, city:'Huancayo', role:'Participante',
    photos:[
      {label:'Real',   url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_09_Zulma.png'},
      {label:'Roblox', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_09_Zulma.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_09_Zulma.png',
    username:'Zulma_RXJNombre', sign:'Leo', career:'Medicina Humana', status:'Soltera',
    goal:'Ser médico cirujano, investigar patologías y ayudar a mis hermanos',
    favFood:'Ceviche',
    bio:'Zulma, Leo, 19, Medicina Humana. Meta: ser cirujano e investigar patologías.',
    seeks:['Respeto','Lealtad','Compromiso','Valores'],
    tags:['Planificación','Control'], likes:['Planificación','Cocina','Ajedrez']
  },

  // Profesor
  { id:'prof', name:'Victor Andres Mendoza Guerra', gender:'Hombre', age:35, city:'Lima', role:'Profesor',
    photos:[
      {label:'Real',   url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_10_profesor.png'},
      {label:'Roblox', url:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_10_profesor.png'}
    ],
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_10_profesor.png',
    isProfessor:true,
    username:'—', sign:'—', career:'Abogado (PUCP). Especialista en Derecho Laboral y Seguridad Social.',
    status:'—', goal:'Gestión de relaciones laborales y resolución de conflictos.', favFood:'—',
    bio:'Abogado PUCP. Máster y Segunda Especialidad. Curso Internacional (Univ. Salamanca). Gerente RL en Valtx. Árbitro laboral. Docente en USMP y UCSur.',
    seeks:['Respeto','Profesionalismo','Ética'],
    tags:['Supervisión','Feedback'], likes:['Docencia','Café','Libros']
  }
];

/* Actividades (todas desbloqueadas) */
const ACTIVITIES = [
  { id:'a1', title:'Cambios y permanencia',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/primer-congreso.jpg',
    desc:'Explora procesos históricos donde algunas estructuras cambian y otras permanecen.',
    icon:'📜',
    q:[
      {q:'¿Qué define mejor un “cambio”?', opts:['Continuidad de prácticas','Transformación de estructuras o prácticas','Repetición de ciclos'], ok:1},
      {q:'Para analizar un cambio debes ubicar…', opts:['Solo quién lo impulsó','Qué cambió, cuándo y por qué','Solo el impacto económico'], ok:1},
      {q:'Un ejemplo típico de cambio sería…', opts:['Mismos procedimientos','Nueva ley que reemplaza un marco anterior','Costumbres inalteradas'], ok:1},
    ]
  },
  { id:'a2', title:'Autoritarismo y democracia',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/velasco_alvarado.jpg',
    desc:'Compara rasgos, instituciones y consecuencias de ambos regímenes.',
    icon:'⚖️',
    q:[
      {q:'Rasgo típico del autoritarismo:', opts:['Elecciones libres','Concentración de poder y control de prensa','Pluralismo fortalecido'], ok:1},
      {q:'La democracia se sostiene en…', opts:['Eliminación del Congreso','Separación de poderes y derechos','Gobierno de facto'], ok:1},
      {q:'Controlar medios y justicia es propio de…', opts:['Régimen autoritario','Democracia consolidada','Monarquía parlamentaria'], ok:0},
    ]
  },
  { id:'a3', title:'Períodos de bonanza',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/PeriodicoUNAL-061022-01am01.jpg',
    desc:'Identifica ciclos de crecimiento y sus factores.',
    icon:'📈',
    q:[
      {q:'Disparador típico de bonanza:', opts:['Caída exportadora','Alza de precios/volumen de exportación','Menor demanda externa'], ok:1},
      {q:'Sectores que suelen acelerarse:', opts:['Construcción y servicios','Solo agricultura subsistente','Todos caen'], ok:0},
      {q:'Política prudente:', opts:['Gasto procíclico','Fondo de estabilización y reglas fiscales','Eliminar reglas macro'], ok:1},
    ]
  },
  { id:'a4', title:'Terrorismo',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/fotomarcha2carrusel-scaled.jpg',
    desc:'Analiza causas, impactos y respuestas estatales y sociales.',
    icon:'🛡️',
    q:[
      {q:'Actor subversivo principal (1980–2000):', opts:['Sendero Luminoso','FAP','Defensoría'], ok:0},
      {q:'Impacto recurrente:', opts:['Vacaciones largas','Desplazamientos forzados','Mayor inversión cultural inmediata'], ok:1},
      {q:'Política pública clave para víctimas:', opts:['Ignorar testimonios','Plan Integral de Reparaciones','Aumentar aranceles'], ok:1},
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
  const alt = (p.id==='p3') ? 'Gesú - participante' : (p.name || 'Participante');
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
    const alt = (p.id==='p3') ? 'Gesú - participante' : (p.name || 'Participante');
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

/* ---------- MODAL PERFIL + CAROUSEL + QR ---------- */
const modal = $('#perfilModal');
const modalBackdrop = $('#modalBackdrop');
const modalClose = $('#modalClose');
const carTrack = $('#carTrack');
const carDots = $('#carDots');
const carPrev = $('#carPrev');
const carNext = $('#carNext');
const profileSheet = $('#profileSheet');
let carIndex = 0, carPhotos = [], currentPerson = null;

function openProfile(id){
  const p = PEOPLE.find(x=>x.id===id); if(!p) return;
  currentPerson = p;

  // Fotos (si solo tiene 1, se duplica para navegación)
  carPhotos = (p.photos && p.photos.length) ? p.photos : [{label:'Foto', url:p.avatar}];
  if(carPhotos.length===1) carPhotos = [carPhotos[0], carPhotos[0]];
  carIndex = 0;

  carTrack.innerHTML = carPhotos.map(ph=>`
    <div class="carousel-slide">
      <img src="${ph.url}" alt="${p.name} (${ph.label})">
    </div>
  `).join('');
  carDots.innerHTML = carPhotos.map((_,i)=>`<span class="dot ${i===0?'active':''}" data-i="${i}"></span>`).join('');

  // QR (solo si p.qrData)
  const qrHTML = p.qrData ? `
    <div class="qr-box">
      <div style="font-weight:800;margin-bottom:6px">QR</div>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(p.qrData)}" alt="QR de ${p.name}" width="220" height="220" />
      <div style="opacity:.8;margin-top:6px;font-size:12px;word-break:break-all">${p.qrData}</div>
    </div>
  ` : '';

  profileSheet.innerHTML = `
    <div class="name">${p.name} · ${p.age ?? ''}</div>
    <div class="sub">${p.city ?? ''} · ${p.role ?? ''} · ${p.gender ?? ''}${p.isProfessor?' · Profesor':''}</div>
    <p style="opacity:.85">${p.bio ?? ''}</p>
    <div class="chips" style="margin:8px 0 10px">${(p.tags||[]).map(t=>`<span class="chip">${t}</span>`).join('')}</div>
    <ul class="kv">
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
    ${qrHTML}
  `;

  updateCarousel();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}
function closeProfile(){
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden','true');
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

/* ---------- ACTIVIDADES (TODAS DESBLOQUEADAS) + QUIZ MODAL ---------- */
const actGrid = $('#actGrid');
function renderActivities(){
  actGrid.innerHTML = ACTIVITIES.map(a=>`
    <article class="act-card" data-id="${a.id}">
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

/* ---------- Navegación hash básica ---------- */
function handleHash(){
  const r = parseHash();
  if(r.name==='perfil'){ openProfile(r.query.id); }
  if(r.name==='actividad'){ openQuiz(r.query.id); }
}
window.addEventListener('hashchange', handleHash);

/* ---------- INIT ---------- */
function renderDots(){ dotsEl.innerHTML = PEOPLE.map((_,i)=>`<span class="dot ${i===deckIdx?'active':''}"></span>`).join(''); }
function init(){
  renderDeck();
  renderParticipants();
  handleHash();
  // Smooth scroll
  $$('.nav a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth'});
      }
    });
  });
}
init();
