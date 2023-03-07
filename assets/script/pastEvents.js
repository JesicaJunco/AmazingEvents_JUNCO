import data from "../script/amazing.js";
const fecha = data.currentDate;

let { events } = data;
let past = events.filter(evento => evento.date < fecha);
console.table(past);

const template = document.querySelector(".plantilla").content;
const padre = document.querySelector(".card-group");
const fragment = document.createDocumentFragment();
past.forEach((event) => {
  template.querySelector(".card-title").textContent = event.name;
  template.querySelector(".card-text").textContent = event.description;
  template.querySelector(".card-img-top").src = event.image;
  template.querySelector(".card-price").textContent = event.price;

  const copia = template.cloneNode(true);
  fragment.appendChild(copia);
});
padre.appendChild(fragment);
