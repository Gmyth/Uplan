<template name="SUBLIST.MAIN">
    <div class="sublist_main"  style="overflow-y:scroll;height: 98%;margin-top: 1%;">
    <div class=" list-block">

    </div>
    </div>
</template>
<template name="SUBLIST.COURSE">
    <% for(var i = 0,item ; item = CourseList[i]; i++){%>
    <div>
        <div class="sub_main_tag">
            &nbsp;<%if(item.open==false){%><a href="#" coursename="<%=item.Course.replace(/\s+/g, '')%>" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>
              <%}else{%><a href="#" coursename="<%=item.Course.replace(/\s+/g, '')%>" class="dropdown-toggle tag_open" data-action = "drop_up" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a><%}%>
            &nbsp;<%=item.Course%>&nbsp;&nbsp;<%=item.Title%>&nbsp;
            &nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>
        </div>
        <div class="tag_list">
        </div>
    </div>
    <%}%>
</template>
<template name="SUBLIST.SUBCOURSE">
        <% for(var d = 0,it ; it = TagList[d]; d++){%>
        <div class="subtag">
            <div class="info_block" courseData ='<%=JSON.stringify(it)%> 'style="float:left;width:90%"  >
                <span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>&nbsp;<%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;&nbsp;(&nbsp;<%=it.Location%>&nbsp;)
                <div style=" border-top: 2px solid #eee;"></div>
                <span class="fui-time" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>&nbsp;<%=it.Days%>&nbsp;<%=it.Time%>&nbsp;
                &nbsp;<span class="fui-location" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.Room%>&nbsp;
                &nbsp;<span class="fui-user" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.instructors%>&nbsp;
            </div>
            <div style="float: right;background-color: #2980b9;border-top-right-radius: 6px;border-bottom-right-radius: 6px;" >
                <a class="checkbox_for_add_course" name="<%=it.Course%>" section = "<%=it.Section%>" data-action="add_course" style="width:60px"><span class="fui-check" style="color:#eff0f2;"></span></a>
            </div>
        </div>
        <%}%>
</template>
<template name="SUBLIST.RECITATION">
    <div class="sub_main_tag">
        &nbsp;Select the recitation/lab to finish enroll!
    </div>
    <% for(var d = 0,it ; it = RecList[d]; d++){%>
    <div class="subtag">
        <div class="info_block" courseData ='<%=JSON.stringify(it)%> 'style="float:left;width:90%"  >
            <span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>&nbsp;<%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;&nbsp;(&nbsp;<%=it.Location%>&nbsp;)
            <div style=" border-top: 2px solid #eee;"></div>
            <span class="fui-time" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>&nbsp;<%=it.Days%>&nbsp;<%=it.Time%>&nbsp;
            &nbsp;<span class="fui-location" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.Room%>&nbsp;
            &nbsp;<span class="fui-user" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.instructors%>&nbsp;
        </div>
        <div style="float: right;background-color: #2980b9;border-top-right-radius: 6px;border-bottom-right-radius: 6px;" >
            <a class="checkbox_for_add_course" data-action="add_rec" style="width:60px"><span class="fui-check" style="color:#eff0f2;"></span></a>
        </div>
    </div>
    <%}%>
</template>