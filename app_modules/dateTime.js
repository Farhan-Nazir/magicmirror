"use strict";
let getTime = () => {
  let hoursMins = new Date();
  //let nowTime = document.getElementById("time");
  //console.log(nowTime);

  return (
    hoursMins.getHours() +
    ":" +
    hoursMins.getMinutes()
  );
  //return time;
};
let getDate = () => {
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
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let day = new Date().getDay();
  let date = new Date().getDate();
  let nowDate = document.getElementById("date");
  return (nowDate.innerHTML =
    dayNames[day] + ", " + monthNames[month] + " " + date + ", " + year);
};

module.exports = {
  time: getTime,
  date: getDate
};
