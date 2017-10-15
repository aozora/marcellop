import $ from 'jquery';
import sticky from 'stickyfilljs/dist/stickyfill.es6';

// eslint-disable-next-line no-unused-vars
import whatInput from 'what-input';

window.$ = $;

// // eslint-disable-next-line no-unused-vars
// import foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
// import './lib/foundation-explicit-pieces';

/**
 * Netlify Identity redirect
 */
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', (user) => {
    if (!user) {
      window.netlifyIdentity.on('login', () => {
        document.location.href = '/admin/';
      });
    }
  });
}

// $(document).foundation();

// on document ready
$(document).ready(() => {

  const stickyEelements = document.querySelectorAll('header');
  sticky.add(stickyEelements);

});
