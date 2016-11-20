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
            <a class="detail_link" data-action="show_details" style="color: #ffffff">
            <div class="info_block" courseData ='<%=JSON.stringify(it)%> 'style="float:left;width:90%"  >
                <span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>&nbsp;<%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;&nbsp;(&nbsp;<%=it.Location%>&nbsp;)
                <div style=" border-top: 2px solid #eee;"></div>
                <span class="fui-time" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>&nbsp;<%=it.Days%>&nbsp;<%=it.Time%>&nbsp;
                &nbsp;<span class="fui-location" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.Room%>&nbsp;
                &nbsp;<span class="fui-user" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.instructors%>&nbsp;
            </div>
            </a>
            <div style="float: right;background-color: #2980b9;border-top-right-radius: 6px;border-bottom-right-radius: 6px;" >
                <a class="checkbox_for_add_course" name="<%=it.Course%>" section = "<%=it.Section%>" data-action="add_course" style="width:60px"><span class="fui-check" style="color:#eff0f2;"></span></a>
            </div>
        </div>
        <%}%>
    <div id="course_detail" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div  class="modal-dialog modal-lg" style="background-color: #ffffff;border-radius: 6px;">
            <div class="modal-header" style="background-color: #34495e;">
                <a type="button" class="close details_button" data-dismiss="modal" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>
                <p style="margin-bottom:auto;color: #eff0f2;"><b>Course Detail</b></p>
            </div>
            <div class="modal-body" id="detail_box" style="height: 600px;max-height:  600px;overflow-y: auto;">
            </div>
            <div class="modal-footer modal_background_color">
                <button type="button" class="btn btn-warning btn-lg details_button" style="float: left;" data-action="comments_window" >Have some words?</button>
                <button type="button" class="btn btn-primary btn-lg details_button" data-dismiss="modal" >OK</button>
            </div>
        </div>
    </div>
    <div id="comment_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div  class="modal-dialog modal-lg" style="background-color: #ffffff;border-radius: 6px;">
            <div class="modal-header" style="background-color: #34495e;">
                <a type="button" class="close " data-dismiss="modal" data-action="close_comment" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>
                <p style="margin-bottom:auto;color: #eff0f2;"><b>Comments</b></p>
            </div>
            <div class="modal-body"  style="height: 200px;max-height:  200px;overflow-y: auto;">
                <textarea class="form-control" id="comment_Textarea" rows="5" spellcheck="true" style="z-index: auto; position: relative; line-height: 20px; font-size: 16px; transition: none; background: none 0% 0% / auto repeat scroll padding-box padding-box rgb(255, 255, 255);">
                </textarea>
            </div>
            <div class="modal-footer modal_background_color">
                <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal" data-action="submit_comment">OK</button>
                <button type="button" class="btn btn-warning btn-lg" data-dismiss="modal"  data-action="close_comment" >Close</button>
            </div>
        </div>
    </div>
</template>
<template name="SUBLIST.RECITATION">
    <div class="sub_main_tag">
        &nbsp;Select the recitation/lab to finish enroll!
    </div>
    <% for(var d = 0,it ; it = RecList[d]; d++){%>
    <div class="subtag">
        <div class="rec_block" courseData ='<%=JSON.stringify(it)%> 'style="float:left;width:90%"  >
            <span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>&nbsp;<%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;&nbsp;(&nbsp;<%=it.Location%>&nbsp;)
            <div style=" border-top: 2px solid #eee;"></div>
            <span class="fui-time" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>&nbsp;<%=it.Days%>&nbsp;<%=it.Time%>&nbsp;
            &nbsp;<span class="fui-location" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.Room%>&nbsp;
            &nbsp;<span class="fui-user" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.instructors%>&nbsp;
        </div>
        <div style="float: right;background-color: #16a085;border-top-right-radius: 6px;border-bottom-right-radius: 6px;" >
            <a class="checkbox_for_add_rec" data-action="add_rec" style="width:60px"><span class="fui-check" style="color:#eff0f2;"></span></a>
        </div>
    </div>
    <%}%>

</template>
<template name="SUBLIST.DETAIL">
    <div  style="background-color: #eff0f2;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;">
        <div class="Uheader" style=" background-color: #34495e">
            <p class="sub_Uheader">
                <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;">
                </span> &nbsp;Basic Infomation &nbsp; </p>
        </div>
        <div class="sub_list" style="background-color:#eff0f2;height: 70%; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
            <div class="sublist_main" style="overflow-y:scroll;height: 98%;margin-top: 2%; padding-bottom: 10px;">
                <div class=" list-block" style="color:#34495e">
                    <form>
                        <div class="col-1-s">
                            <b>&nbsp;Course Title:&nbsp;</b> <b style="color:#1abc9c"><%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;</b>
                        </div>
                        <div class="col-3-s">
                            <b>&nbsp;Location:&nbsp;</b> <b style="color:#1abc9c"><%=it.Location%></b>
                        </div>
                        <div class="col-3-s">
                            <b>&nbsp;Days:&nbsp;</b> <b style="color:#1abc9c"><%=it.Days%></b>
                        </div>
                        <div class="col-3-s">
                            <b>&nbsp;Time:&nbsp;</b> <b style="color:#1abc9c"><%=it.Time%></b>
                        </div>
                        <div class="col-3-s">
                            <b>&nbsp;Room:&nbsp;</b> <b style="color:#1abc9c"><%=it.Room%></b>
                        </div>
                        <div class="col-3-s">
                            <b>&nbsp;Instructor:&nbsp;</b> <b style="color:#1abc9c"><%=it.instructors%></b>
                        </div>
                        <div class="col-1-s">
                            <b>&nbsp;Other course taught by:&nbsp;</b><b style="color:#1abc9c"><%=it.instructors%></b>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div  style="background-color: #eff0f2;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;margin-top: 1%">
        <div class="Uheader" style=" background-color: #34495e">
            <p class="sub_Uheader">
                <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;">
                </span> &nbsp;Course Description &nbsp; </p>
        </div>
        <div class="sub_list" style="background-color:#eff0f2;height: 70%;border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
            <div class="sublist_main" style="overflow-y:scroll;height: 98%;margin-top: 1%;">
                <div class=" list-block" style="color:#34495e">
                    <p style="margin:10px;text-align: justify;font-weight: 600"><%=it.Course_Description%></p>    </div>
            </div>
        </div>
    </div>
    <div  style="background-color: #eff0f2;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;margin-top: 1%">
        <div class="Uheader" style=" background-color: #34495e">
            <p class="sub_Uheader" style="margin-bottom: 0px">
                <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;">
                </span> &nbsp; Student comments &nbsp; <a data-action="open_student_comments" class="open details_button" style="float:right;"><span class="fui-resize" style="padding: 2px;"></span></a></p>
        </div>
        <div class="sub_list" style="background-color:#eff0f2;height: 70%;border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
            <div class="sublist_main" style="overflow-y:scroll;height: 98%;margin-top: 1%;">
                <div class=" list-block" id="comment_list" style="color:#34495e"></div>
            </div>
        </div>
    </div>
</template>
<template name="SUBLIST.COMMENT">
    <% for(var d = 0,temp ; temp = CommentList[d]; d++){%>
    <div class="comment_block" style="text-align: justify;">
        <span class="fui-radio-checked" style="font-size: 18px; float:left; padding-left: 5px;"></span>
        <p style="margin:30px;font-weight: 600"> " <%=temp.comments%> "
        </p>
        <p style="text-align: right;margin: 20px;font-weight: 800"> ----- <%=temp.username%>, <%=temp.updateAt%>
        </p>
    </div>
    <%}%>
</template>