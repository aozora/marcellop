// import smoothScroll from './smoothscroll';
import TweenLite from 'gsap/TweenLite';
// eslint-disable-next-line no-unused-vars
import './gsap/plugins/MorphSVGPlugin';
import './gsap/plugins/ScrollToPlugin';

export default {
  init: () => {
    // const mainMenuHeight = '3.2rem';
    const navButton = document.querySelector('.main-menu button');
    const mainMenu = document.querySelector('.main-menu');
    const shape = document.querySelector('.main-menu__shape svg');
    const menuShapeFrom = shape.getAttribute('data-animate-from');
    const menuShapeTo = shape.getAttribute('data-animate-to');

    // eslint-disable-next-line func-names
    navButton.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true'; //  || false;
      this.setAttribute('aria-expanded', !isExpanded);

      if (isExpanded) {
        // collapse if already expanded
        // document.getElementById('fill-to-shape').beginElement();
        TweenLite.to('#shape-points', 0.5, {
          morphSVG: { points: menuShapeTo },
          onComplete: () => {
            mainMenu.classList.toggle('shaped');
            setTimeout(() => mainMenu.classList.toggle('open'), 500);
          }
        });
      } else {
        // expand if already collapsed
        mainMenu.classList.toggle('open');
        mainMenu.classList.toggle('shaped');
        // document.getElementById('shape-to-fill').beginElement();

        TweenLite.to('#shape-points', 0.5, {
          morphSVG: { points: menuShapeFrom }
        });
      }

      // init smoothscroll
      const menuLinks = document.querySelectorAll('.menu li a');
      const handleClick = (event) => {
        // event.preventDefault();
        const target = document.getElementById(event.target.hash.substr(1));

        // smoothScroll(target, 60);
        TweenLite.to(window, 0.5, {
          scrollTo: { y: event.target.hash, offsetY: 60 },
          onComplete: () => {
            target.focus();

            // close the menu
            // document.getElementById('fill-to-shape').beginElement();
            TweenLite.to('#shape-points', 0.5, {
              morphSVG: { points: menuShapeTo },
              onComplete: () => {
                mainMenu.classList.toggle('shaped');
                setTimeout(() => mainMenu.classList.toggle('open'), 500);
              }
            });
          }
        });
      };

      menuLinks.forEach(item => item.addEventListener('click', handleClick));

      // toggle the links to be focusable only when the menu is open
      menuLinks.forEach((link) => {
        link.setAttribute('tabindex', !isExpanded ? 0 : -1);
      });
    });
  }
};
