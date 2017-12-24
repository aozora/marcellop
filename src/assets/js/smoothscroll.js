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
      mainMenu.classList.remove('open');
    };

    menuLink.forEach(item => item.addEventListener('click', handleClick));
  }
};
