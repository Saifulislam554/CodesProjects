var http = require('http');
var url = require('url');
var fs = require('fs');
var up = require('upper-case');


http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename ="." + q.pathname;

    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(up.upperCase(data));
            res.end(data);
        }
    });

}).listen(1924);
