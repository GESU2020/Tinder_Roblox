/* =========================
   Roblinder · App (Vanilla JS)
   ========================= */

/* Utilidades básicas */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* Fondo con partículas (decorativo) */
(function bg(){
  const c = document.getElementById('bgParticles');
  if(!c) return;
  const dpr = window.devicePixelRatio || 1;
  const ctx = c.getContext('2d');
  let w = c.width = window.innerWidth * dpr;
  let h = c.height = 240 * dpr;

  const N = 36;
  const points = new Array(N).fill(0).map((_,i)=>({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 2 + Math.random()*8,
    vx: -0.5 + Math.random(),
    vy: -0.5 + Math.random()
  }));

  function loop(){
    ctx.clearRect(0,0,w,h);
    ctx.globalAlpha = .25;
    points.forEach(p=>{
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.rect(p.x, p.y, p.r, p.r);
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x = w; if(p.x>w) p.x=0;
      if(p.y<0) p.y = h; if(p.y>h) p.y=0;
    });
    requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener('resize', ()=>{
    w = c.width = window.innerWidth*dpr;
    h = c.height = 240 * dpr;
  });
})();

/* Router mínimo por hash para secciones */
function parseHash(){
  const raw = (location.hash || '#deck').replace(/^#/, '');
  return { name: raw };
}

function handleHash(){
  const { name } = parseHash();
  const sections = $$('.route-section, #corrupcion, #peru-vs-dinamarca');
  sections.forEach(sec=>{
    // Solo ocultamos la corrupción si aplica; el deck/otras rutas siguen visibles según tu layout
    if(sec.id === 'corrupcion' || sec.id === 'peru-vs-dinamarca'){
      if('#'+sec.id === '#'+name) sec.removeAttribute('hidden');
      else sec.setAttribute('hidden','');
    }
  });
}
window.addEventListener('hashchange', handleHash);
document.addEventListener('DOMContentLoaded', handleHash);

/* ---- Interacciones base del sitio (mock seguro) ---- */
(function baseInteractions(){
  const deck = $('#deckShell');
  if(deck){
    $('#btnLike')?.addEventListener('click', ()=>{ deck.classList.add('liked'); setTimeout(()=>deck.classList.remove('liked'), 450); });
    $('#btnNope')?.addEventListener('click', ()=>{ deck.classList.add('noped'); setTimeout(()=>deck.classList.remove('noped'), 450); });
  }
  // Masonry/Actividades placeholders (si ya los llenas por fetch, esto no interfiere)
})();

/* ---------- Corrupción: Perú vs México (carga del documento) ---------- */
(async function corruptionLoader(){
  const mount = $('#corrupcion-content');
  if(!mount) return;
  try{
    // Si tienes un JSON procesado del DOCX, úsalo aquí. Placeholder:
    const author = 'Daira Gabriela Cano Velasco';
    $('#corrupcion-author').textContent = `Integrante: ${author}`;
    // El contenido real del DOCX debería pintarse aquí. Dejamos un placeholder.
    mount.innerHTML = `
      <article class="doc">
        <h3>Descripción de la problemática social</h3>
        <p>El documento se renderizará aquí cuando se provea el JSON del DOCX o el HTML seguro.</p>
      </article>
    `;
  } catch(err){
    mount.innerHTML = `<p>No se pudo cargar el documento. Verifica la ruta assets/docs/report.docx o el JSON intermedio.</p>`;
  }
})();

/* ==========================================================
   START: pvd-block (Perú vs Dinamarca)
   ========================================================== */

(function(){
  const PVD_LINKS = {
    docx:  "https://github.com/GESU2020/Tinder_Roblox/raw/refs/heads/main/assets/downloads/EC2_Peru%20vs%20Dinamarca.docx",
    audio: "https://github.com/GESU2020/Tinder_Roblox/raw/refs/heads/main/Corrupcion/Peru_vs_Dinamarca/audio/Sonido%20de%20fondo.MP3"
  };

  let pvdMounted = false;

  function pvdOpen(){
    const sec = document.getElementById('peru-vs-dinamarca');
    if(!sec) return;

    if(sec.hasAttribute('hidden')) sec.removeAttribute('hidden');
    try{ sec.scrollIntoView({behavior:'smooth', block:'start'}); }catch(_){}

    // SEO básico
    try{
      document.title = 'Perú vs Dinamarca — Roblinder';
      let meta = document.querySelector('meta[name="description"]');
      if(!meta){ meta = document.createElement('meta'); meta.setAttribute('name','description'); document.head.appendChild(meta); }
      meta.setAttribute('content','Comparativa en dos columnas con videos de fondo, imágenes paper-cut, bullets y descarga de documento.');
    }catch(_){}

    if(pvdMounted) return;

    // Intro video
    const intro = document.getElementById('pvdIntro');
    intro && intro.play && intro.play().catch(()=>{});

    // Stinger VERSUS al entrar
    const st = document.getElementById('pvdStinger');
    if(st){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            st.currentTime = 0;
            st.style.opacity = 1;
            st.play && st.play().catch(()=>{});
            setTimeout(()=>{ st.style.opacity = 0; }, 1400);
            io.disconnect();
          }
        });
      }, { threshold:.4 });
      const target = document.getElementById('pvdVersus') || st.parentElement;
      target && io.observe(target);
    }

    // Audio ambiente tras primera interacción
    const audio = document.getElementById('pvdAudio');
    function tryStartAudio(){
      if(!audio) return;
      audio.volume = 0.1;
      audio.loop = true;
      audio.play && audio.play().catch(()=>{});
      sec.removeEventListener('click', tryStartAudio);
    }
    sec.addEventListener('click', tryStartAudio, { once:true });

    // Descarga con nombre dinámico
    const input = document.getElementById('pvdName');
    const btn = document.getElementById('pvdDownload');
    if(btn){
      btn.href = PVD_LINKS.docx;
      const setName = ()=>{
        const raw = (input && input.value || '').trim();
        if(!raw){ btn.setAttribute('download','EC2_Peru_vs_Dinamarca.docx'); return; }
        const clean = raw.normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu,'_');
        btn.setAttribute('download', `EC2_Peru_vs_Dinamarca_${clean}.docx`);
      };
      input && input.addEventListener('input', setName);
      setName();
    }

    pvdMounted = true;
  }

  // Nav click
  document.getElementById('nav-pvd')?.addEventListener('click', (e)=>{
    e.preventDefault();
    if(location.hash !== '#peru-vs-dinamarca') location.hash = '#peru-vs-dinamarca';
    pvdOpen();
  });

  // Hash router no invasivo
  function onHash(){
    if(location.hash === '#peru-vs-dinamarca') pvdOpen();
  }
  window.addEventListener('hashchange', onHash);
  // Inicial
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', onHash);
  } else {
    onHash();
  }
})();

/* ==========================================================
   END: pvd-block
   ========================================================== */
