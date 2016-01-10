(function ($) {
  'use strict';

  var revapi92; // eslint-disable-line
  var $window = $(window);
  var $body = $('body');
  var $portfolio = $('#portfolio');
  var $parallaxEl = $('.parallax');
  var $parallaxPageTitleEl = $('.page-title-parallax');

  var self = {};

  /**
   * Setup Revolution Slider
   */
  $(document).ready(function () {

    var $slider = $('#rev_slider_92_1');

    if ($slider.revolution === undefined) {
      revslider_showDoubleJqueryError('#rev_slider_92_1');
    } else {
      revapi92 = $slider.show().revolution({
        sliderType: 'hero',
        jsFileLocation: '/assets/rs-plugin/js/',
        sliderLayout: 'fullwidth',
        dottedOverlay: 'none',
        delay: 9000,
        navigation: {},
        responsiveLevels: [1240, 1024, 778, 480],
        gridwidth: [1240, 1024, 778, 480],
        gridheight: [500, 450, 400, 350],
        lazyType: 'none',
        parallax: {
          type: 'scroll',
          origo: 'enterpoint',
          speed: 400,
          levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
        },
        shadow: 0,
        spinner: 'off',
        autoHeight: 'off',
        disableProgressBar: 'on',
        hideThumbsOnMobile: 'off',
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: false,
        fallbacks: {
          simplifyAll: 'off',
          disableFocusListener: false
        }
      });
    }
  });


  self.helper = {

    responsiveClasses: function () {
      var jr = jRespond([
        {
          label: 'smallest',
          enter: 0,
          exit: 479
        }, {
          label: 'handheld',
          enter: 480,
          exit: 767
        }, {
          label: 'tablet',
          enter: 768,
          exit: 991
        }, {
          label: 'laptop',
          enter: 992,
          exit: 1199
        }, {
          label: 'desktop',
          enter: 1200,
          exit: 10000
        }
      ]);

      jr.addFunc([
        {
          breakpoint: 'desktop',
          enter: function () {
            $body.addClass('device-lg');
          },
          exit: function () {
            $body.removeClass('device-lg');
          }
        }, {
          breakpoint: 'laptop',
          enter: function () {
            $body.addClass('device-md');
          },
          exit: function () {
            $body.removeClass('device-md');
          }
        }, {
          breakpoint: 'tablet',
          enter: function () {
            $body.addClass('device-sm');
          },
          exit: function () {
            $body.removeClass('device-sm');
          }
        }, {
          breakpoint: 'handheld',
          enter: function () {
            $body.addClass('device-xs');
          },
          exit: function () {
            $body.removeClass('device-xs');
          }
        }, {
          breakpoint: 'smallest',
          enter: function () {
            $body.addClass('device-xxs');
          },
          exit: function () {
            $body.removeClass('device-xxs');
          }
        }
      ]);
    },


    goToTop: function () {
      $('#gotoTop').click(function () {
        $('body,html').stop(true).animate({ scrollTop: 0 }, 400);
        return false;
      });
    }

  };


  self.isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (self.isMobile.Android() ||    // eslint-disable-line
      self.isMobile.BlackBerry() || // eslint-disable-line
      self.isMobile.iOS() ||        // eslint-disable-line
      self.isMobile.Opera() ||      // eslint-disable-line
      self.isMobile.Windows());     // eslint-disable-line
    }
  };


  self.portfolio = {
    defineColumns: function (element) {
      var column = 4;
      var lgCol;
      var mdCol;
      var smCol;
      var xsCol;
      var xxsCol;

      if (element.hasClass('portfolio-full')) {
        if (element.hasClass('portfolio-3')) column = 3;
        else if (element.hasClass('portfolio-5')) column = 5;
        else if (element.hasClass('portfolio-6')) column = 6;
        else column = 4;

        if ($body.hasClass('device-sm') && (column === 4 || column === 5 || column === 6)) {
          column = 3;
        } else if ($body.hasClass('device-xs') && (column === 3 || column === 4 || column === 5 || column === 6)) {
          column = 2;
        } else if ($body.hasClass('device-xxs')) {
          column = 1;
        }
      } else if (element.hasClass('masonry-thumbs')) {

        lgCol = element.attr('data-lg-col');
        mdCol = element.attr('data-md-col');
        smCol = element.attr('data-sm-col');
        xsCol = element.attr('data-xs-col');
        xxsCol = element.attr('data-xxs-col');

        if (element.hasClass('col-2')) column = 2;
        else if (element.hasClass('col-3')) column = 3;
        else if (element.hasClass('col-5')) column = 5;
        else if (element.hasClass('col-6')) column = 6;
        else column = 4;

        if ($body.hasClass('device-lg')) {
          if (lgCol) {
            column = Number(lgCol);
          }
        } else if ($body.hasClass('device-md')) {
          if (mdCol) {
            column = Number(mdCol);
          }
        } else if ($body.hasClass('device-sm')) {
          if (smCol) {
            column = Number(smCol);
          }
        } else if ($body.hasClass('device-xs')) {
          if (xsCol) {
            column = Number(xsCol);
          }
        } else if ($body.hasClass('device-xxs')) {
          if (xxsCol) {
            column = Number(xxsCol);
          }
        }

      }

      return column;
    },

    setFullColumnWidth: function (element) {

      var columns;
      var containerWidth;
      var postWidth;
      var deviceSmallest;
      var elementSize;
      var windowWidth;
      var firstElementWidth;
      var bigImageNumbers;
      var bigImageNumber = '';
      var bigi = '';

      if (element.hasClass('portfolio-full')) {

        columns = self.portfolio.defineColumns(element);
        containerWidth = element.width();

        if (containerWidth === (Math.floor(containerWidth / columns) * columns)) {
          containerWidth = containerWidth - 1;
        }

        postWidth = Math.floor(containerWidth / columns);

        if ($body.hasClass('device-xxs')) {
          deviceSmallest = 1;
        } else {
          deviceSmallest = 0;
        }

        element.find('.portfolio-item').each(function () {
          if (deviceSmallest === 0 && $(this).hasClass('wide')) {
            elementSize = (postWidth * 2);
          } else {
            elementSize = postWidth;
          }

          $(this).css({ width: elementSize + 'px' });
        });

      } else if (element.hasClass('masonry-thumbs')) {

        columns = self.helper.defineColumns(element);
        containerWidth = element.innerWidth();
        windowWidth = $(window).width();

        if (containerWidth === windowWidth) {
          containerWidth = windowWidth * 1.004;
          element.css({ 'width': containerWidth + 'px' });
        }

        postWidth = (containerWidth / columns);
        postWidth = Math.floor(postWidth);

        if ((postWidth * columns) >= containerWidth) {
          element.css({ 'margin-right': '-1px' });
        }

        element.children('a').css({ width: postWidth + 'px' });

        firstElementWidth = element.find('a:eq(0)').outerWidth();

        element.isotope({
          masonry: {
            columnWidth: firstElementWidth
          }
        });

        bigImageNumbers = element.attr('data-big');

        if (bigImageNumbers) {

          bigImageNumbers = bigImageNumbers.split(',');

          for (bigi = 0; bigi < bigImageNumbers.length; bigi++) {
            bigImageNumber = Number(bigImageNumbers[bigi]) - 1;
            element.find('a:eq(' + bigImageNumber + ')').css({ width: firstElementWidth * 2 + 'px' });
          }

          setTimeout(function () {
            element.isotope('layout');
          }, 1000);
        }
      }

    }, // end setFullColumnWidth

    arrange: function () {
      self.portfolio.setFullColumnWidth($portfolio);
      $('#portfolio.portfolio-full').isotope('layout');
    }
  };


  self.parallax = {
    parallax: function () {
      if (!self.isMobile.any()) {
        $.stellar({
          horizontalScrolling: false,
          verticalOffset: 150
        });
      } else {
        $parallaxEl.addClass('mobile-parallax');
        $parallaxPageTitleEl.addClass('mobile-parallax');
      }
    }
  };

  self.timeline = {
    init: function () {

      var $timeline_block = $('.cd-timeline-block');

      //hide timeline blocks which are outside the viewport
      $timeline_block.each(function () {
        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
          $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        }
      });

      //on scolling, show/animate timeline blocks when enter the viewport
      $(window).on('scroll', function () {
        $timeline_block.each(function () {
          if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
            $(this)
              .find('.cd-timeline-img, .cd-timeline-content')
              .removeClass('is-hidden')
              .addClass('bounce-in');
          }
        });
      });
    }
  };


  $(document).ready(function () {
    // SEMICOLON.documentOnReady.init

    self.timeline.init();
    // SEMICOLON.initialize.init();
    // |- 			SEMICOLON.initialize.goToTop();
    // |- 			SEMICOLON.initialize.imageFade();
    // |- 			SEMICOLON.initialize.pageTransition();
    // |- 			SEMICOLON.initialize.dataResponsiveClasses();
    // |- 			SEMICOLON.initialize.dataResponsiveHeights();


    // if ($portfolio.length > 0) {
    // SEMICOLON.portfolio.init();
    // }

  });

  $window.load(function () {

    self.parallax.parallax();
    //  // SEMICOLON.documentOnLoad.init
    //  // |-   SEMICOLON.portfolio.arrange();
    //  //
    //  self.portfolio.arrange();
    //
    //
    //  // init portfolio (no filters)
    //  $portfolio.isotope({
    //    transitionDuration: '0.65s',
    //    masonry: {
    //      columnWidth: $portfolio.find('.portfolio-item:not(.wide)')[0]
    //    }
    //  });
    // });
    //
    // $window.on('resize', function () {
    //
    //  // SEMICOLON.documentOnResize.init
    //  setTimeout(function () {
    //    self.portfolio.arrange();
    //  }, 500);
    //
    //  $portfolio.isotope('layout');
    //
  });


})(jQuery);
