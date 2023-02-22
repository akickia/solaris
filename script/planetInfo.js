planet = JSON.parse(localStorage.getItem("planets"))
planet = planet[0]
console.log(planet)

document.getElementById("title").innerText = planet.name
document.getElementById("latin").innerText = planet.latinName
document.getElementById("description").innerText = planet.desc
document.getElementById("size").innerHTML = planet.circumference
+ " km"
document.getElementById("day_temp").innerHTML = planet.temp.day + " C"
document.getElementById("distance").innerText = planet.distance + " km"
document.getElementById("night_temp").innerHTML = planet.temp.night + " C"
