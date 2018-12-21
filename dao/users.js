const users = require('./userModel');

let user = {
    insert: function () {
        let insertUser = new users({
            'name': 'tom', //用户账号
            'password': '123456', //密码
            'age': 37 //年龄
        });

        insertUser.save(function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        });
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

    updateById: function (id, data) {
        let ids = '56f2558b2dd74855a345edb2';
        let updatestr = {
            'password': 'abcd'
        };
        /**
         * 通过id更新
         * Model.findByIdAndUpdate(id, [update], [options], [callback])
         */
        users.findByIdAndUpdate(ids, updatestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
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

    select: function (param,callback) {
        let wherestr = {
            'name': param.name,
            'password': param.password
        };
        /**
         * Model.find(conditions, [fields], [options], [callback])
         * [fields] 查询输出的字段  1表示查询输出该字段，0表示不输出
         *
         */
        users.find(wherestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                callback(res);
            }
        })
    },

    selectById: function () {
        let id = '56f261fb448779caa359cb73';
        /**
         * 根据_id查询
         * Model.findById(id, [fields], [options], [callback])
         */
        users.findById(id, function (err, res) {
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
    selectCount: function () {
        let wherestr = {};

        users.count(wherestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        })
    },

    selectPage: function () {
        let pageSize = 5; //一页多少条
        let currentPage = 1; //当前第几页
        let sort = {
            'logindate': -1
        }; //排序（按登录时间倒序）
        let condition = {}; //条件
        let skipnum = (currentPage - 1) * pageSize; //跳过数

        /**
         * 分页查询
         */
        users.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
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