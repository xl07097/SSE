let user = require("../dao/users");
let count = 0;
function add(params, cb){
    user.insert(params, function (err, data) {
        if (err) {
            cb(err)
        } else {
            cb(null, data)
        }
    })
}

setInterval(() => {
    let name = `jack${count}`;
    add({
        "gender": 1,
        "name": name,
        "age": 26,
        "avatar": "http://192.168.1.49:9101/public/images/2019/8/6/8e27b47a-6e19-4803-9d9a-51eb7ed54d16.png",
    }, function(){
            
    })
    count++
},10)

