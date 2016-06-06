//declare models
/*###########################*/
//use express node framework
var express = require('express');

//use bodyparser to parse requests and responses
var bodyParser = require('body-parser');
//use morgan to log requests and 

var morgan = require('morgan');
//use mongoose module
var mongoose = require('mongoose');
//use socket.io

//use config.js to use customized server variables and assest 
var config = require('./config');
/*###########################*/
mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to database');
    }
});
// initialize express
var app = express();

var http = require("http").Server(app);
var io = require('socket.io')(http);
 
/*###########################*/
//use models
// initilize bodyparser to parse string + other types of urls
app.use(bodyParser.urlencoded({extended: true}));
//parse json 
app.use(bodyParser.json());
// morgan log request response
app.use(morgan('dev'));
//rout any request
/*###########################*/
//render all front end css,html and js file  
app.use(express.static(__dirname + '/public'));
//rout any request
/*###########################*/
var api = require('./app/routes/api')(app, express,io);
app.use('/api', api); 

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});
//io.on('connection', function(socket){
//	  console.log('a user connected');
//	});

//rout any request
/*###########################*/

http.listen(config.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listen on port 3000");
    }
});
/*###########################*/
