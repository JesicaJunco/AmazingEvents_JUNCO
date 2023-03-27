
let detail = document.querySelector('#detail');
let eventsList;
async function getEvents() {
  await fetch('../amazing.json')
    .then(response => response.json()
      .then(data => {
        eventsList = data.events
        console.log(eventsList)

        const queryString = location.search;
        const params = new URLSearchParams(queryString);
        const detailId = params.get('id');
        const detailEvent = data.events.find(event => event._id == detailId);

        createDetails(detailEvent, detail);

      })).catch(err => console.error(err))
}getEvents();

function createDetails(item, contenedor) {
  let details = document.createElement('div');
  details.classList.add('detail')
  details.innerHTML = `<div class="card" style="max-width: 540px;">
    <div>
      <div >
        <img src="${item.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div>
        <div class="card-body">
          <h5 class="card-title text-center">${item.name}</h5>
          <p class="card-text text-center">${item.description}</p>
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

