function searchCity(events) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let heading = document.querySelector("h1");
  heading.innerHTML = city.value;
  let apiKey = "9a4953a8b7e1fcdabe7af8869333e038";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
}
function showCurrentTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9a4953a8b7e1fcdabe7af8869333e038";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let currentTemperature = document.querySelector("#current-temp-button");
currentTemperature.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(showPosition)
);
