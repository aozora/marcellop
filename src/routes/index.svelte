<script lang="ts">
import type { Home, Menu, SeoMetaTagType, Site } from "$lib/types";
import { Image } from "svelte-datocms";
import What from "../components/What.svelte";
import Seo from "../components/Seo.svelte";
import { menuItems } from "../store";
import { onMount } from "svelte";
import { fly } from "svelte/transition";
import HeroCanvas from "../components/HeroCanvas.svelte";
import { intersectionAPI } from "svelte-intersection-api-action";

export type HomeProps = {
  site: Site,
  menu: Menu,
  home: Home
}

/**
 * PROPS
 */
export let data: HomeProps;
let { site, menu, home }: HomeProps = data;

// write the menuItems store with the data form the page endpoint
// the Header component will use that.
menuItems.update(() => {
  return menu.menuItems;
});

/**
 * State
 */
const metaTags: Array<SeoMetaTagType> = home && home.seo ? home.seo.concat(site.favicon) : [];
const heroHeading1Words = home.heading1.split(" ");
const heroHeading2Words = home.heading2.split(" ");


let animate = false;
onMount(() => {
  animate = true;
});


/**
 *
 */


</script>

<Seo
  siteSeo={site.globalSeo}
  metaTags={metaTags}
  canonicalUrl={null}
  pageLink={
          {
            id: home.id,
            slug: home.slug,
            _modelApiKey: home._modelApiKey
          }
        }
/>

<div class="main-content">
  <HeroCanvas />
  <!--    <div class="canvas-container">-->
  <!--      <canvas bind:this={canvas}></canvas>-->
  <!--    </div>-->

  <section class="hero">
    {#if animate}
      <h1 class="splitting">
        {#each heroHeading1Words as word}
        <span class="word">
          {#each Array.from(word) as char, index}
            <span class="char" in:fly={{y:-20, duration: 1000, delay: 90 * index}}>{char}</span>
          {/each}
          &nbsp;
        </span>
        {/each}

        <br />

        {#each heroHeading2Words as word}
        <span class="word">
          {#each Array.from(word) as char, index}
            <span class="char" in:fly={{y:20, duration: 1000, delay: 90 * index}}>{char}</span>
          {/each}
          &nbsp;
        </span>
        {/each}
      </h1>
    {/if}

    <!--{/*<p>*/}-->
    <!--{/*  <span>{heading2A}</span>*/}-->
    <!--{/*  <span>{heading2B}</span>*/}-->
    <!--{/*  <span>{heading2C}</span>*/}-->
    <!--{/*</p>*/}-->
  </section>

  <section class="about" use:intersectionAPI on:crossed={(e)=>doSomething(e.detail)}>
    <div id="about" class="about-container">
      <h2>{home.aboutHeading}</h2>

      <div class="image-container">
        <Image
          class="image-wrapper"
          data={{
              ...home.aboutPicture.responsiveImage
            }}
        />
      </div>

      <div class="about-container-textblock-wrapper">
        <p class="dropcap">{@html home.aboutDescription1}</p>
      </div>
      <div class="about-container-textblock-wrapper">
        <p>{@html home.aboutDescription2}</p>
      </div>

      <div class="about-container-textblock-wrapper">
        <p>{@html home.aboutDescription3}</p>
      </div>

      <div class="about-container-textblock-wrapper">
        <p>{@html home.aboutDescription4}</p>
      </div>
    </div>
  </section>

  <What home={home} />

</div>


<style lang="scss">
  @import '../styles/shared';

  .main-content > section,
  .main-content > article {
    position: relative;
    z-index: 1;
  }

  h1 {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

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

  .about {
    position: relative;
    width: 100%;
    max-width: none;
    padding: 25% 0;
    //background-color: var(--color-primary);
    //will-change: clip-path;

    @media (min-width: 64em) {
      padding: 15% 0;
    }
  }

  .about-container {
    position: relative;
    @include container;

    @media (min-width: 64em) {
      //display: grid;
      //grid-template-columns: 1fr 1fr;
      //grid-template-rows: repeat(6, auto); // auto auto auto auto auto;
      //grid-template-areas: "heading2 heading2" "figure figure" "content1 ." ". content2" "content3 ." ". content4";
      //background-color: var(--color-black);
    }

    h2 {
      position: relative;
      grid-area: heading2;
      justify-self: start;
      width: 100%;
      max-width: none;
      margin-bottom: -6rem;
      padding: 0;
      font-size: 20vw;
      line-height: 1.3;
      text-align: center;
      z-index: 2;
      //color: var(--color-white);

      @media (max-width: 360px) {
        margin-top: 3rem;
      }
    }

    p {
      width: 100%;
      margin: 0;
      //color: var(--color-white);
      letter-spacing: var(--text-on-dark-letter-spacing);

      &.dropcap {
        @include dropcap;
      }

      &:first-line {
        //--text-weight: 700;
        font-weight: 500;
      }
    }
  }

  .image-container {
    overflow: hidden;
    z-index: 1;

    @media (min-width: 64em) {
      grid-area: figure;
      margin: 0;
      padding: 0;
    }
  }

  .image-wrapper {
    margin: 0;
    padding: 0 0 0 calc(2 * var(--text-base-size));

    img {
      //max-width: 630px;
      margin: 0 auto;
      object-fit: cover;
      //clip-path: polygon(0% 4.43%, 24.53% 0.5%, 47.1% 4.64%, 73.96% 2.89%, 100% 4.89%, 100.00% 96.68%, 73.53% 100%, 46.73% 95.15%, 21.78% 100%, 0% 95.36%)
    }

    @media (min-width: 64em) {
      //grid-area: figure;
      margin: 0;
      padding: 0;
    }
  }

  .about-container-textblock-wrapper {
    padding: calc(1 * var(--text-base-size)) 0;

    p {
      line-height: 1.6;
      margin-bottom: calc(1 * var(--text-base-size));
    }

    @media (min-width: 64em) {
      &:nth-child(2) {
        grid-area: content1;
      }

      &:nth-child(3) {
        grid-area: content2;
      }

      &:nth-child(5) {
        grid-area: content3;
      }

      &:nth-child(6) {
        grid-area: content4;
      }

    }
  }

</style>

