var mysql = require('../../../interfaces/mysql/index.js');

module.exports = function(id, cb){
    mysql.query("INSERT INTO users (id) VALUES (" + id + ")", function(err, result){
        if (err) {
            cb(err);
        } else {
            cb(null, id);
        }
    })
};