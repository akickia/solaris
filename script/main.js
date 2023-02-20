let planets = []
let planetClick = document.querySelectorAll("figure")


async function fetchData() {
  try {
  planets = await fetch('https://majazocom.github.io/Data/solaris.json')
  planets = await planets.json()
  console.log(planets)
  showPlanets(planets)
}
catch (error) {
  console.log(error)
  let planetsContainer = document.querySelector(".planets__container")
  planetsContainer.style.display = "block"
  planetsContainer.innerHTML = `
  <h1>Något blev fel</h1>
  <h2>Var god ladda om sidan</h2>`
}
}

fetchData()
showPlanets()

function showPlanets() {
planets.forEach(planet => {
  console.log(planet.name)
  let planetContainer = document.querySelector(".planets__container")
  let planetInfo = document.createElement("section")
  planetInfo.setAttribute("id", planet.id)
  planetInfo.setAttribute("class", "planet")
  planetInfo.innerHTML = `
  <p class="exit">X</p>
  <h1>${planet.name}</h1>
  <h2>${planet.latinName}</h2>
  <p>${planet.desc}</p>
  <section class="info_box">
    <h3>OMKRETS:</h3>
    <p>${planet.circumference} kr</p>
    <h3>MAX TEMPERATUR:</h3>
    <p>${planet.temp.day}C</p>
    <h3>KM FRÅN SOLEN:</h3>
    <p>${planet.distance} km</p>
    <h3>MIN TEMPERATUR:</h3>
    <p>${planet.temp.day}C</p>
  </section>
  `
  planetContainer.appendChild(planetInfo)
  planetClick.forEach(planetEl => {
    
    planetEl.addEventListener("click", (event) => {
      planetContainer.style.display = "block"
      planetInfo.style.display = "none"      
      let idOfPlanet = parseInt(event.target.id)
      if (idOfPlanet == planet.id) {
        planetInfo.style.display = "block"
      }
    })
  })
  let exitBtn = document.querySelectorAll(".exit") 
  exitBtn.forEach(button => {
    button.addEventListener("click", () => {
      planetContainer.style.display = "none"
      planetInfo.style.display = "none"
    })
  })

})
}


