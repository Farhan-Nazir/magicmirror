let socket = io("http://localhost:3000");

window.onload = console.log("Test okej");
//Date & Time Start
socket.on("DateTime", data => {
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  time.innerHTML = addZero(data[0]);
  date.innerHTML = addZero(data[1]);
});
// Date & Time End

//Weather Start
socket.on("forecast", data => {
  currenWeather(data); // Current Weather
  fiveDaysWeather(data);
});
//Weather End

//Rss Start
socket.on("rss", data => {
  let rss = document.getElementById("rss");
  for (let i = 0; data.items.length > i; i++) {
    i++;
    rss.innerHTML +=
      "   |   " +
      data.items[i]["content:encoded"] +
      " - " +
      data.items[i].pubDate.substring(16, 22) +
      data.items[i].pubDate.substring(4, 11);
  }
});
//Rss End

//Google Calendar Events
socket.on("googleEvents", data => {
  let goList = document.getElementById("goList");
  let newLi = document.createElement("li");
  newLi.appendChild(document.createTextNode(data));
  goList.appendChild(newLi);
  console.log(data);
});
// google End
/* -------------------- Helper Functions ---------------------------- */

// Kevin to Celcius
function k2c(k) {
  return Math.round(k - 273, 15);
}

//Date number to Date
function calDateTime(dt) {
  let getDt = new Date(dt * 1000);
  let date = new Date(getDt);
  let day = date.getDay();
  return day;
}

// Add zero to time
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }

  return i;
}

//Speed converter
function mpsTokmH(ms) {
  let res = (ms * 3.6) / 5;
  return Math.round(res) + " km/h";
}

function getforEach(data) {
  data = [];
  for (let i = 0; data.items.length > 0; i++) {
    let items = data.items[i];
  }
}

function currenWeather(data) {
  let current_temp = document.getElementById("current_temp");
  let icon = document.getElementById("icon");
  let temp_max = document.getElementById("temp_max");
  let humidity = document.getElementById("humidity");
  let wind = document.getElementById("wind");
  let weather_txt = document.getElementById("weather_txt");

  current_temp.innerHTML = k2c(data.list[0].main.temp) + "°"; // current temp
  icon.setAttribute("class", "wi wi-owm-" + data.list[0].weather[0].id); // icon
  temp_max.innerHTML = "High: " + k2c(data.list[0].main.temp_max) + "°"; // max temp
  humidity.innerHTML = data.list[0].main.humidity + " %"; // rain chance
  wind.innerHTML = mpsTokmH(data.list[0].wind.speed); // wind speed
  weather_txt.innerHTML = data.list[0].weather[0].description;
  console.log("Weather interval check !!!");
  //console.log(JSON.stringify(data[0].list[0].main.temp));
}

function fiveDaysWeather(data) {
  let weatherList = document.getElementById("weatherList");
  const dayNames = [
    "Måndag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag"
  ];
  if (weatherList.innerHTML.length > 0) {
    weatherList.innerHTML = "";
  }

  for (let i = 0; i <= 1; i += 1) {
    let allTempList = data.list[i];
    let day = calDateTime(allTempList.dt);
    let dayName = dayNames[day];
    console.log(allTempList.dt + "-" + i);

    //let icon = allTempList.weather[i].id;
    let temp = allTempList.main.temp;

    //let allTemps = [];

    let items = dayName + " " + k2c(temp) + "°";
    let listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(items));
    listItem.classList.add("weatherItem");
    weatherList.appendChild(listItem);
  }
}
