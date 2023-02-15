$(document).ready(function () {

    $('.gallery-container').magnificPopup({
        delegate: 'img',
        type: 'image',
        fixedContentPos: true,
        callbacks: {
            elementParse: function (qw) {
                qw.src = qw.el.attr('src');
            }
        }
    });

    $('.highlights-container').magnificPopup({
        delegate: 'img',
        type: 'image',
        gallery: {
            enabled: true
        },
        callbacks: {
            elementParse: function (qw) {
                qw.src = qw.el.attr('src');
            }
        }
    });

});

var KTAvatar1 = function () {
    return {
        init: function () {
            new KTAvatar("kt-avatar")
        }
    };
}();

function IsNullOrWhiteSpace(value) {
    return value === null || value.match(/^\s*$/) !== null;
}

function IsValidEmail(value) {
    var pattern = /^\b[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b$/i;
    return pattern.test(value);
}

function IsValidString(value) {
    var pattern = /[A-Za-z0-9!#$%&'*+-/=?_`().]+$/;
    return pattern.test(value);
}

$(".my-card-container .contact-us button").on("click", function () {
    $(".my-card-container .contact-us .alert-outline-danger").fadeOut(0);
    $(".my-card-container .contact-us .alert-outline-success").fadeOut(0);

    var name = $.trim($(".my-card-container .contact-us [name='ContactUs.Name.Value']").val());
    var email = $.trim($(".my-card-container .contact-us [name='ContactUs.Email.Value']").val());
    var mobile = $.trim($(".my-card-container .contact-us [name='ContactUs.Mobile.Value']").val());
    var company = $.trim($(".my-card-container .contact-us [name='ContactUs.Company.Value']").val());
    var message = $.trim($(".my-card-container .contact-us [name='ContactUs.Message.Value']").val());

    if (IsNullOrWhiteSpace(name) || IsNullOrWhiteSpace(email)) {
        $(".my-card-container .contact-us .alert-outline-danger .alert-text").text("Required fields are missing.");
        $(".my-card-container .contact-us .alert-outline-danger").fadeIn(500);
        return;
    }

    if (!IsNullOrWhiteSpace(email) && !IsValidEmail(email)) {
        $(".my-card-container .contact-us .alert-outline-danger .alert-text").text("The email address entered is invalid.");
        $(".my-card-container .contact-us .alert-outline-danger").fadeIn(500);
        return;
    }

    if ((!IsNullOrWhiteSpace(name) && !IsValidString(name)) ||
        (!IsNullOrWhiteSpace(mobile) && !IsValidString(mobile)) ||
        (!IsNullOrWhiteSpace(company) && !IsValidString(company)) ||
        (!IsNullOrWhiteSpace(message) && !IsValidString(message))) {
        $(".my-card-container .contact-us .alert-outline-danger .alert-text").text("One or more fields have invalid characters.");
        $(".my-card-container .contact-us .alert-outline-danger").fadeIn(500);
        return;
    }

    if ($(".my-card-container #contactUsForm").length == 0) {
        $(".my-card-container .contact-us .alert-outline-success .alert-text").text("Thank you for your interest. We will get back to you soon.");
        $(".my-card-container .contact-us .alert-outline-success").fadeIn(500);
        return;
    }

    $(".my-card-container .contact-us [name='ContactUs.Name.Value']").val(name);
    $(".my-card-container .contact-us [name='ContactUs.Email.Value']").val(email);
    $(".my-card-container .contact-us [name='ContactUs.Mobile.Value']").val(mobile);
    $(".my-card-container .contact-us [name='ContactUs.Company.Value']").val(company);
    $(".my-card-container .contact-us [name='ContactUs.Message.Value']").val(message);

    $.ajax(urlPrefix + "/Card/SubmitContactUs", {
        async: false,
        data: $(".my-card-container #contactUsForm").serialize(),
        type: "POST",
        beforeSend: function () {
            $(".my-card-container .contact-us button").addClass("kt-spinner kt-spinner--right kt-spinner--lg kt-spinner--light");
        },
        success: function (response) {
            $(".my-card-container .contact-us .alert-outline-success .alert-text").text(response);
            $(".my-card-container .contact-us .alert-outline-success").fadeIn(500);
        },
        error: function (jqXHR, exception) {
            $(".my-card-container .contact-us .alert-outline-danger .alert-text").text(jqXHR.responseText);
            $(".my-card-container .contact-us .alert-outline-danger").fadeIn(500);
        }
    });

    $(".my-card-container .contact-us button").removeClass("kt-spinner kt-spinner--right kt-spinner--lg kt-spinner--light");
});

$('.my-card-container .floater').on('click', function (e) {
    $('.my-card-container .floater').toggleClass('is-active');
    e.stopPropagation();

    if ($(".my-card-container .floater").hasClass("is-active")) {
        $(".my-card-container .floater__list").css("bottom", "11rem");
    }
    else {
        $(".my-card-container .floater__list").css("bottom", "1000rem");
    }
});

$('.my-card-container').on('click', function () {
    $('.my-card-container .floater').removeClass('is-active');
    $(".my-card-container .floater__list").css("bottom", "1000rem");
});

//$('.my-card-container .highlights-container').owlCarousel({
//    center: true,
//    items: 1,
//    loop: true,
//});

$('.my-card-container .testimonials-container').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
});