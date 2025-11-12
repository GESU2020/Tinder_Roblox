/* =========================
   Roblinder · App (Vanilla JS)
   (Incluye NEW v2 + FIX Perú vs México)
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

/* ---------- Utils ---------- */
const $ = (s, r=document)=> r.querySelector(s);
const $$ = (s, r=document)=> Array.from(r.querySelectorAll(s));
function el(tag, attrs={}, html=''){ const n=document.createElement(tag); for(const [k,v] of Object.entries(attrs)){ if(v!=null) n.setAttribute(k, v); } if(html!==''&&html!=null) n.innerHTML=html; return n; }
function toast(msg){ const t=el('div',{class:'toast'}); t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 1800); }
function parseHash(){ const h=(location.hash||'').replace(/^#/,''); if(!h) return {name:'',query:{}}; const [name, q] = h.split('?'); const query={}; if(q) new URLSearchParams(q).forEach((v,k)=> query[k]=v); return {name, query}; }
function slugifyNombre(n){ return n.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }

/* ---------- (Datos demo deck/actividades — igual que antes) ---------- */
/* … (mantén aquí tus PEOPLE y ACTIVITIES originales si ya existían) … */

/* ---------- DECK interacciones (sin cambios) ---------- */
let deckIdx = 0;
const deckShell = $('#deckShell'), dotsEl = $('#dots');
function renderDots(){ if(!dotsEl) return; dotsEl.innerHTML = (window.PEOPLE||[]).map((_,i)=>`<span class="dot ${i===deckIdx?'active':''}"></span>`).join(''); }
function renderDeck(){
  const P = window.PEOPLE||[]; const p = P[deckIdx]; if(!p||!deckShell) return;
  deckShell.querySelectorAll('.deck-card').forEach(n=>n.remove());
  const imgUrl = (p.photos?.[0]?.url) || p.avatar;
  const card = el('article', {class:`deck-card ${p.isProfessor?'pro-gold':''}`});
  card.innerHTML = `
    <img src="${imgUrl}" alt="${p.name||'Participante'}" />
    <div class="badge like" id="badgeLike">LIKE</div>
    <div class="badge nope" id="badgeNope">NOPE</div>
    <div class="deck-meta">
      <div class="deck-name">${p.name||''} · ${p.age ?? ''}</div>
      <div class="deck-sub">${p.city ?? ''} · ${p.role ?? ''} · ${p.gender ?? ''}${p.isProfessor?' · <span class="p-badge">Profesor</span>':''}</div>
      <div class="deck-tags">${(p.tags||[]).map(t=>`<span class='pill'>${t}</span>`).join('')}</div>
    </div>`;
  card.addEventListener('click', ()=> openProfile(p.id));
  deckShell.appendChild(card);
  renderDots();
}
function next(){ const P=window.PEOPLE||[]; deckIdx = P.length? (deckIdx+1)%P.length : 0; renderDeck(); }
function prev(){ const P=window.PEOPLE||[]; deckIdx = P.length? (deckIdx-1+P.length)%P.length : 0; renderDeck(); }
function flash(type){ const id=(type==='like')?'#badgeLike':'#badgeNope'; const b=deckShell?.querySelector(id); if(!b) return; b.style.opacity=1; setTimeout(()=>b.style.opacity=0, 400); }

$('#zoneRight')?.addEventListener('click', ()=>{ flash('like'); next(); });
$('#zoneLeft')?.addEventListener('click', ()=>{ flash('nope'); prev(); });
$('#btnLike')?.addEventListener('click', ()=>{ flash('like'); next(); });
$('#btnNope')?.addEventListener('click', ()=>{ flash('nope'); next(); });
$('#btnOpen')?.addEventListener('click', ()=> openProfile((window.PEOPLE||[])[deckIdx]?.id));

/* ---------- PARTICIPANTES / QUIZ (igual que antes) ---------- */
/* … tu renderParticipants(), modales, quiz … */

/* ---------- Rutas ---------- */
function handleHash(){
  const r = parseHash();
  if(r.name==='perfil'){ openProfile(r.query.id); }
  if(r.name==='actividad'){ openQuiz(r.query.id); }
  if(r.name==='corrupcion'){ corruptionOpen(true); }
  if(r.name==='peru-vs-dinamarca'){ pvdOpen(true); }               // v1 (se mantiene)
  if(r.name==='peru-vs-dinamarca-v2'){ pvdV2Open(true); }          // NEW v2
}
window.addEventListener('hashchange', handleHash);

/* ---------- INIT ---------- */
function init(){
  renderDeck();
  /* renderParticipants(); renderActivities();  ← si ya estaban en tu app, déjalos */
  handleHash();

  // Smooth scroll + click handlers de nav (inician audio al primer clic)
  let audioStarted = false;
  function startBgAudioOnce(){
    if(audioStarted) return;
    const a = $('#bgAudio');
    if(a){
      a.volume = 0.10; // 0.08–0.12
      a.play().then(()=>{ audioStarted = true; }).catch(()=>{ /* bloqueo del navegador */ });
    } else {
      audioStarted = true;
    }
  }

  $$('.nav a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(!href || !href.startsWith('#')) return;
      e.preventDefault();
      const el = document.querySelector(href);
      if(el){
        el.removeAttribute?.('hidden');
        el.scrollIntoView({behavior:'smooth'});
        if(href==='#corrupcion'){ corruptionOpen(true); }
        if(href==='#peru-vs-dinamarca'){ pvdOpen(true); }           // v1
        if(href==='#peru-vs-dinamarca-v2'){ pvdV2Open(true); }      // v2
        startBgAudioOnce();                                         // FIX 6
      }
    });
  });

  // Clicks directos por id
  $('#nav-corrupcion')?.addEventListener('click', (e)=>{
    e.preventDefault(); corruptionOpen(true);
    $('#corrupcion')?.scrollIntoView({behavior:'smooth'});
  });
  $('#nav-pvd')?.addEventListener('click', (e)=>{
    e.preventDefault(); pvdOpen(true);
    $('#peru-vs-dinamarca')?.scrollIntoView({behavior:'smooth'});
  });
  $('#nav-pvd2')?.addEventListener('click', (e)=>{
    e.preventDefault(); pvdV2Open(true);
    $('#peru-vs-dinamarca-v2')?.scrollIntoView({behavior:'smooth'});
  });
}
init();

/* ==========================================================
   FIX 1 — Perú vs México: visor (iframe) + fallback
   ========================================================== */
const CORRUP_PERU_MEXICO_DOCX = "https://github.com/GESU2020/Tinder_Roblox/raw/refs/heads/main/assets/downloads/Peru%20vs%20Mexico_Daira.docx"; // si cambia, reemplázalo
const OFFICE_EMBED_BASE = "https://view.officeapps.live.com/op/embed.aspx?src=";

let corruptionBoot = false;

function corruptionOpen(fromClick=false){
  const sec = $('#corrupcion');
  if(sec?.hasAttribute('hidden')) sec.removeAttribute('hidden');

  // SEO básico
  try {
    document.title = 'Perú vs México — Informe (visor)';
  } catch(_){}

  // Enlace de descarga visible
  const aDown = $('#corrupcion-download');
  if(aDown){
    aDown.href = CORRUP_PERU_MEXICO_DOCX;
    aDown.download = 'Peru_vs_Mexico.docx';
  }

  // Configurar iframe + fallback
  const ifr = $('#corrupcion-iframe');
  const fb  = $('#corrupcion-fallback');
  const fbLink = $('#corrupcion-fallback-link');
  if(!ifr){ return; }

  const viewerUrl = OFFICE_EMBED_BASE + encodeURIComponent(CORRUP_PERU_MEXICO_DOCX);
  let loaded = false;
  ifr.onload = ()=>{ loaded = true; if(fb) fb.hidden = true; };
  ifr.src = viewerUrl;

  // Timeout de 3s: si no carga, abrir en nueva pestaña y mostrar fallback
  setTimeout(()=>{
    if(!loaded){
      fbLink && (fbLink.href = CORRUP_PERU_MEXICO_DOCX);
      if(fb) fb.hidden = false;
      try{ window.open(CORRUP_PERU_MEXICO_DOCX, '_blank', 'noopener'); }catch(_){}
    }
  }, 3000);
}

/* ==========================================================
   v1 (Perú vs Dinamarca) — si existe tu lógica previa, mantenla
   ========================================================== */
function pvdOpen(/*fromClick*/){
  // Mantén tu implementación v1 sin cambios
}

/* ==========================================================
   NEW — v2 Perú vs Dinamarca (con fixes)
   ========================================================== */
const PV2_DOC_URL = "https://github.com/GESU2020/Tinder_Roblox/raw/refs/heads/main/assets/downloads/EC2_Peru%20vs%20Dinamarca.docx";

let pv2Boot = false;

function pvdV2Open(fromClick=false){
  const sec = $('#peru-vs-dinamarca-v2');
  if(sec?.hasAttribute('hidden')) sec.removeAttribute('hidden');

  try { document.title = 'Perú vs Dinamarca (v2) — Roblinder'; } catch(_){}

  // Primera vez: enlazar animaciones y fallbacks
  if(!pv2Boot){
    pv2Boot = true;

    // Split vertical (entrada): animar a sin clip-path
    requestAnimationFrame(()=>{
      $('#pv2-left')?.classList.add('animate');
      $('#pv2-right')?.classList.add('animate');
    });

    // Fallback: si V3 falla, espejar V2
    const v3 = $('#pv2-v3');
    const v2src = $('#pv2-v2')?.getAttribute('src') || '';
    if(v3){
      v3.onerror = ()=>{
        if(v2src){
          v3.src = v2src;
          v3.style.transform = 'scaleX(-1)';
        }
      };
    }

    // Stinger (V4) cuando entra el panel Versus (una vez)
    const st = $('#pv2-v4');
    if('IntersectionObserver' in window && st){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(en=>{
          if(en.isIntersecting){
            st.style.opacity = .15;
            st.currentTime = 0;
            st.play().catch(()=>{});
            st.onended = ()=>{ st.style.opacity = 0; };
            io.disconnect();
          }
        });
      }, {threshold:.35});
      io.observe($('#pv2-versus'));
    }

    // Descargar DOCX con nombre dinámico
    $('#pv2-download')?.addEventListener('click', async ()=>{
      const input = $('#nombreIntegranteV2');
      const nombre = (input?.value || 'Gesú Billy Castañeda Ore').trim() || 'Gesú Billy Castañeda Ore';
      const fileName = `EC2_Peru_vs_Dinamarca_${slugifyNombre(nombre)}.docx`;
      try{
        const r = await fetch(PV2_DOC_URL, {mode:'cors', cache:'no-store'});
        if(!r.ok) throw new Error('HTTP '+r.status);
        const blob = await r.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = fileName;
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
      }catch(_){
        const a = document.createElement('a');
        a.href = PV2_DOC_URL; a.setAttribute('download', fileName);
        document.body.appendChild(a); a.click(); a.remove();
      }
    });
  }

  // Audio ambiente: tras primera interacción (clic de menú)
  if(fromClick){
    const audio = $('#bgAudio');
    if(audio && !audio.dataset.started){
      audio.volume = 0.10; // 0.08–0.12
      audio.play().then(()=>{ audio.dataset.started = '1'; }).catch(()=>{});
    }
  }
}

/* ==========================================================
   MODALES / PERFIL / QUIZ (placeholders si tu app ya los tenía)
   ========================================================== */
function openProfile(/*id*/){}
function openQuiz(/*id*/){}

/* ==========================================================
   Accesos rápidos teclado (deck)
   ========================================================== */
window.addEventListener('keydown', (e)=>{
  if(e.key==='ArrowRight'){ flash('like'); next(); }
  if(e.key==='ArrowLeft'){ flash('nope'); prev(); }
});
