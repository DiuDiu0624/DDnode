var mysql = require('mysql');

function openDatabase(lable,sql, fn) {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: lable
    });
    conn.connect();
    conn.query(sql, function (err, data) {
        fn(err, data)
    })
    conn.end();
}

module.exports=openDatabase;