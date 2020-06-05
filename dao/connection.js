const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://xueliang:XUELIANG123456@122.51.129.51:27017/cars',{useNewUrlParser: true}, function (err,result) {
    if(err){
        throw new Error(err);
    }
});

module.exports = mongoose;


