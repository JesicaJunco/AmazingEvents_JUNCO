import data from "./amazing.js";
const fecha = data.currentDate;

let { events } = data;

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
 padre.appendChild(fragment);