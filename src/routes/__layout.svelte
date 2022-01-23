<script lang='ts'>
import '../styles/fonts.css';
import '../styles/app.scss';
import Header from '../components/Header.svelte';
import Footer from '../components/Footer.svelte';
import SkipLink from '../components/SkipLink.svelte';
import Alert from '../components/Alert.svelte';
</script>

<svelte:head>
  <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
</svelte:head>

<SkipLink />
<Header/>

<!--TODO: fix here, should be preview=preview-->
<Alert preview={false}/>

<main id='main' role='main'>
  <slot></slot>
</main>

<Footer/>
