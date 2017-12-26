import anime from 'animejs';

export default {
  init: () => {
    const navButton = document.querySelector('.main-menu button');
    // eslint-disable-next-line func-names
    navButton.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      const menu = document.querySelector('.main-menu');

      menu.classList.remove('out-from-right', 'in-from-right');
      menu.classList.toggle('open');
      menu.classList.add(expanded ? 'out-from-right' : 'in-from-right');

      anime({
        targets: document.querySelector('.main-menu'),
        height: {
          value: '100vh',
          // delay: 100,
          duration: 700,
          easing: 'easeInOutQuad'
        }
      });

      anime({
        // targets: document.getElementById('shape'),
        targets: '#shape polygon',
        // delay: 100,
        duration: 1200,
        easing: 'linear',
        points: document.getElementById('shape').getAttribute('data-animate-to')
      });

      // toggle the links to be focusable only when the menu is open
      const menuLinks = document.querySelectorAll('.menu li a');
      menuLinks.forEach((link) => {
        link.setAttribute('tabindex', !expanded ? 0 : -1);
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
