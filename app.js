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
   (Mantén aquí tus datos originales) */
const PEOPLE = [
  // …contenido original sin cambios…
];

const ACTIVITIES = [
  // …contenido original sin cambios…
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

  // Fotos: si solo hay 1, NO duplicar
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

  // Mostrar/ocultar flechas
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

  // Accesibilidad: foco y teclado
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

/* ---------- ACTIVIDADES + QUIZ (placeholder) ---------- */
const actGrid = $('#actGrid');
function renderActivities(){
  // …deja tu render original o placeholder…
}
renderActivities();

const quizModal = $('#quizModal');
const quizBackdrop = $('#quizBackdrop');
const quizClose = $('#quizClose');
const quizCard = $('#quizCard');

function openQuiz(actId){
  // …implementación original…
}
function closeQuiz(){
  // …implementación original…
}
quizBackdrop.addEventListener('click', closeQuiz);
quizClose.addEventListener('click', closeQuiz);

/* ---------- Navegación hash ---------- */
function parseHash(){ const h=(location.hash||'').replace(/^#/,''); if(!h) return {name:'',query:{}}; const [name,q]=h.split('?'); const query={}; if(q) new URLSearchParams(q).forEach((v,k)=>query[k]=v); return {name,query}; }
function handleHash(){
  const r = parseHash();
  if(r.name==='perfil'){ openProfile(r.query.id); }
  if(r.name==='actividad'){ openQuiz(r.query.id); }
  if(r.name==='corrupcion'){ openCorrupcion(); }
}
window.addEventListener('hashchange', handleHash);

/* ==========================================================
   NUEVO — Corrupción: parseo, render y comportamiento
   ========================================================== */

const REPORT_URL = "https://github.com/GESU2020/Tinder_Roblox/raw/refs/heads/main/assets/downloads/Peru%20vs%20Mexico_Daira.docx";

// Contenedores
const corrWrap = $('#corrupcion');
const corrContent = $('#corrContent');
const corrAutor = $('#corrAutor');
const corrTabPvm = $('#tabPvm');

// SEO dinámico
function setSeoForCorr(){
  document.title = 'Corrupción · Perú vs. México — Roblinder';
  let meta = document.querySelector('meta[name="description"]');
  if(!meta){
    meta = document.createElement('meta');
    meta.setAttribute('name','description');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content','Análisis de la problemática social y comparativa Perú vs. México: dimensiones, actividades sincrónicas, perspectivas teóricas, estrategias y referencias bibliográficas.');
}

// Entrada a la sección
let corrLoaded = false;
function openCorrupcion(){
  if (corrWrap.hasAttribute('hidden')) corrWrap.removeAttribute('hidden');
  corrTabPvm?.classList.add('is-active');
  corrContent?.setAttribute('data-state', 'loading');
  setSeoForCorr();

  // Asegura el link de descarga al de Daira
  const a = document.getElementById('downloadReport');
  if (a) a.href = REPORT_URL || a.href;

  if(!corrLoaded){
    loadReport().then(data=>{
      const parsed = parseReportDocx(data);
      renderReport(parsed);
      corrLoaded = true;
      corrContent?.setAttribute('data-state', 'ready');
    }).catch(()=>{
      corrContent.innerHTML = `<p>No se pudo cargar el documento. Verifica la ruta <code>assets/docs/report.docx</code> o el JSON intermedio.</p>`;
      corrContent?.setAttribute('data-state', 'error');
    });
  }
}

// Carga del “docx” (vía JSON intermedio o window.REPORT_DATA)
async function loadReport(){
  if (window.REPORT_DATA) return window.REPORT_DATA;
  try {
    const res = await fetch('assets/docs/report.json', { cache:'no-store' });
    if(res.ok) return await res.json();
  } catch(_) {}
  // Fallback
  return {
    integrante: 'Daira Gabriela Cano Velasco',
    secciones: [
      { id:'descripcion', titulo:'Descripción de la problemática social',
        contenido:[
          {type:'p', text:'(Contenido de ejemplo) La corrupción afecta sistemas políticos, económicos y sociales…'},
          {type:'blockquote', text:'“La corrupción es el abuso de poder para beneficio privado”.', cite:'Transparencia Internacional'}
        ]
      },
      { id:'clasificacion', titulo:'Clasificación por dimensiones (histórica, política, económica, social)',
        contenido:[
          {type:'ul', items:[
            'Dimensión histórica: evolución de prácticas corruptas.',
            'Dimensión política: clientelismo, captura del Estado.',
            'Dimensión económica: sobrecostos, ineficiencias, pérdida de inversión.',
            'Dimensión social: desconfianza, desigualdad, debilitamiento cívico.'
          ]}
        ]
      },
      { id:'relacion', titulo:'Relación con actividades sincrónicas (S9–S11)',
        contenido:[
          {type:'p', text:'Vinculación de la temática con sesiones S9 a S11, evidencias y productos…'}
        ]
      },
      { id:'analisis', titulo:'Análisis de perspectivas teóricas',
        contenido:[
          {type:'table', head:['Autor','Enfoque','Aportes','Limitaciones'], rows:[
            ['Klitgaard','Económico-institucional','Ecuación de corrupción, incentivos y controles','Simplifica factores culturales'],
            ['Rose-Ackerman','Economía política','Mercados de soborno y diseño institucional','Asume racionalidad alta del agente'],
            ['North','Instituciones','Reglas formales e informales','Transición lenta de normas'],
          ]}
        ]
      },
      { id:'estrategias', titulo:'Estrategias de acción',
        contenido:[
          {type:'table', head:['Estrategia','Plazo','Responsable','Indicador'], rows:[
            ['Transparencia de datos (Open Data)','Corto','OGE / PCM','N° datasets publicados'],
            ['Compras públicas electrónicas','Medio','MEF','% procesos en SEACE'],
            ['Integridad en sector salud y educación','Medio','MINSA/MINEDU','Casos y sanciones reportadas'],
          ]}
        ]
      },
      { id:'referencias', titulo:'Referencias bibliográficas',
        contenido:[
          {type:'ref', text:'Klitgaard, R. (1991). Controlling Corruption. ', doi:'10.2307/XXXX'},
          {type:'ref', text:'Rose-Ackerman, S. (1999). Corruption and Government. ', doi:'10.1017/CBO9780511490880'}
        ]
      }
    ]
  };
}

// Parser “docx” → estructura semántica (si ya viene JSON, solo normaliza)
function parseReportDocx(raw){
  const data = raw || {};
  data.integrante = normalizeText(data.integrante || '—');
  (data.secciones||[]).forEach(sec=>{
    sec.titulo = normalizeText(sec.titulo||'');
    (sec.contenido||[]).forEach(b=>{
      if(b.type==='p' || b.type==='blockquote' || b.type==='ref'){
        b.text = normalizeText(b.text||'');
      }
      if(b.type==='ul'){ b.items = (b.items||[]).map(normalizeText); }
      if(b.type==='table'){ /* ok */ }
      if(b.doi){ b.doi = (''+b.doi).trim(); }
    });
  });
  return data;
}

function normalizeText(s){
  if(!s) return s;
  return s
    .replace(/\s+/g,' ')
    .replace(/"([^"]+)"/g,'“$1”')
    .trim();
}

// Render principal
function renderReport(data){
  const cont = corrContent;
  if(!cont) return;
  const sections = (data && Array.isArray(data.secciones)) ? data.secciones : [];

  cont.innerHTML = sections.map(sec=>{
    const anchor = `sec-${sec.id}`;
    const body = (sec.contenido||[]).map(renderBlock).join('');
    return `
      <section id="${anchor}">
        <h2>${sec.titulo||''}</h2>
        ${body}
      </section>
    `;
  }).join('');

  // Nombre de integrante
  corrAutor.textContent = `Integrante: ${data.integrante || '—'}`;

  // Asegura target/rel en DOIs/enlaces
  $$('a[target!="_blank"]', cont).forEach(a=>{
    a.setAttribute('target','_blank');
    a.setAttribute('rel','noopener');
  });
}

function renderBlock(b){
  if(!b || !b.type) return '';
  if(b.type==='p'){
    return `<p>${linkifyDoi(escapeHtml(b.text||''))}</p>`;
  }
  if(b.type==='blockquote'){
    const cite = b.cite ? `<cite>${escapeHtml(b.cite)}</cite>` : '';
    return `<blockquote>${escapeHtml(b.text||'')}${cite}</blockquote>`;
  }
  if(b.type==='ul'){
    const li = (b.items||[]).map(it=> `<li>${escapeHtml(it)}</li>`).join('');
    return `<ul>${li}</ul>`;
  }
  if(b.type==='table'){
    const thead = `<thead><tr>${(b.head||[]).map(h=>`<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>`;
    const rows = (b.rows||[]).map(r=> `<tr>${r.map(c=>`<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('');
    return `<div class="table-wrap"><table class="corrupcion-table">${thead}<tbody>${rows}</tbody></table></div>`;
  }
  if(b.type==='ref'){
    const main = linkifyDoi(escapeHtml(b.text||''));
    const doi = b.doi ? ` <a href="https://doi.org/${encodeURIComponent(b.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//,''))}" data-doi target="_blank" rel="noopener">https://doi.org/${escapeHtml(b.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//,''))}</a>` : '';
    return `<p>${main}${doi}</p>`;
  }
  return '';
}

function escapeHtml(s){
  return (s||'').replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}

function linkifyDoi(text){
  const doiRe = /\b(10\.\d{4,9}\/[^\s"']+)\b/gi;
  return text.replace(doiRe, (m)=> `<a href="https://doi.org/${m}" data-doi target="_blank" rel="noopener">${m}</a>`);
}

/* ---------- INIT ---------- */
function init(){
  renderDeck();
  renderParticipants();
  handleHash();

  // Smooth scroll + activación de Corrupción
  $$('.nav a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el){
          el.removeAttribute?.('hidden');
          el.scrollIntoView({behavior:'smooth'});
          if(href==='#corrupcion'){ openCorrupcion(); }
        }
      }
    });
  });

  // Tabs
  $('.corrupcion-tabs')?.addEventListener('click', (e)=>{
    const btn = e.target.closest('.corrupcion-tab');
    if(!btn) return;
    $$('.corrupcion-tab').forEach(b=> b.classList.toggle('is-active', b===btn));
    // Si agregas más paneles, alterna aquí.
  });
}
init();

/* =========================
   Fin Corrupción
   ========================= */
