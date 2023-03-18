var form = document.querySelector('form');
var cityList = [];
var cityHTML = document.getElementById('city-list');
var cityHTMLText = document.createElement("p");
var currentWeather = document.getElementById('current-city');
var forecastDisplay = document.getElementById('five-day-forecast');
var submitButton = document.getElementById('submit-button');
var APIKey = 'e3280890f73c484ecc8bb0d44ffb9ee0';

loadCities();

// saves to local storage
function saveCity() {
  console.log("Saved cities");
  localStorage.setItem('city', JSON.stringify(cityList));
};

// get from local storage load to page
function loadCities() {
  console.log("loaded cities", cityList);
  var updatedCityList = JSON.parse(localStorage.getItem('city'));
  if (updatedCityList) {
    var city;
    for (let i = 0; i < updatedCityList.length; i++) {
      city = updatedCityList[i];

      cityHTMLText.textContent = city;
      cityHTML.append(cityHTMLText);
      console.log('current city', city);
      getWeatherData(city);
    }
  }
};

// updates the search history
function updateCityList() {
  console.log("updated city list");
  var cityText = newCity;
  cityHTML.append(cityHTMLText);
  cityHTMLText.textContent = cityText;
  document.querySelector('form').reset();
  saveCity();
  getWeatherData(newCity);
};

// adds city input to array list
function addNewCity() {
  cityList.push(newCity);
  console.log("city list", cityList);
  updateCityList();
};

// initialize form button
function initListeners(event) {
  event.preventDefault();
  console.log("form-submit");
  newCity = document.getElementById('new-city').value;
  console.log(newCity);
  addNewCity();
};

// get current weather data
function getWeatherData(city) {
  var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayCurrentWeather(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      getForecastData(lat, lon);
    });
}

// display current weather
function displayCurrentWeather(data) {
  var icon = data.weather[0].icon;
  var temp = data.main.temp;
  var wind = data.wind.speed + " m/s";
  var humidity = data.main.humidity + "%";
  currentWeather.innerHTML = `
    <h2>Current Weather in ${data.name}, ${data.sys.country}</h2>
    <div class="weather-icon"><img src="https://openweathermap.org/img/wn/${icon}.png" alt=""></div>
    <div class="weather-details">
      <p><strong>Temperature:</strong> ${temp}</p>
      <p><strong>Wind:</strong> ${wind}</p>
      <p><strong>Humidity:</strong> ${humidity}</p>
    </div>`;
}

// get forecast data
function getForecastData(lat, lon) {
  var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&exclude=current,minutely,hourly&appid=' + APIKey;
  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('forecast data',data);
      displayForecast(data)
    });
}
// display forecast data to DOM

function displayForecast(data) {
  var forecastDisplay = document.getElementById('five-day-forecast');

  // Clear previous forecast data
  forecastDisplay.innerHTML = '';

  // Loop through each forecast item
  for (let i = 0; i < 5; i++) {
    var forecast = data.list[i];
    var date = new Date(forecast.dt_txt);
    var icon = forecast.weather[0].icon;
    var temp = forecast.main.temp;
    var wind = forecast.wind.speed + " m/s";
    var humidity = forecast.main.humidity + "%";

    // Create HTML elements for the forecast item
    var forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';
    var forecastDate = document.createElement('p');
    forecastDate.textContent = date.toLocaleDateString();
    var forecastIcon = document.createElement('img');
    forecastIcon.src = 'https://openweathermap.org/img/wn/' + icon + '.png';
    var forecastTemp = document.createElement('p');
    forecastTemp.textContent = 'Temp: ' + temp;
    var forecastWind = document.createElement('p');
    forecastWind.textContent = 'Wind: ' + wind;
    var forecastHumidity = document.createElement('p');
    forecastHumidity.textContent = 'Humidity: ' + humidity;

    // Append the forecast item to the forecast display
    forecastItem.appendChild(forecastDate);
    forecastItem.appendChild(forecastIcon);
    forecastItem.appendChild(forecastTemp);
    forecastItem.appendChild(forecastWind);
    forecastItem.appendChild(forecastHumidity);
    forecastDisplay.appendChild(forecastItem);
  };
};

form.addEventListener('submit', initListeners);

