$(function(){
    let username = document.cookie.split("=")[1];
    $(".Person p").text(username);
    $(".line p").text(`欢迎 ${username} 登陆成功`);
    if (username === undefined) {
        function show() {

            window.location.href = "login.html";
        }
        setTimeout(show, 500);
    }

    if($("p").text==""){
        window.location.href="login.html"
    }

    $(".Person .tel").blur(function () {
      
        let $tel = $(".tel").val().trim();
        if ($tel === "") {
        
            $(".Person span").eq(0).text("电话不能为空")
        } else if (!isTel($tel)) {
            $(".Person span").eq(0).text("手机号码不合法")
        } else {
            $(".Person span").eq(0).text("");
        }
    })
    $(".Person .pwd").blur(function () {
        let $pwd = $(".pwd").val().trim();
        if ($pwd === "") {
            $(".Person span").eq(1).text("密码不能为空")
        } else if (!ispwd($pwd)) {
            $(".Person span").eq(1).text("用户名不合法")
        } else {
            $(".Person span").eq(1).text("");
        }
    })


    $("#btn").click(function () {
       
        let $pwd = $(".pwd").val().trim();
        let $tel = $(".tel").val().trim();
        let $input = $("input");
        console.log($input);
        $input.each(function (index, item) {
            if ($(item).val() == "") {
                console.log($(".Penson span").eq(index))
                $(".Person span").eq(index).text("不能为空");
              return;  
            }

        })
        if ( !ispwd($pwd) || !isTel($tel)) {
            return;
        }
     
        let url = 'http://localhost:3000/person';
        fetch(`${url}?tel=${$tel}&pwd=${$pwd}&name=${username}`).then(data => data.json()).then(res => {
            console.log(res);
            if (res.code === "800") {
                $(".Person span").eq(1).text(res.msg)
                $(".Person span").eq(1).css("marginLeft","120px");
                $(".Person span").eq(1).css("fontSize","16px");
                $(".Person span").eq(1).css("color","#44A0B3");
                function show() {

                    window.location.href = "register.html";
                }
                setTimeout(show, 1000);
            } else if (res.code === "801") {
                $(".Person span").eq(1).text(res.msg)
            } 

           
        })
    })

    function isTel(num) {
        let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (phone.test(num)) {
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


})