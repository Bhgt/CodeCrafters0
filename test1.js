var express = require("express");

var app = express();

var posts = [];

app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.get("/post/:word", function(req, res){
	posts.push(req.params.word);
	console.log(posts);
	res.render("post", {posts: posts});
});

app.get("/delete", function(req, res){
	posts.pop();
	console.log(posts);
	res.render("post", {posts: posts});
});

app.listen(3000);
