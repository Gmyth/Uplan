<template name="PROFILE.FIRST">
    <div id="SignIn" style="margin-top: 5%;">
        <form onsubmit="return false">
            <div class="col-2">
                <label>
                    <b>USERNAME <p class="info_guide"></p></b>
                    <b><%=Profile.username%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>UNIVERSITY<p class="info_guide"></p></b>
                    <b><%=Profile.university%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>MAJOR<p class="info_guide"></p></b>
                    <b><%=Profile.major%></b>
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
                    <b><%=Profile.email%></b>
                </label>
            </div>
            <div class="col-2">
                <label>
                    <b>YRS EXPERIENCE<p class="info_guide"></p></b>
                    <b><%=Profile.yrs_experience%></b>
                </label>
            </div>

        </form>
    </div>
</template>