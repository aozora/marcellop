<script lang='ts'>
import { HeroData } from '$lib/types';

export let hero: HeroData;
</script>

<section class='hero'>
  <h1>
    {hero.heading1}
    <br />
    Design Engineer
  </h1>

  <!--{/*<p>*/}-->
  <!--{/*  <span>{heading2A}</span>*/}-->
  <!--{/*  <span>{heading2B}</span>*/}-->
  <!--{/*  <span>{heading2C}</span>*/}-->
  <!--{/*</p>*/}-->
</section>

<style lang='scss'>
  @import '../styles/shared';

  .hero {
    // use 'em' otherwise the fluid-type mixin doesn't work
    --hero-hi-line-height-min: 1.5em;
    --hero-hi-line-height-max: 1.5em;
    --hero-hi-font-size-min: 1.8rem;
    --hero-hi-font-size-max: 2.18rem;

    // use 'em' otherwise the fluid-type mixin doesn't work
    --hero-h1-line-height-min: 1.1em;
    --hero-h1-line-height-max: 1.1em;

    --hero-h1-font-size-min: 2.6rem;
    --hero-h1-font-size-max: 5.81rem;

    --hero-weight: 900;
    --hero-slant: 2.73;

    --hero-p-line-height-min: 1.5em; // use 'em' otherwise the fluid-type mixin doesn't work
    --hero-p-line-height-max: 1.5em;
    --hero-p-font-size-min: 1.388rem;
    --hero-p-font-size-max: 1.81rem;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    @include container;
    height: 100vh;
    padding: 3rem 1rem 0 1rem;
    margin-bottom: 2rem;
    //background-color: var(--color-white);

    //.hi {
    //  display: none;
    //  width: 100%;
    //  max-width: none;
    //  margin: 0 0 .667rem 0;
    //  font-family: var(--heading-font-family);
    //
    //  --text-weight: var(--hero-weight);
    //  //@if $use-variable-font-for-headings {
    //  //  font-variation-settings: 'wght' var(--hero-weight), 'slnt' var(--hero-slant);
    //  //}
    //
    //  font-size: clamp(var(--hero-hi-font-size-min), 8vw, var(--hero-hi-font-size-max));
    //  line-height: var(--hero-hi-line-height-min);
    //
    //  @media (min-width: 64em) {
    //    display: block;
    //  }
    //}

    h1 {
      max-width: 99%; // this prevent the text to be on the same line between 1024-1032px
      max-height: 28rem;
      margin: 0 auto 2rem auto;

      --text-weight: var(--hero-weight);

      //@if $use-variable-font-for-headings {
      //  font-variation-settings: 'wght' var(--hero-weight), 'slnt' var(--hero-slant);
      //}

      font-size: clamp(var(--hero-h1-font-size-min), 8vw, var(--hero-h1-font-size-max));
      line-height: var(--hero-h1-line-height-min);

      text-align: center;
      text-transform: uppercase;

      @media (max-width: 360px) {
        font-size: 2.5rem;
      }
    }

    p {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      max-width: none;
      margin: 0 0 1rem 0;

      font-size: clamp(var(--hero-p-font-size-min), 8vw, var(--hero-p-font-size-max));
      line-height: var(--hero-p-line-height-min);
      --text-weight: 700;
      letter-spacing: var(--text-on-dark-letter-spacing);

      span {
        display: inline-block;
        padding: 0 1em;
        text-align: right;
        color: var(--color-white);
        background-color: var(--color-black);
        z-index: 1; // prevent color bleeding

        &:first-child {
          margin-right: 2rem;

          @media (max-width: 360px) {
            margin-right: .3rem;
          }
        }

        &:last-child {
          margin-right: 1.5rem;
        }
      }
    }
  }
</style>
