<script context="module" lang="ts">
import { homeQuery } from "../queries/home.query";
import type { RequestType } from "$lib/datocms";
import { request } from "$lib/datocms";
import type { Load } from "@sveltejs/kit";
import { menu } from "../store";

export const load: Load = async ({ fetch }) => {
  const graphqlRequest: RequestType = {
    query: homeQuery
  };

  try {
    return {
      props: {
        data: await request(graphqlRequest)
      }
    };
  } catch (error) {
    console.error({ error });
    return {
      status: 500,
      error: error
    };
  }
};
</script>

<script lang="ts">

import type { Home, MenuItem, Site } from "../types";
import { Image } from "svelte-datocms";
import HeroCanvas from "../components/HeroCanvas.svelte";

export type HomeProps = {
  site: Site,
  menu: {
    menuItems: Array<MenuItem>
  },
  home: Home
}

/**
 * Props
 */
export let data: HomeProps;

menu.update(() => {
  return data.menu.menuItems;
});

/**
 * State
 */
// const heroData:HeroData = {
//   hi: data.home.hi,
//   heading1: data.home.heading1,
//   heading2A: data.home.heading2A,
//   heading2B: data.home.heading2B,
//   heading2C: data.home.heading2C
// }

</script>

<div>
  <HeroCanvas />

  <section class="hero">

    <h1>
      {data.home.heading1}
      <br />
      Design Engineer
    </h1>

    <section class="about">
      <div id="about" class="about-container">
        <h2>{data.home.aboutHeading}</h2>

        <div class="image-container">
          <Image
            class="image-wrapper"
            data={{
              ...data.home.aboutPicture.responsiveImage
            }}
          />
        </div>

        <div class="about-container-textblock-wrapper">
          <p class="dropcap">{@html data.home.aboutDescription1}</p>
        </div>
        <div class="about-container-textblock-wrapper">
          <p>{@html data.home.aboutDescription2}</p>
        </div>

        <div class="about-container-textblock-wrapper">
          <p>{@html data.home.aboutDescription3}</p>
        </div>

        <div class="about-container-textblock-wrapper">
          <p>{@html data.home.aboutDescription4}</p>
        </div>
      </div>
    </section>
  </section>
</div>


<style lang="scss">
  @import '../styles/shared';

  h1 {
    width: 100%;
    margin: 0 auto;
    text-align: center;
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

