function searchCity(event) {
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

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector(
    "#current-weather-description"
  );
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-date");
  let icon = document.querySelector("#icon");
  let celsiusTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemp);
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  function showFarenheitTemp(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperature.innerHTML = Math.round(farenheitTemp);
  }
  function showCelsiusTemp(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(celsiusTemp);
  }
  let farenheitLink = document.querySelector("#farenheit");
  farenheitLink.addEventListener("click", showFarenheitTemp);
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.addEventListener("click", showCelsiusTemp);
}
