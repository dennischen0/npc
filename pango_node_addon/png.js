var http = require('http');
var urlLib = require('url');
var heapdump = require('heapdump');
var querystring = require("querystring");
var fs = require('fs');
//node addons
var addon = require('./build/Release/addon');
var obj = new addon.TextGenerate();

http.createServer(function (req, res) {
	//process.stdout.write(".");
    
	var pathname = urlLib.parse(req.url).pathname;
	//console.log("path: " + pathname);


	if(pathname === "/"){
		var params = urlLib.parse(req.url,true);
	    q = params.query;

    	message = (q.message) ? q.message : "This is a message";
    	m_font = (q.m_font) ? q.m_font : "Cookie";
    	m_font_color = (q.m_font_color) ? q.m_font_color : "ef5389";
    	m_width = (q.m_width) ? q.m_width : "1137";
    	m_height = (q.m_height) ? q.m_height : "345";
    	m_font_size = (q.m_font_size) ? q.m_font_size : "17";
    	m_x_offset = (q.m_x_offset) ? q.m_x_offset : "182";
    	m_y_offset = (q.m_y_offset) ? q.m_y_offset : "577";
    	m_gravity = (q.m_gravity) ? q.m_gravity : "Left";

    	sender = (q.sender) ? q.sender : "Sender";
    	s_font = (q.s_font) ? q.s_font : "Cookie";
    	s_font_color = (q.s_font_color) ? q.s_font_color : "ef5389";
    	s_width = (q.s_width) ? q.s_width : "1137";
    	s_height = (q.s_height) ? q.s_height : "108";
    	s_font_size = (q.s_font_size) ? q.s_font_size : "16";
    	s_x_offset = (q.s_x_offset) ? q.s_x_offset : "182";
    	s_y_offset = (q.s_y_offset) ? q.s_y_offset : "938";
    	s_gravity = (q.s_gravity) ? q.s_gravity : "Left";

    	recipient = (q.recipient) ? q.recipient : "Recipient";
    	r_font = (q.r_font) ? q.r_font : "Cookie";
    	r_font_color = (q.r_font_color) ? q.r_font_color : "ef5389";
    	r_width = (q.r_width) ? q.r_width : "1133";
    	r_height = (q.r_height) ? q.r_height : "98";
    	r_font_size = (q.r_font_size) ? q.r_font_size : "16";
    	r_x_offset = (q.r_x_offset) ? q.r_x_offset : "182";
    	r_y_offset = (q.r_y_offset) ? q.r_y_offset : "461";
    	r_gravity = (q.r_gravity) ? q.r_gravity : "Left";

	    var values = { 
	    	message: message,
	    	m_font: m_font,
	    	m_font_color: m_font_color,
	    	m_width: m_width,
	    	m_height: m_height,
	    	m_font_size: m_font_size,
	    	m_x_offset: m_x_offset,
	    	m_y_offset: m_y_offset,
	    	m_gravity: m_gravity,
	    	recipient: recipient,
	    	r_font: r_font,
	    	r_font_color: r_font_color,
	    	r_width: r_width,
	    	r_height: r_height,
	    	r_font_size: r_font_size,
	    	r_x_offset: r_x_offset,
	    	r_y_offset: r_y_offset,
	    	r_gravity: r_gravity,
	    	sender: sender,
	    	s_font: s_font,
	    	s_font_color: s_font_color,
	    	s_width: s_width,
	    	s_height: s_height,
	    	s_font_size: s_font_size,
	    	s_x_offset: s_x_offset,
	    	s_y_offset: s_y_offset,
	    	s_gravity: s_gravity
	    }
	    //console.log(q.width);

	    var qstring = querystring.stringify(values)

		var body =
		'<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">'+
		'<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">'+
		'<link rel="stylesheet" href="/custom.css">'+
		'<link rel="stylesheet" href="/bootstrap-slider.css">'+
		'<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>'+
		'<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>'+
				'<script src="/underscore-min.js"></script>'+
				'<script src="/bootstrap-slider.js"></script>'+
				'<script src="/custom.js"></script>'+
				'<script src="/ipsum.js"></script>'+
		'</head>'+
		'<body>'+
		'<div class="site-wrapper">'+
			'<div class="site-wrapper-inner">'+
				'<div class="cover-container">'+
					'<div class="inner cover">'+
						'<h1 class="cover-heading">Dennis</h1>'+
						'<p class="lead">'+
							'<div class= "container">'+
								'<div class= "row">'+
									'<div class = "col-md-4">'+
									'<div id="wrapper">'+
										'<form role="form" action="/" method="get">'+
											'<ul id="tabs" class="nav nav-tabs" role="tablist">'+
												'<li class="active"><a href="#message" role="tab" data-toggle="tab">Message</a></li>'+
												'<li><a href="#sender" role="tab" data-toggle="tab">Sender</a></li>'+
												'<li><a href="#recipient" role="tab" data-toggle="tab">Recipient</a></li>'+
											'</ul>'+
											'<div class="tab-content">'+
												'<div class="tab-pane active" id="message">'+
													'<div class="form-group">'+
														'<label for="message">Message    </label>'+
														'<button type="button" id="ipsum" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-star"></span> ipsum</button>'+
														'<textarea name="message" class="form-control" placeholder="Enter message">'+message+'</textarea>'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="m_font">Font</label>'+
														'<select name="m_font" class="form-control" id="m_font">'+
														'<option>Arimo</option>'+
														'<option>Alice</option>'+
														'<option>Arimo Bold</option>'+
														'<option>Andika</option>'+
														'<option selected="selected">Cookie</option>'+
														'<option>EBGaramond</option>'+
														'</select>'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="m_font_color">Font Color</label>'+
														'<input type="text" name="m_font_color" class="form-control" value="' + m_font_color + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="m_gravity">Alignment</label>'+
														'<select name="m_gravity" class="form-control" id="m_gravity">'+
														'<option selected="selected">Left</option>'+
														'<option>Center</option>'+
														'<option>Right</option>'+
														'</select>'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="m_font_size">Font Size</label>'+'<br>'+
														'<input type="number" name="m_font_size" class="form-control" value="' + m_font_size + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="m_width">Width</label>'+'<br>'+
														'<input type="number" name="m_width" class="form-control" value="' + m_width + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="m_height">Height</label>'+'<br>'+
														'<input type="number" name="m_height" class="form-control" value="' + m_height + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="m_x_offset">Origin X</label>'+'<br>'+
														'<input type="number" name="m_x_offset" class="form-control" value="' + m_x_offset + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="m_y_offset">Origin Y</label>'+'<br>'+
														'<input type="number" name="m_y_offset" class="form-control" value="' + m_y_offset + '">'+
													'</div>'+
												'</div>'+
												'<div class="tab-pane" id="sender">'+
													'<div class="form-group">'+
														'<label for="sender">Sender</label>'+
														'<input type="text" name="sender" class="form-control" value="' + sender+ '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="s_font">Font</label>'+
														'<select name="s_font" class="form-control" id="s_font">'+
														'<option>Arimo</option>'+
														'<option>Alice</option>'+
														'<option>Arimo Bold</option>'+
														'<option>Andika</option>'+
														'<option selected="selected">Cookie</option>'+
														'<option>EBGaramond</option>'+
														'</select>'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="s_font_color">Font Color</label>'+
														'<input type="text" name="s_font_color" class="form-control" value="' + s_font_color + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="s_gravity">Alignment</label>'+
														'<select name="s_gravity" class="form-control" id="s_gravity">'+
														'<option selected="selected">Left</option>'+
														'<option>Center</option>'+
														'<option>Right</option>'+
														'</select>'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="s_font_size">Font Size</label>'+'<br>'+
														'<input type="number" name="s_font_size" class="form-control" value="' + s_font_size + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="s_width">Width</label>'+'<br>'+
														'<input type="number" name="s_width" class="form-control" value="' + s_width+ '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="s_height">Height</label>'+'<br>'+
														'<input type="number" name="s_height" class="form-control" value="' + s_height +'">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="s_x_offset">Origin X</label>'+'<br>'+
														'<input type="number" name="s_x_offset" class="form-control" value="' + s_x_offset + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="s_y_offset">Origin Y</label>'+'<br>'+
														'<input type="number" name="s_y_offset" class="form-control" value="' + s_y_offset + '">'+
													'</div>'+
												'</div>'+
												'<div class="tab-pane" id="recipient">'+
													'<div class="form-group">'+
														'<label for="recipient">Recipient</label>'+
														'<input type="text" name="recipient" class="form-control" value="' + recipient+ '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="r_font">Font</label>'+
														'<select name="r_font" class="form-control" id="r_font">'+
														'<option>Arimo</option>'+
														'<option>Alice</option>'+
														'<option>Arimo Bold</option>'+
														'<option>Andika</option>'+
														'<option selected="selected">Cookie</option>'+
														'<option>EBGaramond</option>'+
														'</select>'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="r_font_color">Font Color</label>'+
														'<input type="text" name="r_font_color" class="form-control" value="' + r_font_color + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="r_gravity">Alignment</label>'+
														'<select name="r_gravity" class="form-control" id="r_gravity">'+
														'<option selected="selected">Left</option>'+
														'<option>Center</option>'+
														'<option>Right</option>'+
														'</select>'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="r_font_size">Font Size</label>'+'<br>'+
														'<input type="number" name="r_font_size" class="form-control" value="' + r_font_size + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="r_width">Width</label>'+'<br>'+
														'<input type="number" name="r_width" class="form-control" value="' + r_width+ '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="r_height">Height</label>'+'<br>'+
														'<input type="number" name="r_height" class="form-control" value="' + r_height +'">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="r_x_offset">Origin X</label>'+'<br>'+
														'<input type="number" name="r_x_offset" class="form-control" value="' + r_x_offset + '">'+
													'</div>'+
													'<div class="form-group">'+
														'<label for="r_y_offset">Origin Y</label>'+'<br>'+
														'<input type="number" name="r_y_offset" class="form-control" value="' +r_y_offset + '">'+
													'</div>'+
												'</div>'+
											'</div>'+
											//'<button type="submit" class="btn btn-default">Submit</button>'+
										'</form>'+
									'</div>'+
									'</div>'+
									'<div class = "col-md-8">'+
									'<div id="wrapper">'+
										"<img src='/testpng.png' class='img-responsive' id='image2'/>"+
										"<div id='generated_image'><img src='/generateTextLayer?" + qstring + "' class='img-responsive' id='image1' /></div>" +
									'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</p>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'</body>'+
		'</html>';

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(body);
		res.end();	


	}else if(pathname === "/generateTextLayer"){
		//generateTextLayer?message=Heartfelt%20congratulations+to+you+and+your+babies.&font=Andika&width=400&height=50&font_size=40&origin_x=300&origin_y=200
	    var params = urlLib.parse(req.url,true);
	    process.stdout.write(".");

	    q = params.query;

	    //var params = {query: {text: "test generate text"}};

	    res.writeHead(200, {'Content-Type': 'image/png'});
	    res.end(obj.generate(params.query));
	}else{


		var filename = pathname.substring(pathname.lastIndexOf('/')+1);
		//console.log(filename);
		var fileext = pathname.substring(pathname.lastIndexOf('.')+1);
		//console.log(fileext);

		if(fileext === "css"){
			fs.readFile('css/' + filename, function (err, css) {
			    if (err) {
			        throw err; 
			    }       
			    
				res.writeHeader(200, {"Content-Type": "text/css"});
				res.write(css);
				res.end();  
			});
		}else if(fileext === "js"){
			fs.readFile('js/' + filename, function (err, js) {
			    if (err) {
			        throw err; 
			    }       
			    
				res.writeHeader(200, {"Content-Type": "text/javascript"});
				res.write(js);
				res.end();  
			});
		}else if(pathname ==="/testpng.png"){
			fs.readFile('testpng.png', function (err, png) {
			    if (err) {
			        throw err; 
			    }       
			    
				res.writeHeader(200, {"Content-Type": "image/png"});
				res.write(png);
				res.end();  
			});
		}else{
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not found");
			res.end();
		}
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