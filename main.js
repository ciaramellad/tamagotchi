const nombre = prompt("¿Cómo se llama tu Tamagotchi?");
alert(`¡Hola! Adoptaste a ${nombre}`);


let hambre = 5;
let energia = 5;
let felicidad = 5;
const maximo = 10;


function mostrarEstado() {
  console.log(`Estado de ${nombre}:`);
  console.log("Hambre:", hambre);
  console.log("Energía:", energia);
  console.log("Felicidad:", felicidad);
}


function alimentar() {
  if (hambre > 0) {
    hambre--;
    felicidad++;
    alert(`${nombre} está con hambre`);
  } else {
    alert(`${nombre} no tiene más hambre. ¡Panza llena corazón contento!`);
  }
}


function jugar() {
  if (energia > 0) {
    energia--;
    felicidad += 2;
    alert(`Jugaste con ${nombre}.`);
  } else {
    alert(`${nombre} está muy cansado para jugar`);
  }
}


function dormir() {
  energia = maximo;
  alert(`${nombre} está recuperando toda su energía`);
}

let continuar = true;
do {
  mostrarEstado();
  let accion = prompt(`¿Qué querés hacer con ${nombre}? (comer / jugar / dormir / salir)`).toLowerCase();

  if (accion === "comer") {
    alimentar();
  } else if (accion === "jugar") {
    jugar();
  } else if (accion === "dormir") {
    dormir();
  } else if (accion === "salir") {
    continuar = false;
    alert(`Hasta luego!`);
  } else {
    alert("Ups, opción no valida. Tu mascota te está esperando");
  }

} while (continuar);
