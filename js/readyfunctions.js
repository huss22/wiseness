$(document).ready(function() {

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

    function takephoto() {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            var image = document.getElementById('myImage');
            image.src = imageURI;
            alert('imageURI');
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }

});

$(document).on("swipeleft", ".transaction-summary-info", function(event) {
    $("#rightsummarypanel").panel("open");
});
$(document).on("swiperight", ".transaction-summary-info", function(event) {
    $("#leftsummarypanel").panel("open");
});
