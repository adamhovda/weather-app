
const $cityName = document.querySelector("#cityName");
const $searchInput = document.querySelector("#searchInput");
const $weatherToday = document.querySelector("#weatherToday");
const $history = document.querySelector('#history');
// let historyButton = '';
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
        searchCities();
    })


    
    
    
}



let getWeather = function(x, y){
    let weatherData = 'https://api.openweathermap.org/data/2.5/weather?lat=' + x + '&lon=' + y + '&appid=2ecc26c6348a0e2078f24f145b2188aa'    
    fetch(weatherData)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        let city = data.name;
        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        displayDaily(city, temp, humidity, wind);
        
        console.log(data);
        console.log(data.name);
        console.log(data.main.temp);
        
        
        
    })
}

let displayDaily = function(location, weather, humidity, wind){
    let cityName = document.createElement("h2");
    let todayTemp = document.createElement("li");
    let todayHumidity = document.createElement("li");
    let todayWind = document.createElement("li");
    
    cityName.textContent = location;
    todayTemp.textContent = weather;
    todayHumidity.textContent = humidity;
    todayWind.textContent = wind;
    
    cityName.append(todayTemp);
    cityName.append(todayHumidity)
    cityName.append(todayWind)
    $weatherToday.appendChild(cityName);
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



