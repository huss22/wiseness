$(document).ready(function() {

    $('#tableload').load('views/Table.html');

    $('#loginbtn').on('click', $.validate({
        form: '#loginuser',
        modules: 'security',
        onError: function() {
            alert('Validation failed');
        },
        onSuccess: function() {
            return submitloginForm();
        }
    }));

    function submitloginForm() {
        $.ajax({
            type: 'POST',
            url: 'https://domytaxreturn.com.au/expenseapp/GAE/login.php',
            data: $('#loginuser').serialize(),
            success: function(response) {
                localStorage.setItem("UID", response);
                var x = localStorage.getItem("UID");
                if (x == 'User not found') {

                    alert('User not found, please register');

                } else if (x == "Incorrect password!") {
                    alert("Check Username or Email");
                } else {
                    $('.form_result').html('Logged in with UID:' + x + '<a class = "logout"> Logout </a>');
                    $('.form_result').show();
                    $('#owl-homeslider').hide();
                    $('#start').show();
                }
            }
        });
        return false;
    }
    $('#registerbtn').on('click', $.validate({
        form: '#registeruser',
        modules: 'security',
        onError: function() {
            alert('Validation failed');
        },
        onSuccess: function() {
            return submitregisterForm();
        }
    }));

    function submitregisterForm() {
        $.ajax({
            type: 'POST',
            url: 'https://domytaxreturn.com.au/expenseapp/GAE/register.php',
            data: $('#registeruser').serialize(),
            success: function(response) {
                localStorage.setItem("UID", response);
                var x = localStorage.getItem("UID");
                if (x == 'User Already Registered, please login') {

                    alert('User Already Registered, please login');
                } else if (x == "Couldn't register user, please try again'") {
                    alert("Couldn't register user, please try again'");
                } else {
                    $('.form_result').html('Logged in with UID:' + x + '<a class = "logout"> Logout </a>');
                    $('.form_result').show();
                    $('#owl-homeslider').hide();
                    $('#start').show();
                }
            }
        });
        return false;
    }
    $("#owl-homeslider").owlCarousel({

        slideSpeed: 1000,
        paginationSpeed: 1000,
        singleItem: true
    });
    var x = localStorage.getItem("UID");
    if (x == null) {} else {

        $('.form_result').html('Logged in with UID:' + x + '<a class = "logout"> Logout </a>');
        $('.form_result').show();
        $('#owl-homeslider').hide();
        $('#start').show();
    }
    $('.logout').on('click', function() {
        localStorage.removeItem("UID");
        $('.form_result').hide();
        $('#owl-homeslider').show();
        $('#start').hide();
    });

});

$(document).on("swipeleft", ".transaction-summary-info", function(event) {
    var listitem = $(this),
        // These are the classnames used for the CSS transition
        dir = event.type === "swipeleft" ? "left" : "right",
        // Check if the browser supports the transform (3D) CSS transition
        transition = $.support.cssTransform3d ? dir : false; {
        $("#leftsummarypanel").panel("open");
    }
});
$(document).on("swiperight", ".transaction-summary-info", function(event) {
    var listitem = $(this),
        // These are the classnames used for the CSS transition
        dir = event.type === "swipeleft" ? "left" : "right",
        // Check if the browser supports the transform (3D) CSS transition
        transition = $.support.cssTransform3d ? dir : false; {
        $("#rightsummarypanel").panel("open");
    }
});
