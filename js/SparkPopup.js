/* ===========================================================
 * SparkPopup.js initial version
 * ===========================================================
 * Copyright 2022 Soufiane Assaadi.
 *
 * https://github.com/SoufAsd/Spark-Pop-up
 *
 * ========================================================== */

! function($) {

    var defaults = {
        direction: "bottom",
        animation: "vertical",
        type: "success",
        button: "ok"
    };

    var types = {
        danger: "linear-gradient(to right, #eb3349 0%, #f45c43 100%)",
        success: "linear-gradient(to right, #0eb98f 0%, rgb(66, 225, 137) 100%)",
        warning: "linear-gradient(to right, #FEBC00 0%, #FE9002 100%)",
    }

    $.fn.SparkPopup = function(options) {

        var settings = $.extend({}, defaults, options),
            el = $(this);

        el.addClass("spark-popup sp-" + settings.direction + " sp-" + settings.animation)
        el.wrapInner("<div class='spark-popup-wrapper'></div>")
        el.find(".spark-popup-wrapper").append("<nav class='main'></nav><nav class='type'></nav>");

        el.find("nav").addClass("spark-popup-nav").wrapInner("<div class='nav-inner'></div>");

        $.fn.openSpark = function() {
            el.addClass("opened").addClass("visible")
            $(".spark-popup .spark-popup-nav:nth-child(2)").css("background-image", types[settings.type])
            $(".spark-popup .spark-popup-nav:nth-child(2)").append('<div class="close-button"><div class="leftright"></div><div class="rightleft"></div></div>')
            $(".spark-popup .spark-popup-nav:nth-child(2)").append("<div class='circle'></div><div class='shadow scale'></div>")
            $(".circle").append('<img src="img/' + settings.type + '.svg" class="shape" />')
            $(".spark-popup .spark-popup-nav:nth-child(2)").append('<button class="confirmebutton" role="button"><span class="text">' + settings.button + '</span></button>')
            if (!$("body").hasClass("spark-is-activate")) {
                if ($(".spark-popup-overlay").length < 1) $("<div class='spark-popup-overlay'></div>").hide().prependTo("body")
                $(".spark-popup-overlay").fadeIn("fast", function() {
                    $("body").addClass("spark-is-activate")

                    var fired = false;
                    $("body").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
                        if (!fired) {
                            fired = true;
                            $(".spark-popup .spark-popup-nav").addClass("animated");
                            $(".spark-popup .spark-popup-nav").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
                                if (e.originalEvent.propertyName == '-webkit-transform' || e.originalEvent.propertyName == 'transform' || e.originalEvent.propertyName == '-o-transform' || e.originalEvent.propertyName == '-moz-transform') {
                                    $(".spark-popup").addClass("re-rotate")

                                    $(".close-button").click(function() {
                                        el.closeSpark();
                                        return false;
                                    });

                                    $(".confirmebutton").click(function() {
                                        el.closeSpark();
                                        return false;
                                    });

                                    $(".spark-popup .spark-popup-nav:first-child .nav-inner").addClass("animated toLeft")
                                    $(".spark-popup .spark-popup-nav:nth-child(2) .nav-inner").addClass("animated toRight")
                                    $(".spark-popup-overlay:not(.clicked)").addClass("clicked").click(function() {
                                        el.closeSpark();
                                    });
                                }
                            });
                        }
                    });
                });
            } else {
                el.closeSpark();
            }
        }

        $.fn.closeSpark = function() {

            $(".spark-popup").addClass("animated").removeClass("re-rotate")
            $(".spark-popup .sm-close").remove()
            $(".circle").remove()
            $(".close-button").remove()
            $(".shadow").remove()
            $(".confirmebutton").remove()
            $(".spark-popup .spark-popup-nav:first-child .nav-inner").removeClass("animated toLeft")
            $(".spark-popup .spark-popup-nav:nth-child(2) .nav-inner").removeClass("animated toRight")

            if ($("body").hasClass("spark-is-activate")) {
                $(".spark-popup").find(".spark-popup-nav").removeClass("animated")
                $(".spark-popup").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    $("body").removeClass("spark-is-activate").find(".spark-popup").removeClass("visible")
                });
            }
        }
    }
}(window.$);