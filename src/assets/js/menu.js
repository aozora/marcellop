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

      // toggle the links to be focusable only when the menu is open
      const menuLinks = document.querySelectorAll('.menu li a');
      menuLinks.forEach((link) => {
        link.setAttribute('tabindex', !expanded ? 0 : -1);
      });
    });
  }
};
