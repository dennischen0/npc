var http = require('http');
var urlLib = require('url');
var heapdump = require('heapdump');
//node addons
var addon = require('./build/Release/addon');
var obj = new addon.MyObject();

http.createServer(function (req, res) {
	//process.stdout.write(".");
    
	var pathname = urlLib.parse(req.url).pathname;
	console.log(pathname);
	if(pathname === "/generateTextLayer"){
		//generateTextLayer?message=Heartfelt%20congratulations+to+you+and+your+babies.&font=Andika&width=400&height=50&font_size=40&origin_x=300&origin_y=200
		generateTextLayer?
		message=test message
		&font=Andika
		&width=400
		&height=50
		&font_size=40
		&origin_x=300
		&origin_y=200
	    var params = urlLib.parse(req.url,true);
	    console.log(params.query);
	    q = params.query;

	    //var params = {query: {text: "test generate text"}};
	    //message, font, font size, font color,
	    // text_x, text_y, origin_x, origin_y

	    res.writeHead(200, {'Content-Type': 'image/png'});
	    res.end(obj.generate(params.query));
	}else{
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("404 Not found");
		res.end();
	}
	//localhost:3000/
	//for get request
	// if (req.method == 'GET') {
	// 	var body = url.parse(req.url, true);
	// 	process.stdout.write(".");
	// 	res.writeHead(200, {'Content-Type': 'image/png'});
	// 	res.end(obj.generate(body.query['text']));	
	// }

    //for regular non request

    //res.writeHead(200, {'Content-Type': 'image/png'});
    //res.end(obj.generate(params.query));




}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');