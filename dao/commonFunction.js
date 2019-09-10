function update(db, params, data, cb) {
/**
* Model.update(conditions, update, [options], [callback])
*/
    db.update(params, data, function (err, res) {
        if (err) {
            cb(err);
        } else {
            cb(null, result)
        }
    })
}

//找到一条记录并更新
//Model.findOneAndUpdate([conditions], [update], [options],[callback])

function updateById(db, id, data, cb) {
    /**
     * 通过id更新
     * Model.findByIdAndUpdate(id, [update], [options], [callback])
     */
    db.findByIdAndUpdate(id, data, function (err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result)
        }
    })
}

function del(db, id, cb) {
    // Model.findByIdAndRemove(id, [options], [callback])
    // Model.findOneAndRemove(conditions, [options], [callback])
    db.findByIdAndRemove(id, function (err, res) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    })

    /**
     *  删除
     *  Model.remove(conditions, [callback])
     */
    // Users.remove(wherestr, function (err, res) {
    //     if (err) {
    //         console.log("Error:" + err);
    //     } else {
    //         console.log("Res:" + res);
    //     }
    // })
}

module.exports = { update, updateById, del }
