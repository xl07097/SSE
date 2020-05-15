let mongoose = require('../dao/connection');

let Schema = mongoose.Schema; //  创建模型

/**
 *  type：   类型
 *  index：  建索引
 *  default：默认值
 */
let menuSchema = new Schema({
    title: {
        type: String,
        index: true
    },
    path: {
        type: String,
    },
    name: {
        type: String  
    },
    component: {
        type: String  
    },
    icon: {
        type: String
    },
    pid: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    createtime: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('menu', menuSchema);