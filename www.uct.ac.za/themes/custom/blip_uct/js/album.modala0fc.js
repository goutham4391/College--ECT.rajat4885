(function ($, Drupal) {
  Drupal.behaviors.albumModal = {
    attach: function (context, settings) {
      $(".node--type-album.modal .node__content").each(function (key, item) {
        var albumIdName = "albumModal_" + key;

        this.id = albumIdName;

        var pagingCounter = $("#pagingInfo");
        var albumModalslickElement = $(this);
        var albumSlickList = $(this).find(".slick-list");

        albumModalslickElement.on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            if (typeof currentSlide == "undefined") {
              const urlParams = new URLSearchParams(window.location.search);
              currentSlide = parseInt(urlParams.get("slide")) - 1;
            }
            var i = (currentSlide ? currentSlide : 0) + 1;
            // pagingCounter.text(i + "/" + slick.slideCount);
            // Initial load seems unaware of total slidecount (provides null)
            // until slides are advanced. Enabling dots calculates correctly
            pagingCounter.text(i + '/' + (slick.$dots[0].children.length));
          }
        );

        // prevent iframe content from playing when transitioning slides
        albumModalslickElement.on(
          "beforeChange",
          function (event, slick, currentSlide, nextSlide) {
            var current = $(slick.$slides[currentSlide]);
            current.html(current.html());
          }
        );

        const urlParams = new URLSearchParams(window.location.search);
        currentSlide = urlParams.get("slide");
        const slideIndex = currentSlide - 1;

        albumModalslickElement.slick({
          appendArrows: ".slick-list",
          initialSlide: slideIndex,
          dots: true,
          speed: 500,
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          adaptiveHeight: false,
          mobileFirst: true,
          draggable: false,
          //rows: 0,
          //respondTo: 'window',
          appendArrows: $("#slickNav"),
          //variableWidth: true
        });

        $("#slickNav").appendTo(albumSlickList);
        pagingCounter.appendTo("#slickNav");
      });
    },
  };
})(jQuery, Drupal);
