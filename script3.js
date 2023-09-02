const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
    const location = locationInput.value;
    console.log("Location:", location); // Debugging

    getWeatherData(location);
});

function getWeatherData(location) {
    const apiKey = "5bf274f9c11c8590d0e44ca8cab7992b";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    console.log("API URL:", apiUrl); // Debugging

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Weather Data:", data); // Debugging
            displayWeatherData(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function displayWeatherData(data) {
    console.log("Weather Data for Display:", data); // Debugging

    const temperature = data.main.temp;
    const conditions = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    const weatherHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Conditions: ${conditions}</p>
        <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
    `;

    weatherInfo.innerHTML = weatherHTML;
}
