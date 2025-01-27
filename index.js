let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// Function to get the country name from the code
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// Function to get the date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

// Function to get weather data using city name
const getWeatherData = async (city) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c01f28170619d7d6bb3491b7f10d87f5&units=metric`; // Added units=metric for Celsius
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);

    if (data.cod === 200) {
      const { main, name, weather, wind, sys, dt } = data;

      cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
      dateTime.innerHTML = getDateTime(dt);

      w_forecast.innerHTML = weather[0].main;
      w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

      w_temperature.innerHTML = `${main.temp.toFixed(1)}&#176;C`;
      w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(1)}&#176;C`;
      w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(1)}&#176;C`;

      w_feelsLike.innerHTML = `${main.feels_like.toFixed(1)}&#176;C`;
      w_humidity.innerHTML = `${main.humidity}%`;
      w_wind.innerHTML = `${wind.speed} m/s`;
      w_pressure.innerHTML = `${main.pressure} hPa`;
    } else {
      // Handle case when the city is not found
      cityName.innerHTML = "City not found";
      dateTime.innerHTML = "";
      w_forecast.innerHTML = "";
      w_icon.innerHTML = "";
      w_temperature.innerHTML = "";
      w_minTem.innerHTML = "";
      w_maxTem.innerHTML = "";
      w_feelsLike.innerHTML = "";
      w_humidity.innerHTML = "";
      w_wind.innerHTML = "";
      w_pressure.innerHTML = "";
    }
  } catch (error) {
    console.error(error);
  }
};

// Event listener for form submission
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityNameInput = document.querySelector(".city_name").value;
  console.log(cityNameInput);

  if (cityNameInput) {
    getWeatherData(cityNameInput);
  }
});

// Call the function on page load with default city
window.addEventListener("load", () => {
  getWeatherData("Bhubaneswar"); // Default city
});