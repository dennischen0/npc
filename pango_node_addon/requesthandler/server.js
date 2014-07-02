var http = require('http');
var url = require('url');
//var fs = require('fs');

function start(route, handle){
	http.createServer(function (req, res) {

		var postData = "";
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");

		req.setEncoding("utf8");

		req.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Recieved chunk '"+postDataChunk + "'.");
		});
		req.addListener("end", function(){
			route(handle, pathname, res, postData);
		});


		// route(handle, pathname);
		// //process.stdout.write(".");
		// res.writeHead(200, {'Content-Type': 'image/png'});
		// res.end(obj.generate("this is a test string that is changing"));		
	
	    // fs.writeFile("image.png", obj.generate(), 'base64', function(err) {
		//   fs.readFile('image.png', function(err, contents){
		// 		process.stdout.write(".");
		// 		res.writeHead(200, {'Content-Type': 'image/png'});
		// 		res.end(contents);		
		// 	});	
		// });
	   
	}).listen(1337);
	console.log('Server running at http://127.0.0.1:1337/');

}

exports.start = start;