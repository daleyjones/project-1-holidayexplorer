const apiKey = '3770aa61038a0816864d556d797ecb9f';
const searchBtn = document.getElementById('search');
const locationInput = document.getElementById('location');
const forecastContainer = document.getElementById('forecast');

searchBtn.addEventListener('click', () => {
  const userLocation = locationInput.value.trim();
  if (userLocation === '') {
    setLocationError('Please enter a location');
  } else {
    lookupLocation(userLocation);
  }
});

const api_url = 'https://api.openweathermap.org';
const daily_forecast = 5;

const recentLocations = [];
const clearError = () => {
  const errorDisplay = document.getElementById('error');
  errorDisplay.textContent = '';
};

const setLocationError = (text) => {
  const errorDisplay = document.getElementById('error');
  errorDisplay.textContent = text;
  setTimeout(clearError, 3000);
};

const lookupLocation = (search) => {
    const apiUrl = `${api_url}/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;
  
        const myData = {
          name: data.name,
          country: data.sys.country,
          lat: lat,
          lon: lon
        };
  
        const forecastUrl = `${api_url}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
  
        fetch(forecastUrl)
          .then(response => response.json())
          .then(data => {
            displayCurrentWeather(myData, data.current);
            displayWeatherForecast(data.daily);
            saveDestination(myData);
            retrieveDestinations();
            const currentDate = new Date();
            const formattedDate = currentDate.toDateString();
            const dateElement = document.createElement('div');
            dateElement.textContent = formattedDate;
            document.getElementById('location-name').appendChild(dateElement);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };


    const displayCurrentWeather = (myData, currentWeather) => {
        const locationName = document.getElementById('location-name');
        locationName.textContent = `${myData.name}, ${myData.country}`;
      
        const currentDate = new Date();
        const formattedDate = currentDate.toDateString();
        const dateElement = document.createElement('div');
        dateElement.textContent = formattedDate;
        locationName.appendChild(dateElement);


  document.getElementById('location-name').textContent = myData.name;
  document.getElementById('temp-value').textContent = `${currentWeather.temp}°C`;
  document.getElementById('wind-value').textContent = `${currentWeather.wind_speed} MPH`;
  document.getElementById('Humid-value').textContent = `${currentWeather.humidity}%`;

  const weatherIcon = document.createElement('i');
  weatherIcon.classList.add('fas');

  
  if (currentWeather.weather[0].id >= 200 && currentWeather.weather[0].id < 300) {
    weatherIcon.classList.add('fa-bolt'); 
  } else if (currentWeather.weather[0].id >= 300 && currentWeather.weather[0].id < 600) {
    weatherIcon.classList.add('fa-cloud-showers-heavy'); 
  } else if (currentWeather.weather[0].id >= 600 && currentWeather.weather[0].id < 700) {
    weatherIcon.classList.add('fa-snowflake'); 
  } else if (currentWeather.weather[0].id >= 700 && currentWeather.weather[0].id < 800) {
    weatherIcon.classList.add('fa-smog'); 
  } else if (currentWeather.weather[0].id === 800) {
    weatherIcon.classList.add('fa-sun'); 
  } else if (currentWeather.weather[0].id > 800) {
    weatherIcon.classList.add('fa-cloud'); 
  } else {
    weatherIcon.classList.add('fa-question'); 
  }

  const weatherIconContainer = document.getElementById('weather-icon');
  weatherIconContainer.innerHTML = '';
  weatherIconContainer.appendChild(weatherIcon);
};

const displayWeatherForecast = (dailyForecast) => {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
  
    const numDays = Math.min(dailyForecast.length, 5);
  
    for (let i = 0; i < numDays; i++) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const forecastDate = new Date(dailyForecast[i].dt * 1000);
    const formattedDate = forecastDate.toDateString();

    cardHeader.innerHTML = `
      <h2>${formattedDate}</h2>
      <i class="fas ${getWeatherIconClass(dailyForecast[i].weather[0].id)}"></i>
    `;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.innerHTML = `
      <div class="card-temperature">
        <span>Temperature:</span>
        <span>${dailyForecast[i].temp.day}°C</span>
      </div>
      <div class="card-wind">
        <span>Wind:</span>
        <span>${dailyForecast[i].wind_speed} MPH</span>
      </div>
      <div class="card-humidity">
        <span>Humidity:</span>
        <span>${dailyForecast[i].humidity}%</span>
      </div>
    `;

    card.append(cardHeader, cardBody);
    forecastContainer.append(card);
  }
  forecastContainer.style.display = 'block';
};
console.log()
const getWeatherIconClass = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) {
    return 'fa-bolt'; 
  } else if (weatherId >= 300 && weatherId < 600) {
    return 'fa-cloud-showers-heavy'; 
  } else if (weatherId >= 600 && weatherId < 700) {
    return 'fa-snowflake'; 
  } else if (weatherId >= 700 && weatherId < 800) {
    return 'fa-smog'; 
  } else if (weatherId === 800) {
    return 'fa-sun'; 
  } else if (weatherId > 800) {
    return 'fa-cloud';
  } else {
    return 'fa-question'; 
  }
  
};
console.log()

const saveDestination = (destination) => {
  const existingDestinations = localStorage.getItem('destinations');
  let destinations = existingDestinations ? JSON.parse(existingDestinations) : [];

  const isExistingDestination = destinations.some(dest => dest.name === destination.name);

  if (!isExistingDestination) {
    destinations.push(destination);
    localStorage.setItem('destinations', JSON.stringify(destinations));
  }
};
console.log()
const retrieveDestinations = () => {
  const existingDestinations = localStorage.getItem('destinations');
  let destinations = existingDestinations ? JSON.parse(existingDestinations) : [];

  const destinationsContainer = document.getElementById('recent-locations');
  destinationsContainer.innerHTML = '';
  destinations.forEach(destination => {
    const destinationElement = document.createElement('div');
    destinationElement.textContent = `${destination.name}, ${destination.country}`;
    destinationsContainer.appendChild(destinationElement);
  });
};

retrieveDestinations();
