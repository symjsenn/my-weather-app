function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  let currentDate = date.getDate();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return ` ${day}  ${month}, ${currentDate} ${currentYear} <span> ${hour}:${minutes}</span>`;
}

let dateElement = document.querySelector(".date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeather(response) {
  document.querySelector(".currentCity").innerHTML = response.data.name;
  document.querySelector(".temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
}
function enterCity(event) {
  event.preventDefault();
  let apiKey = "7d078386bacb385a90e0391c73137770";
  let city = document.querySelector("#input-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector(".cityForm");
searchForm.addEventListener("submit", enterCity);

function toFahrenheit(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round(currentTemp.innerHTML * 1.8 + 32);
  //after clicking °F, the °F "button" turns grey and it becomes disabeled to prevent further calculating °F into °F.
  //the °C "button" turns back to its default color and becomes enabled again so the user can calculate °F back into °C again.
  fahrTemp.style.color = "#70757a";
  celsTemp.style.color = "#212529";
  fahrTemp.style.pointerEvents = "none";
  celsTemp.style.pointerEvents = "auto";
}

function toCelsius(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round((5 / 9) * (currentTemp.innerHTML - 32));
  celsTemp.style.color = "#70757a";
  fahrTemp.style.color = "#212529";
  fahrTemp.style.pointerEvents = "auto";
  celsTemp.style.pointerEvents = "none";
}

let currentTemp = document.querySelector(".temp-number");

let celsTemp = document.querySelector("#cels-temp");
celsTemp.addEventListener("click", toCelsius);

let fahrTemp = document.querySelector("#fahr-temp");
fahrTemp.addEventListener("click", toFahrenheit);

let apiKey = "7d078386bacb385a90e0391c73137770";
let city = "Sydney";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
