/*const Sequelize = require("sequelize");

const dbConn = new Sequelize('opmDb', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = dbConn;

*/
const mysql = require('mysql');
// create here mysql connection
const dbConn = mysql.createPool({
  
    host: 'localhost',
    user: 'root',
    port:"3306",
    password: '',
    database: 'opmdb',
    insecureAuth: true
});


module.exports = dbConn;