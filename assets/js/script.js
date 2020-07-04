// API Key a2c9a8e2a17021895f105341626feb6f
// 5 day - 3 hour forecast API: api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={your api key}
// Current weather API: api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}

//Global Variables
var searchButton = document.querySelector("#search-button");
var userSearch = document.querySelector("#search-term").value;

//Make a fetch request to current weather API

var getWeather = function () {
  var userSearch = document.querySelector("#search-term").value;
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    userSearch +
    "&APPID=a2c9a8e2a17021895f105341626feb6f";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log("getWeather", response)
      // Create city name variable and append to container (need to add date)
      var cityInfo = document.querySelector("#city-info");
      var cityName = document.createElement("h3");
      cityName.textContent = (response.name);
      cityInfo.appendChild(cityName);

      //Temperature variable
      var temperature = document.createElement("p");
      temperature.textContent = "Temperature: " + response.main.temp + " °F"; // need to convert to °F
      cityInfo.appendChild(temperature);

      //Humidity variable
      var humidity = document.createElement("p");
      humidity.textContent = "Humidity: " + response.main.humidity + " %";
      cityInfo.appendChild(humidity);

      //Wind speed variable
      var windSpeed = document.createElement("p");
      windSpeed.textContent = "Wind Speed: " + response.wind.speed + " MPH";
      cityInfo.appendChild(windSpeed);

       //UV variable 
       uvIndex(response.coord.lat, response.coord.lon)
       
    });
};

// uvIndex function
var uvIndex = function(lat, lon) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=a2c9a8e2a17021895f105341626feb6f&lat=" + lat + "&lon=" + lon;
    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    }).then(function(response) {
    // console.log(response[0].value)
    var cityInfo = document.querySelector("#city-info");
    var uv = document.createElement("p");
    uv.textContent = "UV Index: " + response[0].value;
    cityInfo.appendChild(uv);
    })
}


// Forecast function


//Function grabbing user search in input field
var searchValue = function () {
  getWeather();
  var userSearch = document.querySelector("#search-term").value;
};

// Event Listener - when button is clicked getWeather function runs
searchButton.addEventListener("click", searchValue);

