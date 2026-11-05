/*
 *
 * JS Script
 * @DynamicLayers
 */

(function ($) {
    "use strict";

    /* ======= Preloader ======= */
    $(window).on('load', function () {
        $('body').addClass('loaded');
    });

    $(document).ready(function () {

        /* ======= Header ======= */
        var primaryHeader = $('.primary-header'),
            headerClone = primaryHeader.clone();
        $('.header').after('<div class="sticky-header"></div>');
        $('.sticky-header').html(headerClone);
        var headerSelector = document.querySelector(".sticky-header");
        var headroom = new Headroom(headerSelector, {
            offset: 100
        });
        headroom.init();
        if ($('.primary-header').length) {
            $('.header .primary-header .burger-menu').on("click", function () {
                $(this).toggleClass('menu-open');
                $('.header .header-menu-wrap').slideToggle(300);
            });

            $('.sticky-header .primary-header .burger-menu').on("click", function () {
                $(this).toggleClass('menu-open');
                $('.sticky-header .header-menu-wrap').slideToggle(300);
            });
        }

        $('.header-menu-wrap ul li:has(ul)').each(function () {
            $(this).append('<span class="dropdown-plus"></span>');
            $(this).addClass('dropdown_menu');
        });

        $('.header-menu-wrap .dropdown-plus').on("click", function () {
            $(this).prev('ul').slideToggle(300);
            $(this, ).toggleClass('dropdown-open');
            $('.header-menu-wrap ul li:has(ul)').toggleClass('dropdown-open');
        });

        $('.header-menu-wrap .dropdown_menu a').append('<span></span>');

        // Responsive Classes
        function responsiveClasses() {
            var body = $('body');
            if ($(window).width() < 992) {
                body.removeClass('viewport-lg');
                body.addClass('viewport-sm');
            } else {
                body.removeClass('viewport-sm');
                body.addClass('viewport-lg');
            }
        }

        // Transparent Header
        function transparentHeader() {
            if ($('body').hasClass('header-3')) {
                var stickyHeader = $('.header-3 .header .header-logo'),
                    stickyHeaderLogo = stickyHeader.data('sticky-logo');
                if ('' != stickyHeaderLogo) {
                    $(".header-3 .sticky-header .header-logo img").attr('src', stickyHeaderLogo);
                }
            }
            var header = $('.header.header-three'),
                headerHeight = header.height(),
                pageHeader = $('.page-header');
            pageHeader.css('padding-top', headerHeight + 'px');
        }

        //responsiveClasses();
        $(window).on("resize", function () {
            responsiveClasses();
            transparentHeader();
        }).resize();

        /* ========== Popup Search Box ========== */
        $(function () {
            $('#dl-popup-search-box').removeClass('toggled');

            $('.dl-search-icon').on('click', function (e) {
                e.stopPropagation();
                $('#dl-popup-search-box').toggleClass('toggled');
                $("#popup-search").focus();
            });

            $('#dl-popup-search-box input').on('click', function (e) {
                e.stopPropagation();
            });

            $('#dl-popup-search-box, body').on('click', function () {
                $('#dl-popup-search-box').removeClass('toggled');
            });
        });

        // Header BTN Effect
        $('.header-btn').on('mouseenter', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({
                top: relY,
                left: relX
            })
        }).on('mouseout', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({
                top: relY,
                left: relX
            })
        });

        /* Smooth Scrolling */
        $('a[href*="#"]').smoothscroll({
            duration: 400
        });

        /* Scroll to Top */
        var scrollTop = $("#scroll-top");
        $(window).on('scroll', function () {
            var topPos = $(this).scrollTop();
            if (topPos > 100) {
                $('#scrollup').removeClass('hide');
                $('#scrollup').addClass('show');

            } else {
                $('#scrollup').removeClass('show');
                $('#scrollup').addClass('hide');
            }
        });

        /* Click event to scroll to top */
        $(scrollTop).on("click", function () {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        /* ======= Main Slider ======= */
        $(document).ready(function () {

            $('#main-slider').on('init', function (e, slick) {
                var $firstAnimatingElements = $('div.single-slide:first-child').find('[data-animation]');
                doAnimations($firstAnimatingElements);
            });
            $('#main-slider').on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                var $animatingElements = $('div.single-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
                doAnimations($animatingElements);
            });
            $('#main-slider').slick({
                autoplay: true,
                autoplaySpeed: 10000,
                dots: true,
                fade: true,
                prevArrow: '<div class="slick-prev"><i class="fa fa-chevron-left"></i></div>',
                nextArrow: '<div class="slick-next"><i class="fa fa-chevron-right"></i></div>'
            });

            function doAnimations(elements) {
                var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                elements.each(function () {
                    var $this = $(this);
                    var $animationDelay = $this.data('delay');
                    var $animationType = 'animated ' + $this.data('animation');
                    $this.css({
                        'animation-delay': $animationDelay,
                        '-webkit-animation-delay': $animationDelay
                    });
                    $this.addClass($animationType).one(animationEndEvents, function () {
                        $this.removeClass($animationType);
                    });
                });
            }
        });

        /* ======= Button Effect ======= */
        $('.default-btn').on('mouseenter', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({
                top: relY,
                left: relX
            })
        }).on('mouseout', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({
                top: relY,
                left: relX
            })
        });

        /* ======= Odometer ======= */
        $('.odometer').waypoint(
            function () {
                var odo = $(".odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            }, {
                offset: "80%",
                triggerOnce: true
            }
        );

        /* ======= ISOTOP Active ======= */
        $('.project-items').imagesLoaded(function () {

            // Add isotope click function
            $('.project-filter li').on('click', function () {
                $(".project-filter li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr('data-filter');
                $(".project-items").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });

            $(".project-items").isotope({
                itemSelector: '.single-item',
                layoutMode: 'masonry',
            });
        });
        
        /* ======= CurrentYear ======= */
        var currentYear = new Date().getFullYear();
        $('#currentYear').append(currentYear);

        /* ======= WOW Active ======= */
        new WOW().init();

        /* ======= Venobox Active ======= */

        $('.venobox').venobox();

        /* ======= Testimonials ======= */
        $('.testimonials-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: '<i class="fa fa-chevron-left left"></i>',
            nextArrow: '<i class="fa fa-chevron-right right"></i>',
            infinite: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
            },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            }
        ]
        });

        /* ======= Testimonials ======= */
        $('.testimonials-carousel-2').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<i class="fa fa-chevron-left left"></i>',
            nextArrow: '<i class="fa fa-chevron-right right"></i>',
            infinite: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
            },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            }
        ]
        });

        /* ======= Portfolio ======= */
        $('.portfolio-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<i class="fa fa-chevron-left left"></i>',
            nextArrow: '<i class="fa fa-chevron-right right"></i>',
            infinite: true,
            dots: false,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
            },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            }
        ]
        });

        /* ======= Sponsor ======= */
        $('.sponsor-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 1,
            prevArrow: '<i class="fa fa-chevron-left left"></i>',
            nextArrow: '<i class="fa fa-chevron-right right"></i>',
            infinite: true,
            dots: false,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 6,
                    }
            },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
            },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
            }
        ]
        });

        /* ======= Project ======= */
        $('.project-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<i class="fa fa-chevron-left left"></i>',
            nextArrow: '<i class="fa fa-chevron-right right"></i>',
            infinite: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
            },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
            },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
            },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
            }
        ]
        });

        /* ======= Project ======= */
        $('.project-carousel-2').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<i class="fa fa-chevron-left left"></i>',
            nextArrow: '<i class="fa fa-chevron-right right"></i>',
            infinite: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                    }
            },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
            },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
            },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
            }
        ]
        });

        /* ======= MAILCHIMP ======= */
        if ($('.subscribe_form').length > 0) {
            /*  MAILCHIMP  */
            $('.subscribe_form').ajaxChimp({
                language: 'es',
                callback: mailchimpCallback,
                url: "//alexatheme.us14.list-manage.com/subscribe/post?u=48e55a88ece7641124b31a029&amp;id=361ec5b369"
            });
        }

        function mailchimpCallback(resp) {
            if (resp.result === 'success') {
                $('#subscribe-result').addClass('subs-result');
                $('.subscription-success').text(resp.msg).fadeIn();
                $('.subscription-error').fadeOut();

            } else if (resp.result === 'error') {
                $('#subscribe-result').addClass('subs-result');
                $('.subscription-error').text(resp.msg).fadeIn();
            }
        }
        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: 'We have sent you a confirmation email',
            1: 'Please enter your email',
            2: 'An email address must contain a single @',
            3: 'The domain portion of the email address is invalid (the portion after the @: )',
            4: 'The username portion of the email address is invalid (the portion before the @: )',
            5: 'This email address looks fake or invalid. Please enter a real email address'
        };
    });


})(jQuery);
