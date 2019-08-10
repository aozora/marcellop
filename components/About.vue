<template>
  <section v-if="about" class="about">
    <!--    <button type="button" class="scroll-down-button" aria-hidden="true" @click.prevent="scrollDown('#about')">-->
    <!--      <svg width="26px" height="33px" viewBox="0 0 26 33" xmlns="http://www.w3.org/2000/svg">-->
    <!--        <g stroke="#fff" stroke-width="2.6" fill="none" fill-rule="evenodd" stroke-linecap="square">-->
    <!--          <path d="M13 2l-.09 26"></path>-->
    <!--          <path d="M2.615 20.758L12.91 31.054"></path>-->
    <!--          <path d="M23.461 20.758l-10.55 10.296"></path>-->
    <!--        </g>-->
    <!--      </svg>-->
    <!--    </button>-->

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
        const clone = entries[index].cloneNode(true);
        clone.classList.add('visuallyhidden');
        clone.setAttribute('role', 'text');

        // entries[index].style.opacity = this.hasOSReducedMotion ? '1' : '0';
        const mySplitText = new this.$gsap.SplitText(entries[index], { type: "words" });
        const chars = mySplitText.chars; //an array of all the divs that wrap each word

        // hide form AT, otherwise every single char/word will be read standalone
        // for (let index = 0; index < chars.length; index+=1) {
        //   chars[index].setAttribute('aria-hidden', 'true');
        // }
        entries[index].setAttribute('aria-hidden', 'true');
        entries[index].parentNode.append(clone);
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
      // console.log(`animateParagraph triggered -  isVisible: ${isVisible}`);
      if (isVisible && !this.hasOSReducedMotion) {
        // elements to animate
        const paragraph = entry.target.querySelector('p');
        const chars = paragraph.querySelectorAll('div');
        // const numChars = chars.length;

        const tl = new this.$gsap.TimelineLite();

        // for (let index = 0; index < numChars; index += 1) {
        //   console.dir(chars[index]);
        //
        //   //random value used as position parameter
        //   tl.from(chars[index], 2, { opacity: 0 }, Math.random() * 2,
        //     function () {
        //       entry.target.classList.add('animated');
        //       console.log('animated');
        //     }
        //   );
        // }

        tl.staggerFrom(chars, 1.8,
          { opacity: 0, /* scale: 0, y: 80, rotationX: 180, transformOrigin: "0% 50% -50", */ ease: this.$gsap.Back.easeOut },
          0.02, // delay
          "+=0",
        );
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
