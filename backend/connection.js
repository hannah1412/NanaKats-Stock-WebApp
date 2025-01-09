const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "mariadb", 
    database: "NanaKats"
})

const mysqlPool = mysql.createPool({
    host: "localhost", 
    user: "root", 
    password: "mariadb", 
    database: "NanaKats"
})

module.exports = db;