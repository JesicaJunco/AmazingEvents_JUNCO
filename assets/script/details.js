import data from "./amazing.js";

const queryString = location.search;
const params = new URLSearchParams(queryString);
const detailId = params.get('id');
const detailEvent = data.events.find(event => event._id == detailId);
let detail = document.querySelector('#detail');
createDetails(detailEvent, detail);
console.log(detailId)
function createDetails(item, contenedor){
    let details = document.createElement('div');
    details.classList.add('detail')
    details.innerHTML =`<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${item.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <ul class="lista_simple">
              <li>${item.name}</li>
              <li>${item.data}</li>
              <li>${item.description}</li>
              <li>Category:${item.category}</li>
              <li>Place:${item.place}</li>
              <li>Capacity:${item.capacity}</li>
              <li>assistance:${item.assistance}</li>
              <li>$:${item.price}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
   `
                contenedor.appendChild(details)
}




