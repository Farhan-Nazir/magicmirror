let weather = require("./weather");
let todo = require("./todo");
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
    let time = new Date(Date.now()).toLocaleTimeString();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let day = new Date().getDay();
    let nowdate = new Date().getDate();
    let date =
      dayNames[day] + ", " + monthNames[month] + " " + nowdate + " " + year;
    let data = [time, date];
    io.sockets.emit("DateTime", data);
  }, 1000);
};

//weather Start
module.exports.forecast = io => {
  weather.tenDays(io);
};
// Weather End

//Todo Start
module.exports.todo = io => {
  todo.todoList(io);
};
