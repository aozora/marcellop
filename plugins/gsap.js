/*
* Source: https://github.com/pirony/ks-vue-scrollmagic/issues/13
* you can use this.$GSAP.TweenMax() this.$GSAP.TimelineMax() in all components,
* create ScrollMagic scenes with new this.$ScrollMagic.Scene(),
* add them to Controller with this.$ScrollMagic.Controller.addScene(scene) and
* remove them with this.$ScrollMagic.Controller.removeScene(scene)
* without working around the limitations of saving them as unique strings.
* */
import Vue from 'vue';
import { TweenLite, TimelineLite, CSSPlugin, Back } from 'gsap/all';
import SplitText from '../lib/gsap/SplitText';

const GSAP = {
  install(Vue, options) {
    // GSAP
    Vue.prototype.$gsap = {
      TweenLite,
      TimelineLite,
      CSSPlugin,
      SplitText,
      Back
    };
  }
};

Vue.use(GSAP);
