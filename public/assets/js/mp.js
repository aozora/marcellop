//(function() {
(function () {
  'use strict';

  /**
   * Cookie Notification
   */
  jQuery(document).ready(function ($) {

    if ($.cookie('websiteUsesCookies') == 'yesConfirmed') {
      $('#cookie-notification').css({bottom: -60});
    }

    $('.cookie-accept').click(function () {
      $('#cookie-notification').animate({bottom: -60}, 400);
      $.cookie('websiteUsesCookies', 'yesConfirmed', {expires: 30});
      return false;
    });

  });


})();


