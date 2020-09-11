const cityName = document.querySelector("[data-city-name]");
const countryCode = document.querySelector("[data-country-code]");
const description = document.querySelector("[data-description]");
const temperature = document.querySelector("[data-temperature]");
const feelLike = document.querySelector("[data-feels-like]");
const icon = document.querySelector("[data-icon]");
const rainChance = document.querySelector("[data-rain-chance]");
const humidity = document.querySelector("[data-humidity]");
const wind = document.querySelector("[data-wind]");
const submit = document.getElementById("button");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  let InputCity = document.querySelector("[data-city-input]").value;
  console.log(InputCity);
  getWeather(InputCity);
});

function checkStorage(cityName) {
  let CityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  let keys = Object.keys(localStorage);
  if (!keys.includes(CityName)) {
    //getWeather(cityName);
  } else {
    let CityWeatherData = JSON.parse(localStorage.getItem(`${CityName}`));
    updateState(CityWeatherData);
  }
}

function updateState(CityWeatherData) {
  let {
    Temperature,
    CityName,
    CountryCode,
    Description,
    FeelLike,
    IconSrc,
    RainChance,
    Humidity,
    Wind,
  } = CityWeatherData;

  temperature.innerText = Temperature;
  cityName.innerText = CityName;
  countryCode.innerText = CountryCode;
  description.innerText = Description;
  feelLike.innerText = FeelLike;
  icon.src = IconSrc;
  rainChance.innerText = RainChance;
  humidity.innerText = Humidity;
  wind.innerText = Wind;

  console.log(Temperature);
}

async function getWeather(cityName) {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=0ca19fe03e7909642898c11ef5281cd0&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      SaveToLocalStorage(data);
      let CityWeatherData = JSON.parse(localStorage.getItem(`${data.name}`));
      updateState(CityWeatherData);
      console.log(localStorage);
    })
    .catch((e) => console.error("There's no city with this name"));
}

function SaveToLocalStorage(data) {
  let Obj = {};
  Obj.Temperature = data.main.temp;
  Obj.CityName = data.name;
  Obj.CountryCode = data.sys.country;
  Obj.Description = data.weather[0].main;
  Obj.FeelLike = data.main.feels_like;
  let IconCode = data.weather[0].icon;
  Obj.IconSrc = `https://openweathermap.org/img/wn/${IconCode}@2x.png`;
  Obj.RainChance = data.clouds.all;
  Obj.Humidity = data.main.humidity;
  Obj.Wind = data.wind.speed;
  let ObjSerialized = JSON.stringify(Obj);
  localStorage.setItem(`${data.name}`, ObjSerialized);
}

// Temperature.innerText = data.main.temp;
// CityName.innerText = data.name;
// CountryCode.innerText = data.sys.country;
// Description.innerText = data.weather[0].main;
// FeelLike.innerText = data.main.feels_like;
// let IconCode = data.weather[0].icon;
// Icon.src = `http://openweathermap.org/img/wn/${IconCode}@2x.png`;
// RainChance.innerText = data.clouds.all;
// Humidity.innerText = data.main.humidity;
// Wind.innerText = data.wind.speed;
// const Temp = data.main.temp;
// const description = data.weather[0].main;
// const icon = data.weather[0].icon;

// let { Temperature, CityName, CountryCode, Description, FeelLike, IconSrc, RainChance, Humidity, Wind} = CityWeatherData;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then((reg) => {
      console.log("Service worker registered.", reg);
    });
  });
}
