<template>
  <section v-if="about" class="about">
    <div id="about" class="about__container">
      <h2>{{ about.aboutHeading }}</h2>

      <div v-observe-visibility="{ callback: animateParagraph, once: true }" v-html="about.aboutDescription1"></div>
      <div v-observe-visibility="{ callback: animateParagraph, once: true }" v-html="about.aboutDescription2"></div>

      <figure v-if="about.aboutPicture" v-observe-visibility="{ callback: figureVisibilityChanged, once: true }">
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

      <div v-observe-visibility="{ callback: animateParagraph, once: true }" v-html="about.aboutDescription3"></div>
      <div v-observe-visibility="{ callback: animateParagraph, once: true }" v-html="about.aboutDescription4"></div>
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

  data: () => {
    return {
      hasOSReducedMotion: process.client ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
      chars: []
    };
  },

  mounted() {
    // console.log(`this.hasOSReducedMotion = ${this.hasOSReducedMotion}`);

    // prepare text to be animated
    if (!this.hasOSReducedMotion) {
      const entries = document.querySelectorAll('.about__container p');
      for (let index = 0; index < entries.length; index += 1) {
        entries[index].style.visibility = 'hidden';
        entries[index].style.opacity = 0;
        entries[index].style.transform = 'matrix(1, 0, 0, 1, 0, 40)';
      }
    }
  },

  methods: {
    figureVisibilityChanged: function (isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add('animated');
      }
    },

    animateParagraph: function (isVisible, entry) {
      if (isVisible && !this.hasOSReducedMotion) {
        // elements to animate
        const paragraph = entry.target.querySelector('p');
        // const tl = new this.$gsap.TimelineLite();
        // tl.from(paragraph, 2, { opacity: 0 });

        TweenLite.to(paragraph, 1, {
          autoAlpha: 1,
          y: 0,
          ease: Circ.easeOut
        }, 1);
      }
    }

    // scrollDown: function (id) {
    //   document.querySelector(id).scrollIntoView({
    //     behavior: 'smooth'
    //   });
    // }
  }
};
</script>
