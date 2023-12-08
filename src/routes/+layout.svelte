<script lang="ts">
import Header from '../components/Header.svelte';
import Footer from '../components/Footer.svelte';
import SkipLink from '../components/SkipLink.svelte';
import '../styles/app.scss';
import { onMount } from 'svelte';

/**
 * Set the current theme
 */
onMount(() => {
	const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	if (storedTheme) {
		document.documentElement.setAttribute('data-theme', storedTheme);
	}
});

export const prerender = true;
</script>

<svelte:head>
	<meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
</svelte:head>

<svelte:body ></svelte:body>

<SkipLink />
<Header />


<main id="main">
	<slot></slot>
</main>

<Footer />
