var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    console.log('Serving GET request');
    res.render('test3');
});

app.post('/upload', function(req, res){
    console.log('Serving POST request');
    res.send('Clicked!');
});

app.listen(3000, function(){
    console.log('listening');
});