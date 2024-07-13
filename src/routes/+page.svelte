<script lang="ts">
import type { Home } from '$types';
import { onMount } from 'svelte';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { getHeroTimeline } from '$lib/animations';
import AboutPicture1 from '$components/AboutPicture1.svelte';
import { commonData } from '$lib/store';
import Head from '$components/Head.svelte';
import Skills from '$components/Skills.svelte';

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
let { home }: HomeProps = data;
const { site } = $commonData;
const headTags = home && site ? home.seo.concat(site.favicon) : [];

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
			// const aboutContainer = self.selector('.about');
		const aboutTitle = self.selector('.about h2');
		// const aboutPicture1 = self.selector('.about svg');
		const defaultColor = '#333'; // grey
		const divHighlight = '#fff'; // white

		const aboutSections: Array<HTMLElement> = self.selector('.about-highlight[data-animate="1"]');

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

		aboutSections.forEach(section => {
			const wordsTimeline = gsap.timeline();
			const words = section.querySelectorAll('p .word');
			const wordsCount = words.length;
			const picture = section.querySelector('.about svg, .about img');
			const isPictureOnTheRight = section.classList.contains('text-picture');

			function animateWord(word) {
				if (wordsScrollTrigger.direction == 1) {
					gsap.to(word, { color: divHighlight });
				} else {
					gsap.to(word, { color: defaultColor });
				}
			}

			let wordsScrollTrigger = ScrollTrigger.create({
				trigger: section,
				start: 'top 75%',
				end: 'center 40%',
				scrub: 1,
				animation: wordsTimeline
			});

			words.forEach((word, index) => {
				wordsTimeline.call(animateWord, [word], index / wordsCount + 0.01);
			});

			wordsTimeline.to({}, { duration: 0.01 });

			// animate pictures
			ScrollTrigger.create({
				trigger: picture,
				start: 'top 75%',
				toggleActions: 'play reverse play reverse',
				// markers: true,
				animation: gsap.timeline()
					.fromTo(picture,
						{
							autoAlpha: 0,
							rotate: '-6deg',
							x: isPictureOnTheRight ? '100%' : '-100%'
						},
						{
							autoAlpha: 1,
							rotate: '6deg',
							x: '0%',
							ease: 'Power1.easeInOut',
							duration: 1
						})
					.to(picture,
						{
							rotate: '-6deg',
							ease: 'Power1.easeInOut',
							duration: 1
						})
			});
		});
	}, mainContainer); // <- Scope!

	return () => ctx.revert(); // <- Cleanup!
});

const aboutHighlight = 'Yo! I’m a Senior Front-end engineer on a mission to turn digital dreams into delightful realities, with the invaluable support of my cat assistant!';
const aboutHighlight2 = 'Passionate about crafting efficient, accessible, user-friendly interfaces and scalable architectures while leading development and design teams.';
const aboutHighlight3 = 'Dedicated to bridging the gap between design and development, leveraging collaborative approaches to create visually stunning and highly functional digital experiences within dynamic team environments.';
</script>

<Head {headTags} />

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

	<div class="about">
		<h2>About</h2>

		<div class="about-highlight text-picture" data-animate="1">
			<p class="about-highlight-up">
				<span class="visuallyhidden">{aboutHighlight}</span>

				{#each aboutHighlight.split(' ') as word}
					<span class="word">{word}&nbsp;</span>
				{/each}
			</p>

			<figure>
				<AboutPicture1 />
			</figure>
		</div>

		<div class="about-highlight picture-text" data-animate="1">
			<figure>
				<img src="/img/tato1.webp" alt="" />
			</figure>

			<p class="about-highlight-up">
				<span class="visuallyhidden">{aboutHighlight2}</span>

				{#each aboutHighlight2.split(' ') as word}
					<span class="word">{word}&nbsp;</span>
				{/each}
			</p>
		</div>


		<div class="about-highlight text-picture" data-animate="1">
			<p class="about-highlight-up">
				<span class="visuallyhidden">{aboutHighlight3}</span>

				{#each aboutHighlight3.split(' ') as word}
					<span class="word">{word}&nbsp;</span>
				{/each}
			</p>

			<figure>
				<img src="/img/tato2.webp" alt="" />
			</figure>
		</div>
	</div>

	<Skills />

</div>


<style lang="scss">
  @import '../styles/shared';

  .main-content {
    overflow: hidden;
    position: relative;
  }

  .hero2 {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include container;

    & {
      height: calc(100vh - var(--menu-height));
      padding: 3rem 1rem 0 1rem;
      margin-bottom: 2rem;
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
    }
  }

</style>
