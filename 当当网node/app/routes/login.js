var express = require('express');
var router = express.Router();

var openDatabase =require('../module/openDatabase');
router.get('/', function (req, res, next) {
    // res.cookie("uname",uname);
    let Data = req.query;
    console.log(Data);
    // res.send(Data);
    var uname = Data.uname;
    var pwd = Data.pwd;
    var sql = `select * from user where name='${uname}'and pwd='${pwd}'`;
    var sql1 = `select * from user where name='${uname}'`;
    var obj = {};
    var P = new Promise((resolve, reject) => {
        // console.log(P)
        openDatabase('persen',sql1, function (err, mydata) {

            if (!err) {
                console.log(mydata.length);
                if (mydata.length === 0) {
                    obj.code = '300';
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
        openDatabase('persen',sql, function (err, mydata) {
            if (!err) {
                if (mydata.length === 0) {
                    obj.code = "301";
                    obj.msg = "密码错误"
                    res.send(JSON.stringify(obj));
                } else {
                    obj.code = "302";
                    obj.msg = "登录成功"
                    res.send(JSON.stringify(obj));
                }


            } else {

                obj.code = "303";
                obj.msg = "服务器出错"
                res.send(JSON.stringify(obj));
            }


        })
    }

    )
});




module.exports = router;