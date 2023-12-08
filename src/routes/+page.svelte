<script lang="ts">
import type { Home, Menu, Site } from '$lib/types';
import What from '../components/What.svelte';
import { menuItems } from '$lib/stores/menu-store';
import { intersectionAPI } from '$lib/intersection-observer-action.ts';
import { aboutSectionIsInView } from '$lib/stores/home-scroll-store';
import { onMount } from 'svelte';
import { fly } from 'svelte/transition';
// import { Image } from "svelte-datocms";
// import Seo from "../components/Seo.svelte";
// import HeroCanvas from "../components/HeroCanvas.svelte";
// import CanvasWrapper from "../components/CanvasWrapper.svelte";

export type HomeProps = {
	site: Site,
	menu: Menu,
	home: Home
}

/**
 * PROPS
 */
export let data: HomeProps;
let { /* site, */ menu, home }: HomeProps = data;

// write the menuItems store with the data form the page endpoint
// the Header component will use that.
menuItems.update(() => {
	return menu.menuItems;
});

/**
 * State
 */
// const metaTags: Array<SeoMetaTagType> = home && home.seo ? home.seo.concat(site.favicon) : [];
// const heroHeading1Words = home.heading1.split(' ');
// const heroHeading2Words = home.heading2.split(' ');

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

<!--<Seo-->
<!--  siteSeo={site.globalSeo}-->
<!--  metaTags={metaTags}-->
<!--  canonicalUrl={null}-->
<!--  pageLink={-->
<!--          {-->
<!--            id: home.id,-->
<!--            slug: home.slug,-->
<!--            _modelApiKey: home._modelApiKey-->
<!--          }-->
<!--        }-->
<!--/>-->

<div class="main-content">
	<!--  <CanvasWrapper>-->
	<!--    <HeroCanvas />-->
	<!--  </CanvasWrapper>-->

	<div class="hero">
<!--		    <h1>{home.heading1}</h1>-->
<!--		    <h2>{home.heading2}</h2>-->

		{#if animate}
			<h1 class="splitting">
				<span class="visuallyhidden">{home.heading1}</span>
				{#each Array.from(home.heading1) as char, index}
            <span aria-hidden="true" class="char" in:fly={{y: index % 2 === 0 ? -20 : 20, duration: 1000, delay: 90 * index}}>
              {#if char === ' '}
								&nbsp;
							{:else}
								{char}
							{/if}
            </span>
				{/each}
			</h1>

			<h2>
				<span class="visuallyhidden">{home.heading2}</span>
				{#each Array.from(home.heading2) as char, index}
					<span aria-hidden="true" class="char" in:fly={{y:20, duration: 1000, delay: 90 * index}}>
						{#if char === ' '}
								&nbsp;
							{:else}
								{char}
							{/if}
					</span>
				{/each}
			</h2>
		{/if}
		<!--    <div class="decoration" aria-hidden="true">S</div>-->
	</div>

	<!--  <section class="about" use:intersectionAPI on:crossed={(e)=>{-->
	<!--    updateAboutIsInView(e.detail.isIntersecting);-->
	<!--  }}>-->
	<!--    <div id="about" class="about-container">-->
	<!--      &lt;!&ndash;      <h2>{home.aboutHeading}</h2>&ndash;&gt;-->

	<!--      &lt;!&ndash;      <div class="about-container-textblock-wrapper">&ndash;&gt;-->
	<!--      &lt;!&ndash;        <p class="dropcap">{@html home.aboutDescription1}</p>&ndash;&gt;-->
	<!--      &lt;!&ndash;      </div>&ndash;&gt;-->

	<!--      <div class="image-container">-->
	<!--        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">-->
	<!--          <defs>-->
	<!--            <filter id="squiggly-0">-->
	<!--              <feTurbulence id="turbulence" baseFrequency="0.01" numOctaves="3" result="noise" seed="0" />-->
	<!--              <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />-->
	<!--            </filter>-->
	<!--            <filter id="squiggly-1">-->
	<!--              <feTurbulence id="turbulence" baseFrequency="0.01" numOctaves="3" result="noise" seed="1" />-->
	<!--              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />-->
	<!--            </filter>-->
	<!--            <filter id="squiggly-2">-->
	<!--              <feTurbulence id="turbulence" baseFrequency="0.01" numOctaves="3" result="noise" seed="2" />-->
	<!--              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />-->
	<!--            </filter>-->
	<!--            <filter id="squiggly-3">-->
	<!--              <feTurbulence id="turbulence" baseFrequency="0.01" numOctaves="3" result="noise" seed="3" />-->
	<!--              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />-->
	<!--            </filter>-->
	<!--            <filter id="squiggly-4">-->
	<!--              <feTurbulence id="turbulence" baseFrequency="0.01" numOctaves="3" result="noise" seed="4" />-->
	<!--              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />-->
	<!--            </filter>-->
	<!--          </defs>-->
	<!--        </svg>-->

	<!--        {#each home.aboutPicture as picture}-->
	<!--          <img loading="lazy"-->
	<!--               fetchpriority="low"-->
	<!--               src={picture.responsiveImage.src}-->
	<!--               srcset={picture.responsiveImage.srcSet}-->
	<!--               sizes={picture.responsiveImage.sizes}-->
	<!--               alt={picture.responsiveImage.alt}-->
	<!--               style="aspect-ratio: {picture.responsiveImage.aspectRatio};"-->
	<!--          />-->
	<!--        {/each}-->
	<!--      </div>-->

	<!--      &lt;!&ndash;      <div class="about-container-textblock-wrapper">&ndash;&gt;-->
	<!--      &lt;!&ndash;        <p>{@html home.aboutDescription2}</p>&ndash;&gt;-->
	<!--      &lt;!&ndash;      </div>&ndash;&gt;-->

	<!--      &lt;!&ndash;      <div class="about-container-textblock-wrapper">&ndash;&gt;-->
	<!--      &lt;!&ndash;        <p>{@html home.aboutDescription3}</p>&ndash;&gt;-->
	<!--      &lt;!&ndash;      </div>&ndash;&gt;-->

	<!--      &lt;!&ndash;      <div class="about-container-textblock-wrapper">&ndash;&gt;-->
	<!--      &lt;!&ndash;        <p>{@html home.aboutDescription4}</p>&ndash;&gt;-->
	<!--      &lt;!&ndash;      </div>&ndash;&gt;-->
	<!--    </div>-->
	<!--  </section>-->

	<!--  <What home={home} />-->

</div>


<style lang="scss">
  @import '../styles/shared';

  @keyframes squiggly-anim {
    0% {
      filter: url('#squiggly-0')
    }

    15% {
      filter: url('#squiggly-1')
    }

    25% {
      filter: url('#squiggly-2')
    }

    35% {
      filter: url('#squiggly-3')
    }

    50% {
      filter: url('#squiggly-4')
    }
    // -

    65% {
      filter: url('#squiggly-4')
    }

    80% {
      filter: url('#squiggly-3')
    }

    100% {
      filter: url('#squiggly-2')
    }

    75% {
      filter: url('#squiggly-1')
    }

    100% {
      filter: url('#squiggly-0')
    }
  }

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
    justify-content: center;
    align-items: center;
    @include container;
    height: 90vh;
    padding: 3rem 1rem 0 1rem;
    margin-bottom: 2rem;

    h1 {
      //display: flex;
      //flex-direction: column;
      width: 100%;
      max-width: none;
      margin: 0 auto 2rem auto;
      font-family: var(--heading-font-family);
      //font-size: clamp(2.88rem, 5.4vw + 1.8rem, 6.667rem);
      font-size: clamp(2.88rem, 6.3vw + 1.4rem, 7.1rem);
      line-height: var(--hero-h1-line-height-min);
      text-align: center;
      text-transform: uppercase;
      @include ligature;
      //@include light-shadow;
      //color: oklch(85% .1 320);

      @media (max-width: 360px) {
        font-size: 2.5rem;
      }
    }

    h2 {
      position: relative; // needed for reveal animation
      width: 100%;
      max-width: none;
      margin: 0 0 .667rem 0;
      font-family: var(--heading-font-family);
      font-size: clamp(2.88rem, 6.3vw + 1.4rem, 7.1rem);
      line-height: var(--hero-hi-line-height-min);
      text-align: center;
      @include ligature;
      //@include light-shadow;
      //color: oklch(85% .1 320);
    }

    .decoration {
      position: absolute;
      bottom: -45%;
      left: -10%;
      font-family: var(--heading-font-family);
      font-weight: 400;
      font-size: 38rem;
      line-height: 1;
      @include ligature;
      color: #ccc;
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
    position: relative;
    z-index: 1;
    margin: 6rem 0;
    padding: 0;

    @media (min-width: 48em) {
      display: grid;
      grid-template-columns: repeat(var(--grid-columns-mobile), 1fr);
      grid-template-rows: repeat(7, 1fr);
      grid-gap: 0;
      gap: 0;
      align-items: start;
      width: 100%;
    }

    svg {
      display: none;
    }

    img {
      border: 8px solid var(--color-white);

      &:nth-child(2) {
        grid-column: 1/7;
        grid-row: 2/7;
      }

      &:nth-child(3) {
        grid-column: 5/9;
        grid-row: 3/-1;
        z-index: 2;
      }

      &:nth-child(4) {
        grid-column: 8/12;
        grid-row: 1/7;
      }

      &:hover {
        animation: squiggly-anim 1s linear;
        //filter: url('#splash-filter');
      }
    }
  }

  //.image-wrapper {
  //  padding: 0 0 0 calc(2 * var(--text-base-size));
  //
  //  img {
  //    //max-width: 630px;
  //    margin: 0 auto;
  //    object-fit: cover;
  //    //clip-path: polygon(0% 4.43%, 24.53% 0.5%, 47.1% 4.64%, 73.96% 2.89%, 100% 4.89%, 100.00% 96.68%, 73.53% 100%, 46.73% 95.15%, 21.78% 100%, 0% 95.36%)
  //  }
  //
  //  @media (min-width: 64em) {
  //    //grid-area: figure;
  //    margin: 0;
  //    padding: 0;
  //  }
  //}

  .about-container-textblock-wrapper {
    padding: calc(1 * var(--text-base-size)) 0;

    p {
      font-size: clamp(1.33rem, 1.9vw + 0.9rem, 2.667rem);
      line-height: 1.5;
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

