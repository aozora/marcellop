<script lang='ts'>
import Header from '../components/Header.svelte';
import Footer from '../components/Footer.svelte';
import SkipLink from '../components/SkipLink.svelte';
import { menu } from '../store';
import '../styles/fonts.css';
import '../styles/app.scss';

// let menu = menuStore;

// const unsubscribe = menuStore.subscribe(value => {
//   console.log(value);
//   menu = value;
// });

/**
 * Cleanup
 */
// onDestroy(unsubscribe);
</script>

<svelte:head>
  <meta name='viewport' content='initial-scale=1, viewport-fit=cover' />
</svelte:head>

<SkipLink />
<Header menu={$menu} />


<main id='main' role='main'>
  <slot></slot>
</main>

<Footer />
