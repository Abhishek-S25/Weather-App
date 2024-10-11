const inputBox = document.querySelector('.input-text');
const searchBtn = document.getElementById('search-btn');
const weather_image = document.querySelector('.weather-img');

const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const api_key = '4cbcc422b55b38ef4d5efc549a789d22';

async function checkWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data =await fetch(`${url}`).then(response => 
        response.json());
    console.log(weather_data);
    if(weather_data.cod === `404`){
        weather_image.src = './assets/404.png';
        description.innerHTML = `No Cities Found Of Name ${city}`;
        return;
    }
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/Hr`;

    switch(weather_data.weather[0].main){
        case 'Clouds': 
            weather_image.src = './assets/cloud.png';
            break;
        case 'Clear': 
            weather_image.src = './assets/clear.png';
            break;
        case 'Rain': 
            weather_image.src = './assets/rain.png';
            break;
        case 'Mist': 
            weather_image.src = './assets/mist.png';
            break;
        case 'Snow':
            weather_image.src = './assets/snow.png';
            break;
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

async function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
    const locationData = await fetch(reverseGeocodeUrl).then(response => response.json());

    if (locationData && locationData.length > 0) {
        const city = locationData[0].name;
        checkWeather(city); 
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getLocation();
});