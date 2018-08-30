const OpenWeatherMapHelper = require("openweathermap-node");
const helper = new OpenWeatherMapHelper({
  APPID: "your_API_Key",
  units: "metric"
});
let cityId = 2692969;

helper.getCurrentWeatherByCityID(cityId, (err, currentWeather) => {
  if (err) {
    console.log(err);
  } else {
    module.exports.currentWeather = io => {
      let data = currentWeather;
      console.log(data);
      io.sockets.emit("currentForecast", data);
    };
  }
});

helper.getFiveDaysByCityID(cityId, (err, fiveDaysForecast) => {
  if (err) {
    console.log(err);
  } else {
    module.exports.fiveDays = io => {
      let data = fiveDaysForecast;
      console.log(data);
      io.sockets.emit("fiveDaysForecast", data);
    };
  }
});

//3-hrs weather
/*
helper.getThreeHourForecastByGeoCoordinates(
  lat,
  lon,
  (err, threeHourForecast) => {
    if (err) {
      console.log(err);
    } else {
      module.exports.threeHours = threeHourForecast;
    }
  }
); */
