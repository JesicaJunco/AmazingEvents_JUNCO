
let fecha;
let eventsList;
async function getEvents(){
  await fetch('../amazing.json')
  .then (response => response.json()) 
  .then (data =>{ 
    eventsList = data.events 
    fecha = data.currentDate
    showStatistics(eventsList),
    showUpcomingStatisticsCategory(eventsList),
    showPastStatistics(eventsList)
})
} getEvents()

// función para mostrar las estadísticas relacionadas con la lista de eventos
function showStatistics(eventsList) {
  let table = document.getElementById("tableEvents");
  let tbody = table.querySelector("tbody");
  let row = "";
  row = `<tr>
    <td>${highestPercentageAtlendance(eventsList)}</td>
    <td>${lowestPercentageAtlendance(eventsList)}</td>
    <td>${largerCapacity(eventsList)}</td>
  </tr>`;
  tbody.innerHTML = row;
  
}

//funcion que toma la lista de eventos y devuelve una cadena con el nombre del evento de mayor porcentaje de asistencia
function highestPercentageAtlendance(eventsList) {
  let maxPercentage = Math.max(...(eventsList).map(events => ((events.assistance || events.estimate) / events.capacity) * 100));
  console.log(maxPercentage)
  let events = (eventsList).find(events => ((events.assistance || events.estimate) / events.capacity) * 100 == maxPercentage);
  return events.name;
}

//funcion que toma la lista de eventos y devuelve una cadena con el nombre del evento de menor porcentaje de asistencia
function lowestPercentageAtlendance(eventsList){
  let minPercentage = Math.min(...(eventsList).map(events => ((events.assistance || events.estimate) / events.capacity)*100));
  console.log(minPercentage);
  let events = (eventsList).find(events =>((events.assistance || events.estimate)/ events.capacity)*100 ==minPercentage);
  return events.name;
}

//Events with larger capacity
function largerCapacity(){
  let maxCapacity = Math.max(...eventsList.map(events => events.capacity))
  let events = eventsList.find(events => events.capacity == maxCapacity)
  return events.name ;
}
/*******************************************************************************/

//funcion de estadísticas de upcommingEvents por categoría
function upcomingEvent(eventsList, fecha) {
  let eventos = []
  eventsList.forEach((event) => {
    if (fecha < event.date) {
      eventos.push(event)
    }
  });
  return eventos;
 
} 

function showUpcomingStatisticsCategory(eventsList){
  let table = document.getElementById("tableUpcoming");
  let tbody = table.querySelector("tbody");
  let categories = eventsList.map(evento => evento.category)
  let categoria = new Set(categories)
  let categorias = Array.from(categoria)
  let row = "";
  categorias.forEach(category => {
    let revenue = renuevesCategories(eventsList,category,fecha, "upcoming");
    if (revenue > 0 && !isNaN(revenue)) {
    row += `<tr>
    <td>${(category)}</td>
    <td>$${renuevesCategories(eventsList,category,fecha, "upcoming")}</td>
    <td>${percentageOfAttendance(eventsList,category,fecha, "upcoming")}%</td>
  </tr>`;
    }
  });
  
  tbody.innerHTML = row;
} 

//funcion de estadisticas de Past Events por categoria
function pastEvent(eventsList, fecha) {
  let eventos = []
  eventsList.forEach((event) => {
    if (fecha > event.date) {
      eventos.push(event)
    }
  });
  return eventos;
}

function showPastStatistics(eventsList) {
  let table = document.getElementById("tablePast")
  let tbody = table.querySelector("tbody");
  let categories = eventsList.map(evento => evento.category)
  let categoria = new Set(categories)
  let categorias = Array.from(categoria)
  let row = "";
  categorias.forEach(category => {
    row += `<tr>
          <td>${category}</td>
          <td>$${renuevesCategories(eventsList, category, fecha, "past")}</td>
          <td>${percentageOfAttendance(eventsList, category,fecha, "past")}%</td>
      </tr>`;
      
  })
  tbody.innerHTML = row;
}

//	Revenues by categories, calcula los ingresos generados por eventos en una categoría particular, ya sea en el pasado o en el futuro, según el valor de tipoEvento.
function renuevesCategories(eventsList, category, fecha, tipoEvento){
  let eventos;
  if(tipoEvento === "past"){
    eventos = pastEvent(eventsList, fecha);
  } else if((tipoEvento === "upcoming")){
    eventos = upcomingEvent(eventsList, fecha);
  } else {
    return "Error: Invalid date"
  
  }

let filteredEvents  = eventos.filter(eventsList => eventsList.category === category);  
let revenues = filteredEvents.reduce((total, events) => {
  return total + ((events.assistance ? events.assistance : events.estimate) * events.price)
}, 0);
  return revenues; 
} 

//Percentage of attendance by category, calcula el porcentaje de asistencia a eventos en una categoría particular, ya sea en el pasado o en el futuro, según el valor de tipoEvento.
function percentageOfAttendance(eventsList, category, fecha, tipoEvento){
  let eventos;
  if(tipoEvento === "past"){
    eventos = pastEvent(eventsList, fecha);
  } else if((tipoEvento === "upcoming")){
    eventos = upcomingEvent(eventsList, fecha);
  } else {
    return "Error: Invalid date"
  }

let filteredEvents  = eventos.filter(events => events.category === category);
let totalAssistance = filteredEvents.reduce((accumulator, events) => accumulator + (events.assistance ? events.assistance : events.estimate), 0);
let totalCapacity = filteredEvents.reduce((accumulator, events) => accumulator + events.capacity, 0);
let percentage = (totalAssistance / totalCapacity) * 100;

return percentage.toFixed(2);
} 
