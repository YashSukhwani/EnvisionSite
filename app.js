var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    console.log('request made by: ' + req.url);
    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        var myReadStream = fs.createReadStream(__dirname + '/src/index.html', 'utf8');
        myReadStream.pipe(res);
    } else if (req.url === 'find-us') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(__dirname + '/src/find-us.html', 'utf8').pipe(res);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(__dirname + '/src/error-page.html', 'utf8').pipe(res);
    }
});

server.listen(3000, '127.0.0.1');
console.log('Now listening on port 3000');