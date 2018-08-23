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
});
//Weather End

//Todo Start
socket.on("todoList", data => {
  var ul = document.querySelector("ul");
  if (ul.innerHTML.length > 0) {
    ul.innerHTML = "";
  }
  ul.classList.add = "li";

  for (var i = 0; i < data.length; i++) {
    var items = data[i];
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(items.item));
    ul.appendChild(listItem);
  }
  //console.log(data);
});
// Todo End

//Rss Start
socket.on("rss", data => {
  let rss = document.getElementById("rss");
  for (var i = 0; data.items.length > i; i++) {
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

/* -------------------- Weather Helper Functions ---------------------------- */

// Kevin to Celcius
function k2c(k) {
  return Math.round(k - 273, 15);
}

//Date number to Date
function calDateTime(dt) {
  return new Date(dt * 1000);
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
  for (var i = 0; data.items.length > 0; i++) {
    let items = data.items[i];
  }
}
