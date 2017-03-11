<template>
  <div>
    <my-header></my-header>

    <hero></hero>
  </div>
</template>


<script>
  import MyHeader from '~components/Header.vue'
  import Hero from '~components/Hero.vue'

  export default {
    components: {
      MyHeader,
      Hero
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
