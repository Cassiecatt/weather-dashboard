// API Key a2c9a8e2a17021895f105341626feb6f
// 5 day - 3 hour forecast API: api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={your api key}
// Current weather API: api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}

//Global Variables
var searchButton = document.querySelector("#search-button")
var userSearch = document.querySelector("#search-term").value;

//Make a fetch request to current weather API 

var getWeather = function() {
    var userSearch = document.querySelector("#search-term").value;
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + userSearch + '&APPID=a2c9a8e2a17021895f105341626feb6f';
    console.log(userSearch)

    fetch(apiUrl).then(function(response) {
        return response.json()
    }).then(function(response) {

            // //City name variable
            // var cityName = response.name;
            
            // //Temperature variable
            // var temperature = response.main.temp;
            // console.log(temperature);
             
            // //Humidity variable
            // var humidity = response.main.humidity;
            // console.log(humidity);
             
            // //Wind speed variable
            // var windSpeed = response.wind.speed;
            // console.log(windSpeed);
    });
}

//Function grabbing user search in input field
var searchValue = function() {
    getWeather();
    var userSearch = document.querySelector("#search-term").value;
    // console.log(userSearch)
}


// Event Listener - when button is clicked getWeather function runs
searchButton.addEventListener("click", searchValue)

