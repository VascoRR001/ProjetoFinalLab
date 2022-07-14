const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

const pool=mysql.createPool({
    "connectionLimit":"15",
    "user":"root",
    "password":"vasco",
    "database":"SGAR",
    "host":"localhost",
    "port":"3306"
});





exports.pool=pool;
