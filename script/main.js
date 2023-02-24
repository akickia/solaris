let inputEl = document.querySelector("input")
let searchBtn = document.getElementById("searchBtn")
let prevBtnEl = document.querySelector(".prev")
let nextBtnEl = document.querySelector(".next")
let planetImgElements = document.querySelectorAll(".main__planets figure")
let displayPlanetContainer = document.querySelector(".main__container")
let resultContainer = document.querySelector(".header__results-box")
let planetsFromAPI = []
let searchResult = []
let lengthOfSearchResult
let current 
let planetSaveList = []
let nextPage


fetchData()

// ------------ EVENTLISTENERS ---------- //
//Search eventlistener
searchBtn.addEventListener("click", () => {
  emptyUI()
  searchFuction()
})
inputEl.addEventListener("keypress", (e) => {
  emptyUI()
  if (e.key === "Enter") {
    searchFuction()
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
  showPlanets(planetsFromAPI, displayPlanetContainer)
  }
  catch (error) {
    console.log(error)
    document.querySelector(".header__search").innerHTML = `
    <h1>Något blev fel</h1>
    <h2>Var god ladda om sidan</h2>`
  }
}

//Create sections for each planet
function showPlanets(listOfPlanets, container) {
  document.querySelector(".header__results-box").innerHTML = " "
  if (listOfPlanets) {
    listOfPlanets.forEach(planet => {
      let planetInfo = document.createElement("section")
      planetInfo.setAttribute("class", planet.id)
      planetInfo.classList.add("showSearch")
      planetInfo.innerHTML = `
      <section>
      <div>
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
      document.querySelector(".header__results").style.display = "none"
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
      document.querySelector(".header__results").style.display = "none"
      exit.classList.remove("show")
    })
  })
}

//Create link to next page with info from localstorage
function createLinkBtn (planet, planetInfo) {
      let nextPageBtn = document.createElement("a")
      nextPageBtn.setAttribute("href", "pages/planet.html")
      nextPageBtn.innerHTML = `<button class="btn">Läs mer</button>`
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

function searchFuction() {
  searchResult = []
    let value = inputEl.value.toLowerCase()
    planetsFromAPI.forEach(planet => {
      if (value != "") {
        let planetName = planet.name.toLowerCase()
        let isIncluded = planetName.includes(value)
        if ((isIncluded) && (!searchResult.includes(planet))) {
          searchResult.push(planet)
        }
      }
    })
    showPlanets(searchResult, resultContainer)
    document.querySelector(".header__results").style.display = "flex"
    nextBtnEl.style.display = "inline-block"
    prevBtnEl.style.display = "inline-block"
    carousel(searchResult)
  }

//Creating carousel with search results
function carousel(searchResult) {
  current = 1
  lengthOfSearchResult = Object.keys(searchResult).length;
  updateResult()
  if (lengthOfSearchResult === 0) {
    document.querySelector(".header__results").style.display = "none"
    document.querySelector(".noResult").innerHTML = "Ingen himlakropp funnen"
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
  let searchResultElements = document.querySelectorAll(".header__results-box .showSearch")
  for (let i = 0; i < searchResultElements.length; i++) {
    searchResultElements[i].style.display = "none"
    if ((current - 1) === i) {
      searchResultElements[i].style.display = "flex"
      updateNoOfResults(current, searchResultElements.length)
    }
  }
}

function emptyUI() {
  document.querySelector(".noResult").innerHTML = " "
  let showResult = document.querySelector(".main__container .show")
  if(showResult) {
  showResult.classList.remove("show")
  }
}

