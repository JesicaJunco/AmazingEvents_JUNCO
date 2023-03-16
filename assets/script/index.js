import data from "./amazing.js";
import {pintarCard, createCheckboxes,filtroCombinado,filtrarPorTexto,filtrarCategoria } from "./functions.js"; 
//capturo los contenedores de card, checkbox, y el input del buscador
const contenedor = document.getElementById("contenedorCard");
const contenedorCheck = document.getElementById("checkContainer");
const buscador = document.querySelector(".form-control");

const fecha = data.currentDate;

let { events } = data;
pintarCard(events, contenedor)
createCheckboxes(events, contenedorCheck);


buscador.addEventListener("input", () => {
  filtroCombinado(events, buscador.value, contenedor)
});

contenedorCheck.addEventListener("change", () => {
  filtroCombinado(events, buscador.value, contenedor)
});
