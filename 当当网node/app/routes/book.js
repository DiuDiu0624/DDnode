var express = require('express');
var router = express.Router();
var openDatabase = require('../module/openDatabase');

router.get('/', function (req, res, next) {
    let Data = req.query;
    console.log(Data);
    let sql = `select*from book_type`;
    let obj = {};
    openDatabase('persen', sql, (err, data) => {
        if (!err) {
            obj.code = '600';
            obj.msg = 'ok';
            obj.data = data;
        } else {
            obj.code = '601';
            obj.msg = '服务器错误';
        }
        res.send(JSON.stringify(obj));
    })
})

router.get('/list',(req,res) => {
    let sql = `select * from book_list`;

    let obj = {};
    openDatabase('persen',sql,(err,data)=>{
        if(!err){
            // console.log(data);
            obj.code = '605';
            obj.msg = 'ok';
            obj.data = data;
        }else{
            obj.code = '606';
            obj.msg = '服务器错误';
        }
        res.send(JSON.stringify(obj));
    })
})


router.get('/list1',(req,res) => {
    // let cid = req.query.cid;
    // let type = req.query.type;
    let sql = `select * from book_list`;

    let obj = {};
    openDatabase('persen',sql,(err,data)=>{
        if(!err){
            obj.code = '701';
            obj.msg = 'ok';
            obj.data=data;
           
        }else{
            obj.code = '702';
            obj.msg = '服务器错误';
        }
        res.send(JSON.stringify(obj));
    })
})
module.exports = router;