var mysql = require("mysql");
var config = require('auto-config');

var connection = mysql.createPool({
    connectionLimit : 10,
    host     : config.mysql.host,
    user     : config.mysql.user,
    database : config.mysql.database
});

module.exports = connection;