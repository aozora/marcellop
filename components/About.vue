<template>
  <section v-if="about" class="about">
    <button type="button" class="scroll-down-button">
      <svg width="26px" height="32px" viewBox="0 0 26 32" xmlns="http://www.w3.org/2000/svg">
        <title>Scroll the page down</title>
        <path d="M11.783 0v26.856l-9.075-9.08L.78 19.704l11.378 11.378.964.918.963-.92 11.378-11.377-1.927-1.928-9.076 9.081V0z" fill="#FFF" fill-rule="nonzero"/>
      </svg>
    </button>

    <div class="about__container">

      <div v-html="about.aboutDescription1"></div>

      <figure v-if="about.aboutPicture" v-observe-visibility="figureVisibilityChanged">
        <img
          :srcset="`${about.aboutPicture.url}?w=630;1280w,
              ${about.aboutPicture.url}?w=630&fit=max;768w,
              ${about.aboutPicture.url}?w=300&fit=max;320w
          `"
          sizes="(min-width: 17em) 50vw, 100vw"
          :src="`${about.aboutPicture.url}?w=630`"
          :alt="about.aboutPicture.alt"
        >
      </figure>

      <div v-html="about.aboutDescription2"></div>
    </div>
  </section>

</template>

<script>
export default {
  name: 'About',

  props: {
    about: {
      required: true,
      type: Object,
      default: () => {
        return undefined;
      }
    }
  },

  methods: {
    figureVisibilityChanged: function (isVisible, entry) {
      isVisible ? entry.target.classList.add('visible') : entry.target.classList.remove('visible');
      // console.log(entry)
    }
  }
};
</script>
