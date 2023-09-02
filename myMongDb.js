// Import the MongoClient from the 'mongodb' package.
var MongoClient = require('mongodb').MongoClient;

// Define the URL for connecting to the MongoDB server.
// The URL includes the protocol (mongodb), host (localhost), and port (27017).
var url = "mongodb://localhost:27017/";

// Use the MongoClient to connect to the MongoDB server.
MongoClient.connect(url, function(err, db) {
  // If an error occurs during the connection, throw the error.
  if (err) throw err;

  // Once connected, get a reference to the "mydb" database.
  var dbo = db.db("mydb");

  // Create a new collection named "customers" within the "mydb" database.
  dbo.createCollection("customers", function(err, res) {
    // If an error occurs during collection creation, throw the error.
    if (err) throw err;

    // If collection creation is successful, log a message.
    console.log("Collection created!");

    // Close the database connection.
    db.close();
  });
});
