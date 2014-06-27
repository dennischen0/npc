var http = require('http');
var url = require('url');
var heapdump = require('heapdump');
//node addons
var addon = require('./build/Release/addon');
var obj = new addon.MyObject();

http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	//console.log(pathname);

	if (req.method == 'GET') {
        var body = url.parse(req.url, true);
		process.stdout.write(".");
		res.writeHead(200, {'Content-Type': 'image/png'});
		res.end(obj.generate(body.query['text']));	
    }


}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');