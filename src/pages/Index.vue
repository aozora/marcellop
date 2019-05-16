<template>
  <Layout>
    <hero></hero>
    <about></about>
    <what></what>
    <experience></experience>
    <contact></contact>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <!--    <g-image alt="Example image" src="~/favicon.png" width="135" />-->
  </Layout>
</template>

<script>
import Hero from '../components/Hero';
import About from '../components/About';
import What from '../components/What';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default {
  components: { Contact, Experience, What, About, Hero },
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
  .home-links a {
    margin-right: 1rem;
  }
</style>
