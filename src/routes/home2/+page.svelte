<script lang="ts">
import type { Home, Menu, Site } from '$lib/types';
import { menuItems } from '$lib/stores/menu-store';
import { onMount } from 'svelte';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import Seo from '../../components/Seo.svelte';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

type HomeProps = {
	site: Site,
	menu: Menu,
	home: Home,
	domainUrl: string
}

/**
 * PROPS
 */
export let data: HomeProps;
let { menu /* site, home , domainUrl */ }: HomeProps = data;

// write the menuItems store with the data form the page endpoint
// the Header component will use that.
menuItems.update(() => {
	return menu.menuItems;
});

/**
 * State
 */
// const metaTags: Array<SeoMetaTagType> = home && home.seo ? home.seo.concat(site.favicon) : [];

let mainContainer: HTMLDivElement;
// let tl = gsap.timeline({ paused: true });

onMount(() => {
	const ctx = gsap.context((self) => {
		const chars1 = self.selector('.hero2-title1 .char span');
		const title1 = self.selector('.hero2-title1');
		const title2 = self.selector('.hero2-title2');
		const chars2 = self.selector('.hero2-title2 .char span');
		const menuTitleChars = Array.from(document.querySelectorAll('.menu__title .header-title-char span'));

		const tl = gsap.timeline({ paused: true });

		tl
			.fromTo(chars1,
				{
					x: '-100%'
				},
				{
					x: '0%',
					ease: 'Power1.easeInOut',
					stagger: 0.1,
					duration: 1
				}
			)
			.to(title1, {
				ease: 'Power1.easeInOut',
				y: '-200%'
			})
			.fromTo(menuTitleChars,
				{
					x: '-100%'
				},
				{
					x: '0%',
					ease: 'Power1.easeInOut',
					stagger: 0.1,
					duration: 1
				},
				'<'
			)
			.to(title2, {
				ease: 'Power1.easeInOut',
				y: '-50%'
			}, '<')
			.fromTo(chars2,
				{
					x: '-100%'
				},
				{
					x: '0%',
					ease: 'Power1.easeInOut',
					stagger: 0.1,
					duration: 1
				},
				'-=90%'
			)
			.fromTo(chars2,
				{
					'--text-weight': 700
				},
				{
					'--text-weight': 300,
					yoyo: true,
					repeat: -1,
					duration: 2,
					stagger: 0.1
				}
			)
		;

		tl.play();

		// gsap.to(title, {
		//   xPercent: -100,
		//   x: () => innerWidth,
		//   ease: "none",
		//   scrollTrigger: {
		//     trigger: heroContainer,
		//     start: "top top",
		//     end: () => innerWidth * 3,
		//     scrub: true,
		//     pin: true,
		//     invalidateOnRefresh: true,
		//     anticipatePin: 1
		//   }
		// });
	}, mainContainer); // <- Scope!

	return () => ctx.revert(); // <- Cleanup!
});


</script>

<!--<Seo-->
<!--  domainUrl={domainUrl}-->
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
	<div class="hero2">
		<h1 class="hero2-title1">
			<span class="visuallyhidden">MARCELLO PALMITESSA</span>

			<span class="word" style:--char-count={'MARCELLO'.length}>
      {#each Array.from('MARCELLO') as char, charIndex}
        <span class="char">
          <span style:--char-index={charIndex}>{char}</span>
        </span>
      {/each}
      </span>

			<span class="word" style:--char-count={'PALMITESSA'.length}>
      {#each Array.from('PALMITESSA') as char, charIndex}
        <span class="char">
          <span style:--char-index={charIndex}>{char}</span>
        </span>
      {/each}
      </span>
		</h1>

		<h2 class="hero2-title2">
			<span class="visuallyhidden">DESIGN ENGINEER</span>

			<span class="word" style:--char-count={'DESIGN'.length}>
      {#each Array.from('DESIGN') as char, charIndex}
        <span class="char">
          <span style:--char-index={charIndex}>{char}</span>
        </span>
      {/each}
      </span>

			<span class="word" style:--char-count={'ENGINEER'.length}>
      {#each Array.from('ENGINEER') as char, charIndex}
        <span class="char">
          <span style:--char-index={charIndex}>{char}</span>
        </span>
      {/each}
      </span>
		</h2>
	</div>

	<div class="about2">
		<h2>About</h2>

		<div class="about2-highlight">
			<p>Yo!
				I’m an experienced Front-end engineer and architect with a background in Full-Stack development.</p>
			<img src="/img/marcello-and-tato.png" alt="Marcello and Tato" />
		</div>
	</div>

</div>


<style lang="scss">
  @import '../../styles/shared';

  .main-content {
    overflow: hidden;
    position: relative;

  }

  h1 {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .hero2 {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include container;
    height: calc(100vh - var(--menu-height));
    padding: 3rem 1rem 0 1rem;
    margin-bottom: 2rem;

    h1 {
      position: relative;
      width: auto;
      max-width: none;
      margin: 0 auto;
      font-family: var(--body-font-family);
      font-optical-sizing: auto;
      font-variation-settings: "slnt" 0, "GRAD" 0, "XOPQ" 96, "XTRA" 468, "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712;

      font-size: 16vw; // so is kept in the viewport width
      //font-size: 30vw; // così devo scrollare
      font-weight: 700;
      line-height: 1.1;
      text-align: center;
      text-transform: uppercase;

      @media (max-width: 360px) {
        font-size: 2.5rem;
      }

      span:not(.char) {
        --delay: calc((var(--char-index) + 1) * 400ms);
        --text-weight-max: 700;
        --text-weight-min: 300;
      }

      //&:hover {
      //  span:not(.char) {
      //    animation: breathe2 calc(var(--char-count) * 500ms) infinite both;
      //    animation-delay: var(--delay);
      //  }
      //}
    }

    h2 {
      position: relative; // needed for reveal animation
      width: 100%;
      max-width: none;
      margin: 0 auto;
      font-family: var(--body-font-family);
      font-optical-sizing: auto;
      font-variation-settings: "slnt" 0, "GRAD" 0, "XOPQ" 96, "XTRA" 468, "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712;
      font-size: 20vw;
      font-weight: 700;
      line-height: 1.1;
      text-align: center;

      span:not(.char) {
        --delay: calc((var(--char-index) + 1) * 400ms);
        --text-weight-max: 700;
        --text-weight-min: 300;
        --text-weight: var(--text-weight-max);
        font-weight: var(--text-weight);
      }

      //&:hover {
      //  span:not(.char) {
      //    animation: breathe2 calc(var(--char-count) * 500ms) infinite both;
      //    animation-delay: var(--delay);
      //  }
      //}
    }

  }

  .about2 {
    @include layout-grid;

    > * {
      grid-column: 2;
    }

  }

  .about2-highlight {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
		gap: 2rem;
		padding: 2rem 0;

    p {
			flex: 1 1 70%;
			//max-width: 700px;
      font-optical-sizing: auto;
      font-variation-settings: "slnt" 0, "GRAD" 0, "XOPQ" 96, "XTRA" 468, "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712;
      font-size: 2.6rem;
      font-weight: 600;
			line-height: 1.2;
			text-transform: uppercase;
    }

    img {
      flex: 1 1 30%;
      width: 30vw;
      height: auto;
      transform: rotate(6deg);
    }

  }
</style>

