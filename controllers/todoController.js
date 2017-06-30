var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // use native mongoose promises﻿

//Connect to database
mongoose.connect('mongodb://pineapple:b79c2c70dd4467bc9fed0c42d6f4a851@ds143542.mlab.com:43542/pineapple-todo');

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

//Create model based on schema
var Todo = mongoose.model('Todo', todoSchema);

//Example mongoDB use
// var itemOne = Todo({item: 'make bed'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });


//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'code something'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    }); //it retriev all items, but if we pass object we can find particular object
  });

  app.post('/todo',urlencodedParser ,function(req, res){
    //get data from view and add it to mongoDb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delet the requested item from mongoDb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });

    /*
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
      //zamieniamy wszystkie spacje na '-' we wszystkich obiekatach następne
      //zwracamy jedynie obiekty, które nie pasują do obiektów w request'cie
    })
    res.json(data);
    */
  });

};
