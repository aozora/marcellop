<script lang="ts">
import Footer from '$components/Footer.svelte';
import SkipLink from '$components/SkipLink.svelte';
// import { onMount } from 'svelte';
// import CustomCursor from '$components/CustomCursor.svelte';
import Header from '$components/Header.svelte';
import type { CommonData } from '$types';
import { commonData } from '$lib/store';
import '$styles/app.scss';


/**
 * PROPS
 */
export let data: CommonData;

// write the data into common store
$commonData = { ...data };

// /**
//  * Set the current theme
//  */
// onMount(() => {
// 	const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
// 	if (storedTheme) {
// 		document.documentElement.setAttribute('data-theme', storedTheme);
// 	}
// });
</script>

<svelte:body></svelte:body>

<SkipLink />
<Header />


<main id="main">
	<slot></slot>
</main>

<Footer />

<!--<CustomCursor />-->
