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
