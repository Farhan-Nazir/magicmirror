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
socket.on("currentForecast", data => {
  currentForecast(data); // Current Weather
});

socket.on("fiveDaysForecast", data => {
  fiveDaysWeather(data); // Five Days Weather
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

//Qoutes start
socket.on("qoutes", data => {
  let qoutes = document.getElementById("qoutes");
  let time = new Date(Date.now()).getHours();
  for (var i = 0; i <= 20; i++) {
    if (time.getHours() > 5 && time.getHours() < 12) {
      setInterval(() => {
        qoutes.innerHTML = data.morningMessages[i];
      }, 1000 * 5);
    } else {
      setInterval(() => {
        qoutes.innerHTML = data.eveingMessages[i];
      }, 1000 * 5);
    }
  }
});

/* -------------------- Helper Functions ---------------------------- */

// Kevin to Celcius
function k2c(k) {
  return (k - 273.15).toFixed(1);
}

//Date number to Date
function calDateTime(dt) {
  let date = new Date(dt * 1000);
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

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function timeDate() {
  let time = new Date(Date.now()).getHours();
  return time;
}
/* -------------------- Helper Ends -----------------------*/

function currentForecast(data) {
  let current_temp = document.getElementById("current_temp");

  let icon = document.getElementById("icon");
  let temp_max = document.getElementById("temp_max");
  let humidity = document.getElementById("humidity");
  let wind = document.getElementById("wind");
  let weather_txt = document.getElementById("weather_txt");

  current_temp.innerHTML = k2c(data.main.temp) + "°"; // current temp
  icon.setAttribute("class", "wi wi-owm-" + data.weather[0].id); // icon
  temp_max.innerHTML = "High: " + k2c(data.main.temp_max) + "°"; // max temp
  humidity.innerHTML = data.main.humidity + " %"; // rain chance
  wind.innerHTML = mpsTokmH(data.wind.speed); // wind speed
  weather_txt.innerHTML = data.weather[0].description;
  console.log("Weather interval check !!!" + new Date().toLocaleTimeString());
}

function fiveDaysWeather(data) {
  let weatherList = document.getElementById("weatherList");
  const dayNames = ["Sön", "Mån", "Tir", "Ons", "Tor", "Fre", "Lör"];

  if (weatherList.innerHTML.length > 0) {
    weatherList.innerHTML = "";
  }

  for (let i = 0; i <= 6; i++) {
    // let date = new Date(data.list[i].dt * 1000);
    let allTempList = data.list[i];
    let date = new Date(allTempList.dt * 1000);
    let hour = date.getHours();

    //if (date.getDay() != new Date().getDay()) {
    // let unique = [...new Set(allTempList.list[i])];

    let icon5 = allTempList.weather[0].id;
    let createIcon = document.createElement("i");
    createIcon.setAttribute("class", "wi wi-owm-" + icon5);

    let temp = allTempList.main.temp;
    let listItem = document.createElement("li");
    let dayName = date.getDay();
    let items =
      " " + k2c(temp) + "° " + dayNames[dayName] + " " + addZero(hour) + ":00 ";
    listItem.setAttribute("class", "weatherItem");
    listItem.appendChild(createIcon);
    listItem.appendChild(document.createTextNode(items));

    weatherList.appendChild(listItem);
    console.log(date.getHours() + "-" + date.getDay() + "-" + icon5 + "- " + i);
  }
}

//console.log(JSON.stringify(data[0].list[0].main.temp));
//}

/*
function fiveDaysWeather(data) {
  let weatherList = document.getElementById("weatherList");
  

  for (let i = 0; i <= 5; i += 1) {
    
  }
}
*/
