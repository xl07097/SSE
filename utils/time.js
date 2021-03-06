function dateFormatFromString(str) {
    return datetimeformatFromString(str).substr(0,10);
}

function stringFromDate(date) {
    return datetimeformatFromString(date).substr(0,16)
}

function twoDateTime() {
    var t = new Date();
    var y = t.getFullYear();
    var m = t.getMonth() + 1;
    if (m < 10) {
        m = '0' + m;
    }
    var date1 = y + '/' + m + '/01';
    var date2 = null;
    switch (m) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
            date2 = y + '/' + m + '/31';
            break;
        case '04':
        case '06':
        case '09':
        case '11':
            date2 = y + '/' + m + '/30';
            break;
        case '02':
            if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
                date2 = y + '/' + m + '/29';
            } else {
                date2 = y + '/' + m + '/28';
            }
            break;
    }

    return [new Date(date1+' 00:00'), new Date(date2+' 23:59')];
}

function datetimeformatFromString(str) {
    var t;
    if(str){
        t = new Date(str);
    }else {
        t = new Date();
    }
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var day = t.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var hour = t.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    var minute = t.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    var second = t.getSeconds();
    if (second < 10) {
        second = '0' + second;
    }

    return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
}


function timetrans(d) {
    return datetimeformatFromString(str).replace(/\//g,'-')
}


function getDay(time1, time2) {
    let t1 = new Date(time1).getTime();
    let t2 = new Date(time2).getTime();
    return Math.ceil((t1-t2)/24/60/60/1000);
}


module.exports = {dateFormatFromString,stringFromDate,twoDateTime,datetimeformatFromString,timetrans,getDay}
