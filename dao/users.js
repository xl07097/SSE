const Users = require('../Schema/userModel');
const ObjectId = require('mongodb').ObjectId;

let operation = {
	insert: function (params, callback) {
		// let user = new Users({
		//     "name": params.name, //用户账号
		//     "password": "123456", //密码
		//     "age": params.age, //年龄
		//     "avatar": params.avatar
		// });

		let user = new Users(params);
		operation.select({ name: params.name }, function (err, data) {
			if (err) {
				callback(err);
			} else {
				if (data.length) {
					callback(null, {
						status: false,
					});
				} else {
					user.save(function (err, res) {
						if (err) {
							callback(err);
						} else {
							res.status = true;
							callback(null, res);
						}
					});
				}
			}
		});
	},

	update: function (params, data, callback) {
		/**
		 * Model.update(conditions, update, [options], [callback])
		 */
		Users.update(params, data, function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	//找到一条记录并更新
	//Model.findOneAndUpdate([conditions], [update], [options],[callback])

	updateById: function (id, data, callback) {
		/**
		 * 通过id更新
		 * Model.findByIdAndUpdate(id, [update], [options], [callback])
		 */
		Users.findByIdAndUpdate(id, data, function (err, result) {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	updateStatusById: function (id, params, callback) {
		operation.updateById(id, { status: params.status }, function (err, result) {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	delete: function (params, callback) {
		// Model.findByIdAndRemove(id, [options], [callback])
		// Model.findOneAndRemove(conditions, [options], [callback])
		Users.findByIdAndRemove(params.id, function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});

		/**
		 *  删除
		 *  Model.remove(conditions, [callback])
		 */
		// Users.remove(wherestr, function (err, res) {
		//     if (err) {
		//         console.log("Error:" + err);
		//     } else {
		//         console.log("Res:" + res);
		//     }
		// })
	},

	select: function (param, callback) {
		/**
		 * Model.find(conditions, [fields], [options], [callback])
		 * [fields] 查询输出的字段  1表示查询输出该字段，0表示不输出
		 *
		 */
		Users.find(param, function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, res);
			}
		});
	},

	selectById: function (params, callback) {
		/**
		 * 根据_id查询
		 * Model.findById(id, [fields], [options], [callback])
		 */
		Users.findById(params.id, function (err, result) {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	selectByReg: function (params, callback) {
		let whereStr = {
			name: {
				$regex: new RegExp(params.name),
			},
		};
		/**
		 * 模糊查询
		 */
		Users.find(params, function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	/**
	 * Model.count(conditions, [callback])
	 * 数量查询
	 */
	selectCount: function (params, callback) {
		let wherestr = {};
		if (params.name && params.name.trim()) {
			wherestr.name = {
				$regex: new RegExp(params.name),
			};
		}

		Users.countDocuments(wherestr, function (err, result) {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	selectPage: function (params, callback) {
		let size = params.size; //一页多少条
		let page = params.page; //当前第几页
		let sort = {
			createtime: 1,
		};
		let condition = {}; //条件
		let name = params.name;
		if (name && name.trim()) {
			condition.name = {
				$regex: new RegExp(name),
			};
			// condition.telphone = {
			//     $regex: new RegExp(name)
			// }
		}

		let skipnum = (page - 1) * size; //跳过数

		/**
		 * 分页查询
		 */
		// { $or: [{ "by": "luyaran" }, { "title": "MongoDB 教程" }] }
		operation.selectCount(params, function (err, count) {
			if (err) {
				callback(err);
			} else {
				Users.find(condition)
					.skip(skipnum)
					.limit(size)
					.sort(sort)
					.exec(function (err, result) {
						if (err) {
							callback(err);
						} else {
							callback(null, {
								total: count,
								data: result,
							});
						}
					});
			}
		});
	},
};

module.exports = operation;

/**
 * LBS地址位置
 * lbs : { type: Array, index: '2d', sparse: true }   //地理位置
 * 上面有介绍过很多基于LBS的条件查询，Schema中定义时如上
 * LBS查询对于一些基于LBS应用会用得比较多。
 */

/**
 * Model.distinct(field, [conditions], [callback])　　//去重
 * Model.findOne(conditions, [fields], [options], [callback])　　 //查找一条记录
 * Model.findOneAndRemove(conditions, [options], [callback])　 //查找一条记录并删除
 * Model.findOneAndUpdate([conditions], [update], [options], [callback])　//查找一条记录并更新
 */
