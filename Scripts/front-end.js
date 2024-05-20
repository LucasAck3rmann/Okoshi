$(window).bind("load", function () {

    $(".site").removeAttr("style");

    $("link[rel='preload']").each(function () {
        $(this).attr("rel", "stylesheet");
    });

    //pre loading
    $(".loading").fadeOut(300, function () {

        if (!$("body").hasClass("inner")) {
            var hash = document.location.hash;

            if (hash != "") {
                $("ul.main-menu li a[href='/" + hash + "']").click();
            }
        }
    });

    //scroll anchor
    if ($("body").hasClass("inner")) {
        var hash = document.location.hash.replace("#", "");

        if (hash != "" && hash != "recuperar-senha") {
            var position = $("[data-anchor='" + hash + "']").offset().top;

            $("html, body").stop().animate({ scrollTop: position - 49 }, 1000);
        }
        else if (hash == "recuperar-senha") {
            $(".page-content>.content .default-form fieldset a.link.forget-password").click();
        }
    }

    if ((navigator.userAgent).match(/Mobile/i)) {
        //reset bg fixed for mobile
        resetBgFixed();
    }

    if ($("body").hasClass("home") || $(".inner-page").hasClass("about-us")) {
        //start paralaxe
        if (!(navigator.userAgent).match(/Mobile/i)) {

            var windowHeight = $(window).height();

            var s = skrollr.init({
                constants: {
                    x1: windowHeight,
                    x2: windowHeight * 2,
                    x3: windowHeight * 3,
                    x4: windowHeight * 4,
                    x5: windowHeight * 5,
                    x6: windowHeight * 6,
                    x7: windowHeight * 7,
                    x8: windowHeight * 8,
                    x9: windowHeight * 9,
                    x10: windowHeight * 10
                }
            });
        }
    }

    //about us resize
    function aboutUsResize() {

        var screenWidth = $(window).width();

        if (screenWidth < 1980) {
            var scale = screenWidth / 1980;

            $("section.about-us .background [class*='person-']").each(function (i) {
                $(this).removeAttr("style");

                var width = $(this).width();
                var height = $(this).height();
                $(this).css({ "width": width * scale, "height": height * scale, "background-size": "cover" });

                var marginLeft = $(this).css("margin-left");

                $(this).css("margin-left", (parseInt(marginLeft.replace("px", "")) * scale) + "px");

            });
        }
    }

    if (!(navigator.userAgent).match(/Mobile/i)) {
        if ($("section.about-us").length > 0) {

            $("body").addClass("re-scale-about-us");

            $(window).scroll(function () {
                if ($("body").hasClass("re-scale-about-us")) {
                    aboutUsResize();
                    $("body").removeClass("re-scale-about-us");
                }
            });

            $(window).resize(function () {
                aboutUsResize();
            });

            //about us click
            $("section.about-us .content .open-button").click(function (e) {
                e.preventDefault();

                $(this).parents("section").addClass("active");
            });
        }
    }


    //contact
    if ($("footer .content .form-grid .form-tabs li").length > 0) {
        $("footer .content .form-grid .form-tabs li").each(function (i) {
            $(this).click(function () {
                $(this).parent().find("li").removeClass("active");
                $(this).addClass("active");

                $("footer .content .form-grid .form-item").slideUp(500);
                $("footer .content .form-grid .form-item").eq(i).slideDown(500);
            });
        });

        $("footer .content .form-grid .form-tabs li:first").click();
    }

    //menu click
    $("ul.main-menu li a[data-link-home='true']").click(function (e) {
        e.preventDefault();

        var url = $(this).attr("href").replace("/", "").replace("#", "");

        if ($("body").hasClass("home")) {
            window.location.hash = "#" + url;
        }

        if (url == "sac") {
            var distance = $("footer").offset().top - $("header").height();

            $("footer .content .form-grid .form-tabs li").eq(0).click();

        }
        else if (url == "quero-revender") {
            var distance = $("footer").offset().top - $("header").height();

            $("footer .content .form-grid .form-tabs li").eq(1).click();
        }
        else {
            if ($("body").hasClass("home")) {
                var distance = $("[data-section-name='" + url + "']").offset().top - $("header").height();
            }
            else {
                document.location.href = "/#" + url;
            }
        }

        $("html,body").animate({ scrollTop: distance }, 'slow');

        if ($("header").hasClass("menu-opened")) {
            $("header").removeClass("menu-opened");
        }
    });



    //menu button mobile
    if ((navigator.userAgent).match(/Mobile/i)) {
        $("header .menu-button").click(function () {
            $("header").toggleClass("menu-opened");
        });
    }


    //home banner
    if ($("section.home").length > 0) {
        index = 0;
        rotative = true;
        staticTime = 12000;
        transitionTime = 500;
        currentBanner = null;

        $("section.home .walk .item:visible").each(function () {
            $("section.home .nav-buttons").append("<li/>");
        });

        $("section.home .nav-buttons li").each(function (i) {
            $(this).click(function () {
                clearInterval(currentBanner);
                index = i;
                animateBanner(index);
            });
        });

        $("section.home .arrow-button").click(function () {
            clearInterval(currentBanner);

            if ($(this).hasClass("next")) {
                index = ++index % $("section.home .walk .item:visible").length;
            }
            else {
                index = --index % $("section.home .walk .item:visible").length;
            }

            animateBanner(index);
        });

        if ((navigator.userAgent).match(/Mobile/i)) {
            $("section.home").swipe({
                swipe: function (event, direction, distance, duration, fingerCount) {
                    clearInterval(currentBanner);

                    if (direction == "left") {
                        index = ++index % $("section.home .walk .item:visible").length;
                    }
                    else if (direction == "right") {
                        index = --index % $("section.home .walk .item:visible").length;
                    }
                    animateBanner(index);
                },
                excludedElements: "button, input, select, textarea, .noSwipe",
                threshold: 50,
                allowPageScroll: "vertical"
            });
        }

        function animateBanner(i) {
            $("section.home .nav-buttons li").removeClass("active");
            $("section.home .nav-buttons li").eq(i).addClass("active");

            var position = $("section.home .walk .item:visible").eq(i).position().left;
            $("section.home .walk").animate({ "left": -position }, 700);

            if ($("body").hasClass("lazy-loading")) {
                if (i > 0) {
                    lazyLoading();
                }
            }
        };

        function tempoBanner() {
            if (currentBanner != null) {
                clearInterval(currentBanner);
            }

            currentBanner = setInterval(function () {
                index = ++index % $("section.home .walk .item:visible").length;
                animateBanner(index);
            }, staticTime);
        };
        if (rotative == true) {
            tempoBanner();
        };

        animateBanner(0);
    }


    //go to page
    $(".go-to-page").each(function () {
        $(this).click(function (e) {
            e.preventDefault();

            var url = $(this).attr("href").replace("#", "").replace("/", "");

            var distance = $("[data-section-name='" + url + "']").offset().top;

            console.log(distance);

            if (!(navigator.userAgent).match(/Mobile/i)) {

                $("html,body").animate({ scrollTop: distance }, 'slow');

            }
            else {
                $("html,body").animate({ scrollTop: distance - 60 });
            }
        });
    });


    ///////////////////////////////////////INNER PAGES///////////////////////////////////////

    //product-gallery
    if ($(".product-excerpt .gallery .slide .grid .walk figure").length > 1) {

        picQtt = $(".product-excerpt .gallery .slide .grid .walk figure").length;
        picIndex = 0;

        $(".product-excerpt .gallery .slide .nav-button").click(function () {
            if ($(this).hasClass("next")) {
                if (picIndex < (picQtt - 1)) {
                    picIndex = picIndex + 1;
                }
                else {
                    picIndex = 0;
                }
            }

            else {
                if (picIndex > 0) {
                    picIndex = picIndex - 1;
                }
                else {
                    picIndex = picQtt - 1;
                }
            }

            animatePicGallery(picIndex);
        });


        $(".product-excerpt .gallery .thumbs li").each(function (i) {
            $(this).click(function () {
                picIndex = i;
                animatePicGallery(picIndex);
            });
        });

    }
    else {
        $(".product-excerpt .gallery .slide .nav-button").remove();
    }

    //product tabs
    if ((navigator.userAgent).match(/Mobile/i)) {
        if ($(".product-details .content .accordion").length > 0) {

            $(".product-details .content .accordion .ac-item").each(function (i) {

                var acIndex = i;

                $(this).find(".ac-title").click(function (e) {
                    e.preventDefault();

                    $(".product-details .content .accordion .ac-item").each(function (i) {
                        if (i != acIndex) {
                            $(this).removeClass("active");
                            $(this).find(".ac-content").slideUp(300);
                        }
                        else {
                            $(this).addClass("active");
                            $(this).find(".ac-content").slideDown(300);
                        }
                    });
                });
            });

            $(".product-details .content .accordion .ac-item:first .ac-title").click();
        }
    }
    else {
        if ($(".product-details .content .accordion").length > 0) {

            $(".product-details .content").append("<ul class='tabs' />");

            $(".product-details .content .accordion .ac-item").each(function () {
                var tabName = $(this).find(".ac-title").html();
                var tabContent = $(this).find(".ac-content").html();

                $(this).parents(".content").find(".tabs").append("<li>" + tabName + "</li>");
                $(this).parents(".content").append("<div class='tab-item'><div class='grid'>" + tabContent + "</div></div>");

            });

            $(".product-details .content .accordion").remove();


            //click on tab
            $(".product-details .content .tabs li").each(function (i) {

                $(this).click(function () {
                    $(this).parent().find("li").removeClass("active");
                    $(this).addClass("active");

                    $(".product-details .content .tab-item").slideUp(300);
                    $(".product-details .content .tab-item").eq(i).slideDown(300);
                });
            });

            $(".product-details .content .tabs li:first").click();
        }
    }

    //related products
    //others
    if ($(".related-products-slide").length > 0) {
        relatedIndex = 0;
        relatedQttPerPage = 2;
        if (!(navigator.userAgent).match(/Mobile/i)) {
            relatedQttPerPage = 4;
        }
        relatedTotalQtt = $(".related-products-slide .grid .walk article").length;

        $(".related-products-slide .nav-button").click(function (e) {
            e.preventDefault();

            if ($(this).hasClass("prev")) {

                if (relatedIndex > 0) {
                    relatedIndex -= relatedQttPerPage;
                    relatedIndex = relatedIndex % (relatedTotalQtt * relatedQttPerPage);
                }

            } else if ($(this).hasClass("next")) {
                if (((relatedIndex + relatedQttPerPage) % (relatedTotalQtt * relatedQttPerPage)) < relatedTotalQtt) {
                    relatedIndex += relatedQttPerPage;
                    relatedIndex = relatedIndex % (relatedTotalQtt * relatedQttPerPage);
                }
            }

            animateRelated(relatedIndex);
        });

        function animateRelated(i) {
            var position = $(".related-products-slide .grid .walk article").eq(i).position().left;
            $(".related-products-slide .grid .walk").stop().animate({
                "left": -position
            }, 400);
        }
    }
});

function animatePicGallery(i) {
    $(".product-excerpt .gallery .thumbs li").removeClass("active")
    $(".product-excerpt .gallery .thumbs li").eq(i).addClass("active");

    var position = $(".product-excerpt .gallery .slide .grid .walk figure").eq(i).position().left;
    $(".product-excerpt .gallery .slide .grid .walk").stop().animate({ "left": -position }, 400);
}

function resetBgFixed() {
    $("*").each(function () {
        if ($(this).css("background-attachment") == "fixed") {
            $(this).css("background-attachment", "scroll");
        }
    });
}