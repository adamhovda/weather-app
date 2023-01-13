
const $cityName = document.querySelector("#cityName");
const $searchInput = document.querySelector("#searchInput");
const $weatherToday = document.querySelector("#weatherToday");
const $weatherWeek = document.querySelector('#weatherWeek');
const $history = document.querySelector('#history');
const $submit = document.getElementById("submit");
let historyButton = '';
// const cityArr = [];
let searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];

searchHistory.forEach(element => {

    let historyButton = document.createElement("li");
    historyButton.textContent = element;
    $history.append(historyButton);
    historyButton.setAttribute("class", "searchAgain");

});



let searchSubmit = function(event) {
    event.preventDefault();
    $weatherToday.textContent = '';
    $weatherWeek.textContent = '';
    
    let city = $cityName.value;
    //test code
    let historyButton = document.createElement("li");
    historyButton.textContent = city;
    historyButton.setAttribute("class", "searchAgain");
    $history.append(historyButton);
    
    
    
    // cityArr.push(city)
    // localStorage.setItem("city", JSON.stringify(cityArr));
    // console.log(cityArr);
    const cityCord = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=2ecc26c6348a0e2078f24f145b2188aa'
    fetch(cityCord)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let lon = data[0].lon;
        let lat = data[0].lat;
        console.log(data);
        console.log(lat, lon);
        getWeather(lat, lon);
        getWeatherFuture(lat,lon);
        searchCities();
    })


    
    
    
}

//todays weather fetch

let getWeather = function(x, y){
    let weatherData = 'https://api.openweathermap.org/data/2.5/weather?lat=' + x + '&lon=' + y + '&appid=2ecc26c6348a0e2078f24f145b2188aa&units=imperial'    
    fetch(weatherData)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        let city = data.name;
        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        let icon = data.weather[0].icon;
        displayDaily(city, temp, humidity, wind, icon);
        
        console.log(data);

        // console.log(data.name);
        // console.log(data.main.temp);
        
        
        
    })
}

//future weather fetch

let getWeatherFuture = function(x, y){
    let weatherData = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + x + '&lon=' + y + '&appid=2ecc26c6348a0e2078f24f145b2188aa&units=imperial'    
    fetch(weatherData)
    .then(function (response){
        return response.json();
    })
    .then(function(data){

        for (let i = 1; i < 6; i++){
        let temp = data.list[i].main.temp;
        let humidity = data.list[i].main.humidity;
        let wind = data.list[i].wind.speed;
        let icon = data.list[i].weather[0].icon;

        console.log(data)
        // displayDaily(city, temp, humidity, wind);
        displayWeekly(temp, humidity, wind, icon)
        }
        
         

        
        
        
    })
}



let displayDaily = function(location, weather, humidity, wind, icon){
    let cityName = document.createElement("h2");
    let todayTemp = document.createElement("li");
    let todayHumidity = document.createElement("li");
    let todayWind = document.createElement("li");
    let todayIcon = document.createElement("img");

    todayIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
    cityName.textContent = location;
    todayTemp.textContent = weather + "°";
    
    todayHumidity.textContent = humidity + "%";
    todayWind.textContent = wind + " mph";
    // todayIcon.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

    
    cityName.append(todayTemp);
    cityName.append(todayIcon);
    cityName.append(todayHumidity)
    cityName.append(todayWind)
    $weatherToday.appendChild(cityName);
}

//display weekly weather

let displayWeekly = function(weather, humidity, wind, icon){

    let todayTemp = document.createElement("li");
    let todayHumidity = document.createElement("li");
    let todayWind = document.createElement("li");
    let todayIcon = document.createElement("img");
    
    todayIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
    todayTemp.textContent = weather + "°";
    todayHumidity.textContent = humidity + "%";
    todayWind.textContent = wind + " mph";
    
    todayTemp.append(todayIcon)
    todayTemp.append(todayHumidity)
    todayTemp.append(todayWind)
    $weatherWeek.appendChild(todayTemp);
}



//code not working
let searchCities = function(){
    searchHistory.push($cityName.value);
    localStorage.searchHistory = JSON.stringify(searchHistory);
    
    // let storedCity = JSON.parse(localStorage.getItem('city'));
    // console.log(storedCity)
    
    // });
}






$searchInput.addEventListener('submit', searchSubmit);
$history.addEventListener('click', (e) =>{
    let cityHistory = (e.target.textContent);
    $cityName.value = cityHistory;
    $submit.click();
    
})




