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

let insertStatement = (data, callback) => {
    var sql = `INSERT INTO demo values(null, '${data.username}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
        console.log("data added");
    });
};
let selectStatement = (email, cb) => {
    var sql = `select name from demo`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        cb(result);
        console.log("data catched")
    });
};

module.exports = { insertStatement,selectStatement};