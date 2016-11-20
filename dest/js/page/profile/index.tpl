<template name="PROFILE.MAIN">
    <div id="SignIn" style="margin-top: 5%;">
        <form class="profile-form" onsubmit="return false">
            <div class="col-2">
                <label>
                    <b>USERNAME <p class="info_guide"></p></b>
                        <b><%=Profile.username%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>UNIVERSITY<p class="info_guide"></p></b>
                    <b><%if(Profile.university){%><%=Profile.university%><%}else{%>No email!<%}%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>MAJOR<p class="info_guide"></p></b>
                    <b><%if(Profile.major){%><%=Profile.major%><%}else{%>No major!<%}%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>GENDER<p class="info_guide"></p></b>
                    <b><%=Profile.gender%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>EMAIL<p class="info_guide"></p></b>
                    <b><%if(Profile.email){%><%=Profile.email%><%}else{%>No Email!<%}%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>YRS EXPERIENCE<p class="info_guide"></p></b>
                    <b><%if(Profile.yearExperience=="1"){%>Freshman (1 yrs)<%}else if(Profile.yearExperience=="2"){%>Sophomore (2 yrs)<%}else if(Profile.yearExperience=="3"){%>Junior (3 yrs)<%}else if(Profile.yearExperience=="4"){%>Senior (4 yrs)<%}else{%>Graduated <%}%></b>
                </label>
            </div>

            <div class="col-submit" id="change" style="display: block" >
                <button class="btn btn-block btn-lg btn-success" data-action="profile_edit" >Change your profile</button>
            </div>

        </form>
    </div>

</template>

<template name="PROFILE.CHANGING">
    <div id="SignIn1" style="margin-top: 5%;">
        <form class="profile-form" onsubmit="return false">
            <div class="col-2">
                <label>
                    <b>USERNAME <p class="info_guide"></p></b>
                    <b><%=Profile.username%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>UNIVERSITY<p class="info_guide"></p></b>
                    <input placeholder="enter your university" id="university" name="university" tabindex="2">
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>MAJOR<p class="info_guide"></p></b>
                    <input placeholder="enter your major" id="major" name="major" tabindex="6">                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>GENDER<p class="info_guide"></p></b>
                    <select tabindex="5" id="gender">
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                        <option value="2">Other</option>
                    </select>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b id="email_info">EMAIL<p class="info_guide"></p></b>
                    <input placeholder="enter your email" id="email" name="email" tabindex="6" disabled="disabled">
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>YRS EXPERIENCE<p class="info_guide"></p></b>
                    <select tabindex="7" id="yrs_experience">
                        <option value="1" id="0">Freshman (1 yrs)</option>
                        <option value="2">Sophomore (2 yrs)</option>
                        <option value="3">Junior (3 yrs)</option>
                        <option value="4">Senior (4 yrs)</option>
                        <option value="5">Graduated </option>
                    </select>
                </label>
            </div>

            <div class="col-submit" id="save" data-action="save_change" style="display: block">
                <button class="btn btn-block btn-lg btn-success">Save my change</button>
            </div>

        </form>
    </div>
</template>