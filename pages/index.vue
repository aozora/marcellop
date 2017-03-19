<template>
  <div>
    <my-header></my-header>
    <hero></hero>
    <about></about>
    <experience></experience>
  </div>
</template>


<script>
  import MyHeader from '~components/Header.vue'
  import Hero from '~components/Hero.vue'
  import About from '~components/About.vue'
  import Experience from '~components/Experience.vue'

  export default {
    components: {
      MyHeader,
      Hero,
      About,
      Experience
    },

    mounted () {
      // Preloader
      const preload = document.getElementById('loading')

      if (preload) {
        setTimeout(() => {
          preload.classList.add('loaded')
        }, 1000)
      }
    }
  }
</script>
