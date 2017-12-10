import $ from 'jquery';
import smoothScroll from 'smoothscroll';
// import sticky from 'stickyfilljs/dist/stickyfill.es6';

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
// if (window.netlifyIdentity) {
//   window.netlifyIdentity.on('init', (user) => {
//     if (!user) {
//       window.netlifyIdentity.on('login', () => {
//         document.location.href = '/admin/'
//       })
//     }
//   })
// }

// $(document).foundation();

// on document ready
// $(document).ready(() => {
//
//   const stickyEelements = document.querySelectorAll('header');
//   sticky.add(stickyEelements);
//
// });

const navButton = document.querySelector('.main-menu button');
// eslint-disable-next-line func-names
navButton.addEventListener('click', function () {
  const expanded = this.getAttribute('aria-expanded') === 'true' || false;
  this.setAttribute('aria-expanded', !expanded);
  const menu = document.querySelector('.main-menu');
  menu.classList.toggle('open');

  // toggle the links to be focusable only when the menu is open
  const menuLinks = document.querySelectorAll('.menu li a');
  menuLinks.forEach((link) => {
    link.setAttribute('tabindex', !expanded ? 0 : -1);
  });
});

// smoothscroll
const menuLink = document.querySelectorAll('.menu li a');
const handleClick = (event) => {
  event.preventDefault();
  const target = document.getElementById(event.target.hash.substr(1));
  smoothScroll(target);

  target.focus();

  // close the menu
  const menu = document.querySelector('.main-menu');
  menu.classList.remove('open');
};

menuLink.forEach(item => item.addEventListener('click', handleClick));
