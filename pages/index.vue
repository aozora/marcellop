<template>
  <my-header></my-header>
</template>


<script>
  import MyHeader from '~components/Header.vue'

  export default {
    components: {
      MyHeader
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
