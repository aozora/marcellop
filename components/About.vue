<template>
  <section v-if="about" class="about">
    <div class="about__container">

      <p v-html="about.aboutDescription1"></p>

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

      <p v-html="about.aboutDescription2"></p>
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
