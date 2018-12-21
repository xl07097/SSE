var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');          //加载log4js模块
const session = require('express-session')
const uuid = require('uuid')

// 分发路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var all = require("./routes/all")
var upload = require("./routes/upload")


var app = express();

const sessionStore = new session.MemoryStore({
    reapInterval: 3600 * 1000
});
app.use(session({
    genid: function(req) {
        return uuid() // use UUIDs for session IDs
    },
    name:"sessionid",
    secret: 'xueliang',
    store: sessionStore,
    resave: true, // 强制更新 session
    saveUninitialized: false, //
    cookie: {
        secure:false,
        maxAge: 3600 * 1000
    }, // 过期时间
    rolling: true
}));

//通过configure()配置log4js
log4js.configure({
    appenders: {
        cheese:{
            type: "datefile", //文件输出
            filename: './logs/log',   //输出日志的文件夹/文件名，不会自动生成文件夹，请先自行创建logs文件夹
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd-hh.log",
            maxLogSize: 1024 * 12,                     //一个文件的大小，超出后会自动新生成一个文件
            backups: 3,                                //备份的文件数量
            category: 'normal'
        }
    },
    //{type: 'console'}, //控制台输出
    replaceConsole: true,
    categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
global.logger = log4js.getLogger('normal');

app.all("*",function(req, res, next) {
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Origin",req.headers.origin);
    res.header("Access-Control-Allow-Headers", "content-type,X-Requested-With,auth_token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Max-Age",3600);
    res.header("X-Powered-By",' 3.2.1');
    next();
});

app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/favicon.ico', function(req,res){
    res.send(null);
});
app.use('/api/users', usersRouter);
app.use("/api/cars",all)
app.use("/api/upload",upload)


//全局变量
global.PUBLIC_PATH = __dirname + '/public/';
module.exports = app;
