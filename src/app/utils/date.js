/**
 * Created by ligj on 2015/9/17.
 */
(function() {
    'use strict';

    angular
        .module('kaoqin')
        .factory('DateUtil', DateUtil);

    function DateUtil(){
        return {
            format : function(time, fmt) {
                if (typeof time === 'string') {
                    time = time.replace(/-/g,'/');
                    if(/^(\d{4})\/(\d{2})\/(\d{2})$/.test(time)) time += ' 00:00:00';
                }
                fmt = fmt || 'yyyy-MM-dd hh:mm:ss';

                var _date = time instanceof Date ? time : new Date(time);
                var o = {
                    "M+": _date.getMonth() + 1, //月份
                    "d+": _date.getDate(), //日
                    "h+": _date.getHours(), //小时
                    "m+": _date.getMinutes(), //分
                    "s+": _date.getSeconds(), //秒
                    "q+": Math.floor((_date.getMonth() + 3) / 3), //季度
                    "S": _date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        }
    }

})();