/* ----------------- Start Document ----------------- */
(function ($) {
  "use strict";

  $(document).ready(function () {
    /*----------------------------------------------------*/
    /*  Tabs
	/*----------------------------------------------------*/

    var $tabsNav = $(".tabs-nav"),
      $tabsNavLis = $tabsNav.children("li");

    $tabsNav.each(function () {
      var $this = $(this);

      $this
        .next()
        .children(".tab-content")
        .stop(true, true)
        .hide()
        .first()
        .show();

      $this.children("li").first().addClass("active").stop(true, true).show();
    });

    $tabsNavLis.on("click", function (e) {
      var $this = $(this);

      $this.siblings().removeClass("active").end().addClass("active");

      $this
        .parent()
        .next()
        .children(".tab-content")
        .stop(true, true)
        .hide()
        .siblings($this.find("a").attr("href"))
        .fadeIn();

      e.preventDefault();
    });
    var hash = window.location.hash;
    var anchor = $('.tabs-nav a[href="' + hash + '"]');
    if (anchor.length === 0) {
      $(".tabs-nav li:first").addClass("active").show(); //Activate first tab
      $(".tab-content:first").show(); //Show first tab content
    } else {
      console.log(anchor);
      anchor.parent("li").click();
    }

    /*----------------------------------------------------*/
    /*	Toggle
	/*----------------------------------------------------*/

    $(".toggle-container").hide();

    $(".trigger, .trigger.opened").on("click", function (a) {
      $(this).toggleClass("active");
      a.preventDefault();
    });

    $(".trigger").on("click", function () {
      $(this).next(".toggle-container").slideToggle(300);
    });

    $(".trigger.opened").addClass("active").next(".toggle-container").show();

    /*----------------------------------------------------*/
    /* Panel Dropdown
	/*----------------------------------------------------*/
    function close_panel_dropdown() {
      $(".panel-dropdown").removeClass("active");
      $(".fs-inner-container.content").removeClass("faded-out");
    }

    $(".panel-dropdown a").on("click", function (e) {
      if ($(this).parent().is(".active")) {
        close_panel_dropdown();
      } else {
        close_panel_dropdown();
        $(this).parent().addClass("active");
        $(".fs-inner-container.content").addClass("faded-out");
      }

      e.preventDefault();
    });

    // Apply / Close buttons
    $(".panel-buttons button").on("click", function (e) {
      $(".panel-dropdown").removeClass("active");
      $(".fs-inner-container.content").removeClass("faded-out");
    });

    // Closes dropdown on click outside the conatainer
    var mouse_is_inside = false;

    $(".panel-dropdown").hover(
      function () {
        mouse_is_inside = true;
      },
      function () {
        mouse_is_inside = false;
      }
    );

    $("body").mouseup(function () {
      if (!mouse_is_inside) close_panel_dropdown();
    });

    // Adjusting Panel Dropdown Width
    $(window).on("load resize", function () {
      var panelTrigger = $(".booking-widget .panel-dropdown a");
      $(".booking-widget .panel-dropdown .panel-dropdown-content").css({
        width: panelTrigger.outerWidth(),
      });
    });

    // ------------------ End Document ------------------ //
  });
})(this.jQuery);
