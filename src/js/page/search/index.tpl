<template name="SEARCH.MAIN">
    <ul style="list-style-type:none; font-size: small;padding-bottom: 20px;">
        <li >Subject
            <input type="text" id="txtsubject" class="form-control input-s" placeholder="Enter here"/>
        </li>
        <li >Course Number

            <select id="selnumber" class="form-control1 select1 select-primary select-block">
                <optgroup label="course number">
                    <option value="0">is exactly</option>
                    <option value="1">greater than</option>
                    <option value="2">less or equal</option>
                </optgroup>
            </select>

            <input type="text" id="txtnumber" class="form-control input-s" placeholder="Enter here"/>
        </li>

        <li>
            <a data-toggle="modal" class="hoverable" data-action="advanced_window">advanced option</a>
            <button class="btn1 btn-default btn1-wide1" value="search" data-action="storedata">search</button>
        </li>
    </ul>
        <div id="advanced_window" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="background-color: #eff0f2;border-radius: 6px;">
            <div class="modal-header" style="background-color: #34495e;">
                <a type="button" class="close" data-dismiss="modal" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>
                <p style="margin-bottom:auto;color: #eff0f2;"><b>Advanced search option</b></p>
            </div>
            <div class="modal-body">
                <div>
                    <ul style="list-style-type:none">
                        <li><b style="position:relative; top: 5px" ;>Course Career</b>
                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                            <select id="sellevel" class="form-control1 select1 select-primary select-block">
                                <optgroup label="course career">
                                    <option value="0">undergraduate</option>
                                    <option value="1">graduate</option>
                                </optgroup>
                            </select>
                        </li>

                        <li>
                            <div class="span">
                                <label1 class="checkbox1" for="checkbox1">
                                    <input style="margin-right: 5px;" type="checkbox" value="checked"
                                           id="checkbox1">
                                    <b>Show Open Classes Only</b>
                                </label1>
                            </div>
                        </li>

                        <li><b>Meeting Start Time</b>
                            <select id="selstart" class="form-control1 select1 select-primary select-block">
                                <optgroup label="meeting start time">
                                    <option value="0">is exactly</option>
                                    <option value="1">greater than</option>
                                    <option value="2">less than</option>
                                </optgroup>
                            </select>

                            <input type="text" id="txtstarttime" class="form-control input-s"
                                   placeholder="Enter here"/>
                        </li>

                        <li><b>Meeting End Time</b>
                            &nbsp&nbsp
                            <select id="selend" class="form-control1 select1 select-primary select-block">
                                <optgroup label="meeting end time">
                                    <option value="0">is exactly</option>
                                    <option value="1">greater than</option>
                                    <option value="2">less than</option>
                                </optgroup>
                            </select>

                            <input type="text" id="txtendtime" class="form-control input-s"
                                   placeholder="Enter here"/>
                        </li>

                        <li><b>Course Credits</b>
                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                            <select id="selcredit" class="form-control1 select1 select-primary select-block">
                                <optgroup label="course credit">
                                    <option value="0">is exactly</option>
                                    <option value="1">greater than</option>
                                    <option value="2">less than</option>
                                </optgroup>
                            </select>
                            <input type="text" id="txtcredit" class="form-control input-s"
                                   placeholder="Enter here"/>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer modal_background_color">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</template>