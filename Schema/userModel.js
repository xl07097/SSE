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
		index: true,
	},
	password: {
		type: String,
		default: '123456',
	},
	age: Number,
	avatar: String,
	gender: {
		type: Number,
		default: 1, // 1 男  2 女
	},
	telphone: {
		type: String,
		default: '18688888888',
		index: true,
	},
	account: {
		type: String,
	},
	role: {
		type: String,
		default: 'admin',
	},
	dept: {
		type: String,
	},
	status: {
		type: Number,
		default: 1,
	},
	createtime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', userSchema);
