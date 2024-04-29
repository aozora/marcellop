<script lang="ts">
import type { Home } from '$types';
import { onMount } from 'svelte';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { getHeroTimeline } from '$lib/animations';
import AboutPicture1 from '$components/AboutPicture1.svelte';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

type HomeProps = {
	home: Home,
	domainUrl: string
}

/**
 * PROPS
 */
export let data: HomeProps;

let mainContainer: HTMLDivElement;

onMount(() => {
	const ctx = gsap.context((self) => {
		const chars1 = self.selector('.hero2-title1 .char span');
		const title1 = self.selector('.hero2-title1');
		const title2 = self.selector('.hero2-title2');
		const chars2 = self.selector('.hero2-title2 .char span');
		const menuTitleChars = Array.from(document.querySelectorAll<HTMLElement>('.menu__title .header-title-char span'));

		const tl = getHeroTimeline(chars1, title1, title2, chars2, menuTitleChars);
		tl.play();


		/**
		 * About section animations
		 */
		const aboutContainer = self.selector('.about2');
		const aboutTitle = self.selector('.about2 h2');
		const aboutPicture1 = self.selector('.about2 svg');
		const highlightChars = self.selector('.about2-highlight p .char span');

		gsap.fromTo(aboutTitle,
			{ x: '100%' },
			{
				x: '0%',
				ease: 'Power1.easeInOut',
				scrollTrigger: {
					trigger: aboutTitle,
					start: 'clamp(top bottom)',
					end: 'clamp(top top)',
					toggleActions: 'play none none none',
					scrub: true
				}
			});

		gsap.fromTo(highlightChars,
			{
				x: '-100%'
			},
			{
				x: '0%',
				ease: 'Power1.easeInOut',
				stagger: 0.1,
				duration: .35,
				scrollTrigger: {
					trigger: aboutContainer,
					toggleActions: 'play none none none'
				}
			}
		);

		gsap.fromTo(aboutPicture1,
			{
				autoAlpha: 0,
				rotate: '-6deg',
				x: '100%'
			},
			{
				autoAlpha: 1,
				rotate: '6deg',
				x: '0%',
				ease: 'Power1.easeInOut',
				duration: 1,
				scrollTrigger: {
					trigger: aboutContainer,
					start: 'top 50%',
					toggleActions: 'play none none none'
				}
			});

	}, mainContainer); // <- Scope!

	return () => ctx.revert(); // <- Cleanup!
});

const aboutHighlight = 'Yo! I’m a Senior Front-end engineer on a mission to turn digital dreams into delightful realities, with the invaluable support of my cat assistant!';
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
			<p>
				<span class="visuallyhidden">{aboutHighlight}</span>

				{#each aboutHighlight.split(' ') as word}
					<span class="word">
						{#each Array.from(word) as char}
							<span class="char">
								<span aria-hidden="true">
									{#if char === ' '}&nbsp;{:else}{char}{/if}
								</span>
							</span>
						{/each}

						&nbsp;
					</span>
				{/each}
			</p>

			<figure>
				<AboutPicture1 />
			</figure>
		</div>
	</div>

</div>


<style lang="scss">
  @import '../styles/shared';

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

</style>
