<template name="SEARCH.MAIN">
    <ul>
        <li>Subject <input type="text" class="form-control input-s" placeholder="Enter here"/></li>

        <li>Course Number
            &nbsp&nbsp
            <select class="form-control select1 select-primary select-block mbl">
                <optgroup label="course number">
                    <option value="0">contains</option>
                    <option value="1">greater than</option>
                    <option value="2">is exactly</option>
                    <option value="3">less than</option>
                </optgroup>
            </select>
            &nbsp&nbsp
            <input type="text" class="form-control input-s" placeholder="Enter here"/>
        </li>

        <li>Course Career
            &nbsp&nbsp
            <select class="form-control select1 select-primary select-block mbl">
                <optgroup label="course career">
                    <option value="0">graduate</option>
                    <option value="1">law school</option>
                    <option value="2">school of dental medicine</option>
                    <option value="3">school of medicine</option>
                    <option value="4">school of pharmacy</option>
                    <option value="5">undergraduate</option>
                </optgroup>
            </select>

        <li>
            <div class="span3">
                <label class="checkbox1" for="checkbox1">
                    <input type="checkbox" value="" id="checkbox1">
                    Show Open Classes Only
                </label>
            </div>
        <li>
            <div class="span3">
                <label class="checkbox1" for="checkbox2">
                    <input type="checkbox" value="" id="checkbox2">
                    Open Entry/Exit Classes Only
                </label>
            </div>

        <li>Meeting Start Time
            &nbsp&nbsp
            <select class="form-control select1 select-primary select-block mbl">
                <optgroup label="meeting start time">
                    <option value="0">greater than</option>
                    <option value="1">is exactly</option>
                    <option value="2">less than</option>
                </optgroup>
            </select>
            &nbsp&nbsp
            <input type="text" class="form-control input-s" placeholder="Enter here"/>

        <li>Meeting End Time
            &nbsp&nbsp
            <select class="form-control select1 select-primary select-block mbl">
                <optgroup label="meeting end time">
                    <option value="0">greater than</option>
                    <option value="1">is exactly</option>
                    <option value="2">less than</option>
                </optgroup>
            </select>
            &nbsp&nbsp
            <input type="text" class="form-control input-s" placeholder="Enter here"/>

        <li>Course Credits
            &nbsp&nbsp
            <select class="form-control select1 select-primary select-block mbl">
                <optgroup label="course credit">
                    <option value="0">greater than</option>
                    <option value="1">is exactly</option>
                    <option value="2">less than</option>
                </optgroup>
            </select>
            &nbsp&nbsp
            <input type="text" class="form-control input-s" placeholder="Enter here"/>
    </ul>
</template>