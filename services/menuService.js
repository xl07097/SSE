const menu = require("../dao/menu");

function select(params, cb) {
    menu.select(params, function (err, data) {
        if (err) {
            cb(err)
        } else {
            let json = data.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    path: item.path,
                    key: item.path,
                    pid: item.pid, icon: item.icon,
                    createtime: item.createtime,
                    status: item.status
                }
            });
            cb(null, json)
        }
    })
}

module.exports = { select };
