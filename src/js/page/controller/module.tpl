<template name="MODULE.WELCOME">
    <h5 style="color: #FFFFFF; text-align: center">Happy &nbsp;<%=weekday%>&nbsp;,&nbsp;&nbsp;<span style="color: #FFFFFF;"><%=username%></span ></h5>
    <p style="color: #FFFFFF; text-align: center"> What are we going to do today?</p>
    <hr style="width: 50%; margin: auto;">
    <div class="row demo-row" style="margin-top: 10px;">
        <div class="col-xs-3" style="margin-left: 25%;">
            <a href="#fakelink" class="btn btn-block btn-lg btn-primary" data-action="profile_open">Edit profile</a>
        </div>
        <div class="col-xs-3">
            <a href="#fakelink" class="btn btn-block btn-lg btn-info" data-action="schedule_page">Build schedule</a>
        </div>
    </div>
</template>
<template name="MODULE.SUBBOX">
    <div class="search_box">
        <div class="Uheader" style="background-color: #34495e">
            <p class ="sub_Uheader">
                <span class="fui-search" style="color:#1abc9c;position: relative;top: 1px;"></span> &nbsp;Course Search &nbsp; </p> </div>
        <div class="search_sub_box" ></div></div>
    <div class="result_box" style="height: 82%;">
    <div class ="Uheader" style=" background-color: #34495e">
        <p class="sub_Uheader">
            <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;"></span> &nbsp;Course List &nbsp; </p> </div>
    <div class="sub_list" style="height: 93%;">
        </div>
    </div>
    </template>