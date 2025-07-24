const mostrarJuego = () => {
  document.querySelector("#inicio").style.display = "none";
  document.querySelector("#juego").style.display = "flex";
  document.querySelector("#titulo-juego").textContent = `${mascotaNombre}, Entrena y sobrevive!`;
  document.querySelector("#img-personaje").src = personajeSeleccionado.img;
  document.querySelector("#subtitulo-juego").textContent = personajeSeleccionado.name;
  actualizarBarras();
  intervaloEstados = setInterval(bajarEstados, 10000);
};

// Iniciar juego
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
