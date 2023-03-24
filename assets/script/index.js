
import {pintarCard, createCheckboxes,filtroCombinado,filtrarPorTexto,filtrarCategoria } from "./functions.js"; 

//capturo los contenedores de card, checkbox, y el input del buscador
const contenedor = document.getElementById("contenedorCard");
const contenedorCheck = document.getElementById("checkContainer");
const buscador = document.querySelector(".form-control");

let eventsList;
async function getEvents(){
  await fetch('../amazing.json')      //la función usa el método fetch() para realizar una solicitud a la URL especificada para el archivo JSON. El método fetch() devuelve una Promesa, que luego se resuelve con el objeto de respuesta que representa los datos devueltos por el servidor
  .then (response => response.json()) //recibe el objeto de respuesta y usa el método .json() para extraer los datos JSON de la respuesta. Este método también devuelve una Promesa que se resuelve con los datos JSON analizados.
  .then (data =>{                     //El segundo bloque .then() recibe los datos JSON analizados y los asigna a una variable 
    eventsList = data.events
    console.log(eventsList)
    pintarCard(eventsList, contenedor)
    createCheckboxes(eventsList, contenedorCheck)

  }).catch(err => console.error(err))   //Si se produce un error durante la solicitud de obtención o el análisis de los datos JSON, el bloque .catch() detectará el error y lo registrará en la consola mediante console.error()
  
}
getEvents();


buscador.addEventListener("input", () => {
  filtroCombinado(eventsList, buscador.value, contenedor)
});

contenedorCheck.addEventListener("change", () => {
  filtroCombinado(eventsList, buscador.value, contenedor)
});
