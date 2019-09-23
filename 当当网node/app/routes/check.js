var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function (req, res, next) {
    // res.cookie("uname",uname);
    let Data = req.query;
    console.log(Data);
    // res.send(Data);
    var uname = Data.uname;
    var tel = Data.tel;
    var sql = `select * from user where name='${uname}'and tel='${tel}'`;
    var sql1 = `select * from user where name='${uname}'`;
    var obj = {};
    var P = new Promise((resolve, reject) => {
        // console.log(P)
        openDatabase(sql1, function (err, mydata) {

            if (!err) {
                console.log(mydata.length);
                if (mydata.length === 0) {
                    obj.code = '100';
                    obj.msg = '没有此用户'
                    res.send(JSON.stringify(obj));
                    // break;
                } else {
                    resolve();
                }
            }
        })
    })
    P.then(function () {
        openDatabase(sql, function (err, mydata) {
            if (!err) {
                if (mydata.length === 0) {
                    obj.code = "101";
                    obj.msg = "手机号填写错误"
                    res.send(JSON.stringify(obj));
                } else {
                    obj.code = "102";
                    obj.msg = "验证成功"
                    res.send(JSON.stringify(obj));
                }


            } else {

                obj.code = "103";
                obj.msg = "服务器出错"
                res.send(JSON.stringify(obj));
            }


        })
    }

    )
});


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