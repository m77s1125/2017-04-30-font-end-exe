$(document).ready(function() {
    //console.log(" Hello, script is ready!");

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



});
