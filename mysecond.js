// main.js
let http = require('http');
let add = require('./myfirst');

http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" }); // Fixed the typo and added correct object format
    res.write("Sum: " + add.calculator(5, 3,"-")); // Calling the addition function with arguments
    res.end();
}).listen(8080); // Listen on port 8080
