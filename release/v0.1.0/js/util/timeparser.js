/**
 * Created by gmyth on 16/9/9.
 */
define("util/timeparser", [], function(require, exports, module) {
    var TimeConfig = {
        M: 1,
        T: 2,
        W: 3,
        R: 4,
        F: 5,
        S: 6
    };
    exports.TimeSpan = function(str) {
        var timepattern = /(\d{1,2}):(\d{2})(AM|PM)/;
        /*regular expression to find correct time format*/
        var StartTime = timepattern.exec(str);
        var temp = str.substring(str.indexOf("-"), str.length - 1);
        var EndTime = timepattern.exec(temp);
        var StartHour = StartTime.substring(0, StartTime.indexOf(":"));
        var Startminutes = StartTime.substring(StartTime.indexOf(":") + 1, StartTime.indexOf(":") + 3);
        var EndHour = EndTime.substring(0, EndTime.indexOf(":"));
        var Endminutes = EndTime.substring(EndTime.indexOf(":") + 1, EndTime.indexOf(":") + 3);
        return {
            start: {
                hour: isMorning() ? parseInt(StartHour) : parseInt(StartHour) + 12,
                minute: parseInt(Startminutes)
            },
            end: {
                hour: isMorning() ? parseInt(EndHour) : parseInt(EndHour) + 12,
                minute: parseInt(Endminutes)
            }
        };
    };
    exports.DaySpan = function(str) {
        var temp = str.split(" ");
        var result = [];
        for (var i = 0; i < temp.length; i++) {
            result.push(TimeConfig[temp[i]]);
        }
        return result;
    };
    var isMorning = function(time) {
        var timepattern = /(\d{1,2}):(\d{2})(AM)/;
        /*regular expression to find correct time format*/
        return timepattern.test(time);
    };
});
