// import anime from 'animejs';

export default {
  init: () => {
    // const mainMenuHeight = '3.2rem';
    const navButton = document.querySelector('.main-menu button');
    const mainMenu = document.querySelector('.main-menu');
    // const shape = document.querySelector('.main-menu__shape svg');
    // const menuShapeFrom = shape.getAttribute('data-animate-from');
    // const menuShapeTo = shape.getAttribute('data-animate-to');

    // eslint-disable-next-line func-names
    navButton.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true'; //  || false;
      this.setAttribute('aria-expanded', !isExpanded);

      // mainMenu.classList.remove('out-from-right', 'in-from-right');
      // mainMenu.classList.toggle('open');
      // mainMenu.classList.add(expanded ? 'out-from-right' : 'in-from-right');

      // // // eslint-disable-next-line no-unused-vars
      // anime({
      //   targets: '.main-menu__shape svg polygon',
      //   delay: 500,
      //   duration: 1200,
      //   easing: 'linear',
      //   points: isExpanded ? menuShapeFrom : menuShapeTo
      // });

      if (isExpanded) {
        // collapse if already expanded
        // shapeAnimationPromise.finished.then(shapePositionPromise);
        document.getElementById('fill-to-shape').beginElement();

        setTimeout(() => mainMenu.classList.toggle('open'), 1100);
      } else {
        // expand if already collapsed
        mainMenu.classList.toggle('open');
        document.getElementById('shape-to-fill').beginElement();
      }

      // toggle the links to be focusable only when the menu is open
      const menuLinks = document.querySelectorAll('.menu li a');
      menuLinks.forEach((link) => {
        link.setAttribute('tabindex', !isExpanded ? 0 : -1);
      });
    });
  }
};
