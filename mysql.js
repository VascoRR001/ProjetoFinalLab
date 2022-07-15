const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

const pool=mysql.createPool({
    "connectionLimit":"15",
    "user":"b170f640dd6767",
    "password":"8a1e8a93",
    "database":"heroku_ec5f1bc10ab0999",
    "host":"eu-cdbr-west-03.cleardb.net",
    "port":"3306"
});
/*
"connectionLimit":"15",
    "user":"root",
    "password":"root",
    "database":"SGAR",
    "host":"localhost",
    "port":"3306"
*/




exports.pool=pool;
