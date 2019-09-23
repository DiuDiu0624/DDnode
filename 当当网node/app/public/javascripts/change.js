 
$(function () {
   
    
    $(".Register .uname").blur(function () {
        let $uname = $(".uname").val().trim();
        if ($uname === "") {
            $(".Register span").first().text("用户名不能为空")
        } else if (!isname($uname)) {
            $(".Register span").first().text("用户名不合法")
        } else {
            $(".Register span").first().text("");
        }
    })

    $(".Register .tel").blur(function () {
        let $tel = $(".tel").val().trim();
        if ($tel === "") {
            $(".Register span").eq(1).text("电话不能为空")
        } else if (!isTel($tel)) {
            $(".Register span").eq(1).text("手机号码不合法")
        } else {
            $(".Register span").eq(1).text("");
        }
    })
    $(".Register .pwd").blur(function () {
        let $pwd = $(".pwd").val().trim();
        if ($pwd === "") {
            $(".Register span").eq(2).text("密码不能为空")
        } else if (!ispwd($pwd)) {
            $(".Register span").eq(2).text("用户名不合法")
        } else {
            $(".Register span").eq(2).text("");
        }
    })
    $(".Register .repwd").blur(function () {
        let $pwd = $(".pwd").val().trim();
        let $repwd = $(".repwd").val().trim();
        if ($repwd === "") {
            $(".Register span").eq(3).text("密码不能为空")
        } else if ($repwd !== $pwd) {
            $(".Register span").eq(3).text("两次密码不一致")
        }
    })

    $(".Login .uname").blur(function () {
        let $uname = $(".uname").val().trim();
        if ($uname === "") {
            $(".Login span").first().text("用户名不能为空")
        } else if (!isname($uname)) {
            $(".Login span").first().text("用户名不合法")
        } else {
            $(".Login span").first().text("");
        }
    })

    $(".Login .pwd").blur(function () {
        let $pwd = $(".pwd").val().trim();
        if ($pwd === "") {
            $(".Login span").eq(1).text("密码不能为空")
        } else if (!ispwd($pwd)) {
            $(".Login span").eq(1).text("用户名不合法")
        } else {
            $(".Login span").eq(1).text("");
        }
    })


    $(".Forget .uname").blur(function () {
        let $uname = $(".uname").val().trim();
        if ($uname === "") {
            $(".Forget span").first().text("用户名不能为空")
        } else if (!isname($uname)) {
            $(".Forget span").first().text("用户名不合法")
        } else {
            $(".Forget span").first().text("");
        }
    })

    $(".Forget .tel").blur(function () {
        let $tel = $(".tel").val().trim();
        if ($tel === "") {
            $(".Forget span").eq(1).text("电话不能为空")
        } else if (!isTel($tel)) {
            $(".Forget span").eq(1).text("手机号码不合法")
        } else {
            $(".Forget span").eq(1).text("");
        }
    })




  
   

  





    $("#register").click(function () {
        let $uname = $(".uname").val().trim();
        let $pwd = $(".pwd").val().trim();
        let $repwd = $(".repwd").val().trim();
        let $tel = $(".tel").val().trim();
        let $input = $("input");
        $input.each(function (index, item) {
            if ($(item).val() == "") {
                $(".Register span").eq(index).text("不能为空");
                return;
            }

        })
        if ($repwd !== $pwd || !ispwd($pwd) || !isname($uname) || !isTel($tel)) {
            return;
        }
        let obj = {
            uname: $uname,
            upwd: $pwd,
            tel: $tel,

        }
        let url = 'http://localhost:3000/register';

        fetch(url, {
            method: "post",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }).then(data => data.json()).then(res => {
            console.log(res);
            if (res.code === "202") {
                $(".Register span").eq(3).text(res.msg)
                $(".Register span").eq(3).css("marginLeft","120px");
                $(".Register span").eq(3).css("fontSize","16px");
                $(".Register span").eq(3).css("color","#44A0B3");
                function show() {

                    window.location.href = "login.html";
                }
                setTimeout(show, 1000);
            } else if (res.code === "201") {
                $(".Register span").eq(3).text(res.msg)
            } else if (res.code === "203") {
                $(".Register span").eq(3).text(res.msg)
            }

            // console.log($input);
        })
    })










    $("#login").click(function () {
        let $input = $("input");
        let $uname = $(".uname").val().trim();
        let $pwd = $(".pwd").val().trim();
        $input.each(function (index, item) {
            if ($(item).val() == "") {
                $(".Login span").eq(index).text("不能为空");
                return;
            }
        })
        if (!ispwd($pwd) || !isname($uname)) {
            return;
        }

        let url = 'http://localhost:3000/login';
        fetch(`${url}?uname=${$uname}&pwd=${$pwd}`).then(data => data.json()).then(res => {
            if (res.code === "302") {
                console.log(res)
                $(".Login span").eq(1).text(res.msg);
                $(".Login span").eq(1).css("marginLeft","120px");
                $(".Login span").eq(1).css("fontSize","16px");
                $(".Login span").eq(1).css("color","#44A0B3");
                addCook($uname);
                function show() {

                     window.location.href = "sort.html";
                }
                setTimeout(show, 1000);
            } else if (res.code === "301") {
                $(".Login span").eq(1).text(res.msg)
            } else if (res.code === "303") {
                $(".Login span").eq(1).text(res.msg)
            } else if (res.code === "302") {
                $(".Login span").eq(1).text(res.msg)
            }


        })
    })













    $("#Check").click(function () {
        let $uname = $(".uname").val().trim();
        let $tel = $(".tel").val().trim();
        let $input = $("input");
        $input.each(function (index, item) {
            if ($(item).val() == "") {
                $(".Forget span").eq(index).text("不能为空");
                return;
            }
        })
        if (!isTel($tel) || !isname($uname)) {
            return;
        }
        let url = 'http://localhost:3000/check';
        fetch(`${url}?uname=${$uname}&tel=${$tel}`).then(data => data.json()).then(res => {
            console.log(res);
            if (res.code === "102") {
                $(".Forget span").eq(1).text(res.msg);
                $(".Forget span").eq(1).css("marginLeft","60px");
                $(".Forget span").eq(1).css("fontSize","16px");
                $(".Forget span").eq(1).css("color","#44A0B3");
                $(".newpwd").removeAttr("disabled");
                $("#forget").removeAttr("disabled");
            } else if (res.code === "101") {
                $(".Forget span").eq(1).text(res.msg)
            } else if (res.code === "103") {
                $(".Forget span").eq(1).text(res.msg)
            } else if (res.code === "100") {
                $(".Forget span").eq(1).text(res.msg)
            }

        });
    });



    $(".Forget .newpwd").blur(function () {
        let $newpwd = $(".newpwd").val().trim();
        if (!ispwd($newpwd) || $newpwd === "") {
            console.log("******")
            $(".Forget p").text("密码有误");
            return;
        } else {
            $(".Forget p").text("");
        }
    })




    $("#forget").click(function () {
        let url = 'http://localhost:3000/newpwd';
        let $newpwd = $(".newpwd").val().trim();
        let $uname = $(".uname").val().trim();
        fetch(`${url}?uname=${$uname}&newpwd=${$newpwd}`).then(data => data.json()).then(res => {
            if (res.code === "500") {
                $(".Forget p").text(res.msg);
                $(".Forget p").css("marginLeft","60px");
                $(".Forget p").css("fontSize","16px");
                $(".Forget p").css("color","#44A0B3");
                function show() {

                     window.location.href = "login.html";
                }
                setTimeout(show, 1000);

            } else if (res.code === "501") {
                $(".Forget p").text(res.msg)
            } 


        });
    })








    function isTel(num) {
        let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (phone.test(num)) {
            return true;
        } else {
            return false;
        }
    }

    function isname(text) {
        // let uname=/^[a-zA-Z]{6}$/;
        let uname = /^[\u4e00-\u9fa5]+$/;
        if (uname.test(text)) {
            return true;
        } else {
            return false;
        }
    }

    function ispwd(pwd) {
        // let uname=/^[a-zA-Z]{6}$/;
        let upwd = /^[0-9 a-z]{6}$/;
        if (upwd.test(pwd)) {
            return true;
        } else {
            return false;
        }
    }

    function addCook(data) {
        let dateTime = new Date();
        dateTime.setMinutes(dateTime.getMinutes() + 5);
        console.log(dateTime);
        // console.log(dateTime.toLocaleString());
        document.cookie = `username=${data};expires=${dateTime.toGMTString()}`;
        }

})


