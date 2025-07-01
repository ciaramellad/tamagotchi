let nombre = "";
let estados = [
  { nombre: "hambre", valor: 100 },
  { nombre: "diversion", valor: 100 },
  { nombre: "sueno", valor: 100 },
  { nombre: "limpieza", valor: 100 }
];

setInterval(() => {
  const horaActual = new Date();
  document.getElementById("reloj").textContent = horaActual.toLocaleString();
}, 1000);

function crearTamagotchi() {
  const inputNombre = document.getElementById("nombre").value.trim();
  if (!inputNombre) {
    alert("No te olvides de ponerle nombre");
    return;
  }

  nombre = inputNombre;
  document.getElementById("saludo").textContent = `Hola soy ${nombre}, tu mascota virtual`;
  document.getElementById("formulario").classList.add("hidden");
  document.getElementById("container-info").classList.remove("hidden");

  estados.forEach(e => {
    e.valor = Math.floor(Math.random() * 50) + 21;
  });

  actualizarEstado();
  guardarDatos();
}

function bajarValores() {
  estados.forEach(e => {
    e.valor = Math.max(0, e.valor - 10);
  });
  actualizarEstado();
  guardarDatos();
}

function alimentar() {
  modificarEstado("hambre", 20);
}

function jugar() {
  modificarEstado("diversion", 20);
}

function dormir() {
  modificarEstado("sueno", 20);
}

function limpiar() {
  modificarEstado("limpieza", 20);
}

function modificarEstado(nombreEstado, cantidad) {
  const estado = estados.find(e => e.nombre === nombreEstado);
  if (estado) {
    estado.valor = Math.min(100, estado.valor + cantidad);
    actualizarEstado();
    guardarDatos();
  }
}

function actualizarEstado() {
  estados.forEach(e => {
    document.getElementById(e.nombre).textContent = e.valor;
  });
}

function reiniciar() {
  localStorage.removeItem("tamagotchi");
  location.reload();
}

function toggleModo() {
  document.body.classList.toggle("dark-mode");
}

function guardarDatos() {
  const datos = {
    nombre,
    estados: estados.map(e => ({ nombre: e.nombre, valor: e.valor }))
  };
  localStorage.setItem("tamagotchi", JSON.stringify(datos));
}

function cargarDatos() {
  const datos = JSON.parse(localStorage.getItem("tamagotchi"));
  if (datos) {
    nombre = datos.nombre;
    estados.forEach(e => {
      const guardado = datos.estados.find(est => est.nombre === e.nombre);
      if (guardado) e.valor = guardado.valor;
    });
    document.getElementById("saludo").textContent = `Hola soy ${nombre}, tu mascota virtual`;
    document.getElementById("formulario").classList.add("hidden");
    document.getElementById("container-info").classList.remove("hidden");
    actualizarEstado();
  }
}

window.onload = () => {
  cargarDatos();
  setInterval(bajarValores, 1800000);
};
