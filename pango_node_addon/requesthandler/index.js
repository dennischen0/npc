var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {}
handle['/'] = requestHandlers.index;
handle['/index'] = requestHandlers.index;

server.start(router.route, handle);