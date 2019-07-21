<template>
  <header id="header" class="header" :class="{'header--home': isHome ,'header--menu-open': showMobileMenu, 'header--scrolled': homeHeaderScrolled}">
    <a href="#maincontent">Skip to main content</a>

    <nav class="menu">
      <button class="menu__toggle" aria-expanded="false" @click.prevent="toggleMobileMenu">
        <span class="visuallyhidden">Menu</span>
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path fill="#000" d="M0 0h48v48H0z"/>
            <path class="menu__toggle-close" fill="currentColor" fill-rule="nonzero" d="M12 23h24v2H12zM12 14h24v2H12zM12 32h24v2H12z"/>
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
      </ul>
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
