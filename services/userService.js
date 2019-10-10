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

let timer = setInterval(() => {
    let name = `jack${count}`;
    add({
        "gender": 1,
        "name": name,
        "age": 26,
        "telphone": "13689784512",
        "account": "",
        "role": "",
        "dept": "", //http://localhost:9101/public/images/2019/10/10/bcea2939-2fcc-4602-bda8-0835ed9c5b92.png
        "avatar": "http://localhost:9101/public/images/2019/8/6/6bf9def0-61d7-43aa-b7ef-c0b064016943.png",
    }, function(){
            
    })
    ++count
},100)

