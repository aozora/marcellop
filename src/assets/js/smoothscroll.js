import smoothScroll from 'smoothscroll';

export default {
  init: () => {
    // smoothscroll
    const menuLink = document.querySelectorAll('.menu li a');
    const handleClick = (event) => {
      event.preventDefault();
      const target = document.getElementById(event.target.hash.substr(1));
      smoothScroll(target);

      target.focus();

      // close the menu
      const mainMenu = document.querySelector('.main-menu');
      // collapse if already expanded
      document.getElementById('fill-to-shape').beginElement();

      setTimeout(() => {
        mainMenu.classList.toggle('shaped');

        setTimeout(() => mainMenu.classList.toggle('open'), 500);
      }, 500);

    };

    menuLink.forEach(item => item.addEventListener('click', handleClick));
  }
};
