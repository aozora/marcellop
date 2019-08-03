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
      <h2>About</h2>

      <div v-html="about.aboutDescription1"></div>
      <div v-observe-visibility="animateParagraph" v-html="about.aboutDescription2"></div>

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

      <div v-html="about.aboutDescription3"></div>
      <div v-html="about.aboutDescription4"></div>
    </div>

    <!--    <button type="button" class="scroll-down-button" aria-hidden="true" @click.prevent="scrollDown('#whatido')">-->
    <!--      <svg width="26px" height="33px" viewBox="0 0 26 33" xmlns="http://www.w3.org/2000/svg">-->
    <!--        <g stroke="#fff" stroke-width="2.6" fill="none" fill-rule="evenodd" stroke-linecap="square">-->
    <!--          <path d="M13 2l-.09 26"></path>-->
    <!--          <path d="M2.615 20.758L12.91 31.054"></path>-->
    <!--          <path d="M23.461 20.758l-10.55 10.296"></path>-->
    <!--        </g>-->
    <!--      </svg>-->
    <!--    </button>-->

  </section>

</template>

<script>
import { TweenLite, TimelineLite } from 'gsap';

let SplitText;

if (process.client) {
  SplitText = require('../lib/gsap/SplitText');
}

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

  // mounted() {
  //   if (process.client) {
  //     // elements to animate
  //     const paragraphs = document.querySelector('.about__container p'); // for now only the 1st p
  //
  //     const tl = new TimelineLite;
  //     const mySplitText = new SplitText(paragraphs, { type: "words" });
  //     const chars = mySplitText.chars; //an array of all the divs that wrap each character
  //
  //     TweenLite.set(paragraphs, { perspective: 400 });
  //     tl.staggerFrom(chars, 0.8, { opacity: 0, scale: 0, y: 80, rotationX: 180, transformOrigin: "0% 50% -50", ease: Back.easeOut }, 0.01, "+=0");
  //   }
  // },

  methods: {
    figureVisibilityChanged: function (isVisible, entry) {
      isVisible ? entry.target.classList.add('visible') : entry.target.classList.remove('visible');
      // console.log(entry);
    },

    animateParagraph: function (isVisible, entry) {
      console.log(`animateParagraph triggered -  isVisible: ${isVisible}`);

      if (isVisible && process.client) {
        // elements to animate
        const paragraph = entry.target.querySelector('p'); // document.querySelector('.about__container p'); // for now only the 1st p

        const tl = new TimelineLite();
        const mySplitText = new window.SplitText(paragraph, { type: "words" });
        // const chars = mySplitText.chars; //an array of all the divs that wrap each character
        const words = mySplitText.words; //an array of all the divs that wrap each word

        TweenLite.set(paragraph, { perspective: 400 });

        // console.log({ mySplitText });
        // console.log({ paragraph });
        // console.log({ words });

        tl.staggerFrom(words, 1.8,
          { opacity: 0, scale: 0, y: 80, rotationX: 180, transformOrigin: "0% 50% -50", ease: Back.easeOut },
          0.01, "+=0",
          function () {
            console.log('gsap');
          }
        );
        // tl.restart();
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
