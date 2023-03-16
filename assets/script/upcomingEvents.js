import data from "./amazing.js";
import {pintarCard, createCheckboxes,filtroCombinado,filtrarPorTexto,filtrarCategoria } from "./functions.js"; 
//capturo los contenedores de card, checkbox, y el input del buscador
const contenedor = document.getElementById("contenedorCard");
const contenedorCheck = document.getElementById("checkContainer");
const buscador = document.querySelector(".form-control");
let { events } = data;
const fecha = data.currentDate;

createCheckboxes(events, contenedorCheck);
upcomingEvent(events, fecha)

buscador.addEventListener("input", () => {
  filtroCombinado(events, buscador.value, contenedor)
});

contenedorCheck.addEventListener("change", () => {
  filtroCombinado(events, buscador.value, contenedor)
});

 function upcomingEvent(eventsArray, date) {
  let eventos = []
  eventsArray.forEach((event) => {
    if (date > event.date) {
      eventos.push(event)
    }
  });
  pintarCard(eventos, contenedor)
}

/* function pintarCard(array, cardsContainer){
    if(array.length == 0){
        cardsContainer.innerHTML = `<h2>Event not found</h2>`
        return
    }
    let tarjetas = ''
    array.forEach(event => {
        if(events >date)tarjetas += `
        <div class="d-flex mb-3 justify-content-center">
        <div class="card h-100 border-redonded-8px shadow-sm p-1 $gray-500 aling-items-center">
            <div class="card-body d-flex flex-column">
                <img class="card-img-top " src="${event.image}" alt="Card img food fair">
                <div class="d-flex flex-column flex-grow-1">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="card-footer d-flex justify-content-between gap-1 align-items-center">
                    <p class=" align-self-center mt-1">Price $${event.price} </p>
                    <p class="card-price align-self-center mt-1"></p>
                    <a href="./pages/details.html" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
    </div>
    `
    })
    cardsContainer.innerHTML = tarjetas;
} 
 */

/* 
const template = document.querySelector(".plantilla").content;
const padre = document.querySelector(".card-group");
const fragment = document.createDocumentFragment();

pastEvents.forEach(event => {
  template.querySelector(".card-title").textContent = event.name;
  template.querySelector(".card-text").textContent = event.description;
  template.querySelector(".card-img-top").src = event.image;
  template.querySelector(".card-price").innerHTML = event.price;

  const copia = template.cloneNode(true);
  fragment.appendChild(copia);

})
padre.appendChild(fragment); */