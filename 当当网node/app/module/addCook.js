function addCook(data) {
    let dateTime = new Date();
    dateTime.setMinutes(dateTime.getMinutes() + 5);
    console.log(dateTime);
    // console.log(dateTime.toLocaleString());
    document.cookie = `username=${data.data};expires=${dateTime.toGMTString()}`;
    }
    module.exports=addCook;