<template>
  <header class="header-style-1 bg-color-1">
    <div class="top clearfix">
      <div class="header-top active-sticky ptb-50">
        <div class="container">
          <div class="row">
            <div class="col-xs-6 col-sm-5">
              <div class="left">
                <div class="logo">
                  <a href="index.html"><img src="assets/img/dark-logo.png" alt="Mim" /></a>
                </div>
              </div>
            </div>
            <div class="col-xs-6 col-sm-7">
              <div class="right">
                <div class="expand-menu-open floatright">
                  <i class="zmdi zmdi-menu"></i>
                </div>
                <nav class="mainmenu onepage-nev floatright">
                  <ul class="clearfix">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#portfolio">PORTFOLIO</a></li>
                    <li><a href="#service">Services</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mainmenu-expand bg-color-3">
        <div class="close-menu">
          <i class="zmdi zmdi-close-circle-o"></i>
        </div>
        <div class="menu-logo">
          <a href="index.html"><img src="assets/img/dark-logo.png" alt="Mim" /></a>
        </div>
        <nav class="mainmenu-box onepage-nev">
          <ul class="clearfix">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">PORTFOLIO</a></li>
            <li><a href="#service">Services</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <hero></hero>
  </header>
</template>

<script>
//  <!--<section class="container">-->
//    <!--<img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo"/>-->
//    <!--<h1 class="title">-->
//    <!--Universal Vue.js Application Framework-->
//  <!--</h1>-->
//  <!--<nuxt-link class="button" to="/about">-->
//    <!--About page-->
//
//
//
//
//
//  <!--</nuxt-link>-->
//  <!--</section>-->
  import Hero from '~components/Hero.vue'

  export default {
    components: {
      Hero
    }
  }
</script>
