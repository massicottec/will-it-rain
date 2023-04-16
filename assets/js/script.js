var weatherApi = "29aa4c43122a07560b0f079d584a3a80";
var weatherApi2 = "b2ca482c84084643e088c1acab1600f4";
var cityLon;
var cityLat;
var day = 0;
var searchForm = document.getElementById('searchForm');
var historyEl = document.getElementById('history');
var wind = document.getElementById('wind');
var humid = document.getElementById('humid');
var temp = document.getElementById('temp');
var city = document.getElementById('city');
var parentElement = document.getElementById('listTime');
var wIcon = document.getElementById('wIcon');


// retreives the longitude and latitude of input city to use in the 5 day weather api request.
searchForm.addEventListener('submit', (e) => {
    var cityName = document.getElementById("cityInput").value;
    var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherApi}`;
    // var  weather = data2;

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
        var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${weatherApi}&units=metric`;
        await fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data2) {
                city.textContent = `${cityName} ${data2.list[day].dt_txt}`
                temp.textContent = `Temp: ${data2.list[day].main.temp} celsius`;
                wind.textContent = `Wind: ${data2.list[day].wind.speed}m/s`;
                humid.textContent = `Humidity: ${data2.list[day].main.humidity}%`;
                var iconImg = data2.list[0].weather[0].icon;
                var wImgEl = document.createElement('img');

                wImgEl.setAttribute('src', `https://openweathermap.org/img/w/${iconImg}.png`);

                wIcon.appendChild(wImgEl);

                for (var i = 0; i < 4; i++) {
                    day += 8;
                    fiveDay();
                };
                console.log(day);
                if (day == 32) {
                    day = 39;
                    fiveDay();
                };

                function fiveDay() {
                    var divElement = document.createElement('div');
                    var ulElement = document.createElement('ul');
                    var li1Element = document.createElement('li');                    
                    var li2Element = document.createElement('li');
                    var li3Element = document.createElement('li');
                    var li4Element = document.createElement('li');
                    var li5Element = document.createElement('li');
                    var li5Img = document.createElement('img');

                    divElement.setAttribute('class', 'container container-fluid col');
                    li5Img.setAttribute('src', `https://openweathermap.org/img/w/${data2.list[day].weather[0].icon}.png`);

                    li1Element.textContent = `${cityName} ${data2.list[day].dt_txt}`
                    li2Element.textContent = `Temp: ${data2.list[day].main.temp} celsius`;
                    li3Element.textContent = `Wind: ${data2.list[day].wind.speed}m/s`;
                    li4Element.textContent = `Humidity: ${data2.list[day].main.humidity}%`;

                    li5Element.appendChild(li5Img);
                    parentElement.appendChild(divElement);
                    divElement.appendChild(ulElement);
                    ulElement.appendChild(li1Element);
                    ulElement.appendChild(li5Element);
                    ulElement.appendChild(li2Element);
                    ulElement.appendChild(li3Element);
                    ulElement.appendChild(li4Element);
                }
            })



        // console.log(data2.list[0].main.temp);
        // // document.getElementById('temp').textContent.value = `${temp}`;
    }
    localStorage.setItem('cityName', cityName);
    function history() {
        var historyBtn = document.createElement('button');
        cityHist = localStorage.getItem('cityName');

        historyBtn.setAttribute('class', 'btn btn-primary');
        historyBtn.setAttribute('type', 'button');

        historyBtn.textContent = `${cityHist}`;

        historyEl.appendChild(historyBtn);
    }
    e.preventDefault();
    history();
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