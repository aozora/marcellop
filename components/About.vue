<template>
  <section v-if="about" class="about">
    <button type="button" class="scroll-down-button" aria-hidden="true" @click.prevent="scrollDown('#about')">
      <svg width="26px" height="33px" viewBox="0 0 26 33" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#fff" stroke-width="2.6" fill="none" fill-rule="evenodd" stroke-linecap="square">
          <path d="M13 2l-.09 26"></path>
          <path d="M2.615 20.758L12.91 31.054"></path>
          <path d="M23.461 20.758l-10.55 10.296"></path>
        </g>
      </svg>
    </button>

    <div id="about" class="about__container">

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

    <button type="button" class="scroll-down-button" aria-hidden="true" @click.prevent="scrollDown('#whatido')">
      <svg width="26px" height="33px" viewBox="0 0 26 33" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#fff" stroke-width="2.6" fill="none" fill-rule="evenodd" stroke-linecap="square">
          <path d="M13 2l-.09 26"></path>
          <path d="M2.615 20.758L12.91 31.054"></path>
          <path d="M23.461 20.758l-10.55 10.296"></path>
        </g>
      </svg>
    </button>

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
    },

    scrollDown: function (id) {
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
};
</script>
