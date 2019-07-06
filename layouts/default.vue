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
import gql from 'graphql-tag';
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
      },
      link: [
        ...this.getfaviconMetaTags()
      ]
    };
  },

  data: function () {
    return {
      homeHeaderScrolled: false
    };
  },

  apollo: {
    _site: gql`
{
  _site(locale: en) {
    globalSeo {
      siteName
      facebookPageUrl
      titleSuffix
      twitterAccount
    }
    faviconMetaTags {
      attributes
      content
      tag
    }
  }
}
`
  },

  computed: {
    isHome() {
      return this.$route.path === '/';
    }
  },

  methods: {
    /**
     *
     * @param isVisible
     * @param entry
     */
    homeHeadingVisibilityChanged: function (isVisible, entry) {
      console.log(isVisible);
      this.homeHeaderScrolled = !isVisible;
    },

    /**
     * Get the favicon links for the head
     * @returns {Array|*}
     */
    getfaviconMetaTags: function () {
      if (!this._site) {
        return [];
      }

      return this._site.faviconMetaTags.map((meta) => {
        return { rel: meta.attributes.rel, type: meta.attributes.type, sizes: meta.attributes.sizes, href: meta.attributes.href };
      });
    }
  }
};
</script>
