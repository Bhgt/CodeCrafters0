var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	
	var file = '/index.html'
	var contentType = 'text/html'
	
	if(req.url==='/' || req.url==='/home'){
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.createReadStream(__dirname+'/index.html', 'utf-8').pipe(res);
	}else{
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('Error 404: Not Found');
	}
	
});

server.listen(3000, '127.0.0.1');
console.log('Server listening to port 3000');
