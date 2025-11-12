// ==== DATASET ORIGINAL ====
const participants = [
  { name: "Daira Cano", city: "Lima", img: "https://i.imgur.com/4AiXzf8.jpeg" },
  { name: "Gesú Billy Castañeda", city: "Villa Rica", img: "https://i.imgur.com/kX6a5cz.jpeg" },
  { name: "Laura Ramos", city: "Arequipa", img: "https://i.imgur.com/ahN6ZsF.jpeg" },
  { name: "Mayli Torres", city: "Cusco", img: "https://i.imgur.com/lRZthDl.jpeg" },
  { name: "Anthony Rojas", city: "Chiclayo", img: "https://i.imgur.com/nZ2WZwY.jpeg" },
  { name: "Lucero Pacheco", city: "Huancayo", img: "https://i.imgur.com/Wi4H5GU.jpeg" },
  { name: "Franco Valverde", city: "Trujillo", img: "https://i.imgur.com/fYJZf6X.jpeg" },
  { name: "Fiorella Zegarra", city: "Ica", img: "https://i.imgur.com/sM0iMu5.jpeg" },
  { name: "Carlos Jiménez", city: "Lima", img: "https://i.imgur.com/yNabJXx.jpeg" }
];

// ==== RENDER PARTICIPANTES ====
function renderParticipants(list, container) {
  container.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="card-body">
        <h4 class="card-title">${p.name}</h4>
        <p>${p.city}</p>
        <button class="btn">Ver perfil</button>
      </div>`;
    container.appendChild(card);
  });
}

renderParticipants(participants, document.getElementById('participantsGrid'));
renderParticipants(participants, document.getElementById('participantsGrid2'));

// ==== ACTIVIDADES ====
const activities = [
  { title: "Corrupción en América Latina", desc: "Analiza causas y efectos de la corrupción estructural en la región." },
  { title: "Transparencia y rendición de cuentas", desc: "Discute la importancia del control ciudadano y los datos abiertos." },
  { title: "Integridad pública y educación cívica", desc: "Promueve la ética y la cultura de cumplimiento en la administración." }
];

function renderActivities() {
  const c = document.getElementById('activitiesContainer');
  activities.forEach(a => {
    const div = document.createElement('div');
    div.className = 'activity';
    div.innerHTML = `<h4>${a.title}</h4><p>${a.desc}</p>`;
    c.appendChild(div);
  });
}
renderActivities();

// ==== DESCARGA PERÚ VS MÉXICO ====
function slugify(n) {
  return n.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[^A-Za-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
}
const nombre = 'Gesú Billy Castañeda Ore';
const fileName = `EC2_Peru_vs_Mexico_${slugify(nombre)}.docx`;

function descargarMexico() {
  const a = document.createElement('a');
  a.href = 'https://github.com/GESU2020/Tinder_Roblox/raw/refs/heads/main/assets/downloads/EC2_Peru%20vs%20Mexico.docx';
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
