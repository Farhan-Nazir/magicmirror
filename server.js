//App requirement
let express = require("express");
let bodyParse = require("body-parser");
let path = require("path");
var socket = require("socket.io"); // not using yet
let app = express();

//own app module
let app_module = require("./app_modules/app_module");
//Setting up body-parsers
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// Listen App
let port = process.env.PORT || 3000; //Use on server.
let server = app.listen(port, () => {
  console.log("App started on port", port);
});

//On Connections with socket
let io = socket(server);
io.on("connection", function(socket) {
  console.log("a user connected", socket.id);
  app_module.forecast(io);
  app_module.DateTime(io);
  app_module.rssFeeds(io);
  app_module.googleEvents(io);
  // app_module.quotes(io);
});

// setting up template engine and static folder.
//app.set("view engine", "ejs");

app.set("views", path.join(__dirname + "/views"));
app.use(express.static("views"));

//Render View
app.get("/", function(req, res) {
  res.render("index");
});

/*----------------- Timer Setting --------------------- */

// Update Every Hour Group
setInterval(() => {
  app_module.forecast(io);
  app_module.googleEvents(io);
}, 1000 * 60 * 60);

// Update Every Minute Group
setInterval(() => {
  //app_module.todo(io);
  app_module.rssFeeds(io);
}, 1000 * 60);
