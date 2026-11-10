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
        var mobileHeader = window.matchMedia('(max-width: 992px)');
        $('.primary-header').each(function (index) {
            var header = $(this);
            var menu = header.find('.header-menu-wrap');
            var toggle = header.find('.burger-menu');
            var menuId = 'site-navigation-' + index;
            var menuPosition = document.createComment('Site navigation position');
            var drawer = document.createElement('dialog');
            drawer.className = 'site-menu-drawer';
            drawer.id = 'site-menu-drawer-' + index;
            drawer.setAttribute('aria-label', 'Main navigation');
            drawer.innerHTML = '<div class="site-menu-drawer-content"><div class="site-menu-drawer-heading"><strong>Menu</strong><button type="button" class="site-menu-drawer-close" aria-label="Close navigation" autofocus>&times;</button></div></div>';
            var drawerContent = drawer.firstElementChild;
            var brochure = header.find('.header-btn').first().clone().removeClass('header-btn').addClass('site-menu-brochure');
            menu.before(menuPosition);
            header.append(drawer);
            menu.attr('id', menuId);
            toggle.attr({ 'aria-controls': drawer.id, 'aria-haspopup': 'dialog' });

            function setMenu(open) {
                toggle.toggleClass('menu-open', open).attr('aria-expanded', String(open));
                menu.toggleClass('menu-visible', open);
                if (open) {
                    $(drawerContent).append(menu, brochure);
                    document.documentElement.classList.add('site-menu-open');
                    drawer.showModal();
                    drawer.scrollTop = 0;
                } else {
                    if (drawer.open) drawer.close();
                    if (drawerContent.contains(menu[0])) menu.insertAfter(menuPosition);
                    document.documentElement.classList.remove('site-menu-open');
                    menu.find('.dropdown-open').removeClass('dropdown-open');
                    menu.find('.dropdown-plus').attr('aria-expanded', 'false');
                }
            }

            toggle.on('click', function () {
                if (mobileHeader.matches) setMenu(!drawer.open);
            });
            drawer.querySelector('.site-menu-drawer-close').addEventListener('click', function () { setMenu(false); });
            drawer.addEventListener('click', function (event) {
                if (event.target === drawer) setMenu(false);
            });
            drawer.addEventListener('cancel', function (event) {
                event.preventDefault();
                setMenu(false);
            });
            menu.on('click', 'a', function () {
                if (drawer.open) setMenu(false);
            });
            menu.find('li').has('> ul').each(function (itemIndex) {
                var item = $(this);
                var label = item.children('a').first().text().trim();
                var submenuId = menuId + '-' + itemIndex;
                item.addClass('dropdown_menu').children('ul').attr('id', submenuId);
                $('<button type="button" class="dropdown-plus"></button>')
                    .attr({ 'aria-controls': submenuId, 'aria-expanded': 'false', 'aria-label': label + ' submenu' })
                    .appendTo(item)
                    .on('click', function () {
                        var open = !item.hasClass('dropdown-open');
                        item.toggleClass('dropdown-open', open);
                        $(this).attr('aria-expanded', String(open));
                    });
            });
            mobileHeader.addEventListener('change', function () { setMenu(false); });
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

        //responsiveClasses();
        $(window).on("resize", function () {
            responsiveClasses();
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

        /* ======= Homepage carousel ======= */
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function startCarousel(selector, options) {
            var carousel = $(selector);
            if (!carousel.length) return;

            carousel.slick($.extend({
                autoplay: !reduceMotion,
                autoplaySpeed: 3000,
                speed: reduceMotion ? 0 : 300,
                pauseOnHover: true,
                pauseOnFocus: true
            }, options));

        }

        startCarousel('#main-slider', {
            autoplaySpeed: 2500,
            dots: true,
            fade: true,
            prevArrow: '<button type="button" class="slick-prev" aria-label="Previous product slide"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
            nextArrow: '<button type="button" class="slick-next" aria-label="Next product slide"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>'
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
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="left" aria-label="Previous logos"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
            nextArrow: '<button type="button" class="right" aria-label="Next logos"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
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
