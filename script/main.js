let planets = []
let planetClick = document.querySelectorAll(".planets figure")
let planetsContainer = document.querySelector(".planets__container")

async function fetchData() {
  try {
  planets = await fetch('https://majazocom.github.io/Data/solaris.json')
  planets = await planets.json()
  showPlanets(planets)
  
}
catch (error) {
  console.log(error)
  planetsContainer.style.display = "block"
  planetsContainer.innerHTML = `
  <h1>Något blev fel</h1>
  <h2>Var god ladda om sidan</h2>`
}
}

fetchData()
showPlanets(planets)

let planetSave = []

//Create sections for each planet
function showPlanets(planets) {
planets.forEach(planet => {
  let planetInfo = document.createElement("section")
  planetInfo.setAttribute("id", planet.id)
  planetInfo.setAttribute("class", "planet")
  planetInfo.innerHTML = `
  <section>
  <p class="exit">X</p>
  <h1>${planet.name}</h1>
  <hr>
  <h2>${planet.latinName}</h2>
  </section>
  `
  planetsContainer.appendChild(planetInfo)
  let nextPage = document.createElement("button")
  nextPage.innerHTML = `<a href="pages/planet.html">Läs mer</a>`
  planetInfo.appendChild(nextPage)
  showPlanetsOnClick(planet, planetInfo)
  nextPage.addEventListener("click", () => {
    planetSave = []
    planetSave.push(planet)
    localStorage.setItem("planets", JSON.stringify(planetSave))
    console.log(planet)
  })

  let exitBtn = document.querySelectorAll(".exit") 
  exitBtn.forEach(button => {
    button.addEventListener("click", () => {
      planetInfo.classList.remove("show")
    })
  })
  
})
searchPlanets(planets)
}



//Show planets in UI if right id
function showPlanetsOnClick(planet, planetInfo) {
  planetClick.forEach(planetEl => {  
    planetEl.addEventListener("click", (e) => {
      let idOfPlanet = e.target.id      
      if (idOfPlanet == planet.id) {
        planetInfo.classList.toggle("show")
      }
    })
  })
}



let searchResult = []
//Search
function searchPlanets(planets) {
  let inputEl = document.querySelector("input")
  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let searchResult = []
      let value = inputEl.value.toLowerCase()
      planets.forEach(planet => {
        let planetName = planet.name.toLowerCase()
        let isIncluded = planetName.includes(value)
        if ((isIncluded) && (!searchResult.includes(planet))) {
        searchResult.push(planet)
        console.log(searchResult)
        showSearchResults(searchResult)
      }
  })
  
}

})}

function showSearchResults(searchResult) {
  document.querySelector(".results").innerHTML = " "
  if (searchResult) {
    searchResult.forEach(planet => {
      let planetInfo = document.createElement("section")
      planetInfo.setAttribute("class", "planet")
      planetInfo.classList.add("show")
      planetInfo.innerHTML = `
      <section>
      <p class="exit">X</p>
      <h1>${planet.name}</h1>
      <hr>
      <h2>${planet.latinName}</h2>
      </section>
      `
      document.querySelector(".results").appendChild(planetInfo)
      let nextPage = document.createElement("button")
      nextPage.innerHTML = `<a href="pages/planet.html">Läs mer</a>`
      planetInfo.appendChild(nextPage)

      nextPage.addEventListener("click", () => {
        planetSave = []
        planetSave.push(planet)
        localStorage.setItem("planets", JSON.stringify(planetSave))
        console.log(planet)
      })

      let exitBtn = document.querySelectorAll(".exit") 
      exitBtn.forEach(button => {
        button.addEventListener("click", () => {
          planetInfo.classList.remove("show")
        })
      })
})}}

// let moonContainer = document.createElement("ul")
//   planetsContainer.appendChild(moonContainer)
//   let moons = planet.moons

//   moonContainer.innerHTML = ""

//   moons.forEach(moon => {
//     let moonEl = document.createElement("li")
//     moonEl.innerHTML = moon
//     moonContainer.appendChild(moonEl)
//     })
// let planetInfo = document.createElement("section")
// planetInfo.setAttribute("id", planet.id)
// planetInfo.setAttribute("class", "planet")
// planetInfo.innerHTML = `
// <p class="exit">X</p>
// <h1>${planet.name}</h1>
// <h2>${planet.latinName}</h2>
// <p>${planet.desc}</p>
// <section class="info_box">
//   <h3>OMKRETS:</h3>
//   <p>${planet.circumference} kr</p>
//   <h3>MAX TEMPERATUR:</h3>
//   <p>${planet.temp.day}C</p>
//   <h3>KM FRÅN SOLEN:</h3>
//   <p>${planet.distance} km</p>
//   <h3>MIN TEMPERATUR:</h3>
//   <p>${planet.temp.day}C</p>
// </section>
// <hr>
// `
// planetsContainer.appendChild(planetInfo)