// -------------- IF THERE IS TIME -------------------
// * Add searched images from unsplash as img gallery for each planet

planet = JSON.parse(localStorage.getItem("planets"))
planet = planet[0]

document.getElementById("title").innerText = planet.name
document.getElementById("latin").innerText = planet.latinName
document.getElementById("description").innerText = planet.desc
document.getElementById("size").innerHTML = planet.circumference + " km"
document.getElementById("days").innerHTML = planet.orbitalPeriod + " dygn"
document.getElementById("axel").innerHTML = planet.rotation + " dygn"
document.getElementById("day_temp").innerHTML = planet.temp.day + " C"
document.getElementById("distance").innerText = planet.distance + " km"
document.getElementById("night_temp").innerHTML = planet.temp.night + " C"


generateMoons()

function generateMoons() {
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
