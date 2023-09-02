var express = require('express');
var app = express();
var path = require('path');
var port = 2001;

app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname, 'index1.html'));
});

app.listen(port, function(){
    console.log("listening on port:", port);
});
