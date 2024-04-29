import gsap from 'gsap/dist/gsap';

export function getHeroTimeline(
	chars1: Array<HTMLElement>,
	title1: HTMLElement,
	title2: HTMLElement,
	chars2: Array<HTMLElement>,
	menuTitleChars: Array<HTMLElement>
): gsap.core.Timeline {
	const tl = gsap.timeline({ paused: true });

	tl.fromTo(
		chars1,
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
		.fromTo(
			menuTitleChars,
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
		.to(
			title2,
			{
				ease: 'Power1.easeInOut',
				y: '-50%'
			},
			'<'
		)
		.fromTo(
			chars2,
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
		.fromTo(
			chars2,
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
		);

	return tl;
}
