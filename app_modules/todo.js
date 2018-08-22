var mongoose = require("mongoose");

// connect to db
mongoose.connect("mongodb://farhan:Saad2016@ds135747.mlab.com:35747/todo");

// Create schema in db
var todoSchema = new mongoose.Schema({
  item: String
});

var collectionName = "Todo";

// create model
var Todo = mongoose.model("Todo", todoSchema, collectionName);

//var data = [{item: 'Get Milk'}, {item: 'get egg'}, {item: 'pay the bills'}];

module.exports = {
  todoList: function(io) {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      io.sockets.emit("todoList", data);
    });
  }
};

// simple get  routing method
/*app.get("/", function(req, res) {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render("index", { todos: data });
    });
  });
}; 
// post method
  post: app.post("/todo", urlencodedParser, function(req, res) {
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  }),

  // delete method
  delete: app.delete("/todo/:item", function(req, res) {
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  })*/
