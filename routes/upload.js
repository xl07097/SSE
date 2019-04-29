let express = require('express');
let router = express.Router();
let upload = require('../utils/uploadUtils');

let errorCode = {
    "LIMIT_PART_COUNT": 'too many parts',
    "LIMIT_FILE_SIZE": 'file too large',
    "LIMIT_FILE_COUNT": 'too many filed',
    "LIMIT_FIELD_KEY": "field name too long",
    "LIMIT_FIELD_VALUE": 'field value to long',
    "LIMIT_FIELD_COUNT": 'too many fields',
    "LIMIT_UNEXPECTED_FILE": 'unexpected filed'
}
router.post('/uploadfile', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            res.send({
                code: 301,
                msg: err,
            });
        } else {
            let json = req.files.map(item => {
                return {
                    destination: FILE_URL + item.destination,
                    encoding: item.encoding,
                    fieldname: item.fieldname,
                    filename: item.filename,
                    mimetype: item.mimetype,
                    originalname: item.originalname,
                    path: FILE_URL + item.path,
                    size: item.size,
                }
            });
            res.send({
                "code": 200,
                "data": json
            });
        }
    })

});

module.exports = router;