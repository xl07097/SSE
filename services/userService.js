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
        "avatar": "http://localhost:3002/images/2019/8/3/88cffcf8-daec-42d1-99dd-bd4ce2b68f6e.jpg",
    }, function(){
            
    })
    count++
},10)

