const users = require('./userModel');
let user = {
    insert: function (options, callback) {
        let adduser = new users({
            "name": options.name, //用户账号
            "password": "123456", //密码
            "age": options.age, //年龄
            "avatar": options.avatar
        });
        user.select({
            "name": options.name
        }, function (err, data) {
            if (err) {
                console.log("Error:" + err);
                callback(err);
            } else {
                if (data.length) {
                    callback(null, {
                        status: false,
                    })
                } else {
                    adduser.save(function (err, res) {
                        if (err) {
                            console.log("Error:" + err);
                            callback(err);
                        } else {
                            res.status = true;
                            callback(null, res);
                        }
                    });
                }
            }
        })

    },


    update: function () {

        let wherestr = {
            'name': 'Tracy McGrady'
        };
        let updatestr = {
            'password': 'zzzz'
        };
        /**
         * Model.update(conditions, update, [options], [callback])
         */
        users.update(wherestr, updatestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        })
    },

    //找到一条记录并更新
    //Model.findOneAndUpdate([conditions], [update], [options],[callback])

    updateById: function (id, data, callback) {
        /**
         * 通过id更新
         * Model.findByIdAndUpdate(id, [update], [options], [callback])
         */
        users.findByIdAndUpdate(id, data, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result)
            }
        })
    },
    updateStatusById: function (id, params,callback) {
        user.updateById(id, {status:params.status},function(err, result){
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        })
    },
    delete: function () {
        let wherestr = {
            'name': 'Tracy McGrady'
        };
        // Model.findByIdAndRemove(id, [options], [callback])
        // Model.findOneAndRemove(conditions, [options], [callback])

        /**
         *  删除
         *  Model.remove(conditions, [callback])
         */
        users.remove(wherestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        })
    },

    select: function (param, callback) {
        /**
         * Model.find(conditions, [fields], [options], [callback])
         * [fields] 查询输出的字段  1表示查询输出该字段，0表示不输出
         *
         */
        users.find(param, function (err, res) {
            if (err) {
                console.log("Error:" + err);
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    selectById: function (params) {
        /**
         * 根据_id查询
         * Model.findById(id, [fields], [options], [callback])
         */
        users.findById(params.id, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        })
    },

    selectByReg: function () {
        let whereStr = {
            'name': {
                $regex: /m/i
            }
        };
        /**
         * 模糊查询
         */
        users.find(whereStr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        })
    },

    /**
     * Model.count(conditions, [callback])
     * 数量查询
     */
    selectCount: function (params, callback) {
        let wherestr = {};
        if (params.name && params.name.trim()) {
            wherestr.name = {
                $regex: new RegExp(params.name)
            }
        }

        users.count(wherestr, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(null, result)
            }
        })
    },

    selectPage: function (params, callback) {
        let size = params.size; //一页多少条
        let page = params.page; //当前第几页
        let sort = {
            // 'logindate': -1
        }; //排序（按登录时间倒序）
        let condition = {}; //条件
        if (params.name && params.name.trim()) {
            condition.name = {
                $regex: /m/i
            }
        }

        let skipnum = (page - 1) * size; //跳过数

        /**
         * 分页查询
         */
        user.selectCount(params, function (err, count) {
            if (err) {
                callback(err)
            } else {
                users.find(condition).skip(skipnum).limit(size).sort(sort).exec(function (err, result) {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, {
                            total: count,
                            data: result
                        })
                    }
                })
            }

        })

    }

};

module.exports = user

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

user.updateStatusById("5c383d65cf400a3df4b3df4d",{
    status: 2
}, function (err, res) {
    console.log(res)
})