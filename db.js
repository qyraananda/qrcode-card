var mysql = require('mysql2');
const mysql2Timeout = require('mysql2-timeout-additions');

// // // === db uat ===
var con = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "user",
    password: "uservisual",
    database: "db-visualcard"
});
const promisePool = con.promise();

mysql2Timeout.addTimeoutToPromisePool({
    pool: promisePool,
    seconds: 600000
});

con.getConnection(function(err, connection) {
    console.log('Connect :)')
});

con.on('connection', function(connection) {
    console.log('DB Connection established');

    connection.on('error', function(err) {
        console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function(err) {
        console.error(new Date(), 'MySQL close', err);
    });

});

module.exports = con;