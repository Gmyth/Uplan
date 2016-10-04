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
            &nbsp;<%if(item.open==false){%><a href="#" coursename="<%=item.Course%>" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>
              <%}else{%><a href="#" coursename="<%=item.Course%>" class="dropdown-toggle tag_open" data-action = "drop_up" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a><%}%>
            &nbsp;<%=item.Course%>&nbsp;&nbsp;<%=item.Title%>&nbsp;
            &nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>
        </div>
        <div class="tag_list">
            <% for(var i = 0,item ; item = TagList[i]; i++){%>
            <div class="subtag">
                <div class="info_block" courseData ='<%=JSON.stringify(item)%> 'style="float:left;"  >
                    <span class="fui-credit-card" style="padding: 5px;color:#dfce8b;"></span>&nbsp;<%=item.Title%>&nbsp;<%=item.Type%>&nbsp;<%=item.Section%>&nbsp;&nbsp;(&nbsp;<%=item.Location%>&nbsp;)
                    <div style=" border-top: 2px solid #eee;"></div>
                    <span class="fui-time" style="padding: 5px;color:#efa59d;position: relative;top: 1px;"></span>&nbsp;<%=item.Days%>&nbsp;<%=item.Time%>&nbsp;
                    &nbsp;<span class="fui-location" style="padding: 5px;color:#edad73;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=item.Room%>&nbsp;
                    &nbsp;<span class="fui-user" style="padding: 5px;color:#27ae60;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=item.instructors%>&nbsp;
                </div>
                <div style="float: right;background-color: rgba(60, 162, 199, 0.4);" >
                    <a class="checkbox_for_add_course" data-action="add_course" style="width:60px"><span class="fui-check"></span></a>
                </div>
            </div>
            <%}%>
        </div>
    </div>
    <%}%>
</template>
