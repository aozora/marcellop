<template>
  <header id="header" class="header" :class="{'header--home': isHome ,'header--menu-open': showMobileMenu, 'header--scrolled': homeHeaderScrolled}">

    <nav class="menu">
      <button class="menu__toggle" aria-expanded="false" @click.prevent="toggleMobileMenu">
        <span class="visuallyhidden">Menu</span>
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path class="menu__toggle-close" fill="currentColor" fill-rule="nonzero" d="M12 23h18v2H12zM12 14h24v2H12zM12 32h12v2H12z"/>
            <path class="menu__toggle-open" fill="currentColor" fill-rule="nonzero" d="M15.414 15l16.97 16.97-1.413 1.414L14 16.414z"/>
            <path class="menu__toggle-open" fill="currentColor" fill-rule="nonzero" d="M14.708 32.111l16.97-16.97 1.415 1.414-16.97 16.97z"/>
          </g>
        </svg>
      </button>

      <!--      <h1 class="logo">-->
      <!--        <nuxt-link :to="'/'" exact>-->
      <!--        </nuxt-link>-->
      <!--      </h1>-->

      <ul v-if="menu && menu.menuItems" class="menu__items">
        <li v-for="(item, index) in menu.menuItems" :key="index">
          <nuxt-link :to="item.url.substr(1)" active-class="active" exact>{{ item.title }}</nuxt-link>
        </li>
        <!--      <p class="hero__social">-->
        <!--        <a rel="noopener noreferrer" target="_blank" href="http://www.twitter.com/marcellopalmit" class="button">-->
        <!--          <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns="http://www.w3.org/2000/svg">-->
        <!--            <g stroke="none" stroke-width="1" fill-rule="evenodd">-->
        <!--              <g fill-rule="nonzero">-->
        <!--                <g>-->
        <!--                  <path d="M24,2.557 C23.117,2.949 22.168,3.213 21.172,3.332 C22.189,2.723 22.97,1.758 23.337,0.608 C22.386,1.172 21.332,1.582 20.21,1.803 C19.313,0.846 18.032,0.248 16.616,0.248 C13.437,0.248 11.101,3.214 11.819,6.293 C7.728,6.088 4.1,4.128 1.671,1.149 C0.381,3.362 1.002,6.257 3.194,7.723 C2.388,7.697 1.628,7.476 0.965,7.107 C0.911,9.388 2.546,11.522 4.914,11.997 C4.221,12.185 3.462,12.229 2.69,12.081 C3.316,14.037 5.134,15.46 7.29,15.5 C5.22,17.123 2.612,17.848 -1.77635684e-15,17.54 C2.179,18.937 4.768,19.752 7.548,19.752 C16.69,19.752 21.855,12.031 21.543,5.106 C22.505,4.411 23.34,3.544 24,2.557 Z"></path>-->
        <!--                </g>-->
        <!--              </g>-->
        <!--            </g>-->
        <!--          </svg>-->
        <!--          <span>Twitter</span>-->
        <!--        </a>-->

        <!--        <a rel="noopener noreferrer" target="_blank" href="http://it.linkedin.com/in/marcellopalmitessa" class="button">-->
        <!--          <svg aria-hidden="true" width="24px" height="23px" viewBox="0 0 24 23" version="1.1" xmlns="http://www.w3.org/2000/svg">-->
        <!--            <g stroke="none" stroke-width="1" fill-rule="evenodd">-->
        <!--              <g fill-rule="nonzero">-->
        <!--                <g>-->
        <!--                  <path d="M4.98,2.5 C4.98,3.881 3.87,5 2.5,5 C1.13,5 0.02,3.881 0.02,2.5 C0.02,1.12 1.13,0 2.5,0 C3.87,0 4.98,1.12 4.98,2.5 Z M5,7 L0,7 L0,23 L5,23 L5,7 Z M12.982,7 L8.014,7 L8.014,23 L12.983,23 L12.983,14.601 C12.983,9.931 19.012,9.549 19.012,14.601 L19.012,23 L24,23 L24,12.869 C24,4.989 15.078,5.276 12.982,9.155 L12.982,7 Z"></path>-->
        <!--                </g>-->
        <!--              </g>-->
        <!--            </g>-->
        <!--          </svg>-->
        <!--          <span>LinkedIn</span>-->
        <!--        </a>-->

        <!--        <a rel="noopener noreferrer" target="_blank" href="https://medium.com/@marcellop" class="button">-->
        <!--          <svg width="25" height="19" viewBox="0 0 25 19" xmlns="http://www.w3.org/2000/svg">-->
        <!--            <path d="M3.56 14.373c0 .555-.027.687-.318 1.03L.785 18.388v.396H7.76v-.396l-2.457-2.985c-.29-.343-.344-.502-.344-1.03V5.42l6.126 13.364h.714L17.056 5.42v10.644c0 .29 0 .342-.185.528l-1.847 1.796v.396h9.19v-.396l-1.822-1.796c-.183-.186-.21-.238-.21-.528V2.937c0-.29.027-.344.21-.528L24.215.61V.216h-6.47L13.12 11.758 7.92.216h-6.79v.396l2.14 2.64c.24.292.29.37.29.768v10.353h.002z" fill-rule="nonzero"/>-->
        <!--          </svg>-->
        <!--          <span>Medium</span>-->
        <!--        </a>-->
        <!--      </p>-->
      </ul>

      <button class="menu__search" aria-expanded="false">
        <span class="visuallyhidden">Search</span>
        <svg with="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <g fill="currentColor" fill-rule="nonzero">
              <path d="M21.75 31.5A9.73 9.73 0 0 1 12 21.75c0-5.4 4.35-9.75 9.75-9.75s9.75 4.35 9.75 9.75-4.35 9.75-9.75 9.75zm0-18a8.226 8.226 0 0 0-8.25 8.25A8.226 8.226 0 0 0 21.75 30 8.226 8.226 0 0 0 30 21.75a8.226 8.226 0 0 0-8.25-8.25z"/>
              <path d="M29.012 27.95l6.735 6.735-1.061 1.061-6.735-6.735z"/>
            </g>
          </g>
        </svg>
      </button>
    </nav>
  </header>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'SiteHeader',

  props: {
    homeHeaderScrolled: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      showMobileMenu: false,
    };
  },

  computed: {
    isHome() {
      return this.$route.path === '/';
    },

    heading1() {
      if (this.home) {
        return this.home.heading1.split(' ');
      }

      return [];
    }
  },

  apollo: {
    menu: {
      query: gql`{
        menu(locale: en) {
          menuItems {
            title
            url
          }
        }
      }`,
      prefetch: true
    }
  },

  methods: {
    // homeHeadingVisibilityChanged: function (isVisible, entry) {
    //   this.homeHeadingScrolled = !isVisible;
    // }

    /**
     * Toggle the mobile menu
     */
    toggleMobileMenu: function () {
      this.showMobileMenu = !this.showMobileMenu;
    }
  }
};
</script>
