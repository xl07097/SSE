const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/qifan',{useNewUrlParser: true},function (err,result) {
    if(err){
        console.log('连接失败');
        return false
    }

    console.log('连接成功');
});

module.exports = mongoose;


