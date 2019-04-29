const fs = require('fs');
const path = require('path');
let multer = require('multer');
let uuid = require('uuid');

function mkdirs(dirpath) {
    if (!fs.existsSync(path.dirname(dirpath))) {
        mkdirs(path.dirname(dirpath));
    }
    fs.mkdirSync(dirpath);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let temp = 'public/images/' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
        let myPath = path.resolve(temp);
        fs.existsSync(myPath) == false && mkdirs(myPath);
        cb(null, temp)
    },
    filename(req, file, cb) {
        const filenameArr = file.originalname.split('.');
        cb(null, uuid() + '.' + filenameArr[filenameArr.length - 1]);
    }
});

//添加配置文件到muler对象。
/* POST提交文件. */
// muilter.single('editormd-image-file'), //适用于单文件上传
// muilter.array('editormd-image-file',num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个
// 详细信息：http://cnodejs.org/topic/564f32631986c7df7e92b0db
// editormd-image-file
let upload = multer({
    storage: storage,
    limis: {
        fields: 10
    }
}).array('file', 10);
module.exports = upload;