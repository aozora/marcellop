<script lang="ts">
import type { Home, Menu, Site } from '$lib/types';
// import What from '../components/What.svelte';
import { menuItems } from '$lib/stores/menu-store';
// import { intersectionAPI } from '$lib/intersection-observer-action.ts';
// import { aboutSectionIsInView } from '$lib/stores/home-scroll-store';
import { onMount } from 'svelte';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MarcelloAndTatiAscii from '../components/MarcelloAndTatiAscii.svelte';
import { Image } from 'svelte-datocms';
// import { Image } from "svelte-datocms";
// import Seo from "../components/Seo.svelte";
// import HeroCanvas from "../components/HeroCanvas.svelte";
// import CanvasWrapper from "../components/CanvasWrapper.svelte";

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

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
const heroHeading1Words = home.heading1.split(' ');
const heroHeading2Words = home.heading2.split(' ');
const aboutDescription1 = home.aboutDescription1.split(' ')
const aboutDescription2 = home.aboutDescription2.split(' ')

let mainContainer;
// let tl = gsap.timeline({ paused: true });

onMount(() => {
	const ctx = gsap.context((self) => {
		const heroContainer = self.selector('.hero');
		const aboutContainer = self.selector('.about');
		const h1Words = self.selector('.hero-title1 .word');
		const h2Words = self.selector('.hero-title2 .word');
		const diamond = self.selector('.diamond');
		const lineLeft = self.selector('.line-left');
		const lineRight = self.selector('.line-right');
		const aboutTitle = self.selector('.about-title span');
		const aboutParagraphs = self.selector('.about-textblock-wrapper p');
		const aboutTexts = self.selector('.about-textblock-wrapper span');

		const tl = gsap.timeline({ paused: true });

		/**
		 * Animation on load
		 */
		tl
			.to(diamond, { scale: 1, rotate: '765deg', duration: 1, ease: 'power1.inOut' })
			.to(lineLeft, { scaleX: 1, duration: 1, ease: 'power1.inOut' }, '<')
			.to(lineRight, { scaleX: 1, duration: 1, ease: 'power1.inOut' }, '<')
			.to(h1Words[0], { duration: 1, ease: 'power1.inOut', transformOrigin: '0 100%', scale: 1, skewX: 0 }, '-=.6')
			.to(h1Words[1], { duration: 1, ease: 'power1.inOut', transformOrigin: '100% 100%', scale: 1, skewX: 0 }, '<')
			.to(h2Words[0], { duration: 1, ease: 'power1.inOut', transformOrigin: '0 0', scale: 1, skewX: 0 }, '<')
			.to(h2Words[1], { duration: 1, ease: 'power1.inOut', transformOrigin: '100% 0', scale: 1, skewX: 0 }, '<');

		tl.play();

		/**
		 * Rotation of the hero on scroll
		 */
		const tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: heroContainer,
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				pin: true,
				pinSpacing: true,
				invalidateOnRefresh: true
			}
		});

		tl2.fromTo(heroContainer, {
			rotate: 0
		}, {
			rotate: '-45deg'
		})
			.to(self.selector('.hero-title1'), {
				xPercent: -200
			}, '<')
			.to(self.selector('.hero-title2'), {
				xPercent: 200
			}, '<')
			.fromTo(lineLeft, { scaleX: 1 }, { scaleX: 0, duration: .35, ease: 'power1.inOut' }, '-=.5')
			.fromTo(lineRight, { scaleX: 1 }, { scaleX: 0, duration: .35, ease: 'power1.inOut' }, '<')
			.fromTo(diamond, { rotate: '-45deg' }, { rotate: 405, scale: 50, backgroundColor: 'var(--theme-inverted-background)' }, '-=.3');

		/**
		 * About section animations
		 */
		gsap.timeline({
			scrollTrigger: {
				trigger: aboutContainer,
				start: 'top 60%',
				end: 'bottom top',
				scrub: false
			}
		}).fromTo(aboutTitle, {
			opacity: 0
		}, {
			duration: 1.2,
			opacity: 1,
			stagger: 0.2,
			ease: 'power1.inOut'
		});

		aboutParagraphs.forEach(p =>{
			gsap.timeline({
				scrollTrigger: {
					trigger: p,
					start: 'top 60%',
					end: 'bottom top',
					scrub: false
				}
			}).fromTo(p, {
				opacity: 0
			}, {
				duration: 1.2,
				opacity: 1,
				stagger: 0.2,
				ease: 'power1.inOut'
			});
		})

	}, mainContainer); // <- Scope!

	return () => ctx.revert(); // <- Cleanup!
});


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

<div class="main-content" bind:this={mainContainer}>
	<!--  <CanvasWrapper>-->
	<!--    <HeroCanvas />-->
	<!--  </CanvasWrapper>-->

	<div class="hero">
		<h1 class="hero-title1 splitting">
			<span class="visuallyhidden">{home.heading1}</span>
			{#each heroHeading1Words as word, wordIndex}
        <span class="word">
          {word}
					{#if wordIndex < heroHeading1Words.length - 1}&nbsp;{/if}
        </span>
			{/each}
		</h1>

		<div class="separator">
			<div class="line-left" />
			<div class="diamond">
				<Image
					class="image-wrapper"
					data={{
              ...home.aboutPicture.responsiveImage
            }}
				/>
			</div>
			<div class="line-right" />
		</div>

		<h2 class="hero-title2 splitting">
			<span class="visuallyhidden">{home.heading2}</span>
			{#each heroHeading2Words as word, wordIndex}
        <span class="word">
          {word}
					{#if wordIndex < heroHeading2Words.length - 1}&nbsp;{/if}
        </span>
			{/each}
		</h2>
	</div>

	<div class="about">
		<div class="about-inner">
			<h2 aria-label={home.aboutHeading} class="about-title">
				{#each Array.from(home.aboutHeading) as char}
					<span>{char}</span>
				{/each}
			</h2>

			<div class="about-textblock-wrapper">
				<p style:--char-count={aboutDescription1.length}>
					{#each aboutDescription1 as char, charIndex}
						<span style:--char-index={charIndex}>{char}&nbsp;</span>
					{/each}
				</p>
				<p style:--char-count={aboutDescription2.length}>
					{#each aboutDescription2 as char, charIndex}
						<span style:--char-index={charIndex}>{char}&nbsp;</span>
					{/each}
				</p>
			</div>

		</div>
	</div>

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

  //.main-content > section,
  //.main-content > article {
  //  position: relative;
  //  z-index: 1;
  //}

	.main-content {
		overflow: hidden;
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
      position: relative;
      width: 100%;
      max-width: none;
      margin: 0 auto;
      font-family: var(--heading-font-family);
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
      margin: 0 auto;
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
    @include layout-grid;

    background-color: var(--theme-inverted-background);
  }

  .about-inner {
    grid-column: 2;

    h2 {
      font-family: var(--heading-font-family);
      font-size: 25vw;
      //font-size: clamp(2.88rem, 6.3vw + 1.4rem, 7.1rem);
      //line-height: var(--hero-h1-line-height-min);
      text-align: left;
      //text-transform: uppercase;
      @include ligature;
      color: var(--theme-inverted-foreground);
    }
  }

  .about-textblock-wrapper {
    p {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 4rem;
      --text-weight: 700;
      color: var(--theme-inverted-foreground);

      span {
        --text-weight-max: 600;
        --text-weight-min: 300;

        font-size: 4vw;
        line-height: 1.2;
        font-variation-settings: 'wght' var(--text-weight-max), 'wdth' 80;
        //--delay: 300ms; // calc((var(--char-index) + 1) * 400ms);
        --delay: calc((var(--char-index) + 1) * 400ms);
        //animation: breathe calc(var(--char-count) * 400ms) infinite both;
        //animation-delay: var(--delay);

        //&:hover {
        //  animation: breathe 4000ms infinite both;
        //  animation-delay: var(--delay);
        //}
      }

			&:hover {
				span {
          animation: breathe calc(var(--char-count) * 400ms) infinite both;
          animation-delay: var(--delay);
				}
			}
    }
  }

</style>

