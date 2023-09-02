var mong = require('mongodb);
var url = 'mongodb://localhost:8080';
mong.connect(url, function(err, db) {
    if (err) throw err;
    var database = db.db("students");
    var myobj = {
        student: "Saif Ul Islam"
    }
    database.createcollection("names").insertOne(myobject, function(err, res){
        if (err) throw err;
        console.log("created");
    });

    )};