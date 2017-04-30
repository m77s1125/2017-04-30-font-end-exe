var token;

//helper to delect cookie in browese : change the expiry time to the past
function delectCookie(name){
    document.cookie = name + "=;expires = Thu, 01an 1970 00:00:01 GMT"
}


//fuction paste from online http://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function updateNavView(){
    if(token){
        $("#loginNav").hide();
        $("#logoutNav").show();
    }else{
        $("#loginNav").show();
        $("#logoutNav").hide();
    }
}

$(document).ready(function() {

    token = getCookie("x-access-token");
    
    updateNavView();

    $("#signupBtn").click(function(event) {
        //alert("Don't click sign up button!! ");
        //console.log(event);
        event.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username + " " + password);

        if (username && password) {
            //AJAX
            $.post("http://open-commerce.herokuapp.com/api/signup", {
                    username: username,
                    password: password
                },
                function(response) {
                    //console.log(response);
                    if (response.success) {
                        alert("signup successful!");
                    } else {
                        alert(response.message);
                    }
                });

        } else {
            alert("Please fill in a username or password for signup!")
        }
    });


    $("#loginBtn").click(function(event) {

        event.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username + " " + password);

        if (username && password) {
            $.post("http://open-commerce.herokuapp.com/api/login", {
                    username: username,
                    password: password
                },
                function(response) {
                    if (response.success) {
                        var cookie = "x-access-token=" + response.token;
                        document.cookie = cookie;
                        window.location.href = "/index.html";
                    } else {
                        alert(response.message);
                    }
                });

        } else {
            alert("Please fill in a username or password for login !")
        }
    });

$("#logoutNav").click(function(event) {
    event.preventDefault();
    delectCookie('x-access-token');
    window.location.href = "index.html";

});


});
