let express = require('express');
let router = express.Router();
let user = require("../dao/users");
let uuid = require('uuid');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.route('/info')
    .get(function (req, res, next) {
        res.header("content-Type", 'text/event-stream');
        res.send(JSON.stringify({
            code: 200,
            data: {
                name: "jack",
                age: 20,
                sex: 1,
                job: 'engine'
            }
        }));
    }).post(function (req, res, next) {
        res.header("content-Type", 'text/event-stream');
        res.send({
            code: 200,
            data: {
                name: "jack",
                age: 20,
                sex: 1,
                job: 'engine'
            }
        });
    })

router.post('/usercenter', function (req, res) {
    let query = {
        name: req.body.name,
        password: req.body.password
    };
});

router.get('/login', function (req, res) {
    if (req.query.name && req.query.password) {
        if (req.cookies.sessionid && req.cookies.sessionid === req.session.sessionid) {
            res.send({
                code: 600,
                msg: "此用户已登录"
            })
            return;
        } else {
            let query = {
                name: req.query.name,
                password: req.query.password
            };
            user.select(query, function (data) {
                if (data.length) {
                    let uuids = uuid();
                    req.session.sessionid = uuids;
                    req.session.user = data[0];
                    res.send({
                        code: 200,
                        msg: "登陆成功"
                    })
                } else {
                    req.session.destroy();
                    res.send({
                        code: 202,
                        msg: "用户不存在"
                    })
                }
            })
        }
    } else {
        req.session.destroy();
        res.send({
            code: 201,
            msg: '请填写完整用户名和密码'
        })
    }
});

module.exports = router;