<template>
  <header v-shrink-on-scroll>
    <div class="title-bar show-for-small-only" data-responsive-toggle="main-menu">
      <div class="title-bar-title">
        <img class="title-bar__cat" src="~assets/img/catforlogo.png" alt="marcello" aria-hidden="true"/>
        <!--<img class="title-bar__marcello" src="~assets/img/marcello.svg" alt="marcello">-->
        Marcello <span>Palmitessa</span>
      </div>
      <button class="menu-icon" type="button" data-toggle="main-menu">Menu</button>
    </div>

    <nav id="main-menu" class="top-bar show-for-medium">
      <div class="row column">
        <div class="top-bar-left">
          <ul class="menu">
            <li class="top-bar__logo menu-text">
              <img src="~assets/img/catforlogo.png" alt="marcello" aria-hidden="true"/>
              <img class="main-menu__marcello" src="~assets/img/marcello.svg" alt="marcello">
            </li>
          </ul>
        </div>

        <div class="top-bar-right">
          <ul class="dropdown menu" data-dropdown-menu>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">PORTFOLIO</a></li>
            <li><a href="#service">Services</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
            <!--<li>-->
            <!--<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">-->
            <!--<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>-->
            <!--</svg>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  /* eslint-disable */

  /**
   * Debounce
   * @param func
   * @param wait
   * @param immediate
   * @returns {Function}
   */
  function debounce (func, wait = 12, immediate = true) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;

      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Shrink the header on scroll
   * @param event
   */
  function shrinkOnScroll (event) {
    const target = document.querySelector('body')
    const logo = document.querySelector('.top-bar__logo')
    const isScrolled = target.classList.contains('scrolled')

    // console.log(`target.scrollTop: ${target.scrollTop}, isScrolled: ${isScrolled}`)

    if (target.scrollTop > 50 && !isScrolled) {
      target.classList.add('scrolled')
    } else if (target.scrollTop <= 10 && isScrolled) {
      target.classList.remove('scrolled')
    }

    if (target.scrollTop > 400 && !logo.classList.contains('active')) {
      logo.classList.add('active')
    } else if (target.scrollTop < 400 && logo.classList.contains('active')) {
      logo.classList.remove('active')
    }

  }


  export default {
    directives: {
      shrinkOnScroll: {
        // directive definition

        bind(el, binding, vnode) {
          // run the first time
          shrinkOnScroll({ target: el })

          // add listener
          window.addEventListener('scroll', debounce(shrinkOnScroll))
        },

        update(el, binding) {
          // remove + add
          window.removeEventListener('scroll', debounce(shrinkOnScroll))
          window.addEventListener('scroll', debounce(shrinkOnScroll))
        },

        unbind(el, binding) {
          window.removeEventListener('scroll', debounce(shrinkOnScroll))
        }

      }
    }
  }
</script>
