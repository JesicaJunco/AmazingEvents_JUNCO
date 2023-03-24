
import {pintarCard, createCheckboxes,filtroCombinado,filtrarPorTexto,filtrarCategoria } from "./functions.js"; 
//capturo los contenedores de card, checkbox, y el input del buscador
const contenedor = document.getElementById("contenedorCard");
const contenedorCheck = document.getElementById("checkContainer");
const buscador = document.querySelector(".form-control");

let eventsList;
async function getEvents(){
  await fetch('../amazing.json')      
  .then (response => response.json()) 
  .then (data =>{  
    eventsList = data.events     
    const fecha = data.currentDate;

    function upcomingEvent(eventsList, fecha) {
      let eventos = []
      eventsList.forEach((event) => {
        if (fecha < event.date) {
          eventos.push(event)
        }
      });
      console.log(eventos)
      return eventos;
    }
    const filteredEvents = upcomingEvent(eventsList, fecha);
    pintarCard(filteredEvents, contenedor);
    createCheckboxes(filteredEvents, contenedorCheck);

  }).catch(err => console.error(err));   
  
}
getEvents();

buscador.addEventListener("input", () => {
  filtroCombinado(eventsList, buscador.value, contenedor)
});

contenedorCheck.addEventListener("change", () => {
  filtroCombinado(eventsList, buscador.value, contenedor)
});