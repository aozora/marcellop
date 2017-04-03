<template>
  <div class="main-container">
    <!-- Loading Bar Start -->
    <!--<div id="loading">-->
      <!--<div id="loading-center">-->
        <!--<div id="loading-center-absolute">-->
          <!--<img src="~assets/img/catforlogo.png" alt="Mim"/>-->
          <!--<div class="object" id="object_three"></div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!-- Loading Bar End -->

    <my-header></my-header>

    <main id="maincontent">
      <hero></hero>
      <about></about>
      <experience></experience>
      <services></services>
    </main>
    <my-footer/>

  </div>
</template>


<script>
  import MyHeader from '~components/Header.vue'
  import Hero from '~components/Hero.vue'
  import About from '~components/About.vue'
  import Experience from '~components/Experience.vue'
  import Services from '~components/Services.vue'
  import MyFooter from '~components/Footer.vue'

  export default {
    components: {
      MyHeader,
      Hero,
      About,
      Experience,
      Services,
      MyFooter
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
