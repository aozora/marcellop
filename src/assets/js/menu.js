import TweenLite from 'gsap/TweenLite';
import TimelineLite from 'gsap/TimelineLite';
import './gsap/plugins/MorphSVGPlugin';
import './gsap/plugins/ScrollToPlugin';
import './gsap/plugins/CSSPlugin';

// const mainMenuHeight = '3.2rem';
const navButton = document.querySelector('.main-menu button');
const mainMenu = document.querySelector('.main-menu');
const mainMenuShape = document.querySelector('.main-menu__shape');
const svg = document.querySelector('.main-menu__shape svg');
// const menuShapeFrom = svg.getAttribute('data-animate-from');
const menuShapeTo = svg.getAttribute('data-animate-to');

// Toggle the mobile menu
function toggleMenu(callback) {
  mainMenu.classList.toggle('open');

  if (callback) {
    callback();
  }
}

/**
 * Define e new GSAP TimeLine
 */
const timeline = new TimelineLite({
  paused: true,
  onReverseComplete: () => {
    toggleMenu();
  }
});

// add the tweens to the timeline
timeline
  .to(mainMenuShape, 0.5, { css: { y: '0%' } })
  .to('#shape-points', 0.5, { morphSVG: { points: menuShapeTo } });

export default {
  init: () => {
    // set the intial position of the menu shape
    TweenLite.set(mainMenuShape, { css: { y: '-100%' } });

    // eslint-disable-next-line func-names
    navButton.addEventListener('click', function () {
      const isAlreadyExpanded = this.getAttribute('aria-expanded') === 'true'; //  || false;
      this.setAttribute('aria-expanded', !isAlreadyExpanded);

      if (isAlreadyExpanded) {
        // collapse if already expanded
        timeline.reverse();
      } else {
        // expand if already collapsed
        toggleMenu();
        timeline.play();
      }

      // init smoothscroll
      const menuLinks = document.querySelectorAll('.menu li a');

      const handleClick = (event) => {
        event.preventDefault();
        const target = document.getElementById(event.target.hash.substr(1));

        TweenLite.to(window, 0.5, {
          scrollTo: { y: event.target.hash, offsetY: 60 },
          onComplete: () => {
            target.focus();

            // close the menu
            timeline.reverse();
          }
        });
      };

      menuLinks.forEach(item => item.addEventListener('click', handleClick));

      // toggle the links to be focusable only when the menu is open
      menuLinks.forEach((link) => {
        link.setAttribute('tabindex', !isAlreadyExpanded ? 0 : -1);
      });
    });
  }
};
