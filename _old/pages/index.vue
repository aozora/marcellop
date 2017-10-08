<template>
  <div class="main-container">

    <my-header></my-header>

    <main id="maincontent" role="main">
      <hero></hero>
      <about></about>
      <what-ido></what-ido>
      <experience></experience>
      <contact></contact>
    </main>

    <my-footer/>

  </div>
</template>


<script>
  import MyHeader from '~/components/Header'
  import Hero from '~/components/Hero'
  import About from '~/components/About'
  import Experience from '~/components/Experience'
  //  import Portfolio from '~/components/Portfolio'
  import WhatIdo from '~/components/WhatIdo'
  import Contact from '~/components/Contact'
  import MyFooter from '~/components/Footer'

  export default {
    components: {
      MyHeader,
      Hero,
      About,
      Experience,
      WhatIdo,
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
