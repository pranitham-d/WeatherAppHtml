const apiKey = 'd2b54274306f7eb978ac3c3a772c398d'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=metric&q=';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('city');
const date = document.getElementById('date');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feelsLike');
const tempMin = document.getElementById('tempMin');
const tempMax = document.getElementById('tempMax');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');
const wind = document.getElementById('wind');
const clouds = document.getElementById('clouds');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

searchButton.addEventListener('click', () => {
  const cityName = cityInput.value;
  fetchWeatherData(cityName);
});

function fetchWeatherData(cityName) {
  fetch(apiUrl + cityName)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found.');
      }
      return response.json();
    })
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      openPopup(error.message);
    });
}

function displayWeatherData(data) {
    cityName.textContent = data.name;
    date.textContent = new Date(data.dt * 1000).toLocaleDateString(); 
    description.textContent = data.weather[0].description;
    icon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    temperature.textContent = 'Temperature: ' + data.main.temp + '°C';
    feelsLike.textContent = 'Feels like: ' + data.main.feels_like + '°C';
    tempMin.textContent = 'Min. Temperature: ' + data.main.temp_min + '°C';
    tempMax.textContent = 'Max. Temperature: ' + data.main.temp_max + '°C';
    pressure.textContent = 'Pressure: ' + data.main.pressure + ' hPa';
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    visibility.textContent = 'Visibility: ' + data.visibility + ' meters';
    wind.textContent = 'Wind: ' + data.wind.speed + ' m/s, Direction: ' + data.wind.deg + '°';
    clouds.textContent = 'Cloudiness: ' + data.clouds.all + '%';
    sunrise.textContent = 'Sunrise: ' + new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    sunset.textContent = 'Sunset: ' + new Date(data.sys.sunset * 1000).toLocaleTimeString();
  
    // Calculate and display local time
    const localTime = new Date(data.dt * 1000); // Get time in milliseconds
    localTime.setSeconds(localTime.getSeconds() + data.timezone); // Adjust for timezone
    localTime.toLocaleDateString(); // Adjust for timezone
    document.getElementById('localTime').textContent = 'Local Time: ' + localTime.toLocaleTimeString();
    document.getElementById('timezone').textContent = 'Timezone: ' + data.timezone + ' seconds';
    closePopup(); 
  }

function openPopup(message) {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('errorPopup').style.display = 'block';
}

function closePopup() {
  document.getElementById('errorPopup').style.display = 'none';
}