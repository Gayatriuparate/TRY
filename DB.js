var http = require('http');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "try"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080
let insertStatement = (data, callback) => {
    var sql = `INSERT INTO demo values(null, '${data.username}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
        console.log("data added");
    });
};

module.exports = { insertStatement};