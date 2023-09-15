const apiKey = "YOUR_API_KEY"
const tempText = document.getElementById("temp");
const descriptionText = document.getElementById("description");
const lastUpdateText = document.getElementById("last_update");
const cityText = document.getElementById("cityName");
const iconText = document.getElementById("icon");
const windSpeedText = document.getElementById("wind_speed");
const localTimeText = document.getElementById("local_time");
const cityInputField = document.getElementById("cityInput");
const mainContentText = document.getElementById("main_content")

if (apiKey == 'YOUR_API_KEY') {
    alert("Please provide a valid API key")
}
function fetchWeather(city) {
    fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    )
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        displayWeather(data);
        console.log(data);
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
        if (error.message.includes("400")) {
            alert("Please enter a valid city name");
        } else {
            alert("An error occurred while fetching weather data. Please try again later.");
        }
    });
}

function isEmpty(cityInput) {
    if (cityInput.trim() !== "") {
        fetchWeather(cityInput);
    } else {
        alert("Please enter a valid city name");
    }
}

document.getElementById("searchBtn").addEventListener("click", function() {
    const cityInput = cityInputField.value;
    isEmpty(cityInput);
});

cityInputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const cityInput = cityInputField.value;
        isEmpty(cityInput);
    }
});

function displayWeather(data) {

    const tempCelsius = data.current.temp_c;
    const description = data.current.condition.text;
    const countryName = data.location.country;
    const cityName = data.location.name;
    const lastUpdated = data.current.last_updated;
    const icon = data.current.condition.icon;
    const windSpeed = data.current.wind_mph;
    const localTime = data.location.localtime;

    mainContentText.removeAttribute("hidden")
    tempText.textContent = tempCelsius;
    descriptionText.textContent = description;
    lastUpdateText.textContent = lastUpdated;
    cityText.textContent = cityName + " (" + countryName + ")";
    iconText.setAttribute("src", "https:" + icon);
    windSpeedText.textContent = windSpeed;
    localTimeText.textContent = "Local Time: " + localTime;
    document.body.style.background = "url('https://source.unsplash.com/1600x900/?/" + cityName + "')";
}