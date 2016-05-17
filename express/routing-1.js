var express = require("express");
var path = require("path");
var http = require("http");

var app = express();

app.get("/",function(request,response){
	response.end("Welcome to my homepage");
})

app.get("/about",function(request,response){
	response.end("Welcome to about me page!");
})

app.get("/weather",function(request,response){
	response.end("The current weather is NICE.");
});
app.get("/hello/:who",function(request,response){
	response.end("Hello,"+request.params.who + ".");
});
app.use(function(request,response){
	response.statusCode = '404';
	response.end('404,Page not found!');
});

http.createServer(app).listen(3000);