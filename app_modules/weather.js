const OpenWeatherMapHelper = require("./openWeatherApi");
const helper = new OpenWeatherMapHelper({
  APPID: "815a6d79b8c7082e66da7a8e9ebcda39",
  units: "metric"
});
let cityId = 2692969;

helper.getCurrentWeatherByCityID(cityId, (err, currentWeather) => {
  if (err) {
    console.log(err);
  } else {
    module.exports.currentWeather = io => {
      let data = currentWeather;
      //console.log(data);
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
      //console.log(data);
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
