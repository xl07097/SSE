var log4js = require('log4js'); //加载log4js模块


//通过configure()配置log4js
log4js.configure({
    appenders: {
        cheese: {
            type: "dateFile", //文件输出
            filename: './logs/log', //输出日志的文件夹/文件名，不会自动生成文件夹，请先自行创建logs文件夹
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd.log",
            maxLogSize: 1024 * 12, //一个文件的大小，超出后会自动新生成一个文件
            backups: 3, //备份的文件数量
            category: 'normal'
        }
    },
    //{type: 'console'}, //控制台输出
    replaceConsole: true,
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'debug'
        }
    }
});
global.logger = log4js.getLogger('normal');


 module.exports = function logs(req, res, next) {
    return log4js.connectLogger(logger, {
        level: log4js.levels.INFO
    })
 }