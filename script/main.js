let inputEl = document.querySelector("input")
let prevBtnEl = document.querySelector(".prev")
let nextBtnEl = document.querySelector(".next")
let planetImgElements = document.querySelectorAll(".planets figure")
let displayPlanetContainer = document.querySelector(".planets__container")
let resultContainer = document.querySelector(".results")
let planetsFromAPI = []
let searchResult = []
let lengthOfSearchResult
let current 
let planetSaveList = []
let nextPage
let x


fetchData()

// ------------ EVENTLISTENERS ---------- //
//Search eventlistener
inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let showResult = document.querySelector(".planets__container .show")
    if(showResult) {
    showResult.classList.remove("show")
    }
    searchResult = []
    let value = inputEl.value.toLowerCase()
    planetsFromAPI.forEach(planet => {
      let planetName = planet.name.toLowerCase()
      let isIncluded = planetName.includes(value)
      if ((isIncluded) && (!searchResult.includes(planet))) {
        searchResult.push(planet)
      }
    })
    x = "class"
    showPlanets(searchResult, x, resultContainer)
    document.querySelector(".display__results").style.display = "flex"
    nextBtnEl.style.display = "inline-block"
    prevBtnEl.style.display = "inline-block"
    carousel(searchResult)
  }
})

//Carousel btns eventlisteners
prevBtnEl.addEventListener("click", () => {
  current--
  nextBtnEl.disabled = false
  if (current === 1) {
    prevBtnEl.disabled = true
  }
  updateResult()
})

nextBtnEl.addEventListener("click", () => {
  current++
  prevBtnEl.disabled = false
  if (current === lengthOfSearchResult) {
    nextBtnEl.disabled = true
  }
  updateResult()
})

// ------------ FUNCTIONS ---------- //
//Fetch function with error control
async function fetchData() {
  try {
  planetsFromAPI = await fetch('https://majazocom.github.io/Data/solaris.json')
  planetsFromAPI = await planetsFromAPI.json()
  x = "id"
  showPlanets(planetsFromAPI, x, displayPlanetContainer)
  }
  catch (error) {
    console.log(error)
    displayPlanetContainer.style.display = "block"
    displayPlanetContainer.innerHTML = `
    <h1>Något blev fel</h1>
    <h2>Var god ladda om sidan</h2>`
  }
}

//Create sections for each planet
function showPlanets(listOfPlanets, x, container) {
  document.querySelector(".results").innerHTML = " "
  if (listOfPlanets) {
    listOfPlanets.forEach(planet => {
      let planetInfo = document.createElement("section")
      planetInfo.setAttribute(x, planet.id)
      planetInfo.setAttribute("class", "planet")
      planetInfo.classList.add("showSearch")
      planetInfo.innerHTML = `
      <section>
      <div class="flex-row">
      <p class=sides></p>
      <p class="exit">X</p>
      </div>
      <h1>${planet.name}</h1>
      <hr>
      <h2>${planet.latinName}</h2>
      </section>
      `
      container.appendChild(planetInfo)
      createLinkBtn(planet, planetInfo)
      showPlanetsOnClick(planet, planetInfo)
      createCloseBtn(planetInfo)
    })
  }
}

//Show planets in UI if right id
function showPlanetsOnClick(planet, planetInfo) {
  planetImgElements.forEach(planetEl => {  
    planetEl.addEventListener("click", (e) => {
      document.querySelector(".display__results").style.display = "none"
      planetInfo.classList.remove("show")
      let classOfPlanet = e.target.classList     
      if (classOfPlanet == planet.id) {
        planetInfo.classList.toggle("show")
      }
    })
  })
}

//Create close button
function createCloseBtn(exit) {
  let exitBtnEl = document.querySelectorAll(".exit") 
  exitBtnEl.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".display__results").style.display = "none"
      exit.classList.remove("show")
    })
  })
}

//Create link to next page with info from localstorage
function createLinkBtn (planet, planetInfo) {
      let nextPageBtn = document.createElement("button")
      nextPageBtn.setAttribute("class", "btn")
      nextPageBtn.innerHTML = `<a href="pages/planet.html">Läs mer</a>`
      saveToLocalStorage(planet, nextPageBtn)
      planetInfo.appendChild(nextPageBtn)
      return nextPageBtn
}

//Save planet to localstorage
function saveToLocalStorage(planet, nextPageBtn) {
  nextPageBtn.addEventListener("click", () => {
    planetSaveList = []
    planetSaveList.push(planet)
    localStorage.setItem("planets", JSON.stringify(planetSaveList))
  })
}

//Creating carousel with search results
function carousel(searchResult) {
  current = 1
  lengthOfSearchResult = Object.keys(searchResult).length;
  updateResult()
  if (lengthOfSearchResult === 0) {
    document.querySelector(".display__results").style.display = "none"
  }
  if ((searchResult) && (lengthOfSearchResult > 1)) {
    nextBtnEl.disabled = false
    prevBtnEl.disabled = true
  }
  else {
    nextBtnEl.disabled = true
    prevBtnEl.disabled = true
  }
}

//Update number of results
function updateNoOfResults(current, total) {
  let noOfResults = document.querySelectorAll("header .sides")
  noOfResults.forEach(noOfResult => {  
    noOfResult.innerHTML = `${current} / ${total}`})
}

//Update what result to show in carousel
function updateResult() {
  let searchResultElements = document.querySelectorAll(".results .showSearch")
  for (let i = 0; i < searchResultElements.length; i++) {
    searchResultElements[i].style.display = "none"
    if ((current - 1) === i) {
      searchResultElements[i].style.display = "flex"
      updateNoOfResults(current, searchResultElements.length)
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