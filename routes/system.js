let express = require('express');
let router = express.Router();

router.route('/systemMenu')
    .post(function(req,res,next){
        res.json({
            code: 200,
            data:['dictType','dictManage','carList','chart']
        })
    })

module.exports = router;
