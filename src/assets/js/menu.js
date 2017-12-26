import anime from 'animejs';

export default {
  init: () => {
    const mainMenuHeight = '3.2rem';
    const navButton = document.querySelector('.main-menu button');
    const mainMenu = document.querySelector('.main-menu');
    const shape = document.querySelector('.main-menu__shape');
    const menuShapeFrom = shape.getAttribute('data-animate-from');
    const menuShapeTo = shape.getAttribute('data-animate-to');

    // eslint-disable-next-line func-names
    navButton.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true'; //  || false;
      this.setAttribute('aria-expanded', isExpanded);

      // mainMenu.classList.remove('out-from-right', 'in-from-right');
      mainMenu.classList.toggle('open');
      // mainMenu.classList.add(expanded ? 'out-from-right' : 'in-from-right');

      // animate the main menu background shape

      // expand/collapse the menu to full screen/normal size if expanded
      anime({
        targets: mainMenu,
        height: {
          value: isExpanded ? mainMenuHeight : '100vh',
          // delay: 100,
          duration: 700,
          easing: 'easeInOutQuad'
        }
      });

      anime({
        targets: '.main-menu__shape polygon',
        // delay: 100,
        duration: 1200,
        easing: 'linear',
        points: isExpanded ? menuShapeFrom : menuShapeTo
      });

      // toggle the links to be focusable only when the menu is open
      const menuLinks = document.querySelectorAll('.menu li a');
      menuLinks.forEach((link) => {
        link.setAttribute('tabindex', !isExpanded ? 0 : -1);
      });
    });

    // const wall = document.getElementById('wall');
    // // run this on a click or whenever you want
    // wall.addEventListener('click', () => {
    //   // eslint-disable-next-line no-console
    //   console.log('wall clicked');
    //   wall.beginElement();
    // });

  }
};
