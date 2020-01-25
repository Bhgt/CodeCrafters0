var express = require("express");

var app = express();

app.get("/", function(req, res){
	res.send("Hello Express");
});

app.get("/say/:word", function(req, res){
	console.log("Saying "+req.params.word);
	res.send(" "+req.params.word);
});

app.listen(3000);
