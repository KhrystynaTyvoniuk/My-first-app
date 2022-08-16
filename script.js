let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let bodyDate = document.querySelector(".intro-date");
bodyDate.innerHTML = `${day} ${hours}:${minutes}`;

// Feature #2
let form = document.querySelector("#formSearch");

function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
form.addEventListener("submit", showSearch);

/*
function showTemperatureFar(event) {
    event.preventDefault();
    let introTemperature = document.querySelector(".intro-temperature");
    introTemperature.innerHTML = formulaFar;
  }
  
  let fareight = document.querySelector("#farenheit");
  fareight.addEventListener("click", showTemperatureFar);
  
  let formulaFar = (17 * 9) / 5 + 32; 
  
  function showTemperatureCel(event) {
    event.preventDefault();
    let intoTemperature = document.querySelector(".intro-temperature");
    let formulaCelcius = ((formulaFar - 32) * 5) / 9;
    intoTemperature.innerHTML = formulaCelcius;
  }
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", showTemperatureCel);*/

function convertFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);
fahrenheitLink.addEventListener("click", convertFahrAll);

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = 20;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);
celsiusLink.addEventListener("click", convertCelAll);

function convertFahrAll() {
  let temperaturesElement = document.querySelectorAll(".daily-card__temp");
  console.log(temperaturesElement);
  temperaturesElement.forEach((element) => {
    let temperature = element.innerHTML;
    let tempNum = temperature.split("°");
    console.log(tempNum);
    temperature = Number(tempNum[0]);
    element.innerHTML = Math.round((temperature * 9) / 5 + 32) + "°F";
  });
}
function convertCelAll() {
  let temperatureElement = document.querySelectorAll(".daily-card__temp");
  temperatureElement.forEach((element) => {
    let temperature = element.innerHTML;
    let tempNum = temperature.split("°");
    temperature = Number(tempNum[0]);
    element.innerHTML = Math.round(((temperature - 32) * 5) / 9) + "°C";
  });
}
// weather

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  let apiKey = "09d7fe078a1bda5730bd116188593f4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let citySearch = document.querySelector("#formSearch");
citySearch.addEventListener("submit", showCity);
