const getData = async (location) => {
  const resultArr = [];
  let weatherData;
  try {
    weatherData = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=HUK84KB3EW3PQZWG6M8M76PWM&contentType=json`
    )
      .then((res) => res.json())
      .then((data) => data);
  } catch {
    console.log("error");
  }
  for (let i = 0; i <= forecastItems.length; i++) {
    resultArr.push(weatherData.days[i]);
  }
  displayWeather(resultArr, weatherData.resolvedAddress);
  console.log(resultArr);
  console.log(
    `Weather today in ${weatherData.resolvedAddress}: \n Maximum Temperature: ${resultArr[0].tempmax} \n Minimum Temperature: ${resultArr[0].tempmin} \n ${resultArr[0].description}`
  );
};

// get elements
const weatherBody = document.querySelector(".main-weather-card");
const currentTemp = document.querySelector(".current-temp");
const currentTempIcon = document.querySelector(".current-temp-icon");
const currentTempText = document.querySelector(".current-temp-text");
const currentConditions = document.querySelector(".current-conditions");
const currentConditionsText = document.querySelector(
  ".current-conditions-text"
);
const weatherTabs = document.querySelector(".weather-tabs");
const forecastItems = document.querySelectorAll(".weather-tabs-forecast-item");
const getWeatherButton = document.querySelector(".get-weather-button");
const locationInput = document.querySelector("#location-input");
const locationText = document.querySelector(".location-text");

getWeatherButton.addEventListener("click", () => {
  getData(locationInput.value);
});

// functions to display weather
const displayWeather = (data, location) => {
  const currentHour = new Date().getHours();
  const wiDay = currentHour > 7 && currentHour < 19 ? "wi-day" : "wi-night";
  currentTempIcon.innerHTML = `<i class="wi ${wiDay}-${data[0].icon}"></i>`;
  currentTempText.innerHTML = data[0].temp + "&deg";
  currentConditionsText.textContent = data[0].description;
  locationText.textContent = location;
  for (let i = 0; i < forecastItems.length; i++) {
    console.log(forecastItems[i]);
    const currentDay = data[i + 1];
    forecastItems[
      i
    ].innerHTML = `<i class="wi wi-${currentDay.icon} forecast-icon"></i><p class="forecast-text">${currentDay.description}</p><div class="forecast-temp"><span class="min">Min: ${currentDay.tempmin}&deg;</span><span class="max">Max: ${currentDay.tempmax}&deg;</span></div>`;
  }
};
