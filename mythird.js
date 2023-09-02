let url = require('url');
let http= require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url,true).query;
    var txt=q.year + q.month;
    res.end(txt);
}).listen(8082); // Change to a different port, e.g., 
