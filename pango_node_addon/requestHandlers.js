var exec = require("child_process").exec;
var fs = require('fs');
var querystring = require("querystring");

//node addons
var addon = require('./build/Release/addon');
var obj = new addon.MyObject();

function index(res, postData) {
	console.log("Request handler for 'index' was called.");
	var text = querystring.parse(postData).text;
	text = (typeof text === 'undefined')? "" : text;
	var image = obj.generate(text);
	image = (new Buffer(image)).toString('base64');
	var body ='<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	"<img src=\"data:image/png;base64," + image + "\" />" +
	'<form action="/index" method="post">'+
	'<textarea name="text" rows="20" cols="60">' + text + '</textarea>'+
	'<input type="submit" value="Submit text" />'+
	'</form>'+
	'</body>'+
	'</html>';

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(body);
	res.end();	

}

exports.index = index;