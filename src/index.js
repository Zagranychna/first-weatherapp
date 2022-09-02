//⏰Feature #1In your project, display the current date and time using JavaScript: Tuesday 16:00
let now = new Date();
let time = document.querySelector("#day-time-now");
let realDate = document.querySelector("#date-now");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
time.innerHTML = `${day} ${hours}:${minutes}`;
realDate.innerHTML = `${date}/${month}`;

//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function showTemperature(response) {
  let city = response.data.name;
  document.querySelector("#main-city").innerHTML = city;

  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${temperature}°C`;

  let maxtemperature = Math.round(response.data.main.temp_max);
  document.querySelector("#max-temp").innerHTML = `${maxtemperature}°/`;

  let mintemperature = Math.round(response.data.main.temp_min);
  document.querySelector("#min-temp").innerHTML = `${mintemperature}°`;

  let humidity = response.data.main.humidity;
  document.querySelector("#hym").innerHTML = `Humidity: ${humidity}%`;

  let windspeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind: ${windspeed} km/h`;

  let description = document.querySelector("#sky");
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;

  console.log(response);
}

function searchCity(city) {
  let apiKey = "a6f47726452f6bc755dd3f0eb27cd613";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let search = document.querySelector("#submit");
search.addEventListener("click", searchCity);

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#sity-input");
  let city = searchInput.value;
  searchCity(city);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "a6f47726452f6bc755dd3f0eb27cd613";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#currentloc");
currentButton.addEventListener("click", currentLocation);

searchCity("Berlin");
