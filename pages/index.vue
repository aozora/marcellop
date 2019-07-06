<template>
  <main>
    <!--    <g-link to="/" class="home-logo">-->
    <!--      <svg viewBox="0 0 105 67" xmlns="http://www.w3.org/2000/svg">-->
    <!--        <g fill-rule="nonzero" fill="none">-->
    <!--          <g transform="translate(17.268 40.846)" fill="#414141">-->
    <!--            <ellipse cx="2.61" cy="2.615" rx="2.61" ry="2.615"/>-->
    <!--            <ellipse cx="31.317" cy="2.615" rx="2.61" ry="2.615"/>-->
    <!--          </g>-->
    <!--          <path d="M32.927 46.077h2.61a2.613 2.613 0 0 0 2.61 2.615c1.44 0 2.61-1.17 2.61-2.615h2.609a5.225 5.225 0 0 1-5.22 5.23 5.202 5.202 0 0 1-3.914-1.77 5.202 5.202 0 0 1-3.915 1.77 5.225 5.225 0 0 1-5.22-5.23h2.61a2.613 2.613 0 0 0 2.61 2.615c1.441 0 2.61-1.17 2.61-2.615z" fill="#414141"/>-->
    <!--          <path d="M14.659 63.077H4.219V4.767l30.154 29.155L62.939 4.231V45.309a7.83 7.83 0 1 0 15.659 0V13.385h12.375c5.416 0 9.807 4.39 9.807 9.807 0 5.417-4.39 9.808-9.807 9.808h-.632" stroke="#414141" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>-->
    <!--          <path d="M14.659 59.154a3.919 3.919 0 0 1 3.914 3.923A3.919 3.919 0 0 1 14.66 67H4.219a3.919 3.919 0 0 1-3.914-3.923V4.767c0-3.461 4.147-5.226 6.633-2.823l27.335 26.43L60.12 1.508C62.566-1.033 66.854.7 66.854 4.23v41.06a3.919 3.919 0 0 0 3.914 3.924 3.919 3.919 0 0 0 3.915-3.923V13.385a3.919 3.919 0 0 1 3.915-3.923h12.396c7.567 0 13.701 6.147 13.701 13.73 0 7.584-6.134 13.731-13.701 13.731h-.653A3.919 3.919 0 0 1 86.427 33a3.919 3.919 0 0 1 3.914-3.923h.653c3.243 0 5.872-2.635 5.872-5.885s-2.63-5.884-5.872-5.884h-8.482v27.984c0 6.5-5.258 11.769-11.744 11.769s-11.744-5.27-11.744-11.77v-31.34L37.191 36.646a3.909 3.909 0 0 1-5.536.1L8.135 14.004v45.15h6.524z" fill="#414141"/>-->
    <!--        </g>-->
    <!--      </svg>-->
    <!--    </g-link>-->

    <hero></hero>
    <about></about>
    <what></what>
    <!--    <experience></experience>-->
    <!--    <contact></contact>-->

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <!--    <g-image alt="Example image" _src="~/favicon.png" width="135" />-->
  </main>
</template>

<script>
import gql from 'graphql-tag';
import Hero from '../components/Hero';
import About from '../components/About';
import What from '../components/What';
// import Experience from '../components/Experience';
// import Contact from '../components/Contact';

export default {
  components: { /* Contact, Experience, */ What, About, Hero },

  head() {
    return {
      // title: this.$t('home.title'),
      link: [
        ...this.getSeoMetaData()
      ]
    };
  },


  apollo: {
    home: gql`
{
  home(locale: en) {
    _seoMetaTags {
      attributes
      content
      tag
    }
  }
}
`
  },


  mounted() {
    if (process.client) {
      document.querySelector('body').classList.add('loaded');
    }
  },

  methods: {
    getSeoMetaData: function () {
      if (!this.home) {
        return [];
      }

      return this.home._seoMetaTags.filter(meta => meta.tag === 'meta')
        .map((meta) => {
          if (meta.attributes !== null) {

            const m = {};
            const attributes = Object.keys(meta.attributes);

            for (let index = 0; index < attributes.length; index++) {
              m[attributes[index]] = meta.attributes[attributes[index]];
            }

            return m;
          }
        });
    }
  }
};
</script>
