<body class="bodyback" style="background-image:url(img/background-01.jpg );">
<div class=" demo-row" style="width: 100%">
    <nav class="navbar navbar-inverse navbar-embossed" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-01">
                <span class="sr-only">Toggle navigation</span>
            </button>
            <a class="navbar-brand" href="/login">UPlan</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-01">
            <ul class="nav navbar-nav navbar-left">
                <li><a href="/login">LOG IN<span class="navbar-unread">1</span></a></li>
                <li><a href="/signup">SIGN UP<span class="navbar-unread">1</span></a></li>
                <li><a href="/forget">FORGET PASSWORD?<span class="navbar-unread">1</span></a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </nav><!-- /navbar -->
</div>
<div id = "Signup_msg" >
</div>
<div id = "Signup" style="margin-top: 5%;">
    <form onsubmit="return false">
        <div class="col-2">
            <label>
                <b id="username_info">USERNAME <b class="info_guide"></b></b>
                <input placeholder="What is your preferred user name?" id="username" name="name" tabindex="1">
            </label>
        </div>
        <div class="col-2">
            <label>
                <b>UNIVERSITY<p class="info_guide"></p></b>
                <input placeholder="Where do you currently study?" id="university" name="university" tabindex="2">
            </label>
        </div>
        <div class="col-2">
            <label>
                <b id="password_info" >PASSWORD<p class="info_guide"></p></b>
                <input placeholder=" Must include one letter and one number,at least 6 digits " type="password"  id="password" name="password" tabindex="3" maxlength="25">
            </label>
        </div>
        <div class="col-2">
            <label>
                <b id="password_r_info">PASSWORD CONFIRM<p class="info_guide"></p></b>
                <input placeholder="Please enter your password again" type="password"  id="PASSWORD_R" name="PASSWORD_R" tabindex="4" maxlength="25">
            </label>
        </div>
        <div class="col-3">
            <label>
                <b>GENDER<p class="info_guide"></p></b>
                <select tabindex="5" id="gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </label>
        </div>
        <div class="col-3">
            <label>
                <b id="email_info" >EMAIL<p class="info_guide"></p></b>
                <input placeholder="What is your e-mail address?" id="email" name="email" tabindex="6">
            </label>
        </div>
        <div class="col-3">
            <label>
                <b>YRS EXPERIENCE<p class="info_guide"></p></b>
                <select tabindex="7" id="YRS_EXPERIENCE">
                    <option yrs= "1" >Freshman (1 yrs)</option>
                    <option yrs= "2" >Sophomore (2 yrs)</option>
                    <option yrs= "3" >Junior (3 yrs)</option>
                    <option yrs= "4" >Senior (4 yrs)</option>
                    <option yrs= "5" >Graduated </option>
                </select>
            </label>
        </div>
        <div class="col-submit">
            <button data-action="confirm_signup" class="btn btn-block btn-lg btn-success">SIGN IN NOW</button>
            <div class="col-submit">
                <button class="btn btn-block btn-sm btn-success1" data-action="click_google" ><div><laber class="password_icon fui-google-plus" for="password"></laber>&nbspHave Google Account?</div>  </button>
            </div>
        </div>
    </form>
</div>

<div class="clear"></div>
</body>
