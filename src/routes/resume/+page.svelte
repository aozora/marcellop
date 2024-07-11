<script lang="ts">
import type { ResumeJob } from '$types';
import { onMount } from 'svelte';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Draggable } from 'gsap/dist/Draggable';

type ResumeProps = {
	allResumeJobs: Array<ResumeJob>
}

/**
 * PROPS
 */
export let data: ResumeProps;
let { allResumeJobs }: ResumeProps = data;

const getYear = (date: string) => {
	const d = new Date(date);
	return d.getFullYear();
};

onMount(() => {
	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(Draggable);

	const sections = gsap.utils.toArray<HTMLElement>('section');
	const track = document.querySelector<HTMLDivElement>('[data-draggable]');
	const navLinks = gsap.utils.toArray<HTMLAnchorElement>('[data-link]');
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

	const lastItemWidth = () => navLinks[navLinks.length - 1].offsetWidth;

	const getUseableHeight = () => document.documentElement.offsetHeight - window.innerHeight;

	const getDraggableWidth = () => {
		return ((track.offsetWidth * 0.5) - lastItemWidth());
	};

	const tl = gsap.timeline()
		.to(track, {
			x: () => getDraggableWidth() * -1,
			ease: 'none'
		});

	const st = ScrollTrigger.create({
		animation: tl,
		scrub: 0
	});


	const updatePosition = () => {
		const left = track.getBoundingClientRect().left * -1;
		const width = getDraggableWidth();
		const useableHeight = getUseableHeight();
		const y = gsap.utils.mapRange(0, width, 0, useableHeight, left);

		st.scroll(y);
	};


	Draggable.create(track, {
		type: 'x',
		// inertia: true,
		bounds: {
			minX: 0,
			maxX: getDraggableWidth() * -1
		},
		edgeResistance: 1,
		onDragStart: () => st.disable(),
		onDragEnd: () => st.enable(),
		onDrag: updatePosition,
		onThrowUpdate: updatePosition
	});

	const initSectionAnimation = () => {
		/* Do nothing if user prefers reduced motion */
		if (prefersReducedMotion.matches) return;

		sections.forEach((section) => {
			const heading = section.querySelector('h2');
			// const image = section.querySelector('.section__image');

			/* Set animation start state */
			gsap.set(heading, {
				opacity: 0,
				y: 50
			});

			/* Create the timeline */
			const sectionTl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: () => 'top center',
					end: () => `+=${window.innerHeight}`,
					toggleActions: 'play reverse play reverse'
				}
			});

			/* Add tweens to the timeline */
			sectionTl
				.to(heading, {
					opacity: 1,
					y: 0,
					duration: 1
				}, 0.2);

			/* Create a new timeline to add an active class to the nav link for the current section */
			// const sectionTl2 = gsap.timeline({
			// 	scrollTrigger: {
			// 		trigger: section,
			// 		start: 'top 20px',
			// 		end: () => `bottom top`,
			// 		toggleActions: 'play none play reverse',
			// 		onToggle: ({ isActive }) => {
			// 			const sectionLink = navLinks[index];
			//
			// 			if (isActive) {
			// 				sectionLink.classList.add('is-active');
			// 			} else {
			// 				sectionLink.classList.remove('is-active');
			// 			}
			// 		}
			// 	}
			// });
		});
	};

	initSectionAnimation();
});
</script>

<!--<Head {headTags} />-->

<h1 class="resume-title">Resume</h1>

<nav class="nav-timeline">
	<!--Shows our position on the timeline-->
	<div class="marker"></div>

	<!--Draggable element-->
	<div class="nav__track" data-draggable>
		<ul class="nav__list">
			{#each allResumeJobs as job}
				<li>
					<a href={`#timeline-${!job.to ? 'present' : getYear(job.to)}`} class="nav__link" data-link>
						{#if job.to}<span>{getYear(job.to)}</span>{/if}
						{#if !job.to}<span>present</span>{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<div class="resume">
	{#each allResumeJobs as job, jobIndex}
		<section id={`timeline-${!job.to ? 'present' : getYear(job.to)}`} style:--i={jobIndex}>
			<h2 class="job__date">
				<strong>from</strong>
				<span>{getYear(job.from)}</span>
			</h2>
			<div class="job__job">
				<p class="job__title">{`${job.title} @ ${job.company}`}</p>
				<p class="job__description">
					<!--eslint-disable-next-line svelte/no-at-html-tags-->
					{@html job.description}
				</p>
			</div>
		</section>
	{/each}
</div>

<style lang="scss">
  @import '../../styles/shared';

  .resume-title {
    --text-weight: 600;
    @include container;

    & {
      margin-bottom: 3rem;
      font-family: var(--body-font-family);
      font-size: 26vw;
      line-height: 1.2;
      text-transform: uppercase;
      color: var(--color-pantone);
    }

    @supports (font-variation-settings: normal) {
      font-family: var(--variable-font-family);
      font-variation-settings: 'wght' var(--text-weight);
    }
  }

  .resume {
    overflow: hidden;
    position: relative;
    @include container;
  }

  .resume-list {
    position: relative;
  }

  .nav-timeline {
    //overflow: hidden;
    position: sticky;
    top: var(--menu-height);
    left: 0;
    width: 100%;
    background: var(--theme-background);
    color: var(--navTextColor);
    z-index: 2;
    height: 6rem;

    &::after {
      content: '';
      position: absolute;
      top: 1.7rem;
      left: 0;
      width: 100%;
      height: 0.25rem;
      background: currentColor;
      pointer-events: none;
    }
  }

  .marker {
    position: fixed;
    top: 1.75rem;
    left: 4rem;
    width: 1rem;
    height: 1rem;
    transform: translate3d(-50%, -50%, 0);
    background: var(--activeColor);
    border-radius: 100%;
    z-index: 2000;

    &::before {
      content: '';
      position: absolute;
      top: calc(50% - 0.2rem);
      right: 100%;
      width: 4rem;
      height: 0.4rem;
      background-color: var(--activeColor);
    }
  }

  .nav__track {
    position: relative;
    min-width: max(200rem, 200%);
    padding: 1.5rem max(100rem, 100%) 0 0;
    height: 6rem;
  }

  .nav__list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }

  .nav__link {
    position: relative;
    display: block;
    min-width: 8rem;
    padding: 2.25rem 1rem 0.5rem;
    text-align: center;
    color: inherit;
    text-decoration: none;
    z-index: 1;
    transition: color 150ms;

    &:hover,
    &:focus {
      color: var(--activeColor);
      text-decoration: underline;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 0.65rem;
      height: 0.65rem;
      background-color: currentColor;
      border-radius: 50%;
      transform: translate3d(-50%, 0, 0);
      transform-origin: center center;
    }

    span {
      display: block;
      transition: transform 200ms;
    }

    &.is-active {
      span {
        transform: scale(1.4);
        color: var(--activeColor);
      }

      &::after {
        display: none;
      }
    }
  }

  section {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    //justify-content: left;
    //align-items: center;
    //gap: 1rem;
    min-height: 100vh;
    padding: 8rem 0 max(5vh, 2rem);
  }

  .job__date {
    grid-column: 1 / 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    font-size: 14vw;
    line-height: 1.1;
    color: var(--theme-brand);

    @supports (font-variation-settings: normal) {
      font-family: var(--variable-font-family);
      font-variation-settings: 'wght' var(--text-weight);
    }

    strong {
      font-size: 2rem;
      line-height: 1.1;
    }
  }

  .job__job {
    //flex: 1 1 70%;
    grid-column: 6 / 12;
  }

  .job__title {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 700;
    font-variation-settings: 'wght' 700;
  }
</style>
