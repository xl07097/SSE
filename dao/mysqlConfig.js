let mysql = require('mysql');

let config = {
    host: 'localhost',
    port: 3306,
    database: 'qfdb',
    user: 'root',
    passport: ''
};

let pool = mysql.createPool(config);

let query = function (sql,params,callback) {
    pool.getConnection(function (err, connection) {
        if(err){
            throw new Error(err)
        }
        connection.query(sql,params,function (err,result) {
            if(err){
                throw new Error(err)
            }
            callback(result);
            connection.release();
        });
    })
};

query('select * from t_user',[],function(result){
    console.log(result);
});