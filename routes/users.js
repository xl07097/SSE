let express = require('express');
let router = express.Router();
let user = require("../dao/users");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.route('/changeUserStatus')
    .get(function (req, res, next) {
        res.send(JSON.stringify({
            code: 200,
            data: {
                name: "jack",
                age: 20,
                sex: 1,
                job: 'engine'
            }
        }));
    })
    .post(function (req, res, next) {
        
        let {id, status} = req.body;

        if (!id) {
            res.send({
                code: 406,
                msg: 'id不能为空'
            });
            return false;
        } 
        if (!status) {
            res.send({
                code: 406,
                msg: '用户状态不能为空'
            });
            return false;
        } 
            
        user.updateStatusById(id, {
                status: status
            }, function (err, data) {
                if (err) {
                    res.json({
                        code: 406,
                        msg: "用户状态修改失败",
                        data: err
                    })
                } else {
                    res.send({
                        code: 200,
                        msg: "用户状态修改成功",
                    })
                }
            })
        
    })


router.route('/userInfo')
    .get(function (req, res, next) {
        res.send(JSON.stringify({
            code: 200,
            data: {
                name: "jack",
                age: 20,
                sex: 1,
                job: 'engine'
            }
        }));
    })
    .post(function (req, res, next) {
        if (!req.body.id) {
            res.send({
                code: 406,
                msg: 'id不能为空'
            });
        } else {
            user.selectById({
                id: req.body.id
            }, function (err, data) {
                if (err) {
                    res.json({
                        code: 406,
                        msg: "数据查询错误",
                        data: err
                    })
                } else {
                    res.send({
                        code: 200,
                        data: data
                    })
                }
            })
        }
    })


router.post('/addUser', function (req, res) {
    let body = req.body;
    if (!body.name || !body.name.trim()) {
        res.json({
            code: 201,
            msg: '用户名不能为空'
        })
        return false;
    }

    if (!body.age || !body.age.toString().trim()) {
        res.json({
            code: 201,
            msg: '年龄不能为空'
        })
        return false;
    }

    if (!body.avatar || !body.avatar.trim()) {
        res.json({
            code: 201,
            msg: '头像图片不能为空'
        })
        return false;
    }

    user.insert(body, function (err, data) {
        if (err) {
            res.json({
                code: 406,
                msg: "数据插入错误",
                data: err
            })
        } else {
            if (!data.status) {
                res.send({
                    code: 406,
                    msg: "用户已存在",
                })
            } else {
                res.send({
                    code: 200,
                    msg: "用户添加成功"
                })
            }
        }
    })
});

router.post('/updateUser', function (req, res) {
    let body = req.body;
    if (!body.name || !body.name.trim()) {
        res.json({
            code: 201,
            msg: '用户名不能为空'
        })
        return false;
    }

    if (!body.age || !body.age.toString().trim()) {
        res.json({
            code: 201,
            msg: '年龄不能为空'
        })
        return false;
    }

    if (!body.avatar || !body.avatar.trim()) {
        res.json({
            code: 201,
            msg: '头像图片不能为空'
        })
        return false;
    }

    user.updateById(body._id, body, function (err, data) {
        if (err) {
            res.json({
                code: 406,
                msg: "数据插入错误",
                data: err
            })
        } else {
            res.send({
                code: 200,
                msg: "用户添加成功"
            })
        }
    })
});


router.post('/userList', function (req, res) {
    let query = {
        page: req.body.page,
        size: req.body.size
    };
    if (req.body.name) {
        query.name = req.body.name
    }
    user.selectPage(query, function (err, result) {
        if (err) {
            res.json({
                code: 406,
                msg: '查询错误',
                data: result
            })
        } else {
            res.json({
                code: 200,
                total: result.total,
                data: result.data
            })
        }
    })
});

router.get('/login', function (req, res) {
    if (req.query.name && req.query.password) {
        let query = {
            name: req.query.name,
            password: req.query.password
        };
        user.select(query, function (err, data) {
            if (err) {
                res.json({
                    code: 401,
                    msg: '登陆错误'
                })
            } else {
                if (data.length) {
                    res.send({
                        code: 200,
                        msg: "登陆成功",
                        data: data
                    })
                } else {
                    res.send({
                        code: 202,
                        msg: "用户不存在"
                    })
                }
            }
        })
    } else {
        res.send({
            code: 201,
            msg: '请填写完整用户名和密码'
        })
    }
});


module.exports = router;
