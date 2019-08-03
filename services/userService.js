let user = require("../dao/users");
let count = 82155;
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
        "avatar": "http://192.1.6.55:9101/public/images/2019/7/26/1e7b6074-c9df-474e-b0f1-213b5ae7b4b5.png",
    }, function(){
            
    })
    count++
},10)

