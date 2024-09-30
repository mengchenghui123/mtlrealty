/*
Author       : Code-Theme
Template Name: Bitcoin - HTML5 Template
Version      : 1.0
*/

jQuery(document).on(
  "ready",
  (function ($) {
    "use strict";

    /*---------------------------------
     //------ PRELOADER ------//
     ----------------------------------*/
    $("#status").fadeOut();
    $("#preloader").delay(200).fadeOut("slow");

    /*---------------------------------
     //------ ANIMATE HEADER ------//
     ----------------------------------*/
    $(window).scroll(function () {
      var nav = $(".heading-3");
      var scroll = $(window).scrollTop();

      if (scroll >= 80) {
        nav.addClass("bg-menu");
      } else {
        nav.removeClass("bg-menu");
      }
    });

    $(window).scroll(function () {
      var nav = $(".heading-6");
      var scroll = $(window).scrollTop();

      if (scroll >= 80) {
        nav.addClass("bg-menu");
      } else {
        nav.removeClass("bg-menu");
      }
    });
  })(jQuery)
);
