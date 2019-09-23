
window.onload = function () {

    let p = document.getElementsByTagName("p")[0];
    let uname = document.cookie.split("=")[1];
    console.log(uname);
    p.innerHTML = `欢迎 ${uname} 登陆成功`;
    if (uname === undefined) {
        function show() {

            window.location.href = "login.html";
        }
        setTimeout(show, 500);
    }





    // let ID;
    let url1 = 'http://localhost:3000/book';
    fetch(`${url1}`).then(data => data.json()).then(res => {
        console.log(res.data)
        let ul = document.getElementsByTagName("ul")[0];
        for (let i = 0; i < res.data.length; i++) {
            let li = document.createElement("li");
            ul.appendChild(li);
            li.innerHTML = res.data[i].catalog;
        }



        let lis = ul.children;
        let uls1 = document.getElementsByClassName("bom1")[0];
        let lis1 = uls1.children;


        let url3 = 'http://localhost:3000/book/list';
        fetch(url3).then(data => data.json()).then(res => {
            console.log(res)
            res.data.forEach(item => {

                creatE(item);

            })


        });

        for (let i = 1; i < lis.length; i++) {
            lis[i].onclick = function () {
                for (let i = 0; i < lis1.length; i++) {
                    // console.log(lis1[i],lis1)
                    lis1[i].remove();
                    i--;
                }
                let ID = res.data[i - 1].id;
                // console.log(ID)



                let url2 = 'http://localhost:3000/book/list1';
                fetch(url2).then(data => data.json()).then(res => {
                    //    console.log(res.data[0]);
                    //    res[0].data.forEach(item=>{
                    //     creatE(item);
                    // })
                    // creatE(res[0].data)
                    res.data.forEach(item => {
                        if (item.id === ID) {
                            // for(key in item){
                            creatE(item)
                            // }
                        }

                    })

                });

            }
        }



    })
   
   
}




function creatE(obj) {
    let ul1 = document.getElementsByTagName("ul")[1];
    let pic = document.createElement("img");
    pic.src = obj.img;

    let title = document.createElement("h3");
    title.innerText = obj.title;

    let catalog = document.createElement("p");
    catalog.innerText = obj.catalog;

    let bytime = document.createElement("p");
    bytime.innerText = obj.bytime;

    let tags = document.createElement("p");
    tags.innerText = obj.tags;

    let sub1 = document.createElement("p");
    sub1.innerText = obj.sub1;

    let online = document.createElement("a");
    online.href = obj.online;
    online.innerText = "链接"
    let reading = document.createElement("p");
    reading.innerText = obj.reading;



    let li = document.createElement("li");

    li.append(pic, title, catalog, bytime, tags, sub1, online, reading);
    ul1.appendChild(li);
}



