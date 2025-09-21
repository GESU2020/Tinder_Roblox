/* =========================
   Roblinder · App (Vanilla JS)
   ========================= */

/* ====== PARTICULAS / fondo dinámico (cubos estilo Roblox) ====== */
(function bg(){
  const c = document.getElementById('bgParticles');
  const ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();

  const cubes = Array.from({length: 50}).map(()=>({
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
      ctx.beginPath();
      ctx.rect(-q.s, -q.s, q.s*2, q.s*2);
      ctx.fill(); ctx.stroke();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ====== Datos (PEOPLE con modelo de Astrid y FOTOS NUEVAS) ====== */
const PEOPLE = [
  { id:'p1', name:'Nazli', gender:'Mujer', age:22, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=12', avatar:'https://i.pravatar.cc/120?img=12',
    tags:['Investigación','Redacción'], bio:'Le gusta el análisis y las entrevistas.',
    sign:'Libra', status:'Soltera', likes:['Viajar','Café','Fotografía']
  },

  // Gabriela -> Daira (con imagen nueva)
  { id:'p2', name:'Daira', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    img:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_02_Daira.png',
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_02_Daira.png',
    username:'leebitilin', sign:'Sagitario', career:'Medicina Humana', status:'Soltera',
    goal:'Ser una profesional exitosa y tener una familia estable',
    favFood:'Cheesecake de maracuyá',
    bio:'Holaaa, soy Daira :] Sagitario, 17, estudio Medicina Humana. User roblox: leebitilin. Meta: ser profesional exitosa y familia estable. Soltera 😝',
    seeks:['Honestidad','Lealtad','Compromiso'],
    tags:['Diseño','UI'], likes:['Diseño','Museos','Correr']
  },

  // Gesú -> Nova (modelo Astrid)
  { id:'p3', name:'Gesú', gender:'Hombre', age:20, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=3', avatar:'https://i.pravatar.cc/120?img=3',
    username:'Nova', sign:'Aries',
    career:'Ingeniería Empresarial de Sistemas (UCSUR)', status:'Soltero',
    goal:'Emprender mi propio negocio',
    favFood:'Ceviche y té de orines verdes',
    bio:'"Soy Nova, me apasiona la tecnología y el mundo empresarial. Valoro la lealtad, el respeto y el esfuerzo por salir adelante."',
    seeks:['Lealtad','Valores','Respeto a sí misma','Trabajar','Superación'],
    tags:['Datos','KPIs'], likes:['Tecnología','Ciclismo','Series']
  },

  // Neji -> Pamela (con imagen nueva)
  { id:'p4', name:'Pamela Cruz', gender:'Mujer', age:18, city:'Huancayo', role:'Participante',
    img:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_04_Pamela.png',
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_04_Pamela.png',
    username:'Imbelvr25', sign:'Tauro', career:'Medicina Humana', status:'Soltera',
    goal:'Tener mi propia clínica y ayudar a las personas con valores',
    favFood:'Ceviche',
    bio:'Pamela Cruz, Tauro, 18, Medicina Humana. User: Imbelvr25. Meta: clínica propia y ayudar con valores. Soltera.',
    seeks:['Compañerismo','Amor','Respeto mutuo','Honestidad','Lealtad'],
    tags:['Documentación','Edición'], likes:['Lectura','Edición','Música']
  },

  // Abigail (con imagen nueva)
  { id:'p5', name:'Abigail', gender:'Mujer', age:21, city:'Huancayo', role:'Participante',
    img:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_05_abigail.png',
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_05_abigail.png',
    username:'Arroz con leche', sign:'Aries', career:'Enfermería', status:'Soltera',
    goal:'Ser feliz',
    favFood:'Pollo enrollado con salsa de champiñones',
    bio:'Abigail, Aries, 21, Enfermería. Usuario: Arroz con leche. Meta: Ser feliz.',
    seeks:['Compromiso','Lealtad','Trabajador','Superación'],
    tags:['Campo','Encuestas'], likes:['Encuestas','Voluntariado','Paseos']
  },

  { id:'p6', name:'María', gender:'Mujer', age:22, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=30', avatar:'https://i.pravatar.cc/120?img=30',
    tags:['Storytelling','Video'], bio:'Produce clips y limpia audio.',
    sign:'Leo', status:'Soltera', likes:['Video','Teatro','Mar']
  },

  { id:'p7', name:'Sebastián', gender:'Hombre', age:23, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=55', avatar:'https://i.pravatar.cc/120?img=55',
    tags:['Fullstack','Automatización'], bio:'Integra herramientas y automatiza flujos.',
    sign:'Capricornio', status:'Soltero', likes:['Código','Automatización','Fútbol']
  },

  // Astrid (con imagen nueva)
  { id:'p8', name:'Astrid', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    img:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_08_astrid.png',
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_08_astrid.png',
    username:'Lynettd_2', sign:'Aries', career:'Medicina (Universidad Científica del Sur)',
    status:'En relación', goal:'Tener una familia estable', favFood:'Arroz tapado',
    bio:'Soy Astrid, estudio Medicina en la UCSur. User Roblox: Lynettd_2. Mi meta es tener una familia estable.',
    seeks:['Respeto','Honestidad','Metas claras'],
    tags:['Ilustración','Branding'], likes:['Ilustración','Cine','Viajar']
  },

  // Zulma (con imagen nueva)
  { id:'p9', name:'Zulma', gender:'Mujer', age:19, city:'Huancayo', role:'Participante',
    img:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_09_Zulma.png',
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_09_Zulma.png',
    username:'Zulma_RXJNombre', sign:'Leo', career:'Medicina Humana', status:'Soltera',
    goal:'Ser médico cirujano, investigar patologías y ayudar a mis hermanos',
    favFood:'Ceviche',
    bio:'Zulma, Leo, 19, Medicina Humana. Meta: ser cirujano e investigar patologías.',
    seeks:['Respeto','Lealtad','Compromiso','Valores'],
    tags:['Planificación','Control'], likes:['Planificación','Cocina','Ajedrez']
  },

  // Profesor (con imagen nueva)
  { id:'prof', name:'Victor Andres Mendoza Guerra', gender:'Hombre', age:35, city:'Lima', role:'Profesor',
    img:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_10_profesor.png',
    avatar:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/imagen_10_profesor.png',
    isProfessor:true,
    username:'—', sign:'—', career:'Abogado (PUCP). Especialista en Derecho Laboral y Seguridad Social.',
    status:'—', goal:'Gestión de relaciones laborales y resolución de conflictos.', favFood:'—',
    bio:'Abogado PUCP. Máster y Segunda Especialidad en Derecho del Trabajo y Seguridad Social. Curso Internacional (Universidad de Salamanca). Gerente de Relaciones Laborales en Valtx y Árbitro Laboral. Docente en USMP y UCSur.',
    seeks:['Respeto','Profesionalismo','Ética'],
    tags:['Supervisión','Feedback'], likes:['Docencia','Café','Libros']
  }
];

/* Actividades (con IMÁGENES NUEVAS) */
const ACTIVITIES = [
  { id:'a1', title:'Cambios y permanencia',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/primer-congreso.jpg',
    desc:'Explora procesos históricos donde algunas estructuras cambian y otras permanecen.',
    icon:'📜', choices:['Economía','Sociedad','Política','Cultura']
  },
  { id:'a2', title:'Autoritarismo y democracia',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/velasco_alvarado.jpg',
    desc:'Compara rasgos, instituciones y consecuencias de ambos regímenes.',
    icon:'⚖️', choices:['Instituciones','Derechos','Participación','Prensa']
  },
  { id:'a3', title:'Períodos de bonanza',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/PeriodicoUNAL-061022-01am01.jpg',
    desc:'Identifica ciclos de crecimiento y sus factores.',
    icon:'📈', choices:['Exportaciones','Inversión','Empleo','Inflación']
  },
  { id:'a4', title:'Terrorismo',
    cover:'https://raw.githubusercontent.com/GESU2020/Tinder_Roblox/refs/heads/main/fotomarcha2carrusel-scaled.jpg',
    desc:'Analiza causas, impactos y respuestas estatales y sociales.',
    icon:'🛡️', choices:['Causas','Impacto','Respuesta','Memoria']
  }
];

/* ====== Estado bloqueos ====== */
const lockKey = 'activities_locks_v1';
function loadLocks(){ try{ return JSON.parse(localStorage.getItem(lockKey)) || {unlocked:['a1'], passed:[]}; }catch{ return {unlocked:['a1'], passed:[]}; } }
function saveLocks(s){ localStorage.setItem(lockKey, JSON.stringify(s)); }
function isUnlocked(id){ return loadLocks().unlocked.includes(id); }
function markPassed(id){ const s=loadLocks(); if(!s.passed.includes(id)) s.passed.push(id); saveLocks(s); }
function unlockNext(currentId){
  const order=['a1','a2','a3','a4']; const i=order.indexOf(currentId);
  if(i>-1 && i<order.length-1){ const s=loadLocks(); const next=order[i+1]; if(!s.unlocked.includes(next)){ s.unlocked.push(next); saveLocks(s);} }
}

/* ====== Utils ====== */
function $(sel){ return document.querySelector(sel); }
function el(tag, attrs={}, html=''){ const n=document.createElement(tag); Object.entries(attrs).forEach(([k,v])=> n.setAttribute(k, v)); if(html!=='' && html!=null) n.innerHTML = html; return n; }
function toast(msg){ const t=el('div',{class:'toast'}); t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 2000); }

/* ====== Router ====== */
function parseRoute(){
  const h = (location.hash||'').replace(/^#/,'');
  if(!h) return {name:'', query:{}};
  const [name,q] = h.split('?'); const query = {}; if(q){ new URLSearchParams(q).forEach((v,k)=> query[k]=v); }
  return {name, query};
}





/* ====== Deck ====== */
let deckIdx = 0;
const deckShell = $('#deckShell'), dotsEl = $('#dots');
function renderDots(){ dotsEl.innerHTML = PEOPLE.map((_,i)=>`<span class="dot ${i===deckIdx?'active':''}"></span>`).join(''); }
function renderDeck(){
  const p = PEOPLE[deckIdx]; if(!p) return;
  deckShell.querySelectorAll('.deck-card').forEach(n=>n.remove());
  const card = el('article', {class:`deck-card ${p.isProfessor?'pro-gold':''}`});
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}" />
    <div class="badge like" id="badgeLike">LIKE</div>
    <div class="badge nope" id="badgeNope">NOPE</div>
    <div class="deck-meta">
      <div class="deck-name">${p.name} · ${p.age ?? ''}</div>
      <div class="deck-sub">${p.city ?? ''} · ${p.role ?? ''} · ${p.gender ?? ''}${p.isProfessor?' · <span class="p-badge">Profesor</span>':''}</div>
      <div class="deck-tags">${(p.tags||[]).map(t=>`<span class='pill'>${t}</span>`).join('')}</div>
    </div>`;
  card.addEventListener('click', ()=> openProfile());
  deckShell.appendChild(card);
  renderDots();
}
function next(){ deckIdx = (deckIdx+1) % PEOPLE.length; renderDeck(); }
function prev(){ deckIdx = (deckIdx-1+PEOPLE.length) % PEOPLE.length; renderDeck(); }
function openProfile(){ location.hash = `perfil?id=${PEOPLE[deckIdx].id}`; }
function flash(type){
  const id = (type==='like')? '#badgeLike': '#badgeNope';
  const b = deckShell.querySelector(id); if(!b) return;
  b.style.opacity = 1; setTimeout(()=> b.style.opacity=0, 400);
}
$('#zoneRight').addEventListener('click', ()=>{ flash('like'); next(); });
$('#zoneLeft').addEventListener('click', ()=>{ flash('nope'); prev(); });
$('#btnLike').addEventListener('click', ()=>{ flash('like'); next(); });
$('#btnNope').addEventListener('click', ()=>{ flash('nope'); next(); });
$('#btnOpen').addEventListener('click', openProfile);
window.addEventListener('keydown', (e)=>{ if(e.key==='ArrowRight'){ flash('like'); next(); } if(e.key==='ArrowLeft'){ flash('nope'); prev(); } if(e.key==='Enter'){ openProfile(); } });

/* ====== Participantes ====== */
const peopleGrid = $('#peopleGrid');
function renderPeople(){
  peopleGrid.innerHTML = PEOPLE.map(p=>`
    <article class="p-card" data-id="${p.id}">
      <div class="avatar${p.isProfessor?' pro-gold':''}"><img src="${p.avatar}" alt="${p.name}" /></div>
      <div>
        <div class="name" style="font-weight:800">${p.name}${p.isProfessor?` <span class='p-badge'>Profesor</span>`:''}</div>
        <div style="color:var(--muted);font-size:13px">${p.city} · ${p.role} · ${p.gender}</div>
        <div class="chips" style="margin-top:8px">
          <span class="pill mini">Edad: ${p.age ?? '-'}</span>
          <span class="pill mini">Signo: ${p.sign ?? '-'}</span>
          <span class="pill mini">Carrera: ${p.career ?? '-'}</span>
          <span class="pill mini">Estado: ${p.status ?? '-'}</span>
          <span class="pill mini">Meta: ${p.goal ?? '-'}</span>
          <span class="pill mini">Comida fav: ${p.favFood ?? '-'}</span>
          <span class="pill mini">Busca: ${(p.seeks&&p.seeks.length)? p.seeks.join(', '): '-'}</span>
        </div>
      </div>
    </article>`).join('');
}
peopleGrid.addEventListener('click', (e)=>{
  const card = e.target.closest('.p-card'); if(!card) return;
  const p = PEOPLE.find(x=>x.id===card.dataset.id); if(!p) return;
  deckIdx = PEOPLE.indexOf(p); renderDeck(); location.hash = `perfil?id=${p.id}`;
});

/* ====== Perfil ====== */
const perfilSec  = $('#perfil');
const perfilWrap = $('#perfilWrap');
const perfilTitle= $('#perfilTitle');

function renderProfile(person){
  if(!person){ perfilSec.classList.remove('active'); perfilSec.style.display='none'; return; }
  perfilTitle.textContent = person.name;
  perfilWrap.innerHTML = `
    <article class="profile-card">
      <img src="${person.img}" alt="${person.name}" />
      <div class="profile-body">
        <div class="deck-name" style="font-size:22px; margin-bottom:6px">${person.name} · ${person.age ?? ''}</div>
        <div class="deck-sub">${person.city ?? ''} · ${person.role ?? ''} · ${person.gender ?? ''}${person.isProfessor?' · Profesor':''}</div>
        <p style="opacity:.85; margin-top:8px">${person.bio ?? ''}</p>
        <div class="chips" style="margin-top:10px">
          ${(person.tags||[]).map(t=>`<span class="chip">${t}</span>`).join('')}
        </div>
      </div>
    </article>
    <div class="profile-side">
      <div class="box" style="margin-bottom:12px">
        <h4 style="margin:0 0 8px">Presentación</h4>
        <ul class="kv">
          <li><span>Nombre</span><b>${person.name ?? '-'}</b></li>
          <li><span>Usuario</span><b>${person.username ?? '-'}</b></li>
          <li><span>Signo</span><b>${person.sign ?? '-'}</b></li>
          <li><span>Edad</span><b>${person.age ?? '-'}</b></li>
          <li><span>Carrera</span><b>${person.career ?? '-'}</b></li>
          <li><span>Estado civil</span><b>${person.status ?? '-'}</b></li>
          <li><span>Meta en la vida</span><b>${person.goal ?? '-'}</b></li>
          <li><span>Comida fav</span><b>${person.favFood ?? '-'}</b></li>
          <li><span>Intereses que “buscan” en una persona</span><b>${(person.seeks&&person.seeks.length)? person.seeks.join(', ') : '-'}</b></li>
        </ul>
      </div>
      <div class="box">
        <ul class="kv">
          <li><span>Signo</span><b>${person.sign ?? '-'}</b></li>
          <li><span>Estado</span><b>${person.status ?? '-'}</b></li>
          <li><span>Gustos</span><b>${(person.likes||[]).join(', ')}</b></li>
        </ul>
      </div>
    </div>`;
  perfilSec.classList.add('active'); perfilSec.style.display='block';
  perfilSec.scrollIntoView({behavior:'smooth', block:'start'});
}
function closeProfile(){ perfilSec.classList.remove('active'); perfilSec.style.display='none'; }

/* ====== Navegación hash ====== */
function handleRoute(){
  const r = parseRoute();
  if(r.name==='perfil'){
    const person = PEOPLE.find(p=>p.id===r.query.id); renderProfile(person);
  }else{ closeProfile(); }
  if(r.name==='actividad'){ openActivity(r.query.id); }
}
window.addEventListener('hashchange', handleRoute);





/* ====== Actividades ====== */
const actGrid     = $('#actGrid');
const actDetail   = $('#actDetail');     // A1
const actDetailA2 = $('#actDetailA2');   // A2
const actDetailA3 = $('#actDetailA3');   // A3
const actDetailA4 = $('#actDetailA4');   // A4

function renderActivities(){
  const locks = loadLocks();
  actGrid.innerHTML = ACTIVITIES.map(a=>{
    const unlocked = locks.unlocked.includes(a.id);
    return `
    <article class="act-card" data-id="${a.id}" data-locked="${unlocked?0:1}" title="${a.desc}">
      <span class="cta">${unlocked?'Elegir':'Bloqueado'}</span>
      ${unlocked?'':`<div class='lock-badge'>🔒 Bloqueado</div>`}
      <img src="${a.cover}" alt="${a.title}" />
      <div class="topics">${(a.choices||[]).map(c=>`<span class="pill mini">${c}</span>`).join('')}</div>
      <div class="title">${a.icon || ''} ${a.title}</div>
    </article>`;
  }).join('');
}
renderActivities();

actGrid.addEventListener('click', (e)=>{
  const card = e.target.closest('.act-card'); if(!card) return;
  const id = card.dataset.id;
  if(card.dataset.locked==='1'){ toast('🔒 Esta actividad está bloqueada.'); return; }
  location.hash = `actividad?id=${id}`;
});

function hideAllActivityDetails(){
  [actDetail, actDetailA2, actDetailA3, actDetailA4].forEach(n=>{ if(n){ n.style.display='none'; n.classList.remove('active'); } });
}

/* ====== Overlay Quiz ====== */
const qf = $('#quizFocus'), qfBg = $('#qfBg'), qfCard = $('#qfCard');
function showQuiz(){ qf.classList.add('active'); qf.style.display='block'; }
function hideQuiz(){ qf.classList.remove('active'); qf.style.display='none'; qfCard.innerHTML=''; }

/* ====== Game helpers ====== */
function makeGameStore(key, modules){
  function load(){ try{ const base={i:0, qi:0, ok:0, ans:0, total: modules.reduce((a,m)=>a+m.q.length,0)}; return Object.assign(base, JSON.parse(localStorage.getItem(key)||'{}')); }catch{ return {i:0, qi:0, ok:0, ans:0, total: modules.reduce((a,m)=>a+m.q.length,0)}; } }
  function save(s){ localStorage.setItem(key, JSON.stringify(s)); }
  return { load, save };
}

/* ====== Módulos de cada actividad (A1–A4) ====== */
const a1Modules = [
  { id:'m1', title:'Cambios', img:ACTIVITIES[0].cover,
    text:`Los <b>cambios</b> son transformaciones en estructuras, actores o prácticas.`,
    q:[
      {q:'¿Qué define mejor un “cambio”?', opts:['La continuidad de prácticas','La transformación de estructuras o prácticas','La repetición de ciclos'], ok:1},
      {q:'Para analizar un cambio debes ubicar…', opts:['Solo quién lo impulsó','Qué cambió, cuándo y por qué','Solo el impacto económico inmediato'], ok:1},
      {q:'Un ejemplo típico de cambio sería…', opts:['Mismos procedimientos por décadas','Nueva ley que reemplaza un marco anterior','Costumbres inalteradas'], ok:1},
    ],
    qbg:[ACTIVITIES[0].cover, ACTIVITIES[0].cover, ACTIVITIES[0].cover]
  },
  { id:'m2', title:'Permanencias', img:ACTIVITIES[0].cover,
    text:`Las <b>permanencias</b> son elementos que se mantienen pese a los cambios.`,
    q:[
      {q:'Una “permanencia” es…', opts:['Todo lo que cambia rápido','Lo que se mantiene a través del tiempo','Un fenómeno aleatorio'], ok:1},
      {q:'Ejemplo de permanencia:', opts:['Rotación anual de presidentes','Misma práctica cultural que persiste','Cambio de moneda cada mes'], ok:1},
      {q:'Sirven para…', opts:['Ocultar tendencias','Explicar por qué no todo cambia','Eliminar conflictos'], ok:1},
    ],
    qbg:[ACTIVITIES[0].cover, ACTIVITIES[0].cover, ACTIVITIES[0].cover]
  },
  { id:'m3', title:'Relación cambios–permanencias', img:ACTIVITIES[0].cover,
    text:`Analizar ambos permite comprender ritmos históricos.`,
    q:[
      {q:'Mirar ambos conceptos juntos permite…', opts:['Ignorar tensiones','Comprender ritmos y tensiones','Predecir con certeza absoluta'], ok:1},
      {q:'Si cambian normas pero persisten prácticas informales…', opts:['No hay nada que estudiar','Hay tensión cambio–permanencia','Todo cambió por completo'], ok:1},
      {q:'Un buen análisis debe…', opts:['Sesgo sin evidencia','Equilibrar evidencia','Evitar fuentes'], ok:1},
    ],
    qbg:[ACTIVITIES[0].cover, ACTIVITIES[0].cover, ACTIVITIES[0].cover]
  }
];

const a2Modules = [
  { id:'m1', title:'Conceptos y rasgos', img:ACTIVITIES[1].cover,
    text:`Autoritarismo: concentración de poder/ control de prensa. Democracia: separación de poderes/ derechos/ participación.`,
    q:[
      {q:'Un rasgo típico del autoritarismo es…', opts:['Elecciones libres','Concentración de poder y menos controles','Pluralismo'], ok:1},
      {q:'La democracia se sostiene en…', opts:['Eliminar Congreso','Separación de poderes y derechos','Gobierno de facto'], ok:1},
      {q:'Controlar medios y justicia es propio de…', opts:['Régimen autoritario','Democracia consolidada','Monarquía parlamentaria'], ok:0},
    ],
    qbg:[ACTIVITIES[1].cover, ACTIVITIES[1].cover, ACTIVITIES[1].cover]
  },
  { id:'m2', title:'Perú 1992 y efectos', img:ACTIVITIES[1].cover,
    text:`5/04/1992: disolución del Congreso (autogolpe). Constitución de 1993: hiperpresidencialismo.`,
    q:[
      {q:'¿Qué ocurrió el 5/04/1992?', opts:['Se fortaleció el Congreso','Se disolvió el Congreso y se intervinieron instituciones','Cambio regular de gabinete'], ok:1},
      {q:'La Constitución 1993 favoreció…', opts:['Hiperpresidencialismo','Menos atribuciones del Ejecutivo','Mayor independencia inmediata'], ok:0},
      {q:'Según la CVR, el autogolpe fue…', opts:['Democrático','Autoritario','Irrelevante'], ok:1},
    ],
    qbg:[ACTIVITIES[1].cover, ACTIVITIES[1].cover, ACTIVITIES[1].cover]
  },
  { id:'m3', title:'Fortalecer democracia', img:ACTIVITIES[1].cover,
    text:`Transparencia, datos abiertos, participación efectiva, bicameralidad y cultura cívica.`,
    q:[
      {q:'Para acercar la democracia al ciudadano…', opts:['Restringir información','Portales de datos abiertos claros','Eliminar participación local'], ok:1},
      {q:'Propuesta institucional:', opts:['Bicameralidad y renovación','Cierre del Congreso','Eliminar elecciones'], ok:0},
      {q:'La cultura cívica busca…', opts:['Desalentar participación','Practicar la democracia diaria','Solo educación universitaria'], ok:1},
    ],
    qbg:[ACTIVITIES[1].cover, ACTIVITIES[1].cover, ACTIVITIES[1].cover]
  }
];

const a3Modules = [
  { id:'m1', title:'Boom exportador', img:ACTIVITIES[2].cover,
    text:`Una <b>bonanza</b> suele iniciar por alzas de exportaciones y mejores términos de intercambio.`,
    q:[
      {q:'Disparador típico:', opts:['Caída de exportaciones','Alza de precios/exportaciones','Menor demanda externa'], ok:1},
      {q:'Mejoran términos cuando…', opts:['Suben importaciones','Suben más exportaciones','Ambos caen igual'], ok:1},
      {q:'Efecto macro probable:', opts:['Menor recaudación','Mayor recaudación','Hiperinflación inmediata'], ok:1},
    ],
    qbg:[ACTIVITIES[2].cover, ACTIVITIES[2].cover, ACTIVITIES[2].cover]
  },
  { id:'m2', title:'Inversión y empleo', img:ACTIVITIES[2].cover,
    text:`En bonanza, inversión y empleo tienden a expandirse; la productividad sostiene efectos.`,
    q:[
      {q:'La inversión en bonanza…', opts:['Se contrae','Se expande','No cambia'], ok:1},
      {q:'Sectores que aceleran:', opts:['Construcción y servicios','Solo agricultura subsistente','Todos caen'], ok:0},
      {q:'Para sostener efectos:', opts:['Solo consumo','Productividad y capital humano','Eliminar inversión pública'], ok:1},
    ],
    qbg:[ACTIVITIES[2].cover, ACTIVITIES[2].cover, ACTIVITIES[2].cover]
  },
  { id:'m3', title:'Inflación y sostenibilidad', img:ACTIVITIES[2].cover,
    text:`Bonanza puede calentar la economía; ahorrar y diversificar ayuda.`,
    q:[
      {q:'Riesgo común:', opts:['Sobrecalentamiento e inflación','Deflación estructural','Desempleo masivo inmediato'], ok:0},
      {q:'Política prudente:', opts:['Gasto procíclico','Fondo de estabilización','Eliminar reglas macro'], ok:1},
      {q:'Para reducir vulnerabilidad:', opts:['Concentrar un commodity','Diversificar economía','Cerrar comercio'], ok:1},
    ],
    qbg:[ACTIVITIES[2].cover, ACTIVITIES[2].cover, ACTIVITIES[2].cover]
  }
];

const a4Modules = [
  { id:'m1', title:'Causas y actores', img:ACTIVITIES[3].cover,
    text:`Terrorismo en el Perú (1980–2000): SL y MRTA; causas: exclusión, crisis, radicalización.`,
    q:[
      {q:'Actor subversivo principal:', opts:['Sendero Luminoso','Fuerza Aérea','Defensoría del Pueblo'], ok:0},
      {q:'Causa estructural:', opts:['Pleno empleo','Exclusión social y crisis','Abundancia de servicios'], ok:1},
      {q:'MRTA es…', opts:['Movimiento ambientalista','Grupo subversivo peruano','Agencia estatal'], ok:1},
    ],
    qbg:[ACTIVITIES[3].cover, ACTIVITIES[3].cover, ACTIVITIES[3].cover]
  },
  { id:'m2', title:'Impactos', img:ACTIVITIES[3].cover,
    text:`Víctimas mayormente rurales/indígenas; desplazamientos y trauma; hubo abusos de DD.HH.`,
    q:[
      {q:'Impacto recurrente:', opts:['Más vacaciones','Desplazamientos forzados y trauma','Mayor inversión cultural inmediata'], ok:1},
      {q:'CVR reporta abusos de…', opts:['Solo privados','Agentes del Estado y subversivos','Organismos internacionales'], ok:1},
      {q:'Lenguas más afectadas:', opts:['Quechua y originarias','Solo inglés','Sueco'], ok:0},
    ],
    qbg:[ACTIVITIES[3].cover, ACTIVITIES[3].cover, ACTIVITIES[3].cover]
  },
  { id:'m3', title:'Respuesta y memoria', img:ACTIVITIES[3].cover,
    text:`Seguridad/justicia con DD.HH.; reparaciones; memoria y educación para la paz.`,
    q:[
      {q:'Política clave para víctimas:', opts:['Ignorar testimonios','Plan Integral de Reparaciones','Aumento de aranceles'], ok:1},
      {q:'Para evitar abusos estatales:', opts:['Debilitar controles','Respeto a DD.HH. y separación de poderes','Censura total a la prensa'], ok:1},
      {q:'La memoria ayuda a…', opts:['Repetir errores','Construir cultura de paz','Eliminar diversidad'], ok:1},
    ],
    qbg:[ACTIVITIES[3].cover, ACTIVITIES[3].cover, ACTIVITIES[3].cover]
  }
];

/* ====== Detalle + Quiz genérico ====== */
const PASS = 70;
function getPanelEl(id){ return (id==='a1')?actDetail:(id==='a2')?actDetailA2:(id==='a3')?actDetailA3:actDetailA4; }

function openActivity(id){
  if(!isUnlocked(id)){ toast('🔒 Esta actividad está bloqueada.'); return; }
  hideAllActivityDetails();
  const modules = id==='a1'?a1Modules: id==='a2'?a2Modules: id==='a3'?a3Modules: a4Modules;
  const key = `${id}_game_v1`;
  const store = makeGameStore(key, modules);
  let S = store.load();

  function renderPanel(){
    const panel = getPanelEl(id);
    const m = modules[S.i]; const pct = Math.round((S.ok / S.total)*100);
    panel.innerHTML = `
      <div class="act-hero" id="wrap_${id}">
        <div class="media glow"><img id="img_${id}" src="${m.img}" alt="${m.title}" style="width:100%;height:380px;object-fit:cover;border-radius:20px;border:1px solid #2a2a38" /></div>
        <div class="box">
          <div class="game-head" style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span class="level">Nivel <span id="level_${id}">${S.i+1}</span> / ${modules.length}</span>
            <div class="progress" aria-label="Progreso" style="flex:1;height:8px;background:#1d1d27;border:1px solid #2a2a38;border-radius:999px;overflow:hidden">
              <div class="in" id="bar_${id}" style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--accent1),var(--accent2))"></div>
            </div>
            <div style="min-width:56px;text-align:right"><span id="pct_${id}">${pct}%</span></div>
          </div>
          <div id="body_${id}" class="lesson" style="background:#0f0f15;border:1px solid #2a2a38;border-radius:18px;padding:14px">
            <h4 style="margin:0 0 6px">${m.title}</h4>
            <p style="margin:0 0 8px;opacity:.9">${m.text}</p>
            <p style="opacity:.85">Pulsa <b>Siguiente</b> para abrir el quiz.</p>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn" id="back_${id}">← Atrás</button>
            <button class="btn btn-cta" id="next_${id}">Siguiente →</button>
          </div>
        </div>
      </div>`;
    panel.style.display='block'; panel.classList.add('active');
    document.getElementById(`back_${id}`).onclick = ()=>{ if(S.i>0){ S.i--; S.qi=0; store.save(S); renderPanel(); } };
    document.getElementById(`next_${id}`).onclick = ()=> openQuizView();
    panel.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function openQuizView(){
    const m = modules[S.i]; const q = m.q[S.qi];
    qfBg.style.backgroundImage = `url('${(m.qbg && m.qbg[S.qi]) || m.img}')`;
    qfCard.innerHTML = `
      <div class="qf-top">
        <div style="display:flex;align-items:center;gap:10px">
          <span class="level">${m.title}</span>
          <span class="pill">Quiz</span>
        </div>
        <div class="score">
          <div class="cell">✔ <span class="v" id="ok_${id}">${S.ok}</span></div>
          <div class="cell">✖ <span class="v" id="wr_${id}">${Math.max(0,(S.ans||0)-S.ok)}</span></div>
          <div class="cell">⧗ <span class="v" id="lf_${id}">${Math.max(0,S.total-(S.ans||0))}</span></div>
          <div class="cell">Q <span class="v" id="qi_${id}">${S.qi+1}/${m.q.length}</span></div>
        </div>
      </div>
      <div class="qf-q">${q.q}</div>
      ${q.opts.map((t,k)=>`<label class="qf-opt"><input type="radio" name="ans_${id}" value="${k}" /> <span>${t}</span></label>`).join('')}
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="btn" id="qback_${id}">← Atrás</button>
        <button class="btn btn-cta" id="qnext_${id}">Siguiente →</button>
      </div>
      <div class="qf-msg" id="qmsg_${id}"></div>`;
    showQuiz();
    document.getElementById(`qback_${id}`).onclick = ()=>{ hideQuiz(); };
    document.getElementById(`qnext_${id}`).onclick = ()=>{
      const sel = [...document.querySelectorAll(`input[name='ans_${id}']`)].find(e=>e.checked);
      const msg = document.getElementById(`qmsg_${id}`);
      if(!sel){ toast('Elige una opción'); return; }
      const ok = (parseInt(sel.value,10)===q.ok);
      if(ok){ S.ok++; msg.textContent='✔ Correcto'; msg.style.color='var(--ok)'; }
      else { msg.textContent='✖ Incorrecto'; msg.style.color='var(--bad)'; }
      S.ans = (S.ans||0)+1; localStorage.setItem(`${id}_game_v1`, JSON.stringify(S));
      setTimeout(nextQuestion, 350);
    };
  }

  function nextQuestion(){
    const m = modules[S.i];
    if(S.qi < m.q.length-1){ S.qi++; localStorage.setItem(`${id}_game_v1`, JSON.stringify(S)); openQuizView(); return; }
    if(S.i < modules.length-1){ S.i++; S.qi=0; localStorage.setItem(`${id}_game_v1`, JSON.stringify(S)); hideQuiz(); renderPanel(); return; }
    // fin actividad
    const pct = Math.round((S.ok / S.total)*100);
    markPassed(id);
    if(pct>=PASS){ unlockNext(id); renderActivities(); }
    hideQuiz(); toast(`Resultado ${id.toUpperCase()}: ${pct}%`); renderPanel();
  }

  renderPanel();
}

/* ====== Init ====== */
function init(){
  renderDeck();
  renderPeople();
  handleRoute(); // por si entra con hash directo
}
init();
