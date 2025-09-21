/* =========================
   Roblinder · App (Vanilla JS)
   ========================= */

/* ====== Datos ====== */
const PEOPLE = [
  { id:'p1', name:'Nazli', gender:'Mujer', age:22, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=12', avatar:'https://i.pravatar.cc/120?img=12',
    tags:['Investigación','Redacción'], bio:'Le gusta el análisis y las entrevistas.',
    sign:'Libra', status:'Soltera', likes:['Viajar','Café','Fotografía'] 
  },
   { id:'p2', name:'Gabriela', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=47', avatar:'https://i.pravatar.cc/120?img=47',
    // Modelo unificado (tipo Astrid)
    username:'leebitilin', sign:'Sagitario', career:'Medicina Humana', status:'Soltera',
    goal:'Ser una profesional exitosa y tener una familia estable',
    favFood:'Cheesecake de maracuyá',
    bio:'Holaaa, soy Daira :] Mi signo es Sagitario, tengo 17 años y estudio Medicina Humana. Mi meta en la vida sería lograr ser una profesional exitosa y tener una familia estable. No tengo comida fav pero un postre que jamás me cansaría de comer es el cheesecake de maracuyá. Mi user en Roblox es leebitilin. Estado civil: soltera 😝',
    seeks:['Honestidad','Estabilidad','Familia'],
    tags:['Diseño','UI'], likes:['Diseño','Museos','Correr']
  },
  { id:'p3', name:'Gesú', gender:'Hombre', age:23, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=3', avatar:'https://i.pravatar.cc/120?img=3',
    tags:['Datos','KPIs'], bio:'Arma dashboards y revisa consistencia.',
    sign:'Virgo', status:'Soltero', likes:['Tecnología','Ciclismo','Series']
  },
 { id:'p4', name:'Pamela Cruz', gender:'Mujer', age:18, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=66', avatar:'https://i.pravatar.cc/120?img=66',
    username:'Imbelvr25', sign:'Tauro', career:'Medicina Humana', status:'Soltera',
    goal:'Amar y trabajar en mi carrera hasta tener mi propia clínica, sin olvidar mis valores para ayudar a las personas',
    favFood:'Ceviche',
    bio:'Soy Pamela Cruz, Tauro, tengo 18 años y estudio Medicina Humana. Mi usuario de Roblox es Imbelvr25. Mi meta en la vida es amar y trabajar en mi carrera hasta tener mi propia clínica, no olvidar mis valores y usarlos para ayudar a las personas. Mi comida favorita es el ceviche. Estoy soltera.',
    seeks:['Compañerismo','Amor','Respeto mutuo','Honestidad','Lealtad'],
    tags:['Documentación','Edición'], likes:['Lectura','Edición','Música']
  },
  { id:'p5', name:'Abigail', gender:'Mujer', age:21, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=8', avatar:'https://i.pravatar.cc/120?img=8',
    username:'Arroz con leche', sign:'Aries', career:'Enfermería', status:'Soltera',
    goal:'Ser feliz',
    favFood:'Pollo enrollado con salsa de champiñones',
    bio:'Soy Abigail, Aries, tengo 21 años y estudio Enfermería. Mi usuario es Arroz con leche. Estoy soltera. Mi meta en la vida es ser feliz. Mi comida favorita es el pollo enrollado con salsa de champiñones.',
    seeks:['Compromiso','Lealtad','Trabajo','Superación'],
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
  { id:'p8', name:'Astrid', gender:'Mujer', age:17, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=5', avatar:'https://i.pravatar.cc/120?img=5',
    username:'Lynettd_2', sign:'Aries', career:'Medicina (Universidad Científica del Sur)',
    status:'En relación', goal:'Tener una familia estable', favFood:'Arroz tapado',
    bio:'Soy Astrid, aries, estudio Medicina en la Universidad Científica del Sur. Mi usuario de Roblox es Lynettd_2, tengo 17 años, mi meta en la vida es tener una familia estable y mi comida favorita es el arroz tapado. En relación.',
    // “Intereses que buscan en una persona”
    seeks:['Respeto','Honestidad','Metas claras'],
    tags:['Ilustración','Branding'], likes:['Ilustración','Cine','Viajar']
  },
  { id:'p9', name:'Zulma', gender:'Mujer', age:21, city:'Huancayo', role:'Participante',
    img:'https://i.pravatar.cc/1000?img=15', avatar:'https://i.pravatar.cc/120?img=15',
    tags:['Planificación','Control'], bio:'Coordina cronograma y entregables.',
    sign:'Escorpio', status:'Soltera', likes:['Planificación','Cocina','Ajedrez']
  },
  { id:'prof', name:'Profesor', gender:'Hombre', age:35, city:'Huancayo', role:'Profesor',
    img:'https://images.unsplash.com/photo-1558640478-7e2c3ad3e27f?q=80&w=1200&auto=format&fit=crop',
    avatar:'https://images.unsplash.com/photo-1558640478-7e2c3ad3e27f?q=80&w=200&auto=format&fit=crop',
    tags:['Supervisión','Feedback'], bio:'Guía académico y revisor.',
    isProfessor:true, sign:'Aries', status:'Casado', likes:['Docencia','Café','Libros']
  }
];

const ACTIVITIES = [
  { id:'a1', title:'Cambios y permanencia',
    cover:'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1400&auto=format&fit=crop',
    desc:'Explora procesos históricos donde algunas estructuras cambian y otras permanecen.',
    choices:['Economía','Sociedad','Política','Cultura']
  },
  { id:'a2', title:'Autoritarismo y democracia',
    cover:'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1400&auto=format&fit=crop',
    desc:'Compara rasgos, instituciones y consecuencias de ambos regímenes.',
    choices:['Instituciones','Derechos','Participación','Prensa']
  },
  { id:'a3', title:'Períodos de bonanza',
    cover:'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=1400&auto=format&fit=crop',
    desc:'Identifica ciclos de crecimiento y sus factores (exportaciones, inversión, etc.).',
    choices:['Exportaciones','Inversión','Empleo','Inflación']
  },
  { id:'a4', title:'Terrorismo',
    cover:'https://images.unsplash.com/photo-1551966775-a4ddc8df52d9?q=80&w=1400&auto=format&fit=crop',
    desc:'Analiza causas, impactos y respuestas estatales y sociales.',
    choices:['Causas','Impacto','Respuesta','Memoria']
  }
];

/* ====== Estado persistente (bloqueos) ====== */
const lockKey = 'activities_locks_v1';
function loadLocks(){
  try{ return JSON.parse(localStorage.getItem(lockKey)) || {unlocked:['a1'], passed:[]}; }
  catch{ return {unlocked:['a1'], passed:[]}; }
}
function saveLocks(s){ localStorage.setItem(lockKey, JSON.stringify(s)); }
function isUnlocked(id){ return loadLocks().unlocked.includes(id); }
function markPassed(id){ const s=loadLocks(); if(!s.passed.includes(id)) s.passed.push(id); saveLocks(s); }
function unlockNext(currentId){
  const order=['a1','a2','a3','a4'];
  const i=order.indexOf(currentId);
  if(i>-1 && i<order.length-1){
    const s=loadLocks(); const next=order[i+1];
    if(!s.unlocked.includes(next)){ s.unlocked.push(next); saveLocks(s); }
  }
}

/* ====== Util ====== */
function $(sel){ return document.querySelector(sel); }
function el(tag, attrs={}, html=''){
  const n=document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=> n.setAttribute(k, v));
  if(html!=='' && html!=null) n.innerHTML = html;
  return n;
}
function toast(msg){
  const t=el('div',{class:'toast'}); t.textContent=msg;
  document.body.appendChild(t); setTimeout(()=>t.remove(), 2000);
}

/* ====== Router simple (hash) ====== */
function route(){
  const h = (location.hash||'').replace(/^#/,'');
  if(!h) return {name:'', query:{}};
  const [name,q] = h.split('?');
  const query = {};
  if(q){ new URLSearchParams(q).forEach((v,k)=> query[k]=v); }
  return {name, query};
}

/* ====== RENDER: Deck (Tinder-like) ====== */
let deckIdx = 0;
const deckShell = $('#deckShell');
const dotsEl   = $('#dots');
function renderDots(){
  dotsEl.innerHTML = PEOPLE.map((_,i)=>`<span class="dot ${i===deckIdx?'active':''}"></span>`).join('');
}
function renderDeck(){
  const p = PEOPLE[deckIdx]; if(!p) return;
  deckShell.querySelectorAll('.deck-card').forEach(n=>n.remove());
  const card = el('article', {class:`deck-card ${p.isProfessor?'pro-gold':''}`});
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}" />
    <div class="badge like" id="badgeLike">LIKE</div>
    <div class="badge nope" id="badgeNope">NOPE</div>
    <div class="deck-meta">
      <div class="deck-name">${p.name} · ${p.age}</div>
      <div class="deck-sub">${p.city} · ${p.role} · ${p.gender}${p.isProfessor?' · <span class="p-badge">Profesor</span>':''}</div>
      <div class="deck-tags">${(p.tags||[]).map(t=>`<span class='pill'>${t}</span>`).join('')}</div>
    </div>`;
  card.addEventListener('click', openProfile);
  deckShell.appendChild(card);
  renderDots();
}
function next(){ deckIdx = (deckIdx+1) % PEOPLE.length; renderDeck(); }
function prev(){ deckIdx = (deckIdx-1+PEOPLE.length) % PEOPLE.length; renderDeck(); }
function openProfile(){ location.hash = `perfil?id=${PEOPLE[deckIdx].id}`; }
function flash(type){
  const elId = type==='like' ? '#badgeLike' : '#badgeNope';
  const elB = deckShell.querySelector(elId); if(!elB) return;
  elB.style.opacity = 1; setTimeout(()=>{ elB.style.opacity = 0; }, 400);
}
/* Controles */
$('#zoneRight').addEventListener('click', ()=>{ flash('like'); next(); });
$('#zoneLeft').addEventListener('click', ()=>{ flash('nope'); prev(); });
$('#btnLike').addEventListener('click', ()=>{ flash('like'); next(); });
$('#btnNope').addEventListener('click', ()=>{ flash('nope'); next(); });
$('#btnOpen').addEventListener('click', openProfile);
window.addEventListener('keydown', (e)=>{ if(e.key==='ArrowRight'){ flash('like'); next(); } if(e.key==='ArrowLeft'){ flash('nope'); prev(); } if(e.key==='Enter'){ openProfile(); } });

/* ====== RENDER: Participantes ====== */
const peopleGrid = $('#peopleGrid');
function renderPeople(){
  peopleGrid.innerHTML = PEOPLE.map(p=>`
    <article class="p-card" data-id="${p.id}">
      <div class="avatar${p.isProfessor?' pro-gold':''}"><img src="${p.avatar}" alt="${p.name}" /></div>
      <div>
        <div class="name">${p.name}${p.isProfessor?` <span class='p-badge'>Profesor</span>`:''}</div>
        <div style="color:var(--muted);font-size:13px">${p.city} · ${p.role} · ${p.gender}</div>
      </div>
    </article>`).join('');
}
peopleGrid.addEventListener('click', (e)=>{
  const card = e.target.closest('.p-card'); if(!card) return;
  const p = PEOPLE.find(x=>x.id===card.dataset.id); if(!p) return;
  deckIdx = PEOPLE.indexOf(p); renderDeck(); location.hash = `perfil?id=${p.id}`;
});

/* ====== INIT base ====== */
renderDeck();
renderPeople();



/* ====== Perfil ====== */
const perfilSec  = $('#perfil');
const perfilWrap = $('#perfilWrap');
const perfilTitle= $('#perfilTitle');
$('#btnBackToPeople')?.addEventListener('click', (e)=>{ /* anchor ya está */ });

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
}

function closeProfile(){
  perfilSec.classList.remove('active'); perfilSec.style.display='none';
  document.getElementById('participantes').scrollIntoView({behavior:'smooth'});
}

/* ====== Router (perfíl / actividad) ====== */
function handleRoute(){
  const r = route();
  if(r.name==='perfil'){
    const person = PEOPLE.find(p=>p.id===r.query.id);
    renderProfile(person);
  }else{
    closeProfile();
  }
  if(r.name==='actividad'){
    openActivity(r.query.id);
  }else{
    // oculta detalles de actividad
    hideAllActivityDetails();
  }
}
window.addEventListener('hashchange', handleRoute);
handleRoute();

/* ====== Actividades (cards con temas visibles) ====== */
const actGrid   = $('#actGrid');
const actDetail = $('#actDetail');     // A1
const actDetailA2 = $('#actDetailA2'); // A2
const actDetailA3 = $('#actDetailA3'); // A3
const actDetailA4 = $('#actDetailA4'); // A4

function renderActivities(){
  const locks = loadLocks();
  actGrid.innerHTML = ACTIVITIES.map(a=>{
    const unlocked = locks.unlocked.includes(a.id);
    return `
    <article class="act-card" data-id="${a.id}" data-locked="${unlocked?0:1}">
      <span class="cta">${unlocked?'Elegir':'Bloqueado'}</span>
      ${unlocked?'':`<div class="lock-badge">🔒 Bloqueado</div>`}
      <img src="${a.cover}" alt="${a.title}" />
      <div class="topics">${(a.choices||[]).map(c=>`<span class="pill mini">${c}</span>`).join('')}</div>
      <div class="title">${a.title}</div>
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
const qf = $('#quizFocus');
const qfBg = $('#qfBg');
const qfCard = $('#qfCard');
function showQuiz(){ qf.classList.add('active'); qf.style.display='block'; }
function hideQuiz(){ qf.classList.remove('active'); qf.style.display='none'; qfCard.innerHTML=''; }



/* ====== A1 / A2 / A3 / A4 — módulos de quiz ====== */
const PASS = 70;

/* Helpers para estados de juego por actividad */
function makeGameStore(key, modules){
  function load(){
    try{
      const base = {i:0, qi:0, ok:0, ans:0, total: modules.reduce((a,m)=>a+m.q.length,0)};
      return Object.assign(base, JSON.parse(localStorage.getItem(key)||'{}'));
    }catch{ return {i:0, qi:0, ok:0, ans:0, total: modules.reduce((a,m)=>a+m.q.length,0)}; }
  }
  function save(s){ localStorage.setItem(key, JSON.stringify(s)); }
  return { load, save };
}

/* ===== A1 ===== */
const a1Modules = [
  { id:'m1', title:'Cambios', img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    text:`Los <b>cambios</b> son transformaciones en estructuras, actores o prácticas...`,
    q:[
      {q:'¿Qué define mejor un “cambio”?', opts:['La continuidad de prácticas','La transformación de estructuras o prácticas','La repetición de ciclos'], ok:1},
      {q:'Para analizar un cambio debes ubicar…', opts:['Solo quién lo impulsó','Qué cambió, cuándo y por qué','Solo el impacto económico inmediato'], ok:1},
      {q:'Un ejemplo típico de cambio sería…', opts:['Mismos procedimientos por décadas','Nueva ley que reemplaza un marco anterior','Costumbres inalteradas'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?change,arrows',
      'https://source.unsplash.com/1600x1000/?timeline,history',
      'https://source.unsplash.com/1600x1000/?law,reform'
    ]
  },
  { id:'m2', title:'Permanencias', img:'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop',
    text:`Las <b>permanencias</b> son elementos que se mantienen pese a los cambios...`,
    q:[
      {q:'Una “permanencia” es…', opts:['Todo lo que cambia rápido','Lo que se mantiene a través del tiempo','Un fenómeno aleatorio'], ok:1},
      {q:'Ejemplo de permanencia:', opts:['Rotación anual de presidentes','Misma práctica cultural que persiste','Cambio de moneda cada mes'], ok:1},
      {q:'Sirven para…', opts:['Ocultar tendencias','Explicar por qué no todo cambia','Eliminar conflictos'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?tradition,culture',
      'https://source.unsplash.com/1600x1000/?weaving,craft',
      'https://source.unsplash.com/1600x1000/?architecture,columns'
    ]
  },
  { id:'m3', title:'Relación cambios–permanencias', img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    text:`Analizar <b>cambios y permanencias</b> juntos permite comprender ritmos históricos...`,
    q:[
      {q:'Mirar ambos conceptos juntos permite…', opts:['Ignorar tensiones','Comprender ritmos y tensiones','Predecir con certeza absoluta'], ok:1},
      {q:'Si cambian normas pero persisten prácticas informales, entonces…', opts:['No hay nada que estudiar','Hay tensión entre cambio formal y permanencia social','Todo cambió por completo'], ok:1},
      {q:'Un buen análisis debe…', opts:['Tomar partido sin evidencia','Equilibrar evidencia de cambio y continuidad','Evitar fuentes'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?balance,scales',
      'https://source.unsplash.com/1600x1000/?policy,society',
      'https://source.unsplash.com/1600x1000/?research,analysis'
    ]
  }
];
const a1Store = makeGameStore('a1_game_v3', a1Modules);
let A1 = a1Store.load();

/* ===== A2 (con quiz) ===== */
const a2Modules = [
  { id:'m1', title:'Conceptos y rasgos', img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    text:`Autoritarismo vs Democracia: concentración de poder y control de prensa vs separación de poderes, derechos y participación.`,
    q:[
      {q:'Un rasgo típico del autoritarismo es…', opts:['Elecciones libres y competitivas','Concentración de poder y debilitamiento de controles','Fortalecimiento del pluralismo'], ok:1},
      {q:'La democracia se sostiene en…', opts:['Eliminación del Congreso','Separación de poderes y derechos','Gobierno de facto'], ok:1},
      {q:'Controlar medios y justicia es propio de…', opts:['Un régimen autoritario','Una democracia consolidada','Una monarquía parlamentaria'], ok:0},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?power,authority',
      'https://source.unsplash.com/1600x1000/?law,justice',
      'https://source.unsplash.com/1600x1000/?press,media'
    ]
  },
  { id:'m2', title:'Perú 1992 y efectos', img:'https://images.unsplash.com/photo-1543357480-c60d40007a5b?q=80&w=1200&auto=format&fit=crop',
    text:`El 5/04/1992 se disolvió el Congreso y se intervinieron instituciones (autogolpe). Constitución de 1993 instauró hiperpresidencialismo.`,
    q:[
      {q:'¿Qué ocurrió el 5 de abril de 1992?', opts:['Se fortaleció el Congreso','Se disolvió el Congreso y se intervinieron instituciones','Cambio regular de gabinete'], ok:1},
      {q:'La Constitución de 1993 favoreció…', opts:['Un sistema hiperpresidencial','Menos atribuciones del Ejecutivo','Mayor independencia inmediata de poderes'], ok:0},
      {q:'Según la CVR, el autogolpe fue…', opts:['Un acto democrático','De naturaleza autoritaria','Irrelevante'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?congress,building',
      'https://source.unsplash.com/1600x1000/?constitution,laws',
      'https://source.unsplash.com/1600x1000/?history,peru'
    ]
  },
  { id:'m3', title:'2000–2022 y fortalecer democracia', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    text:`Transparencia y datos abiertos, participación efectiva, reformas (bicameralidad) y cultura cívica práctica.`,
    q:[
      {q:'Una medida para acercar la democracia al ciudadano es…', opts:['Restringir acceso a la información','Portales de datos abiertos útiles y claros','Eliminar la participación local'], ok:1},
      {q:'Propuesta institucional mencionada:', opts:['Bicameralidad y renovación parcial','Cierre permanente del Congreso','Eliminar elecciones'], ok:0},
      {q:'La cultura cívica busca…', opts:['Desalentar la participación','Practicar la democracia en la vida cotidiana','Solo educación universitaria'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?open,data',
      'https://source.unsplash.com/1600x1000/?parliament,debate',
      'https://source.unsplash.com/1600x1000/?civic,community'
    ]
  }
];
const a2Store = makeGameStore('a2_game_v1', a2Modules);
let A2 = a2Store.load();

/* ===== A3 (bonanza) ===== */
const a3Modules = [
  { id:'m1', title:'Boom exportador', img:'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=1200&auto=format&fit=crop',
    text:`Un <b>período de bonanza</b> suele iniciar por alzas de <b>exportaciones</b> y mejores términos de intercambio.`,
    q:[
      {q:'Disparador típico de una bonanza:', opts:['Caída sostenida de exportaciones','Alza de precios internacionales y mayor volumen exportado','Menor demanda externa'], ok:1},
      {q:'Mejoran términos de intercambio cuando…', opts:['Suben importaciones vs exportaciones','Suben más las exportaciones que las importaciones','Ambos precios caen por igual'], ok:1},
      {q:'Efecto macro probable:', opts:['Menor recaudación','Mayor recaudación y espacio fiscal','Hiperinflación inmediata'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?exports,containers',
      'https://source.unsplash.com/1600x1000/?commodities,prices',
      'https://source.unsplash.com/1600x1000/?treasury,revenue'
    ]
  },
  { id:'m2', title:'Inversión y empleo', img:'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1200&auto=format&fit=crop',
    text:`En bonanza, la <b>inversión</b> y el <b>empleo</b> tienden a expandirse; la productividad define la persistencia.`,
    q:[
      {q:'La inversión en bonanza…', opts:['Se contrae','Se expande por mejores expectativas','No cambia nunca'], ok:1},
      {q:'Sectores que aceleran:', opts:['Construcción y servicios','Solo agricultura subsistente','Todos caen a la vez'], ok:0},
      {q:'Para sostener el efecto es clave…', opts:['Apostar solo al consumo','Mejorar productividad y capital humano','Eliminar inversión pública'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?investment,cranes',
      'https://source.unsplash.com/1600x1000/?jobs,services',
      'https://source.unsplash.com/1600x1000/?education,training'
    ]
  },
  { id:'m3', title:'Inflación y sostenibilidad', img:'https://images.unsplash.com/photo-1553531888-a0b8d1f4f06b?q=80&w=1200&auto=format&fit=crop',
    text:`Bonanza puede presionar <b>inflación</b> y <b>tipo de cambio</b>. Recomendable diversificar y ahorrar en fondos de estabilización.`,
    q:[
      {q:'Riesgo común:', opts:['Sobrecalentamiento e inflación','Deflación estructural garantizada','Desempleo masivo inmediato'], ok:0},
      {q:'Política prudente:', opts:['Gasto procíclico sin ahorro','Fondo de estabilización y reglas fiscales','Eliminar reglas macro'], ok:1},
      {q:'Para reducir vulnerabilidad:', opts:['Concentrar todo en un commodity','Diversificar la economía','Cerrar comercio'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?inflation,prices',
      'https://source.unsplash.com/1600x1000/?sovereign,wealth',
      'https://source.unsplash.com/1600x1000/?diversification,industry'
    ]
  }
];
const a3Store = makeGameStore('a3_game_v1', a3Modules);
let A3 = a3Store.load();

/* ===== A4 (terrorismo) ===== */
const a4Modules = [
  { id:'m1', title:'Causas y actores', img:'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop',
    text:`El <b>terrorismo</b> en el Perú (1980–2000) involucró a <b>Sendero Luminoso</b> y <b>MRTA</b>. Causas: exclusión, crisis, radicalización.`,
    q:[
      {q:'Actor subversivo principal:', opts:['Sendero Luminoso','Fuerza Aérea','Defensoría del Pueblo'], ok:0},
      {q:'Causa estructural:', opts:['Pleno empleo','Exclusión social y crisis','Abundancia de servicios'], ok:1},
      {q:'MRTA es…', opts:['Movimiento ambientalista','Grupo subversivo peruano','Agencia estatal'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?peru,andes',
      'https://source.unsplash.com/1600x1000/?poverty,crisis',
      'https://source.unsplash.com/1600x1000/?history,peru'
    ]
  },
  { id:'m2', title:'Impactos en la población', img:'https://images.unsplash.com/photo-1543357480-c60d40007a5b?q=80&w=1200&auto=format&fit=crop',
    text:`Víctimas mayormente rurales/indígenas; muertes, desapariciones, desplazamientos. Violaciones a DD.HH. también por agentes del Estado (CVR).`,
    q:[
      {q:'Impacto recurrente:', opts:['Más vacaciones','Desplazamientos forzados y trauma','Mayor inversión cultural inmediata'], ok:1},
      {q:'CVR reporta abusos de…', opts:['Solo privados','Agentes del Estado y subversivos','Organismos internacionales'], ok:1},
      {q:'Lenguas más afectadas:', opts:['Quechua y originarias','Solo inglés','Sueco'], ok:0},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?community,andes',
      'https://source.unsplash.com/1600x1000/?human,rights',
      'https://source.unsplash.com/1600x1000/?ayacucho,peru'
    ]
  },
  { id:'m3', title:'Respuesta, memoria y no repetición', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    text:`Respuestas: seguridad y justicia con respeto a DD.HH.; reparaciones integrales; memoria y educación para la paz.`,
    q:[
      {q:'Política clave para víctimas:', opts:['Ignorar testimonios','Plan Integral de Reparaciones','Aumento de aranceles'], ok:1},
      {q:'Principio para evitar abusos estatales:', opts:['Debilitar controles','Respeto a DD.HH. y separación de poderes','Censura total a la prensa'], ok:1},
      {q:'La memoria ayuda a…', opts:['Repetir errores','Construir cultura de paz','Eliminar diversidad'], ok:1},
    ],
    qbg:[
      'https://source.unsplash.com/1600x1000/?justice,law',
      'https://source.unsplash.com/1600x1000/?rights,freedom',
      'https://source.unsplash.com/1600x1000/?education,peace'
    ]
  }
];
const a4Store = makeGameStore('a4_game_v1', a4Modules);
let A4 = a4Store.load();

/* ====== Render detalle por actividad ====== */
function openActivity(id){
  if(!isUnlocked(id)){ toast('🔒 Esta actividad está bloqueada.'); return; }
  hideAllActivityDetails();
  if(id==='a1'){ renderActivityPanel('a1', a1Modules, a1Store, (s)=>A1=s); }
  if(id==='a2'){ renderActivityPanel('a2', a2Modules, a2Store, (s)=>A2=s); }
  if(id==='a3'){ renderActivityPanel('a3', a3Modules, a3Store, (s)=>A3=s); }
  if(id==='a4'){ renderActivityPanel('a4', a4Modules, a4Store, (s)=>A4=s); }
}

function getPanelEl(id){
  if(id==='a1') return actDetail;
  if(id==='a2') return actDetailA2;
  if(id==='a3') return actDetailA3;
  if(id==='a4') return actDetailA4;
  return actDetail;
}

function renderActivityPanel(aid, modules, store, assignState){
  const panel = getPanelEl(aid);
  let S = store.load(); assignState(S);

  const pct = Math.round((S.ok / S.total)*100);
  panel.innerHTML = `
    <div class="act-hero" id="gameWrap_${aid}">
      <div class="media"><img id="img_${aid}" src="${modules[S.i].img}" alt="${modules[S.i].title}" /></div>
      <div class="box">
        <div class="game-head">
          <span class="level">Nivel <span id="level_${aid}">${S.i+1}</span> / ${modules.length}</span>
          <div class="progress" aria-label="Progreso"><div class="in" id="bar_${aid}" style="width:${pct}%"></div></div>
          <div style="min-width:56px;text-align:right"><span id="pct_${aid}">${pct}%</span></div>
        </div>
        <div id="body_${aid}" class="lesson">
          <h4>${modules[S.i].title}</h4>
          <p>${modules[S.i].text}</p>
          <p style="opacity:.85">Cuando termines de leer, pulsa <b>Siguiente</b> para abrir el quiz.</p>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn" id="back_${aid}">← Atrás</button>
          <button class="btn btn-cta" id="next_${aid}">Siguiente →</button>
        </div>
      </div>
    </div>`;

  panel.style.display='block'; panel.classList.add('active');
  document.getElementById('actividades').scrollIntoView({behavior:'smooth'});

  // Botones
  document.getElementById(`back_${aid}`).onclick = ()=>{
    if(S.i>0){ S.i--; S.qi=0; store.save(S); assignState(S); renderActivityPanel(aid, modules, store, assignState); }
  };
  document.getElementById(`next_${aid}`).onclick = ()=> openQuizView(aid, modules, store, assignState);
}

function updateHUD(aid, S, modules){
  const pct = Math.round((S.ok / S.total)*100);
  const img = document.getElementById(`img_${aid}`);
  const lvl = document.getElementById(`level_${aid}`);
  const bar = document.getElementById(`bar_${aid}`);
  const pctEl = document.getElementById(`pct_${aid}`);
  const body = document.getElementById(`body_${aid}`);
  if(img) { img.src = modules[S.i].img; img.alt = modules[S.i].title; }
  if(lvl) lvl.textContent = String(S.i+1);
  if(bar) bar.style.width = pct+'%';
  if(pctEl) pctEl.textContent = pct+'%';
  if(body) body.innerHTML = `<h4>${modules[S.i].title}</h4><p>${modules[S.i].text}</p><p style="opacity:.85">Pulsa <b>Siguiente</b> para abrir el quiz.</p>`;
}

/* ====== Quiz ====== */
function openQuizView(aid, modules, store, assignState){
  let S = store.load(); assignState(S);
  const m = modules[S.i];
  const q = m.q[S.qi];
  qfBg.style.backgroundImage = `url('${(m.qbg && m.qbg[S.qi]) || m.img}')`;
  qfCard.innerHTML = `
    <div class="qf-top">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="level">${m.title}</span>
        <span class="pill">Quiz</span>
      </div>
      <div class="score">
        <div class="cell">✔ <span class="v" id="ok_${aid}">${S.ok}</span></div>
        <div class="cell">✖ <span class="v" id="wr_${aid}">${Math.max(0,(S.ans||0)-S.ok)}</span></div>
        <div class="cell">⧗ <span class="v" id="lf_${aid}">${Math.max(0,S.total-(S.ans||0))}</span></div>
        <div class="cell">Q <span class="v" id="qi_${aid}">${S.qi+1}/${m.q.length}</span></div>
      </div>
    </div>
    <div class="qf-q">${q.q}</div>
    ${q.opts.map((t,k)=>`
      <label class="qf-opt"><input type="radio" name="ans_${aid}" value="${k}" /> <span>${t}</span></label>
    `).join('')}
    <div style="display:flex;gap:8px;margin-top:10px">
      <button class="btn" id="qback_${aid}">← Atrás</button>
      <button class="btn btn-cta" id="qnext_${aid}">Siguiente →</button>
    </div>
    <div class="qf-msg" id="qmsg_${aid}"></div>
  `;
  showQuiz();

  document.getElementById(`qback_${aid}`).onclick = ()=>{ hideQuiz(); };
  document.getElementById(`qnext_${aid}`).onclick = ()=>{
    const sel = [...document.querySelectorAll(`input[name='ans_${aid}']`)].find(e=>e.checked);
    const msg = document.getElementById(`qmsg_${aid}`);
    if(!sel){ toast('Elige una opción'); return; }
    const val = parseInt(sel.value,10);
    const correct = (val===q.ok);
    if(correct){ S.ok++; msg.textContent='✔ Correcto'; msg.style.color='var(--ok)'; }
    else { msg.textContent='✖ Incorrecto'; msg.style.color='var(--bad)'; }
    S.ans = (S.ans||0)+1; store.save(S); assignState(S);

    // Mostrar explicación corta (texto del módulo)
    const expl = el('div', {}, `<div style="opacity:.9;margin-top:8px">${m.text}</div>`);
    msg.appendChild(expl);

    setTimeout(()=>{
      nextQuestion(aid, modules, store, assignState);
    }, 350);
  };
}

function nextQuestion(aid, modules, store, assignState){
  let S = store.load(); assignState(S);
  const m = modules[S.i];

  if(S.qi < m.q.length-1){ S.qi++; store.save(S); assignState(S); openQuizView(aid, modules, store, assignState); return; }

  // fin módulo
  if(S.i < modules.length-1){ S.i++; S.qi=0; store.save(S); assignState(S); hideQuiz(); updateHUD(aid, S, modules); return; }

  // fin actividad
  const pct = Math.round((S.ok / S.total)*100);
  markPassed(aid);
  if(pct>=PASS){ unlockNext(aid); renderActivities(); }
  hideQuiz();
  toast(`Resultado ${aid.toUpperCase()}: ${pct}%`);
  updateHUD(aid, S, modules);
}

/* ====== Auto-tests (consola) ====== */
(function(){
  try{
    console.assert(Array.isArray(PEOPLE) && PEOPLE.length>=1, 'PEOPLE debe ser arreglo con datos');
    console.assert(Array.isArray(ACTIVITIES) && ACTIVITIES.length===4, 'ACTIVITIES debe tener 4 actividades');
    ACTIVITIES.forEach(a=> console.assert(Array.isArray(a.choices) && a.choices.length>=1, `Actividad ${a.id} debe tener choices`));
    const astrid = PEOPLE.find(p=>p.id==='p8');
    console.assert(astrid && astrid.username==='Lynettd_2', 'Astrid username');
    console.assert(astrid && astrid.sign==='Aries', 'Astrid signo');
    console.assert(astrid && astrid.age===17, 'Astrid edad');
    console.assert(astrid && /Científica del Sur/i.test(astrid.career||''), 'Astrid carrera');
    console.assert(astrid && astrid.status==='En relación', 'Astrid estado');
    console.assert(astrid && astrid.favFood==='Arroz tapado', 'Astrid comida fav');
    console.assert(astrid && Array.isArray(astrid.seeks) && astrid.seeks.length>0, 'Astrid seeks');
  }catch(e){ console.error('Self-test falló:', e); }
})();
