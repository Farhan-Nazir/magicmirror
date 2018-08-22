const OpenWeatherMapHelper = require("openweathermap-node");
const helper = new OpenWeatherMapHelper({
  APPID: "ae16f14d6759666e27a4fb57b939cde5",
  units: "metric"
});
let lat = 55.6053;
let lon = 13.0002;

helper.getTenDaysForecastByGeoCoordinates(lat, lon, (err, tenDaysForecast) => {
  if (err) {
    console.log(err);
  } else {
    module.exports.tenDays = io => {
      let data = tenDaysForecast;
      io.sockets.emit("forecast", data);
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
