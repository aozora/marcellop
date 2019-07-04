<template>
  <header id="header" class="header" :class="{'header--home': isHome ,'header--menu-open': showMobileMenu, 'header--scrolled': homeHeaderScrolled}">
    <a href="#maincontent">Skip to main content</a>

    <!--    <h1 v-if="home && isHome">-->
    <!--      <span>{{ heading1[0] }}</span>-->
    <!--      <span>{{ heading1[1] }}</span>-->
    <!--    </h1>-->
    <nav class="menu">
      <button class="menu__toggle" aria-expanded="false" @click.prevent="toggleMobileMenu">
        <span class="visuallyhidden">Menu</span>
        <svg width="24" height="22" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" fill-rule="nonzero" d="M8.5 0C7.43 0 6.498.608 5.906 1.438 5.314 2.268 5 3.34 5 4.5s.314 2.233.906 3.063C6.498 8.393 7.43 9 8.5 9c1.07 0 2.002-.608 2.594-1.438.592-.83.906-1.902.906-3.062s-.314-2.233-.906-3.063C10.502.607 9.57 0 8.5 0zM12 4.5c0 1.16.314 2.233.906 3.063C13.498 8.393 14.431 9 15.5 9c1.07 0 2.002-.608 2.594-1.438.592-.83.906-1.902.906-3.062s-.314-2.233-.906-3.063C17.502.607 16.57 0 15.5 0c-1.07 0-2.002.608-2.594 1.438C12.314 2.268 12 3.34 12 4.5zM3.5 7C2.43 7 1.498 7.608.906 8.438.314 9.268 0 10.34 0 11.5s.314 2.233.906 3.063C1.498 15.393 2.43 16 3.5 16c1.07 0 2.002-.608 2.594-1.438.592-.83.906-1.902.906-3.062s-.314-2.233-.906-3.063C5.502 7.607 4.57 7 3.5 7zm17 0c-1.07 0-2.002.608-2.594 1.438-.592.83-.906 1.902-.906 3.062s.314 2.233.906 3.063C18.498 15.393 19.43 16 20.5 16c1.07 0 2.002-.608 2.594-1.438.592-.83.906-1.902.906-3.062s-.314-2.233-.906-3.063C22.502 7.607 21.57 7 20.5 7zM12 11c-1.333 0-2.263.865-2.72 1.625-.454.76-.734 1.392-1 1.656-.153.157-1.118.52-2.124 1.033-.503.257-1.01.6-1.437 1.125-.43.525-.72 1.25-.72 2.063 0 1.92 1.58 3.5 3.5 3.5.866 0 1.77-.28 2.655-.53C11.043 21.216 12 21 12 21s.957.216 1.844.47c.886.25 1.79.53 2.656.53 1.92 0 3.5-1.58 3.5-3.5 0-.794-.293-1.52-.72-2.03-.425-.513-.937-.83-1.436-1.095-1-.53-1.983-.95-2.125-1.094-.24-.237-.51-.89-.97-1.654C14.29 11.86 13.34 11 12 11z"/>
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
