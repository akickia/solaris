let planets = []
let planetClick = document.querySelectorAll(".planets figure")
let planetsContainer = document.querySelector(".planets__container")
let planetName
let isIncluded
let searchResult = []
let prevBtn = document.querySelector(".prev")
let nextBtn = document.querySelector(".next")
let searchLength 
let current 
let planetSave = []
let inputEl = document.querySelector("input")

fetchData()

// ------------ EVENTLISTENERS ---------- //
//Search eventlistener
inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let searchResult = []
    let value = inputEl.value.toLowerCase()
    planets.forEach(planet => {
      planetName = planet.name.toLowerCase()
      isIncluded = planetName.includes(value)
      if ((isIncluded) && (!searchResult.includes(planet))) {
        searchResult.push(planet)
      }
    })
    showSearchResults(searchResult)
    document.querySelector(".display__results").style.display = "flex"
    nextBtn.style.display = "inline-block"
    prevBtn.style.display = "inline-block"
    carousel(searchResult)
  }
})

//Carousel btns eventlisteners
prevBtn.addEventListener("click", () => {
  current--
  nextBtn.disabled = false
  if (current === 1) {
    prevBtn.disabled = true
  }
  updateResult()
})

nextBtn.addEventListener("click", () => {
  current++
  prevBtn.disabled = false
  if (current === searchLength) {
    nextBtn.disabled = true
  }
  updateResult()
})

// ------------ FUNCTIONS ---------- //
//Fetch function with error control
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

//Create sections for each planet in api
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
    createLinkBtn(planet)
    planetInfo.appendChild(nextPage)
    
    showPlanetsOnClick(planet, planetInfo)

    let exitBtn = document.querySelectorAll(".exit") 
    exitBtn.forEach(button => {
      button.addEventListener("click", () => {
        planetInfo.classList.remove("show")
      })
    })
  })
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

let nextPage
//Create sections for search results
function showSearchResults(searchResult) {
  document.querySelector(".results").innerHTML = " "
  if (searchResult) {
    searchResult.forEach(planet => {
      let planetInfo = document.createElement("section")
      planetInfo.setAttribute("class", "planet")
      planetInfo.classList.add("showSearch")
      planetInfo.innerHTML = `
      <section>
      <div class="flex-row">
      <p class=sides>1/1</p>
      <p class="exit">X</p>
      </div>
      <h1>${planet.name}</h1>
      <hr>
      <h2>${planet.latinName}</h2>
      </section>
      `
      document.querySelector(".results").appendChild(planetInfo)
      
      createLinkBtn(planet)
      planetInfo.appendChild(nextPage)

      let exitBtn = document.querySelectorAll(".exit") 
      exitBtn.forEach(button => {
        button.addEventListener("click", () => {
          document.querySelector(".display__results").style.display = "none"
        })
      })
    })
  }
}
function createLinkBtn (planet) {
      nextPage = document.createElement("button")
      nextPage.setAttribute("class", "btn")
      nextPage.innerHTML = `<a href="pages/planet.html">Läs mer</a>`
      saveToLocalStorage(planet, nextPage)
      return nextPage
}

function saveToLocalStorage(planet, nextPage) {
  nextPage.addEventListener("click", () => {
    planetSave = []
    planetSave.push(planet)
    localStorage.setItem("planets", JSON.stringify(planetSave))
    console.log(planet)
  })
}

//Creating carousel
function carousel(searchResult) {
  current = 1
  searchLength = Object.keys(searchResult).length;
  updateResult()
  if ((searchResult) && (searchLength > 1)) {
    nextBtn.disabled = false
    prevBtn.disabled = true
  }
  else {
    nextBtn.disabled = true
    prevBtn.disabled = true
  }
}

function updateNoOfResults(current, total) {
  let noOfResults = document.querySelectorAll(".sides")
  noOfResults.forEach(noOfResult => {  
    noOfResult.innerHTML = `${current} / ${total}`})

}
//Update what result to show in carousel

// -----------------------OBS !! ADD NO OF PAGES HERE !!! ---------------------------------------
function updateResult() {
  console.log(current + "now")
  let searchResults = document.querySelectorAll(".results .showSearch")
  for (let i = 0; i < searchResults.length; i++) {
    searchResults[i].style.display = "none"
    if ((current - 1) === i) {
      searchResults[i].style.display = "flex"
      updateNoOfResults(current, searchResults.length)
    }
  }
}

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