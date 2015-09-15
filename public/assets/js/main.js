//Begin Sticky Nav
$(window).load(function () {
    $("#navigation").sticky({ topSpacing: 0 });
});
//End Sticky Nav

//// Begin tooltip for socials init */
//
//function tooltipInit() {
//    jQuery("[data-toggle='tooltip']").tooltip();
//}

jQuery(document).ready(function () {
    if(jQuery("body").hasClass('post-template')){
        jQuery("#navigation").addClass('navbar-fixed-top');
    }
});


//jQuery(document).ready(function () {
//    tooltipInit();
//});

$(document).ready(function () {
    $('.btn-scroll[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash, $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});

function scrollToTop(i) {
    if (i == 'show') {
        if (jQuery(this).scrollTop() != 0) {
            jQuery('#toTop').fadeIn();
        } else {
            jQuery('#toTop').fadeOut();
        }
    }
}

jQuery(window).scroll(function () {
    scrollToTop('show');
});

//Begin Parallax

jQuery(window).load(function () {
    "use strict";

    /* parallax effect */
    jQuery("#MainHeader").parallax("50%", 0.4);
});

jQuery(window).resize(function () {
    setTimeout(function () {
        jQuery("#MainHeader").parallax("20%", 0.4, true);
    }, 500);
}); //End Parallax




/* flexslider */

$(document).ready(function(){
(function(){
    var $gallery = $('.post-template .gallery');
    $gallery.each(function(){
        var $this = $('this');
        $this.css({'display' : 'none'});

        var flexMarkup = {};
        flexMarkup.start =
            '<div class="flexslider">' +
                '<ul class="slides">';
        flexMarkup.middle = '';
        flexMarkup.end =
            '</ul>' +
                '</div>';

        $('img', this).each(function(){
            flexMarkup.middle +=
                '<li>' +
                    $(this).wrap("<div/>").parent().html() +
                    '</li>';
        });

        flexMarkup.full = flexMarkup.start + flexMarkup.middle + flexMarkup.end;
        $(flexMarkup.full).insertAfter(this);

        $(this).css({'display' : 'none'});
    });
})();

    /* flexslider */
    jQuery('.blog .flexslider').flexslider({
        animation: "slide",
        touch: true,
        prevText: "",
        nextText: "",
        smoothHeight: true
    });

    jQuery('.flexslider-with-video').flexslider({
        animation: "slide",
        smoothHeight: true,
        touch: true,
        directionNav: false,
        manualControls: '.flex-control-nav li a'
    });

    jQuery('.fullscreen-flexslider').flexslider({
        animation: "slide",
        smoothHeight: true,
        touch: true,
        directionNav: true,
        prevText: "",
        nextText: "",
        manualControls: '.flex-control-nav li a'
    });

    jQuery('.fullscreen-slider-slogan').flexslider({
        animation: "fade",
        smoothHeight: true,
        touch: true,
        directionNav: false,
        controlNav: false
    });

});

/* Begin Video */

jQuery(document).ready(function () {
    // Target your .container, .wrapper, .post, etc.
    $(".blog-post").fitVids();
    $("#MainHeader").fitVids();
});
/* End Video */

/* Begin Animations */

jQuery(document).ready(function () {
    if (jQuery().appear) {
        jQuery('.initAnimate .animated').appear(function () {
            jQuery(this).each(function () {
                jQuery(this).addClass('activate');
                jQuery(this).addClass($(this).data('fx'));
            });
        }, {accY: -150});
    }
});

/* End Animation */


/* Change cover */

/* cover image */
jQuery(document).ready(function () {
    (function(){
        var $contentCover = $('.post-template [alt="cover"]');
        var $cover = $('#MainHeader');
        if($contentCover.length) {
            $contentCover = $($contentCover[0]);
            var $src = $contentCover.attr('src');
            $contentCover.css({'display' : 'none'});
            $cover.css({'background-image' : 'url(' + $src + ')'});
        }
    })();
});

//Begin PieChart
jQuery('.pie-chart').each(function () {
    var $t = jQuery(this);

    var scaleColor = false;
//   var trackColor = "transparent";
   var trackColor = '#f5f5f5';
   var barColor = '#00A8D6';
   var lineWidth = 3;

   $t.easyPieChart({
      animate: '1000',
      barColor: barColor,
      lineWidth: 3,
      trackColor: trackColor,
      scaleColor: scaleColor == 'false' ? false : scaleColor,
      lineCap: 'butt',
      lineWidth: lineWidth,
      size: 180
   });
});

//End PieChart


// Contact Form
jQuery(document).ready(function () {
   jQuery("#contactForm_766").submit(function(){
      var $email = jQuery("#contactFormEmail_766").val();
      var $text = jQuery("#contactFormText_766").val();

      jQuery.ajax({
         type: "POST",
         url: "/contact",
         data: {
            email: $email,
            message: $text,
            _csrf: jQuery('#csrf-token').val()
         },
         dataType: 'json',
         success: function (data, textStatus, XMLHttpRequest){
            jQuery("#contactFormError_766").hide();
            jQuery("#contactFormInfo_766").hide();

            jQuery("#contactFormEmail_766").removeClass("error");
            jQuery("#contactFormText_766").removeClass("error");

            result = data;//jQuery.parseJSON(data);

            if(result.success === true){
                  jQuery("#contactFormInfo_766").fadeIn();
                  jQuery("#contactForm_766").find("input, textarea").attr("value", "");
            } else {
                  jQuery("#contactFormError_766").fadeIn();
            }

//            jQuery.each(result, function(index, value) {
//               if(index=="success" && value==true){
//                  jQuery("#contactFormInfo_766").fadeIn();
//                  jQuery("#contactForm_766").find("input, textarea").attr("value", "");
//               }
//               if(index=="success" && value == false){
//                  jQuery("#contactFormError_766").fadeIn();
//               }
//               if(index=="email" && value==false){
//                  jQuery("#contactFormEmail_766").addClass("error");
//               }
//               if(index=="text" && value==false){
//                  jQuery("#contactFormText_766").addClass("error");
//               }
//            });
         },
         error: function (MLHttpRequest, textStatus, errorThrown){
            jQuery("#contactFormEmail_766").removeClass("error");
            jQuery("#contactFormText_766").removeClass("error");
            jQuery("#contactFormInfo_766").html("");
            jQuery("#contactFormError_766").fadeIn();
         }
      });

      return false;
   });
});
// End Contact Form

// Remove empty paragraphs

jQuery(document).ready(function () {
    // Trimming white space
    $('p').filter(function () { return $.trim(this.innerHTML) == "" }).remove();

    // Without trimming white space
    $('p').filter(function () { return this.innerHTML == "" }).remove();
});