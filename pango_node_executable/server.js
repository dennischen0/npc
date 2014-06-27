var http = require('http');
var exec = require('child_process').exec;
var fs = require('fs');
http.createServer(function (req, res) {
	exec('./main image.png "test sentiment"', function(err, stdout, stderr){
		fs.readFile('image.png', function(err, contents){
			process.stdout.write(".");
			res.writeHead(200, {'Content-Type': 'image/png'});
  			res.end(contents);		
		});
	});
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
