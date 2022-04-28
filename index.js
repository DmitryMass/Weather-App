let searchInput = document.querySelector(".search__input");
const cityEl = document.querySelector(".weather__city");
const iconEl = document.querySelector(".weather__icon");
const tempEl = document.querySelector(".weather__temp");
const descripEl = document.querySelector(".weather__description-item");
const humidityEl = document.querySelector(".weather__humidity");
const windSpeed = document.querySelector(".weather__windSpeed");
const searchBtn = document.querySelector(".search__btn");
//

let theWeather = {
  apiKey: "870e96d1c3e0868300e4af1e9a6ad904",
  weatherData: async function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.weatherOnDisplay(data));
  },

  weatherOnDisplay: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    cityEl.innerText = `Weather in ${name}`;
    iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    tempEl.innerText = `Temperature ${Math.round(temp)}˚C`;
    descripEl.innerText = description;

    humidityEl.innerText = `Humidity: ${humidity}%`;

    windSpeed.innerText = `Wind speed ${speed} km/h`;

    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name} ')`;
  },

  searchCity: function () {
    this.weatherData(searchInput.value);
  },
};
///

searchBtn.addEventListener("click", function () {
  theWeather.searchCity();
  searchInput.value = "";
});

searchInput.addEventListener("keyup", (e) => {
  let userValue = searchInput.value.trim();

  if (e.code === "Enter" && userValue) {
    theWeather.searchCity();
    searchInput.value = "";
  }
});

theWeather.weatherData("Dnipro");
