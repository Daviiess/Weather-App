const apiKey = 'ee87c9c6e3df77ee95142747715ee43a';
const inputCity = document.querySelector('#input-city');
const searchBtn = document.querySelector('.search-btn');

async function checkWeather(city){
    try{
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data  = await response.json();
        const timestamp = data.dt;
        const weather = data.weather[0].main.toLowerCase();
        /* console.log(data);
        console.log(weather); */
        const date = new Date(timestamp * 1000);
        const readAbleDate = date.toLocaleDateString('en-GB' , {
            weekday : 'short',
            day: 'numeric',
            month:'short',
            year:'numeric'
        });
        document.querySelector('.location').innerHTML = data.name;
        document.querySelector('.date').innerHTML = readAbleDate;
        document.querySelector('.weather-temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.weather-condition').innerHTML = data.weather[0].main;
        document.querySelector('#humidity-value').innerHTML = data.main.humidity + '%';
        document.querySelector('#weather-wind-speed').innerHTML = data.wind.speed + " km/h";
        document.querySelector('.weather-img').src = `images/${weather}.png`;
    
    }catch(error){
        console.log('Error...');
        document.querySelector('.location').innerHTML = "City not found";
document.querySelector('.date').innerHTML = "";
document.querySelector('.weather-temp').innerHTML = "--";
document.querySelector('.weather-condition').innerHTML = "--";
document.querySelector('#humidity-value').innerHTML = "--";
document.querySelector('#weather-wind-speed').innerHTML = "--";
document.querySelector('.weather-img').alt = "Weather image error";
    }
}
checkWeather('Lagos')//Default location
searchBtn.addEventListener('click' , ()=>{
    const city = inputCity.value;
    if(city){
        checkWeather(city)
        localStorage.setItem('lastCity', city);
    }else{
        alert('Please Enter a city name');
    }
        inputCity.value = '';
})

inputCity.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

window.addEventListener('load', () => {
  const lastCity = localStorage.getItem('lastCity');
  if (lastCity) {
    inputCity.value = lastCity;
    checkWeather(lastCity);
  }
});
inputCity.addEventListener('input', () => {
  localStorage.setItem('lastCity', inputCity.value);
});