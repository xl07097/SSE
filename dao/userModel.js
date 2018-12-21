let mongoose = require('./connection');

let Schema = mongoose.Schema; //  创建模型

/**
 *  type：   类型
 *  index：  建索引
 *  default：默认值
 */
let userSchema = new Schema({
    name: {
        type: String,
        index: true
    },
    password: String,
    age: Number,
    avatar: String
});

module.exports = mongoose.model('users', userSchema);