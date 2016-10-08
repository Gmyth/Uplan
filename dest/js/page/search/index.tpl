<template name="SEARCH.MAIN">
    <ul style="list-style-type:none; font-size: small;">
        <li style="color:white">Subject
            &nbsp&nbsp
            <input type="text" id="txtsubject" class="form-control input-s" placeholder="Enter here"/>
        </li>
        <li style="color:white">Course Number
            &nbsp&nbsp
            <select id="selnumber" class="form-control1 select1 select-primary select-block">
                <optgroup label="course number">
                    <option value="0">contains</option>
                    <option value="1">greater than</option>
                    <option value="2">is exactly</option>
                    <option value="3">less than</option>
                </optgroup>
            </select>
            &nbsp&nbsp
            <input type="text" id="txtnumber" class="form-control input-s" placeholder="Enter here"/>
        </li>

        <li style="color:white">Course Career
            &nbsp&nbsp
            <select id="sellevel" class="form-control1 select1 select-primary select-block">
                <optgroup label="course career">
                    <option value="0">graduate</option>
                    <option value="1">law school</option>
                    <option value="2">school of dental medicine</option>
                    <option value="3">school of medicine</option>
                    <option value="4">school of pharmacy</option>
                    <option value="5">undergraduate</option>
                </optgroup>
            </select>
        </li>

        <li style="color:white">
            <div class="span">
                <label1 id="checkbox_id1" class="checkbox1" id="checkbox_id1" for="checkbox1">
                    <input type="checkbox" value="" id="checkbox1">
                    Show Open Classes Only
                </label1>
            </div>
        </li>

        <li style="color:white">Meeting Start Time
            &nbsp&nbsp
            <select id="selstart" class="form-control1 select1 select-primary select-block">
                <optgroup label="meeting start time">
                    <option value="0">greater than</option>
                    <option value="1">is exactly</option>
                    <option value="2">less than</option>
                </optgroup>
            </select>
            &nbsp&nbsp
            <input type="text" id="txtstarttime" class="form-control input-s" placeholder="Enter here"/>
        </li>

        <li style="color:white">Meeting End Time
            &nbsp&nbsp
            <select id="selend" class="form-control1 select1 select-primary select-block">
                <optgroup label="meeting end time">
                    <option value="0">greater than</option>
                    <option value="1">is exactly</option>
                    <option value="2">less than</option>
                </optgroup>
            </select>
            &nbsp&nbsp
            <input type="text" id="txtendtime" class="form-control input-s" placeholder="Enter here"/>
        </li>

        <li style="color:white">Course Credits
            &nbsp&nbsp
            <select id="selcredit" class="form-control1 select1 select-primary select-block">
                <optgroup label="course credit">
                    <option value="0">greater than</option>
                    <option value="1">is exactly</option>
                    <option value="2">less than</option>
                </optgroup>
            </select>
            &nbsp&nbsp
            <input type="text" id="txtcredit" class="form-control input-s" placeholder="Enter here"/>
        </li>>
        <li style="color:white">
            <button class="btn1 btn-default btn1-wide1" value="search" data-action="storedata">
                search
            </button>
        </li>
    </ul>

</template>