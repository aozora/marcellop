import TweenLite from 'gsap/TweenLite';
import TimelineLite from 'gsap/TimelineLite';
import { Back } from 'gsap/EasePack';
import './gsap/plugins/MorphSVGPlugin';
import './gsap/plugins/ScrollToPlugin';
import './gsap/plugins/CSSPlugin';

// const mainMenuHeight = '3.2rem';
const navButton = document.querySelector('.main-menu button');
const mainMenu = document.querySelector('.main-menu');
const menuLinks = document.querySelectorAll('.menu li a');
const mainMenuShape = document.querySelector('.main-menu__shape');
const svg = document.querySelector('.main-menu__shape svg');
const menuShapeTo = svg.getAttribute('data-animate-to');

/**
 * Toggle the nav element
 * @param callback
 */
function toggleNav() {
  mainMenu.classList.toggle('open');
}

/**
 * Define e new GSAP TimeLine
 */
const timeline = new TimelineLite({
  paused: true,
  onReverseComplete: () => {
    toggleNav();
  }
});

// add the tweens to the timeline
timeline
  .to(mainMenuShape, 0.5, { css: { y: '0%' } })
  .to('#shape-points', 0.5, { morphSVG: { points: menuShapeTo } })
  .staggerFromTo(
    menuLinks, 0.35,
    { css: { x: '100%' }, ease: Back.easeOut },
    { css: { x: '0%' }, ease: Back.easeOut },
    0.1,
    '-=.45'
  );

/**
 * open/close the mobile menu with gsap animation
 */
function toggleMenu() {
  const isAlreadyExpanded = navButton.getAttribute('aria-expanded') === 'true'; //  || false;
  navButton.setAttribute('aria-expanded', !isAlreadyExpanded);

  if (isAlreadyExpanded) {
    // collapse if already expanded
    timeline.reverse();
  } else {
    // expand if already collapsed
    toggleNav();
    timeline.play();
  }
}

/**
 * Handle the menu link click
 * @param event
 */
function handleClick(event) {
  event.preventDefault();
  const target = document.getElementById(event.target.hash.substr(1));

  // Smoothscroll (linear for now)
  TweenLite.to(window, 0.5, {
    scrollTo: { y: event.target.hash, offsetY: 60, autoKill: false },
    onComplete: () => {
      target.focus();

      // toggle the menu (only for mobile)
      if (getComputedStyle(navButton, null).display !== 'none') {
        toggleMenu();
      }
    }
  });
}

export default {
  init: () => {
    // set the intial position of the menu shape
    TweenLite.set(mainMenuShape, { css: { y: '-100%' } });

    // // set the intial position of the menu links
    // TweenLite.set(menuLinks, { css: { x: '100%' } });

    // register menu links click event handler
    menuLinks.forEach((link) => {
      link.addEventListener('click', handleClick);
    });

    // eslint-disable-next-line func-names
    navButton.addEventListener('click', () => {
      const isAlreadyExpanded = navButton.getAttribute('aria-expanded') === 'true'; //  || false;

      // toggle the menu
      toggleMenu();

      // toggle the links to be focusable only when the menu is open
      menuLinks.forEach((link) => {
        link.setAttribute('tabindex', !isAlreadyExpanded ? 0 : -1);
      });
    });
  }
};
