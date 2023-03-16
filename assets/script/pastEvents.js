import data from "./amazing.js";
import { pintarCard, createCheckboxes, filtroCombinado, filtrarPorTexto, filtrarCategoria } from "./functions.js";
//capturo los contenedores de card, checkbox, y el input del buscador
const contenedor = document.getElementById("contenedorCard");
const contenedorCheck = document.getElementById("checkContainer");
const buscador = document.querySelector(".form-control");

const fecha = data.currentDate;

let { events } = data;
pintarCard(events, contenedor)
createCheckboxes(events, contenedorCheck);
pastEvent(events, fecha)

buscador.addEventListener("input", () => {
  filtroCombinado(events, buscador.value, contenedor)
});

contenedorCheck.addEventListener("change", () => {
  filtroCombinado(events, buscador.value, contenedor)
});

function pastEvent(eventsArray, date) {
  let eventos = []
  eventsArray.forEach((event) => {
    if (date < event.date) {
      eventos.push(event)
    }
  });
  pintarCard(eventos, contenedor)
}

/* 
  const template = document.querySelector(".plantilla").content;
    const padre = document.querySelector(".card-group");
    const fragment = document.createDocumentFragment();

  events.forEach(event => {
    template.querySelector(".card-title").textContent = event.name;
    template.querySelector(".card-text").textContent = event.description;
    template.querySelector(".card-img-top").src = event.image;
    template.querySelector(".card-price").innerHTML = event.price;

    const copia = template.cloneNode(true);
    fragment.appendChild(copia);

  })
 padre.appendChild(fragment); */