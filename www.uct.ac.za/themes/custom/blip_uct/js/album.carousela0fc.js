(function ($, Drupal) {
  Drupal.behaviors.albumCarousel = {
    attach: function (context, settings) {
      $(".album-carousel", context).each(function (key, item) {
        var sliderIdName = "albumCarousel_" + key;
        var sliderArrows = $(this)
          .parents(".album-carousel-wrapper")
          .find(".slick__arrow");        

        this.id = sliderIdName;

        $(this).on('init', function(event, slick){
          sliderArrows.append('<div class="slider-count"><span id="current">1</span><span id="divider">/</span><span id="total">'+slick.slideCount+'</span></div>');         
        });

        // prevent iframe content from playing when transitioning slides
        $(this).on(
          "beforeChange",
          function (event, slick, currentSlide, nextSlide) {
            var current = $(slick.$slides[currentSlide]);
            current.html(current.html());
          }
        );

        $(this).slick({
          dots: false,
          speed: 500,
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: false,
          adaptiveHeight: false,
          mobileFirst: true,
          draggable: false,
          speed: 0,
          appendArrows: sliderArrows,
          //prevArrow: '#current',
          //nextArrow: '#total',
        });

        sliderArrows.appendTo($(this));
        //$(this).find('#current').appendTo(this).find('.slick-prev');

        $(this).on('afterChange', function(event, slick, currentSlide, nextSlide){
            // finally let's do this after changing slides
            $('.slider-count #current').html(currentSlide+1);
        });
      });
    },
  };
})(jQuery, Drupal);
