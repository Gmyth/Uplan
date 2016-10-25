<template name="SEARCH.MAIN">
    <ul style="list-style-type:none; font-size: small;">
        <li style="color:white">Subject
            <input type="text" id="txtsubject" class="form-control input-s" placeholder="Enter here"/>
        </li>
        <li style="color:white">Course Number

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
            <a data-toggle="modal" class="hoverable" data-target=".bd-example-modal-sm">advanced option</a>
            <button class="btn1 btn-default btn1-wide1" value="search" data-action="storedata">search</button>
        </li>
    </ul>

    <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-header modal_width modal_background_color">
                <p style="text-align:center; margin-bottom:auto"><b>advanced search option</b></p>
            </div>
            <div class="modal-body modal_width modal_background_color">
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
            <div class="modal-footer modal_width modal_background_color">

                <button type="button" class="btn1 btn-default btn1-wide2" data-dismiss="modal">Close</button>
                <button type="button" class="btn1 btn-default btn1-wide2">Save changes</button>
            </div>
        </div>
    </div>
</template>