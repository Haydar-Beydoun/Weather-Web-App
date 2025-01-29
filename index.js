//WEATHER API CALL PROGRAM

const infoCard = document.getElementById("card");
const cityNameText = infoCard.getElementsByTagName("h1")[0];
const weatherImage = infoCard.getElementsByTagName("img")[0];
const weatherStateText = infoCard.getElementsByTagName("h2")[0];
const temperatureText = infoCard.getElementsByTagName("p")[0];
const humidityText = infoCard.getElementsByTagName("p")[1];
const searchBar = document.getElementsByClassName("search-input")[0];
const searchButton = document.getElementsByClassName("search-button")[0];

searchButton.addEventListener("click", () => {});

function getCoords(city) {}

function getWeather(lat, lon) {}

function updateUI(weatherCondition, temperature, humidity) {}
