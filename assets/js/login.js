$(document).ready(function () {
    $.blockUI.defaults.message = '<img src="../assets/images/loading.gif" />Just a moment please';
    
    $("#forgotPasswordForm").on('submit', function() {
        return forgotPassword();
    });
    
    // Extract any intended route from URL hash
    const intendedRoute = window.location.hash;
    if (intendedRoute) {
        // Store the intended route in localStorage to use after login
        localStorage.setItem("intendedRoute", intendedRoute);
    }
        
    if (window.location.href.indexOf("?error") > -1) {
        $('#loginErrorMsg').html("Authentication failed, please check your credentials.").show();
    } else if (localStorage.getItem("sessiontimedout") == "true") {
        localStorage.removeItem("sessiontimedout");
        $('#loginErrorMsg').html("<font color='red'>Your session is timed out</font>").show();
    }
    else {
        $('#loginErrorMsg').hide();
    }
});

function submitOktaLogin(){
    document.getElementById('loginForm').action = '/oauth2/authorization/okta';
    document.getElementById('loginForm').submit();
}

function getCookie(cname) {
    console.log('cookie Name: '+cname);
    var name = cname + "=";
    var ca = document.cookie.split(';');
    console.log('cookies: ');
    console.log(ca);
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        console.log(c);
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            console.log(c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function userLogin() {
    $.ajax({
        type: "GET",
        url: "/auth/login.html",
        success: function(res,status,xhr) {
            $('#csrfToken').val(xhr.getResponseHeader("x-csrf-token"));
            $('#csrfToken').attr('name', xhr.getResponseHeader("x-csrf-header"));
        }
    });
    localStorage.setItem("userName", document.getElementById("httpd_username").value);
}

function cancelForgotPwdForm() {
    document.getElementById("forgotPasswordForm").reset();
    $('#forgotpwdSuccessMsg').hide();
    $('#forgotpwdErrorMsg').hide();
}

            function forgotPassword() {
				  $.ajax({
      				type: "GET",
     				url: "/auth/login.html",
      				success: function(res,status,xhr) {
						$('#csrfToken').val(xhr.getResponseHeader("x-csrf-token"));
						$('#csrfToken').attr('name', xhr.getResponseHeader("x-csrf-header"));
					}
    			  });
    			  
			      $('#forgotpwdSuccessMsg').hide();
                  $('#forgotpwdErrorMsg').hide();

                  
                  var mailFormatArray = ["gmail", "yahoo", "rediff"];
                  var userName = document.getElementById("forgotuserId").value;
                  
                  if (userName == undefined || userName == null) {

                        $('#forgotpwdErrorMsg').html("Enter User Name").show();
                        return false;
                        
                  }
                  if (!$("#forgotTestuserId").val()) {
                        $.blockUI();
                        $.ajax({
                              url: "/forgotPassword?userId="+ userName,
                              type: "GET",
                              cache: false,
                              success: function (data) {
                                    var res = data;
//                                    var res = JSON.parse(data);
                                    if(res.statusCode == 0){
                                          $('#forgotpwdSuccessMsg').html(res.Msg).show();
                                    }else{
                                          $('#forgotpwdErrorMsg').html(res.Msg).show();
                                    }
                                    $.unblockUI();

                              },
                              error: function (x, y, z) {
                                    $('#forgotpwdErrorMsg').html(x.responseText + "  " + x.status).show();
                                    $.unblockUI();
                              }
                        });
                  }
                  return false;

            }
