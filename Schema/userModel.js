let mongoose = require('../dao/connection');

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
    avatar: String,
    gender: {
        type: Number,
        default: 1 // 1 男  2 女
    },
    status: {
        type: Number,
        default: 1
    },
    createtime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', userSchema);