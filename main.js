const personajes = [
  { id: 1, name: "R2-D2", img: "/assets/personajes_starwars/r2d2.gif" },
  { id: 2, name: "Darth Vader", img: "assets/personajes_starwars/darth_vader.gif" },
  { id: 3, name: "Yoda", img: "assets/personajes_starwars/yoda_baby.gif" },
  { id: 4, name: "Princesa Leia", img: "assets/personajes_starwars/leia_organa.png" },
  { id: 5, name: "Chewbacca", img: "assets/personajes_starwars/chewbacca.png" },
  { id: 6, name: "C3 PO", img: "assets/personajes_starwars/c3po.png" }
];

let calma; 
let sabiduria; 
let fuerza;
let mascotaNombre = "";
let personajeSeleccionado = null;
let intervaloEstados;

const inicio = document.querySelector("#inicio");
const juego = document.querySelector("#juego");
const nombreInput = document.querySelector("#nombre");
const personajesSelect = document.querySelector("#personajes");
const startBtn = document.querySelector("#start-btn");

const tituloJuego = document.querySelector("#titulo-juego");
const subtituloJuego = document.querySelector("#subtitulo-juego");
const imgPersonaje = document.querySelector("#img-personaje");

const calmaBarra = document.querySelector("#calma-barra");
const sabiduriaBarra = document.querySelector("#sabiduria-barra");
const fuerzaBarra = document.querySelector("#fuerza-barra");

const meditarBtn = document.querySelector("#meditar-btn");
const entrenarBtn = document.querySelector("#entrenar-btn");
const batallarBtn = document.querySelector("#batallar-btn");

const reiniciarBtn = document.querySelector("#reiniciar-btn");
const darkmodeBtn = document.querySelector("#darkmode-btn");

document.addEventListener("DOMContentLoaded", () => {
  cargarPersonajes();

  if (cargarEstado()) {
    mostrarJuego();
  } else {
    inicio.classList.add("visible-flex");
    inicio.classList.remove("oculto");
    juego.classList.add("oculto");
    juego.classList.remove("visible-flex");
  }
});

const cargarPersonajes = () => {
  personajesSelect.innerHTML = "";
  personajes.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.name;
    personajesSelect.appendChild(option);
  });
};


const actualizarBarras = () => {
  const estados = {
    calma: calma,
    sabiduria: sabiduria,
    fuerza: fuerza
  };

  for (const estado in estados) {
    const barra = document.querySelector(`#${estado}-barra`);
    barra.style.width = estados[estado] + "%";
  }
};


const cambiarEstado = (tipo, cantidad) => {
  if (tipo === "calma") calma = Math.min(100, Math.max(0, calma + cantidad));
  if (tipo === "sabiduria") sabiduria = Math.min(100, Math.max(0, sabiduria + cantidad));
  if (tipo === "fuerza") fuerza = Math.min(100, Math.max(0, fuerza + cantidad));
  actualizarBarras();
  guardarEstado();
};


const guardarEstado = () => {
  const estado = { 
    calma, 
    sabiduria, 
    fuerza, 
    mascotaNombre, 
    personajeId: personajeSeleccionado.id 
  };

  localStorage.setItem("starwars-tamagotchi", JSON.stringify(estado));
};


const cargarEstado = () => {
  const estado = JSON.parse(localStorage.getItem("starwars-tamagotchi"));
  if (estado) {
    calma = estado.calma;
    sabiduria = estado.sabiduria;
    fuerza = estado.fuerza;
    mascotaNombre = estado.mascotaNombre;
    personajeSeleccionado = personajes.find(p => p.id === estado.personajeId) || personajes[0];
    return true;
  }
  return false;
};


const bajarEstados = () => {
  cambiarEstado("calma", -5);
  cambiarEstado("sabiduria", -5);
  cambiarEstado("fuerza", -5);
};


const mostrarJuego = () => {
  document.querySelector("#inicio").style.display = "none";
  document.querySelector("#juego").style.display = "flex";
  document.querySelector("#titulo-juego").textContent = `${mascotaNombre}, Entrena y sobrevive!`;
  document.querySelector("#img-personaje").src = personajeSeleccionado.img;
  document.querySelector("#subtitulo-juego").textContent = personajeSeleccionado.name;
  actualizarBarras();
  intervaloEstados = setInterval(bajarEstados, 10000);
};

const iniciarJuego = () => {
  const nombre = nombreInput.value.trim();
  const personajeId = parseInt(personajesSelect.value);

  if (!nombre) {
    Swal.fire("Error", "Por favor ingresa el nombre de tu mascota.", "warning");
    return;
  }
  if (!personajeId) {
    Swal.fire("Error", "Por favor selecciona un personaje.", "warning");
    return;
  }

  mascotaNombre = nombre;
  personajeSeleccionado = personajes.find(p => p.id === personajeId);
  calma = Math.floor(Math.random() * 41) + 60;
  sabiduria = Math.floor(Math.random() * 41) + 40;
  fuerza = Math.floor(Math.random() * 41) + 20;

  guardarEstado();
  mostrarJuego();
};

const meditar = () => {
  cambiarEstado("calma", +10);
  cambiarEstado("fuerza", -5);
  cambiarEstado("sabiduria", +5);
};

const entrenar = () => {
  cambiarEstado("fuerza", +10);
  cambiarEstado("calma", -5);
  cambiarEstado("sabiduria", -5);
};

const batallar = () => {
  cambiarEstado("sabiduria", +10);
  cambiarEstado("calma", -10);
  cambiarEstado("fuerza", -5);
};


const reiniciarJuego = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se reiniciará tu tamagotchi.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, reiniciar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("starwars-tamagotchi");
      clearInterval(intervaloEstados);
      location.reload();
    }
  });
};


const toggleModo = () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkmodeBtn.textContent = "Light";
  } else {
    darkmodeBtn.textContent = "Dark";
  }
};


const actualizarTextoDarkmodeBtn = () => {
  if (document.body.classList.contains("dark-mode")) {
    darkmodeBtn.textContent = "Modo Claro";
  } else {
    darkmodeBtn.textContent = "Modo Oscuro";
  }
};


if (cargarEstado()) {
  mostrarJuego();
} else {
  inicio.classList.add("visible-flex");
  inicio.classList.remove("oculto");
  juego.classList.add("oculto");
  juego.classList.remove("visible-flex");
}


darkmodeBtn.addEventListener("click", () => {
  toggleModo();
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("modoOscuro", isDark);
});


startBtn.addEventListener("click", iniciarJuego);
meditarBtn.addEventListener("click", meditar);
entrenarBtn.addEventListener("click", entrenar);
batallarBtn.addEventListener("click", batallar);
reiniciarBtn.addEventListener("click", reiniciarJuego);
