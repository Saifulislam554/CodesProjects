var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  // Open a file on the server and return its content:
  fs.readFile('mysecond.js', function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('File not found');
      return res.end();
    }
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(data);
    return res.end();
  });
}).listen(8089);
