!(function ($) {
    "use strict";

    $(document).ready(function () {

        $(".userprofile li span").click(function () {
            window.location.href = "logout.php";
        });

        if (window.location.pathname == "/Magic%20Notes/home.html") {
            $.ajax({
                url: 'getdata.php',
                type: 'post',
                data: {
                    str: "get_user"
                },
                success: function (data) {
                    if (data == "") {
                        window.location.href = "index.html";
                    } else {
                        $(".nav-profile .profilename span").text(data);
                    }
                }
            });

            $.ajax({
                url: 'getdata.php',
                type: 'post',
                data: {
                    str: "get_notes"
                },
                success: function (data) {
                    $(".portfolio-container").html(data);
                }
            });
        }

        if (window.location.pathname == "/Magic%20Notes/contact.html") {
            $.ajax({
                url: 'getdata.php',
                type: 'post',
                data: {
                    str: "get_user"
                },
                success: function (data) {
                    if (data == "") {
                        window.location.href = "index.html";
                    } else {
                        $(".nav-profile .profilename span").text(data);
                    }
                }
            });
        }

    });

    var anim1 = bodymovin.loadAnimation({
        wrapper: document.getElementById("failed-svg"),
        animType: "svg",
        loop: false,
        autoplay: false,
        path: "https://assets4.lottiefiles.com/packages/lf20_0iuu9o.json"
    });

    var anim2 = bodymovin.loadAnimation({
        wrapper: document.getElementById("success-svg"),
        animType: "svg",
        loop: false,
        autoplay: false,
        path: "https://assets6.lottiefiles.com/temp/lf20_xG4aYa.json"
    });

    $(".login-box .login form").on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: 'login.php',
            type: 'post',
            data: $(".login-box .login form").serialize(),
            success: function (data) {
                if (data == "") {

                    $(".login-alert").eq(1).css({
                        transition: "all .2s ease",
                        transform: "scale(1)"
                    });

                    setTimeout(() => {
                        anim1.goToAndPlay(0, true);
                    }, 600);

                    setTimeout(() => {
                        $(".login-alert").eq(1).css({
                            transition: "all .6s ease",
                            transform: "scale(0)"
                        });
                    }, 2000);
                } else {

                    $(".login-alert").first().css({
                        transition: "all .2s ease",
                        transform: "scale(1)"
                    });

                    setTimeout(() => {
                        anim2.goToAndPlay(0, true);
                    }, 600);

                    setTimeout(() => {
                        window.location.href = "home.html";
                    }, 2000);
                }
            }
        });
    });

    // Form Open Animation
    $(".home-btn button#login").on('click', function () {
        $(".login-snip #tab-1").prop("checked", true);
        $(".login-snip #tab-2").prop("checked", false);

        const t1 = gsap.timeline({
            defaults: {
                ease: "power2.out"
            }
        });

        t1.to(".loginbg", {
            x: "0%",
            duration: 0
        });

        t1.fromTo(".loginbg", {
            opacity: "0"
        }, {
            opacity: "1",
            duration: 0
        });

        t1.fromTo(".login-box", {
            x: "200%",
            opacity: "0",
            scale: "0",
        }, {
            x: "0%",
            opacity: "1",
            scale: "1",
            duration: 1.2
        });
    });

    $(".home-btn button#signup").on('click', function () {
        $(".login-snip #tab-1").prop("checked", false);
        $(".login-snip #tab-2").prop("checked", true);

        const t1 = gsap.timeline({
            defaults: {
                ease: "power2.out"
            }
        });

        t1.to(".loginbg", {
            x: "0%",
            duration: 0
        });

        t1.fromTo(".loginbg", {
            opacity: "0"
        }, {
            opacity: "1",
            duration: 0
        });

        t1.fromTo(".login-box", {
            x: "200%",
            opacity: "0",
            scale: "0",
        }, {
            x: "0%",
            opacity: "1",
            scale: "1",
            duration: 1.2
        });
    });

    // Form Close Animation
    $(document).ready(function () {
        $(".loginbg .closelogin").click(function () {
            document.forms.login.reset();
            document.forms.signup.reset();

            const t1 = gsap.timeline({
                defaults: {
                    ease: "power1.out"
                }
            });

            t1.fromTo(".login-box", {
                x: "0%",
                opacity: "1",
                scale: "1",
            }, {
                x: "200%",
                opacity: "0",
                scale: "0",
                duration: 1.2
            });

            t1.fromTo(".loginbg", {
                opacity: "0"
            }, {
                opacity: "1",
                duration: 0
            });

            t1.to(".loginbg", {
                x: "100%",
                duration: 0
            });
        });
    });

    //Show / Hide Password
    $(".toggle-password1").click(function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $(".login input#pass");
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    $(".toggle-password2").click(function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $(".sign-up-form input#pass");
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    $(".services2 textarea.desc").on('focus', function () {
        console.log("hi");
        $(".add-note").addClass('active');
    });

    $(".services2 button.cancel-note").on('click', function () {
        $(".add-note").removeClass('active');
        $(".add-note textarea").val("");
        $(".add-note textarea#noter").css({
            height: "4rem"
        });
    });

    $(".services2 button.set-note").on('click', function () {

        $.ajax({
            url: 'getdata.php',
            type: 'post',
            data: {
                str: "add_note",
                title: $(".services2 textarea.title").val(),
                content: $(".services2 textarea.desc").val()
            },
            success: function (data) {
                // alert(data);
            }
        });

        $.ajax({
            url: 'getdata.php',
            type: 'post',
            data: {
                str: "get_notes"
            },
            success: function (data) {
                $(".portfolio-container").html(data);
            }
        });
    });

    $(".portfolio .portfolio-info .color-note").on('click', function () {
        $(".portfolio .colors").toggleClass('active');
    });

    $(".portfolio .colors span").on('click', function () {
        $(".portfolio .colors").toggleClass('active');

        let color = $(this).css("background-color");
        let id = $(this).parent(".colors").parent(".portfolio-wrap").attr("id");

        $(this).parent(".colors").parent(".portfolio-wrap").css({
            background: color
        });

        $.ajax({
            url: 'getdata.php',
            type: 'post',
            data: {
                str: "set_theme",
                color: color,
                id: id
            },
            success: function (data) {
                alert(data);
            }
        });
    });

    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 2;
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function () {
        if (window.location.hash) {
            var initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');
            }
        }
    });

    // Mobile Navigation
    if ($('.nav-menu').length) {
        var $mobile_nav = $('.nav-menu').clone().prop({
            class: 'mobile-nav d-lg-none'
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');

        $(document).on('click', '.mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').toggle();
        });

        $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
            e.preventDefault();
            $(this).next().slideToggle(300);
            $(this).parent().toggleClass('active');
        });

        $(document).click(function (e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, #mobile-nav');

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop() + 200;

        nav_sections.each(function () {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                }
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
            if (cur_pos < 300) {
                $(".nav-menu ul:first li:first").addClass('active');
            }
        });
    });

    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Porfolio isotope and filter
    $(window).on('load', function () {

        // Initiate venobox 
        $(document).ready(function () {
            $('.venobox').venobox({
                'share': false
            });

            AOS.init();
        });
    });

    // Porfolio isotope and filter
    $(window).on('load', function () {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
        });
    });


})(jQuery);

var otp = '';

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#preloader").style.visibility = "visible";
    } else {
        document.querySelector("#preloader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
}

function getcodeboxelement(index) {
    return document.getElementById("code" + index);
}

function nextcodebox(index, event) {

    var cnt = 0;

    for (let i = 1; i < 5; i++) {
        if (document.getElementById("code" + i).value.length > 0) {
            cnt += 1;
        }
    }

    if (cnt == 4) {
        let getotp = "" + document.getElementById("code1").value + document.getElementById("code2").value + document.getElementById("code3").value + document.getElementById("code4").value;

        if (getotp == otp) {
            // alert("OTP verified");
            document.getElementById("verified").innerText = "";
            document.getElementById("verified").classList.add("spinner-border");

            setTimeout(() => {
                document.getElementById("verified").classList.remove("spinner-border");
                document.getElementById("verified").innerHTML = '<i class="icofont-check-circled" style="font-size:24px; background:none; border-radius:50%; padding: 0px;"></i>';
            }, 1000);
        } else {
            alert("Reenter OTP !");
            document.getElementById("verified").innerText = "";
            document.getElementById("verified").classList.add("spinner-border");

            setTimeout(() => {
                document.getElementById("verified").classList.remove("spinner-border");
                document.getElementById("verified").innerText = 'Get OTP';
            }, 1000);
        }
    }
    if (getcodeboxelement(index).value.length === 1) {
        if (index !== 4) {

            document.getElementById("code" + (index + 1)).disabled = false;
            getcodeboxelement(index + 1).focus();
        } else {
            getcodeboxelement(index).blur();
        }
    }
}

// Send OTP to entered email id
function sendotp() {

    if (document.getElementById("verified").innerText == "Get OTP") {

        var email = document.forms["signup"]["email"].value;
        if (email == "") {
            alert("Please enter Email Id");
            return;
        }

        var res = /^[a-z0-9]{5,}\@gmail\.com$/.test(email);
        if (res === true) {
            otp = "";
            var digits = '0123456789';
            for (let i = 0; i < 4; i++) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            var sub = "One Time Password (OTP) Confirmation - Magic Notes ";
            var Body = "<p>Please use Following OTP Code: <span style='color:red; font-size: 24px;'><u><b>" + otp + "</b></u> </span> to complete your Sign Up Process in Magic Notes</p>";

            Email.send({
                SecureToken: "fbf31702-bb7f-4a4e-9c1c-4ccf17ee777f",
                To: email,
                From: "magicnotes.g2@gmail.com",
                Subject: sub,
                Body: Body
            }).then(
                message => {
                    if (message == 'OK') {
                        alert('OTP has been Send Successfully to ' + email);
                    } else {
                        console.error(message);
                        alert('There is error at sending OTP. ');
                    }
                }
            );
        } else {
            alert("Please, Enter a Valid Email Id");
        }
    }
}

function sign(event) {
    event.preventDefault();

    var c1 = document.forms["signup"]["code1"].value;
    var c2 = document.forms["signup"]["code2"].value;
    var c3 = document.forms["signup"]["code3"].value;
    var c4 = document.forms["signup"]["code4"].value;

    var getotp = "" + c1 + c2 + c3 + c4;

    if (getotp != otp) {
        alert("Invalid OTP !");
        return;
    } else {
        document.forms["signup"].action = "signup.php";
    }

    $.ajax({
        url: 'signup.php',
        type: 'post',
        data: $(".login-box .sign-up-form form").serialize(),
        success: function (data) {
            
            if (data == "") {
                alert("Please, Try Again !");
            } else {
                alert(data);
                window.location.href = "home.html";
            }
        }
    });
}

var textarea = document.querySelector("#noter");
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

function search() {
    let search = document.getElementsByTagName('input')[0];
    // console.log(search)
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('portfolio-item');
    // console.log(noteCards)
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h2")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h1")[0].innerText.toLowerCase();
        // console.log(cardTxt)
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

function sendfeed(event) {

    event.preventDefault();
    var email = document.forms["contact"]["email"].value;
    var body = 'Feedback :<br><br><span style="color: black;text-shadow: 1px 1px 0px #dd0e61;font-size: 20px;">' + document.forms["contact"]["message"].value + '</span><br><br>';
    var uname = document.forms["contact"]["name"].value;
    var phno = document.forms["contact"]["phone"].value;

    if (phno != "") {
        body += '<span style="padding: 5px;">Contact : ' + phno + '</span>';
    }

    Email.send({
        SecureToken: "fbf31702-bb7f-4a4e-9c1c-4ccf17ee777f",
        To: "magicnotes.g2@gmail.com",
        From: email,
        Subject: "Feedback from " + uname,
        Body: '<!DOCTYPE html><html><body><h3 style="color:black;border: 1px solid #dd0e61;padding: 20px;width: 500px;height: auto;overflow: hidden;overflow-wrap: break-word;text-align: justify;background: linear-gradient(to right bottom, aquamarine 30%, cyan);">' + body + '</h3></body></html>'
    }).then(
        message => {
            if (message == 'OK') {
                alert("Feedback submitted successfully!");
                document.forms["contact"].reset();
            } else {
                console.error(message);
                alert('There is error at sending message. ');
            }
        }
    );
}