let weather = require("./weather");
//let todo = require("./todo");
let rssFeeds = require("./rssFeed");
let googleCal = require("./googleCalendar");
//let quotes = require('./quotes')
let separator = ":";
    let isTrue = false;
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Juni",
  "Juli",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec"
];

const dayNames = [
  "Söndag",
  "Måndag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag"
];

// Date & Time Start
module.exports.DateTime = io => {
  setInterval(() => {
    
    let hours = new Date().getHours();
    let mins = new Date().getMinutes();
    let sec = new Date().getSeconds();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let day = new Date().getDay();
    let nowdate = new Date().getDate();
    if(isTrue){
      separator = ":";
      isTrue = false;
    } else {
      separator = " ";
      isTrue = true;
    }
    
    let date =
      dayNames[day] + ", " + monthNames[month] + " " + nowdate + " " + year;
      let time = `${hours}${separator}${mins}`;
    let data = [time, date];
    io.sockets.emit("DateTime", data);
  }, 1000);
};

//weather Start
module.exports.forecast = io => {
  weather.currentWeather(io);
  weather.fiveDays(io);
};
// Weather End

//Rss start
module.exports.rssFeeds = io => {
  rssFeeds.rss(io);
};

// google calendar
module.exports.googleEvents = io => {
  googleCal.myEvents(io);
};

/*Quotes Module
module.exports.quotes = io => {
  quotes.quotes(io)
} */
