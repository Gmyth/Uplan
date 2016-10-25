/**
 * Created by gmyth on 16/9/9.
 */
define(function(require, exports, module) {
    var TimeConfig={
        'M':1,
        'T':2,
        'W':3,
        'R':4,
        'F':5,
        'S':6
    }
    exports.TimeSpan = function(input){
        var str = input.replace(/\s/g, '');
        var timepattern = /(\d{1,2}):(\d{2})(AM|PM)/;/*regular expression to find correct time format*/
        var StartTime = timepattern.exec(str);
        var temp = str.substring(str.indexOf('-')+1,str.length);
        var EndTime = timepattern.exec(temp);
        var StartHour = StartTime[1]=="12"?"0":StartTime[1];
        var Startminutes = StartTime[2];
        var EndHour = EndTime[1]=="12"?"0":EndTime[1];
        var Endminutes = EndTime[2];
        var data = {
            start:{
                hour:isMorning(StartTime[0])?parseInt(StartHour):parseInt(StartHour)+12,
                minute:parseInt(Startminutes)
            },
            end:{
                hour:isMorning(EndTime[0])?parseInt(EndHour):parseInt(EndHour)+12,
                minute:parseInt(Endminutes)
            }
        }
        return {
            start:{
                hour:isMorning(StartTime[0])?parseInt(StartHour):parseInt(StartHour)+12,
                minute:parseInt(Startminutes)
            },
            span: SpanCount(data)
        }
    }
    exports.DaySpan = function(str){
        var temp = str.split(" ");
        var result=[];
        for(var i=0; i<temp.length;i++){
            result.push(TimeConfig[temp[i]]);
        }
        return result;
    }
    var SpanCount = function(timebag){
        var hourspan = timebag.end.hour - timebag.start.hour;
        var minspan = timebag.end.minute - timebag.start.minute;
        if (hourspan == 0 && minspan == 50){
            return 2;
        }
        else if(minspan < 0){
            return hourspan * 2 - 1;
        }else{
            if(minspan == 30){return hourspan * 2 + 1;}
            if(minspan == 0){return hourspan * 2;}
        }
    }
    var isMorning  = function(time){
        var timepattern = /(\d{1,2}):(\d{2})(AM)/;/*regular expression to find correct time format*/
        return timepattern.test(time);
    }
})