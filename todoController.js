var bodyParser = require('body-parser');
var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'get milk'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

//mongoose.connect('mongodb://test:test@cluster0-lplnh.mongodb.net/test?retryWrites=true&w=majority')
try {
    mongoose.connect('mongodb://test:test@cluster0-shard-00-00-lplnh.mongodb.net:27017,cluster0-shard-00-01-lplnh.mongodb.net:27017,cluster0-shard-00-02-lplnh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
} catch (error) {
 console.log("error in conecting to db\n"+error)    
}


//Create a schema
var todoSchema = new mongoose.Schema({
   item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){
    /*
    app.get('/', function(req, res){
        res.redirect('/todo');
    });
    */

    app.get('/', function(req, res) {
        res.render('home');
    });


    app.get('/snake', function(req,res){
        Todo.find({}, function(err,data){
            if(err) throw err;
            res.render('snake');
        });

    });
    app.get('/todo', function(req,res){
        Todo.find({}, function(err,data){
           if(err) throw err;
           res.render('todo',{todos: data});
        });

    });

    app.get('/lunar', function(req,res){
            res.render('lunard');
    });


    app.post('/todo',urlencodedParser,   function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        })

    });

    app.delete('/todo/:item',function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
           if (err) throw err;
           res.json(data);
        });

    });
};