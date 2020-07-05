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
    "&units=imperial&APPID=a2c9a8e2a17021895f105341626feb6f";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("getWeather", response);

      //Clear old content
      var cityInfo = document.querySelector("#city-info");
      cityInfo.textContent = " ";

      // Create city name variable and append to container (need to add date)
      var cityName = document.createElement("h3");
      cityName.textContent =
        response.name + " (" + new Date().toLocaleDateString() + ")";
      cityInfo.appendChild(cityName);

      //Temperature variable
      var temperature = document.createElement("p");
      temperature.textContent = "Temperature: " + response.main.temp + "°F"; // need to convert to °F
      cityInfo.appendChild(temperature);

      //Humidity variable
      var humidity = document.createElement("p");
      humidity.textContent = "Humidity: " + response.main.humidity + "%";
      cityInfo.appendChild(humidity);

      //Wind speed variable
      var windSpeed = document.createElement("p");
      windSpeed.textContent = "Wind Speed: " + response.wind.speed + "MPH";
      cityInfo.appendChild(windSpeed);

      //UV variable
      uvIndex(response.coord.lat, response.coord.lon);

      forecast();
    });
};

// uvIndex function
var uvIndex = function (lat, lon) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=a2c9a8e2a17021895f105341626feb6f&lat=" +
    lat +
    "&lon=" +
    lon;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // console.log(response[0].value)
      var cityInfo = document.querySelector("#city-info");
      var uv = document.createElement("p");
      uv.textContent = "UV Index: " + response[0].value;
      cityInfo.appendChild(uv);
    });
};

// Forecast function
var forecast = function () {
  var userSearch = document.querySelector("#search-term").value;
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    userSearch +
    "&units=imperial&appid=a2c9a8e2a17021895f105341626feb6f&lat";
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("forecast", response);

      //Forecast header - add to empty h3
      var forecast = document.querySelector("#forecast-header");
      forecast.textContent = "5-Day Forecast:";

      //Clear old content
      var forecastContainer = document.querySelector("#forecast-container");
      forecastContainer.textContent = " ";

      //Only look at forecast for 12pm on each day
      for (var i = 2; i < response.list.length; i += 8) {
        if (response.list[i].dt_txt.indexOf("2,10,18,26,34")) {
          // create div inside forecast container

          var weatherCard = document.createElement("div");
          weatherCard.classList.add(
            "card",
            "col-md-2",
            "col-sm-3",
            "bg-primary",
            "text-white"
          );
          forecastContainer.appendChild(weatherCard);

          //date variable
          var titleEl = document.createElement("h6");
          titleEl.textContent = new Date(
            response.list[i].dt_txt
          ).toLocaleDateString();
          weatherCard.appendChild(titleEl);

          //image variable
          var img = document.createElement("img");
          img.setAttribute("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
          weatherCard.appendChild(img);

          //temp variable
          var temp = document.createElement("p");
          temp.classList.add("card-text");
          temp.textContent = "Temp: " + response.list[i].main.temp_max + "°F";
          weatherCard.appendChild(temp);

          //humidity variable
          var humidity = document.createElement("p");
          humidity.classList.add("card-text");
          humidity.textContent =
            "Humidity: " + response.list[i].main.humidity + "%";
          weatherCard.appendChild(humidity);
        }
      }
    });
};

//Function grabbing user search in input field
var searchValue = function () {
  getWeather();
  var userSearch = document.querySelector("#search-term").value;
};

// Event Listener - when button is clicked getWeather function runs
searchButton.addEventListener("click", searchValue);
