<template name="FLOW.MAIN">
    <div class="main_header" style="height: 85%;">
        <table  class= "weekly_schedule table-bordered table-hover table-responsive table-fit" cellspacing="0" cellpadding="2" width="100%" >
            <colgroup span="1" width="9%" align="center" valign="middle"></colgroup>
            <colgroup span="7" width="13%" align="center" valign="middle"></colgroup>
            <thead>
            <th>Time</th>
            <th>Monday<br>Sep 5</th>
            <th>Tuesday<br>Sep 6</th>
            <th>Wednesday<br>Sep 7</th>
            <th>Thursday<br>Sep 8</th>
            <th>Friday<br>Sep 9</th>
            <th>Saturday<br>Sep 10</th>
            <th>Sunday<br>Sep 11</th>
            </thead>
            <tbody id="flow_body">
            </tbody>
        </table>
    <!-- End HTML Area -->
    </div>
        <div class="function_box row">
            <div class="Uheader" style=" background-color: #34495e">        <p class="sub_Uheader">     <span class="fui-calendar-solid" style="color:#1abc9c;position: relative;top: 1px;"></span> &nbsp;Tool Panel &nbsp; </p> </div>
            <div class="col-xs-3">
                <button data-toggle="modal" class="btn btn-block btn-lg btn-primary" data-action="view_selected" >View Selected</button>
                <div id="view_selected" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div  class="modal-dialog modal-lg" style="background-color: #eff0f2;border-radius: 6px;">
                        <div class="modal-header" style="background-color: #34495e;">
                            <a type="button" class="close" data-dismiss="modal" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>
                            <p style="margin-bottom:auto;color: #eff0f2;"><b>Selected</b></p>
                        </div>
                        <div class="modal-body" id="selected_list" style="height: 500px;max-height: 500px;overflow-y: auto;">

                        </div>
                        <div class="modal-footer modal_background_color">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" data-action="save_course">Save changes</button>
                            <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-3">
                <a href="#fakelink" class="btn btn-block btn-lg btn-warning" data-action="save_schedule">Save Schedule</a>
            </div>
            <div class="col-xs-3">
                <a href="#fakelink" class="btn btn-block btn-lg btn-inverse" disabled="true">Coming Soon</a>
            </div>
            <div class="col-xs-3">
                <a href="#fakelink" class="btn btn-block btn-lg btn-danger" disabled="true">Coming Soon</a>
            </div>

        </div>

</template>
<template name="FLOW.COURSE">
    <%for(var i=0,item;item = CourseList[i];i++){%>
    <tr>
    <%if(i%2==0){%><td class="weekly_schedule_time_background" rowspan="2"><span ><%=startTime+(i/2)%>:00</span></td><%}%>

        <%if(typeof item[0] == "object" && item[0]){%>
        <%if(item[0].hasOwnProperty("hover")){%>
        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>
        <%}else{%>
        <%if(item[0].hasOwnProperty("conflict")){%>
        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>
        <%}else{%>
        <td class="weekly_schedule_line_background" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>
        <%}%>
        <%}%>
        <%}else if(typeof item[0]!= "boolean"&&item[0] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>


        <%if(typeof item[1] == "object" && item[1]){%>
        <%if(item[1].hasOwnProperty("hover")){%>
        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>
        <%}else{%>
        <%if(item[1].hasOwnProperty("conflict")){%>
        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>
        <%}else{%>
        <td class="weekly_schedule_line_background" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>
        <%}%>
        <%}%>
        <%}else if(typeof item[1]!= "boolean"&&item[1] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>

        <%if(typeof item[2] == "object" && item[2]){%>
        <%if(item[2].hasOwnProperty("hover")){%>
        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>
        <%}else{%>
        <%if(item[2].hasOwnProperty("conflict")){%>
        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>
        <%}else{%>
        <td class="weekly_schedule_line_background" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>
        <%}%>
        <%}%>
        <%}else if(typeof item[2]!= "boolean"&&item[2] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>

        <%if(typeof item[3] == "object" && item[3]){%>
        <%if(item[3].hasOwnProperty("hover")){%>
        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>
        <%}else{%>
        <%if(item[3].hasOwnProperty("conflict")){%>
        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>
        <%}else{%>
        <td class="weekly_schedule_line_background" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>
        <%}%>
        <%}%>
        <%}else if(typeof item[3]!= "boolean"&&item[3] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>

        <%if(typeof item[4] == "object" && item[4]){%>
        <%if(item[4].hasOwnProperty("hover")){%>
        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>
        <%}else{%>
        <%if(item[4].hasOwnProperty("conflict")){%>
        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>
        <%}else{%>
        <td class="weekly_schedule_line_background" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>
        <%}%>
        <%}%>
        <%}else if(typeof item[4]!= "boolean"&&item[4] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>

        <%if(typeof item[5] == "object" && item[5]){%>
        <%if(item[5].hasOwnProperty("hover")){%>
        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>
        <%}else{%>
        <%if(item[5].hasOwnProperty("conflict")){%>
        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>
        <%}else{%>
        <td class="weekly_schedule_line_background" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>
        <%}%>
        <%}%>
        <%}else if(typeof item[5]!= "boolean"&&item[5] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>

        <%if(typeof item[6] == "object" && item[6]){%>
        <%if(item[6].hasOwnProperty("hover")){%>
        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>
        <%}else{%>
        <%if(item[6].hasOwnProperty("conflict")){%>
        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>
        <%}else{%>
        <td class="weekly_schedule_line_background" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>
        <%}%>
        <%}%>
        <%}else if(typeof item[6]!= "boolean"&&item[6] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>
    </tr>
    <%}%>
</template>

<template name="SEARCH.MAIN">
    <table>
    <thead>
        <tr>
            <p>Class search<p>
        </tr>
    </thead>
    <tbody id=search_body>
        <tr>
            <td><p>Subjrect</p></td>
            <td><input type="text" class="form-control input-sm" height:60%; placeholder="Enter something" /></td>
        </tr>
        <tr>
            <td><p>Course number</p></td>
            <td><select class="form-control select select-primary select-block mbl">
                  <optgroup label="course number">
                    <option value="0">contains</option>
                    <option value="1">greater than or equal to</option>
                    <option value="2">is exactly</option>
                    <option value="3">less than or equal to</option>
                  </optgroup>
                </select></td>
            <td><input type="text" class="form-control input-sm" placeholder="Enter something" /></td>
        </tr>
        <tr>
            <td><p>Course career</p></td>
            <td><select class="form-control select select-primary select-block mbl">
                <optgroup label="course career">
                <option value="0">graduate</option>
                <option value="1">law school</option>
                <option value="2">school of dental medicine</option>
                <option value="3">school of medicine</option>
                <option value="4">school of pharmacy</option>
                <option value="5">undergraduate</option>
                </optgroup>
                </select></td>
        </tr>
        <tr>
            <td></td>
            <td><div class="span3">
                <label class="checkbox" for="checkbox1">
                <input type="checkbox" value="" id="checkbox1">
                Show Open Classes Only
                </label>
                <label class="checkbox" for="checkbox2">
                <input type="checkbox" checked="checked" value="" id="checkbox2">
                Open Entry/Exit Classes Only
                </label>
            </div></td>
        </tr>
        <tr>
            <td><p>Meeting Start Time</p></td>
                        <td><select class="form-control select select-primary select-block mbl">
                              <optgroup label="Meeting Start Time">
                                <option value="0">be</option>
                                <option value="1">greater than or equal to</option>
                                <option value="2">is exactly</option>
                                <option value="3">less than or equal to</option>
                              </optgroup>
                            </select></td>
                        <td><input type="text" class="form-control input-sm" placeholder="Enter something" /></td>
                    </tr>
        </tr>
    </tbody>
    </table>
</template>
<template name="FLOW.SELECTED">
    <% for(var d = 0,it ; it = TagList[d]; d++){%>
    <table class="table table-bordered table-responsive table-hover">
        <thead style="background-color: #34495e;color: #ffffff">
        <tr>
            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Title</th>
            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Type</th>
            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Section</th>
            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Location</th>
            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Days</th>
            <th><span class="fui-time" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>Time</th>
            <th><span class="fui-location" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>&nbsp;Room</th>
            <th><span class="fui-user" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>Instrouctors</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr course_info=<%=it._id%>>
            <td><%=it.Title%></td>
            <td><%=it.Type%></td>
            <td><%=it.Section%></td>
            <td><%=it.Location%></td>
            <td><%=it.Days%></td>
            <td><%=it.Time%></td>
            <td><%=it.Room%></td>
            <td><%=it.instructors%></td>
            <td><a data-action="del_course" style="padding: 10px;font-size: 20px;"><span class="fui-trash" ></span></a></td>
        </tr>
        </tbody>
        </table>
    <%}%>
</template>