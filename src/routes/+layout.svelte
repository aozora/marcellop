<script lang="ts">
import Footer from '$components/Footer.svelte';
import SkipLink from '$components/SkipLink.svelte';
import { onMount } from 'svelte';
import CustomCursor from '$components/CustomCursor.svelte';
import Header from '$components/Header.svelte';
import '$styles/app.scss';
import type { CommonData } from '$types';
import { commonData } from '$lib/store';



	interface Props {
		/**
 * PROPS
 */
		data: CommonData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
// console.log({data});
// write the data into common store
$commonData = { ...data };

/**
 * Set the current theme
 */
onMount(() => {
	const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	if (storedTheme) {
		document.documentElement.setAttribute('data-theme', storedTheme);
	}
});
</script>

<!--<svelte:head>-->
<!--	<meta name="viewport" content="initial-scale=1, viewport-fit=cover" />-->
<!--</svelte:head>-->

<svelte:body></svelte:body>

<SkipLink />
<Header />


<main id="main">
	{@render children?.()}
</main>

<Footer />

<CustomCursor />
