var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root", // Use the root user
    password: "root" // Replace with the actual root user password
  });
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE mydb1", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});