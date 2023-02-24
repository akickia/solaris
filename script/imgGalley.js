const ACCESS_KEY = "suB7QCM9t7FWLXYVXAPIWOF6nPErkaUVhI0JmICfJ7o"
const imageContainer = document.querySelector(".header__planet-img")

// COMMENT --------- The img search is not very accurate, but will have to be enough for now :) -------------- // 

//Fetch imgs
async function searchImages(planet) {
  try {
    let data = await fetch('https://api.unsplash.com/search/photos/?client_id=' + ACCESS_KEY + '&query=' + planet + '&per_page=5');
    data = await data.json()
    console.log(planet)
    data = data.results
    console.log(data)
    showImages(data)
  }
  catch (error) {
    console.log(error)
  }
}

//Show img in UI
function showImages(data) {
  data.forEach(image => {
    //console.log(image)
    let fig = document.createElement('figure')
    let img = document.createElement('img')
    img.setAttribute('src', image.urls.small)
    img.setAttribute('alt', image.alt_description)
    fig.appendChild(img)
    let text = document.createElement('figcaption')
    text.innerHTML = image.user.name
    fig.appendChild(text)
    imageContainer.appendChild(fig)
  })
}


//Translate names
export function translateNameForSearch(planet) {
  let planetName
  switch (planet.name) {
    case "Solen":
      planetName = "star+Sun"
      break;
    case "Merkurius":
      planetName = "planet+Mercury"
      break;
    case "Venus":
      planetName = "Planet+Venus"
      break;
    case "Jorden":
      planetName = "Planet+Earth"
      break;
    case "Mars":
      planetName = "Planet+Mars"
      break;
    case "Jupiter":
      planetName = "Planet+Jupiter"
      break;
    case "Saturnus":
      planetName = "Planet+Saturn"
      break;
    case "Uranus":
      planetName = "Planet+Uranus"
      break;
    case "Neptunus":
      planetName = "Planet+Neptune"
      break;
    default:
      break;
  }
  searchImages(planetName)
}
