var mysql = require('mysql');
var con =  mysql.createConnection({
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'db1';
    
});
con.connect(function (err, conn) {
    if (err) throw err;
    console.log('connected');
    var sql = 'CREATE TABLE student (name saifulislam(123), address saifulislam(123));
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log('created'));
        
};
    