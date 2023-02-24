import { translateNameForSearch } from "./imgGalley.js"

getPlanet()

//Get planet from localstorage
function getPlanet() {
  let planet = JSON.parse(localStorage.getItem("planets"))
  planet = planet[0]
  updateUI(planet)
}

//update elements in UI
function updateUI(planet) {
  document.getElementById("title").innerText = planet.name
  document.getElementById("latin").innerText = planet.latinName
  document.getElementById("description").innerText = planet.desc
  document.getElementById("size").innerHTML = planet.circumference + " km"
  document.getElementById("days").innerHTML = planet.orbitalPeriod + " dygn"
  document.getElementById("axel").innerHTML = planet.rotation + " dygn"
  document.getElementById("day_temp").innerHTML = planet.temp.day + " C"
  document.getElementById("distance").innerText = planet.distance + " km"
  document.getElementById("night_temp").innerHTML = planet.temp.night + " C"
  generateMoons(planet)
  translateNameForSearch(planet)
}

//Generate moons in UI 
function generateMoons(planet) {
  let moonContainer = document.querySelector("ul")
  let moons = planet.moons
  moons.forEach(moon => {
    let moonEl = document.createElement("li")
    moonEl.innerHTML = moon
    moonContainer.appendChild(moonEl)
  })
  if (moons.length === 0) {
    let moonEl = document.createElement("li")
    moonEl.innerHTML = "Inga månar"
    moonContainer.appendChild(moonEl)
  }
}
