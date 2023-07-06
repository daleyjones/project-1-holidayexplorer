const WEATHER_API_BASE_URL = "https://api.openweathermap.org";
const WEATHER_API_KEY = "3770aa61038a0816864d556d797ecb9f";
const MAX_DAILY_FORECAST = 5;
var weatherContainer = document.getElementById('weather')
var forecastContainer = document.getElementById('forecast')

weatherContainer.style.display = 'none'
forecastContainer.style.display = 'none'

function getLocation() {
  const userLocation = locationInput.value.trim();

  if (!userLocation) {
    setLocationError("Please enter a location");
    return;
  }

  lookupLocation(userLocation);
}

function clearError() {
  const errorDisplay = document.getElementById("error");
  errorDisplay.textContent = "";
}

function setLocationError(text) {
  const errorDisplay = document.getElementById("error");
  errorDisplay.textContent = text;

  setTimeout(clearError, 3000);
}

let recentLocations = [];

window.onload = function () {
  const recentLocationsFromStorage = localStorage.getItem("recentLocations");
  if (recentLocationsFromStorage) {
    recentLocations = JSON.parse(recentLocationsFromStorage);
    recentLocations = removeDuplicates(recentLocations);
    recentLocations = recentLocations.slice(0, 5);
    renderSearchHistory();
  }
};

function lookupLocation(search) {
  weatherContainer.style.display = 'flex'
  forecastContainer.style.display = 'block'
  const apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      

      const { name, country, lat, lon } = data[0];

      const myData = { name, country, lat, lon };

 

      const weatherApiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${myData.lat}&lon=${myData.lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
   

      fetch(weatherApiUrl)
        .then((response) => response.json())
        .then((data) => {
      

          displayCurrentWeather(data);

          displayWeatherForecast(data);
        })

      displayWeather(myData);

      addToSearchHistory(myData);
    })
}

function addToSearchHistory(location) {
  recentLocations.unshift(location);
  recentLocations = removeDuplicates(recentLocations);
  recentLocations = recentLocations.slice(0, 5);
  localStorage.setItem("recentLocations", JSON.stringify(recentLocations));
  renderSearchHistory();
}

function renderSearchHistory() {
  const recentList = document.getElementById("recent-location");
  recentList.innerHTML = "";
  for (let i = 0; i < recentLocations.length; i++) {
    const location = recentLocations[i];
    const listItem = document.createElement("button");
    listItem.textContent = `${location.name}, ${location.country}`;
    listItem.addEventListener("click", function () {
      lookupLocation(listItem.textContent);
    });
    recentList.appendChild(listItem);
  }
}

function removeDuplicates(arr) {
  return arr.filter((v, i, a) => a.findIndex((t) => t.name === v.name) === i);
}

function displayCurrentWeather(weatherData) {
  const currentWeather = weatherData.current;
  if (!currentWeather) {
    return;
  }

  const { temp, wind_speed, humidity, uvi, weather } = currentWeather;

  document.getElementById("temp_value").textContent = `${temp}°`;
  document.getElementById("wind_value").textContent = `${wind_speed} MPH`;
  document.getElementById("humid_value").textContent = `${humidity}%`;
  document.getElementById("uvi_value").textContent = `${uvi}`;

  if (weather && weather.length > 0) {
    const { icon } = weather[0];
    const weatherIcon = document.getElementById("current-weather-icon");
    weatherIcon.src = `https://openweathermap.org/img/w/${icon}.png`;
    weatherIcon.alt = "Weather Icon";
  }
}


function displayWeatherForecast(weatherData) {
  const dailyData = weatherData.daily;
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.style.display = 'block';
  const forecastList = document.getElementById('forecast-days');
  forecastList.innerHTML = '';

  for (let i = 1; i <= MAX_DAILY_FORECAST; i++) {
    const dailyForecast = dailyData[i];
    const day = dayjs(dailyForecast.dt * 1000).format('DD/MM/YYYY');
    const temp = `${dailyForecast.temp.day}°`;
    const humidity = `${dailyForecast.humidity}%`;
    const wind = `${dailyForecast.wind_speed} MPH`;
    const weatherIcon = dailyForecast.weather[0].icon;

    const newForecast = document.createElement('div');
    newForecast.classList.add('forecast-day');
    newForecast.innerHTML = `
      <div class="weather-info">
        <div class="date">
          <span>${day}</span>
        </div>
        <div class="temperature">
          <span><strong>Temperature:</strong> ${temp}</span>
        </div>
        <div class="wind">
          <span><strong>Wind:</strong> ${wind}</span>
        </div>
        <div class="humidity">
          <span><strong>Humidity:</strong> ${humidity}</span>
        </div>
        <div class="weather-icon">
          <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
        </div>
      </div>`;
    forecastList.appendChild(newForecast);
  }
}


const getWeather = (lat, lon) => {

  var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
  
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

    

    displayCurrentWeather(data);

    displayWeatherForecast(data);

  })

}

const displayWeather = (weatherData) => {
   document.getElementById('location-name').textContent = `${weatherData.name}, ${weatherData.country}`;

   getWeather(weatherData.lat, weatherData.lon);

}

const locationInput = document.getElementById('location');
const searchButton = document.getElementById('search');

searchButton.addEventListener('click', getLocation);



