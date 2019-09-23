var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function (req, res, next) {
    // res.cookie("uname",uname);
    let Data = req.query;
    let uname=Data.uname;
    let newpwd=Data.newpwd;
    console.log(Data);
    let obj={};
    
    let sql=`update user set pwd='${newpwd}' where name='${uname}'`;
  
    
    let conn=mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'persen'
    });
    conn.connect();
    conn.query(sql,function(err,result){
        if(!err){
            obj.code='500';
            obj.msg="修改成功";
        }else{
            console.log('访问数据库出错：',err.message);
            obj.code="501";
            obj.msg="修改失败";
        }
        res.send(JSON.stringify(obj));
    })
    conn.end();
 })

module.exports = router;