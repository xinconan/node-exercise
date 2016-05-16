var express = require("express");
var http = require("http");

var app = express();

app.use(function(request,response,next){
	console.log("In comes a "+request.method+" to:"+request.url);
	next();
});
app.use(function(request,response,next){
	var minute = (new Date()).getMinutes();
	if((minute%2)===0){
		next();
	}else{
		response.statusCode = 403;
		response.end("Not authorized");
	}
	
});
app.use(function(request,response){
	response.end("Secret info:Hello Xinconan");
});


http.createServer(app).listen(3000);