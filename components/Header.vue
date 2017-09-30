<template>
  <header v-shrink-on-scroll>
    <a href="#maincontent">Skip to main content</a>
    <nav class="title-bar show-for-small-only">
      <div class="title-bar-title">
        <img role="presentation" aria-hidden="true" class="title-bar__cat" src="~assets/img/catforlogo.png" alt=""/>
        <!--<img class="title-bar__marcello" src="~assets/img/marcello.svg" alt="marcello">-->
        Marcello <span>Palmitessa</span>
      </div>
      <button class="menu-icon" type="button" v-on:click.prevent="toggleMenu">Menu</button>
    </nav>

    <nav id="main-menu" class="top-bar show-for-medium">
      <div class="menu-container">
        <div class="top-bar-left show-for-medium">
          <ul class="vertical menu">
            <li class="top-bar__logo menu-text">
              <img role="presentation" aria-hidden="true" src="~assets/img/catforlogo.png" alt="marcello"/>
              Marcello
              <img role="presentation" aria-hidden="true" class="main-menu__marcello" src="~assets/img/marcello.svg" alt="marcello">
              <span>Palmitessa</span>
            </li>
          </ul>
        </div>

        <div class="top-bar-right">
          <ul class="vertical medium-horizontal menu" v-smoothscroll="{ duration : 500 }">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#whatido">What I do</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  //  /* eslint-disable */

  /**
   * Debounce
   * @param func
   * @param wait
   * @param immediate
   * @returns {Function}
   */
  function debounce (func, wait = 12, immediate = true) {
    let timeout
    return function () {
      const context = this
      const args = arguments

      const later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }

      const callNow = immediate && !timeout

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)

      if (callNow) func.apply(context, args)
    }
  }

  /**
   * Shrink the header on scroll
   * @param event
   */
  function shrinkOnScroll (event) {
    const target = document.querySelector('body')
    const logo = document.querySelector('.top-bar__logo')
    const isScrolled = target.classList.contains('scrolled')

    console.log(`target.scrollTop: ${target.scrollTop}, isScrolled: ${isScrolled}`)

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

        bind (el, binding, vnode) {
          // run the first time
          shrinkOnScroll({target: el})

          // add listener
          window.addEventListener('scroll', debounce(shrinkOnScroll))
        },

        update (el, binding) {
          // remove + add
          window.removeEventListener('scroll', debounce(shrinkOnScroll))
          window.addEventListener('scroll', debounce(shrinkOnScroll))
        },

        unbind (el, binding) {
          window.removeEventListener('scroll', debounce(shrinkOnScroll))
        }

      }
    },

    methods: {
      toggleMenu () {
        const nav = document.getElementById('main-menu')
        nav.classList.toggle('show-for-medium')
      }
    }
  }

</script>
