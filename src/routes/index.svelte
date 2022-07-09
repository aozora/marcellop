<script lang="ts">
import type { Home, Menu, SeoMetaTagType, Site } from "$lib/types";
import { Image } from "svelte-datocms";
import What from "../components/What.svelte";
import Seo from "../components/Seo.svelte";
import { menuItems } from "$lib/stores/menu-store";
import { onMount } from "svelte";
import { fly } from "svelte/transition";
import HeroCanvas from "../components/HeroCanvas.svelte";
import { intersectionAPI } from "$lib/intersection-observer-action.ts";
import { aboutSectionIsInView } from "$lib/stores/home-scroll-store";
import CanvasWrapper from "../components/CanvasWrapper.svelte";

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
const heading1Ja = home.heading1Ja.split(" ");

let animate = false;
onMount(() => {
  animate = true;
});


/**
 * Scroll managment
 */
const updateAboutIsInView = (isInView) => {
  aboutSectionIsInView.update(() => isInView);
};


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
  <CanvasWrapper>
    <!--    <HeroCanvas />-->
  </CanvasWrapper>

  <section class="hero">
    {#if animate}
      <h1 class="splitting">
        <span class="visuallyhidden">{home.heading1}</span>
        {#each heroHeading1Words as word, wordIndex}
          <div class="word">
            {#each Array.from(word) as char, index}
            <span aria-hidden="true" class="char" in:fly={{y: index % 2 === 0 ? -20 : 20, duration: 1000, delay: 90 * index}}>
              {char}
            </span>
            {/each}

            <div class="title-hover">
              <span lang="ja">{heading1Ja[wordIndex]}</span>
            </div>
          </div>
          <!--{#if wordIndex < heroHeading1Words.length - 1}&nbsp;{/if}-->
        {/each}
      </h1>

      <h2>
        <span class="visuallyhidden">{home.heading2}</span>
        {#each heroHeading2Words as word, wordIndex}
        <span class="word">
          {#each Array.from(word) as char, index}
            <span aria-hidden="true" class="char" in:fly={{y:20, duration: 1000, delay: 90 * index}}>{char}</span>
          {/each}
        </span>
          {#if wordIndex < heroHeading2Words.length - 1}&nbsp;{/if}
        {/each}

        <div class="title-hover">
          <span lang="ja">{home.heading2Ja}</span>
        </div>
      </h2>
    {/if}
  </section>

  <section class="about" use:intersectionAPI on:crossed={(e)=>{
    updateAboutIsInView(e.detail.isIntersecting);
  }}>
    <div id="about" class="about-container">
      <!--      <h2>{home.aboutHeading}</h2>-->

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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @include container;
    height: 90vh;
    padding: 3rem 1rem 0 1rem;
    margin-bottom: 2rem;

    h1 {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: none;
      margin: 0 auto 2rem auto;
      font-family: var(--heading-font-family);
      font-size: clamp(2.88rem, 5.4vw + 1.8rem, 6.667rem);
      font-weight: 300;
      line-height: var(--hero-h1-line-height-min);
      text-align: left;
      text-transform: uppercase;

      @media (max-width: 360px) {
        font-size: 2.5rem;
      }

      span{
        font-family: var(--heading-font-family);
        font-size: clamp(2.88rem, 5.4vw + 1.8rem, 6.667rem);
        font-weight: 300;
        line-height: var(--hero-h1-line-height-min);
      }

      [lang="ja"] {
        font-size: 32px;
        transform: translateX(-100%);
        transition: transform .5s ease-out;
      }

      &:hover {
        .title-hover {
          [lang="ja"] {
            @media (min-width: 64em) {
              transform: translateX(0);
            }
          }
        }
      }
    }

    .title-hover {
      position: relative;
      display: inline-flex;
      overflow: hidden;

      @media (max-width: 64em) {
        display: none;
      }
    }

    h2 {
      position: relative; // needed for reveal animation
      width: 100%;
      max-width: none;
      margin: 0 0 .667rem 0;
      font-family: var(--heading-font-family);

      --text-weight: var(--hero-weight);
      //@if $use-variable-font-for-headings {
      //  font-variation-settings: 'wght' var(--hero-weight), 'slnt' var(--hero-slant);
      //}

      font-size: clamp(var(--hero-hi-font-size-min), 8vw, var(--hero-hi-font-size-max));
      font-size: clamp(1.778rem, 3.2vw + 1.1rem, 4rem);
      line-height: var(--hero-hi-line-height-min);
      text-align: right;

      .title-hover {
        position: absolute;
        top: -32px;
        right: 0;

      }

      [lang="ja"] {
        font-size: 32px;
        text-align: right;
        transform: translateY(100%);
        transition: transform .5s ease-out;
      }

      &:hover {
        .title-hover {
          [lang="ja"] {
            @media (min-width: 64em) {
              transform: translateY(0);
            }
          }
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

