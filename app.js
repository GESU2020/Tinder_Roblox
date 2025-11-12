/* Utilidades breves */
const $ = (q, c=document)=> c.querySelector(q);
const $$ = (q, c=document)=> [...c.querySelectorAll(q)];
const el = (tag, attrs={}) => Object.assign(document.createElement(tag), attrs);

/* =========================
   DATASETS ORIGINALES
   =========================
   Conserva tus arrays/datasets tal como estaban: PEOPLE, ACTIVITIES, QUIZZES, etc.
   (Se muestra abreviado; pega aquí el contenido completo de tu archivo original si lo necesitas)
*/
const PEOPLE = window.PEOPLE || [];   // <- tu dataset original de participantes
const ACTIVITIES = window.ACTIVITIES || []; // <- tus 3 actividades originales
const QUIZZES = window.QUIZZES || {}; // <- preguntas/respuestas por actividad

/* =========================
   DECK (inicio) — igual que original (abreviado)
   ========================= */
const deckShell = $('#deckShell'); let deckIdx = 0;
function renderDots(){
  const dots = $('#dots'); dots.innerHTML = PEOPLE.map((_,i)=>`<span class="${i===deckIdx?'active':''}"></span>`).join('');
}
function renderDeck(){
  if(!PEOPLE.length){ deckShell.innerHTML = `<div style="opacity:.75">Sin personas</div>`; return; }
  deckShell.innerHTML = '';
  const p = PEOPLE[deckIdx];
  const card = el('article', {class:'deck-card'});
  const imgUrl = (p.photos?.[0]?.url) || p.avatar;
  const alt = (p.id==='gesu') ? 'Gesú - participante' : (p.name || 'Participante');
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
function flash(type){ const id=(type==='like')?'#badgeLike':'#badgeNope'; const b=deckShell.querySelector(id); if(!b) return; b.style.opacity=1; setTimeout(()=>b.style.opacity=0, 400); }
$('#zoneRight').addEventListener('click', ()=>{ flash('like'); next(); });
$('#zoneLeft').addEventListener('click', ()=>{ flash('nope'); prev(); });
$('#btnLike').addEventListener('click', ()=>{ flash('like'); next(); });
$('#btnNope').addEventListener('click', ()=>{ flash('nope'); next(); });
$('#btnOpen').addEventListener('click', ()=> openProfile(PEOPLE[deckIdx]?.id));

/* =========================
   PARTICIPANTES (restaurado)
   ========================= */
const masonry = $('#peopleMasonry');
function chip(text, cls=''){ return `<span class="chip ${cls}">${text}</span>`; }
function renderParticipants(){
  if(!masonry) return;
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

/* =========================
   PERFIL (modal) — abreviado
   ========================= */
function openProfile(id){
  const p = PEOPLE.find(x=>x.id===id); if(!p) return;
  $('#perfilTitle').textContent = p.name || '';
  $('#perfilMeta').textContent = [p.city,p.role,p.gender].filter(Boolean).join(' · ');
  $('#perfilDesc').textContent = p.bio || '';
  const track = $('#carTrack');
  track.innerHTML = (p.photos||[]).map(ph=>`<img src="${ph.url}" alt="${p.name||'foto'}" style="height:280px;border-radius:12px" />`).join('');
  $('#perfilModal').setAttribute('aria-hidden','false');
}
$('#modalClose').addEventListener('click', ()=>$('#perfilModal').setAttribute('aria-hidden','true'));

/* =========================
   ACTIVIDADES + QUIZ (restaurado, abreviado)
   ========================= */
const actGrid = $('#actGrid');
function renderActivities(){
  if(!actGrid) return;
  actGrid.innerHTML = ACTIVITIES.map(a=>`
    <article class="act-card" data-id="${a.id}">
      <h4>${a.title}</h4>
      <p>${a.desc||''}</p>
      <div class="act-tags">${(a.tags||[]).map(t=>`<span class="pill">${t}</span>`).join('')}</div>
    </article>
  `).join('');
}
actGrid?.addEventListener('click', (e)=>{
  const card = e.target.closest('.act-card'); if(!card) return;
  openQuiz(card.dataset.id);
});
function openQuiz(id){
  const q = QUIZZES[id]; if(!q) return;
  const shell = $('#quizShell');
  let i=0, ok=0;
  const render = ()=>{
    const step = q[i];
    if(!step){
      shell.innerHTML = `
        <h3 id="quizTitle">Resultado</h3>
        <p>Respuestas correctas: ${ok} / ${q.length}</p>
        <div class="qf-actions">
          <button class="btn" id="qAgain">Reintentar</button>
          <button class="btn btn-cta" id="qClose">Cerrar</button>
        </div>`;
      $('#qAgain').onclick=()=>{ i=0; ok=0; render(); };
      $('#qClose').onclick=()=> $('#quizModal').setAttribute('aria-hidden','true');
      return;
    }
    shell.innerHTML = `
      <h3 id="quizTitle">${step.q}</h3>
      <div style="display:grid;gap:8px;margin-top:8px">
        ${step.a.map((opt,idx)=>`<button class="btn" data-i="${idx}">${opt}</button>`).join('')}
      </div>`;
    $$('#quizShell .btn').forEach(b=>{
      b.onclick=()=>{
        if(+b.dataset.i === step.ok) ok++;
        i++; render();
      };
    });
  };
  $('#quizModal').setAttribute('aria-hidden','false'); render();
}
$('#quizClose').addEventListener('click', ()=> $('#quizModal').setAttribute('aria-hidden','true'));

/* =========================
   NAVEGACIÓN HASH + INIT
   ========================= */
function parseHash(){
  const h=location.hash.replace(/^#/, '')||'';
  const [name, qs=''] = h.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  return {name, query};
}
function handleHash(){
  const r = parseHash();
  if(r.name==='perfil'){ openProfile(r.query.id); }
  if(r.name==='actividad'){ openQuiz(r.query.id); }
  if(r.name==='corrupcion'){ corruptionOpen(); }
}
window.addEventListener('hashchange', handleHash);

function init(){
  renderDeck();
  renderParticipants();
  renderActivities();
  handleHash();

  // Smooth scroll + Corrupción
  $$('.nav a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el){
          el.removeAttribute?.('hidden');
          el.scrollIntoView({behavior:'smooth'});
          if(href==='#corrupcion'){ corruptionOpen(); }
        }
      }
    });
  });

  // Idempotente: click directo en “Perú vs México”
  $('#nav-corrupcion')?.addEventListener('click', (e)=>{
    const href = e.currentTarget.getAttribute('href');
    if(href==='#corrupcion'){ e.preventDefault(); corruptionOpen(); $('#corrupcion')?.scrollIntoView({behavior:'smooth'}); }
  });
}
init();

/* =========================
   “Perú vs México” — TEXTO + DESCARGA (sin visor)
   ========================= */
const MEX_DOCX_URL = "https://github.com/GESU2020/Tinder_Roblox/raw/refs/heads/main/assets/downloads/EC2_Peru%20vs%20Mexico.docx";
const DEFAULT_NAME = "Gesú Billy Castañeda Ore";

function slugify(n){
  return (n||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^A-Za-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
}

function descargarMexico(){
  const nombre = DEFAULT_NAME; // si quieres, podrías tomarlo de un input
  const fileName = `EC2_Peru_vs_Mexico_${slugify(nombre)}.docx`;
  const a = document.createElement('a');
  a.href = MEX_DOCX_URL;
  a.download = fileName;
  document.body.appendChild(a); a.click(); a.remove();
}

function corruptionOpen(){
  // Muestra la sección y ajusta meta
  const sec = document.getElementById('corrupcion');
  if(sec?.hasAttribute('hidden')) sec.removeAttribute('hidden');
  try{
    document.title = 'Corrupción · Perú vs. México — Roblinder';
    let meta = document.querySelector('meta[name="description"]');
    if(!meta){ meta = document.createElement('meta'); meta.setAttribute('name','description'); document.head.appendChild(meta); }
    meta.setAttribute('content','Informe comparativo Perú vs México mostrado en página oscura, con descarga DOCX.');
  }catch(_){}

  // Botón “Descargar documento” con nombre dinámico
  const a = document.getElementById('corrupcion-download');
  if(a){
    const fileName = `EC2_Peru_vs_Mexico_${slugify(DEFAULT_NAME)}.docx`;
    a.href = MEX_DOCX_URL;
    a.setAttribute('download', fileName);
    a.onclick = (e)=>{ e.preventDefault(); descargarMexico(); };
  }
}
/* =========================
   FIN
   ========================= */
