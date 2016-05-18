var express = require("express");
var path = require("path");
var logger = require("morgan");
var http = require("http");
var bodyParser = require("body-parser");

var app = express();

app.set("views",path.resolve(__dirname,"guestbookviews"));
app.set("view engine",'ejs');

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended:false}));

app.get("/",function(request,response){
	response.render("index");
})

app.get("/new-entry",function(request,response){
	response.render("new-entry");
})

app.post("/new-entry",function(request,response){
	if(!request.body.title||!request.body.body){
		//If user submits the form with no title or content,responds with a 400 error
		response.status(400).send("Entries must have a title and a body");
		return;
	}
	entries.push({
		title:request.body.title,
		content:request.body.body,
		published:new Date()
	});
	response.redirect("/");//重定向至首页，查看新插入的数据
})

http.createServer(app).listen(3000,function(){
	console.log("Guestbook app started on port 3000.");
});