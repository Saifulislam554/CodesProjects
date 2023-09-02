var fs = require('fs');
var http = require('http');

http.createServer(function(req, res) {
    fs.appendFile('index6.html', 'clock.html', function(err) {
        if (err) throw err;
        console.log("saved successfully");
    });

    fs.readFile('index6.html', function(err, data) {
        if (err) throw err;
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(data);
        res.end("successfully displayed");
    });
    fs.open('index6.html', 'r', function(err, file){
        if (err) throw err;
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(data);


    });
}).listen(8091);
