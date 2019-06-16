<template>
  <header id="header" :class="{'header--home': isHome ,'header--open': showMobileMenu}">
    <a href="#maincontent">Skip to main content</a>

    <h1 v-if="home"><span>{{ heading1[0] }}</span><br><span>{{ heading1[1] }}</span></h1>

    <!--    <nav id="main-menu" class="main-menu">-->
    <!--      <button class="main-menu__toggle" aria-expanded="false" @click.prevent="toggleMobileMenu">-->
    <!--        <span class="visuallyhidden">Menu</span>-->
    <!--      </button>-->

    <!--      <h1 class="logo">-->
    <!--        <nuxt-link :to="'/'" exact>-->
    <!--        </nuxt-link>-->
    <!--      </h1>-->

    <!--      <ul class="main-menu__menu">-->
    <!--&lt;!&ndash;        <li v-for="(item, index) in menu" :key="index">&ndash;&gt;-->
    <!--&lt;!&ndash;          <nuxt-link :to="item.linkURL.substr(1)" active-class="active" exact>{{ item.title }}</nuxt-link>&ndash;&gt;-->
    <!--&lt;!&ndash;        </li>&ndash;&gt;-->
    <!--      </ul>-->
    <!--    </nav>-->
  </header>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'SiteHeader',

  data: function () {
    return {
      showMobileMenu: false
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
    home: {
      query: gql`{
        home(locale: en) {
          heading1
        }
      }`,
      prefetch: true
    }
  },

  methods: {
    /**
     * Toggle the mobile menu
     */
    // toggleMobileMenu: function () {
    //   this.showMobileMenu = !this.showMobileMenu;
    //   if (process.client) {
    //     // const tl = new TimelineLite();
    //     this.$GSAP.TweenLite.to('.main-menu__toggle-shape',
    //       0.5,
    //       {
    //         morphSVG: {
    //           shape: this.showMobileMenu ? this.mobileMenuPathTo : this.mobileMenuPathFrom,
    //           // precompile: 'log'
    //           map: 'complexity'
    //           //precompile: ['M0.5,8 C9,8 17.5,8 26,8 M0.5,1 C9,1 17.5,1 26,1 M0.5,15 C9,15 17.5,15 26,15 ","M0.734,0.484 C6.74,6.49 12.75,12.5 18.76,18.51 M0.734,18.516 C6.74,12.5 12.75,6.49 18.76,0.48 M18.766,18.516 C18.76,18.51 18.76,18.51 18.76,18.51']
    //         },
    //         rotation: 0.01
    //       });
    //   }
    // }
  }
};
</script>
