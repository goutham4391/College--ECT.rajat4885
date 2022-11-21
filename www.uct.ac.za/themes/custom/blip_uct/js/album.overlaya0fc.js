/**
 * @file
 * Album
 *
 */
(function ($, Drupal) {
  Drupal.behaviors.albumOverlay = {
    attach: function (context, settings) {

      $("#slide-main").each(function () {
        var pagingCounter = $("#paging-info");
        var slickMain = $(this);
        var slickThumbnails = $("#slide-thumbnails");
  
        slickMain.on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            //console.log(currentSlide);
            if (typeof currentSlide == "undefined") {
              const urlParams = new URLSearchParams(window.location.search);
              currentSlide = parseInt(urlParams.get("slide")) - 1;
            }
  
            var i = (currentSlide ? currentSlide : 0) + 1;
            pagingCounter.text(i + "/" + slick.slideCount);
          }
        );
  
        // prevent iframe content from playing when transitioning slides
        slickMain.on(
          "beforeChange",
          function (event, slick, currentSlide, nextSlide) {
            var current = $(slick.$slides[currentSlide]);
            current.html(current.html());
          }
        );
  
        const urlParams = new URLSearchParams(window.location.search);
        var currentSlide = urlParams.get("slide");
        const slideIndex = currentSlide - 1;
  
        slickMain.slick({
          initialSlide: slideIndex,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          adaptiveHeight: false,
          mobileFirst: true,
          draggable: false,
        });
  
        slickMain.on("init", function (event, slick) {
          pagingCounter.appendTo(".slick-list");
        });
  
        slickThumbnails.slick({
          //slidesToShow: 1,
          //slidesToScroll: 1,
          initialSlide: slideIndex,
          arrows: true,
          asNavFor: $(this),
          focusOnSelect: true,
          draggable: false,
          variableWidth: true,
          infinite: true,
          centerMode: false,
          //centerPadding: '40px',
        });
      });

    },
  };
})(jQuery, Drupal);
