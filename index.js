//WEATHER API CALL PROGRAM

const infoCard = document.getElementById("card");
const cityNameText = infoCard.getElementsByTagName("h1")[0];
const weatherImage = infoCard.getElementsByTagName("img")[0];
const weatherStateText = infoCard.getElementsByTagName("h2")[0];
const temperatureText = infoCard.getElementsByTagName("p")[0];
const humidityText = infoCard.getElementsByTagName("p")[1];
const searchBar = document.getElementsByClassName("search-input")[0];
const searchButton = document.getElementsByClassName("search-button")[0];
locationName = "";

searchButton.addEventListener("click", () => {
  if (searchBar.value != "") {
    getCoords(searchBar.value);
    searchBar.value = "";
  }
});

searchBar.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && searchBar.value != "") {
    getCoords(searchBar.value);
    searchBar.value = "";
  }
});

async function getCoords(city) {
  apiURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("Could not retrieve data");
    }

    const data = await response.json();
    lat = data.results[0].latitude;
    lon = data.results[0].longitude;
    locationName = data.results[0].name + ", " + data.results[0].country;

    getWeather(lat, lon);
  } catch (error) {
    console.error("Error:" + error);
    updateUIError();
  }
}

async function getWeather(lat, lon) {
  apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}1&current=temperature_2m,relative_humidity_2m,weather_code`;

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("Could not retrieve data");
    }

    const data = await response.json();

    weatherCode = data.current.weather_code;
    temp = data.current.temperature_2m;
    humidity = data.current.relative_humidity_2m;

    console.log(data);

    updateUI(weatherCode, temp, humidity);
  } catch (error) {
    console.error("Error:" + error);
  }
}

function updateUI(weatherCode, temperature, humidity) {
  weatherCondition = "";

  console.log(weatherCode);

  if (weatherCode == 0) {
    weatherCondition = "clear";
  } else if (weatherCode <= 3) {
    weatherCondition = "cloudy";
  } else if (weatherCode >= 45 && weatherCode <= 48) {
    weatherCondition = "foggy";
  } else if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 99)
  ) {
    weatherCondition = "rain";
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    weatherCondition = "snow";
  }

  cityNameText.innerHTML = locationName;
  weatherImage.src = `./images/${weatherCondition}.png`;
  weatherStateText.innerHTML = weatherCondition;
  temperatureText.innerHTML = `Temperature: ${temperature}&degC`;
  humidityText.innerHTML = `Humidity: ${humidity}%`;
}

function updateUIError() {
  cityNameText.innerHTML = "City not found!";
  weatherImage.src = `./images/error.png`;
  weatherStateText.innerHTML = "";
  temperatureText.innerHTML = "";
  humidityText.innerHTML = "";
}
