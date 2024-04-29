<script lang="ts">
/**
 * Gallery scroll by https://tympanus.net/codrops/?p=73182
 */
// eslint-disable @typescript-eslint/ban-ts-comment

import { commonData } from '$lib/store';
import Head from '$components/Head.svelte';
import type { ResponsiveImage, SeoMetaTagType } from '$types';
// import { NakedImage } from '@datocms/svelte';
import { onMount } from 'svelte';
// import Lenis from 'lenis';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

type PageProps = {
	tati: {
		id: string
		seo: Array<SeoMetaTagType>;
		title: string
		intro: string
		gallery: Array<ResponsiveImage>
	}
}


/**
 * PROPS
 */
export let data: PageProps;

let { tati }: PageProps = data;
const { site } = $commonData;
const headTags = tati && site ? tati.seo.concat(site.favicon) : [];

function createGroups(arr: ResponsiveImage[], numGroups: number) {
	const perGroup = Math.ceil(arr.length / numGroups);

	return new Array(numGroups)
		.fill('')
		.map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
}

let groups: ResponsiveImage[][];

$: {
	groups = createGroups(tati.gallery, 5);
}

// let lenis: Lenis;

// Function to initialize Lenis for smooth scrolling
// const initSmoothScrolling = () => {
// 	// Instantiate the Lenis object with specified properties
// 	lenis = new Lenis({
// 		lerp: 0.25, // Lower values create a smoother scroll effect
// 		smoothWheel: true // Enables smooth scrolling for mouse wheel events
// 	});
//
// 	// Update ScrollTrigger each time the user scrolls
// 	lenis.on('scroll', () => ScrollTrigger.update());
//
// 	// Define a function to run at each animation frame
// 	const scrollFn = (time: number) => {
// 		lenis.raf(time); // Run Lenis' requestAnimationFrame method
// 		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
// 	};
// 	// Start the animation frame loop
// 	requestAnimationFrame(scrollFn);
// };

// Helper function that lets you dynamically figure out a grid's rows/columns as well as further refine those with "odd" or "even" ones
// https://greensock.com/forums/topic/34808-how-can-i-animate-the-odd-and-even-columns-rows-of-a-grid-with-gsapto/?do=findComment&comment=174346
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getGrid = (selector:Element) => {
	let elements = gsap.utils.toArray(selector),
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		bounds,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		getSubset = (axis, dimension, alternating, merge) => {
			let a = [],
				subsets = {},
				onlyEven = alternating === 'even',
				p;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			bounds.forEach((b, i) => {
				let position = Math.round(b[axis] + b[dimension] / 2),
					subset = subsets[position];
				subset || (subsets[position] = subset = []);
				subset.push(elements[i]);
			});
			for (p in subsets) {
				a.push(subsets[p]);
			}
			if (onlyEven || alternating === 'odd') {
				a = a.filter((el, i) => !(i % 2) === onlyEven);
			}
			if (merge) {
				let a2 = [];
				a.forEach(subset => a2.push(...subset));
				return a2;
			}
			return a;
		};
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	elements.refresh = () => bounds = elements.map(el => el.getBoundingClientRect());
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	elements.columns = (alternating, merge) => getSubset('left', 'width', alternating, merge);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	elements.rows = (alternating, merge) => getSubset('top', 'height', alternating, merge);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	elements.refresh();

	return elements;
};

onMount(() => {
	// Element with class .columns
	const grid = document.querySelector('.columns');
	// All the columns class .column
	const columns = [...grid.querySelectorAll('.column')];
	// Map each column to its array of items and keep a reference of the image, its wrapper and the column
	const items = columns.map((column, pos) => {
		return [...column.querySelectorAll('.column__item')].map(item => ({
			element: item,
			column: pos,
			wrapper: item.querySelector('.column__item-imgwrap'),
			image: item.querySelector('.column__item-img')
		}));
	});
	// All itemms
	const mergedItems = items.flat();


	const scroll = () => {
		const gridObj = getGrid(mergedItems.map(item => item.element));

		const rowMapping = {
			even: {
				skewX: 2,
				xPercent: -50,
				transformOrigin: '0% 50%'
			},
			odd: {
				skewX: -2,
				xPercent: 50,
				transformOrigin: '100% 50%'
			}
		};

		['even', 'odd'].forEach(type => {
			gridObj.rows(type).flat().forEach(row => {
				gsap
					.timeline({
						defaults: { ease: 'none' },
						scrollTrigger: {
							trigger: row,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true
						}
					})
					.to(row.querySelector('.column__item-imgwrap'), {
						xPercent: rowMapping[type].xPercent,
						skewX: rowMapping[type].skewX
					}, 0)
					.to(row.querySelector('.column__item-img'), {
						ease: 'power1.in',
						startAt: { transformOrigin: rowMapping[type].transformOrigin },
						scaleX: 1.4
					}, 0);

			});
		});
	};

	// initSmoothScrolling();
	scroll();
});

</script>

<Head {headTags} />

<section class="tati">
	<h1>{tati.title}</h1>
	<p>{tati.intro}</p>

	<!--	<div class="tati-gallery">-->
	<!--		{#each tati.gallery as picture}-->
	<!--			<NakedImage data={picture.responsiveImage} />-->
	<!--		{/each}-->
	<!--	</div>-->

	<div class="columns">
		{#each groups as column}
			<div class="column">
				{#each column as item}
					<figure class="column__item">
						<div class="column__item-imgwrap">
							<div class="column__item-img" style={`background-image:url(${item.responsiveImage.src})`}></div>
						</div>
					</figure>
				{/each}
			</div>
		{/each}
	</div>

</section>

<style lang="scss">
  @import '../../styles/shared';

  .tati {
    @include container;

    h1 {
      --text-weight: 600;
      margin-bottom: 3rem;
      font-family: var(--body-font-family);
      font-size: 20rem;
      line-height: 1.2;
      text-transform: uppercase;
      color: var(--color-pantone);

      @supports (font-variation-settings: normal) {
        font-family: var(--variable-font-family);
        font-variation-settings: 'wght' var(--text-weight);
      }
    }

    p {
      margin-bottom: 3rem;
      font-size: 3rem;
    }
  }

  //.tati-gallery {
  //  display: grid;
  //  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  //  grid-gap: 1rem;
  //  gap: 1rem;
  //
  //  picture,
  //  img {
  //    object-fit: cover;
  //  }
  //}

  .columns {
    --grid-item-translate: 0px;
    --grid-item-ratio: 0.75;
    --grid-item-radius: 0px;
    --grid-gap: 2vw;
    --grid-columns: 5;
    --grid-width: 140%;
    --grid-max-width: none;

    width: var(--grid-width);
    max-width: var(--grid-max-width);
    position: relative;
    padding: 10vh 0;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--grid-gap);
  }

  .column {
    width: 100%;
    position: relative;
    display: grid;
    gap: var(--grid-gap);
    grid-template-columns: 100%;
    will-change: transform;
  }

  .column__item {
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .column__item-imgwrap {
    width: 100%;
    aspect-ratio: var(--grid-item-ratio);
    height: auto;
    position: relative;
    overflow: hidden;
    border-radius: var(--grid-item-radius);
  }

  .column__item-img {
    position: absolute;
    top: calc(-1 * var(--grid-item-translate));
    left: calc(-1 * var(--grid-item-translate));
    height: calc(100% + var(--grid-item-translate) * 2);
    width: calc(100% + var(--grid-item-translate) * 2);
    background-size: cover;
    background-position: 50% 20%;
    backface-visibility: hidden;
  }
</style>
