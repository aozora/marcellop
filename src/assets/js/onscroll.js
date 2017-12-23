// eslint-disable-next-line no-unused-vars
import waypoint from 'waypoints/lib/noframework.waypoints';

// /**
//  * Debounce
//  * @param func
//  * @param wait
//  * @param immediate
//  * @returns {Function}
//  */
// function debounce(func, wait = 12, immediate = true) {
//   let timeout;
//   // eslint-disable-next-line func-names
//   return function () {
//     const context = this;
//     // eslint-disable-next-line prefer-rest-params
//     const args = arguments;
//
//     // eslint-disable-next-line func-names
//     const later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//
//     const callNow = immediate && !timeout;
//
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//
//     if (callNow) func.apply(context, args);
//   };
// }
//
// /**
//  * Shrink the header on scroll
//  * @param event
//  */
// function shrinkOnScroll(event) {
//   const target = document.querySelector('body');
//   const logo = document.querySelector('.marcello');
//   const isScrolled = target.classList.contains('scrolled');
//
//   // eslint-disable-next-line no-console
//   console.log(`target.scrollTop: ${target.scrollTop}, target.offsetTop: ${target.offsetTop}, isScrolled: ${isScrolled}`);
//
//   // if (target.scrollTop > 50 && !isScrolled) {
//   //   target.classList.add('scrolled');
//   // } else if (target.scrollTop <= 10 && isScrolled) {
//   //   target.classList.remove('scrolled');
//   // }
//   //
//   // if (target.scrollTop > 400 && !logo.classList.contains('active')) {
//   //   logo.classList.add('active');
//   // } else if (target.scrollTop < 400 && logo.classList.contains('active')) {
//   //   logo.classList.remove('active');
//   // }
// }

export default {
  init: () => {
    // window.addEventListener('scroll', debounce(shrinkOnScroll));

    // eslint-disable-next-line no-undef,no-new
    new Waypoint({
      element: document.querySelector('.hero__headings h1'),
      // offset: 120,
      handler: (direction) => {
        const logo = document.querySelector('.marcello');

        if (direction === 'down') {
          logo.classList.add('active');
        } else if (direction === 'up') {
          logo.classList.remove('active');
        }
      }
    });

  }
};
