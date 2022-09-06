
let form = document.querySelector("#formSearch");

function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
form.addEventListener("submit", showSearch);

function convertFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  //remove active class from Celcisu
  celsiusLink.classList.remove("active");
  //add active to Farenheit
  fahrenheitLink.classList.add("active");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
//fix forecast-temp convertion!!!
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);
fahrenheitLink.addEventListener("click", convertFahrAll);

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
    //add active class from Celcisu
    celsiusLink.classList.add("active");
    //remove active to Farenheit
    fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//fix forecast-temp convertion!!!
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
//Date 
function formatDate(timestamp){
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
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}` ;
}
function formatSunrise(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`
}
function formatSunset(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}



function showWeather(response) {
 

  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#visibility").innerHTML = response.data.visibility;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector('#icon').setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#sunrise").innerHTML = formatSunrise(response.data.sys.sunrise * 1000);
  document.querySelector("#sunset").innerHTML = formatSunset(response.data.sys.sunset * 1000);
  getForecast(response.data.coord);

}

function showCity(event) {

  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  let apiKey = '09d7fe078a1bda5730bd116188593f4a';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let citySearch = document.querySelector("#formSearch");
citySearch.addEventListener("submit", showCity);
