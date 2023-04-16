var weatherApi = "29aa4c43122a07560b0f079d584a3a80";
var weatherApi2 = "b2ca482c84084643e088c1acab1600f4";
var cityLon;
var cityLat;
var temp;
var wind;
var humid;
var icon;
var date;
// var citySearch = document.getElementById('citySearch');
var searchForm = document.getElementById('searchForm');

// function cityGeo() {
//     fetch(cityApi)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
// }

// retreives the longitude and latitude of input city to use in the 5 day weather api request.
searchForm.addEventListener('submit', (e) => {
    var cityName = document.getElementById("cityInput").value;
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherApi}`;

    async function getApi() {
        await fetch(geoUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                cityLat = data[0].lat;
                cityLon = data[0].lon;
            })
        // retrieves the relevant weather information from the selected city to display on the dashboard
        var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${weatherApi}&units=metric`;
        await fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data2) {
                temp = data2.list[0].main.temp;
                wind = data2.list[0].wind.speed;
                humid = data2.list[0].main.humidity;
                icon = data2.list[0].weather[0].icon;
                date = data2.list[0].dt_txt;
            })
        
    }

    
    // fetch(geoUrl)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (dataLat) {
    //         console.log(dataLat[0].name);
    //         cityLat = dataLat[0].lat;
    //         return dataLat;
    //         // cityLon = data[0].lon;
    //         // console.log(data);
    //         // console.log(cityLat);
    //         // console.log(cityLon);
    //     })
    //     .then(function (dataLon) {
    //         console.log(dataLon[0].name);
    //         cityLat = dataLon[0].lon;
    //         return dataLon;
    //     })

    e.preventDefault();
    getApi();

});



// async function getApi() {
//     let apiResponse = await fetch(geoUrl);
//     let response = apiResponse.json();
//     console.log(response);
// }

// getApi();
// console.log(cityName);



// function getApi() {
//     var weatherUrl = `api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}}&appid=${weatherApi}`

//         .fetch(weatherUrl) {

//         }
// }

// function city() {

// }