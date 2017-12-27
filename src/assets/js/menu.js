import smoothScroll from './smoothscroll';

export default {
  init: () => {
    // const mainMenuHeight = '3.2rem';
    const navButton = document.querySelector('.main-menu button');
    const mainMenu = document.querySelector('.main-menu');

    // eslint-disable-next-line func-names
    navButton.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true'; //  || false;
      this.setAttribute('aria-expanded', !isExpanded);

      if (isExpanded) {
        // collapse if already expanded
        document.getElementById('fill-to-shape').beginElement();

        setTimeout(() => {
          mainMenu.classList.toggle('shaped');

          setTimeout(() => mainMenu.classList.toggle('open'), 500);
        }, 500);
      } else {
        // expand if already collapsed
        mainMenu.classList.toggle('open');
        mainMenu.classList.toggle('shaped');
        document.getElementById('shape-to-fill').beginElement();
      }

      // init smoothscroll
      const menuLinks = document.querySelectorAll('.menu li a');
      const handleClick = (event) => {
        event.preventDefault();
        const target = document.getElementById(event.target.hash.substr(1));

        smoothScroll(target, 60);

        target.focus();

        // close the menu
        // collapse if already expanded
        document.getElementById('fill-to-shape').beginElement();

        setTimeout(() => {
          mainMenu.classList.toggle('shaped');

          setTimeout(() => mainMenu.classList.toggle('open'), 500);
        }, 500);

      };

      menuLinks.forEach(item => item.addEventListener('click', handleClick));


      // toggle the links to be focusable only when the menu is open
      menuLinks.forEach((link) => {
        link.setAttribute('tabindex', !isExpanded ? 0 : -1);
      });
    });
  }
};
