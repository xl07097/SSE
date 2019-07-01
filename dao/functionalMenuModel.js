let mongoose = require('./connection');

let Schema = mongoose.Schema; //  创建模型

/**
 *  type：   类型
 *  index：  建索引
 *  default：默认值
 */
let functionalSchema = new Schema({
    title: {
        type: String,
        index: true
    },
    pid:{
        type: String,
        default: ''
    }, 
    checked: {
        type: Boolean,
        default: false
    },
    description:{
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    createtime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Functional', functionalSchema);