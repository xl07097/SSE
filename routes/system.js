let express = require('express');
let router = express.Router();
const { select } = require('../services/menuService');
const array2Tree = require("../utils/treeUtils");

router.route('/systemMenu')
    .post(function (req, res, next) {
        select({}, function (err, result) {
            if (err) {
                res.json({
                    code: 600,
                    data:null,
                    msg: err
                })
                return;
            } else {
                res.json({
                    code: 200,
                    data: array2Tree(result),
                    msg: err
                })
            }
        })
        // res.json({
        //     code: 200,
        //     data:['dictType','dictManage','carList','chart']
        // })
    })

module.exports = router;
