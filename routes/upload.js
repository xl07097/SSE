var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable')

/* GET home page. */
router.route('/imageUpload')
.post(function(req, res, next){
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
       if(err){
            throw new Error(err);
       }
        //fields接收文字,files接收文件(视频，图片，压缩包等)

        form.uploadDir = PUBLIC_PATH + 'images/';//上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2*1024; //文件大小
        var fileName = saveImage(files['file'], form.uploadDir);
    });
    logger.info(req);
    res.send({
        code: 200,
        msg: '实验'
    });
});


/**
 * 保存图片
 * @param file 图片对象
 * @param uploadDir 图片保存目录
 */
function saveImage(file,uploadDir) {
    let extName = 'png';
    switch (file.type) {  //此处in_file  为页面端 <input type=file name=in_file>
        case 'image/jpeg':
            extName = 'jpeg';
            break;
        case 'image/jpg':
            extName = 'jpg';
            break;
        case 'image/png':
            extName = 'png';
            break;
        case 'image/x-png':
            extName = 'png';
    }

    const cr = fs.createReadStream(file)
    const cw = fs.createWriteStream(uploadDir + Math.random()+"."+extName)

    try{
        cr.pipe(cw);
        cw.on('close',function(){
            console.log('copy over');  
        });
    }catch(error){
        console.log(error);
    }
    return true;
}

module.exports = router;