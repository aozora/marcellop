<template>
  <div>
    <!--    <div v-if="isHome"-->
    <!--         v-observe-visibility="{-->
    <!--          callback: homeHeadingVisibilityChanged,-->
    <!--          throttle: 300,-->
    <!--          intersection: {-->
    <!--            threshold: 1,-->
    <!--          },-->
    <!--        }"-->
    <!--         class="homeHeadingScrollSentinel"-->
    <!--    >-->
    <!--    </div>-->

    <SiteHeader :home-header-scrolled="homeHeaderScrolled"></SiteHeader>
    <nuxt/>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default {
  components: {
    SiteFooter,
    SiteHeader
  },

  head() {
    return {
      // title: this.$t('home.title'),
      bodyAttrs: {
        'class': this.$route.name === 'index' ? 'home' : this.$route.name
      }
    };
  },

  data: function () {
    return {
      homeHeaderScrolled: false
    };
  },

  computed: {
    isHome() {
      return this.$route.path === '/';
    }
  },

  methods: {
    homeHeadingVisibilityChanged: function (isVisible, entry) {
      console.log(isVisible);
      this.homeHeaderScrolled = !isVisible;
    }
  }
};
</script>
