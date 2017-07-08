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

    <main id="maincontent" role="main">
      <hero></hero>
      <about></about>
      <experience></experience>
      <services></services>
      <portfolio></portfolio>
      <contact></contact>
    </main>
    <my-footer/>

  </div>
</template>


<script>
  import MyHeader from '~components/Header'
  import Hero from '~components/Hero'
  import About from '~components/About'
  import Experience from '~components/Experience'
  import Portfolio from '~components/Portfolio'
  import Services from '~components/Services'
  import Contact from '~components/Contact'
  import MyFooter from '~components/Footer'

  export default {
    components: {
      MyHeader,
      Hero,
      About,
      Experience,
      Services,
      Portfolio,
      Contact,
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
