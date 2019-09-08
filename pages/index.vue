<template>
  <div>


    <hero :hero="hero"></hero>
    <about :about="about"></about>
    <what :whatido="whatido"></what>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Hero from '../components/Hero';
import About from '../components/About';
import What from '../components/What';
import { DatoCmsSeoMetaTags } from '../apollo/fragments/seoMetaTagsFragmentMixin';

export default {
  components: { /* Contact, Experience, */ What, About, Hero },

  head() {
    return {
      // title: this.$t('home.title'),
      titleTemplate: null,
      meta: [
        ...this.getSeoMetaData()
      ]
    };
  },


  apollo: {
    home: gql`
{
  home(locale: en) {
    hi
    heading1
    heading2A
    heading2B
    heading2C
    aboutHeading
    aboutDescription1(locale: en, markdown: true)
    aboutDescription2(locale: en, markdown: true)
    aboutDescription3(locale: en, markdown: true)
    aboutDescription4(locale: en, markdown: true)
    aboutPicture {
      alt
      url
    }
    whatidoHeading
    whatido {
      title
      description
    }
    seoMetaTags: _seoMetaTags {
      ...DatoCmsSeoMetaTags
    }
  }
}
${DatoCmsSeoMetaTags}
`
  },

  computed: {
    hero() {
      if (!this.home){
        return {};
      }

      return {
        hi: this.home.hi,
        heading1: this.home.heading1,
        heading2A: this.home.heading2A,
        heading2B: this.home.heading2B,
        heading2C: this.home.heading2C
      };
    },

    about() {
      if (!this.home){
        return {};
      }

      return {
        aboutHeading: this.home.aboutHeading,
        aboutDescription1: this.home.aboutDescription1,
        aboutDescription2: this.home.aboutDescription2,
        aboutDescription3: this.home.aboutDescription3,
        aboutDescription4: this.home.aboutDescription4,
        aboutPicture: this.home.aboutPicture
      };
    },

    whatido() {
      if (!this.home){
        return {};
      }

      return {
        heading: this.home.whatidoHeading,
        items: this.home.whatido
      };
    }
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

      return this.home.seoMetaTags.filter(meta => meta.tag === 'meta')
        .map((meta) => {
          if (meta.attributes !== null) {

            const m = {};
            const attributes = Object.keys(meta.attributes);

            for (let index = 0; index < attributes.length; index++) {
              m[attributes[index]] = meta.attributes[attributes[index]];
              m.hid = attributes[index];
            }

            return m;
          }
        });
    }
  }
};
</script>
