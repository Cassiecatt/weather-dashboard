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
        console.log(response)
      // Create city name variable and append to container (need to add date)
      var cityInfo = document.querySelector("#city-info");
      var cityName = document.createElement("h3");
      cityName.textContent = (response.name);
      cityInfo.appendChild(cityName);


      //Temperature variable
      var temperature = response.main.temp;

      //Humidity variable
      var humidity = response.main.humidity;

      //Wind speed variable
      var windSpeed = response.wind.speed;




    });
};

//Function grabbing user search in input field
var searchValue = function () {
  getWeather();
  var userSearch = document.querySelector("#search-term").value;
};

// Event Listener - when button is clicked getWeather function runs
searchButton.addEventListener("click", searchValue);
