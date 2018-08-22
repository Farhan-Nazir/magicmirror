//App requirement
let express = require("express");
let ejs = require("ejs");
let bodyParse = require("body-parser");
let path = require("path");
var socket = require("socket.io"); // not using yet
let app = express();

//own app module
let app_module = require("./app_modules/app_module");
//Setting up body-parse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// Listen App
let port = process.env.PORT || 3000; //Use on server.
let server = app.listen(port, () => {
  console.log("App started on port", port);
});
let io = socket(server);
io.on("connection", function(socket) {
  console.log("a user connected", socket.id);
  app_module.forecast(io);
  app_module.DateTime(io);
  app_module.todo(io);
});

// setting up template engine and static folder.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static("views"));

//Render View
app.get("/", function(req, res) {
  res.render("index");
});

/*----------------- Timer Setting --------------------- */

setInterval(() => {
  app_module.forecast(io);
}, 1000 * 60 * 60);

setInterval(() => {
  app_module.todo(io);
}, 1000 * 60);
