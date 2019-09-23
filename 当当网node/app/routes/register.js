var express = require('express');
var mysql = require('mysql');
var router = express.Router();


router.post("/", function (req, res) {
   // console.log(req.body)
    let data = req.body;
    for (item in data) {
        var Data = JSON.parse(item);
    }
    var uname = Data.uname;
    var password = Data.upwd;
    var tel = Data.tel;
    var sql = `select * from user where name='${uname}' or tel='${tel}'`;
    var sql1 = `insert into user(name,pwd,tel) value('${uname}','${password}','${tel}')`;
    var obj = {};
    var P = new Promise((resolve, reject) => {
        // console.log(P)
        openDatabase(sql, function (err, mydata) {

            if (!err) {
                console.log(mydata.length);
                if (mydata.length !== 0) {
                    obj.code = '201';
                    obj.msg = '用户已存在'
                    res.send(JSON.stringify(obj));
                    // break;
                } else {
                    resolve();
                }
            }
        })
    })
    P.then(function () {
        openDatabase(sql1, function (err, mydata) {
            if (!err) {
                obj.code = "202";
                obj.msg = "注册成功"
                res.send(JSON.stringify(obj));
            } else {

                obj.code = "203";
                obj.msg = "服务器出错"
                res.send(JSON.stringify(obj));
            }


        })
    }

    )

})

function openDatabase(sql, fn) {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'persen'
    });
    conn.connect();
    conn.query(sql, function (err, data) {
        fn(err, data)
    })
    conn.end();
}



module.exports = router;
