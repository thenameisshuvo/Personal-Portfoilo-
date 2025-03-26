$(function () {
  var $grid = $(".gridder").isotope({
    itemSelector: ".grid-item",
    percentPosition: true,
  });

  // filter items on button click
  $(".filterable-button").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });

  $(".testi-carousel").owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    items: 1,
  });

  // Nice select
  $(".vg-select").niceSelect();

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Page animation initialize
  new WOW().init();

  // Back to top
  var backTop = $(".btn-back_to_top");

  $(window).scroll(function () {
    if ($(document).scrollTop() > 400) {
      backTop.css("visibility", "visible");
    } else if ($(document).scrollTop() < 400) {
      backTop.css("visibility", "hidden");
    }
  });

  backTop.click(function () {
    $("html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
    return false;
  });

  $.fn.toggleSelected = function (options) {
    var defaults = $.extend({
      classes: "selected",
      itemSelector: this.children(),
    });

    return this.each(function () {
      var o = defaults;
      var sel = o.itemSelector;

      sel.click(function () {
        var self = $(this);
        self.addClass(o.classes);
        self.siblings().removeClass(o.classes);
      });
    });
  };

  $('[data-toggle="selected"]').toggleSelected();
});

$(document).ready(function () {
  /* Sticky nvigation */

  var sticky = {
    $sticky: $(".sticky"),
    offsets: [],
    targets: [],
    stickyTop: null,

    set: function () {
      var self = this;

      var windowTop = Math.floor($(window).scrollTop());

      self.offsets = [];
      self.targets = [];

      // Get current top position of sticky element
      self.stickyTop = self.$sticky.data("offset")
        ? self.$sticky.css("position", "absolute").data("offset")
        : self.$sticky.css("position", "absolute").offset().top;

      // Cache all targets and their top positions
      self.$sticky
        .find("a")
        .map(function () {
          var $el = $(this),
            href = $el.data("target") || $el.attr("href"),
            $href = /^#./.test(href) && $(href);

          return $href && $href.length && $href.is(":visible")
            ? [[$href[0].getBoundingClientRect().top + windowTop, href]]
            : null;
        })
        .sort(function (a, b) {
          return a[0] - b[0];
        })
        .each(function () {
          self.offsets.push(this[0]);
          self.targets.push(this[1]);
        });
    },

    update: function () {
      var self = this;

      var windowTop = Math.floor($(window).scrollTop());
      var $stickyLinks = self.$sticky
        .find(".navbar-nav .nav-item")
        .removeClass("active");
      var stickyPosition = "fixed";
      var currentIndex = 0;

      // Toggle fixed position depending on visibility
      if (
        $(window).width() < 800 ||
        $(window).height() < 500 ||
        self.stickyTop > windowTop
      ) {
        stickyPosition = "absolute";
        self.$sticky.removeClass("floating");
      } else {
        for (var i = self.offsets.length; i--; ) {
          if (
            windowTop >= self.offsets[i] - 2 &&
            (self.offsets[i + 1] === undefined ||
              windowTop <= self.offsets[i + 1] + 2)
          ) {
            currentIndex = i;

            break;
          }
        }
      }

      self.$sticky.css({ position: stickyPosition });

      if (stickyPosition == "absolute") {
        self.$sticky.removeClass("floating");
      } else {
        self.$sticky.addClass("floating");
      }

      $stickyLinks.eq(currentIndex).addClass("active");
    },

    init: function () {
      var self = this;

      $(window).on("resize", function () {
        self.set();

        self.update();
      });

      $(window).on("scroll", function () {
        self.update();
      });

      $(window).trigger("resize");
    },
  };

  if ($(".navbar").hasClass("sticky")) {
    sticky.init();
  }
});

$(document).ready(function () {
  $("#sideel").click(function () {
    $(this).parents(".config").toggleClass("active");
  });

  $("body").data("bodyClassList", "");

  $(".color-item").click(function () {
    var cls = $(this).data("class");

    $("body").attr("class", $("body").data("bodyClassList"));
    $("body").addClass(cls);
  });

  $("#change-page").on("change", function () {
    var url = $(this).val() + ".html";

    if ($(this).val()) {
      window.location.assign(url);
    }
  });

  $('[data-animate="scrolling"]').each(function () {
    var self = $(this);
    var target = $(this).data("target")
      ? $(this).data("target")
      : $(this).attr("href");

    self.click(function (e) {
      $("body, html").animate({ scrollTop: $(target).offset().top }, 1000);
      return false;
    });
  });
});

/*
 *  Counter
 *
 *  Require(" jquery.animateNumber.min.js ", " jquery.waypoints.min.js ")
 */
$(document).ready(function () {
  var counterInit = function () {
    if ($(".section-counter").length > 0) {
      $(".section-counter").waypoint(
        function (direction) {
          if (
            direction === "down" &&
            !$(this.element).hasClass("ftco-animated")
          ) {
            var comma_separator_number_step =
              $.animateNumber.numberStepFactories.separator(",");
            $(".number").each(function () {
              var $this = $(this),
                num = $this.data("number");
              $this.animateNumber(
                {
                  number: num,
                  numberStep: comma_separator_number_step,
                },
                5000
              );
            });
          }
        },
        { offset: "95%" }
      );
    }
  };
  counterInit();
}); // Get elements
const popupTrigger = document.getElementById("popupTrigger");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

// Time in milliseconds before the popup auto-hides
const autoHideDuration = 5000; // 5 seconds

// Show popup
popupTrigger.addEventListener("click", () => {
  popup.style.display = "flex";
  popup.classList.add("show-popup"); // Add class to trigger animation

  // Set timeout to auto-hide the popup
  setTimeout(() => {
    hidePopup();
  }, autoHideDuration);
});

// Hide popup function
function hidePopup() {
  popup.classList.remove("show-popup"); // Remove class to trigger hide animation
  setTimeout(() => {
    popup.style.display = "none"; // Hide the popup after animation
  }, 500); // Match this duration with the animation duration
}

// Close popup manually
closeBtn.addEventListener("click", () => {
  hidePopup();
});

// Close popup when clicking outside of the content
window.addEventListener("click", (event) => {
  if (event.target === popup) {
    hidePopup();
  }
});

// JavaScript to handle scroll direction and visibility
let lastScrollTop = 0; // Keeps track of last scroll position
const navbarToggler = document.querySelector(".navbar-toggler"); // Select the button

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    navbarToggler.classList.add("hidden");
  } else {
    // Scrolling up
    navbarToggler.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});
