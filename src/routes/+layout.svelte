<script lang="ts">
import Header from "../components/Header.svelte";
import Footer from "../components/Footer.svelte";
import SkipLink from "../components/SkipLink.svelte";
// import "../styles/fonts.css";
import "../styles/app.scss";

export const prerender = true;
</script>

<svelte:head>
  <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
</svelte:head>

<SkipLink />
<Header />


<main id="main">
  <slot></slot>
</main>

<Footer />
