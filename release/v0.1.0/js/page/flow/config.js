/**
 * Created by gmyth on 16/9/9.
 */
/*inpt data temporarily to check the functionality */
define("page/flow/config", [], function(require, exports, module) {
    exports.data = {
        Course: [ {
            "class": "<<< >>>",
            course: "CSE 331",
            title: "Intro To Algorihms",
            section: "000",
            type: "LEC",
            days: "M W F",
            time: "1:00PM - 1:50PM",
            room: "KNOX 110",
            Location: "North Campus",
            Instructor: "Rudra Atri",
            Status: "OPEN"
        }, {
            "class": "11748",
            course: "CSE 331LR",
            title: "Intro To Algorihms",
            section: "000",
            type: "R1",
            days: "M",
            time: "9:00AM - 9:50AM",
            room: "Hoch 139",
            Location: "North Campus",
            Instructor: "Staff",
            Status: "OPEN"
        } ]
    };
});
