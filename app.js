var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logs = require('./config/logs');

// 分发路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cars = require("./routes/cars");
var upload = require("./routes/upload");


var app = express();


app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "content-type,X-Requested-With,auth_token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

app.use(logs());

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/favicon.ico', function (req, res) {
    res.send(null);
});
app.use('/api/users', usersRouter);
app.use("/api/cars", cars)
app.use("/api/upload", upload)


//全局变量
global.PUBLIC_PATH = __dirname + '/public/';
module.exports = app;